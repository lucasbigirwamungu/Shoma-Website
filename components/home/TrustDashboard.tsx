import TrustCardStack from '@/components/home/TrustCardStack';
import { AnimatedSection } from '@/components/ui/animated-section';

export default function TrustDashboard() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection as="div" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-shoma-slate">
            Transparantie is onze sterkste garantie
          </h2>
          <p className="mt-3 text-shoma-slate/75 max-w-xl mx-auto">
            Al meer dan 20 jaar bewijzen we dat elke euro telt. Bekijk de getekende
            jaarrekeningen van 2012 tot 2025 op onze transparantiepagina.
          </p>
        </AnimatedSection>

        {/* Trust metrics as an interactive card stack */}
        <TrustCardStack />

        {/* ANBI download link */}
        <div className="mt-8 text-center">
          <a
            href="/over-ons#jaarrekeningen"
            className="inline-flex items-center gap-2 text-sm text-shoma-teal hover:text-shoma-teal-dark font-medium underline-offset-2 hover:underline transition-colors"
          >
            Bekijk alle jaarrekeningen (2012-2025) →
          </a>
        </div>
      </div>
    </section>
  );
}
