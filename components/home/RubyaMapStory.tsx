'use client';

/**
 * Scroll-kaartverhaal: Afrika -> Tanzania -> Rubya (overgenomen van Vrienden van Rubya).
 * Scrollen TRIGGERT alleen een tijdgestuurde autoplay (heen 6,2 s); pas na dieper
 * doorscrollen en weer omhoog speelt hij omgekeerd af (3,6 s, uitzoomen).
 * Inline SVG wordt in de effect gebouwd uit lib/rubya-map-data (lazy geladen).
 */

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const NS = 'http://www.w3.org/2000/svg';
const RUBYA: [number, number] = [31.618, -1.752];

export default function RubyaMapStory() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    let cancelled = false;
    let cleanup = () => {};

    Promise.all([import('@/lib/rubya-map-data'), import('@/lib/rubya-map-detail')]).then(([{ MAP }, DETAIL]) => {
      if (cancelled) return;
      const stage = sec.querySelector<HTMLElement>('.map-stage')!;
      const svg = sec.querySelector<SVGSVGElement>('svg')!;
      const hint = sec.querySelector<HTMLElement>('.map-hint');
      const steps = [...sec.querySelectorAll<HTMLElement>('.mc-step')];
      const dots = [...sec.querySelectorAll<HTMLElement>('.mc-dots i')];
      const el = (n: string, a: Record<string, string | number> = {}, p?: Element) => {
        const e = document.createElementNS(NS, n) as SVGElement;
        for (const k in a) e.setAttribute(k, String(a[k]));
        p?.appendChild(e);
        return e;
      };
      const X = (lon: number) => lon * 100;
      const Y = (lat: number) => -lat * 100;

      /* wereld */
      const defs = el('defs', {}, svg);
      const g = el('radialGradient', { id: 'rubya-glow' }, defs);
      el('stop', { offset: '0', 'stop-color': '#a16b14', 'stop-opacity': '.4' }, g);
      el('stop', { offset: '1', 'stop-color': '#a16b14', 'stop-opacity': '0' }, g);
      const land = el('g', {}, svg);
      Object.entries(MAP).forEach(([k, v]) => el('path', { d: v.d, class: k === 'TZA' ? 'm-tz' : 'm-land' }, land));
      /* detail rond Rubya: wegen en rivieren verschijnen pas bij het inzoomen */
      const detail = el('g', { class: 'm-detail' }, svg);
      el('path', { d: DETAIL.ROADS_MINOR, class: 'm-road m-road-s' }, detail);
      el('path', { d: DETAIL.ROADS_MAJOR, class: 'm-road' }, detail);
      el('path', { d: DETAIL.RIVERS, class: 'm-river' }, detail);
      /* Victoriameer en Kivumeer met echte oevers (Natural Earth) */
      el('path', { d: DETAIL.LAKES, class: 'm-lake' }, svg);

      /* labels: [lon,lat,tekst,class,px,zichtbaarheid(vh)->0..1,stip,links van de stip] */
      const sm = (a: number, b: number, v: number) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
      type LabelDef = [number, number, string, string, number, (vh: number) => number, number?, number?];
      const near = (vh: number) => 1 - sm(450, 900, vh);
      const defsL: LabelDef[] = [
        [15, 18, 'Afrika', 'm-lbl', 30, vh => sm(2600, 4200, vh)],
        [34.6, -6.2, 'Tanzania', 'm-lbl', 17, vh => sm(500, 900, vh) * (1 - sm(2500, 4200, vh))],
        [33.0, -1.0, 'Victoriameer', 'm-lbl', 13, vh => sm(650, 950, vh) * (1 - sm(1100, 1500, vh))],
        [39.28, -6.79, 'Dar es Salaam', 'm-city', 13, vh => sm(500, 800, vh) * (1 - sm(1800, 2400, vh)), 1],
        [35.74, -6.17, 'Dodoma', 'm-city', 13, vh => sm(500, 800, vh) * (1 - sm(1800, 2400, vh)), 1],
        [32.9, -2.52, 'Mwanza', 'm-city', 13, vh => sm(150, 500, vh) * (1 - sm(1800, 2400, vh)), 1],
        [32.58, .35, 'Kampala', 'm-city', 13, vh => sm(150, 500, vh) * (1 - sm(1800, 2400, vh)), 1],
        [31.8, -1.32, 'Bukoba', 'm-city', 13, near, 1],
        [31.654, -1.84, 'Muleba', 'm-city', 12, near, 1, 1],
        [31.31, -2.63, 'Biharamulo', 'm-city', 12, near, 1],
        [30.65, -2.47, 'Ngara', 'm-city', 12, near, 1],
        [31.73, -0.33, 'Masaka', 'm-city', 12, near, 1],
        [31.12, -1.1, 'Kagera', 'm-water', 12, near],
        [32.45, -1.55, 'Victoriameer', 'm-water', 13, near],
      ];
      const labels = defsL.map(([lo, la, t, c, px, vis, dt, left]) => {
        const e = el('text', { class: c }, svg);
        e.textContent = t;
        return { e, lo, la, px, vis, left: !!left, dot: dt ? el('circle', { class: 'm-dot' }, svg) : null };
      });
      const pin = el('g', {}, svg);
      const glow = el('circle', { class: 'm-glow', fill: 'url(#rubya-glow)' }, pin);
      const rings = ['', 'r2', 'r3'].map(c => el('circle', { class: 'm-ring ' + c }, pin));
      const dot = el('circle', { class: 'm-pin', stroke: '#fff', 'stroke-width': 2.5, 'vector-effect': 'non-scaling-stroke' }, pin);
      const ptxt = el('text', { class: 'm-city', style: 'font-weight:800;fill:#4a3010' }, pin);
      ptxt.textContent = 'Rubya';

      /* camera */
      const ease = (t: number) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      type Cam = { x: number; y: number; vh: number; mw?: number };
      const K: Cam[] = [
        { x: X(17), y: Y(2), vh: 7700, mw: 7500 },
        { x: X(34.9), y: Y(-6.3), vh: 1250, mw: 1250 },
        { x: X(RUBYA[0]), y: Y(RUBYA[1]) + 8, vh: 300, mw: 430 },
      ];
      let W = 1, H = 1;
      const size = () => { W = stage.clientWidth; H = stage.clientHeight; };
      function render(p: number) {
        const s1 = ease(seg(p, .04, .5)), s2 = ease(seg(p, .52, .96));
        const [A, B, C] = K.map(c => ({ ...c, vh: Math.max(c.vh, c.mw! * H / W) }));
        const mix = (a: Cam, b: Cam, t: number): Cam => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), vh: Math.exp(lerp(Math.log(a.vh), Math.log(b.vh), t)) });
        const c = mix(mix(A, B, s1), C, s2), wide = W > 820, fx = wide ? .66 : .5, fy = wide ? .5 : .32;
        const vw = c.vh * W / H;
        svg.setAttribute('viewBox', `${c.x - vw * fx} ${c.y - c.vh * fy} ${vw} ${c.vh}`);
        const k = c.vh / H;
        detail.style.opacity = String(1 - sm(700, 1500, c.vh));
        labels.forEach(l => {
          const o = l.vis(c.vh);
          l.e.setAttribute('x', String(X(l.lo)));
          l.e.setAttribute('y', String(Y(l.la) + (l.dot ? -l.px * .7 * k : 0)));
          l.e.style.fontSize = l.px * k + 'px';
          l.e.style.opacity = String(o);
          if (l.dot) {
            l.e.setAttribute('x', String(X(l.lo) + l.px * (l.left ? -.6 : .6) * k));
            l.e.style.textAnchor = l.left ? 'end' : 'start';
            l.dot.setAttribute('cx', String(X(l.lo)));
            l.dot.setAttribute('cy', String(Y(l.la)));
            l.dot.setAttribute('r', String(3.5 * k));
            l.dot.style.opacity = String(o);
          } else l.e.style.letterSpacing = (l.px > 20 ? .4 : .14) + 'em';
        });
        pin.setAttribute('transform', `translate(${X(RUBYA[0])} ${Y(RUBYA[1])})`);
        glow.setAttribute('r', String(90 * k));
        rings.forEach(r => r.setAttribute('r', String(10 * k)));
        dot.setAttribute('r', String(Math.max(5, 7 * (1 - .35 * seg(p, 0, .6))) * k));
        ptxt.setAttribute('x', String(16 * k));
        ptxt.setAttribute('y', String(5 * k));
        ptxt.style.fontSize = 14 * k + 'px';
        ptxt.style.opacity = String(sm(.55, .8, p));
        const st = p < .3 ? 0 : p < .82 ? 1 : 2;
        steps.forEach((e, i) => e.classList.toggle('on', i === st));
        dots.forEach((e, i) => e.classList.toggle('on', i <= st));
      }

      /* trigger-engine: 0 = Afrika, 1 = Rubya */
      let p = 0, dir = 0, last = 0, state = 'start', armedBack = false, rearm = true, raf = 0;
      const DUR = { fwd: 6200, rev: 3600 };
      function frame(t: number) {
        const dt = Math.min(50, t - last);
        last = t;
        p = Math.min(1, Math.max(0, p + dir * dt / DUR[dir > 0 ? 'fwd' : 'rev']));
        render(p);
        if (dir > 0 && p >= 1) { dir = 0; state = 'end'; armedBack = false; }
        else if (dir < 0 && p <= 0) { dir = 0; state = 'start'; rearm = false; }
        if (dir) raf = requestAnimationFrame(frame);
      }
      const go = (dd: number) => {
        if (dir === dd) return;
        const was = dir;
        dir = dd;
        state = 'play';
        hint?.classList.add('off');
        if (!was) { last = performance.now(); raf = requestAnimationFrame(frame); }
      };
      function onScroll() {
        const r = sec!.getBoundingClientRect(), vh = innerHeight, y = -r.top; // y = px voorbij de sectietop (stage sticky zolang 0<y<travel)
        const travel = r.height - vh;
        if (y < -vh * .5) rearm = true; // sectie naar boven verlaten -> heen mag opnieuw
        if (state === 'start' && rearm && y > -vh * .12) go(1);
        if (state === 'end') {
          if (y > travel * .55) armedBack = true; // flink voorbij de eindstand gescrold
          if (armedBack && y < travel * .3) go(-1); // ...en nu weer omhoog -> uitzoomen
        }
      }
      const onResize = () => { size(); render(p); };
      size();
      addEventListener('resize', onResize);
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        p = 1; state = 'end'; render(1);
      } else {
        addEventListener('scroll', onScroll, { passive: true });
        render(0);
        onScroll();
      }
      cleanup = () => {
        cancelAnimationFrame(raf);
        removeEventListener('scroll', onScroll);
        removeEventListener('resize', onResize);
        svg.replaceChildren();
      };
    });

    return () => { cancelled = true; cleanup(); };
  }, []);

  return (
    <section ref={secRef} className="mapsec" id="rubya" aria-label="Waar ligt Rubya? Een reis van Afrika naar Rubya">
      <div className="map-stage">
        <svg preserveAspectRatio="xMidYMid meet" role="img" aria-label="Kaart die inzoomt van Afrika naar Tanzania en Rubya" />
        <div className="map-card">
          <div className="mc-steps">
            <div className="mc-step on">
              <span className="mc-eyebrow">Waar ligt Rubya?</span>
              <h2>Eerst: een heel continent.</h2>
              <p>
                Aan de oostkant van Afrika ligt Tanzania, ruim twintig keer zo groot als Nederland.
                Scholen zijn er genoeg, maar lang niet elk gezin kan de bijdragen voor gebouw,
                boeken en uniform betalen. Wij reizen mee naar één punt op die kaart.
              </p>
            </div>
            <div className="mc-step">
              <span className="mc-eyebrow">Noordwest-Tanzania</span>
              <h2>De Kagera-regio, aan het Victoriameer.</h2>
              <p>
                Aan de westkant van het grootste meer van Afrika ligt het district Muleba. Een groen
                en heuvelachtig gebied met kleine dorpen en lange zandwegen.
              </p>
            </div>
            <div className="mc-step">
              <span className="mc-eyebrow">Daar is het</span>
              <h2>Rubya.</h2>
              <p>
                Hier werd Frank Bigirwamungu geboren en hier begon Shoma in 2005. Op de
                KEMPS-basisschool krijgen kinderen Engelstalig onderwijs, met schoon drinkwater
                op het terrein.
              </p>
              <dl className="mc-facts">
                <div><dt>257</dt><dd>kinderen op KEMPS</dd></div>
                <div><dt>210</dt><dd>kinderen gesponsord</dd></div>
                <div><dt>2005</dt><dd>opgericht</dd></div>
              </dl>
              <Link
                href="/projecten"
                className="mt-6 inline-flex items-center gap-2 bg-shoma-teal hover:bg-shoma-teal-dark text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md active:translate-y-px"
              >
                Bekijk onze projecten
              </Link>
            </div>
          </div>
          <div className="mc-dots" aria-hidden="true"><i className="on" /><i /><i /></div>
        </div>
        <div className="map-hint">Scrol rustig door: de reis naar Rubya start vanzelf</div>
      </div>
    </section>
  );
}
