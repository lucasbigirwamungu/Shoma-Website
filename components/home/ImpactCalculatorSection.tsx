'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '@/components/ui/animated-section';
import ImpactCalculator from '@/components/donation/ImpactCalculator';

export default function ImpactCalculatorSection() {
  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Tekst */}
      <motion.div variants={staggerItem} className="lg:w-1/2">
        <h2 className="text-3xl sm:text-4xl font-bold text-shoma-slate leading-tight">
          Hoeveel impact heeft <span className="text-shoma-terracotta-ink">uw</span> donatie?
        </h2>
        <p className="mt-5 max-w-[60ch] text-shoma-slate/75 leading-relaxed">
          Dankzij onze volledig onbezoldigde bestuursstructuur en extern gesponsorde
          operationele kosten gaat letterlijk elke gedoneerde euro naar de kinderen in Rubya.
          Bereken hiernaast direct wat uw bijdrage concreet betekent.
        </p>
        <dl className="mt-6 max-w-md divide-y divide-shoma-teal/10 border-y border-shoma-teal/10">
          {[
            { amount: '€ 40,-', effect: 'dekt 1 volledig jaar regulier onderwijs' },
            { amount: '€ 30,-/mnd', effect: 'financiert 1 maand KEMPS-onderwijs' },
            { amount: '€ 1,-', effect: '= 50 liter schoon drinkwater via BAENT' },
          ].map((item) => (
            <div key={item.amount} className="flex items-baseline gap-4 py-2.5">
              <dt className="w-24 shrink-0 font-bold tabular-nums text-shoma-terracotta-ink">{item.amount}</dt>
              <dd className="text-sm text-shoma-slate">{item.effect}</dd>
            </div>
          ))}
        </dl>
        <Link
          href="/doneren"
          className="mt-8 inline-flex items-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-shoma-slate px-7 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
        >
          <Heart className="w-4 h-4" aria-hidden="true" />
          Doneer direct
        </Link>
      </motion.div>

      {/* Calculator */}
      <motion.div variants={staggerItem} className="lg:w-1/2 w-full">
        <ImpactCalculator initialAmount={40} />
      </motion.div>
    </motion.div>
  );
}
