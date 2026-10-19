import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Play, Pause, X, Sparkles } from 'lucide-react';
import { createContinuousQuranAudio } from '../utils/quranAudio';

// Surah Al-Furqan [25:74] — The Prophetic Quranic Marriage Prayer & Wish
const HOME_AYAT = {
  arabicVerse: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا — آمِيْن',
  surahRef: 'سورۃ الفرقان [۲۵:۷۴] · Surah Al-Furqan [25:74]',
  urduVerse: '“اے ہمارے پروردگار! ہمیں ہماری بیویوں اور ہماری اولاد سے آنکھوں کی ٹھنڈک عطا فرما اور ہمیں پرہیزگاروں کا پیشوا بنا۔ آمین!”',
  englishVerse: '“Our Lord! Bless us with spouses and offspring who will be the joy of our hearts, and make us an example for the righteous. Aameen.”',
  audioBismillah: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3',
  audioArabic: 'https://everyayah.com/data/Alafasy_128kbps/025074.mp3',
  audioUrdu: 'https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/025074.mp3',
};

const STEPS = [
  { id: 'bismillah', label: 'بِسْمِ اللَّهِ', title: 'Bismillah' },
  { id: 'arabic', label: 'عربی تلاوت', title: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا...' },
  { id: 'urdu', label: 'اردو ترجمہ', title: 'اردو آڈیو ترجمہ' },
];

export default function IslamicOpening({ isDark = true, accent = '#d4af37' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [timestamps, setTimestamps] = useState([0, 4.5, 7.5, 11]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [showCeremonyOverlay, setShowCeremonyOverlay] = useState(false);
  const audioRef = useRef(null);

  // Pre-load and merge the 3 audio tracks into one seamless continuous stream
  useEffect(() => {
    let isMounted = true;
    createContinuousQuranAudio([
      HOME_AYAT.audioBismillah,
      HOME_AYAT.audioArabic,
      HOME_AYAT.audioUrdu,
    ]).then((res) => {
      if (res && isMounted) {
        setAudioUrl(res.blobUrl);
        setTimestamps(res.timestamps);
        setDuration(res.totalDuration);
      }
    });

    try {
      const seen = sessionStorage.getItem('shaadi_islamic_opening_seen');
      if (!seen) {
        setShowCeremonyOverlay(true);
      }
    } catch {}

    return () => {
      isMounted = false;
    };
  }, []);

  const startPlayback = async () => {
    setIsLoadingAudio(true);
    let url = audioUrl;
    if (!url) {
      const res = await createContinuousQuranAudio([
        HOME_AYAT.audioBismillah,
        HOME_AYAT.audioArabic,
        HOME_AYAT.audioUrdu,
      ]);
      if (res) {
        url = res.blobUrl;
        setAudioUrl(res.blobUrl);
        setTimestamps(res.timestamps);
        setDuration(res.totalDuration);
      }
    }
    setIsLoadingAudio(false);

    if (audioRef.current) {
      if (url && audioRef.current.src !== url) {
        audioRef.current.src = url;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.warn('Playback error:', e));
    }
  };

  const handleEnterWithAudio = () => {
    try {
      sessionStorage.setItem('shaadi_islamic_opening_seen', 'true');
    } catch {}
    setShowCeremonyOverlay(false);
    startPlayback();
  };

  const handleEnterQuietly = () => {
    try {
      sessionStorage.setItem('shaadi_islamic_opening_seen', 'true');
    } catch {}
    setShowCeremonyOverlay(false);
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

    // Live update step index as the continuous audio flows seamlessly
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

  return (
    <>
      {/* Seamless Continuous Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl || HOME_AYAT.audioBismillah}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* ═══════════════════════════════════════════════════════════
          1. CEREMONIAL OPENING OVERLAY (ON FIRST VISIT)
      ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showCeremonyOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-start sm:justify-center items-center p-3 sm:p-6 overflow-y-auto"
            style={{
              background: 'radial-gradient(ellipse 90% 80% at 50% 20%, #1a0e2e 0%, #0d071a 50%, #05020b 100%)',
              paddingTop: 'max(1rem, env(safe-area-inset-top, 16px))',
              paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 16px))',
            }}
          >
            {/* Background Sparks */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`,
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-xl w-full text-center p-5 sm:p-8 md:p-10 rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-2xl my-auto"
              style={{
                background: 'rgba(20, 10, 32, 0.94)',
                borderColor: `${accent}40`,
                boxShadow: `0 0 50px ${accent}25, 0 20px 40px rgba(0,0,0,0.8)`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
              />

              <button
                onClick={handleEnterQuietly}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer bg-white/5"
                aria-label="Skip to invitation"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Bismillah */}
              <div className="mb-4">
                <div
                  className="quran-arabic text-2xl sm:text-3xl font-semibold leading-relaxed mb-2"
                  style={{ color: accent }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
                <div
                  className="font-body text-[11px] sm:text-xs tracking-[0.2em] uppercase font-light"
                  style={{ color: `${accent}bb` }}
                >
                  In the Name of Allah, the Most Gracious, the Most Merciful
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${accent}60)` }} />
                <span className="text-sm" style={{ color: accent }}>✦ ۞ ✦</span>
                <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${accent}60, transparent)` }} />
              </div>

              {/* Quranic Verse: Arabic Display Only */}
              <div className="my-5 px-2">
                <div
                  className="quran-arabic text-2xl sm:text-3xl md:text-4xl leading-[2.3] sm:leading-[2.4] font-medium text-white mb-3"
                >
                  {HOME_AYAT.arabicVerse}
                </div>

                <div
                  className="font-body text-[11px] font-medium tracking-widest uppercase mt-3"
                  style={{ color: accent }}
                >
                  — {HOME_AYAT.surahRef}
                </div>
              </div>

              {/* Couple Intro */}
              <div className="my-4">
                <div className="font-script text-3xl sm:text-4xl" style={{ color: accent }}>
                  Naveed &amp; Arfa
                </div>
                <div className="font-body text-[11px] tracking-[0.3em] uppercase text-white/60 mt-1">
                  Wedding Celebrations · 2026–2027
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 w-full">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleEnterWithAudio}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-body text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer shadow-xl transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #f5c842 100%)',
                    color: '#1a0e00',
                    boxShadow: `0 8px 30px ${accent}45`,
                  }}
                >
                  <Volume2 className="w-4 h-4 shrink-0" />
                  <span>Open with Tilawat <span className="hidden xs:inline sm:inline text-[11px] opacity-90">(Bismillah ➔ Arabic ➔ Urdu)</span></span>
                </motion.button>

                <button
                  onClick={handleEnterQuietly}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 sm:py-3.5 rounded-full font-body text-xs sm:text-sm font-medium tracking-wider uppercase text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Enter Quietly
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          2. INLINE ISLAMIC VERSE ON HOME: ARABIC & URDU TOGETHER
      ═══════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl mx-auto my-6 px-4"
      >
        <div
          className="relative rounded-3xl p-6 sm:p-8 text-center border shadow-xl overflow-hidden backdrop-blur-xl transition-all duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.08) 0%, rgba(20, 10, 32, 0.7) 100%)'
              : 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.12) 0%, rgba(255, 255, 255, 0.95) 100%)',
            borderColor: isDark ? `${accent}35` : 'rgba(184, 138, 20, 0.35)',
            boxShadow: isDark ? `0 10px 40px rgba(0,0,0,0.5)` : '0 10px 30px rgba(184, 138, 20, 0.1)',
          }}
        >
          {/* Top Decorative Border Accent */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />

          {/* Bismillah */}
          <div className="mb-6">
            <div
              className="quran-arabic text-2xl sm:text-3xl font-semibold mb-3 leading-relaxed"
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
          <div className="my-5 px-1 sm:px-4">
            {/* Arabic Quranic Verse with Royal Quran Typography */}
            <div
              className="quran-arabic text-2xl sm:text-3xl md:text-4xl leading-[2.3] sm:leading-[2.4] font-medium mb-3"
              style={{ color: isDark ? '#ffffff' : '#1a1612' }}
            >
              {HOME_AYAT.arabicVerse}
            </div>

            <div
              className="font-body text-[11px] font-medium tracking-widest uppercase mt-3"
              style={{ color: accent }}
            >
              — {HOME_AYAT.surahRef}
            </div>
          </div>

          {/* ── Professional Luxury Start / Stop Button ── */}
          <div className="flex flex-col items-center justify-center mt-6 pt-5 border-t" style={{ borderColor: `${accent}20` }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full cursor-pointer shadow-lg transition-all border"
              style={{
                background: isPlaying
                  ? 'linear-gradient(135deg, #d4af37 0%, #f5c842 100%)'
                  : isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(184, 138, 20, 0.1)',
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
                  color: isPlaying ? '#f5c842' : '#1a0e00',
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
        </div>
      </motion.div>
    </>
  );
}
