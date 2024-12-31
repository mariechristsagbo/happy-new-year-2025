'use client';

import { motion } from 'framer-motion';

interface CountdownNumberProps {
  value: number;
  label: string;
  index: number;
}

export default function CountdownNumber({ value, label, index }: CountdownNumberProps) {
  return (
    <motion.div
      className="flex flex-col items-center mx-4"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.span
        key={`${label}-${value}`}
        className="text-6xl md:text-8xl font-bold text-gradient"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
      >
        {value.toString().padStart(2, '0')}
      </motion.span>
      <span className="text-sm md:text-base text-[hsl(var(--silver))]">{label}</span>
    </motion.div>
  );
}