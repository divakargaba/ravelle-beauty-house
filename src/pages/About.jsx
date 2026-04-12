import { motion } from 'framer-motion';
import { Award, Shield, Heart, Sparkles, Droplets, Star, Eye } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/ui/AnimatedSection';
import SpotlightCard from '../components/ui/SpotlightCard';
import LampEffect from '../components/ui/LampEffect';

const certifications = [
  {
    title: 'Certified Lash Technician',
    description: 'Professionally trained in classic, volume, hybrid, and specialty lash techniques.',
    icon: Eye,
  },
  {
    title: 'Henna Artist',
    description: 'Skilled in traditional and modern henna designs for all occasions.',
    icon: Sparkles,
  },
  {
    title: 'Waxing Specialist',
    description: 'Expert in full body waxing with premium, skin-friendly products.',
    icon: Star,
  },
  {
    title: 'Laser Certified',
    description: 'Certified in laser treatments and advanced skincare techniques.',
    icon: Award,
  },
];

const trustBadges = [
  {
    icon: Award,
    title: 'Experienced & Certified',
    description: 'Professionally trained with certifications in all service areas.',
  },
  {
    icon: Shield,
    title: 'Hygienic & Disposable Supplies',
    description: 'Single-use supplies and strict sanitation protocols for your safety.',
  },
  {
    icon: Droplets,
    title: 'High-Quality Products',
    description: 'Only premium, professional-grade products used in every service.',
  },
  {
    icon: Heart,
    title: 'Welcoming to All',
    description: 'Henna services open to everyone. Waxing available as a ladies-only service.',
  },
];

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">About the Artist</p>
            <h1 className="font-heading text-4xl md:text-6xl text-text-light mb-6">
              The <span className="gold-text-gradient">Heart</span> Behind the Art
            </h1>
            <p className="text-text-light/60 text-lg leading-relaxed">
              Passionate about beauty, dedicated to artistry, and committed to making every client feel like a masterpiece.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Artist Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <div className="aspect-[3/4] rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 via-transparent to-rose/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="relative text-center p-8">
                <div className="w-24 h-24 rounded-full gold-gradient mx-auto mb-4 flex items-center justify-center">
                  <span className="font-heading text-4xl text-primary">R</span>
                </div>
                <p className="text-gold/60 text-sm italic">Photo coming soon</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl text-text-light">
              Meet Your <span className="text-gold">Beauty Artist</span>
            </h2>
            <div className="space-y-4 text-text-light/60 leading-relaxed">
              <p>
                Welcome to Ravélle Beauty House — where beauty is not just a service, but an art form. Based in Calgary, AB, I bring the luxury salon experience directly to your doorstep, offering personalized beauty services in the comfort and privacy of your own home.
              </p>
              <p>
                With professional certifications in lash technology, henna artistry, waxing, and laser treatments, I've dedicated myself to mastering the art of beauty. Every service is performed with meticulous attention to detail, using only high-quality, professional-grade products.
              </p>
              <p>
                I believe that beauty is deeply personal. That's why I bring the luxury salon experience directly to you with my mobile service — creating a safe, comfortable space where you can relax, unwind, and let me transform your vision into reality. Henna services are open to everyone, while waxing is offered as a ladies-only service. Whether it's a stunning set of lashes, intricate bridal henna, or a flawless wax, I pour artistry and care into everything I do.
              </p>
              <p className="text-gold italic font-heading text-lg">
                "Every client is my canvas, and every service is my masterpiece."
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-gold/[0.03] to-transparent">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Credentials</p>
            <h2 className="font-heading text-3xl md:text-5xl text-text-light">
              Certified <span className="gold-text-gradient">Excellence</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <AnimatedSection key={cert.title} delay={idx * 0.1}>
                  <SpotlightCard className="p-8 text-center h-full">
                    <div className="w-16 h-16 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-heading text-lg text-gold mb-2">{cert.title}</h3>
                    <p className="text-text-light/50 text-sm">{cert.description}</p>
                  </SpotlightCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-text-light">
              Why Choose <span className="gold-text-gradient">Ravélle</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <AnimatedSection key={badge.title} delay={idx * 0.1}>
                  <div className="text-center group">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-heading text-base text-text-light mb-2">{badge.title}</h3>
                    <p className="text-text-light/40 text-sm">{badge.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
