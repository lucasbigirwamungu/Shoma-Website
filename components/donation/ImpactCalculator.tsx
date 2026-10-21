'use client';

/**
 * Impactcalculator: kies een bedrag en zie wat het betekent.
 * Kinderfiguren vullen zich (1 per jaar regulier onderwijs), een ring loopt
 * naar een volledig KEMPS-schooljaar en een watertank vult zich richting de
 * 20.000 L opslag op KEMPS. Bij prefers-reduced-motion geen pop/tweens.
 */

import { useEffect, useRef, useState } from 'react';
import { Droplets } from 'lucide-react';

// ─── Impact-rekenfuncties (gebaseerd op werkelijke projectkosten Rubya) ─────
const calcRegularSchoolYears = (amount: number) => Math.floor(amount / 40);
const calcKempsMonths       = (amount: number) => Math.floor(amount / 30);
const calcCleanWaterLiters  = (amount: number) => Math.floor(amount * 50);

const PRESETS = [40, 100, 360];
const KIDS = 10;
const TANK_L = 20000;
const RING_C = 2 * Math.PI * 52;
const nf = new Intl.NumberFormat('nl-NL');

function Child() {
  return (
    <svg viewBox="0 0 30 46" fill="currentColor" aria-hidden="true">
      <circle cx="15" cy="9" r="7" />
      <path d="M3 44V27a12 12 0 0 1 24 0v17z" />
    </svg>
  );
}

/** Telt zacht op naar de nieuwe waarde. */
function useTween(target: number, ms = 700) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      from.current = target;
      setV(target);
      return;
    }
    const start = from.current, t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      const cur = start + (target - start) * e;
      from.current = cur;
      setV(cur);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return Math.round(v);
}

interface Props {
  initialAmount?: number;
  className?: string;
}

export default function ImpactCalculator({ initialAmount = 40, className = 'max-w-md mx-auto' }: Props) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [rawInput, setRawInput] = useState<string>(PRESETS.includes(initialAmount) ? '' : String(initialAmount));

  const years = calcRegularSchoolYears(amount);
  const months = calcKempsMonths(amount);
  const liters = calcCleanWaterLiters(amount);
  const shownYears = useTween(years);
  const shownLiters = useTween(liters);
  const ringPart = Math.min(1, months / 12);
  const tankPart = Math.min(1, liters / TANK_L);

  const pick = (v: number) => {
    setAmount(v);
    setRawInput('');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setRawInput(raw);
    const parsed = parseFloat(raw);
    setAmount(!isNaN(parsed) && parsed >= 0 ? parsed : 0);
  };

  return (
    <div className={`ic-card bg-shoma-sand p-6 sm:p-7 rounded-2xl border border-shoma-teal/10 shadow-sm ${className}`}>
      <h3 className="text-xl font-bold text-shoma-slate mb-1">
        Bereken uw directe impact
      </h3>
      <p className="text-sm text-shoma-slate/75">
        Dankzij onze 100% vrijwilligersstructuur gaat elke euro rechtstreeks naar Rubya.
      </p>

      {/* Bedrag kiezen */}
      <div className="ic-amt" role="group" aria-label="Kies een donatiebedrag">
        {PRESETS.map((v) => (
          <button key={v} type="button" aria-pressed={!rawInput && amount === v} onClick={() => pick(v)}>
            € {nf.format(v)}
          </button>
        ))}
        <label className="ic-own">
          <span aria-hidden="true">€</span>
          <input
            id="impact-amount"
            type="number"
            min={0}
            step={5}
            inputMode="numeric"
            value={rawInput}
            onChange={handleChange}
            aria-label="Eigen bedrag in euro"
            placeholder="Eigen bedrag"
          />
        </label>
      </div>

      {/* Kinderen naar school */}
      <div className="flex items-baseline gap-3">
        <span className="ic-num tabular-nums">{nf.format(shownYears)}</span>
        <span className="text-shoma-slate font-semibold leading-tight">
          {years === 1 ? 'kind een jaar' : 'kinderen een jaar'}
          <br />
          <span className="font-normal text-sm text-shoma-slate/75">naar een overheidsschool (€ 40 per jaar)</span>
        </span>
      </div>
      <div className="ic-kids" aria-hidden="true" data-more={years > KIDS ? `+${nf.format(years - KIDS)}` : ''}>
        {Array.from({ length: KIDS }, (_, i) => (
          <span key={i} className={i < years ? 'on' : ''}>
            <Child />
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 mt-6">
        {/* KEMPS-ring */}
        <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-shoma-teal/10">
          <svg className="ic-ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="bg" cx="60" cy="60" r="52" />
            <circle
              className="fg"
              cx="60"
              cy="60"
              r="52"
              transform="rotate(-90 60 60)"
              style={{ strokeDasharray: RING_C, strokeDashoffset: RING_C * (1 - ringPart) }}
            />
            <text x="60" y="58" textAnchor="middle" className="v">{Math.min(months, 12)}</text>
            <text x="60" y="78" textAnchor="middle" className="u">van 12 mnd</text>
          </svg>
          <p className="text-sm text-shoma-slate leading-snug">
            <b>Schooljaar op KEMPS</b>
            <br />
            <span className="text-shoma-slate/75">Engelstalig onderwijs, € 30 per maand</span>
          </p>
        </div>

        {/* Watertank */}
        <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-shoma-teal/10">
          <div className="ic-tank" aria-hidden="true">
            <i style={{ transform: `scaleY(${tankPart})` }} />
            <Droplets className="w-4 h-4" />
          </div>
          <p className="text-sm text-shoma-slate leading-snug">
            <b className="tabular-nums">{nf.format(shownLiters)} liter</b>
            <br />
            <span className="text-shoma-slate/75">schoon drinkwater (€ 1 = 50 L)</span>
          </p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {amount > 0
          ? `Met € ${nf.format(amount)} gaan ${years} kinderen een jaar naar school, betaalt u ${months} maanden KEMPS-onderwijs of ${nf.format(liters)} liter schoon drinkwater.`
          : 'Kies een bedrag om de impact te zien.'}
      </p>

      <p className="text-xs text-shoma-slate/75 mt-5 text-center leading-relaxed">
        Gebaseerd op werkelijke kosten: €40/jaar regulier onderwijs · €30/maand KEMPS ·
        €1 = 50 liter drinkwater via het BAENT-pompstation. De tank toont de
        opslag van 20.000 L op KEMPS.
      </p>
    </div>
  );
}
