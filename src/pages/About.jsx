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
    description: 'All services are open and welcoming to everyone.',
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
            <div className="aspect-[3/4] rounded-2xl border border-gold/20 overflow-hidden relative">
              <img
                src="/rav-artist.jpg"
                alt="Rav — Beauty Artist at Ravélle Beauty House"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl text-text-light">
              Meet <span className="text-gold">Rav</span>
            </h2>
            <div className="space-y-4 text-text-light/60 leading-relaxed">
              <p>
                Hi, I'm Rav — a passionate beauty artist with over two decades of experience in the art of henna, and a lifelong love for the beauty industry.
              </p>
              <p>
                My journey began early — I created my first bridal henna design at just 11 years old. What started as a natural talent quickly became a calling. Today, with 22 years of henna artistry and 7+ years of professional salon and spa management experience, I bring both creativity and professionalism into every appointment.
              </p>
              <p>
                Beyond beauty, my background is deeply rooted in communication and connection. With an Associate Degree in Mass Media, along with experience as a radio jockey, TV analyst, and motivational speaker, I've learned how to truly understand people — not just serve them.
              </p>
              <p>
                At my core, I am an artist who genuinely loves this space. Salon and spa environments energize me. Helping people feel confident, valued, and beautiful is not just my work — it's something I deeply enjoy.
              </p>
              <p>
                I also believe my biggest strength comes from being a client myself — a very particular one. I understand what it feels like to invest your time and money into beauty services, and expect real value in return. That's exactly what I aim to deliver:
              </p>
              <ul className="space-y-2 text-gold/80">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                  A personalized experience
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                  Attention to detail
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                  A space where you feel truly cared for
                </li>
              </ul>
              <p className="text-gold italic font-heading text-lg pt-2">
                "Whether it's henna, lashes, or brows — my goal is simple: to make sure you don't just love the results, but enjoy every moment of the experience."
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
