'use client';

/**
 * "Hoe werkt het?" als slingerende weg (naar roadDiagram van Vrienden van Rubya):
 * een bolletje reist over de route, de weg tekent zich achter hem en elke halte
 * verschijnt pas als het bolletje er bijna is.
 * Op mobiel een genummerde lijst.
 */

import { useId } from 'react';
import { useTravelReveal } from '@/components/ui/use-travel-reveal';

export interface RoadStep {
  title: string;
  lines: string[]; // tekstregels in de SVG
  desc: string;    // volledige zin voor de mobiele lijst
}

const SEGS = [
  [[30, 330], [230, 330], [220, 120], [420, 120]],
  [[420, 120], [620, 120], [560, 320], [760, 320]],
  [[760, 320], [940, 320], [900, 100], [1070, 90]],
];
const D = 'M30 330C230 330 220 120 420 120S560 320 760 320S900 100 1070 90';
const bez = (p: number[][], t: number) => {
  const u = 1 - t;
  return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]);
};
const at = (u: number) => { const s = Math.min(2, Math.floor(u * 3)); return bez(SEGS[s], u * 3 - s); };
const US = [0.06, 0.33, 0.62, 0.93];
const UP = [false, true, false, true];

export default function HowItWorksRoad({ steps }: { steps: RoadStep[] }) {
  const ref = useTravelReveal<HTMLDivElement>(10000, 0.05);
  const mask = `road-trail${useId().replace(/:/g, '')}`;

  return (
    <div ref={ref} className="road">
      <svg viewBox="0 0 1100 460" role="img" aria-label={`Hoe werkt het, in vier stappen: ${steps.map((s) => s.title).join(', ')}`}>
        <defs>
          <mask id={mask} maskUnits="userSpaceOnUse">
            <path className="trail" pathLength={1} d={D} />
          </mask>
        </defs>
        <path className="base" d={D} />
        <path className="draw" d={D} mask={`url(#${mask})`} />
        <path data-route d={D} fill="none" />
        {steps.map((s, i) => {
          const [x, y] = at(US[i]);
          const ty = UP[i] ? y - 78 : y + 62;
          return (
            <g key={s.title} className="st" data-stop data-x={x} data-y={y}>
              <circle className="o" cx={x} cy={y} r="26" />
              <text className="n" x={x} y={y + 8}>{i + 1}</text>
              <text className="h" x={x} y={ty} textAnchor="middle">{s.title}</text>
              {s.lines.map((l, j) => (
                <text key={l} className="p" x={x} y={ty + 22 + j * 19} textAnchor="middle">{l}</text>
              ))}
            </g>
          );
        })}
        <circle className="travel" data-traveller r="9" cx={30} cy={330} />
      </svg>

      <ol className="flow-steps road-list">
        {steps.map((s, i) => (
          <li key={s.title}>
            <b>{i + 1}</b>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
