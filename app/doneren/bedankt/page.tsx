import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import ShareButton from '@/components/ui/ShareButton';

export const metadata: Metadata = {
  title: 'Bedankt voor uw donatie | Stichting Shoma',
  robots: { index: false },
};

export default function BedanktPage() {
  return (
    <div className="min-h-screen bg-shoma-sand flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center">
        {/* Animatie-icoon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-shoma-terracotta/20 rounded-full animate-ping" />
          <div className="relative w-24 h-24 bg-shoma-terracotta rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-10 h-10 text-white fill-white" aria-hidden="true" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-shoma-slate mb-4">
          Dank u wel! 🙏
        </h1>

        <p className="text-shoma-slate/65 text-lg leading-relaxed mb-8">
          Uw donatie is ontvangen. U ontvangt binnen enkele minuten een bevestiging
          en uw fiscale ANBI-kwitantie per e-mail.
        </p>

        {/* Impact reminder */}
        <div className="bg-white rounded-2xl p-6 border border-shoma-teal/10 shadow-sm text-left mb-8">
          <h3 className="font-semibold text-shoma-slate mb-3">Wat uw donatie betekent</h3>
          <div className="space-y-2.5 text-sm text-shoma-slate/70">
            <div className="flex items-start gap-2.5">
              <span className="text-shoma-terracotta mt-0.5">✓</span>
              <span>Uw geld gaat direct naar een kind in Rubya, Tanzania</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-shoma-terracotta mt-0.5">✓</span>
              <span>Het bestuur werkt onbezoldigd en verantwoordt elke besteding in de jaarrekening</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-shoma-terracotta mt-0.5">✓</span>
              <span>U ontvangt maximaal 4× per jaar updates als u zich aanmeldde</span>
            </div>
          </div>
        </div>

        {/* Deel-actie */}
        <div className="bg-shoma-teal/5 border border-shoma-teal/15 rounded-2xl p-5 mb-8">
          <p className="text-sm font-medium text-shoma-teal mb-3">
            Help ons meer kinderen te bereiken
          </p>
          <p className="text-xs text-shoma-slate/55 mb-4">
            Deel uw steun en inspireer anderen. Elk extra kind dat de kans krijgt om naar
            school te gaan, begint met iemand die het woord verspreidt.
          </p>
          <ShareButton />
        </div>

        {/* Navigatie */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-shoma-teal/30 text-shoma-slate px-5 py-3 rounded-xl font-medium text-sm transition-colors"
          >
            Terug naar homepage
          </Link>
          <Link
            href="/projecten"
            className="flex-1 flex items-center justify-center gap-2 bg-shoma-teal hover:bg-shoma-teal-dark text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Bekijk onze projecten
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
