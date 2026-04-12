import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Eye, Flower2, Scissors, MapPin, Phone } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import SparklesBackground from '../components/ui/SparklesBackground';
import TextGenerate from '../components/ui/TextGenerate';
import MovingBorder from '../components/ui/MovingBorder';
import SpotlightCard from '../components/ui/SpotlightCard';
import InfiniteCards from '../components/ui/InfiniteCards';
import AnimatedSection from '../components/ui/AnimatedSection';
import { serviceCategories } from '../data/services';
import { testimonials } from '../data/testimonials';

const iconMap = {
  Sparkles: Sparkles,
  Eye: Eye,
  Flower2: Flower2,
  Brush: Scissors,
};

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <SparklesBackground density={60} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img
              src="/images/logo.png"
              alt="Ravélle Beauty House"
              className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden text-center">
              <h1 className="font-heading text-6xl md:text-8xl text-gold tracking-wider">
                RAVÉLLE
              </h1>
              <p className="font-heading text-xl md:text-2xl text-gold/60 tracking-[0.3em] mt-2">
                BEAUTY HOUSE
              </p>
            </div>
          </motion.div>

          <div className="mt-6 mb-4">
            <TextGenerate
              words="Where Beauty Becomes Art"
              className="font-heading text-2xl md:text-4xl text-gold/90 italic"
              delay={0.5}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-text-light/50 text-sm md:text-base tracking-[0.2em] uppercase mb-10"
          >
            Designed for the Modern Muse
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-text-light/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Premium mobile beauty services, delivered to your door in Calgary
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <MovingBorder
              as={Link}
              to="/book"
              className="text-gold font-medium text-base tracking-wider hover:text-primary hover:bg-gold transition-colors"
              containerClassName="cursor-pointer"
            >
              Book Your Appointment
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </MovingBorder>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Our Services</p>
            <h2 className="font-heading text-3xl md:text-5xl text-text-light mb-4">
              Artistry at Your <span className="gold-text-gradient">Doorstep</span>
            </h2>
            <p className="text-text-light/50 max-w-2xl mx-auto">
              From stunning lash extensions to intricate henna art — we bring the luxury salon experience to the comfort of your home.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((service, idx) => {
              const Icon = iconMap[service.icon] || Sparkles;
              return (
                <AnimatedSection key={service.id} delay={idx * 0.1}>
                  <SpotlightCard className="p-8 h-full group cursor-pointer">
                    <Link to="/services" className="block h-full">
                      <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-heading text-xl text-text-light mb-3 group-hover:text-gold transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-text-light/50 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-gold/60 text-sm group-hover:text-gold transition-colors">
                        <span>View Services</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </SpotlightCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Service Banner */}
      <section className="py-16 px-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/20 rounded-2xl p-8 md:p-12 text-center">
            <MapPin className="w-8 h-8 text-gold mx-auto mb-4" />
            <h3 className="font-heading text-2xl md:text-3xl text-text-light mb-3">
              We Come to <span className="text-gold">You</span>
            </h3>
            <p className="text-text-light/60 max-w-xl mx-auto mb-6">
              Enjoy premium beauty services in the comfort and privacy of your own home.
              Serving Calgary and surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:8257363649"
                className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-heading text-xl">825-736-3649</span>
              </a>
              <span className="hidden sm:block text-text-light/20">|</span>
              <p className="text-text-light/40 text-sm">
                Fuel surcharge may apply for locations outside central Calgary
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 px-4 overflow-hidden">
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-5xl text-text-light">
            What Our <span className="gold-text-gradient">Clients</span> Say
          </h2>
        </AnimatedSection>
        <InfiniteCards items={testimonials} speed="slow" />
      </section>

      {/* Instagram CTA */}
      <section className="py-20 px-4">
        <AnimatedSection className="text-center">
          <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Follow Our Work</p>
          <h2 className="font-heading text-3xl md:text-4xl text-text-light mb-6">
            @ravellebeautyhouse
          </h2>
          <a
            href="https://instagram.com/ravellebeautyhouse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-8 py-3 text-gold hover:bg-gold hover:text-primary transition-all duration-300"
          >
            Follow on Instagram
            <ArrowRight className="w-4 h-4" />
          </a>
        </AnimatedSection>
      </section>
    </PageTransition>
  );
}
