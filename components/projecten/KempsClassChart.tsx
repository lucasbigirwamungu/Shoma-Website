'use client';

// ─── KEMPS Gesponsorde Leerlingen per Klas ─────────────────────────────────
// Data gebaseerd op het schooloverzicht (schooljaar 2025).
// Weergave: een schoolgebouw dat zichzelf bouwt. De grond tekent zich, de lokalen
// rijzen op, het dak sluit en daarna stapt per lokaal elk gesponsord kind naar binnen.

import { useEffect, useState } from 'react';
import { useInViewClass } from '@/components/ui/use-in-view-class';

const CLASSES = [
  { name: 'Nursery', pages: 'P1 + P2 + P3', count: 17 },
  { name: 'Klas 1',  pages: 'P4',           count: 4 },
  { name: 'Klas 2',  pages: 'P5',           count: 9 },
  { name: 'Klas 3',  pages: 'P6',           count: 11 },
  { name: 'Klas 4',  pages: 'P7',           count: 14 },
  { name: 'Klas 5',  pages: 'P8',           count: 8 },
  { name: 'Klas 6',  pages: 'P9',           count: 6 },
  { name: 'Klas 7',  pages: 'P10',          count: 5 },
];

const TOTAL = CLASSES.reduce((s, c) => s + c.count, 0);
const KIDS_START = 2.1; // s: moment dat de eerste kinderen naar binnen gaan

/** Eén gebouw-SVG; `cols` lokalen per verdieping (8 op desktop, 4 op mobiel). */
function Building({ cols }: { cols: number }) {
  const W = 104, GAP = 10, H = 150, M = 24, ROOF = 46, LABEL = 46;
  const rows = Math.ceil(CLASSES.length / cols);
  const width = M * 2 + cols * W + (cols - 1) * GAP;
  const floorH = H + LABEL;
  const height = ROOF + rows * floorH + 10;
  const bx = M - 10, bw = width - 2 * M + 20;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className={cols === 8 ? 'kb-wide' : 'kb-narrow'}>
      {/* dak en grond */}
      <path className="kb-roof" pathLength={1} d={`M${bx - 8} ${ROOF}L${width / 2} 8L${bx + bw + 8} ${ROOF}`} />
      {Array.from({ length: rows }, (_, r) => {
        const gy = ROOF + r * floorH + H;
        return <path key={r} className="kb-ground" pathLength={1} d={`M${bx - 8} ${gy}H${bx + bw + 8}`} />;
      })}

      {CLASSES.map((c, i) => {
        const r = Math.floor(i / cols), col = i % cols;
        const x = M + col * (W + GAP), y = ROOF + r * floorH + 12;
        const h = H - 12;
        const kidsDelay = KIDS_START + i * 0.18;
        return (
          <g key={c.name}>
            <rect className="kb-room" x={x} y={y} width={W} height={h} rx="6" style={{ '--d': 0.35 + i * 0.1 } as React.CSSProperties} />
            {Array.from({ length: c.count }, (_, k) => {
              const cx = x + 17 + (k % 5) * 17.5;
              const cy = y + h - 12 - Math.floor(k / 5) * 19;
              return (
                <g key={k} className="kb-kid" style={{ '--d': kidsDelay + k * 0.035 } as React.CSSProperties}>
                  <circle cx={cx} cy={cy - 6} r="3.4" />
                  <path d={`M${cx - 5} ${cy + 6}v-4.5a5 5 0 0 1 10 0v4.5z`} />
                </g>
              );
            })}
            <text className="kb-n" x={x + W / 2} y={y + 24} textAnchor="middle" style={{ '--d': kidsDelay + 0.3 } as React.CSSProperties}>{c.count}</text>
            <text className="kb-name" x={x + W / 2} y={ROOF + r * floorH + H + 22} textAnchor="middle">{c.name}</text>
            <text className="kb-pages" x={x + W / 2} y={ROOF + r * floorH + H + 38} textAnchor="middle">{c.pages}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function KempsClassChart() {
  const ref = useInViewClass<HTMLDivElement>(0.3);
  const [count, setCount] = useState(0);

  // teller loopt mee terwijl de kinderen binnenkomen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(TOTAL); return; }
    let raf = 0, t0 = 0;
    const dur = CLASSES.length * 180 + 900;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const k = Math.min(1, Math.max(0, (t - t0 - KIDS_START * 1000) / dur));
      setCount(Math.round(TOTAL * k));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    const mo = new MutationObserver(() => {
      if (el.classList.contains('in')) { mo.disconnect(); raf = requestAnimationFrame(tick); }
    });
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => { mo.disconnect(); cancelAnimationFrame(raf); };
  }, [ref]);

  return (
    <div ref={ref} className="kb bg-shoma-sand rounded-3xl p-7 border border-shoma-teal/10">
      {/* Koptekst */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold text-shoma-slate">
            Gesponsorde KEMPS-leerlingen per klas
          </h3>
          <p className="text-sm text-shoma-slate/75 mt-0.5">Schooljaar 2025: door Shoma gesponsord</p>
        </div>
        <div className="bg-shoma-teal text-white rounded-xl px-4 py-2 text-center shrink-0">
          <span className="text-2xl font-extrabold leading-none block tabular-nums">{count}</span>
          <span className="text-xs opacity-80">totaal</span>
        </div>
      </div>

      <Building cols={8} />
      <Building cols={4} />

      {/* Tekstversie voor schermlezers */}
      <div className="sr-only"><table>
        <caption>Gesponsorde KEMPS-leerlingen per klas, schooljaar 2025</caption>
        <thead><tr><th>Klas</th><th>Leerlingen</th></tr></thead>
        <tbody>
          {CLASSES.map((c) => <tr key={c.name}><td>{c.name} ({c.pages})</td><td>{c.count}</td></tr>)}
          <tr><td>Totaal</td><td>{TOTAL}</td></tr>
        </tbody>
      </table></div>

      <p className="text-xs text-shoma-slate/75 mt-4 leading-relaxed">
        * KEMPS heeft 257 leerlingen totaal (gestart in 2016 met 13 leerlingen) verdeeld over Nursery t/m Klas 7. Stichting Shoma
        sponsort {TOTAL} leerlingen voor wie de schoolkosten van €350/jaar anders onbetaalbaar zouden zijn.
      </p>
    </div>
  );
}
