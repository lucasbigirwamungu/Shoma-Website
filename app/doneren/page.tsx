import type { Metadata } from 'next';
import DonationForm from '@/components/donation/DonationForm';
import ImpactCalculator from '@/components/donation/ImpactCalculator';
import { ShieldCheck, BadgeCheck, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Doneren',
  description:
    'Doneer direct aan Stichting Shoma via iDEAL, Apple Pay of creditcard. ANBI erkend, onbezoldigd bestuur en volledige transparantie.',
};

const trustSignals = [
  {
    icon: ShieldCheck,
    title: 'Onbezoldigd bestuur',
    body: 'Alle bestuurders werken onbezoldigd. De jaarrekeningen staan openbaar op onze transparantiepagina.',
  },
  {
    icon: BadgeCheck,
    title: 'ANBI erkend',
    body: 'Uw donatie is fiscaal aftrekbaar. Automatisch kwitantie per e-mail na betaling.',
  },
  {
    icon: Users,
    title: '210 kinderen gesponsord',
    body: 'In schooljaar 2025 ondersteunden wij 210 kinderen in Rubya, Tanzania.',
  },
];

export default function DonatiePage() {
  return (
    <div className="min-h-screen bg-shoma-sand">
      {/* Page header */}
      <div className="bg-shoma-teal-dark text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Uw donatie. Direct naar Rubya.
            </h1>
            <p className="mt-4 text-white/80 text-lg leading-relaxed">
              Geen tussenpersonen. Uw donatie wordt in Rubya omgezet in onderwijs, schoon water of energie voor kinderen in Tanzania.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Trust signals + calculator */}
          <div className="space-y-8">
            {/* Trust signals */}
            <div className="divide-y divide-shoma-teal/10 rounded-2xl border border-shoma-teal/10 bg-white">
              {trustSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div key={signal.title} className="flex gap-4 p-5">
                    <div className="w-10 h-10 bg-shoma-teal/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-shoma-teal" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-shoma-slate">{signal.title}</h2>
                      <p className="text-sm text-shoma-slate/75 mt-0.5 leading-relaxed">{signal.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Impact calculator */}
            <ImpactCalculator initialAmount={40} className="w-full" />

            {/* Handmatig doneren fallback */}
            <div className="bg-white rounded-2xl p-5 border border-shoma-teal/10 text-sm text-shoma-slate/75">
              <p className="font-medium text-shoma-slate mb-1.5">Liever een bankoverschrijving?</p>
              <p>
                IBAN: <strong className="text-shoma-slate font-mono">NL55 ABNA 0501 3541 58</strong>
              </p>
              <p className="mt-0.5">
                T.n.v.: <strong className="text-shoma-slate">Stichting Shoma</strong>
              </p>
              <p className="mt-2 text-xs">
                Vermeld uw naam en &ldquo;donatie&rdquo; als omschrijving voor een automatische kwitantie.
              </p>
            </div>
          </div>

          {/* Right: Donation form */}
          <div className="order-first lg:order-none lg:sticky lg:top-24">
            <DonationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
