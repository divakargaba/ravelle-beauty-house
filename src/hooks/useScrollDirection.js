import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [prevOffset, setPrevOffset] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.scrollY;
      setIsAtTop(currentOffset < 10);

      if (Math.abs(currentOffset - prevOffset) < 10) return;

      setScrollDirection(currentOffset > prevOffset ? 'down' : 'up');
      setPrevOffset(currentOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevOffset]);

  return { scrollDirection, isAtTop };
}
