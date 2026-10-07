'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { animate, onScroll } from 'animejs';
import { BadgeCheck, FileText } from 'lucide-react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const anbiFacts = [
  { label: 'RSIN', value: '814390249' },
  { label: 'IBAN', value: 'NL55 ABNA 0501 3541 58' },
  { label: 'Status', value: 'ANBI erkend' },
  { label: 'Bestuursbeloning', value: 'Volledig onbezoldigd' },
];

/**
 * Rustige, merk-consistente kaart i.p.v. de felle oranje gradient-balk.
 * Het badge-icoon krijgt een eenmalige "geverifieerd"-pop zodra de kaart
 * in beeld scrolt: een statusbevestiging, geen decoratie.
 */
export default function FiscalBanner() {
  const reducedMotion = useReducedMotion();
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !iconRef.current) return;

    const iconAnimation = animate(iconRef.current, {
      scale: [0.6, 1.08, 1],
      rotate: ['-8deg', '0deg'],
      duration: 650,
      ease: 'outElastic(1, 0.6)',
      autoplay: onScroll({ enter: 'bottom-=60 top', repeat: false }),
    });

    return () => {
      iconAnimation.pause();
    };
  }, [reducedMotion]);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="bg-shoma-sand rounded-3xl p-8 border border-shoma-teal/15"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div
          ref={iconRef}
          className="w-16 h-16 bg-shoma-teal/10 rounded-2xl flex items-center justify-center shrink-0"
        >
          <BadgeCheck className="w-9 h-9 text-shoma-teal" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-shoma-slate mb-2">
            Uw donatie is fiscaal aftrekbaar
          </h2>
          <p className="text-shoma-slate/70 leading-relaxed text-lg mb-3">
            Stichting Shoma is erkend als <strong className="text-shoma-slate">ANBI (Algemeen Nut Beogende Instelling)</strong>{' '}
            door de Nederlandse Belastingdienst. Dit betekent dat u uw donaties kunt
            aftrekken van uw inkomstenbelasting.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="bg-white text-shoma-slate/80 rounded-xl px-4 py-2.5 text-sm font-medium border border-shoma-teal/10">
              Gewone gift: aftrekbaar boven de drempel
            </div>
            <div className="bg-white text-shoma-slate/80 rounded-xl px-4 py-2.5 text-sm font-medium border border-shoma-teal/10">
              Periodieke gift: 100% aftrekbaar (5 jaar)
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <a
            href="https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/kosten-voor-anbi-aftrekken-als-gift"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-shoma-teal hover:bg-shoma-teal-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-150 active:scale-[0.97] shadow-sm whitespace-nowrap"
          >
            <FileText className="w-4 h-4" />
            Meer info fiscale aftrek →
          </a>
        </div>
      </div>

      {/* ANBI gegevens in de kaart */}
      <div className="mt-6 pt-6 border-t border-shoma-teal/10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {anbiFacts.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-shoma-slate/45 uppercase tracking-wider font-semibold">{item.label}</p>
            <p className="font-semibold text-shoma-slate text-sm mt-0.5">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
