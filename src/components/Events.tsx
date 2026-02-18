'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  PartyPopper,
  Home,
  GlassWater,
  Star,
  Clock,
  Calendar,
  Sparkles,
  MapPin,
  X,
  ExternalLink
} from 'lucide-react';

const eventIcons = {
  service: BookOpen,
  party: PartyPopper,
  shabbat: Home,
  bar: GlassWater,
};

const eventColors = {
  service: { bg: 'from-[#5BA3D9] to-[#3B82C8]', accent: '#5BA3D9' },
  party: { bg: 'from-[#3B82C8] to-[#2B6BA8]', accent: '#3B82C8' },
  shabbat: { bg: 'from-[#2B6BA8] to-[#183F65]', accent: '#2B6BA8' },
  bar: { bg: 'from-[#183F65] to-[#0F2A45]', accent: '#183F65' },
};

const eventImages = {
  service: '/syna.jpeg',
  party: '/party.jpeg',
  shabbat: '/gallery/hero pic.jpeg',
  bar: '/bar.jpeg',
};

const eventMapsUrls = {
  service: 'https://maps.google.com/?q=Aharon+Chelouche+Street+47+Tel+Aviv',
  party: 'https://maps.google.com/?q=Yordei+Hasira+1+Tel+Aviv',
  shabbat: 'https://maps.google.com/?q=Manne+Street+5+Tel+Aviv',
  bar: 'https://maps.google.com/?q=Zvulun+7+Tel+Aviv',
};

// Floating stars component - using fixed positions to avoid hydration mismatch
const floatingStarsData = [
  { id: 0, left: '5%', delay: 0, duration: 6, size: 14 },
  { id: 1, left: '15%', delay: 1.2, duration: 7, size: 18 },
  { id: 2, left: '25%', delay: 2.5, duration: 5, size: 12 },
  { id: 3, left: '35%', delay: 0.8, duration: 8, size: 20 },
  { id: 4, left: '45%', delay: 3, duration: 6, size: 16 },
  { id: 5, left: '55%', delay: 1.5, duration: 7, size: 14 },
  { id: 6, left: '65%', delay: 2, duration: 5, size: 22 },
  { id: 7, left: '75%', delay: 0.5, duration: 8, size: 18 },
  { id: 8, left: '85%', delay: 2.8, duration: 6, size: 16 },
  { id: 9, left: '95%', delay: 1, duration: 7, size: 14 },
];

const FloatingStars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingStarsData.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{ left: star.left, bottom: '-20px' }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(star.id) * 30, 0],
            opacity: [0, 0.5, 0.5, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'linear',
          }}
        >
          <Star
            size={star.size}
            className="text-[#B8D8F0] fill-[#B8D8F0]/30"
          />
        </motion.div>
      ))}
    </div>
  );
};

// Event Modal Component
const EventModal = ({
  eventKey,
  isOpen,
  onClose,
  t
}: {
  eventKey: string;
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}) => {
  const mapsUrl = eventMapsUrls[eventKey as keyof typeof eventMapsUrls];
  const colors = eventColors[eventKey as keyof typeof eventColors];
  const Icon = eventIcons[eventKey as keyof typeof eventIcons];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#183F65]/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-[#B8D8F0]"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header Image */}
            <div className="relative h-48 overflow-hidden rounded-t-3xl">
              <Image
                src={eventImages[eventKey as keyof typeof eventImages]}
                alt={t(`${eventKey}.title`)}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${colors.bg} opacity-70`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Title */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/90 text-lg font-medium">
                    {t(`${eventKey}.date`)}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl text-white font-serif">
                  {t(`${eventKey}.title`)}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Time */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F0F7FF] border border-[#D4EBF8]">
                <div className="w-12 h-12 rounded-full bg-[#D4EBF8] flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#2B6BA8]" />
                </div>
                <div>
                  <p className="text-sm text-[#5BA3D9] font-medium uppercase tracking-wide">{t('modal.time')}</p>
                  <p className="text-xl text-[#183F65] font-semibold">{t(`${eventKey}.time`)}</p>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#D4EBF8]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4EBF8] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#2B6BA8]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#5BA3D9] font-medium uppercase tracking-wide">{t('modal.location')}</p>
                    <p className="text-xl text-[#183F65] font-semibold">{t(`${eventKey}.lieu`)}</p>
                    <p className="text-[#1F5486] mt-1">{t(`${eventKey}.address`)}</p>
                  </div>
                </div>
                {mapsUrl && (
                  <motion.a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#5BA3D9] to-[#2B6BA8] text-white font-medium hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MapPin size={18} />
                    {t('modal.openMaps')}
                    <ExternalLink size={16} />
                  </motion.a>
                )}
              </div>

              {/* Description */}
              <div className="text-center pt-4 border-t border-[#D4EBF8]">
                <p className="text-lg text-[#183F65] leading-relaxed italic">
                  "{t(`${eventKey}.description`)}"
                </p>
              </div>

              {/* Decorative stars */}
              <div className="flex justify-center gap-2 pt-2">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    size={i === 1 ? 20 : 14}
                    className={i === 1 ? 'text-[#5BA3D9] fill-[#5BA3D9]' : 'text-[#B8D8F0] fill-[#B8D8F0]'}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Events() {
  const t = useTranslations('events');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeEvent, setActiveEvent] = useState<number>(0);
  const [modalEvent, setModalEvent] = useState<string | null>(null);

  const events = ['service', 'party', 'shabbat', 'bar'] as const;

  return (
    <section
      id="events"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF] via-white to-[#F0F7FF]" />

      {/* Floating stars */}
      <FloatingStars />

      {/* Decorative floating sparkles */}
      <motion.div
        className="absolute top-20 right-20 opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Sparkles size={60} className="text-[#5BA3D9]" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-10 opacity-20"
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        <Sparkles size={40} className="text-[#B8D8F0]" />
      </motion.div>

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
            <Calendar size={28} className="text-[#2B6BA8]" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#183F65] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#1F5486] text-xl">{t('subtitle')}</p>
          <div className="romantic-divider">
            <Star size={16} className="text-[#5BA3D9] fill-[#B8D8F0]" />
          </div>
        </motion.div>

        {/* Timeline with animated connector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:block mb-16"
        >
          <div className="relative">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#D4EBF8] rounded-full -translate-y-1/2" />

            {/* Animated progress line */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#B8D8F0] via-[#5BA3D9] to-[#2B6BA8] rounded-full -translate-y-1/2"
              initial={{ width: '0%' }}
              animate={isInView ? { width: `${((activeEvent + 1) / events.length) * 100}%` } : {}}
              transition={{ duration: 0.5 }}
            />

            {/* Timeline dots */}
            <div className="relative flex justify-between items-center">
              {events.map((eventKey, index) => {
                const Icon = eventIcons[eventKey];
                const colors = eventColors[eventKey];
                const isActive = index === activeEvent;
                const isPast = index <= activeEvent;

                return (
                  <motion.button
                    key={eventKey}
                    onClick={() => setActiveEvent(index)}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Outer glow */}
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors.bg} blur-xl opacity-50`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: '60px', height: '60px', left: '-10px', top: '-10px' }}
                      />
                    )}

                    {/* Main circle */}
                    <motion.div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isPast
                          ? `bg-gradient-to-r ${colors.bg} shadow-lg`
                          : 'bg-white border-2 border-[#D4EBF8]'
                      }`}
                      animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                    >
                      <Icon
                        size={18}
                        className={isPast ? 'text-white' : 'text-[#5BA3D9]'}
                      />
                    </motion.div>

                    {/* Label */}
                    <motion.div
                      className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium transition-colors ${
                        isActive ? 'text-[#183F65]' : 'text-[#5BA3D9]'
                      }`}
                    >
                      {t(`${eventKey}.date`).split(',')[0]}
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {events.map((eventKey, index) => {
            const Icon = eventIcons[eventKey];
            const colors = eventColors[eventKey];
            const isActive = index === activeEvent;

            return (
              <motion.article
                key={eventKey}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group"
                onMouseEnter={() => setActiveEvent(index)}
              >
                <motion.div
                  className={`relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all duration-500 border-2 ${
                    isActive
                      ? 'border-[#5BA3D9] shadow-2xl'
                      : 'border-[#D4EBF8] hover:border-[#B8D8F0]'
                  }`}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Decorative corner stars */}
                  <div className="absolute top-4 left-4 opacity-20">
                    <Star size={24} className="text-[#5BA3D9] fill-[#5BA3D9]" />
                  </div>

                  {/* Card header with image */}
                  <div className="relative h-56 overflow-hidden">
                    {/* Event image */}
                    <Image
                      src={eventImages[eventKey]}
                      alt={t(`${eventKey}.title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${colors.bg} opacity-50`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Icon with glow */}
                    <motion.div
                      className="absolute top-4 right-4"
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 w-14 h-14 rounded-full bg-white/30 blur-xl" />
                        <div className="relative w-14 h-14 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Event title */}
                    <div className="absolute bottom-4 left-5 right-5 z-10">
                      <span className="text-white/90 text-base font-medium tracking-wider uppercase">
                        {t(`${eventKey}.date`)}
                      </span>
                      <h3 className="text-3xl md:text-4xl text-white mt-1 drop-shadow-md" style={{ fontFamily: "'Pacifico', cursive" }}>
                        {t(`${eventKey}.title`)}
                      </h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 md:p-8">
                    {/* Time badge */}
                    <div className="flex flex-wrap gap-3 mb-5">
                      <motion.div
                        className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-to-r from-[#D4EBF8] to-[#F0F7FF] border border-[#B8D8F0] shadow-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Clock size={18} className="text-[#2B6BA8]" />
                        <span className="text-lg font-medium text-[#183F65]">{t(`${eventKey}.time`)}</span>
                      </motion.div>
                    </div>

                    {/* Location */}
                    <div className="mb-5 p-4 rounded-2xl bg-[#F0F7FF]/80 border border-[#D4EBF8]">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-full bg-[#D4EBF8] flex items-center justify-center flex-shrink-0">
                          <MapPin size={20} className="text-[#2B6BA8]" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-[#183F65]">
                            {t(`${eventKey}.lieu`)}
                          </p>
                          <p className="text-base text-[#1F5486]">
                            {t(`${eventKey}.address`)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#183F65] text-lg leading-relaxed mb-6">
                      {t(`${eventKey}.description`)}
                    </p>

                    {/* View details button */}
                    <motion.button
                      onClick={() => setModalEvent(eventKey)}
                      className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r ${colors.bg} text-white text-lg font-medium shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Star size={20} className="fill-white/50" />
                      {t('viewDetails')}
                    </motion.button>

                    {/* Decorative bottom stars */}
                    <div className="flex justify-center gap-1 mt-5">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        >
                          <Star
                            size={i === 2 ? 14 : 10}
                            className={i === 2 ? 'text-[#5BA3D9] fill-[#5BA3D9]' : 'text-[#B8D8F0] fill-[#B8D8F0]'}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Event Modal */}
      {modalEvent && (
        <EventModal
          eventKey={modalEvent}
          isOpen={!!modalEvent}
          onClose={() => setModalEvent(null)}
          t={t}
        />
      )}
    </section>
  );
}
