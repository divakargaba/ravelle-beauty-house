import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/ui/AnimatedSection';
import SpotlightCard from '../components/ui/SpotlightCard';
import { allServicesFlat } from '../data/services';

const serviceOptions = {
  waxing: allServicesFlat.filter((s) => s.category === 'waxing'),
  lashes: allServicesFlat.filter((s) => s.category === 'lashes'),
  henna: [{ name: 'Henna — Custom Design (Consultation)' }],
  eyebrows: [{ name: 'Eyebrow Service (Consultation)' }],
};

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM',
];

function InputField({ icon: Icon, label, error, ...props }) {
  return (
    <div>
      <label className="block text-text-light/60 text-sm mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
        <input
          className={`w-full bg-primary/50 border ${error ? 'border-red-500/50' : 'border-gold/20'} rounded-xl pl-11 pr-4 py-3 text-text-light text-sm placeholder:text-text-light/30 focus:outline-none focus:border-gold/50 transition-colors`}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function Booking() {
  const [form, setForm] = useState({
    category: '',
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.category) errs.category = 'Please select a service category';
    if (!form.service) errs.service = 'Please select a specific service';
    if (!form.date) errs.date = 'Please select a date';
    if (!form.time) errs.time = 'Please select a time';
    if (!form.name.trim()) errs.name = 'Please enter your name';
    if (!form.phone.trim()) errs.phone = 'Please enter your phone number';
    if (!form.address.trim()) errs.address = 'Please enter your address';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const response = await fetch('/.netlify/functions/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Booking failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <PageTransition>
        <section className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-lg"
          >
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-text-light mb-4">
              Booking <span className="text-gold">Confirmed!</span>
            </h2>
            <p className="text-text-light/60 mb-2">
              Thank you, <span className="text-gold">{form.name}</span>! Your appointment request has been received.
            </p>
            <p className="text-text-light/40 text-sm mb-8">
              We'll confirm your appointment via text at {form.phone}. Please allow up to 24 hours for confirmation.
            </p>
            <div className="bg-gold/5 border border-gold/10 rounded-xl p-6 text-left space-y-2 mb-8">
              <p className="text-sm text-text-light/60"><span className="text-gold">Service:</span> {form.service}</p>
              <p className="text-sm text-text-light/60"><span className="text-gold">Date:</span> {form.date}</p>
              <p className="text-sm text-text-light/60"><span className="text-gold">Time:</span> {form.time}</p>
              <p className="text-sm text-text-light/60"><span className="text-gold">Location:</span> {form.address}</p>
            </div>
            <button
              onClick={() => { setStatus('idle'); setForm({ category: '', service: '', date: '', time: '', name: '', email: '', phone: '', address: '', notes: '' }); }}
              className="text-gold hover:text-gold-light transition-colors text-sm"
            >
              Book Another Appointment
            </button>
          </motion.div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Appointments</p>
            <h1 className="font-heading text-4xl md:text-6xl text-text-light mb-4">
              Book Your <span className="gold-text-gradient">Appointment</span>
            </h1>
            <p className="text-text-light/50 max-w-2xl mx-auto">
              Schedule your beauty session and we'll come to you. Fill out the form below or text us directly.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Text to Book Alternative */}
      <section className="px-4 pb-8">
        <AnimatedSection delay={0.1}>
          <div className="max-w-2xl mx-auto text-center bg-gold/5 border border-gold/20 rounded-xl p-6">
            <p className="text-text-light/50 text-sm mb-2">Prefer to text? Book directly:</p>
            <a
              href="tel:8257363649"
              className="inline-flex items-center gap-2 text-gold font-heading text-2xl hover:text-gold-light transition-colors"
            >
              <Phone className="w-6 h-6" />
              825-736-3649
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Booking Form */}
      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection delay={0.2}>
            <SpotlightCard className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Category */}
                <div>
                  <label className="block text-text-light/60 text-sm mb-2">Service Category *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['waxing', 'lashes', 'henna', 'eyebrows'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => { update('category', cat); update('service', ''); }}
                        className={`px-4 py-3 rounded-xl text-sm font-medium capitalize transition-all ${
                          form.category === cat
                            ? 'bg-gold text-primary'
                            : 'border border-gold/20 text-text-light/60 hover:border-gold/40'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
                </div>

                {/* Specific Service */}
                <AnimatePresence>
                  {form.category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-text-light/60 text-sm mb-2">Specific Service *</label>
                      <select
                        value={form.service}
                        onChange={(e) => update('service', e.target.value)}
                        className={`w-full bg-primary/50 border ${errors.service ? 'border-red-500/50' : 'border-gold/20'} rounded-xl px-4 py-3 text-text-light text-sm focus:outline-none focus:border-gold/50 transition-colors appearance-none`}
                      >
                        <option value="">Select a service...</option>
                        {serviceOptions[form.category]?.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name}{s.price ? ` — $${s.price}` : ''}
                          </option>
                        ))}
                      </select>
                      {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Date & Time */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-light/60 text-sm mb-2">Preferred Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => update('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full bg-primary/50 border ${errors.date ? 'border-red-500/50' : 'border-gold/20'} rounded-xl pl-11 pr-4 py-3 text-text-light text-sm focus:outline-none focus:border-gold/50 transition-colors`}
                      />
                    </div>
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-text-light/60 text-sm mb-2">Preferred Time *</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                      <select
                        value={form.time}
                        onChange={(e) => update('time', e.target.value)}
                        className={`w-full bg-primary/50 border ${errors.time ? 'border-red-500/50' : 'border-gold/20'} rounded-xl pl-11 pr-4 py-3 text-text-light text-sm focus:outline-none focus:border-gold/50 transition-colors appearance-none`}
                      >
                        <option value="">Select a time...</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                    {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                  </div>
                </div>

                {/* Client Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField
                    icon={User}
                    label="Full Name *"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    error={errors.name}
                  />
                  <InputField
                    icon={Phone}
                    label="Phone Number *"
                    placeholder="(XXX) XXX-XXXX"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    error={errors.phone}
                  />
                </div>

                <InputField
                  icon={Mail}
                  label="Email (optional)"
                  placeholder="your@email.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  error={errors.email}
                />

                <InputField
                  icon={MapPin}
                  label="Your Address *"
                  placeholder="Full address (we come to you!)"
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  error={errors.address}
                />

                {/* Notes */}
                <div>
                  <label className="block text-text-light/60 text-sm mb-2">Special Requests or Notes</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-gold/50" />
                    <textarea
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      rows={3}
                      placeholder="Any preferences, allergies, or special requests..."
                      className="w-full bg-primary/50 border border-gold/20 rounded-xl pl-11 pr-4 py-3 text-text-light text-sm placeholder:text-text-light/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Fuel Surcharge Notice */}
                <div className="bg-gold/5 border border-gold/10 rounded-xl p-4">
                  <p className="text-text-light/40 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 inline mr-1 text-gold/50" />
                    A fuel surcharge may apply for locations outside central Calgary. We'll confirm any additional charges when confirming your appointment.
                  </p>
                </div>

                {/* Error Message */}
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <p className="text-red-400 text-sm">
                      Something went wrong. Please try again or text us directly at 825-736-3649.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-4 text-primary font-medium hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      Request Appointment
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-text-light/30 text-xs text-center">
                  By submitting, you agree to receive appointment confirmations via text. Ladies only service.
                </p>
              </form>
            </SpotlightCard>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}
