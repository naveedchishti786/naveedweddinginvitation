import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { createContinuousQuranAudio } from '../utils/quranAudio';

const BISMILLAH_AUDIO = 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3';

const EVENT_BLESSINGS = {
  barat: {
    title: 'The Sacred Nikkah & Quranic Blessing',
    titleUrdu: 'مبارک نکاح — قرآنی آیات و برکت',
    subtitle: 'Solemnised with the Sacred Words of Allah & the Sunnah of Prophet Muhammad ﷺ',
    arabicVerse: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً — آمِيْن',
    surahRef: 'سورۃ الروم [۳۰:۲۱] · Surah Ar-Rum [30:21]',
    englishVerse: '“And of His signs is that He created for you mates from among yourselves that you may find tranquility in them; and He placed between you affection and mercy. Aameen.”',
    urduVerse: '“اور اُس کی نشانیوں میں سے یہ ہے کہ اُس نے تمہارے لیے تمہاری ہی جنس سے جوڑے بنائے تاکہ تم اُن کے پاس سکون حاصل کرو اور تمہارے درمیان محبت اور رحمت پیدا کر دی۔ آمین!”',
    audioArabic: 'https://everyayah.com/data/Alafasy_128kbps/030021.mp3',
    audioUrdu: 'https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/030021.mp3',
  },
  walima: {
    title: 'Sunnah Walima & Gratitude (شکر اور برکت)',
    titleUrdu: 'سنتِ ولیمہ — شکر اور برکت کی دعا',
    subtitle: 'Celebrating the Sunnah of Walima with Prayer & Gratitude',
    arabicVerse: 'وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ — آمِيْن',
    surahRef: 'سورۃ ابراہیم [۱۴:۷] · Surah Ibrahim [14:7]',
    englishVerse: '“And remember when your Lord proclaimed: ‘If you are grateful, I will surely increase you in blessings!’ Aameen.”',
    urduVerse: '“اور جب تمہارے رب نے آگاہ فرمایا کہ اگر تم شکر ادا کرو گے تو میں تمہیں ضرور اور زیادہ دوں گا۔ آمین!”',
    audioArabic: 'https://everyayah.com/data/Alafasy_128kbps/014007.mp3',
    audioUrdu: 'https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/014007.mp3',
  },
};

const STEPS = [
  { id: 'bismillah', label: 'بِسْمِ اللَّهِ', title: 'Bismillah' },
  { id: 'arabic', label: 'عربی تلاوت', title: 'Arabic Tilawat' },
  { id: 'urdu', label: 'اردو ترجمہ', title: 'Urdu Audio' },
];

export default function NikkahBlessing({ eventId = 'barat', theme, isDark = true }) {
  const data = EVENT_BLESSINGS[eventId] || EVENT_BLESSINGS.barat;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [timestamps, setTimestamps] = useState([0, 4.5, 12, 18]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const accent = theme?.accent || '#f5c563';
  const border = theme?.border || `${accent}35`;
  const cardBg = isDark
    ? (theme?.cardBg || 'rgba(38, 5, 13, 0.65)')
    : 'rgba(255, 255, 255, 0.95)';
  const textColor = isDark ? '#ffffff' : '#1a1612';

  // Only add Ayat on Barat (Nikkah) and Walima
  const isAllowedEvent = eventId === 'barat' || eventId === 'walima';

  // Merge the 3 tracks: Bismillah + Arabic Ayat + Urdu Audio into a single seamless continuous stream
  useEffect(() => {
    let isMounted = true;
    createContinuousQuranAudio([
      BISMILLAH_AUDIO,
      data.audioArabic,
      data.audioUrdu,
    ]).then((res) => {
      if (res && isMounted) {
        setAudioUrl(res.blobUrl);
        setTimestamps(res.timestamps);
        setDuration(res.totalDuration);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  const startPlayback = async () => {
    let url = audioUrl;
    if (!url) {
      const res = await createContinuousQuranAudio([
        BISMILLAH_AUDIO,
        data.audioArabic,
        data.audioUrdu,
      ]);
      if (res) {
        url = res.blobUrl;
        setAudioUrl(res.blobUrl);
        setTimestamps(res.timestamps);
        setDuration(res.totalDuration);
      }
    }

    if (audioRef.current) {
      if (url && audioRef.current.src !== url) {
        audioRef.current.src = url;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.warn('Playback error:', e));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      startPlayback();
    }
  };

  const jumpToStep = (index) => {
    if (!audioRef.current) return;
    const seekTime = timestamps[index] || 0;
    audioRef.current.currentTime = seekTime;
    setCurrentStepIndex(index);
    if (!isPlaying) {
      startPlayback();
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || duration || 1;
    setCurrentTime(cur);
    setAudioProgress((cur / dur) * 100);

    // Live update step index as continuous audio plays
    if (timestamps.length >= 4) {
      if (cur < timestamps[1]) {
        setCurrentStepIndex(0);
      } else if (cur < timestamps[2]) {
        setCurrentStepIndex(1);
      } else {
        setCurrentStepIndex(2);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setAudioProgress(0);
    setCurrentTime(0);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isAllowedEvent) {
    return null;
  }

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6">
      <audio
        ref={audioRef}
        src={audioUrl || BISMILLAH_AUDIO}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl p-6 sm:p-10 border shadow-2xl relative overflow-hidden backdrop-blur-xl"
          style={{
            background: cardBg,
            borderColor: border,
            boxShadow: `0 16px 50px ${accent}20`,
          }}
        >
          {/* Top Gold Foil Accent Bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />

          {/* Bismillah */}
          <div className="text-center mb-6">
            <div
              className="quran-arabic text-2xl sm:text-3xl font-semibold mb-2 leading-relaxed"
              style={{ color: isDark ? accent : '#9a7314' }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <div className="ornament w-48 mx-auto text-xs my-2" style={{ color: `${accent}80` }}>
              <span>✦</span>
              <span className="font-body text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-light">
                In The Name of Allah
              </span>
              <span>✦</span>
            </div>
          </div>

          {/* ── Quranic Verse: Arabic Display Only ── */}
          {data.arabicVerse && (
            <div className="my-5 px-1 sm:px-4 text-center">
              <div
                className="quran-arabic text-2xl sm:text-3xl md:text-4xl leading-[2.3] sm:leading-[2.4] font-medium mb-3"
                style={{ color: isDark ? '#ffffff' : '#1a1612' }}
              >
                {data.arabicVerse}
              </div>

              <div
                className="font-body text-[11px] font-medium tracking-widest uppercase mt-3"
                style={{ color: accent }}
              >
                — {data.surahRef}
              </div>
            </div>
          )}

          {/* ── Professional Luxury Start / Stop Button ── */}
          {data.audioArabic && (
            <div className="flex flex-col items-center justify-center mt-6 pt-5 border-t" style={{ borderColor: `${accent}20` }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full cursor-pointer shadow-lg transition-all border"
                style={{
                  background: isPlaying
                    ? 'linear-gradient(135deg, #f5c563 0%, #d97706 100%)'
                    : isDark ? 'rgba(245, 197, 99, 0.1)' : 'rgba(184, 138, 20, 0.1)',
                  borderColor: `${accent}50`,
                  color: isPlaying ? '#1a0e00' : isDark ? '#fef3c7' : '#5a420b',
                  boxShadow: isPlaying ? `0 0 25px ${accent}60` : `0 2px 10px rgba(0,0,0,0.15)`,
                }}
                aria-label={isPlaying ? 'Stop Recitation' : 'Play Recitation'}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isPlaying ? '#1a0e00' : accent,
                    color: isPlaying ? '#f5c563' : '#1a0e00',
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </div>
                <span className="font-body text-xs font-semibold tracking-wider uppercase">
                  {isPlaying ? 'Pause Tilawat' : 'Play Tilawat'}
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-2.5 bg-current rounded-full animate-[pulse_0.5s_infinite]" />
                    <span className="w-1 h-3.5 bg-current rounded-full animate-[pulse_0.4s_infinite_0.15s]" />
                    <span className="w-1 h-2 bg-current rounded-full animate-[pulse_0.6s_infinite_0.3s]" />
                  </span>
                )}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
