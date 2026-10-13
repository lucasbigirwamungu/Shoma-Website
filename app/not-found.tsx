import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Pagina niet gevonden',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-shoma-sand pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <p className="text-6xl font-bold text-shoma-teal mb-4">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-shoma-slate mb-4">
          Deze pagina bestaat niet
        </h1>
        <p className="text-shoma-slate/75 text-lg leading-relaxed mb-8">
          De link klopt niet of de pagina is verplaatst. Via de onderstaande knoppen vindt u snel
          de weg terug.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-shoma-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-shoma-teal-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-shoma-terracotta focus-visible:ring-offset-2"
          >
            Naar de homepage
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/projecten"
            className="inline-flex min-h-11 items-center rounded-xl border border-shoma-teal/25 bg-white px-6 py-3 font-semibold text-shoma-teal transition-colors hover:bg-shoma-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-shoma-terracotta focus-visible:ring-offset-2"
          >
            Bekijk de projecten
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-xl border border-shoma-teal/25 bg-white px-6 py-3 font-semibold text-shoma-teal transition-colors hover:bg-shoma-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-shoma-terracotta focus-visible:ring-offset-2"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
