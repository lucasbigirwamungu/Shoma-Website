import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowRight, Building2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=85"
          alt="Kinderen op school in Tanzania"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay: teal-dark links → transparant rechts */}
        <div className="absolute inset-0 bg-gradient-to-r from-shoma-teal-dark/90 via-shoma-teal-dark/70 to-shoma-teal/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* ANBI badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-shoma-terracotta-light animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              ANBI erkend · 0% overhead · Opgericht 2005
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Geef een kind in Rubya
            <span className="block text-shoma-terracotta-light mt-1">
              een toekomst.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">
            <em>Shoma</em> betekent &ldquo;onderwijs&rdquo; in het Kihaya. Sinds 2005 bouwen wij
            aan kansen voor kinderen in Rubya, Tanzania — door onderwijs, infrastructuur en
            gemeenschapsprojecten. Elke euro gaat rechtstreeks naar een kind.
          </p>

          {/* Impact anchor: €40 = 1 jaar school */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
            <div className="text-2xl font-bold text-shoma-terracotta-light">€40</div>
            <div className="text-white/80 text-sm leading-tight">
              <span className="font-semibold text-white">= 1 jaar school</span>
              <br />voor een kansarm kind
            </div>
          </div>

          {/* Dual CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/doneren"
              className="inline-flex items-center justify-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Heart className="w-5 h-5" aria-hidden="true" />
              Doneer direct
            </Link>
            <Link
              href="/voor-bedrijven"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              <Building2 className="w-5 h-5" aria-hidden="true" />
              Zakelijk partner worden
              <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs uppercase tracking-widest">Ontdek meer</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full" />
      </div>
    </section>
  );
}
