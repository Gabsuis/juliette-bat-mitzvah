'use client';

import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import react-countdown to avoid SSR issues
const ReactCountdown = dynamic(() => import('react-countdown'), { ssr: false });

// Bat Mitzvah date: July 26, 2026 at 6:00 PM (BAT_MITZVAH_DATE - keep same date for now as placeholder)
const BAT_MITZVAH_DATE = new Date(2026, 6, 26, 18, 0, 0); // Month is 0-indexed, so 6 = July

interface TimeBlockProps {
  value: number;
  label: string;
  index: number;
}

function TimeBlock({ value, label, index }: TimeBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="card bg-white/80 backdrop-blur-sm shadow-xl border border-[#D4EBF8] hover:shadow-2xl transition-all duration-300">
        <div className="card-body items-center p-6">
          <span className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#183F65] tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[#5BA3D9] font-medium tracking-widest uppercase text-sm mt-2">
            {label}
          </span>
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[#5BA3D9] to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '60%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.1 }}
          />
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5BA3D9]/0 via-[#5BA3D9]/10 to-[#5BA3D9]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

interface CountdownRendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export default function Countdown() {
  const renderer = ({ days, hours, completed }: CountdownRendererProps) => {
    if (completed) {
      return (
        <div className="text-center">
          <h3 className="font-serif text-4xl md:text-5xl text-[#183F65]">
            It's Celebration Day!
          </h3>
        </div>
      );
    }

    const timeBlocks = [
      { value: days, label: 'Days' },
      { value: hours, label: 'Hours' },
    ];

    return (
      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-lg mx-auto">
        {timeBlocks.map((block, index) => (
          <TimeBlock
            key={block.label}
            value={block.value}
            label={block.label}
            index={index}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5BA3D9]/10 via-[#B8D8F0]/20 to-[#5BA3D9]/10" />

      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Sparkles size={12 + i * 2} className="text-[#5BA3D9]/40" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl text-[#183F65] mb-2">
            Countdown to the Bat Mitzvah
          </h2>
          <p className="text-[#1F5486] text-lg">June 18, 2026</p>
        </motion.div>

        {/* Countdown using react-countdown - dynamically loaded */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          suppressHydrationWarning
        >
          <ReactCountdown
            date={BAT_MITZVAH_DATE}
            renderer={renderer}
          />
        </motion.div>

        {/* Decorative star */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Star size={28} className="text-[#5BA3D9] fill-[#B8D8F0]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
