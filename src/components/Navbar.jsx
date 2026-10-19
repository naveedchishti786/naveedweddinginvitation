import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { couple } from '../data/events';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { path: '/',        label: 'Home',   icon: '💍' },
  { path: '/mehndi',  label: 'Mehndi', icon: '🌿' },
  { path: '/barat',   label: 'Barat',  icon: '🐎' },
  { path: '/walima',  label: 'Walima', icon: '✨' },
];

const pageThemes = {
  '/':       { accent: '#d4af37', accent2: '#fde047', nav: 'rgba(7, 3, 14, 0.95)', navLight: 'rgba(252, 249, 243, 0.96)', border: 'rgba(212, 175, 55, 0.3)', glow: 'rgba(212, 175, 55, 0.2)' },
  '/mehndi': { accent: '#d97706', accent2: '#059669', nav: 'rgba(4, 18, 10, 0.95)', navLight: 'rgba(244, 249, 244, 0.96)', border: 'rgba(217, 119, 6, 0.35)', glow: 'rgba(217, 119, 6, 0.25)' },
  '/barat':  { accent: '#dc2626', accent2: '#d97706', nav: 'rgba(10, 2, 5, 0.96)', navLight: 'rgba(253, 246, 247, 0.96)', border: 'rgba(220, 38, 38, 0.32)', glow: 'rgba(220, 38, 38, 0.25)' },
  '/walima': { accent: '#2d6a4f', accent2: '#52b788', nav: 'rgba(6, 17, 12, 0.96)', navLight: 'rgba(244, 249, 246, 0.96)', border: 'rgba(45, 106, 79, 0.32)', glow: 'rgba(45, 106, 79, 0.25)' },
};

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const theme                   = pageThemes[location.pathname] || pageThemes['/'];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const navBg = scrolled ? (isDark ? theme.nav : theme.navLight) : 'transparent';
  const navBorder = scrolled ? `1px solid ${theme.border}` : 'none';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navBg,
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: navBorder,
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10">
          <div className="flex items-center justify-between h-[62px] sm:h-[70px] md:h-[80px]">

            {/* ── LOGO ── */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 pr-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative flex-shrink-0"
              >
                <div
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden transition-all duration-500"
                  style={{
                    border: `1.5px solid ${theme.border}`,
                    boxShadow: `0 0 20px ${theme.glow}`,
                  }}
                >
                  <img
                    src={couple.logo}
                    alt="AN Monogram"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              <div className="leading-tight min-w-0">
                <div
                  className="font-display font-semibold text-sm sm:text-base md:text-lg leading-none transition-colors duration-500 truncate"
                  style={{ color: theme.accent }}
                >
                  {couple.groom} weds {couple.bride}
                </div>
                <div
                  className="text-[8.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.35em] uppercase mt-0.5 transition-colors duration-500 truncate"
                  style={{ color: `${theme.accent}90` }}
                >
                  {couple.hashtag}
                </div>
              </div>
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative flex items-center gap-1.5 group"
                  >
                    <span className="text-xs">{link.icon}</span>
                    <span
                      className="font-body text-sm font-light tracking-widest uppercase transition-colors duration-300"
                      style={{ color: active ? theme.accent : (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(28,24,20,0.75)') }}
                    >
                      {link.label}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── RIGHT ACTIONS (Desktop) ── */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle Button - Segmented Pill */}
              <div
                onClick={toggleTheme}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleTheme()}
                aria-label="Toggle Theme Mode"
                className="flex items-center p-0.5 rounded-full text-xs font-body cursor-pointer select-none transition-all duration-300 hover:scale-105"
                style={{
                  border: `1px solid ${theme.border}`,
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                }}
                title={isDark ? "Currently in Dark Mode — Click to switch to Light" : "Currently in Light Mode — Click to switch to Dark"}
              >
                <span
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-300"
                  style={{
                    background: isDark ? 'transparent' : 'rgba(212,175,55,0.22)',
                    color: isDark ? 'rgba(255,255,255,0.45)' : '#8c680f',
                    fontWeight: isDark ? 400 : 700,
                  }}
                >
                  <span className="text-xs">☀️</span>
                  <span className="text-[10px] tracking-wider uppercase">Light</span>
                </span>
                <span
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-300"
                  style={{
                    background: isDark ? 'linear-gradient(135deg, rgba(212,175,55,0.35), rgba(212,175,55,0.2))' : 'transparent',
                    color: isDark ? theme.accent : 'rgba(0,0,0,0.4)',
                    fontWeight: isDark ? 700 : 400,
                  }}
                >
                  <span className="text-xs">🌙</span>
                  <span className="text-[10px] tracking-wider uppercase">Dark</span>
                </span>
              </div>

              {/* Save Date */}
              <div className="text-right">
                <div
                  className="text-[9px] tracking-[0.25em] uppercase transition-colors duration-500"
                  style={{ color: `${theme.accent}90` }}
                >
                  Save the Date
                </div>
                <div
                  className="font-display text-xs font-semibold transition-colors duration-500 whitespace-nowrap"
                  style={{ color: theme.accent }}
                >
                  Dec 2026 – Jan 2027
                </div>
              </div>
            </div>

            {/* ── MOBILE CONTROLS (Theme Toggle + Burger) ── */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-body transition-all duration-300"
                style={{
                  border: `1px solid ${theme.border}`,
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  color: isDark ? theme.accent : '#8c680f',
                }}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <span className="text-sm">{isDark ? '🌙' : '☀️'}</span>
                <span className="text-[9.5px] font-semibold uppercase tracking-wider">
                  {isDark ? 'Dark' : 'Light'}
                </span>
              </button>

              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  border: `1px solid ${theme.border}`,
                  color: theme.accent,
                  background: `${theme.accent}10`,
                }}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden overflow-y-auto px-5 py-8"
            style={{
              background: isDark ? theme.nav : 'rgba(252, 249, 243, 0.98)',
              backdropFilter: 'blur(24px)',
              paddingTop: 'max(2rem, env(safe-area-inset-top, 24px))',
              paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 24px))',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute w-11 h-11 flex items-center justify-center rounded-full cursor-pointer transition-transform duration-200 active:scale-95"
              style={{
                top: 'max(1.25rem, env(safe-area-inset-top, 20px))',
                right: 'max(1.25rem, env(safe-area-inset-right, 20px))',
                border: `1px solid ${theme.border}`,
                color: theme.accent,
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              }}
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo centred */}
            <div className="mb-8 text-center">
              <div
                className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3"
                style={{ border: `2px solid ${theme.border}`, boxShadow: `0 0 40px ${theme.glow}` }}
              >
                <img src={couple.logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="font-script text-3xl mb-1" style={{ color: theme.accent }}>
                {couple.groom} weds {couple.bride}
              </div>
              <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: `${theme.accent}90` }}>
                {couple.hashtag}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-3"
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <div>
                      <div
                        className="font-display text-2xl font-semibold"
                        style={{ color: location.pathname === link.path ? theme.accent : (isDark ? 'rgba(255,255,255,0.85)' : '#1a1612') }}
                      >
                        {link.label}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Theme Toggle in Mobile Drawer */}
            <div className="mt-8">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                style={{
                  border: `1px solid ${theme.border}`,
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  color: theme.accent,
                }}
              >
                <span>{isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
