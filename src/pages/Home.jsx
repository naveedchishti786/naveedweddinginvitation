import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Heart } from 'lucide-react';
import Countdown from '../components/CountdownTimer';
import Footer from '../components/Footer';
import InvitationBanner from '../components/InvitationBanner';
import IslamicOpening from '../components/IslamicOpening';
import { couple, events } from '../data/events';
import { useTheme } from '../context/ThemeContext';

const BG = 'radial-gradient(ellipse 90% 75% at 50% 0%, #180d2e 0%, #0d071a 40%, #05020b 100%)';
const LIGHT_BG = 'radial-gradient(ellipse 90% 75% at 50% 0%, #fffdf9 0%, #faf4e8 45%, #f4ede0 100%)';
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
  const { isDark } = useTheme();

  // High contrast color tokens for dark and light modes
  const textColor = isDark ? '#ffffff' : '#1a1612';
  const textMuted = isDark ? 'rgba(255,255,255,0.85)' : '#2b241e';
  const textSubtle = isDark ? 'rgba(255,255,255,0.65)' : '#4d4034';
  const textFaint = isDark ? 'rgba(255,255,255,0.45)' : '#786857';
  const labelColor = isDark ? `${ACCENT}90` : '#8c680f';

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen relative overflow-hidden transition-colors duration-500"
      style={{ background: isDark ? BG : LIGHT_BG }}
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
            opacity: isDark ? 0.45 : 0.2,
            animationDuration: s.dur,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 sm:px-5 pb-8 sm:pb-10"
        style={{ paddingTop: 'calc(5.25rem + env(safe-area-inset-top, 0px))' }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(197,162,39,0.06) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(197,162,39,0.12) 0%, transparent 70%)',
          }}
        />

        {/* ── ISLAMIC OPENING & QURAN RECITATION ── */}
        <IslamicOpening isDark={isDark} accent={ACCENT} />

        {/* ── WARM INVITATION FROM HOST (1st Section) ── */}
        <InvitationBanner theme={{ accent: ACCENT, glow: 'rgba(197,162,39,0.2)' }} />

        {/* ── TOGETHER LABEL ── */}
        <motion.p {...fadeUp(0.28)} className="section-label mb-4" style={{ color: labelColor }}>
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
          <div className="font-display text-base md:text-lg font-light tracking-wide" style={{ color: textMuted }}>
            {couple.groomFull}
            <span className="mx-3 font-script text-2xl" style={{ color: ACCENT }}>weds</span>
            {couple.brideFull}
          </div>
        </motion.div>

        {/* ── HASHTAG ── */}
        <motion.div {...fadeUp(0.6)} className="mb-10">
          <span
            className="font-body text-sm font-light tracking-[0.3em]"
            style={{ color: isDark ? `${ACCENT}60` : '#8c680f' }}
          >
            {couple.hashtag}
          </span>
        </motion.div>

        {/* ── DATE BADGE ── */}
        <motion.div {...fadeUp(0.65)} className="mb-8 sm:mb-10 w-full max-w-xl px-2">
          <div
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-3.5 sm:px-6 py-2 sm:py-3 rounded-full glass-gold max-w-[94vw] mx-auto text-center"
            style={{
              background: isDark ? 'rgba(197, 162, 39, 0.06)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: isDark ? 'rgba(197, 162, 39, 0.2)' : 'rgba(184, 138, 20, 0.45)',
              boxShadow: isDark ? 'none' : '0 4px 20px rgba(197, 162, 39, 0.15)',
            }}
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color: ACCENT }} />
            <span className="font-body text-[11px] sm:text-sm font-light tracking-wide text-center" style={{ color: textColor }}>
              31 Dec 2026 – 02 Jan 2027 · Mian Channu &amp; Burewala
            </span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" style={{ color: ACCENT }} />
          </div>
        </motion.div>

        {/* ── COUNTDOWN ── */}
        <motion.div {...fadeUp(0.72)} className="mb-8 sm:mb-10 w-full max-w-lg px-2">
          <div className="section-label mb-3 sm:mb-4 text-[10px] sm:text-xs text-center" style={{ color: labelColor }}>
            Counting Down to the Wedding Day
          </div>
          <Countdown target={couple.weddingDate} accent={ACCENT} accent2={ACCENT2} />
        </motion.div>

        {/* ── CTA ── */}
        <motion.div {...fadeUp(0.8)} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 w-full sm:w-auto max-w-xs sm:max-w-none px-4 sm:px-0">
          <Link to="/mehndi" className="btn-gold w-full sm:w-auto text-center justify-center">
            Explore Events
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#events" className="btn-outline-gold w-full sm:w-auto text-center justify-center">
            View Invitations ↓
          </a>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          EVENTS SECTION
      ═══════════════════════════════════════ */}
      <section id="events" className="relative pt-6 pb-20 sm:pt-10 sm:pb-24 px-4 sm:px-5">
        {/* Divider */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label mb-4" style={{ color: labelColor }}>
              Our Celebrations
            </div>
            <h2 className="font-display font-semibold leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: textColor }}
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
                    background: isDark ? ev.theme.gradient : (ev.theme.lightGradient || 'rgba(255, 255, 255, 0.95)'),
                    border: `1px solid ${isDark ? (ev.theme.border || ev.theme.accent + '35') : 'rgba(184, 138, 20, 0.35)'}`,
                    boxShadow: isDark ? `0 12px 40px ${ev.theme.glow || 'rgba(0,0,0,0.5)'}` : '0 10px 30px rgba(0,0,0,0.06)',
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
                            background: isDark ? (ev.theme.badgeBg || `${ev.theme.accent}15`) : 'rgba(255, 255, 255, 0.95)',
                            color: ev.theme.accent,
                            border: `1px solid ${ev.theme.border || ev.theme.accent + '30'}`,
                            boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
                          }}
                        >
                          {ev.theme.taglineBadge}
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3
                      className="font-display font-semibold text-2xl mb-2"
                      style={{ color: ev.theme.accent }}
                    >
                      {ev.name}
                    </h3>

                    {/* Tagline */}
                    <p
                      className="font-body text-xs font-light leading-relaxed mb-5"
                      style={{ color: textSubtle }}
                    >
                      "{ev.tagline}"
                    </p>

                    {/* Date + Time */}
                    <div
                      className="font-body text-sm font-medium mb-1"
                      style={{ color: textColor }}
                    >
                      {ev.dayName}, {ev.date}
                    </div>
                    <div
                      className="font-body text-xs font-light mb-5"
                      style={{ color: textFaint }}
                    >
                      {ev.time} · {ev.venue.city}
                    </div>

                    {/* CTA */}
                    <div
                      className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase group-hover:gap-4 transition-all duration-300 pt-3 border-t"
                      style={{
                        color: ev.theme.accent,
                        borderColor: isDark ? `${ev.theme.accent}25` : 'rgba(184, 138, 20, 0.3)',
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
          border: isDark ? 'rgba(212,175,55,0.3)' : 'rgba(184,138,20,0.35)',
          glow: 'rgba(212,175,55,0.2)',
          cardBg: isDark ? 'rgba(212,175,55,0.06)' : 'rgba(255, 255, 255, 0.92)',
        }}
      />
    </motion.div>
  );
}
