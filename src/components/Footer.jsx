import { motion } from 'framer-motion';
import { Heart, Phone } from 'lucide-react';
import { couple } from '../data/events';
import { useTheme } from '../context/ThemeContext';

export default function Footer({ theme }) {
  const { isDark } = useTheme();
  const accent = theme?.accent || '#d4af37';
  const border = theme?.border || (isDark ? 'rgba(212,175,55,0.3)' : 'rgba(184,138,20,0.35)');
  const glow = theme?.glow || 'rgba(212,175,55,0.2)';
  const cardBg = isDark ? (theme?.cardBg || 'rgba(212,175,55,0.05)') : 'rgba(255, 255, 255, 0.92)';

  const textColor = isDark ? '#ffffff' : '#1a1612';
  const textMuted = isDark ? 'rgba(255,255,255,0.85)' : '#2b241e';
  const textSubtle = isDark ? 'rgba(255,255,255,0.65)' : '#4d4034';
  const textFaint = isDark ? 'rgba(255,255,255,0.45)' : '#786857';
  const labelColor = isDark ? accent : '#8c680f';
  const boxBg = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.88)';

  return (
    <footer
      className="relative py-20 px-5 text-center transition-colors duration-500"
      style={{ borderTop: `1px solid ${border}` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >


        {/* ── LOOKING FORWARD TO WELCOMING YOU ── */}
        <div className="mb-10 max-w-2xl mx-auto px-2 sm:px-4">
          <div
            className="section-label mb-3 text-xs tracking-[0.2em] uppercase transition-colors duration-500 font-semibold"
            style={{ color: labelColor }}
          >
            {couple.family.lookingForwardTitle}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-left">
            {couple.family.lookingForward.map((relative, idx) => (
              <div
                key={idx}
                className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl flex items-center gap-2.5 sm:gap-3 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
                style={{
                  border: `1px solid ${border}`,
                  background: cardBg,
                  boxShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <span className="text-xs sm:text-sm shrink-0" style={{ color: accent }}>✦</span>
                <span
                  className="font-display text-sm sm:text-base font-medium leading-tight"
                  style={{ color: textColor }}
                >
                  {relative}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── LITTLE ONES ── */}
        <div className="mb-14 max-w-4xl mx-auto px-2 sm:px-4">
          <div
            className="relative px-3.5 py-6 sm:px-6 sm:py-8 md:px-8 rounded-2xl md:rounded-3xl backdrop-blur-md transition-all duration-500"
            style={{
              background: cardBg,
              border: `1px solid ${border}`,
              boxShadow: isDark ? `0 10px 30px ${glow}` : '0 8px 30px rgba(0,0,0,0.05)',
            }}
          >
            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 text-[10px] opacity-40 select-none" style={{ color: accent }}>✦</div>
            <div className="absolute top-3 right-3 text-[10px] opacity-40 select-none" style={{ color: accent }}>✦</div>
            <div className="absolute bottom-3 left-3 text-[10px] opacity-40 select-none" style={{ color: accent }}>✦</div>
            <div className="absolute bottom-3 right-3 text-[10px] opacity-40 select-none" style={{ color: accent }}>✦</div>

            {/* Header */}
            <div className="text-center mb-5">
              <div
                className="section-label mb-2 text-[11px] tracking-[0.22em] transition-colors duration-500 uppercase font-semibold"
                style={{ color: labelColor }}
              >
                {couple.family.childrenTitle}
              </div>
              <div
                className="h-px w-24 sm:w-32 mx-auto mt-2"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
              />
            </div>

            {/* Structured Symmetrical Grid: 2 cols on mobile, 3 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {couple.family.children.map((child, idx) => (
                <div
                  key={idx}
                  className="group relative flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl transition-all duration-300 hover:scale-[1.03] text-center"
                  style={{
                    background: boxBg,
                    border: `1px solid ${border}`,
                    boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <span className="text-sm transition-transform duration-300 group-hover:scale-125 shrink-0">
                    🌸
                  </span>
                  <span
                    className="font-body text-xs sm:text-sm font-medium tracking-wide text-center leading-snug"
                    style={{ color: textColor }}
                  >
                    {child}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTACT & ENQUIRIES ── */}
        <div className="mb-12 max-w-lg mx-auto px-2 sm:px-4">
          <div
            className="section-label mb-4 text-[11px] tracking-[0.22em] uppercase transition-colors duration-500 font-semibold"
            style={{ color: labelColor }}
          >
            For Enquiries &amp; Information
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {couple.contacts.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl text-center glass transition-all duration-300 hover:scale-105"
                style={{
                  border: `1px solid ${border}`,
                  background: cardBg,
                  boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.04)',
                }}
              >
                <div className="text-xs font-body mb-1 font-medium" style={{ color: textSubtle }}>{c.label}</div>
                <a
                  href={`tel:${c.phone}`}
                  className="font-display font-medium text-base block transition-colors duration-300 hover:text-white mb-2"
                  style={{ color: accent }}
                >
                  <Phone className="inline w-3.5 h-3.5 mr-1.5 opacity-80" />
                  {c.phone}
                </a>
                <div className="flex items-center justify-center gap-2">
                  <a
                    href={`https://wa.me/${c.raw}?text=${encodeURIComponent('Assalam-o-Alaikum! Regarding Naveed weds Arfa Wedding.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] uppercase tracking-wider font-body px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/25 transition-colors"
                  >
                    <span>💬 WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ornament w-36 mx-auto text-xs mb-6" style={{ color: `${accent}80` }}>
          <span>✦</span><span>✦</span><span>✦</span>
        </div>

        <p
          className="font-body text-xs font-light tracking-wide"
          style={{ color: textFaint }}
        >
          31 Dec 2026 – 02 Jan 2027 · Mian Channu &amp; Burewala, Punjab, Pakistan
        </p>

        <p
          className="font-body text-[11px] font-light mt-2"
          style={{ color: textFaint }}
        >
          With Prayers & Love <Heart className="inline w-3 h-3 fill-current text-red-400/70" /> · {couple.hashtag}
        </p>
      </motion.div>
    </footer>
  );
}
