'use client';

/**
 * B2B-tier kaart, geadapteerd van het kokonutui "Card Flip" patroon: hover
 * (of tik/Enter voor touch en toetsenbord) draait de kaart om voor iets meer
 * detail op de achterkant.
 */

import { ArrowRight, Repeat2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

export interface TierCardFlipProps {
  tier: string;
  title: string;
  amount: string;
  description: string;
  sdg: string;
  sdgName: string;
  sdgColorClass: string;
  glowColor: string;
  image?: string;
  imageAlt?: string;
}

export default function TierCardFlip({
  tier,
  title,
  amount,
  description,
  sdg,
  sdgName,
  sdgColorClass,
  glowColor,
  image,
  imageAlt,
}: TierCardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((v) => !v);
    }
  };

  return (
    <div
      className="group relative h-[350px] w-full [perspective:2000px]"
      style={{ '--tier-glow': glowColor } as CSSProperties}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((v) => !v)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${title}, ${amount}. Druk op Enter voor meer details.`}
    >
      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-[transform] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]',
          'motion-reduce:transition-none',
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        )}
      >
        {/* Voorkant */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[backface-visibility:hidden] [transform:rotateY(0deg)]',
            'overflow-hidden rounded-2xl',
            'bg-shoma-sand border border-shoma-teal/10',
            'shadow-sm',
            'transition-shadow duration-500',
            'group-hover:shadow-lg'
          )}
        >
          <div className="relative h-[150px] overflow-hidden bg-gradient-to-b from-white to-shoma-sand">
            {image ? (
              <>
                <Image
                  src={image}
                  alt={imageAlt ?? title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-shoma-slate/70 via-shoma-slate/10 to-transparent" />
              </>
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-start justify-center pt-10"
              >
                <div className="relative flex h-[100px] w-[200px] items-center justify-center">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'absolute h-[50px] w-[50px]',
                        'rounded-[140px]',
                        'animate-[tier-scale_3s_linear_infinite]',
                        'motion-reduce:animate-none',
                        'opacity-0',
                        'group-hover:animate-[tier-scale_2s_linear_infinite]'
                      )}
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span
                className={cn(
                  'text-xs font-bold uppercase tracking-wider',
                  image ? 'text-white drop-shadow-sm' : 'text-shoma-teal/60'
                )}
              >
                {tier}
              </span>
            </div>
            <div className="absolute top-3 right-4">
              <span
                className={cn(
                  sdgColorClass,
                  'rounded-md px-2 py-0.5 text-xs font-bold text-white'
                )}
              >
                SDG {sdg}
              </span>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-shoma-slate leading-snug tracking-tight transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  {title}
                </h3>
                <p className="text-2xl font-extrabold text-shoma-teal transition-transform delay-[50ms] duration-500 ease-out group-hover:-translate-y-1">
                  {amount}
                </p>
              </div>
              <div className="group/icon relative shrink-0">
                <div className="absolute inset-[-8px] rounded-lg bg-gradient-to-br from-shoma-terracotta/20 via-shoma-terracotta/10 to-transparent transition-opacity duration-300" />
                <Repeat2
                  aria-hidden="true"
                  className="relative z-10 h-4 w-4 text-shoma-terracotta transition-transform duration-300 group-hover/icon:-rotate-12 group-hover/icon:scale-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Achterkant */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[backface-visibility:hidden] [transform:rotateY(180deg)]',
            'rounded-2xl p-6',
            'bg-white border border-shoma-teal/10',
            'shadow-sm flex flex-col',
            'transition-shadow duration-500',
            'group-hover:shadow-lg'
          )}
        >
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-shoma-slate leading-snug tracking-tight">
                {title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-shoma-teal/70">
                SDG {sdg}: {sdgName}
              </p>
            </div>
            <p className="text-sm text-shoma-slate/70 leading-relaxed">{description}</p>

            <div className="space-y-2 pt-1">
              {['Onbezoldigd bestuur, lokaal gecontroleerd', 'Volledige transparantie via de jaarrekening'].map(
                (fact, index) => (
                  <div
                    key={fact}
                    className="flex items-center gap-2 text-sm text-shoma-slate/80 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      transform: isFlipped ? 'translateX(0)' : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 60 + 150}ms`,
                    }}
                  >
                    <ArrowRight aria-hidden="true" className="h-3 w-3 shrink-0 text-shoma-terracotta" />
                    <span>{fact}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-4 border-t border-shoma-teal/10 pt-4">
            <Link
              href="/voor-bedrijven#contact"
              className={cn(
                'group/start relative w-full',
                'flex items-center justify-between',
                '-m-3 rounded-xl p-3',
                'transition-[transform,background] duration-300',
                'bg-shoma-sand hover:bg-shoma-terracotta/10',
                'hover:scale-[1.02] active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-shoma-terracotta focus-visible:ring-offset-2'
              )}
            >
              <span className="font-semibold text-sm text-shoma-slate transition-colors duration-300 group-hover/start:text-shoma-terracotta-dark">
                Interesse tonen
              </span>
              <ArrowRight
                aria-hidden="true"
                className="relative z-10 h-4 w-4 text-shoma-terracotta transition-transform duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110"
              />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes tier-scale {
          0% {
            transform: scale(2);
            opacity: 0;
            box-shadow: 0px 0px 50px var(--tier-glow);
          }
          50% {
            transform: translate(0px, -5px) scale(1);
            opacity: 1;
            box-shadow: 0px 8px 20px var(--tier-glow);
          }
          100% {
            transform: translate(0px, 5px) scale(0.1);
            opacity: 0;
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
