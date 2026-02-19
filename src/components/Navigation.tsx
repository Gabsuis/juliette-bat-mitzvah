'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'Events', target: 'events' },
    { label: 'RSVP', target: 'rsvp' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#F0F7FF] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('hero')}
            className="z-10 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#B8D8F0]">
              <Image
                src="/gallery/WhatsApp Image 2026-02-18 at 16.23.38.jpeg"
                alt="Juliette"
                width={44}
                height={44}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.button>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <motion.button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="text-[#183F65] hover:text-[#5BA3D9] transition-colors font-medium text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Spacer for layout balance */}
          <div className="hidden md:block w-[44px]" />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-md btn-circle bg-[#D4EBF8]"
            >
              {isMobileMenuOpen ? (
                <X size={26} className="text-[#183F65]" />
              ) : (
                <Menu size={26} className="text-[#183F65]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.target}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.target)}
                    className="block w-full text-left py-3 px-4 rounded-lg text-[#183F65] hover:bg-[#D4EBF8] transition-colors text-xl font-medium"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
