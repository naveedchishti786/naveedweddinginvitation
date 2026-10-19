import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Heart,
  Shirt, Utensils, Users, BookOpen
} from 'lucide-react';
import Countdown from '../components/CountdownTimer';
import MapSection from '../components/MapEmbed';
import RSVPModal from '../components/RSVPModal';
import Footer from '../components/Footer';
import InvitationBanner from '../components/InvitationBanner';
import NikkahBlessing from '../components/NikkahBlessing';
import { getEvent, events, couple } from '../data/events';
import { useTheme } from '../context/ThemeContext';

const navOrder = ['mehndi', 'barat', 'walima'];

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

// Decorative stars per page
const makeStars = (accent) => Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${0.8 + Math.random() * 2.5}px`,
  delay: `${Math.random() * 5}s`,
  dur: `${2 + Math.random() * 4}s`,
  color: accent,
}));

export default function EventPage({ eventId }) {
  const event = getEvent(eventId);
  const [rsvp, setRsvp] = useState(false);
  const { isDark } = useTheme();

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center text-white font-body">
      Event not found.
    </div>
  );

  const { theme } = event;
  const isDarkTheme = isDark;
  const activeCardBg = isDark ? theme.cardBg : (theme.lightCardBg || 'rgba(255, 255, 255, 0.95)');
  const activeBg = isDark ? theme.gradient : (theme.lightGradient || '#faf7f2');
  
  // High contrast color tokens for dark and light modes
  const textColor = isDark ? '#ffffff' : '#1a1612';
  const textMuted = isDark ? 'rgba(255,255,255,0.82)' : '#2b241e';
  const textSubtle = isDark ? 'rgba(255,255,255,0.65)' : '#4d4034';
  const textFaint = isDark ? 'rgba(255,255,255,0.45)' : '#786857';
  const labelColor = isDark ? `${theme.accent}cc` : '#8c680f';
  
  const idx = navOrder.indexOf(eventId);
  const prev = idx > 0 ? events.find(e => e.id === navOrder[idx - 1]) : null;
  const next = idx < navOrder.length - 1 ? events.find(e => e.id === navOrder[idx + 1]) : null;
  const stars = makeStars(theme.accent);

  return (
    <motion.div
      key={eventId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
      className="min-h-screen relative overflow-hidden transition-colors duration-500"
      style={{ background: activeBg }}
    >
      {/* ── STARS ── */}
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          top: s.top, left: s.left, width: s.size, height: s.size,
          background: s.color, opacity: isDark ? 0.45 : 0.2,
          animationDuration: s.dur, animationDelay: s.delay,
        }} />
      ))}

      {/* ── RADIAL GLOW ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[70vh] pointer-events-none"
        style={{
          background: theme.radialGradient || `radial-gradient(ellipse at 50% 20%, ${theme.accent}15 0%, transparent 70%)`,
        }}
      />

      {/* ══════════════════════
          HERO
      ══════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-3.5 sm:px-5 pb-8 sm:pb-12"
        style={{ paddingTop: 'calc(5.25rem + env(safe-area-inset-top, 0px))' }}
      >

        {/* Back Link */}
        <motion.div {...fadeIn(0)} className="w-full max-w-xl flex items-center justify-start mb-3 sm:mb-4 px-1">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-body text-xs font-medium tracking-widest uppercase transition-all duration-300 px-3 py-1.5 rounded-full hover:scale-105"
            style={{
              color: labelColor,
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${theme.border || theme.accent + '30'}`,
            }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to All
          </Link>
        </motion.div>

        {/* Bismillah */}
        <motion.div {...fadeIn(0.1)} className="mb-4 sm:mb-5">
          <div className="urdu text-xl md:text-2xl" style={{ color: isDark ? `${theme.accent}90` : '#9a7314' }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        </motion.div>

        {/* ── INVITATION BANNER (1st Section) ── */}
        <InvitationBanner theme={theme} />

        {/* Event name & Function Mood Badge */}
        <motion.div {...fadeIn(0.25)} className="w-full max-w-2xl px-2">
          {theme.taglineBadge && (
            <div
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full mb-3 text-[10px] sm:text-xs tracking-widest uppercase font-body max-w-full text-center"
              style={{
                background: isDark ? (theme.badgeBg || `${theme.accent}18`) : 'rgba(255, 255, 255, 0.95)',
                border: `1px solid ${theme.border || theme.accent + '35'}`,
                color: theme.accent,
                boxShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.05)',
              }}
            >
              <span>{event.icon}</span>
              <span className="truncate">{theme.taglineBadge}</span>
            </div>
          )}
          <div className="section-label mb-2 text-[10px] sm:text-xs" style={{ color: labelColor }}>
            You are Cordially Invited to the
          </div>
          <h1
            className="font-display font-semibold leading-none mb-2"
            style={{
              fontSize: 'clamp(3rem, 13vw, 8.5rem)',
              color: theme.accent,
              textShadow: isDark ? `0 0 80px ${theme.accent}45` : `0 2px 20px ${theme.accent}30`,
            }}
          >
            {event.name}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div {...fadeIn(0.4)} className="mb-6 sm:mb-8 max-w-xl px-3">
          <p
            className="font-display italic font-light text-base sm:text-lg md:text-2xl leading-relaxed"
            style={{ color: textMuted }}
          >
            "{event.tagline}"
          </p>
        </motion.div>

        {/* Couple names / Groom */}
        <motion.div {...fadeIn(0.45)} className="mb-6 sm:mb-8 px-2">
          <div
            className="font-script text-3xl sm:text-4xl md:text-5xl leading-tight"
            style={{ color: theme.accent }}
          >
            {eventId === 'mehndi' ? couple.groom : `${couple.groom} weds ${couple.bride}`}
          </div>
          {eventId === 'mehndi' && (
            <div
              className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-body mt-1.5"
              style={{ color: textSubtle }}
            >
              Son of {couple.groomParents}
            </div>
          )}
        </motion.div>

        {/* Date / Time / Venue badges */}
        <motion.div
          {...fadeIn(0.5)}
          className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10 w-full max-w-2xl px-2"
        >
          {[
            { Icon: Calendar, text: `${event.dayName}, ${event.date}` },
            { Icon: Clock,    text: event.time },
            { Icon: MapPin,   text: event.venue.name },
          ].map(({ Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl sm:rounded-full font-body text-xs sm:text-sm font-light backdrop-blur-md max-w-full text-center"
              style={{
                border: `1px solid ${theme.border || theme.accent + '30'}`,
                background: isDark ? (theme.badgeBg || `${theme.accent}10`) : 'rgba(255, 255, 255, 0.95)',
                color: textColor,
                boxShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.05)',
              }}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: theme.accent }} />
              <span className="break-words">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Countdown */}
        <motion.div {...fadeIn(0.58)} className="mb-8 sm:mb-10 w-full max-w-md px-2">
          <div className="section-label mb-3 sm:mb-4 text-[10px] sm:text-xs" style={{ color: labelColor }}>
            Time Until {event.name}
          </div>
          <Countdown target={event.isoDate} accent={theme.accent} accent2={theme.accent2} />
        </motion.div>

        {/* RSVP */}
        <motion.div {...fadeIn(0.65)}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setRsvp(true)}
            className="text-sm font-body font-medium uppercase tracking-wider inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full cursor-pointer transition-all duration-300"
            style={{
              background: theme.btnGradient || `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
              color: theme.btnText || '#1a0e00',
              boxShadow: `0 8px 40px ${theme.glow || theme.accent + '40'}`,
            }}
          >
            <Heart className="w-4 h-4 fill-current" />
            RSVP for {event.name}
          </motion.button>
        </motion.div>
      </section>

      {/* ══════════════════════
          ISLAMIC NIKKAH & SUNNAH BLESSING (BARAT & WALIMA ONLY)
      ══════════════════════ */}
      {(eventId === 'barat' || eventId === 'walima') && (
        <NikkahBlessing eventId={eventId} theme={theme} isDark={isDark} />
      )}

      {/* ══════════════════════
          ABOUT
      ══════════════════════ */}
      <section className="relative pt-6 pb-16 sm:pt-10 sm:pb-20 px-4 sm:px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div {...inView(0)} className="text-center mb-12">
            <div className="section-label mb-3" style={{ color: labelColor }}>
              About This Celebration
            </div>
            <h2
              className="font-display font-semibold leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: textColor }}
            >
              The Story of the{' '}
              <span style={{ color: theme.accent }}>{event.name}</span>
            </h2>
            <div className="ornament w-32 mx-auto text-xs" style={{ color: `${theme.accent}70` }}>
              <span>✦</span><span>✦</span>
            </div>
          </motion.div>

          <motion.div
            {...inView(0.15)}
            className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{
              borderColor: `${theme.accent}25`,
              background: activeCardBg,
              boxShadow: isDark ? 'none' : '0 12px 35px rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}70, transparent)` }}
            />
            {/* Opening quote mark */}
            <div
              className="font-display text-8xl font-bold leading-none absolute -top-2 left-6 opacity-10"
              style={{ color: theme.accent }}
            >
              "
            </div>
            <p
              className="font-body font-light text-base md:text-lg leading-8 relative z-10"
              style={{ color: textMuted }}
            >
              {event.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════
          SCHEDULE
      ══════════════════════ */}
      <section className="relative py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div {...inView(0)} className="text-center mb-12">
            <div className="section-label mb-3" style={{ color: labelColor }}>
              Programme
            </div>
            <h2
              className="font-display font-semibold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: textColor }}
            >
              Schedule &{' '}
              <span style={{ color: theme.accent }}>Timeline</span>
            </h2>
          </motion.div>

          <div className="relative pl-6 sm:pl-8 space-y-3 sm:space-y-4">
            {/* Vertical accent line */}
            <div
              className="absolute left-2.5 sm:left-3 top-3 bottom-3 w-px pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, ${theme.accent}70, ${theme.accent}15)`,
              }}
            />

            {event.schedule.map((item, i) => (
              <motion.div
                key={i}
                {...inView(i * 0.07)}
                className="relative flex items-start"
              >
                {/* Dot */}
                <div
                  className="absolute left-[-18.5px] sm:left-[-23.5px] top-4 w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}80` }}
                />
                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex-1 glass rounded-xl px-3.5 sm:px-5 py-3 sm:py-4 flex flex-col xs:flex-row sm:flex-row items-start xs:items-center sm:items-center justify-between gap-1.5 sm:gap-4"
                  style={{
                    borderColor: `${theme.accent}20`,
                    background: activeCardBg,
                    boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.04)',
                  }}
                >
                  <span
                    className="font-body text-xs sm:text-sm font-light leading-snug"
                    style={{ color: textMuted }}
                  >
                    {item.event}
                  </span>
                  <span
                    className="font-body text-[11px] sm:text-xs font-medium flex-shrink-0 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap self-end xs:self-auto sm:self-auto"
                    style={{
                      background: `${theme.accent}15`,
                      color: theme.accent,
                      border: `1px solid ${theme.accent}30`,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.time}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
          DRESS CODE
      ══════════════════════ */}
      <section className="relative py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div {...inView(0)} className="text-center mb-12">
            <div className="section-label mb-3" style={{ color: labelColor }}>
              Attire Guide
            </div>
            <h2
              className="font-display font-semibold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: textColor }}
            >
              <span style={{ color: theme.accent }}>Dress</span> Code
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Ladies 👩', detail: event.dressCode.ladies, emoji: '👗' },
              { label: 'Gentlemen 🤵', detail: event.dressCode.gents, emoji: '🤵' },
            ].map((dc, i) => (
              <motion.div
                key={dc.label}
                {...inView(i * 0.12)}
                className="glass rounded-2xl p-7 text-center relative overflow-hidden group"
                style={{
                  borderColor: `${theme.accent}20`,
                  background: activeCardBg,
                  boxShadow: isDark ? 'none' : '0 8px 25px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${theme.accent}08, transparent 60%)` }}
                />
                <div className="text-5xl mb-4">{dc.emoji}</div>
                <div
                  className="font-display text-xl font-semibold mb-3"
                  style={{ color: theme.accent }}
                >
                  {dc.label}
                </div>
                <p
                  className="font-body text-sm font-light leading-6"
                  style={{ color: textSubtle }}
                >
                  {dc.detail}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════
          VENUE & MAP
      ══════════════════════ */}
      <section className="relative py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div {...inView(0)} className="text-center mb-12">
            <div className="section-label mb-3" style={{ color: labelColor }}>
              Venue
            </div>
            <h2
              className="font-display font-semibold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: textColor }}
            >
              Location &{' '}
              <span style={{ color: theme.accent }}>Directions</span>
            </h2>
          </motion.div>

          <motion.div {...inView(0.15)}>
            <MapSection
              venue={event.venue}
              accent={theme.accent}
              cardBg={activeCardBg}
              btnGradient={theme.btnGradient}
              btnText={theme.btnText}
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════
          RSVP BANNER
      ══════════════════════ */}
      <section className="relative py-24 px-5">
        <motion.div
          {...inView(0)}
          className="max-w-2xl mx-auto rounded-3xl p-10 md:p-14 text-center relative overflow-hidden backdrop-blur-xl"
          style={{
            borderColor: `${theme.accent}30`,
            borderWidth: '1px',
            borderStyle: 'solid',
            background: activeCardBg,
            boxShadow: isDark ? 'none' : '0 12px 40px rgba(0,0,0,0.06)',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}80, transparent)` }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}40, transparent)` }}
          />

          <div className="text-6xl mb-6 animate-float">{event.icon}</div>

          <div className="section-label mb-3" style={{ color: labelColor }}>
            Your Presence is Requested
          </div>
          <h2
            className="font-display font-semibold text-2xl md:text-3xl mb-4"
            style={{ color: textColor }}
          >
            Will You Join Us?
          </h2>
          <p
            className="font-body text-sm font-light leading-relaxed mb-8"
            style={{ color: textMuted }}
          >
            Your presence would fill our hearts with joy.
            <br />
            Kindly confirm your attendance by{' '}
            <span className="font-medium" style={{ color: textColor }}>February 28, 2025.</span>
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setRsvp(true)}
            className="text-sm font-body font-medium uppercase tracking-wider inline-flex items-center gap-2.5 px-8 py-4 rounded-full cursor-pointer transition-all duration-300 mx-auto"
            style={{
              background: theme.btnGradient || `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
              color: theme.btnText || '#1a0e00',
              boxShadow: `0 10px 50px ${theme.glow || theme.accent + '40'}`,
            }}
          >
            <Heart className="w-4 h-4 fill-current" />
            RSVP for {event.name}
          </motion.button>
        </motion.div>
      </section>

      {/* ══════════════════════
          PREV / NEXT
      ══════════════════════ */}
      <nav
        className="relative py-6 sm:py-8 px-3 sm:px-5 flex items-center justify-between gap-2"
        style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)' }}
      >
        {prev ? (
          <Link to={`/${prev.id}`} className="min-w-0">
            <motion.div whileHover={{ x: -4 }} className="flex items-center gap-2 sm:gap-3 group">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  border: `1px solid ${prev.theme.border || prev.theme.accent + '40'}`,
                  background: isDark ? prev.theme.cardBg : 'rgba(255,255,255,0.9)',
                  color: prev.theme.accent,
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div
                  className="font-body text-[9px] sm:text-[10px] tracking-widest uppercase truncate"
                  style={{ color: textFaint }}
                >
                  Previous
                </div>
                <div
                  className="font-display text-xs sm:text-base font-semibold truncate max-w-[85px] sm:max-w-none"
                  style={{ color: prev.theme.accent }}
                >
                  {prev.name}
                </div>
              </div>
            </motion.div>
          </Link>
        ) : <div className="w-9 sm:w-10" />}

        <Link to="/" className="flex-shrink-0">
          <motion.div whileHover={{ scale: 1.08 }} className="text-center px-1">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden mx-auto mb-1 transition-all duration-300"
              style={{
                border: `1.5px solid ${theme.border || theme.accent + '50'}`,
                boxShadow: `0 0 15px ${theme.glow || theme.accent + '20'}`,
              }}
            >
              <img src={couple.logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div
              className="font-body text-[9px] sm:text-[10px] tracking-widest uppercase whitespace-nowrap"
              style={{ color: textFaint }}
            >
              All Events
            </div>
          </motion.div>
        </Link>

        {next ? (
          <Link to={`/${next.id}`} className="min-w-0">
            <motion.div whileHover={{ x: 4 }} className="flex items-center gap-2 sm:gap-3 group justify-end">
              <div className="text-right min-w-0">
                <div
                  className="font-body text-[9px] sm:text-[10px] tracking-widest uppercase truncate"
                  style={{ color: textFaint }}
                >
                  Next
                </div>
                <div
                  className="font-display text-xs sm:text-base font-semibold truncate max-w-[85px] sm:max-w-none"
                  style={{ color: next.theme.accent }}
                >
                  {next.name}
                </div>
              </div>
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  border: `1px solid ${next.theme.border || next.theme.accent + '40'}`,
                  background: isDark ? next.theme.cardBg : 'rgba(255,255,255,0.9)',
                  color: next.theme.accent,
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>
        ) : <div className="w-9 sm:w-10" />}
      </nav>

      {/* ── UNIFIED FOOTER & FAMILY SECTION ── */}
      <Footer theme={theme} />

      {/* RSVP Modal */}
      <RSVPModal open={rsvp} onClose={() => setRsvp(false)} event={event} />
    </motion.div>
  );
}
