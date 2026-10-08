import Link from 'next/link';
import Image from 'next/image';
import { Heart, Mail, ExternalLink } from 'lucide-react';
import SocialButton from '@/components/ui/SocialButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-shoma-teal-dark text-white">
      {/* CTA Strip */}
      <div className="bg-shoma-terracotta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Iedere euro telt: direct naar Rubya.</h3>
            <p className="text-white/80 mt-1">Onbezoldigd bestuur. Volledig transparant. Fiscaal aftrekbaar als ANBI.</p>
          </div>
          <Link
            href="/doneren"
            className="flex items-center gap-2 bg-white text-shoma-terracotta-dark px-6 py-3 rounded-xl font-bold hover:bg-shoma-sand transition-colors whitespace-nowrap shadow-sm"
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
            Doneer nu
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              {/* Lichte variant: tekst in wit, broodmerk in kleur, leesbaar op donkere achtergrond */}
              <Image
                src="/shoma-logo-light.png"
                alt="Stichting Shoma"
                width={2000}
                height={818}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Opgericht in 2005 vanuit een persoonlijke verbinding met Rubya, Tanzania.
              Wij bevorderen onderwijs en levenskwaliteit voor kansarme kinderen in
              Noordwest-Tanzania.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-white/60">
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <a href="mailto:info@shoma.nl" className="hover:text-white transition-colors">
                info@shoma.nl
              </a>
            </div>
          </div>

          {/* Navigatie */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              Navigatie
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '/over-ons', label: 'Over Ons' },
                { href: '/projecten', label: 'Onze Projecten' },
                { href: '/voor-bedrijven', label: 'Voor Bedrijven' },
                { href: '/doneren', label: 'Doneer Nu' },
                { href: '/nieuws', label: "Nieuws & Foto's" },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparantie */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              Transparantie
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '/over-ons#anbi', label: 'ANBI Status' },
                { href: '/over-ons#jaarrekeningen', label: 'Jaarrekeningen 2012–2025' },
                { href: '/over-ons#bestuur', label: 'Bestuur & Organisatie' },
                { href: '/over-ons#beleidsplan', label: 'Beleidsplan 2026–2028' },
                { href: '/over-ons#statuten', label: 'Statuten' },
                { href: '/privacyverklaring', label: 'Privacyverklaring' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                  >
                    {link.label}
                    {link.href.includes('#') && (
                      <ExternalLink className="w-3 h-3 opacity-50" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/50 text-xs space-y-1 text-center md:text-left">
            <p>© {currentYear} Stichting Onderwijsbevordering Noordwest Tanzania (Shoma)</p>
            <p>KvK: geregistreerd te Nederland &bull; RSIN: 8143.90.249 &bull; IBAN: NL55 ABNA 0501 3541 58</p>
          </div>
          <div className="flex items-center gap-1.5 text-white/40 text-xs">
            <span>Onbezoldigd bestuur</span>
            <span>&bull;</span>
            <span className="text-shoma-terracotta-light font-medium">ANBI erkend</span>
            <span>&bull;</span>
            <span>Fiscaal aftrekbaar</span>
          </div>
          <SocialButton />
        </div>
      </div>
    </footer>
  );
}
