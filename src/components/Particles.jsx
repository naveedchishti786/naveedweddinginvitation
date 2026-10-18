import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const pageParticles = {
  '/':       { symbols: ['✦', '✧', '✨', '💍', '❋', '⭐'], color: 'rgba(212, 175, 55, 0.22)' },
  '/mehndi': { symbols: ['🌿', '🌼', '🍃', '🏵️', '💛', '🌸'], color: 'rgba(245, 158, 11, 0.28)' },
  '/barat':  { symbols: ['🌹', '🥀', '✨', '👑', '💛', '💍', '🌺'], color: 'rgba(243, 192, 91, 0.28)' },
  '/walima': { symbols: ['✨', '💎', '🥂', '⭐', '🤍', '💫', '✦'], color: 'rgba(243, 213, 163, 0.28)' },
};

export default function Particles() {
  const location = useLocation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cfg = pageParticles[location.pathname] || pageParticles['/'];
    setItems(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        symbol: cfg.symbols[Math.floor(Math.random() * cfg.symbols.length)],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 12}s`,
        duration: `${12 + Math.random() * 10}s`,
        size: `${0.6 + Math.random() * 1}rem`,
        color: cfg.color,
      }))
    );
  }, [location.pathname]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {items.map((p) => (
        <div
          key={p.id}
          className="particle absolute select-none"
          style={{
            left: p.left,
            top: '-60px',
            fontSize: p.size,
            color: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  );
}
