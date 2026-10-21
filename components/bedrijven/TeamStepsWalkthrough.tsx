'use client';

/**
 * "Hoe het werkt" als auto-play walkthrough: links de stappen met een voortgangsbalk,
 * rechts een klein scherm dat per stap een eigen micro-animatie speelt.
 * Start zodra het in beeld komt, pauzeert bij hover/focus, klikken kiest een stap.
 * Bij prefers-reduced-motion geen autoplay.
 */

import { useEffect, useRef, useState } from 'react';
import { BadgeCheck, Check, Send } from 'lucide-react';

const STEPS = [
  { title: 'Maak team-account', desc: 'Registreer uw bedrijf, voeg een beheerder toe, kies uw CO₂-scope (kantoor/reizen/custom).' },
  { title: 'Nodig team uit', desc: 'Stuur uitnodigingslinks naar medewerkers. Zij vullen voetafdruk in, zien bomen-impact.' },
  { title: 'Monitor in real-time', desc: 'Beheerders zien live-dashboard: hoeveel CO₂ gecompenseerd, hoeveel bomen, schoolbijdrage.' },
  { title: 'Ontvang rapportage', desc: "Maandelijks rapport met details, foto's van bomen in Tanzania, schoolupdates. Jaarlijks ESG-certificaat." },
];
const STEP_MS = 4800;

function SceneAccount() {
  return (
    <div className="ws-scene">
      <p className="ws-label">Bedrijfsnaam</p>
      <div className="ws-field"><span className="ws-type">Uw bedrijf B.V.</span></div>
      <p className="ws-label mt-4">CO₂-scope</p>
      <div className="flex gap-2">
        {['Kantoor', 'Reizen', 'Custom'].map((c, i) => (
          <span key={c} className={`ws-chip ${i === 1 ? 'pick' : ''}`} style={{ '--d': 0.2 + i * 0.12 } as React.CSSProperties}>{c}</span>
        ))}
      </div>
    </div>
  );
}

function SceneInvite() {
  return (
    <div className="ws-scene">
      <div className="ws-avatars">
        {['AK', 'MV', 'JB', 'SD', 'LT', 'RN'].map((n, i) => (
          <span key={n} style={{ '--d': 0.15 + i * 0.12 } as React.CSSProperties}>{n}</span>
        ))}
      </div>
      <div className="ws-sent"><Send className="w-4 h-4" aria-hidden="true" /> 6 uitnodigingen verstuurd <Check className="w-4 h-4" aria-hidden="true" /></div>
    </div>
  );
}

function SceneMonitor() {
  return (
    <div className="ws-scene">
      <div className="grid grid-cols-2 gap-3">
        <div className="ws-kpi"><span className="ws-kpi-l">CO₂ gecompenseerd</span><span className="ws-bar"><i style={{ '--w': '72%' } as React.CSSProperties} /></span></div>
        <div className="ws-kpi"><span className="ws-kpi-l">Bomen geplant</span><span className="ws-bar"><i style={{ '--w': '54%', '--d': 0.25 } as React.CSSProperties} /></span></div>
      </div>
      <svg className="ws-spark" viewBox="0 0 300 70" aria-hidden="true">
        <path pathLength={1} d="M4 62C40 58 52 50 80 46S120 40 140 32 180 30 205 20 255 14 296 6" />
      </svg>
    </div>
  );
}

function SceneReport() {
  return (
    <div className="ws-scene ws-report">
      <div className="ws-doc">
        <i style={{ width: '62%' }} /><i /><i style={{ width: '84%' }} /><i style={{ width: '70%' }} />
        <div className="ws-photos"><b /><b /><b /></div>
      </div>
      <div className="ws-seal"><BadgeCheck className="w-6 h-6" aria-hidden="true" /><span>ESG</span></div>
    </div>
  );
}

const SCENES = [SceneAccount, SceneInvite, SceneMonitor, SceneReport];

export default function TeamStepsWalkthrough() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  // start pas wanneer het in beeld komt
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, playing, paused]);

  const Scene = SCENES[active];
  const running = playing && !paused;

  return (
    <div
      ref={ref}
      className="ws grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 md:gap-12 items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ol className="space-y-2">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              className={`ws-step ${i === active ? 'on' : ''} ${i < active ? 'done' : ''}`}
              aria-current={i === active ? 'step' : undefined}
              onClick={() => setActive(i)}
            >
              <span className="ws-num">{i < active ? <Check className="w-4 h-4" aria-hidden="true" /> : i + 1}</span>
              <span className="flex-1 text-left">
                <span className="block text-lg font-bold text-shoma-slate">{s.title}</span>
                <span className="ws-desc">{s.desc}</span>
                <span className="ws-prog" aria-hidden="true">
                  <i key={`${active}-${running}`} className={i === active && running ? 'run' : ''} style={{ animationDuration: `${STEP_MS}ms` }} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="ws-screen" aria-hidden="true">
        <div className="ws-top"><i /><i /><i /><span>Teamdashboard</span><em>voorbeeld</em></div>
        <Scene key={active} />
      </div>
    </div>
  );
}
