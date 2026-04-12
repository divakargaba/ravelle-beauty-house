import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/ui/AnimatedSection';
import { galleryItems, galleryFilters } from '../data/gallery';

function GalleryImage({ item, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer relative overflow-hidden rounded-xl border border-gold/10 hover:border-gold/30 transition-all duration-300 break-inside-avoid mb-4"
      onClick={() => onClick(item)}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-primary-light animate-pulse" />
      )}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto block transition-all duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center bg-primary/50 backdrop-blur-sm">
            <ZoomIn className="w-5 h-5 text-gold" />
          </div>
        </div>
      </div>

      {/* Watermark overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-15">
        <p
          className="font-heading text-white whitespace-nowrap"
          style={{
            fontSize: '1rem',
            transform: 'rotate(-30deg)',
            letterSpacing: '0.1em',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          Ravélle Beauty House
        </p>
      </div>
    </motion.div>
  );
}

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-text-light/60 hover:text-gold transition-colors z-50"
      >
        <X className="w-8 h-8" />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-2xl border border-gold/20">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[75vh] w-auto object-contain"
          />
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-15">
            <p
              className="font-heading text-white whitespace-nowrap"
              style={{
                fontSize: '2rem',
                transform: 'rotate(-30deg)',
                letterSpacing: '0.1em',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Ravélle Beauty House
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gold font-heading text-lg">{item.title}</p>
          <p className="text-text-light/40 text-sm capitalize">{item.category}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter.toLowerCase());

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Portfolio</p>
            <h1 className="font-heading text-4xl md:text-6xl text-text-light mb-4">
              Our <span className="gold-text-gradient">Gallery</span>
            </h1>
            <p className="text-text-light/50 max-w-2xl mx-auto">
              Browse our collection of beauty artistry. Each piece is a testament to the care and precision we bring to every client.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter + Gallery */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <AnimatedSection delay={0.2} className="flex flex-wrap justify-center gap-2 mb-12">
            {galleryFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gold text-primary'
                    : 'border border-gold/20 text-text-light/60 hover:border-gold/40 hover:text-gold'
                }`}
              >
                {filter}
              </button>
            ))}
          </AnimatedSection>

          {/* Masonry Grid */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <GalleryImage
                  key={item.id}
                  item={item}
                  onClick={setSelectedItem}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-light/40">No images in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
