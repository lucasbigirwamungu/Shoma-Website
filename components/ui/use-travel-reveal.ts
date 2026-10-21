'use client';

import { useEffect, useRef } from 'react';

/**
 * Een bolletje (`[data-traveller]`) reist over een route (`[data-route]`, een pad zonder pathLength).
 * Elke halte (`[data-stop]` met data-x/data-y) krijgt pas de class `on` als het bolletje er bijna is,
 * zodat de kijker het bolletje volgt. Tijdens de eerste ronde loopt `--trail` van 0 naar 1 (de route
 * tekent zich mee); daarna krijgt het element `done` en blijft het bolletje rustig rondgaan.
 * Speelt alleen zolang het in beeld is. Bij prefers-reduced-motion staat alles direct aan.
 */
export function useTravelReveal<T extends HTMLElement>(duration: number, lead = 0.05) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    const route = root?.querySelector<SVGPathElement>('[data-route]');
    const dot = root?.querySelector<SVGCircleElement>('[data-traveller]');
    if (!root || !route || !dot) return;
    const stops = [...root.querySelectorAll<SVGElement>('[data-stop]')];
    const finish = () => {
      root.style.setProperty('--trail', '1');
      stops.forEach((s) => s.classList.add('on'));
      root.classList.add('in', 'done');
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return; }

    // positie van elke halte als fractie van de route (dichtstbijzijnde punt)
    const L = route.getTotalLength(), N = 300;
    const samples = Array.from({ length: N + 1 }, (_, i) => route.getPointAtLength((L * i) / N));
    const at = stops.map((s) => {
      const x = Number(s.dataset.x), y = Number(s.dataset.y);
      let bi = 0, bd = Infinity;
      samples.forEach((p, i) => { const d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; bi = i; } });
      return bi / N;
    });

    let raf = 0, last = 0, elapsed = 0;
    const tick = (t: number) => {
      elapsed += last ? Math.min(50, t - last) : 0;
      last = t;
      const laps = elapsed / duration, f = laps % 1;
      const p = route.getPointAtLength(L * f);
      dot.setAttribute('cx', String(p.x));
      dot.setAttribute('cy', String(p.y));
      if (laps < 1) {
        root.style.setProperty('--trail', String(f));
        stops.forEach((s, i) => { if (f >= at[i] - lead) s.classList.add('on'); });
      } else if (!root.classList.contains('done')) finish();
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) { root.classList.add('in'); last = 0; raf = requestAnimationFrame(tick); }
    }, { threshold: 0.35 });
    io.observe(root);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [duration, lead]);
  return ref;
}
