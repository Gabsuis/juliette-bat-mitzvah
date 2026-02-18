'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'he', label: 'עב', flag: '🇮🇱' },
];

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPath}`);
  };

  const handleNavClick = (item: { type: 'scroll' | 'link'; target: string }) => {
    setIsMobileMenuOpen(false);

    if (item.type === 'link') {
      router.push(`/${locale}${item.target}`);
    } else if (item.type === 'scroll') {
      if (isHomePage) {
        const element = document.getElementById(item.target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(`/${locale}/#${item.target}`);
      }
    }
  };

  const navItems = [
    { label: t('home'), type: 'scroll' as const, target: 'hero' },
    { label: t('story'), type: 'link' as const, target: '/our-story' },
    { label: t('events'), type: 'scroll' as const, target: 'events' },
    { label: t('rsvp'), type: 'scroll' as const, target: 'rsvp' },
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
          <Link href={`/${locale}`} className="z-10">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/logo.png"
                alt="E & G"
                width={52}
                height={52}
                className="rounded-full"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <motion.button
                key={item.target}
                onClick={() => handleNavClick(item)}
                className="text-[#183F65] hover:text-[#5BA3D9] transition-colors font-medium text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Language Switcher - Right side */}
          <div className="hidden md:block dropdown dropdown-end z-10">
            <motion.div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-md rounded-full bg-[#D4EBF8] hover:bg-[#B8D8F0] px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={20} className="text-[#183F65]" />
              <span className="text-base font-medium text-[#183F65]">
                {languages.find(l => l.code === locale)?.flag}
              </span>
            </motion.div>
            <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-36 p-2 shadow-lg border border-[#D4EBF8] mt-2">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <button
                    onClick={() => switchLanguage(lang.code)}
                    className={`flex items-center gap-3 py-2 ${locale === lang.code ? 'bg-[#D4EBF8]' : ''}`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-base font-medium text-[#183F65]">{lang.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Language Switcher */}
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-md btn-circle bg-[#D4EBF8]">
                <Globe size={22} className="text-[#183F65]" />
              </button>
              <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-36 p-2 shadow-lg border border-[#D4EBF8] mt-2">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={() => switchLanguage(lang.code)}
                      className={`flex items-center gap-3 py-2 ${locale === lang.code ? 'bg-[#D4EBF8]' : ''}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-base">{lang.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

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
                    onClick={() => handleNavClick(item)}
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
