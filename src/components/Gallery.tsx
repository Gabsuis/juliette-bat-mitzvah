'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, Camera, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import Image from 'next/image';

const photos = [
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.07.jpeg', alt: 'Beach days' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.08.jpeg', alt: 'Adventures' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.09.jpeg', alt: 'Special moments' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.10.jpeg', alt: 'Exploring' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.11.jpeg', alt: 'Fun in the sun' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.12.jpeg', alt: 'By the sea' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.13.jpeg', alt: 'Growing up' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.14.jpeg', alt: 'Purim costumes' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.15.jpeg', alt: 'Pure happiness' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.16.jpeg', alt: 'Cherished memories' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.17.jpeg', alt: 'Smiles and laughter' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.18.jpeg', alt: 'Beautiful days' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.19.jpeg', alt: 'With friends' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.20.jpeg', alt: 'Tel Aviv life' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.21.jpeg', alt: 'Adventures' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.22.jpeg', alt: 'Sweet memories' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.23.jpeg', alt: 'Ocean vibes' },
  { src: '/gallery/WhatsApp Image 2025-12-31 at 19.03.24.jpeg', alt: 'Best moments' },
];

export default function Gallery() {
  const t = useTranslations('gallery');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-white to-[#F0F7FF]"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4EBF8]/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B8D8F0]/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4EBF8] mb-6"
          >
            <Camera size={28} className="text-[#5BA3D9]" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#183F65] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#1F5486] text-lg">{t('subtitle')}</p>
          <div className="romantic-divider">
            <Star size={16} className="text-[#5BA3D9] fill-[#B8D8F0]" />
          </div>
        </motion.div>

        {/* Main Carousel - DaisyUI style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="carousel w-full rounded-3xl overflow-hidden shadow-2xl border border-[#D4EBF8]">
            <div className="carousel-item relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/9]">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <Image
                  src={photos[currentSlide].src}
                  alt={photos[currentSlide].alt}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Caption */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="badge badge-lg bg-white/90 backdrop-blur border-0 text-[#183F65] gap-2 px-4 py-3">
                    <Sparkles size={14} className="text-[#5BA3D9]" />
                    {photos[currentSlide].alt}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
            <motion.button
              onClick={prevSlide}
              className="btn btn-circle bg-white/80 backdrop-blur border-0 shadow-lg hover:bg-white pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} className="text-[#183F65]" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="btn btn-circle bg-white/80 backdrop-blur border-0 shadow-lg hover:bg-white pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} className="text-[#183F65]" />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-8 h-2 bg-[#5BA3D9]'
                    : 'w-2 h-2 bg-[#B8D8F0]/50 hover:bg-[#B8D8F0]'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Thumbnail grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4"
        >
          {photos.map((photo, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative aspect-square rounded-xl overflow-hidden group transition-all duration-300 ${
                currentSlide === index
                  ? 'ring-4 ring-[#5BA3D9] ring-offset-2'
                  : 'hover:ring-2 hover:ring-[#B8D8F0]'
              }`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className={`absolute inset-0 transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-[#5BA3D9]/20'
                  : 'bg-black/0 group-hover:bg-black/20'
              }`} />

              {/* Active indicator */}
              {currentSlide === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Star size={24} className="text-white fill-white drop-shadow-lg" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 btn btn-circle btn-ghost text-white"
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-5xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
