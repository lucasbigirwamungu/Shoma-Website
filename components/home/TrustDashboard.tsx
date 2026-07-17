import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { ShieldCheck, Users, Droplets, BadgeCheck } from 'lucide-react';

const metrics = [
  {
    icon: ShieldCheck,
    color: 'text-shoma-teal',
    bg: 'bg-shoma-teal/10',
    value: null,
    displayValue: '0%',
    label: 'Overhead',
    sublabel: 'Bestuur werkt volledig onbezoldigd',
  },
  {
    icon: Users,
    color: 'text-shoma-terracotta',
    bg: 'bg-shoma-terracotta/10',
    value: 260,
    displayValue: null,
    label: 'Kinderen gesponsord',
    sublabel: 'Actief ondersteund in schooljaar 2025',
    animateTo: 260,
  },
  {
    icon: Droplets,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    value: 20000,
    displayValue: null,
    label: 'Liter water',
    sublabel: 'Dagelijkse opslagcapaciteit op KEMPS',
    animateTo: 20000,
    suffix: 'L',
  },
  {
    icon: BadgeCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    value: null,
    displayValue: 'ANBI',
    label: 'Erkend door Belastingdienst',
    sublabel: 'Donaties fiscaal aftrekbaar voor donateurs',
  },
];

export default function TrustDashboard() {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-shoma-slate">
            Transparantie is onze sterkste garantie
          </h2>
          <p className="mt-3 text-shoma-slate/60 max-w-xl mx-auto">
            Al meer dan 20 jaar bewijzen we dat elke euro telt. Bekijk de getekende
            jaarrekeningen van 2013 tot 2025 op onze transparantiepagina.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="relative group bg-shoma-sand rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-all duration-200 border border-transparent hover:border-shoma-teal/10"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${m.bg}`}>
                  <Icon className={`w-5 h-5 ${m.color}`} aria-hidden="true" />
                </div>

                <div className={`text-3xl font-extrabold ${m.color}`}>
                  {m.animateTo !== undefined ? (
                    <AnimatedCounter
                      to={m.animateTo}
                      suffix={m.suffix ? `+ ${m.suffix}` : '+'}
                    />
                  ) : (
                    m.displayValue
                  )}
                </div>

                <div>
                  <p className="font-semibold text-shoma-slate text-sm">{m.label}</p>
                  <p className="text-xs text-shoma-slate/55 mt-0.5 leading-snug">{m.sublabel}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ANBI download link */}
        <div className="mt-8 text-center">
          <a
            href="/over-ons#jaarrekeningen"
            className="inline-flex items-center gap-2 text-sm text-shoma-teal hover:text-shoma-teal-dark font-medium underline-offset-2 hover:underline transition-colors"
          >
            Bekijk alle jaarrekeningen (2013–2025) →
          </a>
        </div>
      </div>
    </section>
  );
}
