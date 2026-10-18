import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { couple } from '../data/events';

const navLinks = [
  { path: '/',        label: 'Home',   icon: '💍', urdu: 'ہوم' },
  { path: '/mehndi',  label: 'Mehndi', icon: '🌿', urdu: 'مہندی' },
  { path: '/barat',   label: 'Barat',  icon: '🐎', urdu: 'بارات' },
  { path: '/walima',  label: 'Walima', icon: '✨', urdu: 'ولیمہ' },
];

const pageThemes = {
  '/':       { accent: '#d4af37', accent2: '#fde047', nav: 'rgba(7, 3, 14, 0.95)', border: 'rgba(212, 175, 55, 0.25)', glow: 'rgba(212, 175, 55, 0.2)' },
  '/mehndi': { accent: '#f59e0b', accent2: '#10b981', nav: 'rgba(4, 18, 10, 0.95)', border: 'rgba(245, 158, 11, 0.3)', glow: 'rgba(245, 158, 11, 0.25)' },
  '/barat':  { accent: '#f5c563', accent2: '#ff4d6d', nav: 'rgba(10, 2, 5, 0.96)', border: 'rgba(245, 197, 99, 0.32)', glow: 'rgba(220, 38, 38, 0.25)' },
  '/walima': { accent: '#9dd4b3', accent2: '#d8ebe0', nav: 'rgba(6, 17, 12, 0.96)', border: 'rgba(157, 212, 179, 0.32)', glow: 'rgba(157, 212, 179, 0.25)' },
};

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location              = useLocation();
  const theme                 = pageThemes[location.pathname] || pageThemes['/'];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? theme.nav : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? `1px solid ${theme.border}` : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between h-[70px] md:h-[80px]">

            {/* ── LOGO ── */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden transition-all duration-500"
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
              <div className="hidden sm:block leading-tight">
                <div
                  className="font-display font-semibold text-base md:text-lg leading-none transition-colors duration-500"
                  style={{ color: theme.accent }}
                >
                  {couple.groom} weds {couple.bride}
                </div>
                <div
                  className="text-[10px] tracking-[0.35em] uppercase mt-0.5 transition-colors duration-500"
                  style={{ color: `${theme.accent}80` }}
                >
                  {couple.hashtag}
                </div>
              </div>
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <nav className="hidden md:flex items-center gap-8">
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
                      style={{ color: active ? theme.accent : 'rgba(255,255,255,0.6)' }}
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

            {/* ── SAVE DATE ── */}
            <div className="hidden md:block">
              <div
                className="text-[10px] tracking-[0.3em] uppercase text-center transition-colors duration-500"
                style={{ color: `${theme.accent}80` }}
              >
                Save the Date
              </div>
              <div
                className="font-display text-xs text-center font-semibold transition-colors duration-500 whitespace-nowrap"
                style={{ color: theme.accent }}
              >
                Dec 2026 – Jan 2027
              </div>
            </div>

            {/* ── MOBILE BURGER ── */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
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
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{ background: theme.nav, backdropFilter: 'blur(24px)' }}
          >
            {/* Logo centred */}
            <div className="mb-10 text-center">
              <div
                className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4"
                style={{ border: `2px solid ${theme.border}`, boxShadow: `0 0 40px ${theme.glow}` }}
              >
                <img src={couple.logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="font-script text-4xl mb-1" style={{ color: theme.accent }}>
                {couple.groom} weds {couple.bride}
              </div>
              <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: `${theme.accent}80` }}>
                {couple.hashtag}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center gap-7">
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
                        style={{ color: location.pathname === link.path ? theme.accent : 'rgba(255,255,255,0.85)' }}
                      >
                        {link.label}
                      </div>
                      <div className="urdu text-sm" style={{ color: `${theme.accent}80` }}>
                        {link.urdu}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
