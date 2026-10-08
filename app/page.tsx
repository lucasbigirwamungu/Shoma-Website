import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import TrustDashboard from '@/components/home/TrustDashboard';
import ImpactGrid from '@/components/home/ImpactGrid';
import ImpactCalculatorSection from '@/components/home/ImpactCalculatorSection';
import { AnimatedSection } from '@/components/ui/animated-section';
import { MorphingText } from '@/components/ui/morphing-text';
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
      <AnimatedSection as="section" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImpactCalculatorSection />
        </div>
      </AnimatedSection>

      {/* 5. Nieuwsbrief CTA strip */}
      <AnimatedSection as="section" className="bg-shoma-clay py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <MorphingText
            texts={['Blijf op de hoogte.', 'Mis geen update.', 'Volg ons verhaal.']}
            className="mb-3 h-9 text-2xl text-shoma-slate md:h-9 lg:text-2xl"
          />
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
      </AnimatedSection>
    </>
  );
}
