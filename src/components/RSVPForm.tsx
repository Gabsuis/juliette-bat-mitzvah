'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  Check,
  AlertCircle,
  User,
  Mail,
  Phone,
  Users,
  Star,
  Loader2
} from 'lucide-react';

type AttendanceStatus = 'attending' | 'notAttending' | null;

interface RSVPData {
  name: string;
  email: string;
  phone: string;
  adults: string;
  kids: string;
  kidsAges: string;
  message: string;
  service: AttendanceStatus;
  party: AttendanceStatus;
  shabbat: AttendanceStatus;
  bar: AttendanceStatus;
}

const allEvents = [
  { key: 'service', title: 'Bat Mitzvah Service & Kiddush', date: 'June 18' },
  { key: 'party', title: 'Celebration Dinner & Party', date: 'June 18' },
  { key: 'shabbat', title: 'Shabbat Dinner', date: 'June 19' },
  { key: 'bar', title: 'Saturday Night Out', date: 'June 20' },
] as const;

const eventKeysByRef: Record<string, string[]> = {
  default: ['service', 'party', 'shabbat', 'bar'],
  b: ['service', 'party', 'bar'],
  c: ['service', 'party'],
};

export default function RSVPForm() {
  const searchParams = useSearchParams();
  const refParam = searchParams.get('ref') || 'default';
  const visibleKeys = eventKeysByRef[refParam] || eventKeysByRef.default;
  const events = allEvents.filter(e => visibleKeys.includes(e.key));

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<RSVPData>({
    name: '',
    email: '',
    phone: '',
    adults: '1',
    kids: '0',
    kidsAges: '',
    message: '',
    service: null,
    party: null,
    shabbat: null,
    bar: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttendanceChange = (eventKey: string, status: AttendanceStatus) => {
    setFormData((prev) => ({ ...prev, [eventKey]: status }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const sheetData = {
        timestamp: new Date().toISOString(),
        ref: refParam,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        adults: formData.adults,
        kids: formData.kids,
        kidsAges: formData.kidsAges,
        message: formData.message,
        service: formData.service === 'attending' ? 'Yes' : formData.service === 'notAttending' ? 'No' : 'Not answered',
        party: formData.party === 'attending' ? 'Yes' : formData.party === 'notAttending' ? 'No' : 'Not answered',
        shabbat: formData.shabbat === 'attending' ? 'Yes' : formData.shabbat === 'notAttending' ? 'No' : 'Not answered',
        bar: formData.bar === 'attending' ? 'Yes' : formData.bar === 'notAttending' ? 'No' : 'Not answered',
      };

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          adults: '1',
          kids: '0',
          kidsAges: '',
          message: '',
          service: null,
          party: null,
          shabbat: null,
          bar: null,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="rsvp"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF] via-[#D4EBF8] to-[#F0F7FF]" />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 opacity-20 z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Star size={60} className="text-[#B8D8F0]" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 opacity-20 z-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <Star size={40} className="text-[#B8D8F0]" />
      </motion.div>

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#183F65] mb-4">
            RSVP
          </h2>
          <p className="text-[#1F5486] text-lg">We can't wait to celebrate with you</p>
          <div className="romantic-divider">
            <Star size={16} className="text-[#5BA3D9] fill-[#B8D8F0]" />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="card bg-white/70 backdrop-blur border border-[#D4EBF8] shadow-xl p-8 md:p-10"
        >
          {/* Personal info */}
          <div className="space-y-4 mb-8">
            {/* Name */}
            <label className="input input-bordered flex items-center gap-2 bg-white/50 border-[#B8D8F0] focus-within:border-[#5BA3D9] focus-within:outline-[#5BA3D9]">
              <User size={18} className="text-[#5BA3D9]" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
                className="grow bg-transparent text-[#183F65] placeholder:text-[#3B82C8]"
              />
            </label>

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2 bg-white/50 border-[#B8D8F0] focus-within:border-[#5BA3D9]">
              <Mail size={18} className="text-[#5BA3D9]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
                className="grow bg-transparent text-[#183F65] placeholder:text-[#3B82C8]"
              />
            </label>

            {/* Phone */}
            <label className="input input-bordered flex items-center gap-2 bg-white/50 border-[#B8D8F0] focus-within:border-[#5BA3D9]">
              <Phone size={18} className="text-[#5BA3D9]" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="grow bg-transparent text-[#183F65] placeholder:text-[#3B82C8]"
              />
            </label>

            {/* Number of adults */}
            <label className="input input-bordered flex items-center gap-2 bg-white/50 border-[#B8D8F0] focus-within:border-[#5BA3D9]">
              <Users size={18} className="text-[#5BA3D9]" />
              <select
                name="adults"
                value={formData.adults}
                onChange={handleInputChange}
                className="grow bg-transparent text-[#183F65] cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </label>

            {/* Number of children/teenagers */}
            <label className="input input-bordered flex items-center gap-2 bg-white/50 border-[#B8D8F0] focus-within:border-[#5BA3D9]">
              <Users size={18} className="text-[#5BA3D9]" />
              <select
                name="kids"
                value={formData.kids}
                onChange={handleInputChange}
                className="grow bg-transparent text-[#183F65] cursor-pointer"
              >
                {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Child/Teenager' : 'Children/Teenagers'}
                  </option>
                ))}
              </select>
            </label>

            {/* Kids ages - shown only when kids > 0 */}
            {parseInt(formData.kids) > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <input
                  type="text"
                  name="kidsAges"
                  value={formData.kidsAges}
                  onChange={handleInputChange}
                  placeholder="Ages of children/teenagers (e.g. 5, 8, 12)"
                  className="input input-bordered w-full bg-white/50 border-[#B8D8F0] focus:border-[#5BA3D9] text-[#183F65] placeholder:text-[#3B82C8]"
                />
              </motion.div>
            )}
          </div>

          {/* Event attendance */}
          <div className="mb-8">
            <p className="text-[#183F65] font-medium mb-4">Select your attendance for each event</p>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.key}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/50 border border-[#D4EBF8]"
                >
                  <div>
                    <p className="font-medium text-[#183F65]">
                      {event.title}
                    </p>
                    <p className="text-sm text-[#3B82C8]">{event.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange(event.key, 'attending')}
                      className={`btn btn-sm rounded-full ${
                        formData[event.key as keyof RSVPData] === 'attending'
                          ? 'btn-success text-white'
                          : 'btn-outline border-green-400 text-green-600 hover:bg-green-50'
                      }`}
                    >
                      Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange(event.key, 'notAttending')}
                      className={`btn btn-sm rounded-full ${
                        formData[event.key as keyof RSVPData] === 'notAttending'
                          ? 'btn-error text-white'
                          : 'btn-outline border-rose-400 text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      Unable to Attend
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="A little note for Juliette..."
              rows={4}
              className="textarea textarea-bordered w-full bg-white/50 border-[#B8D8F0] focus:border-[#5BA3D9] text-[#183F65] placeholder:text-[#3B82C8] resize-none"
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-lg w-full rounded-full text-white border-0 shadow-lg disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #5BA3D9 0%, #2B6BA8 100%)' }}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                Send RSVP
              </>
            )}
          </motion.button>

          {/* Status messages */}
          <AnimatePresence>
            {submitStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`alert mt-4 ${
                  submitStatus === 'success' ? 'alert-success' : 'alert-error'
                }`}
              >
                {submitStatus === 'success' ? (
                  <>
                    <Check size={20} />
                    Thank you! Your RSVP has been received.
                  </>
                ) : (
                  <>
                    <AlertCircle size={20} />
                    Something went wrong. Please try again.
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
