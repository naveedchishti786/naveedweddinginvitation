import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Heart, ChevronDown } from 'lucide-react';
import Countdown from '../components/CountdownTimer';
import Footer from '../components/Footer';
import InvitationBanner from '../components/InvitationBanner';
import { couple, events } from '../data/events';

const BG = 'radial-gradient(ellipse 90% 75% at 50% 0%, #180d2e 0%, #0d071a 40%, #05020b 100%)';
const ACCENT = '#d4af37';
const ACCENT2 = '#fde047';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

// Decorative stars
const stars = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${1 + Math.random() * 3}px`,
  delay: `${Math.random() * 4}s`,
  dur: `${2 + Math.random() * 3}s`,
}));

export default function Home() {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen relative overflow-hidden"
      style={{ background: BG }}
    >
      {/* ── STARS ── */}
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            background: ACCENT,
            animationDuration: s.dur,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-24 pb-16">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(197,162,39,0.06) 0%, transparent 70%)',
          }}
        />

        {/* ── BISMILLAH ── */}
        <motion.div {...fadeUp(0.1)} className="mb-5">
          <div
            className="urdu text-2xl md:text-3xl font-semibold mb-2"
            style={{ color: `${ACCENT}70` }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="ornament w-48 mx-auto text-xs">
            <span>✦</span><span style={{ color: `${ACCENT}60` }}>In The Name of Allah</span><span>✦</span>
          </div>
        </motion.div>

        {/* ── WARM INVITATION FROM HOST (1st Section) ── */}
        <InvitationBanner theme={{ accent: ACCENT, glow: 'rgba(197,162,39,0.2)' }} />

        {/* ── TOGETHER LABEL ── */}
        <motion.p {...fadeUp(0.28)} className="section-label mb-4" style={{ color: `${ACCENT}80` }}>
          Together Forever · 2026–2027
        </motion.p>

        {/* ── NAMES (Groom & Bride) ── */}
        <motion.div {...fadeUp(0.45)} className="mb-4">
          <h1
            className="font-script leading-none text-center"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 9rem)', color: ACCENT }}
          >
            {couple.groom}
          </h1>
          <div className="flex items-center justify-center gap-5 my-2">
            <div
              className="h-px flex-1 max-w-[100px]"
              style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}70)` }}
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-3xl md:text-4xl"
            >
              💍
            </motion.div>
            <div
              className="h-px flex-1 max-w-[100px]"
              style={{ background: `linear-gradient(90deg, ${ACCENT}70, transparent)` }}
            />
          </div>
          <h1
            className="font-script leading-none text-center"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 9rem)', color: ACCENT }}
          >
            {couple.bride}
          </h1>
        </motion.div>

        {/* ── FULL NAMES ── */}
        <motion.div {...fadeUp(0.55)} className="mb-2 text-center">
          <div className="font-display text-white/80 text-base md:text-lg font-light tracking-wide">
            {couple.groomFull}
            <span className="mx-3 font-script text-2xl" style={{ color: ACCENT }}>weds</span>
            {couple.brideFull}
          </div>
        </motion.div>

        {/* ── HASHTAG ── */}
        <motion.div {...fadeUp(0.6)} className="mb-10">
          <span
            className="font-body text-sm font-light tracking-[0.3em]"
            style={{ color: `${ACCENT}60` }}
          >
            {couple.hashtag}
          </span>
        </motion.div>

        {/* ── DATE BADGE ── */}
        <motion.div {...fadeUp(0.65)} className="mb-10">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-gold"
          >
            <Calendar className="w-4 h-4" style={{ color: ACCENT }} />
            <span className="font-body text-sm font-light text-white/90 tracking-wide">
              31 Dec 2026 – 02 Jan 2027 · Mian Channu &amp; Burewala
            </span>
            <Heart className="w-4 h-4 fill-current" style={{ color: ACCENT }} />
          </div>
        </motion.div>

        {/* ── COUNTDOWN ── */}
        <motion.div {...fadeUp(0.72)} className="mb-12 w-full max-w-lg">
          <div className="section-label mb-5 text-center" style={{ color: `${ACCENT}50` }}>
            Counting Down to the Wedding Day
          </div>
          <Countdown target={couple.weddingDate} accent={ACCENT} accent2={ACCENT2} />
        </motion.div>

        {/* ── CTA ── */}
        <motion.div {...fadeUp(0.8)} className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link to="/mehndi" className="btn-gold">
            Explore Events
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#events" className="btn-outline-gold">
            View Invitations ↓
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2"
          style={{ color: `${ACCENT}40` }}
        >
          <ChevronDown className="w-5 h-5 animate-float" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          EVENTS SECTION
      ═══════════════════════════════════════ */}
      <section id="events" className="relative py-28 px-5">
        {/* Divider */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label mb-4" style={{ color: `${ACCENT}55` }}>
              Our Celebrations
            </div>
            <h2 className="font-display font-semibold text-white leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Three Days of
              <br />
              <span className="gold-text">Love & Celebration</span>
            </h2>
            <div className="ornament w-40 mx-auto mt-5 text-xs">
              <span>✦</span><span>✦</span><span>✦</span>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <Link to={`/${ev.id}`}>
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  className="event-card relative rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    background: ev.theme.gradient,
                    border: `1px solid ${ev.theme.border || ev.theme.accent + '35'}`,
                    boxShadow: `0 12px 40px ${ev.theme.glow || 'rgba(0,0,0,0.5)'}`,
                  }}
                >
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${ev.theme.accent}, transparent)` }}
                  />
                  {/* Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${ev.theme.accent}20, transparent 65%)` }}
                  />

                  <div className="relative p-7">
                    {/* Header: Emoji & Function Mood Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-float-slow">{ev.emoji}</div>
                      {ev.theme.taglineBadge && (
                        <div
                          className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-body font-medium"
                          style={{
                            background: ev.theme.badgeBg || `${ev.theme.accent}15`,
                            color: ev.theme.accent,
                            border: `1px solid ${ev.theme.border || ev.theme.accent + '30'}`,
                          }}
                        >
                          {ev.theme.taglineBadge}
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3
                      className="font-display font-semibold text-2xl mb-1"
                      style={{ color: ev.theme.accent }}
                    >
                      {ev.name}
                    </h3>
                    <div
                      className="urdu text-base mb-3"
                      style={{ color: `${ev.theme.accent}80` }}
                    >
                      {ev.urdu}
                    </div>

                    {/* Tagline */}
                    <p
                      className="font-body text-xs font-light leading-relaxed mb-5"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      "{ev.tagline}"
                    </p>

                    {/* Date + Time */}
                    <div
                      className="font-body text-sm font-medium mb-1"
                      style={{ color: 'rgba(255,255,255,0.85)' }}
                    >
                      {ev.dayName}, {ev.date}
                    </div>
                    <div
                      className="font-body text-xs font-light mb-5"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                    >
                      {ev.time} · {ev.venue.city}
                    </div>

                    {/* CTA */}
                    <div
                      className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase group-hover:gap-4 transition-all duration-300 pt-3 border-t"
                      style={{
                        color: ev.theme.accent,
                        borderColor: `${ev.theme.accent}25`,
                      }}
                    >
                      <span>View Invitation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER & FAMILY SECTION ── */}
      <Footer
        theme={{
          accent: ACCENT,
          border: 'rgba(212,175,55,0.3)',
          glow: 'rgba(212,175,55,0.2)',
          cardBg: 'rgba(212,175,55,0.06)',
        }}
      />
    </motion.div>
  );
}
