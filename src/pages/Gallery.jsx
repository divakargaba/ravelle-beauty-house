import { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/ui/AnimatedSection';
import { galleryItems, galleryFilters } from '../data/gallery';

function CircularWatermark({ className = '' }) {
  const uid = useId().replace(/:/g, '');
  const topId = `wm-t-${uid}`;
  const bottomId = `wm-b-${uid}`;

  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Clockwise full circle starting at 6 o'clock — 50% offset lands text at 12 o'clock */}
        <path id={topId} d="M 150,251 A 101,101 0 1,1 150.01,251" />
        {/* Counter-clockwise full circle starting at 12 o'clock — 50% offset lands text at 6 o'clock */}
        <path id={bottomId} d="M 150,38 A 112,112 0 1,0 149.99,38" />
      </defs>

      {/* Outer double ring */}
      <circle cx="150" cy="150" r="143" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="150" cy="150" r="137" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />

      {/* Inner double ring */}
      <circle cx="150" cy="150" r="80" stroke="currentColor" strokeWidth="2" />
      <circle cx="150" cy="150" r="76" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />

      {/* Top curved text: RAVÉLLE BEAUTY HOUSE */}
      <text
        fill="currentColor"
        fontSize="18"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        letterSpacing="4"
      >
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          RAVÉLLE BEAUTY HOUSE
        </textPath>
      </text>

      {/* Bottom curved text: RAVÉLLE BEAUTY HOUSE (mirrored) */}
      <text
        fill="currentColor"
        fontSize="10.5"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="600"
        letterSpacing="3"
      >
        <textPath href={`#${bottomId}`} startOffset="50%" textAnchor="middle">
          RAVÉLLE BEAUTY HOUSE
        </textPath>
      </text>

      {/* Floral vine decorations in the bottom half between rings */}
      {/* Left vine */}
      <g stroke="currentColor" fill="currentColor" opacity="0.8">
        {/* Left floral branch */}
        <path d="M 80,210 Q 90,230 110,240" strokeWidth="1" fill="none" />
        <ellipse cx="78" cy="207" rx="4" ry="6" transform="rotate(-30 78 207)" opacity="0.7" />
        <ellipse cx="85" cy="215" rx="3" ry="5" transform="rotate(-15 85 215)" opacity="0.6" />
        <ellipse cx="95" cy="228" rx="3.5" ry="5.5" transform="rotate(5 95 228)" opacity="0.7" />
        <circle cx="110" cy="240" r="2" opacity="0.5" />

        {/* Right floral branch (mirrored) */}
        <path d="M 220,210 Q 210,230 190,240" strokeWidth="1" fill="none" />
        <ellipse cx="222" cy="207" rx="4" ry="6" transform="rotate(30 222 207)" opacity="0.7" />
        <ellipse cx="215" cy="215" rx="3" ry="5" transform="rotate(15 215 215)" opacity="0.6" />
        <ellipse cx="205" cy="228" rx="3.5" ry="5.5" transform="rotate(-5 205 228)" opacity="0.7" />
        <circle cx="190" cy="240" r="2" opacity="0.5" />

        {/* Bottom center small flower */}
        <circle cx="150" cy="255" r="2.5" opacity="0.6" />
        <ellipse cx="145" cy="252" rx="3" ry="5" transform="rotate(-25 145 252)" opacity="0.5" />
        <ellipse cx="155" cy="252" rx="3" ry="5" transform="rotate(25 155 252)" opacity="0.5" />
        <ellipse cx="147" cy="258" rx="3" ry="5" transform="rotate(25 147 258)" opacity="0.5" />
        <ellipse cx="153" cy="258" rx="3" ry="5" transform="rotate(-25 153 258)" opacity="0.5" />
      </g>

      {/* Thin decorative ring around center R */}
      <circle cx="150" cy="150" r="46" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />

      {/* Center R */}
      <text
        x="150"
        y="153"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontSize="56"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
      >
        R
      </text>

      {/* Diamond separators at 3 o'clock and 9 o'clock */}
      <path d="M 258,145 L 263,150 L 258,155 L 253,150 Z" fill="currentColor" />
      <path d="M 42,145 L 47,150 L 42,155 L 37,150 Z" fill="currentColor" />

      {/* Small dot accents flanking each diamond */}
      <circle cx="247" cy="150" r="1.5" fill="currentColor" />
      <circle cx="269" cy="150" r="1.5" fill="currentColor" />
      <circle cx="31" cy="150" r="1.5" fill="currentColor" />
      <circle cx="53" cy="150" r="1.5" fill="currentColor" />
    </svg>
  );
}

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

      {/* Circular watermark overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <CircularWatermark
          className="w-[38%] h-auto text-white/[0.7] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        />
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
          {/* Circular watermark overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <CircularWatermark
              className="w-[30%] h-auto text-white/[0.65] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            />
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
