'use client';

/**
 * Geldstroom als zichzelf tekenend diagram (naar het plan-diagram van Vrienden van Rubya):
 * U -> Stichting Shoma -> lokaal team in Rubya -> vier projecten. Lijnen tekenen zich,
 * knooppunten verschijnen gestaffeld zodra het in beeld komt. Op mobiel een stappenlijst.
 */

import Link from 'next/link';
import { useInViewClass } from '@/components/ui/use-in-view-class';
import { Droplets, GraduationCap, Heart, School, Sun, Users, MapPin, type LucideIcon } from 'lucide-react';

const YS = [70, 190, 310, 430];
const PILLS: [string, string, LucideIcon][] = [
  ['Schoolgeld', 'Overheidsscholen in Rubya', GraduationCap],
  ['KEMPS', 'Engelstalige basisschool', School],
  ['Drinkwater', 'Bron en opslag bij school', Droplets],
  ['Solar & moestuin', 'Lagere kosten voor school', Sun],
];
const STEPS = [
  ['U geeft', 'Eenmalig of periodiek, vanaf elk bedrag.'],
  ['Stichting Shoma', 'Een onbezoldigd bestuur van vrijwilligers in Nederland.'],
  ['Lokaal team Rubya', 'Vrijwilligers ter plaatse zorgen dat het geld bij de kinderen komt.'],
  ['Vier projecten', 'Schoolgeld · KEMPS · drinkwater · solar en moestuin'],
];

export default function GiftFlowDiagram() {
  const ref = useInViewClass<HTMLDivElement>();

  return (
    <div ref={ref} className="flow">
      <svg viewBox="0 0 1180 500" role="img" aria-label="U geeft aan Stichting Shoma, de stichting steunt het lokale team in Rubya, dat het geld inzet voor vier projecten.">
        <path className="route" pathLength={1} style={{ '--d': 0.5 } as React.CSSProperties} d="M190 250H290" />
        <path className="route" pathLength={1} style={{ '--d': 1.3 } as React.CSSProperties} d="M500 250H600" />
        {YS.map((y, i) => (
          <path key={y} className="route" pathLength={1} style={{ '--d': 2.1 + i * 0.15 } as React.CSSProperties} d={`M810 250C860 250 860 ${y} 910 ${y}`} />
        ))}
        <text className="tag" x="240" y="232" textAnchor="middle">uw gift</text>
        <text className="tag" x="550" y="232" textAnchor="middle">Tanzania</text>

        <g className="node" style={{ '--d': 0 } as React.CSSProperties}>
          <rect x="0" y="195" width="190" height="110" rx="55" />
          <Heart className="ic" x={83} y={210} width={26} height={26} />
          <text className="t1" x="95" y="268" textAnchor="middle">U</text>
          <text className="t2" x="95" y="288" textAnchor="middle">Donateur</text>
        </g>
        <g className="node solid" style={{ '--d': 0.8 } as React.CSSProperties}>
          <rect x="290" y="185" width="210" height="130" rx="65" />
          <Users className="ic" x={380} y={200} width={30} height={30} />
          <text className="t1" x="395" y="262" textAnchor="middle">Stichting Shoma</text>
          <text className="t2" x="395" y="283" textAnchor="middle">onbezoldigd bestuur</text>
        </g>
        <g className="node" style={{ '--d': 1.6 } as React.CSSProperties}>
          <rect x="600" y="185" width="210" height="130" rx="65" />
          <MapPin className="ic" x={690} y={200} width={30} height={30} />
          <text className="t1" x="705" y="262" textAnchor="middle">Lokaal team</text>
          <text className="t2" x="705" y="283" textAnchor="middle">Rubya, Tanzania</text>
        </g>
        {PILLS.map(([t, s, Icon], i) => (
          <a key={t} href="/projecten">
            <g className="node" style={{ '--d': 2.5 + i * 0.15 } as React.CSSProperties}>
              <rect x="910" y={YS[i] - 38} width="270" height="76" rx="38" />
              <Icon className="ic" x={932} y={YS[i] - 13} width={26} height={26} />
              <text className="t1" x="976" y={YS[i] - 2}>{t}</text>
              <text className="t2" x="976" y={YS[i] + 18}>{s}</text>
            </g>
          </a>
        ))}
      </svg>

      <ol className="flow-steps">
        {STEPS.map(([h, p], i) => (
          <li key={h}>
            <b>{i + 1}</b>
            <div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 text-center">
        <Link href="/projecten" className="inline-flex items-center gap-2 text-sm text-shoma-teal hover:text-shoma-teal-dark font-medium underline-offset-2 hover:underline">
          Bekijk alle projecten
        </Link>
      </div>
    </div>
  );
}
