'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Events from '@/components/Events';
import RSVPForm from '@/components/RSVPForm';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import { Star, Calendar } from 'lucide-react';

// Bat Mitzvah date: July 26, 2026 at 6:00 PM
const BAT_MITZVAH_DATE = new Date(2026, 6, 26, 18, 0, 0);

// Floating Countdown Component
function FloatingCountdown() {
  const t = useTranslations('countdown');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const now = new Date();
      const diff = BAT_MITZVAH_DATE.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, minutes });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000); // Update every minute

    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-[#B8D8F0] p-4 min-w-[140px]">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#D4EBF8]">
              <Calendar size={16} className="text-[#5BA3D9]" />
              <span className="text-xs font-medium text-[#1F5486] uppercase tracking-wide">Celebration</span>
            </div>

            {/* Countdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#183F65]">{timeLeft.days}</span>
                <span className="text-xs text-[#5BA3D9] uppercase">{t('days')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#183F65]">{timeLeft.hours}</span>
                <span className="text-xs text-[#5BA3D9] uppercase">{t('hours')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#183F65]">{timeLeft.minutes}</span>
                <span className="text-xs text-[#5BA3D9] uppercase">{t('minutes')}</span>
              </div>
            </div>

            {/* Star */}
            <div className="flex justify-center mt-3 pt-2 border-t border-[#D4EBF8]">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Star size={16} className="text-[#5BA3D9] fill-[#B8D8F0]" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <main ref={containerRef} className="relative">
      {/* Decorative floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-10 w-3 h-3 rounded-full bg-[#5BA3D9]/30"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-40 right-20 w-2 h-2 rounded-full bg-[#B8D8F0]/40"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-60 left-1/4 w-4 h-4 rounded-full bg-[#3B82C8]/20"
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <Navigation />

      <FloatingCountdown />

      <Hero />

      <SectionDivider imageSrc="/gallery/DSC06340.JPG" alt="Together" />

      <Suspense fallback={null}>
        <Events />
      </Suspense>

      <SectionDivider imageSrc="/gallery/WhatsApp Image 2026-01-10 at 22.35.01.jpeg" alt="Our adventure"/>

      <Suspense fallback={null}>
        <RSVPForm />
      </Suspense>

      <Footer />

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5BA3D9] via-[#B8D8F0] to-[#5BA3D9] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </main>
  );
}
