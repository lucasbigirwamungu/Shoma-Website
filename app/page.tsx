import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import TrustDashboard from '@/components/home/TrustDashboard';
import ImpactGrid from '@/components/home/ImpactGrid';
import ImpactCalculatorSection from '@/components/home/ImpactCalculatorSection';
import { AnimatedSection } from '@/components/ui/animated-section';
import Link from 'next/link';

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
      <AnimatedSection as="section" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImpactCalculatorSection />
        </div>
      </AnimatedSection>

      {/* 5. Nieuwsbrief CTA strip */}
      <AnimatedSection as="section" className="bg-shoma-clay py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="mb-3 text-2xl sm:text-3xl font-bold text-shoma-slate">Blijf op de hoogte</h2>
          <p className="text-shoma-slate/80 mb-6">
            Maximaal 4 nieuwsbrieven per jaar met fotoreportages en voortgangsupdates
            rechtstreeks vanuit Rubya.
          </p>
          <Link
            href="/doneren"
            className="inline-flex items-center gap-2 bg-shoma-teal hover:bg-shoma-teal-dark text-white px-7 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md active:translate-y-px"
          >
            Aanmelden via donatiepagina
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
