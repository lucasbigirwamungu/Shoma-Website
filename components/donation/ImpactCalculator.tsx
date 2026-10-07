'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { BookOpen, Droplets, GraduationCap } from 'lucide-react';

// ─── Impact-rekenfuncties (gebaseerd op werkelijke projectkosten Rubya) ─────
const calcRegularSchoolYears = (amount: number) => Math.floor(amount / 40);
const calcKempsMonths       = (amount: number) => Math.floor(amount / 30);
const calcCleanWaterLiters  = (amount: number) => Math.floor(amount * 50);

interface ImpactRow {
  icon: React.ElementType;
  label: string;
  value: (amount: number) => string;
  color: string;
}

const rows: ImpactRow[] = [
  {
    icon: GraduationCap,
    label: 'Jaar regulier onderwijs',
    value: (a) => {
      const v = calcRegularSchoolYears(a);
      return `${v} ${v === 1 ? 'jaar' : 'jaar'}`;
    },
    color: 'text-shoma-terracotta',
  },
  {
    icon: BookOpen,
    label: 'Maanden KEMPS-onderwijs',
    value: (a) => {
      const v = calcKempsMonths(a);
      return `${v} ${v === 1 ? 'maand' : 'maanden'}`;
    },
    color: 'text-shoma-teal',
  },
  {
    icon: Droplets,
    label: 'Liters schoon drinkwater',
    value: (a) => `${calcCleanWaterLiters(a).toLocaleString('nl-NL')} L`,
    color: 'text-blue-500',
  },
];

interface Props {
  initialAmount?: number;
}

export default function ImpactCalculator({ initialAmount = 40 }: Props) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [rawInput, setRawInput] = useState<string>(String(initialAmount));
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    valueRefs.current.forEach((el) => {
      if (!el) return;
      animate(el, {
        scale: [1, 1.08, 1],
        duration: 280,
        ease: 'outQuad',
      });
    });
  }, [amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setRawInput(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= 0) setAmount(parsed);
  };

  return (
    <div className="bg-shoma-sand p-6 rounded-2xl border border-shoma-teal/10 shadow-sm max-w-md mx-auto">
      <h3 className="text-xl font-bold text-shoma-slate mb-1">
        Bereken uw directe impact
      </h3>
      <p className="text-sm text-shoma-slate/55 mb-5">
        Dankzij onze 100% vrijwilligersstructuur gaat elke euro rechtstreeks naar Rubya.
      </p>

      {/* Bedrag input */}
      <div className="mb-6">
        <label
          htmlFor="impact-amount"
          className="block text-sm font-medium text-shoma-slate mb-2"
        >
          Voer een donatiebedrag in
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-shoma-slate font-bold text-lg">
            €
          </span>
          <input
            id="impact-amount"
            type="number"
            min={5}
            step={5}
            value={rawInput}
            onChange={handleChange}
            className="w-full pl-9 pr-4 py-3 rounded-xl border border-shoma-teal/20 focus:outline-none focus:ring-2 focus:ring-shoma-terracotta/50 focus:border-shoma-terracotta bg-white text-shoma-slate font-semibold text-lg"
            placeholder="40"
          />
        </div>
      </div>

      {/* Impact rows */}
      <div className="space-y-3">
        {rows.map((row, i) => {
          const Icon = row.icon;
          return (
            <div
              key={row.label}
              className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-xs border border-gray-100"
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${row.color}`} aria-hidden="true" />
                <span className="text-sm text-shoma-slate">{row.label}:</span>
              </div>
              <span
                ref={(el) => {
                  valueRefs.current[i] = el;
                }}
                className={`inline-block font-bold text-base ${row.color}`}
              >
                {amount > 0 ? row.value(amount) : '-'}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-shoma-slate/50 mt-5 text-center leading-relaxed">
        Gebaseerd op werkelijke kosten: €40/jaar regulier onderwijs · €30/maand KEMPS ·
        €1 = 50 liter drinkwater via het BAENT-pompstation.
      </p>
    </div>
  );
}
