import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Countdown({ target, accent, accent2 }) {
  const { isDark } = useTheme();
  const calc = () => {
    const diff = new Date(target) - Date.now();
    if (diff <= 0) return null;
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };

  const [t, setT] = useState(calc());

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) return (
    <div className="font-display text-2xl font-semibold" style={{ color: accent }}>
      The celebration has begun! 🎉
    </div>
  );

  const units = [
    { v: t.d, l: 'Days' },
    { v: t.h, l: 'Hours' },
    { v: t.m, l: 'Mins' },
    { v: t.s, l: 'Secs' },
  ];

  return (
    <div className="flex items-end gap-1 sm:gap-2 md:gap-4 justify-center">
      {units.map((u, i) => (
        <div key={u.l} className="flex items-end gap-1 sm:gap-2 md:gap-4">
          <div
            className="count-box rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              border: `1px solid ${accent}40`,
              background: isDark ? `${accent}10` : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: isDark
                ? `0 8px 30px ${accent}18, inset 0 1px 0 ${accent}35`
                : `0 8px 25px rgba(0,0,0,0.06), 0 0 15px ${accent}20`,
            }}
          >
            <span
              className="font-display font-semibold tabular-nums leading-none"
              style={{
                fontSize: 'clamp(1.6rem, 5.5vw, 3.5rem)',
                background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {String(u.v).padStart(2, '0')}
            </span>
            <span
              className="section-label mt-1"
              style={{
                color: isDark ? 'rgba(255,255,255,0.6)' : '#6e5d4e',
                fontSize: '0.58rem',
                fontWeight: isDark ? 300 : 600,
              }}
            >
              {u.l}
            </span>
          </div>
          {i < 3 && (
            <span
              className="font-display font-bold text-xl sm:text-2xl md:text-4xl pb-2 sm:pb-3 animate-pulse-soft"
              style={{ color: accent }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
