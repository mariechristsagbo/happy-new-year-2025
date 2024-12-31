'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSound } from 'use-sound';
import CountdownNumber from './CountdownNumber';
import { calculateTimeLeft, type TimeLeft } from '@/lib/utils/time';

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [playTick] = useSound('/tick.mp3', { volume: 0.25 });
  const [playCelebration] = useSound('/celebration.mp3', { volume: 0.5 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(prevTime => {
        if (prevTime.seconds !== newTime.seconds) {
          playTick();
        }
        
        if (Object.values(newTime).every(v => v === 0)) {
          playCelebration();
          clearInterval(timer);
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [playTick, playCelebration]);

  if (!mounted) {
    return null;
  }

  const timeSegments = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <div className="flex justify-center items-center space-x-2 md:space-x-4">
      <AnimatePresence mode="wait">
        {timeSegments.map((segment, index) => (
          <CountdownNumber
            key={segment.label}
            value={segment.value}
            label={segment.label}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}