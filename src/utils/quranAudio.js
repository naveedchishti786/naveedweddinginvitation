// Combines multiple Quran audio tracks (Bismillah -> Arabic Ayat -> Urdu Audio)
// into a single seamless continuous audio track using the Web Audio API with zero pause/stop.

const audioBlobCache = {};

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function bufferToWav(buffer) {
  const numChannels = 1;
  const sampleRate = buffer.sampleRate;
  const samples = buffer.getChannelData(0);
  const dataLength = samples.length * 2;
  const wavBuffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(wavBuffer);

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* file length */
  view.setUint32(4, 36 + dataLength, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (PCM = 1) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, numChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 2, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, dataLength, true);

  /* write PCM samples */
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

export async function createContinuousQuranAudio(urls) {
  const validUrls = (urls || []).filter(Boolean);
  if (validUrls.length === 0) {
    return null;
  }
  const cacheKey = validUrls.join('|');
  if (audioBlobCache[cacheKey]) {
    return audioBlobCache[cacheKey];
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    return null;
  }

  const ctx = new AudioContext();

  try {
    // 1. Fetch all audio clips in parallel
    const responses = await Promise.all(
      validUrls.map((url) => fetch(url))
    );
    const arrayBuffers = await Promise.all(responses.map((r) => r.arrayBuffer()));

    // 2. Decode audio buffers
    const decodedBuffers = await Promise.all(
      arrayBuffers.map((ab) => ctx.decodeAudioData(ab))
    );

    // Record time boundaries for each part
    const boundaries = [0];
    let totalLength = 0;
    decodedBuffers.forEach((b) => {
      totalLength += b.length;
      boundaries.push(boundaries[boundaries.length - 1] + b.duration);
    });

    // 3. Merge into one seamless continuous buffer
    const merged = ctx.createBuffer(1, totalLength, ctx.sampleRate);
    const mergedData = merged.getChannelData(0);

    let offset = 0;
    for (const buf of decodedBuffers) {
      // Use channel 0 (mono mix)
      const data = buf.getChannelData(0);
      mergedData.set(data, offset);
      offset += buf.length;
    }

    // 4. Convert merged buffer to WAV Blob URL
    const wavBlob = bufferToWav(merged);
    const blobUrl = URL.createObjectURL(wavBlob);

    const result = {
      blobUrl,
      totalDuration: merged.duration,
      // [0, bismillahEnd, arabicEnd, urduEnd]
      timestamps: boundaries,
    };

    audioBlobCache[cacheKey] = result;
    return result;
  } catch (err) {
    console.warn('Failed to merge audio tracks:', err);
    return null;
  } finally {
    try {
      ctx.close();
    } catch {}
  }
}
