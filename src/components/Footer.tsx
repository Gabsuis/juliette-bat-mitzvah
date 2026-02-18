'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

const mosaicPhotos = [
  '/gallery/WhatsApp Image 2025-12-31 at 19.03.07.jpeg',
  '/gallery/WhatsApp Image 2025-12-31 at 19.03.09.jpeg',
  '/gallery/WhatsApp Image 2025-12-31 at 19.03.11.jpeg',
  '/gallery/WhatsApp Image 2025-12-31 at 19.03.13.jpeg',
  '/gallery/WhatsApp Image 2025-12-31 at 19.03.18.jpeg',
  '/gallery/WhatsApp Image 2025-12-31 at 19.03.22.jpeg',
  '/gallery/WhatsApp Image 2025-12-31 at 19.03.23.jpeg',
  '/gallery/WhatsApp Image 2025-12-31 at 19.03.24.jpeg',
];

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative bg-gradient-to-b from-[#F0F7FF] to-[#D4EBF8]">
      {/* Photo mosaic strip */}
      <div className="relative overflow-hidden">
        {/* Gradient overlays for fade effect */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#F0F7FF] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#F0F7FF] to-transparent z-10" />

        <motion.div
          className="flex gap-2 py-4"
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Duplicate photos for seamless loop */}
          {[...mosaicPhotos, ...mosaicPhotos].map((src, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-lg overflow-hidden shadow-md"
              whileHover={{ scale: 1.1, zIndex: 20 }}
            >
              <Image
                src={src}
                alt={`Memory ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#5BA3D9]/0 hover:bg-[#5BA3D9]/10 transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>

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
          <Image
            src="/logo.png"
            alt="Juliette"
            width={100}
            height={100}
            className="mx-auto rounded-full"
          />
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
          {t('hashtag')}
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
          {t('madeWith')}{' '}
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
