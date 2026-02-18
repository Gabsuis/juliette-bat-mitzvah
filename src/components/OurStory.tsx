'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Plane, Home, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function OurStory() {
  const t = useTranslations('story');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const timelineItems = [
    {
      icon: Plane,
      key: 'massa',
      image: '/gallery/WhatsApp Image 2025-12-31 at 19.03.21.jpeg',
    },
    {
      icon: Home,
      key: 'aliya',
      image: '/gallery/WhatsApp Image 2025-12-31 at 19.03.11.jpeg',
    },
    {
      icon: Sparkles,
      key: 'engagement',
      image: '/gallery/d7ddc4ec-4cc4-4992-a568-ae3d09b7994f.jpg',
    },
    {
      icon: Star,
      key: 'wedding',
      image: '/gallery/WhatsApp Image 2025-12-31 at 19.03.15.jpeg',
    },
  ];

  return (
    <section
      id="story"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF] via-[#D4EBF8]/30 to-[#F0F7FF]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            className="text-[#5BA3D9] font-medium tracking-widest uppercase text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t('tagline')}
          </motion.p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#183F65]">
            {t('title')}
          </h2>
          <div className="romantic-divider">
            <Star size={16} className="text-[#5BA3D9] fill-[#B8D8F0]" />
          </div>
        </motion.div>

        {/* Story content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="card bg-white/70 backdrop-blur border border-[#D4EBF8] shadow-xl rounded-3xl p-8 md:p-12 mb-16"
        >
          <p className="text-lg md:text-xl text-[#183F65] leading-relaxed text-center font-light">
            {t('content')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - hidden on mobile, center on desktop */}
          <motion.div
            className="hidden md:block absolute md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#B8D8F0] via-[#5BA3D9] to-[#B8D8F0]"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ originY: 0 }}
          />

          {/* Timeline items */}
          <div className="space-y-10 md:space-y-24">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  className="relative"
                >
                  {/* Icon - hidden on mobile, shown on desktop timeline */}
                  <motion.div
                    className="hidden md:flex absolute z-10 w-16 h-16 rounded-full bg-white shadow-lg items-center justify-center border-2 border-[#B8D8F0] left-1/2 -translate-x-1/2"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <item.icon className="w-6 h-6 text-[#5BA3D9]" />
                  </motion.div>

                  {/* Content with Photo - centered on mobile, alternates on desktop */}
                  <div
                    className={`text-center md:w-[45%] ${
                      isEven ? 'md:mr-auto md:text-right md:pr-12' : 'md:ml-auto md:text-left md:pl-12'
                    }`}
                  >
                    {/* Mobile icon - inline with content */}
                    <motion.div
                      className="md:hidden inline-flex w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center border-2 border-[#B8D8F0] mb-4"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <item.icon className="w-5 h-5 text-[#5BA3D9]" />
                    </motion.div>

                    {/* Polaroid-style photo */}
                    <motion.div
                      className={`inline-block mb-4 ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}
                      whileHover={{ scale: 1.05, rotate: isEven ? 2 : -2 }}
                    >
                      <div className="bg-white p-2 md:p-3 rounded-lg shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                        <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded">
                          <Image
                            src={item.image}
                            alt={t(`timeline.${item.key}.title`)}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                    <h3 className="font-serif text-xl md:text-2xl text-[#183F65] mb-2">
                      {t(`timeline.${item.key}.title`)}
                    </h3>
                    <p className="text-[#1F5486] text-sm md:text-base leading-relaxed max-w-sm mx-auto md:max-w-none">
                      {t(`timeline.${item.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
