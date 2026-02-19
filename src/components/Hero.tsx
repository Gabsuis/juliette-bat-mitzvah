'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

const floatingStars = [
  { size: 16, position: { top: '15%', left: '10%' }, delay: 0, duration: 4 },
  { size: 12, position: { top: '25%', right: '15%' }, delay: 1, duration: 5 },
  { size: 20, position: { bottom: '30%', left: '8%' }, delay: 2, duration: 4.5 },
  { size: 14, position: { top: '40%', right: '10%' }, delay: 0.5, duration: 5.5 },
  { size: 18, position: { bottom: '20%', right: '20%' }, delay: 1.5, duration: 4 },
  { size: 10, position: { top: '60%', left: '15%' }, delay: 2.5, duration: 5 },
];

export default function Hero() {
  const scrollToRSVP = () => {
    const element = document.getElementById('rsvp');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Elegant background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF] via-[#F0F7FF] to-[#D4EBF8]" />

      {/* Subtle decorative circles */}
      <motion.div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#B8D8F0]/30 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#B8D8F0]/25 blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating stars */}
      {floatingStars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute z-5 hidden md:block"
          style={star.position}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
        >
          <Star
            size={star.size}
            className="text-[#5BA3D9] fill-[#B8D8F0]"
          />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Engagement Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
            {/* Elegant photo frame decoration */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#5BA3D9]/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -inset-2 rounded-full border border-[#5BA3D9]/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />

            {/* The actual engagement photo */}
            <div className="absolute inset-3 rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/gallery/hero pic.jpeg"
                alt="Juliette"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-[#183F65] mb-8 md:mb-10 font-title px-6 leading-tight">
            <span className="gradient-text">Juliette</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl md:text-3xl text-[#1F5486] font-light mb-2"
        >
          I'm becoming a Bat Mitzvah!
        </motion.p>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="w-16 h-px bg-[#5BA3D9]" />
          <p className="text-xl md:text-2xl text-[#183F65] tracking-widest">
            June 18, 2026
          </p>
          <span className="w-16 h-px bg-[#5BA3D9]" />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={scrollToRSVP}
          className="px-8 py-3 rounded-full text-[#183F65] bg-white/50 backdrop-blur-sm border border-[#5BA3D9]/40 hover:bg-white/70 hover:border-[#5BA3D9]/60 transition-all duration-300 font-medium tracking-wide"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          RSVP Now
        </motion.button>
      </div>
    </section>
  );
}
