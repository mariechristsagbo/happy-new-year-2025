'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Countdown from '@/components/Countdown';
import Confetti from '@/components/Confetti';

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gradient">
          Welcome 2025
        </h1>
        
        <div className="mb-12">
          <Countdown />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-lg md:text-xl text-[hsl(var(--silver))] mb-8"
        >
          Wishing you joy, success, and happiness in the year ahead
        </motion.p>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      </motion.div>

      {showConfetti && <Confetti />}
    </main>
  );
}