'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#F0F7FF] to-[#D4EBF8]">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#B8D8F0] to-transparent" />

      <div className="max-w-4xl mx-auto px-6 text-center py-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#B8D8F0] mx-auto">
            <Image
              src="/gallery/WhatsApp Image 2026-02-18 at 16.23.38.jpeg"
              alt="Juliette"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Names */}
        <motion.h3
          className="font-serif text-3xl md:text-4xl text-[#183F65] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Juliette
        </motion.h3>

        {/* Hashtag */}
        <motion.p
          className="text-[#5BA3D9] font-medium tracking-wider mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          #JulietteBatMitzvah
        </motion.p>

        {/* Decorative stars */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -5, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Star
                size={i === 2 ? 20 : 14}
                className={`${
                  i === 2
                    ? 'text-[#5BA3D9] fill-[#5BA3D9]'
                    : 'text-[#B8D8F0] fill-[#B8D8F0]'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Made with love */}
        <motion.p
          className="text-[#3B82C8] text-sm flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Made with love{' '}
          <Star size={14} className="text-[#5BA3D9] fill-[#5BA3D9]" />
        </motion.p>

        {/* Copyright */}
        <motion.p
          className="text-[#3B82C8] text-xs mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          © 2026 Juliette's Bat Mitzvah
        </motion.p>
      </div>
    </footer>
  );
}
