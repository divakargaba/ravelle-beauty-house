import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function InfiniteCards({ items, speed = 'normal', pauseOnHover = true }) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current.appendChild(duplicatedItem);
    });

    const duration = speed === 'fast' ? '20s' : speed === 'slow' ? '60s' : '40s';
    containerRef.current.style.setProperty('--animation-duration', duration);
    setStart(true);
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className="scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap ${
          start ? 'animate-scroll' : ''
        } ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: start
            ? 'scroll var(--animation-duration, 40s) linear infinite'
            : 'none',
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[350px] max-w-full relative rounded-2xl border border-gold/20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 px-8 py-6 md:w-[400px] flex-shrink-0"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-text-light/80 text-sm leading-relaxed mb-4">
              "{item.text}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gold font-medium text-sm">{item.name}</p>
                <p className="text-text-light/50 text-xs">{item.service}</p>
              </div>
              <p className="text-text-light/30 text-xs">{item.date}</p>
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) linear infinite;
        }
      `}</style>
    </div>
  );
}
