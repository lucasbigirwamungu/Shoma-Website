'use client';

/**
 * Kringloop Compenseer & Leer: één bolletje tekent de cirkel met de klok mee en elke
 * halte verschijnt pas als het bolletje er bijna is. Na de eerste ronde verschijnt
 * "CO₂ wordt onderwijs" in het midden en blijft het bolletje rustig rondgaan.
 */

import { BarChart3, GraduationCap, Sprout, Users, type LucideIcon } from 'lucide-react';
import { useTravelReveal } from '@/components/ui/use-travel-reveal';

const CX = 230, CY = 172, R = 100;
// cirkel als pad, start bovenaan, met de klok mee
const CIRCLE = `M${CX} ${CY - R}A${R} ${R} 0 1 1 ${CX} ${CY + R}A${R} ${R} 0 1 1 ${CX} ${CY - R}`;
const NODES: [number, number, string, string, LucideIcon][] = [
  [CX, CY - R, 'Uw team', 'compenseert CO₂', Users],
  [CX + R, CY, 'Bomen', 'in schooltuinen', Sprout],
  [CX, CY + R, 'Onderwijs', 'in Rubya', GraduationCap],
  [CX - R, CY, 'Rapportage', 'en certificaat', BarChart3],
];

// labelpositie t.o.v. de halte: boven, rechts, onder, links
const LBL: [number, number, 'start' | 'middle' | 'end'][] = [
  [0, -46, 'middle'], [32, -3, 'start'], [0, 42, 'middle'], [-32, -3, 'end'],
];

export default function CompenseerCycle() {
  const ref = useTravelReveal<HTMLDivElement>(9000, 0.06);
  return (
    <div ref={ref} className="cyc">
      <svg viewBox="0 0 460 345" role="img" aria-label="Kringloop: uw team compenseert CO₂, er worden bomen geplant in schooltuinen in Rubya, dat steunt onderwijs, en u ontvangt rapportage en een certificaat.">
        <path className="cyc-arc" pathLength={1} d={CIRCLE} />
        <path data-route d={CIRCLE} fill="none" />
        {/* kleine pijlpunten tussen de haltes */}
        {[45, 135, 225, 315].map((a, i) => {
          const rad = ((a - 90) * Math.PI) / 180;
          const x = CX + R * Math.cos(rad), y = CY + R * Math.sin(rad);
          return (
            <path key={a} className="cyc-chev" data-stop data-x={x} data-y={y}
              d="M-5 -6L3 0L-5 6" transform={`translate(${x} ${y}) rotate(${a})`} />
          );
        })}
        <text className="cyc-mid" x={CX} y={CY - 4} textAnchor="middle">CO₂</text>
        <text className="cyc-mid2" x={CX} y={CY + 18} textAnchor="middle">wordt onderwijs</text>
        {NODES.map(([x, y, t, s, Icon], i) => (
          <g key={t} className="cyc-node" data-stop data-x={x} data-y={y}>
            <circle cx={x} cy={y} r="24" />
            <Icon className="cyc-ic" x={x - 11} y={y - 11} width={22} height={22} />
            <text className="cyc-t" x={LBL[i][0] + x} y={LBL[i][1] + y} textAnchor={LBL[i][2]}>{t}</text>
            <text className="cyc-s" x={LBL[i][0] + x} y={LBL[i][1] + y + 16} textAnchor={LBL[i][2]}>{s}</text>
          </g>
        ))}
        <circle className="cyc-travel" data-traveller r="6" cx={CX} cy={CY - R} />
      </svg>
    </div>
  );
}
