'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, splitText, onScroll } from 'animejs';

/**
 * Eenmalige char-voor-char reveal van het "Shoma"-woord zodra het in beeld komt.
 * Dit is de merkkern van de pagina (Kihaya-woord voor "onderwijs"), vandaar de
 * enige geautoriseerde tekst-animatie op deze pagina.
 */
export default function StoryBadge() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !wordRef.current || !badgeRef.current) return;

    const splitter = splitText(wordRef.current, { words: false, chars: true });

    animate(badgeRef.current, {
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: 500,
      ease: 'outExpo',
      autoplay: onScroll({ enter: 'bottom-=40 top', repeat: false }),
    });

    const charsAnimation = animate(splitter.chars, {
      y: [
        { to: '-0.5em', ease: 'outExpo', duration: 380 },
        { to: 0, ease: 'outBounce', duration: 500, delay: 80 },
      ],
      opacity: [0, 1],
      delay: stagger(45),
      autoplay: onScroll({ enter: 'bottom-=40 top', repeat: false }),
    });

    return () => {
      charsAnimation.pause();
      splitter.revert();
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className="inline-flex items-center gap-3 bg-shoma-teal/10 rounded-2xl px-5 py-3 mb-6"
    >
      <span ref={wordRef} className="text-2xl font-extrabold text-shoma-teal inline-block">
        Shoma
      </span>
      <span className="text-shoma-slate/60 text-sm">is het Kihaya-woord voor</span>
      <span className="text-lg font-bold text-shoma-terracotta-dark">&ldquo;onderwijs&rdquo;</span>
    </div>
  );
}
