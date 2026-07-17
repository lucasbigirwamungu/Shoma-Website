'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Heart } from 'lucide-react';

const navLinks = [
  { href: '/over-ons',              label: 'Over Ons' },
  { href: '/projecten',             label: 'Projecten' },
  { href: '/compenseer-en-leer',    label: 'Compenseer & Leer' },
  { href: '/compenseer-bedrijven',  label: 'Compenseer & Leer (Bedrijven)' },
  { href: '/voor-bedrijven',        label: 'Voor Bedrijven' },
  { href: '/fotoalbums',            label: "Foto's" },
  { href: '/nieuws',                label: 'Nieuws' },
];

export default function SideNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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

          {/* ─── CTA Button (Desktop Right) ────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/doneren"
              className="flex items-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              Doneer nu
            </Link>
          </div>

          {/* ─── Hamburger Menu Button ────────────────────────────────────── */}
          <button
            className={`p-2 rounded-lg transition-colors ${
              scrolled ? 'text-shoma-slate hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* ─── Side Drawer Overlay ──────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ─── Side Drawer Menu ─────────────────────────────────────────────── */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Navigation"
      >
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

        {/* ─── CTA Button in Drawer ─────────────────────────────────────── */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <Link
            href="/doneren"
            className="flex items-center justify-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white w-full py-3 rounded-xl font-semibold transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
            Doneer nu
          </Link>
        </div>
      </div>
    </header>
  );
}
