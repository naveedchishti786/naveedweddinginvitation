import { useState, useEffect } from 'react';

export default function Countdown({ target, accent, accent2 }) {
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
    <div className="flex items-end gap-2 md:gap-4 justify-center">
      {units.map((u, i) => (
        <div key={u.l} className="flex items-end gap-2 md:gap-4">
          <div
            className="count-box rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              border: `1px solid ${accent}40`,
              background: `${accent}10`,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: `0 8px 30px ${accent}18, inset 0 1px 0 ${accent}35`,
            }}
          >
            <span
              className="font-display font-semibold tabular-nums leading-none"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {String(u.v).padStart(2, '0')}
            </span>
            <span
              className="section-label mt-1"
              style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem' }}
            >
              {u.l}
            </span>
          </div>
          {i < 3 && (
            <span
              className="font-display font-bold text-2xl md:text-4xl pb-3 animate-pulse-soft"
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
