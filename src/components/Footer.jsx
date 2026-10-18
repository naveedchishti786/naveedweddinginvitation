import { motion } from 'framer-motion';
import { Heart, Phone } from 'lucide-react';
import { couple } from '../data/events';

export default function Footer({ theme }) {
  const accent = theme?.accent || '#d4af37';
  const border = theme?.border || 'rgba(212,175,55,0.3)';
  const glow = theme?.glow || 'rgba(212,175,55,0.2)';
  const cardBg = theme?.cardBg || 'rgba(212,175,55,0.05)';

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
        {/* Monogram Logo */}
        <div
          className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 transition-all duration-500"
          style={{
            border: `1.5px solid ${border}`,
            boxShadow: `0 0 25px ${glow}`,
          }}
        >
          <img
            src={couple.logo}
            alt="Naveed & Arfa Monogram"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Groom & Bride names */}
        <div
          className="font-script text-3xl md:text-5xl mb-1 transition-colors duration-500"
          style={{ color: accent }}
        >
          {couple.groom} weds {couple.bride}
        </div>

        <div
          className="section-label mb-8 tracking-[0.35em] transition-colors duration-500"
          style={{ color: `${accent}90` }}
        >
          {couple.hashtag}
        </div>

        {/* ── GRANDPARENTS BLESSINGS (زیرِ سایۂ عاطفت) ── */}
        <div className="mb-10 max-w-2xl mx-auto px-2">
          <div
            className="p-5 md:p-6 rounded-2xl backdrop-blur-md transition-all duration-500 text-center"
            style={{
              background: cardBg,
              border: `1px solid ${border}`,
              boxShadow: `0 8px 30px ${glow}`,
            }}
          >
            <div
              className="section-label mb-1 text-[11px] uppercase tracking-[0.25em] transition-colors duration-500"
              style={{ color: `${accent}cc` }}
            >
              {couple.grandparentsTitle}
            </div>
            <div
              className="urdu text-lg md:text-xl mb-3 transition-colors duration-500"
              style={{ color: accent }}
            >
              {couple.grandparentsTitleUrdu}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {couple.grandparents.map((gp, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 rounded-xl flex items-center justify-center gap-2.5 font-display text-sm md:text-base font-semibold text-white/95"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${border}`,
                  }}
                >
                  <span className="text-sm" style={{ color: accent }}>👑</span>
                  <span>{gp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── LOOKING FORWARD TO WELCOMING YOU (چشمِ براہ) ── */}
        <div className="mb-10">
          <div
            className="section-label mb-2 text-xs transition-colors duration-500"
            style={{ color: `${accent}cc` }}
          >
            {couple.family.lookingForwardTitle}
          </div>
          <div
            className="urdu text-xl mb-6 transition-colors duration-500"
            style={{ color: accent }}
          >
            {couple.family.lookingForwardTitleUrdu}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
            {couple.family.lookingForward.map((relative, idx) => (
              <div
                key={idx}
                className="px-4 py-3 rounded-xl flex items-center gap-3 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
                style={{
                  border: `1px solid ${border}`,
                  background: cardBg,
                }}
              >
                <span className="text-sm" style={{ color: accent }}>✦</span>
                <span className="font-display text-base font-medium text-white/95">
                  {relative}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── LITTLE ONES (نورِ نظر) ── */}
        <div className="mb-14 max-w-4xl mx-auto px-2">
          <div
            className="relative px-4 py-7 sm:px-6 sm:py-8 md:px-8 rounded-3xl backdrop-blur-md transition-all duration-500"
            style={{
              background: cardBg,
              border: `1px solid ${border}`,
              boxShadow: `0 10px 30px ${glow}`,
            }}
          >
            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 text-[10px] opacity-40" style={{ color: accent }}>✦</div>
            <div className="absolute top-3 right-3 text-[10px] opacity-40" style={{ color: accent }}>✦</div>
            <div className="absolute bottom-3 left-3 text-[10px] opacity-40" style={{ color: accent }}>✦</div>
            <div className="absolute bottom-3 right-3 text-[10px] opacity-40" style={{ color: accent }}>✦</div>

            {/* Header */}
            <div className="text-center mb-6">
              <div
                className="section-label mb-1.5 text-[11px] tracking-[0.25em] transition-colors duration-500 uppercase"
                style={{ color: `${accent}cc` }}
              >
                {couple.family.childrenTitle}
              </div>
              <div
                className="urdu text-xl md:text-2xl font-normal transition-colors duration-500"
                style={{ color: accent }}
              >
                {couple.family.childrenTitleUrdu}
              </div>
              <div
                className="h-px w-28 mx-auto mt-3"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
              />
            </div>

            {/* Structured Symmetrical Grid: 2 cols on mobile, 3 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5">
              {couple.family.children.map((child, idx) => (
                <div
                  key={idx}
                  className="group relative flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.03] text-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${border}`,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                  }}
                >
                  <span className="text-sm transition-transform duration-300 group-hover:scale-125 flex-shrink-0">
                    🌸
                  </span>
                  <span className="font-body text-xs sm:text-sm font-medium tracking-wide text-white/95 text-center leading-snug">
                    {child}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTACT & ENQUIRIES (رابطہ برائے معلومات) ── */}
        <div className="mb-12">
          <div
            className="section-label mb-1 text-[11px] transition-colors duration-500"
            style={{ color: `${accent}aa` }}
          >
            For Enquiries &amp; Information
          </div>
          <div
            className="urdu text-lg mb-4 transition-colors duration-500"
            style={{ color: `${accent}cc` }}
          >
            رابطہ برائے معلومات و شرکت
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {couple.contacts.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl text-center glass transition-all duration-300 hover:scale-105"
                style={{
                  border: `1px solid ${border}`,
                  background: cardBg,
                }}
              >
                <div className="text-xs text-white/60 font-body mb-1 font-medium">{c.label}</div>
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
                    className="text-[11px] uppercase tracking-wider font-body px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/25 transition-colors"
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
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          31 Dec 2026 – 02 Jan 2027 · Mian Channu &amp; Burewala, Punjab, Pakistan
        </p>

        <p
          className="font-body text-[11px] font-light mt-2"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          With Prayers & Love <Heart className="inline w-3 h-3 fill-current text-red-400/50" /> · {couple.hashtag}
        </p>
      </motion.div>
    </footer>
  );
}
