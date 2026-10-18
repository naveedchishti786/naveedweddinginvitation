import { motion } from 'framer-motion';
import { couple } from '../data/events';

export default function InvitationBanner({ theme }) {
  const accent = theme?.accent || '#d4af37';
  const border = theme?.border || 'rgba(197,162,39,0.35)';
  const glow = theme?.glow || 'rgba(197,162,39,0.18)';
  const cardBg =
    theme?.cardBg ||
    'linear-gradient(135deg, rgba(197,162,39,0.12) 0%, rgba(20,15,10,0.7) 50%, rgba(197,162,39,0.08) 100%)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.18 }}
      className="w-full max-w-xl mx-auto px-4 mb-8"
    >
      <div
        className="relative px-6 py-6 md:px-8 md:py-7 rounded-2xl text-center backdrop-blur-md transition-all duration-500"
        style={{
          background: cardBg,
          border: `1px solid ${border}`,
          boxShadow: `0 12px 36px rgba(0,0,0,0.5), 0 0 50px ${glow}`,
        }}
      >
        {/* Corner Ornaments */}
        <div className="absolute top-2.5 left-3 text-[10px] opacity-40" style={{ color: accent }}>✦</div>
        <div className="absolute top-2.5 right-3 text-[10px] opacity-40" style={{ color: accent }}>✦</div>
        <div className="absolute bottom-2.5 left-3 text-[10px] opacity-40" style={{ color: accent }}>✦</div>
        <div className="absolute bottom-2.5 right-3 text-[10px] opacity-40" style={{ color: accent }}>✦</div>

        {/* Grandparents Blessing (زیرِ سایۂ عاطفت) */}
        <div className="mb-4 pb-3.5 border-b" style={{ borderColor: `${border}` }}>
          <div
            className="text-[10px] tracking-[0.25em] uppercase font-body font-medium mb-1"
            style={{ color: `${accent}cc` }}
          >
            {couple.grandparentsTitle}
          </div>
          <div className="urdu text-sm mb-2" style={{ color: `${accent}95` }}>
            {couple.grandparentsTitleUrdu}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-white/95 font-display text-sm md:text-base font-semibold">
            {couple.grandparents?.map((gp, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                {idx > 0 && <span className="text-xs" style={{ color: accent }}>✦</span>}
                <span>{gp}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] font-body font-medium mb-3"
          style={{
            background: `${accent}20`,
            color: accent,
            border: `1px solid ${border}`,
          }}
        >
          <span>🕊️</span>
          <span>WARMLY HOSTED BY (GROOM'S FAMILY)</span>
        </div>

        {/* Host English Name */}
        <h2
          className="font-display font-semibold text-2xl md:text-3xl text-white tracking-wide mb-1"
          style={{ textShadow: `0 2px 14px ${glow}` }}
        >
          Mr &amp; Mrs Haji Abdul Waheed
        </h2>

        {/* Host Urdu Name */}
        <div
          className="urdu text-lg md:text-xl font-medium mb-3"
          style={{ color: accent }}
        >
          دعوت نامہ از جانب: مسٹر اینڈ مسز حاجی عبد الوحید
        </div>

        {/* Divider */}
        <div
          className="h-px w-36 mx-auto my-3"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
        />

        {/* Invitation Text */}
        <p className="font-body text-xs md:text-sm text-white/85 font-light leading-relaxed tracking-wide">
          Cordially invite you to celebrate the wedding ceremonies of their beloved son{' '}
          <span
            className="font-semibold block sm:inline mt-1 sm:mt-0 font-script text-2xl md:text-3xl"
            style={{ color: accent }}
          >
            Naveed weds Arfa
          </span>
        </p>
      </div>
    </motion.div>
  );
}
