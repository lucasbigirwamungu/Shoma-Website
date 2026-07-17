'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  to: number;
  duration?: number;       // ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  to,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(eased * to);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  const formatted =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString('nl-NL');

  return (
    <span ref={containerRef}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
