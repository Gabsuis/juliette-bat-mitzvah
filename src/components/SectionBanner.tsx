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
      className="relative w-full overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={600}
        className="w-full h-auto object-contain"
      />
      {/* Soft gradient edges to blend with sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF]/60 via-transparent to-[#F0F7FF]/60" />
    </motion.div>
  );
}
