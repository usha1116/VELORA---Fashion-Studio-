import { useState, useEffect } from 'react';

/**
 * Lightweight, high-performance scroll parallax hook.
 * Uses requestAnimationFrame and respects prefers-reduced-motion.
 * Only outputs translateY values to animate compositor-only properties.
 */
export function useScrollParallax(speed = 0.12) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffsetY(window.scrollY * speed);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offsetY;
}
