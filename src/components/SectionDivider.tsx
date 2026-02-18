'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface SectionDividerProps {
  imageSrc: string;
  alt?: string;
  size?: 'default' | 'large';
}

export default function SectionDivider({ imageSrc, alt = 'Divider image', size = 'default' }: SectionDividerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const heightClasses = size === 'large'
    ? 'h-[28rem] md:h-[44rem] lg:h-[56rem]'
    : 'h-96 md:h-[36rem] lg:h-[48rem]';

  return (
    <div ref={ref} className={`relative ${heightClasses} overflow-hidden`}>
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0 -top-20 -bottom-20"
        style={{ y }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Gradient overlays for smooth blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF] via-transparent to-[#F0F7FF]" />

      {/* Subtle color tint */}
      <motion.div
        className="absolute inset-0 bg-[#5BA3D9]/10"
        style={{ opacity }}
      />

      {/* Decorative top and bottom edges */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#F0F7FF] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F0F7FF] to-transparent" />
    </div>
  );
}
