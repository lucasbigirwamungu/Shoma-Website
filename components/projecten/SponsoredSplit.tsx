'use client';

/**
 * Totaaloverzicht 2025 als verhaal in twee bewegingen: eerst verschijnen 210 stipjes
 * als één groep kinderen (de teller telt mee), daarna splitst de groep zich in de
 * kinderen op overheidsscholen en de kinderen op KEMPS. De teller en het label van
 * elke groep lopen pas op wanneer de stipjes daar aankomen.
 */

import { useEffect, useRef } from 'react';

const GOV = 136, KEMPS = 74, TOTAL = GOV + KEMPS;
const POP = 1.3, SPLIT = 2.4, SPREAD = 1.6, MOVE = 1.1; // seconden

type Pt = [number, number];
type Layout = {
  w: number; h: number; s: number;
  crowd: { c: Pt; cols: number }; gov: { c: Pt; cols: number }; kemps: { c: Pt; cols: number };
  label: Pt; govLbl: Pt; kempsLbl: Pt; sum: Pt;
};

const WIDE: Layout = {
  w: 960, h: 330, s: 16,
  crowd: { c: [480, 165], cols: 21 }, gov: { c: [260, 180], cols: 17 }, kemps: { c: [730, 180], cols: 10 },
  label: [480, 60], govLbl: [260, 60], kempsLbl: [730, 60], sum: [480, 310],
};
const NARROW: Layout = {
  w: 400, h: 560, s: 16,
  crowd: { c: [200, 270], cols: 21 }, gov: { c: [200, 160], cols: 17 }, kemps: { c: [200, 410], cols: 10 },
  label: [200, 170], govLbl: [200, 50], kempsLbl: [200, 300], sum: [200, 515],
};

const grid = (n: number, { c, cols }: { c: Pt; cols: number }, s: number): Pt[] => {
  const rows = Math.ceil(n / cols);
  return Array.from({ length: n }, (_, i) => [
    c[0] + ((i % cols) - (cols - 1) / 2) * s,
    c[1] + (Math.floor(i / cols) - (rows - 1) / 2) * s,
  ]);
};

// vaste pseudo-willekeur zodat server en client hetzelfde renderen
const rnd = (i: number) => (Math.imul(i + 1, 2654435761) >>> 0) % 1000 / 1000;
const r3 = (v: number) => Math.round(v * 1000) / 1000;

function plan(L: Layout) {
  const crowd = grid(TOTAL, L.crowd, L.s);
  const gov = grid(GOV, L.gov, L.s), kemps = grid(KEMPS, L.kemps, L.s);
  // de linker (of bovenste) kinderen in de groep gaan naar de overheidsscholen
  const key = (p: Pt) => (L === WIDE ? p[0] * 1000 + p[1] : p[1] * 1000 + p[0]);
  const order = crowd.map((p, i) => i).sort((a, b) => key(crowd[a]) - key(crowd[b]));
  return crowd.map((from, i) => {
    const r = order.indexOf(i), isK = r >= GOV, k = isK ? r - GOV : r, n = isK ? KEMPS : GOV;
    return {
      from, to: (isK ? kemps : gov)[k], isK,
      pop: r3(rnd(i) * POP),
      move: r3(SPLIT + (k / n) * SPREAD + rnd(i + 999) * 0.15),
    };
  });
}
const PLANS = { wide: plan(WIDE), narrow: plan(NARROW) };

function Split({ L, kind }: { L: Layout; kind: 'wide' | 'narrow' }) {
  const dots = PLANS[kind];
  return (
    <svg viewBox={`0 0 ${L.w} ${L.h}`} className={`sp-${kind}`} aria-hidden="true">
      <g className="sp-all">
        <text className="sp-n" x={L.label[0]} y={L.label[1]} data-count="all">{TOTAL}</text>
        <text className="sp-l" x={L.label[0]} y={L.label[1] + 24}>kinderen gesponsord</text>
      </g>
      <g className="sp-grp" data-group="gov">
        <text className="sp-n" x={L.govLbl[0]} y={L.govLbl[1]} data-count="gov">{GOV}</text>
        <text className="sp-l" x={L.govLbl[0]} y={L.govLbl[1] + 24}>op overheidsscholen · €40 per jaar</text>
      </g>
      <g className="sp-grp" data-group="kemps">
        <text className="sp-n sp-nk" x={L.kempsLbl[0]} y={L.kempsLbl[1]} data-count="kemps">{KEMPS}</text>
        <text className="sp-l" x={L.kempsLbl[0]} y={L.kempsLbl[1] + 24}>op KEMPS · €350 per jaar</text>
      </g>
      {kind === 'wide' ? (
        <text className="sp-sum" x={L.sum[0]} y={L.sum[1]}>Samen {TOTAL} kinderen naar school in schooljaar 2025</text>
      ) : (
        <text className="sp-sum" x={L.sum[0]} y={L.sum[1]}>
          Samen {TOTAL} kinderen naar school
          <tspan x={L.sum[0]} dy="22">in schooljaar 2025</tspan>
        </text>
      )}
      {dots.map((d, i) => (
        <circle
          key={i}
          r="5.5"
          className={`sp-dot ${d.isK ? 'sp-k' : ''}`}
          style={{ '--fx': d.from[0], '--fy': d.from[1], '--tx': d.to[0], '--ty': d.to[1], '--p': d.pop, '--d': d.move } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

export default function SponsoredSplit() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const counts = (k: string) => [...root.querySelectorAll<SVGTextElement>(`[data-count="${k}"]`)];
    const groups = (k: string) => [...root.querySelectorAll<SVGGElement>(`[data-group="${k}"]`)];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('in', 'split', 'done');
      groups('gov').concat(groups('kemps')).forEach((g) => g.classList.add('on'));
      return;
    }
    const D = PLANS.wide; // tellers volgen dezelfde timing in beide weergaven
    const popT = D.map((d) => d.pop + 0.25).sort((a, b) => a - b);
    const arrive = (k: boolean) => D.filter((d) => d.isK === k).map((d) => d.move + MOVE * 0.8).sort((a, b) => a - b);
    const govT = arrive(false), kempsT = arrive(true);
    const upTo = (ts: number[], t: number) => { let n = 0; while (n < ts.length && ts[n] <= t) n++; return n; };
    const set = (k: string, v: number) => counts(k).forEach((e) => { e.textContent = String(v); });
    set('all', 0); set('gov', 0); set('kemps', 0);

    let raf = 0, t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const s = (t - t0) / 1000;
      set('all', upTo(popT, s));
      const g = upTo(govT, s), k = upTo(kempsT, s);
      set('gov', g); set('kemps', k);
      if (g) groups('gov').forEach((e) => e.classList.add('on'));
      if (k) groups('kemps').forEach((e) => e.classList.add('on'));
      if (s >= SPLIT) root.classList.add('split');
      if (g === GOV && k === KEMPS) { root.classList.add('done'); return; }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      root.classList.add('in');
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(root);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="sp">
      <Split L={WIDE} kind="wide" />
      <Split L={NARROW} kind="narrow" />
      <p className="sr-only">
        In schooljaar 2025 sponsorde Shoma {TOTAL} kinderen: {GOV} op reguliere overheidsscholen (€40 per kind per jaar)
        en {KEMPS} op de KEMPS-school, van Nursery tot en met Klas 7 (€350 per kind per jaar).
      </p>
    </div>
  );
}
