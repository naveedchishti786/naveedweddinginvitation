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
import { getEvent, events, couple } from '../data/events';

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

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center text-white font-body">
      Event not found.
    </div>
  );

  const { theme } = event;
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
      className="min-h-screen relative overflow-hidden"
      style={{ background: theme.gradient }}
    >
      {/* ── STARS ── */}
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          top: s.top, left: s.left, width: s.size, height: s.size,
          background: s.color, opacity: 0.45,
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
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-24 pb-16">

        {/* Back */}
        <motion.div
          {...fadeIn(0)}
          className="absolute top-24 left-5 md:left-10"
        >
          <Link
            to="/"
            className="flex items-center gap-1.5 font-body text-xs font-light tracking-widest uppercase transition-colors duration-300 hover:text-white"
            style={{ color: `${theme.accent}aa` }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to All
          </Link>
        </motion.div>

        {/* Bismillah */}
        <motion.div {...fadeIn(0.1)} className="mb-5">
          <div className="urdu text-xl md:text-2xl" style={{ color: `${theme.accent}90` }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        </motion.div>

        {/* ── INVITATION BANNER (1st Section) ── */}
        <InvitationBanner theme={theme} />

        {/* Event name & Function Mood Badge */}
        <motion.div {...fadeIn(0.25)}>
          {theme.taglineBadge && (
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 text-xs tracking-widest uppercase font-body"
              style={{
                background: theme.badgeBg || `${theme.accent}18`,
                border: `1px solid ${theme.border || theme.accent + '35'}`,
                color: theme.accent,
              }}
            >
              <span>{event.icon}</span>
              <span>{theme.taglineBadge}</span>
            </div>
          )}
          <div className="section-label mb-2" style={{ color: `${theme.accent}80` }}>
            You are Cordially Invited to the
          </div>
          <h1
            className="font-display font-semibold leading-none mb-2"
            style={{
              fontSize: 'clamp(4rem, 14vw, 9rem)',
              color: theme.accent,
              textShadow: `0 0 80px ${theme.accent}45`,
            }}
          >
            {event.name}
          </h1>
          <div className="urdu text-2xl md:text-3xl mb-3" style={{ color: `${theme.accent}70` }}>
            {event.urdu}
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div {...fadeIn(0.4)} className="mb-8 max-w-xl">
          <p
            className="font-display italic font-light text-lg md:text-2xl"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            "{event.tagline}"
          </p>
        </motion.div>

        {/* Couple names / Groom */}
        <motion.div {...fadeIn(0.45)} className="mb-8">
          <div
            className="font-script text-4xl md:text-5xl"
            style={{ color: theme.accent }}
          >
            {eventId === 'mehndi' ? couple.groom : `${couple.groom} weds ${couple.bride}`}
          </div>
          {eventId === 'mehndi' && (
            <div
              className="text-xs uppercase tracking-[0.25em] font-body mt-1.5 text-white/75"
            >
              Son of {couple.groomParents}
            </div>
          )}
        </motion.div>

        {/* Date / Time / Venue badges */}
        <motion.div
          {...fadeIn(0.5)}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {[
            { Icon: Calendar, text: `${event.dayName}, ${event.date}` },
            { Icon: Clock,    text: event.time },
            { Icon: MapPin,   text: event.venue.name },
          ].map(({ Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-sm font-light backdrop-blur-md"
              style={{
                border: `1px solid ${theme.border || theme.accent + '30'}`,
                background: theme.badgeBg || `${theme.accent}10`,
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: theme.accent }} />
              {text}
            </div>
          ))}
        </motion.div>

        {/* Countdown */}
        <motion.div {...fadeIn(0.58)} className="mb-10 w-full max-w-md">
          <div className="section-label mb-4" style={{ color: `${theme.accent}70` }}>
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

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white">Scroll</span>
          <div className="scroll-arrow" style={{ borderColor: theme.accent }} />
        </motion.div>
      </section>

      {/* ══════════════════════
          ABOUT
      ══════════════════════ */}
      <section className="relative py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div {...inView(0)} className="text-center mb-12">
            <div className="section-label mb-3" style={{ color: `${theme.accent}55` }}>
              About This Celebration
            </div>
            <h2
              className="font-display font-semibold leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white' }}
            >
              The Story of the{' '}
              <span style={{ color: theme.accent }}>{event.name}</span>
            </h2>
            <div className="ornament w-32 mx-auto text-xs" style={{ color: `${theme.accent}40` }}>
              <span>✦</span><span>✦</span>
            </div>
          </motion.div>

          <motion.div
            {...inView(0.15)}
            className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{ borderColor: `${theme.accent}15` }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}50, transparent)` }}
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
              style={{ color: 'rgba(255,255,255,0.78)' }}
            >
              {event.description}
            </p>
            {/* Urdu description */}
            <div
              className="urdu text-base mt-6 pt-6 font-light leading-9"
              style={{
                borderTop: `1px solid ${theme.accent}15`,
                color: `${theme.accent}60`,
              }}
            >
              {event.descriptionUrdu}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════
          SCHEDULE
      ══════════════════════ */}
      <section className="relative py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div {...inView(0)} className="text-center mb-12">
            <div className="section-label mb-3" style={{ color: `${theme.accent}55` }}>
              Programme
            </div>
            <h2
              className="font-display font-semibold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white' }}
            >
              Schedule &{' '}
              <span style={{ color: theme.accent }}>Timeline</span>
            </h2>
          </motion.div>

          <div className="relative pl-6 md:pl-8 space-y-4">
            {/* Vertical accent line */}
            <div
              className="timeline-line"
              style={{
                background: `linear-gradient(to bottom, ${theme.accent}50, ${theme.accent}10)`,
              }}
            />

            {event.schedule.map((item, i) => (
              <motion.div
                key={i}
                {...inView(i * 0.07)}
                className="relative flex items-start gap-4 md:gap-6"
              >
                {/* Dot */}
                <div
                  className="absolute -left-6 md:-left-8 top-3.5 w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}60` }}
                />
                {/* Card */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex-1 glass rounded-xl px-5 py-4 flex items-center justify-between gap-4"
                  style={{ borderColor: `${theme.accent}12`, background: theme.cardBg }}
                >
                  <span
                    className="font-body text-sm font-light"
                    style={{ color: 'rgba(255,255,255,0.78)' }}
                  >
                    {item.event}
                  </span>
                  <span
                    className="font-body text-xs font-medium flex-shrink-0 px-3 py-1 rounded-full"
                    style={{
                      background: `${theme.accent}15`,
                      color: theme.accent,
                      border: `1px solid ${theme.accent}25`,
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
            <div className="section-label mb-3" style={{ color: `${theme.accent}55` }}>
              Attire Guide
            </div>
            <h2
              className="font-display font-semibold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white' }}
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
                style={{ borderColor: `${theme.accent}15`, background: theme.cardBg }}
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
                  style={{ color: 'rgba(255,255,255,0.58)' }}
                >
                  {dc.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Walima Dress Inspiration Preview */}
          {eventId === 'walima' && (
            <motion.div
              {...inView(0.22)}
              className="mt-8 glass rounded-2xl p-6 text-center max-w-sm mx-auto overflow-hidden relative"
              style={{ borderColor: `${theme.accent}35`, background: theme.cardBg }}
            >
              <div
                className="w-full h-80 rounded-xl overflow-hidden mx-auto mb-3 shadow-2xl relative border"
                style={{ borderColor: `${theme.accent}40` }}
              >
                <img
                  src="/walima-dress.jpg"
                  alt="Walima Dress Color Inspiration"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div
                className="text-xs uppercase tracking-widest font-body font-medium"
                style={{ color: theme.accent }}
              >
                Couples' Walima Attire Palette
              </div>
              <p className="text-xs text-white/75 mt-1 font-body font-light">
                Pastel Sage Green, Mint Mist &amp; Shimmering Silver Zardozi
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════
          VENUE & MAP
      ══════════════════════ */}
      <section className="relative py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div {...inView(0)} className="text-center mb-12">
            <div className="section-label mb-3" style={{ color: `${theme.accent}55` }}>
              Venue
            </div>
            <h2
              className="font-display font-semibold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white' }}
            >
              Location &{' '}
              <span style={{ color: theme.accent }}>Directions</span>
            </h2>
          </motion.div>

          <motion.div {...inView(0.15)}>
            <MapSection
              venue={event.venue}
              accent={theme.accent}
              cardBg={theme.cardBg}
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
          style={{ borderColor: `${theme.accent}30`, borderWidth: '1px', borderStyle: 'solid', background: theme.cardBg }}
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

          <div className="section-label mb-3" style={{ color: `${theme.accent}80` }}>
            Your Presence is Requested
          </div>
          <h2
            className="font-display font-semibold text-2xl md:text-3xl text-white mb-4"
          >
            Will You Join Us?
          </h2>
          <p
            className="font-body text-sm font-light leading-relaxed mb-8"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Your presence would fill our hearts with joy.
            <br />
            Kindly confirm your attendance by{' '}
            <span className="text-white font-medium">February 28, 2025.</span>
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

          {/* Urdu */}
          <div
            className="urdu mt-6 text-sm"
            style={{ color: `${theme.accent}70` }}
          >
            {event.descriptionUrdu}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════
          PREV / NEXT
      ══════════════════════ */}
      <nav
        className="relative py-8 px-5 flex items-center justify-between"
        style={{ borderTop: `1px solid rgba(255,255,255,0.08)` }}
      >
        {prev ? (
          <Link to={`/${prev.id}`}>
            <motion.div whileHover={{ x: -6 }} className="flex items-center gap-3 group">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ border: `1px solid ${prev.theme.border || prev.theme.accent + '40'}`, background: prev.theme.cardBg, color: prev.theme.accent }}
              >
                <ChevronLeft className="w-4 h-4" />
              </div>
              <div>
                <div
                  className="font-body text-[10px] tracking-widest uppercase"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Previous
                </div>
                <div
                  className="font-display text-base font-semibold"
                  style={{ color: prev.theme.accent }}
                >
                  {prev.emoji} {prev.name}
                </div>
              </div>
            </motion.div>
          </Link>
        ) : <div />}

        <Link to="/">
          <motion.div whileHover={{ scale: 1.08 }} className="text-center">
            <div
              className="w-10 h-10 rounded-full overflow-hidden mx-auto mb-1 transition-all duration-300"
              style={{ border: `1.5px solid ${theme.border || theme.accent + '50'}`, boxShadow: `0 0 15px ${theme.glow || theme.accent + '20'}` }}
            >
              <img src={couple.logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div
              className="font-body text-[10px] tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              All Events
            </div>
          </motion.div>
        </Link>

        {next ? (
          <Link to={`/${next.id}`}>
            <motion.div whileHover={{ x: 6 }} className="flex items-center gap-3 group">
              <div className="text-right">
                <div
                  className="font-body text-[10px] tracking-widest uppercase"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Next
                </div>
                <div
                  className="font-display text-base font-semibold"
                  style={{ color: next.theme.accent }}
                >
                  {next.name} {next.emoji}
                </div>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ border: `1px solid ${next.theme.border || next.theme.accent + '40'}`, background: next.theme.cardBg, color: next.theme.accent }}
              >
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>
        ) : <div />}
      </nav>

      {/* ── UNIFIED FOOTER & FAMILY SECTION ── */}
      <Footer theme={theme} />

      {/* RSVP Modal */}
      <RSVPModal open={rsvp} onClose={() => setRsvp(false)} event={event} />
    </motion.div>
  );
}
