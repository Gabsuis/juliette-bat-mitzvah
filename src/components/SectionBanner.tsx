'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface SectionBannerProps {
  src: string;
  alt?: string;
}

export default function SectionBanner({ src, alt = '' }: SectionBannerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      {/* Soft gradient edges to blend with sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF]/60 via-transparent to-[#F0F7FF]/60" />
    </motion.div>
  );
}
