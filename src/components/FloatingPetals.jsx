import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const pageEmojis = {
  '/': ['✨', '💎', '💐', '💍', '🌟', '💫', '⭐'],
  '/mehndi': ['🌿', '🍃', '🌱', '🌼', '🏵️', '💛', '🌸'],
  '/barat': ['🌹', '🥀', '✨', '👑', '💛', '💍', '🌺'],
  '/walima': ['✨', '🥂', '⭐', '💎', '🤍', '💫', '✦'],
};

export default function FloatingPetals() {
  const location = useLocation();
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const emojis = pageEmojis[location.pathname] || pageEmojis['/'];
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${8 + Math.random() * 6}s`,
      size: `${0.8 + Math.random() * 1.2}rem`,
      opacity: 0.15 + Math.random() * 0.2,
    }));
    setPetals(newPetals);
  }, [location.pathname]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: petal.left,
            top: '-50px',
            fontSize: petal.size,
            opacity: petal.opacity,
            animationName: 'petalFall',
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </div>
  );
}
