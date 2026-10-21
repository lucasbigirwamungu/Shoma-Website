'use client';

/**
 * Tijdlijn "Ons verhaal": een draad die met het scrollen meegroeit (gekoppeld aan
 * de scrollpositie, geen autoplay). Een mijlpaal licht op zodra de draad hem bereikt.
 * Bij prefers-reduced-motion staat alles direct aan.
 */

import { useEffect, useRef } from 'react';

const MILESTONES = [
  { year: '2000', title: 'Marloes in Rubya', text: 'Marloes Bargeman loopt coschappen in het ziekenhuis van Rubya en leert Frank Bigirwamungu kennen.' },
  { year: '2004', title: 'Een bruiloft in Rubya', text: 'Een groep Nederlanders reist mee naar de bruiloft van Frank en Marloes. Binnen die groep ontstaat het idee om te helpen.' },
  { year: '2005', title: 'Stichting Shoma', text: 'De groep richt de stichting op. Na overleg met de lokale bevolking wordt onderwijs de basis.' },
  { year: '2016', title: 'KEMPS opent', text: 'De eigen Engelstalige basisschool start met 13 leerlingen.' },
  { year: '2025', title: '257 leerlingen', text: 'KEMPS telt 257 leerlingen en Shoma ondersteunt 210 kinderen in Rubya.' },
];

export default function StoryTimeline() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = ref.current;
    if (!ol) return;
    const items = [...ol.querySelectorAll<HTMLLIElement>('li')];
    const set = (p: number) => {
      ol.style.setProperty('--tl-p', String(p));
      const h = ol.offsetHeight;
      items.forEach((li) => li.classList.toggle('on', li.offsetTop + 14 <= p * h + 1));
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      set(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = ol.getBoundingClientRect();
      // de draad volgt een leeslijn op 65% van de viewporthoogte
      const p = Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height));
      set(p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <ol ref={ref} className="tl" aria-label="Tijdlijn van Stichting Shoma">
      {MILESTONES.map((m) => (
        <li key={m.year}>
          <span className="tl-dot" aria-hidden="true" />
          <span className="tl-year">{m.year}</span>
          <h3>{m.title}</h3>
          <p>{m.text}</p>
        </li>
      ))}
    </ol>
  );
}
