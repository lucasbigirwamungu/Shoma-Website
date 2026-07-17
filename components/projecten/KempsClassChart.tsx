// ─── KEMPS Gesponsorde Leerlingen per Klas ─────────────────────────────────
// Data gebaseerd op het schooloverzicht (schooljaar 2025)

const CLASSES = [
  { name: 'Nursery',  dutchName: 'Kleuterklas', pages: 'P1 + P2 + P3', count: 17, color: 'bg-shoma-terracotta',      textColor: 'text-shoma-terracotta-dark' },
  { name: 'Klas 1',  dutchName: 'Class 1',      pages: 'P4',           count: 4,  color: 'bg-shoma-teal-light',      textColor: 'text-shoma-teal-dark' },
  { name: 'Klas 2',  dutchName: 'Class 2',      pages: 'P5',           count: 9,  color: 'bg-shoma-teal',            textColor: 'text-shoma-teal-dark' },
  { name: 'Klas 3',  dutchName: 'Class 3',      pages: 'P6',           count: 11, color: 'bg-amber-500',             textColor: 'text-amber-800' },
  { name: 'Klas 4',  dutchName: 'Class 4',      pages: 'P7',           count: 14, color: 'bg-shoma-terracotta-dark', textColor: 'text-shoma-terracotta-dark' },
  { name: 'Klas 5',  dutchName: 'Class 5',      pages: 'P8',           count: 8,  color: 'bg-blue-500',              textColor: 'text-blue-800' },
  { name: 'Klas 6',  dutchName: 'Class 6',      pages: 'P9',           count: 6,  color: 'bg-purple-500',            textColor: 'text-purple-800' },
  { name: 'Klas 7',  dutchName: 'Class 7',      pages: 'P10',          count: 5,  color: 'bg-pink-500',              textColor: 'text-pink-800' },
];

const TOTAL = CLASSES.reduce((s, c) => s + c.count, 0);
const MAX   = Math.max(...CLASSES.map((c) => c.count));

export default function KempsClassChart() {
  return (
    <div className="bg-shoma-sand rounded-3xl p-7 border border-shoma-teal/10">
      {/* Koptekst */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold text-shoma-slate">
            Gesponsorde KEMPS-leerlingen per klas
          </h3>
          <p className="text-sm text-shoma-slate/55 mt-0.5">Schooljaar 2025 — door Shoma gesponsord</p>
        </div>
        <div className="bg-shoma-teal text-white rounded-xl px-4 py-2 text-center shrink-0">
          <span className="text-2xl font-extrabold leading-none block">{TOTAL}</span>
          <span className="text-xs opacity-80">totaal</span>
        </div>
      </div>

      {/* Staafgrafiek */}
      <div className="space-y-4">
        {CLASSES.map((cls) => {
          const pct = (cls.count / MAX) * 100;
          return (
            <div key={cls.name} className="flex items-center gap-4">
              {/* Label */}
              <div className="w-24 shrink-0 text-right">
                <p className="text-sm font-semibold text-shoma-slate">{cls.name}</p>
                <p className="text-xs text-shoma-slate/45 leading-tight">{cls.pages}</p>
              </div>

              {/* Balk + getal */}
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 bg-white rounded-full h-8 overflow-hidden shadow-inner border border-gray-100">
                  <div
                    className={`h-full ${cls.color} rounded-full flex items-center justify-end pr-3 transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  >
                    <span className="text-white text-xs font-bold whitespace-nowrap">
                      {cls.count}
                    </span>
                  </div>
                </div>
                <span className={`text-sm font-bold w-8 text-right ${cls.textColor}`}>
                  {cls.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-6 pt-5 border-t border-shoma-teal/10 flex flex-wrap gap-x-6 gap-y-2">
        {CLASSES.map((cls) => (
          <div key={cls.name} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${cls.color}`} />
            <span className="text-xs text-shoma-slate/65">
              {cls.name}: <strong className="text-shoma-slate">{cls.count}</strong>
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs font-semibold text-shoma-teal">Totaal: {TOTAL} leerlingen</span>
        </div>
      </div>

      <p className="text-xs text-shoma-slate/40 mt-4 leading-relaxed">
        * KEMPS heeft 257 leerlingen totaal (gestart in 2016 met 13 leerlingen) verdeeld over Nursery t/m Klas 7. Stichting Shoma
        sponsort {TOTAL} leerlingen voor wie de schoolkosten van €350/jaar anders onbetaalbaar zouden zijn.
      </p>
    </div>
  );
}
