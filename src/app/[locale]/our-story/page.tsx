'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import OurStory from '@/components/OurStory';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

export default function OurStoryPage() {
  return (
    <main className="relative">
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
      </div>

      <Navigation />

      {/* Spacer for fixed nav */}
      <div className="h-20" />

      <OurStory />

      <Gallery />

      <Footer />
    </main>
  );
}
