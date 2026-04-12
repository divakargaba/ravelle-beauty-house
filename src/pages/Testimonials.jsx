import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/ui/AnimatedSection';
import SpotlightCard from '../components/ui/SpotlightCard';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Testimonials</p>
            <h1 className="font-heading text-4xl md:text-6xl text-text-light mb-4">
              Client <span className="gold-text-gradient">Love</span>
            </h1>
            <p className="text-text-light/50 max-w-2xl mx-auto">
              Don't just take our word for it — hear from the amazing clients who trust Ravélle Beauty House for their beauty needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <AnimatedSection key={item.id} delay={idx * 0.1}>
                <SpotlightCard className="p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>

                  <p className="text-text-light/70 text-sm leading-relaxed flex-1 mb-6 italic">
                    "{item.text}"
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                    <div>
                      <p className="text-gold font-medium text-sm">{item.name}</p>
                      <p className="text-text-light/40 text-xs">{item.service}</p>
                    </div>
                    <p className="text-text-light/30 text-xs">{item.date}</p>
                  </div>
                </SpotlightCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Leave a Review CTA */}
          <AnimatedSection className="text-center mt-16">
            <div className="max-w-xl mx-auto p-8 border border-gold/20 rounded-2xl bg-gold/[0.03]">
              <h3 className="font-heading text-2xl text-text-light mb-3">
                Loved Your Experience?
              </h3>
              <p className="text-text-light/50 text-sm mb-6">
                We'd love to hear your feedback! Leave us a review and help others discover Ravélle Beauty House.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://instagram.com/ravellebeautyhouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-gold text-sm hover:bg-gold hover:text-primary transition-all duration-300"
                >
                  Review on Instagram
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-gold text-sm hover:bg-gold hover:text-primary transition-all duration-300"
                >
                  Review on Google
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}
