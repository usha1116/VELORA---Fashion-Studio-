import React, { useEffect, useState, useRef } from 'react';

type CursorMode = 'default' | 'pointer' | 'image' | 'text';

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState('');

  // Target mouse position (direct)
  const targetPos = useRef({ x: -100, y: -100 });
  // Interpolated smooth follower position
  const currentPos = useRef({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop / fine pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the small dot for zero input lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for explicit data-cursor
      const explicitCursor = target.closest('[data-cursor]') as HTMLElement | null;
      if (explicitCursor) {
        const customType = explicitCursor.getAttribute('data-cursor');
        const customLabel = explicitCursor.getAttribute('data-cursor-text') || 'INSPECT';
        if (customType === 'image') {
          setMode('image');
          setCursorText(customLabel);
          return;
        }
        if (customType === 'pointer') {
          setMode('pointer');
          return;
        }
      }

      // Check if image or media container
      if (target.closest('img') || target.closest('[data-cursor-image]')) {
        setMode('image');
        setCursorText('INSPECT');
        return;
      }

      // Check if button, link, or click target
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.tagName === 'SELECT'
      ) {
        setMode('pointer');
        setCursorText('');
        return;
      }

      // Check if input or editable
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setMode('text');
        setCursorText('');
        return;
      }

      setMode('default');
      setCursorText('');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    // Smooth lerp loop for the outer halo/vessel
    let animId: number;
    const lerpSpeed = 0.18; // Smooth, tactile damping

    const updatePosition = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpSpeed;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpSpeed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(updatePosition);
    };

    animId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Fast pinpoint center dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full transition-transform duration-75 ease-out ${
          mode === 'image'
            ? 'opacity-0 scale-0'
            : mode === 'pointer'
            ? 'bg-[#C49774] scale-75'
            : 'bg-[#F5F2EB]'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* 2. Fluid interpolated outer vessel (morphs based on interactive mode) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 transition-[width,height,background-color,border-color,border-radius] duration-300 ease-out will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        {mode === 'default' && (
          <div className="-translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 transition-all" />
        )}

        {mode === 'pointer' && (
          <div className="-translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#853744]/70 bg-[#853744]/10 backdrop-blur-[2px] transition-all animate-pulse" />
        )}

        {mode === 'image' && (
          <div className="-translate-x-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full bg-[#0B0C10]/90 border border-[#C49774]/70 text-[#F5F2EB] font-tech text-[10px] tracking-[0.25em] uppercase font-semibold flex items-center gap-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#853744] animate-ping" />
            <span>{cursorText || 'INSPECT'}</span>
          </div>
        )}

        {mode === 'text' && (
          <div className="-translate-x-1/2 -translate-y-1/2 w-[2px] h-5 bg-[#C49774] transition-all" />
        )}
      </div>
    </div>
  );
};
