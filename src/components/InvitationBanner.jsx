import { motion } from 'framer-motion';
import { couple } from '../data/events';
import { useTheme } from '../context/ThemeContext';

export default function InvitationBanner({ theme }) {
  const { isDark } = useTheme();
  const accent = theme?.accent || '#d4af37';
  const border = theme?.border || (isDark ? 'rgba(197,162,39,0.35)' : 'rgba(184,138,20,0.4)');
  const glow = theme?.glow || 'rgba(197,162,39,0.18)';
  const cardBg = isDark
    ? (theme?.cardBg || 'linear-gradient(135deg, rgba(197,162,39,0.12) 0%, rgba(20,15,10,0.7) 50%, rgba(197,162,39,0.08) 100%)')
    : (theme?.lightCardBg || 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,248,240,0.92) 50%, rgba(255,255,255,0.95) 100%)');
  const cardShadow = isDark
    ? `0 12px 36px rgba(0,0,0,0.5), 0 0 50px ${glow}`
    : `0 12px 32px rgba(0,0,0,0.06), 0 0 35px rgba(197,162,39,0.15)`;

  const textColor = isDark ? '#ffffff' : '#1a1612';
  const textMuted = isDark ? 'rgba(255,255,255,0.85)' : '#2b241e';
  const boxBg = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.88)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.18 }}
      className="w-full max-w-xl mx-auto px-2 sm:px-4 mb-6 sm:mb-8"
    >
      <div
        className="relative px-3.5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 rounded-2xl md:rounded-3xl text-center backdrop-blur-md transition-all duration-500 overflow-hidden"
        style={{
          background: cardBg,
          border: `1px solid ${border}`,
          boxShadow: cardShadow,
        }}
      >
        {/* Corner Ornaments */}
        <div className="absolute top-2.5 left-3 text-[10px] opacity-40 select-none" style={{ color: accent }}>✦</div>
        <div className="absolute top-2.5 right-3 text-[10px] opacity-40 select-none" style={{ color: accent }}>✦</div>
        <div className="absolute bottom-2.5 left-3 text-[10px] opacity-40 select-none" style={{ color: accent }}>✦</div>
        <div className="absolute bottom-2.5 right-3 text-[10px] opacity-40 select-none" style={{ color: accent }}>✦</div>

        {/* Grandparents Blessing */}
        <div className="mb-4 pb-3.5 border-b" style={{ borderColor: `${border}` }}>
          <div
            className="text-[9.5px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.2em] uppercase font-body font-semibold mb-2.5 leading-snug px-1 text-center"
            style={{ color: isDark ? accent : '#8c680f' }}
          >
            {couple.grandparentsTitle}
          </div>
          
          {/* Structured Responsive Grid: 1 col on mobile, 2 cols on tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 w-full max-w-lg mx-auto">
            {couple.grandparents?.map((gp, idx) => (
              <div
                key={idx}
                className="px-3 py-2 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 font-display text-xs sm:text-sm md:text-[15px] font-semibold text-center leading-snug transition-transform duration-200"
                style={{
                  background: boxBg,
                  border: `1px solid ${border}`,
                  color: textColor,
                  boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <span className="text-xs shrink-0" style={{ color: accent }}>👑</span>
                <span className="break-words">{gp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.14em] sm:tracking-[0.2em] font-body font-medium mb-2 sm:mb-2.5"
          style={{
            background: isDark ? `${accent}20` : 'rgba(212,175,55,0.14)',
            color: isDark ? accent : '#8c680f',
            border: `1px solid ${border}`,
          }}
        >
          <span>🕊️</span>
          <span>WARMLY HOSTED BY (GROOM'S FAMILY)</span>
        </div>

        {/* Host English Name */}
        <h2
          className="font-display font-semibold text-xl sm:text-2xl md:text-3xl tracking-wide mb-1.5 leading-tight"
          style={{
            color: textColor,
            textShadow: isDark ? `0 2px 14px ${glow}` : 'none',
          }}
        >
          Mr &amp; Mrs Haji Abdul Waheed
        </h2>

        {/* Divider */}
        <div
          className="h-px w-28 sm:w-36 mx-auto my-2.5 sm:my-3"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
        />

        {/* Invitation Text */}
        <p className="font-body text-xs sm:text-sm font-light leading-relaxed tracking-wide px-1" style={{ color: textMuted }}>
          Cordially invite you to celebrate the wedding ceremonies of their beloved son{' '}
          <span
            className="font-semibold block sm:inline mt-1 sm:mt-0 font-script text-2xl sm:text-3xl leading-none"
            style={{ color: accent }}
          >
            Muhammad Naveed
          </span>
        </p>
      </div>
    </motion.div>
  );
}
