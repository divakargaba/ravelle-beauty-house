import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Flower2, Scissors, ArrowRight, Clock, Info } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/ui/AnimatedSection';
import SpotlightCard from '../components/ui/SpotlightCard';
import {
  waxingServices,
  lashServices,
  hennaServices,
  eyebrowServices,
} from '../data/services';

const tabs = [
  { id: 'waxing', label: 'Waxing', icon: Sparkles },
  { id: 'lashes', label: 'Lashes', icon: Eye },
  { id: 'henna', label: 'Henna', icon: Flower2 },
  { id: 'eyebrows', label: 'Eyebrows', icon: Scissors },
];

function PriceRow({ name, price, priceNote, duration, savings, description, note }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gold/10 last:border-0 group hover:bg-gold/[0.03] px-4 -mx-4 rounded-lg transition-colors">
      <div className="flex-1">
        <p className="text-text-light/90 font-medium text-sm">{name}</p>
        {description && (
          <p className="text-text-light/40 text-xs mt-0.5">{description}</p>
        )}
        {duration && (
          <p className="text-text-light/30 text-xs mt-0.5 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {duration}
          </p>
        )}
      </div>
      <div className="text-right flex items-center gap-3">
        {savings && (
          <span className="text-xs text-rose bg-rose/10 px-2 py-0.5 rounded-full">
            Save ${savings}
          </span>
        )}
        {price !== undefined && (
          <span className="text-gold font-heading text-lg">
            ${price}{priceNote || ''}{note || ''}
          </span>
        )}
      </div>
    </div>
  );
}

function ServiceSection({ title, children, className = '' }) {
  return (
    <div className={`mb-8 ${className}`}>
      <h3 className="font-heading text-xl text-gold mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-gold/30" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function WaxingTab() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <ServiceSection title="Individual Services">
          {waxingServices.individual.map((s) => (
            <PriceRow key={s.name} {...s} />
          ))}
        </ServiceSection>

        <ServiceSection title="Popular Bundles">
          {waxingServices.bundles.map((s) => (
            <PriceRow key={s.name} {...s} />
          ))}
        </ServiceSection>
      </div>

      <div>
        <ServiceSection title="Smooth Essentials Package">
          {waxingServices.packages.map((s) => (
            <PriceRow key={s.name} {...s} />
          ))}
        </ServiceSection>

        <ServiceSection title="Full Body Specials">
          {waxingServices.specials.map((s) => (
            <PriceRow key={s.name} {...s} />
          ))}
        </ServiceSection>

        <div className="mt-8 p-6 bg-gold/5 border border-gold/10 rounded-xl">
          <p className="text-text-light/50 text-sm leading-relaxed">
            <Info className="w-4 h-4 inline mr-1 text-gold" />
            All waxing services use premium, high-quality products and hygienic disposable supplies. A fuel surcharge may apply for mobile service outside central Calgary.
          </p>
        </div>
      </div>
    </div>
  );
}

function LashesTab() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ServiceSection title="Full Sets (2 hrs each)">
          {lashServices.fullSets.map((s) => (
            <PriceRow key={s.name} {...s} />
          ))}
        </ServiceSection>

        <ServiceSection title="Fills (1 hr 15 mins each)">
          {lashServices.fills.map((s) => (
            <PriceRow key={s.name} {...s} />
          ))}
        </ServiceSection>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <ServiceSection title="Foreign Fills (1 hr 15 mins each)">
          {lashServices.foreignFills.map((s) => (
            <PriceRow key={s.name} {...s} />
          ))}
        </ServiceSection>

        <div>
          <ServiceSection title="Other Lash Services">
            {lashServices.other.map((s) => (
              <PriceRow key={s.name} {...s} />
            ))}
          </ServiceSection>

          <div className="mt-8 p-6 bg-gold/5 border border-gold/10 rounded-xl">
            <p className="text-text-light/50 text-sm leading-relaxed">
              <Info className="w-4 h-4 inline mr-1 text-gold" />
              A <strong className="text-gold">foreign fill</strong> is for clients whose previous lash set was applied by a different technician. Additional time may be needed to assess and work with existing lashes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HennaTab() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="w-20 h-20 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-6">
        <Flower2 className="w-9 h-9 text-gold" />
      </div>
      <h3 className="font-heading text-2xl text-text-light mb-4">Henna Artistry</h3>
      <p className="text-text-light/60 leading-relaxed mb-8">
        {hennaServices.note}
      </p>
      <p className="text-text-light/40 text-sm mb-8">
        Perfect for weddings, engagements, Eid celebrations, baby showers, and special occasions. Custom designs created with natural, high-quality henna.
      </p>
      <Link
        to="/book"
        className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-8 py-3 text-gold hover:bg-gold hover:text-primary transition-all duration-300"
      >
        Request a Consultation
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function EyebrowsTab() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="w-20 h-20 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-6">
        <Scissors className="w-9 h-9 text-gold" />
      </div>
      <h3 className="font-heading text-2xl text-text-light mb-4">Eyebrow Services</h3>
      <p className="text-text-light/60 leading-relaxed mb-8">
        {eyebrowServices.note}
      </p>
      <p className="text-text-light/40 text-sm mb-8">
        Expert eyebrow shaping, threading, and tinting services tailored to enhance your natural features. Every brow is shaped to perfectly frame your face.
      </p>
      <Link
        to="/book"
        className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-8 py-3 text-gold hover:bg-gold hover:text-primary transition-all duration-300"
      >
        Request a Consultation
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

const tabContent = {
  waxing: WaxingTab,
  lashes: LashesTab,
  henna: HennaTab,
  eyebrows: EyebrowsTab,
};

export default function Services() {
  const [activeTab, setActiveTab] = useState('waxing');
  const ActiveContent = tabContent[activeTab];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Our Services</p>
            <h1 className="font-heading text-4xl md:text-6xl text-text-light mb-4">
              Services & <span className="gold-text-gradient">Pricing</span>
            </h1>
            <p className="text-text-light/50 max-w-2xl mx-auto">
              Transparent pricing, exceptional quality. Every service delivered with care in the comfort of your home.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gold text-primary'
                        : 'border border-gold/20 text-text-light/60 hover:border-gold/40 hover:text-gold'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard className="p-6 md:p-10">
                <ActiveContent />
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>

          {/* Book CTA */}
          <AnimatedSection delay={0.3} className="text-center mt-12">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 text-primary font-medium hover:bg-gold-light transition-colors text-lg"
            >
              Book Your Appointment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-text-light/30 text-sm mt-4">
              Or text us at <a href="tel:8257363649" className="text-gold hover:text-gold-light">825-736-3649</a>
            </p>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}
