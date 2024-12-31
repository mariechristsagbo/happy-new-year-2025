'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      const x = Math.random() * window.innerWidth;
      const y = -10;
      const rotation = Math.random() * 360;
      const scale = 0.5 + Math.random();
      
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
      confetti.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      
      container.appendChild(confetti);

      const animation = confetti.animate([
        { transform: `translate(0, 0) rotate(${rotation}deg) scale(${scale})`, opacity: 1 },
        { transform: `translate(${25 - Math.random() * 50}px, ${window.innerHeight}px) rotate(${rotation + 360}deg) scale(${scale})`, opacity: 0 }
      ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });

      animation.onfinish = () => confetti.remove();
    };

    const interval = setInterval(createConfetti, 50);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
}