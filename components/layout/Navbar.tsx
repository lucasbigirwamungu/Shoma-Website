'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Heart } from 'lucide-react';

const navLinks = [
  { href: '/over-ons',              label: 'Over Ons' },
  { href: '/projecten',             label: 'Projecten' },
  { href: '/compenseer-en-leer',    label: 'Compenseer & Leer' },
  { href: '/voor-bedrijven',        label: 'Voor Bedrijven' },
  { href: '/fotoalbums',            label: "Foto's" },
  { href: '/nieuws',                label: 'Nieuws' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-md shadow-sm border-b border-shoma-teal/15'
          : 'bg-white/98'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ─── Logo ─────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src="/shoma-logo-transparent.svg"
              alt="Stichting Shoma - Onderwijs in Tanzania"
              width={200}
              height={56}
              priority
              className="h-12 w-auto"
              quality={95}
            />
          </Link>

          {/* ─── Desktop nav ──────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-shoma-teal/10 hover:text-shoma-teal ${
                  scrolled ? 'text-shoma-slate' : 'text-white/90 hover:text-shoma-teal-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ─── CTA ──────────────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/doneren"
              className="flex items-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              Doneer nu
            </Link>
          </div>

          {/* ─── Mobile hamburger ─────────────────────────────────────────── */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-shoma-slate hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* ─── Mobile menu ──────────────────────────────────────────────────── */}
        {menuOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-xl border border-gray-100 mb-4 overflow-hidden">
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-shoma-slate hover:bg-shoma-sand hover:text-shoma-teal font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="p-4 pt-0">
              <Link
                href="/doneren"
                className="flex items-center justify-center gap-2 bg-shoma-terracotta text-white w-full py-3 rounded-xl font-semibold transition-colors hover:bg-shoma-terracotta-dark"
                onClick={() => setMenuOpen(false)}
              >
                <Heart className="w-4 h-4" aria-hidden="true" />
                Doneer nu
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
