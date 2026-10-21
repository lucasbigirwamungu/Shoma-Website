'use client';

import { useEffect, useRef } from 'react';

/** Zet eenmalig de class `in` op het element zodra het in beeld komt (start de CSS-animatie). */
export function useInViewClass<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}
