import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import TrustDashboard from '@/components/home/TrustDashboard';
import ImpactGrid from '@/components/home/ImpactGrid';
import PartnerSection from '@/components/home/PartnerSection';
import ImpactCalculator from '@/components/donation/ImpactCalculator';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Geef een kind in Rubya een toekomst | Stichting Shoma',
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero – dual-pathway met primaire & zakelijke CTA */}
      <HeroSection />

      {/* 2. Trust Dashboard – live counters, ANBI-bewijs */}
      <TrustDashboard />

      {/* 3. Impact grid – drie projectkaarten */}
      <ImpactGrid />

      {/* 4. Impact calculator – interactieve donatie-convertor */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Tekst */}
            <div className="lg:w-1/2">
              <p className="text-shoma-terracotta font-semibold text-sm uppercase tracking-wider mb-3">
                Uw impact in cijfers
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-shoma-slate leading-tight">
                Hoeveel impact heeft{' '}
                <span className="text-shoma-terracotta">uw</span> donatie?
              </h2>
              <p className="mt-5 text-shoma-slate/65 leading-relaxed">
                Dankzij onze volledig onbezoldigde bestuursstructuur en extern gesponsorde
                operationele kosten gaat letterlijk elke gedoneerde euro naar de kinderen in
                Rubya. Bereken hiernaast direct wat uw bijdrage concreet betekent.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { amount: '€ 40,-', effect: 'dekt 1 volledig jaar regulier onderwijs' },
                  { amount: '€ 30,-/mnd', effect: 'financiert 1 maand KEMPS-onderwijs' },
                  { amount: '€ 1,-', effect: '= 50 liter schoon drinkwater via BAENT' },
                ].map((item) => (
                  <div key={item.amount} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-shoma-terracotta shrink-0" />
                    <span className="text-sm text-shoma-slate">
                      <strong className="text-shoma-terracotta">{item.amount}</strong>{' '}
                      {item.effect}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/doneren"
                className="mt-8 inline-flex items-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-7 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
              >
                <Heart className="w-4 h-4" aria-hidden="true" />
                Doneer direct
              </Link>
            </div>

            {/* Calculator */}
            <div className="lg:w-1/2 w-full">
              <ImpactCalculator initialAmount={40} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Partner sectie – social proof + B2B tiers */}
      <PartnerSection />

      {/* 6. Nieuwsbrief CTA strip */}
      <section className="bg-shoma-sand py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-shoma-slate mb-3">
            Blijf op de hoogte van onze projecten
          </h2>
          <p className="text-shoma-slate/60 mb-6">
            Maximaal 4 nieuwsbrieven per jaar met fotoreportages en voortgangsuppdates
            rechtstreeks vanuit Rubya.
          </p>
          <Link
            href="/doneren"
            className="inline-flex items-center gap-2 bg-shoma-teal hover:bg-shoma-teal-dark text-white px-7 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
          >
            Aanmelden via donatiepagina
          </Link>
        </div>
      </section>
    </>
  );
}
