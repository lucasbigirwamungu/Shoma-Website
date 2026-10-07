'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { animate, stagger, splitText } from 'animejs';
import { Menu, X, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/over-ons', label: 'Over Ons' },
  { href: '/projecten', label: 'Projecten' },
  { href: '/compenseer-en-leer', label: 'Compenseer & Leer' },
  { href: '/voor-bedrijven', label: 'Voor Bedrijven' },
  { href: '/nieuws', label: "Nieuws & Foto's" },
  { href: '/contact', label: 'Contact' },
];

export default function MorphicNavbar() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  // Sluit het mobiele menu bij navigatie (Link is client-side, layout blijft gemount)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Doneer nu-knop: char-bounce als aandachttrekker, ongeveer eens per 5 seconden; uit bij reduced motion
  useEffect(() => {
    if (reducedMotion) return;

    const splitter = splitText('#donate-cta-text', { words: false, chars: true });
    const donateAnimation = animate(splitter.chars, {
      y: [
        { to: '-0.6rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 },
      ],
      rotate: {
        from: '-1turn',
        delay: 0,
      },
      delay: stagger(50),
      ease: 'inOutCirc',
      loopDelay: 3500,
      loop: true,
    });

    return () => {
      donateAnimation.pause();
      splitter.revert();
    };
  }, [reducedMotion]);

  return (
    <motion.header
      initial={reducedMotion ? false : { y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="glass flex shrink-0 items-center rounded-2xl px-3 py-2 transition-transform hover:scale-[1.02]"
        >
          <Image
            src="/shoma-logo-transparent.png"
            alt="Stichting Shoma - Onderwijs in Tanzania"
            width={2000}
            height={818}
            priority
            className="h-9 w-auto lg:h-10"
            quality={95}
          />
        </Link>

        {/* Desktop pill-navigatie: morphing active state */}
        <nav aria-label="Hoofdnavigatie" className="hidden xl:block">
          <div className="flex items-center overflow-hidden rounded-2xl border border-white/10 bg-shoma-slate/95 p-1 shadow-[0_8px_30px_rgba(61,40,7,0.25)] backdrop-blur-xl">
            {NAV_ITEMS.map((item, index, arr) => {
              const active = isActive(item.href);
              const isFirst = index === 0;
              const isLast = index === arr.length - 1;
              const prevActive = index > 0 && isActive(arr[index - 1].href);
              const nextActive =
                index < arr.length - 1 && isActive(arr[index + 1].href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-center whitespace-nowrap px-3.5 py-2 text-[13px] transition-all duration-300',
                    active
                      ? 'mx-1 rounded-xl font-semibold text-shoma-terracotta-light'
                      : cn(
                          'text-shoma-sand/75 hover:text-white',
                          (prevActive || isFirst) && 'rounded-l-xl',
                          (nextActive || isLast) && 'rounded-r-xl'
                        )
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* CTA + mobiel menu toggle */}
        <div className="flex shrink-0 items-center gap-2">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.5, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={
              reducedMotion
                ? { duration: 0.3 }
                : { type: 'spring', stiffness: 260, damping: 18, delay: 0.9 }
            }
            className="hidden sm:block"
          >
            <Link
              href="/doneren"
              className="flex items-center gap-2 overflow-visible rounded-xl bg-shoma-terracotta px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-shoma-terracotta-dark hover:shadow-md"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              <span id="donate-cta-text">Doneer nu</span>
            </Link>
          </motion.div>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={menuOpen}
            className="glass flex h-11 w-11 items-center justify-center rounded-xl text-shoma-slate transition-colors hover:bg-white xl:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobiel/tablet dropdown-paneel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[68px] z-40 bg-shoma-slate/30 xl:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="glass fixed inset-x-4 top-[76px] z-40 max-h-[calc(100vh-96px)] overflow-y-auto rounded-2xl p-2 xl:hidden"
              role="navigation"
              aria-label="Mobiele navigatie"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'block rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-shoma-slate text-shoma-terracotta-light'
                      : 'text-shoma-slate hover:bg-shoma-sand'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/doneren"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-shoma-terracotta px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-shoma-terracotta-dark"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                Doneer nu
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
