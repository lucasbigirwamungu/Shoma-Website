'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowRight, Building2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Backlight } from '@/components/ui/backlight';

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-shoma-teal-dark">
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="max-w-2xl">
          {/* ANBI badge */}
          <div className="inline-flex items-center gap-2 bg-shoma-teal border border-shoma-teal-light rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-shoma-terracotta-light animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              ANBI erkend · Onbezoldigd bestuur · Opgericht 2005
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
            aan kansen voor kinderen in Rubya, Tanzania: door onderwijs, infrastructuur en
            gemeenschapsprojecten. Elke euro gaat rechtstreeks naar een kind.
          </p>

          {/* Impact anchor: €40 = 1 jaar school */}
          <div className="mt-6 inline-flex items-center gap-3 bg-shoma-teal rounded-2xl px-5 py-3 border border-shoma-teal-light">
            <div className="text-2xl font-bold text-shoma-terracotta-light">€40</div>
            <div className="text-white/80 text-sm leading-tight">
              <span className="font-semibold text-white">= 1 jaar school</span>
              <br />voor een kansarm kind
            </div>
          </div>

          {/* Dual CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <motion.div
              className="relative"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={
                reducedMotion
                  ? { duration: 0.3 }
                  : { type: 'spring', stiffness: 260, damping: 20, delay: 0.6 }
              }
            >
              {!reducedMotion && (
                <Backlight
                  blur={28}
                  className="pointer-events-none absolute -inset-5 -z-10 opacity-70"
                >
                  <div className="h-full w-full rounded-2xl bg-shoma-terracotta" />
                </Backlight>
              )}
              <Link
                href="/doneren"
                className="relative inline-flex items-center justify-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Heart className="w-5 h-5" aria-hidden="true" />
                Doneer direct
              </Link>
            </motion.div>
            <Link
              href="/voor-bedrijven"
              className="inline-flex items-center justify-center gap-2 bg-shoma-teal hover:bg-shoma-teal-light text-white border border-shoma-teal-light px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              <Building2 className="w-5 h-5" aria-hidden="true" />
              Zakelijk partner worden
              <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Foto: naast de tekst op desktop, eronder op mobiel; geen overlay */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/images/hero-kemps.jpg"
            alt="Leerlingen en team van KEMPS voor het schoolgebouw in Rubya, Tanzania"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs uppercase tracking-widest">Ontdek meer</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full animate-scroll-hint motion-reduce:animate-none" />
      </div>
    </section>
  );
}
