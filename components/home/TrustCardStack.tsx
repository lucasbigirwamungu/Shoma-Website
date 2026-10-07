'use client';

/**
 * Trust metrics als interactieve card stack (kokonutui "Card Stack"-patroon):
 * in rust zie je alleen de bovenste kaart, een klik/tik waaiert de overige
 * drie uit. Op mobiel (te weinig breedte om te waaieren) tonen we alle vier
 * meteen in een leesbaar grid.
 */

import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { CalendarCheck, GraduationCap, Droplets, BadgeCheck, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { staggerContainer, staggerItem } from '@/components/ui/animated-section';

interface Metric {
  id: string;
  icon: LucideIcon;
  value: number | null;
  suffix?: string;
  staticValue?: string;
  label: string;
  sublabel: string;
}

const metrics: Metric[] = [
  {
    id: 'jaren',
    icon: CalendarCheck,
    value: 20,
    suffix: '+',
    label: 'Jaar actief in Rubya',
    sublabel: 'Bestuur werkt volledig onbezoldigd',
  },
  {
    id: 'kinderen',
    icon: GraduationCap,
    value: 260,
    suffix: '+',
    label: 'Kinderen gesponsord',
    sublabel: 'Actief ondersteund in schooljaar 2025',
  },
  {
    id: 'water',
    icon: Droplets,
    value: 20000,
    suffix: '+ L',
    label: 'Liter water',
    sublabel: 'Dagelijkse opslagcapaciteit op KEMPS',
  },
  {
    id: 'anbi',
    icon: BadgeCheck,
    value: null,
    staticValue: 'ANBI',
    label: 'Erkend door Belastingdienst',
    sublabel: 'Donaties fiscaal aftrekbaar voor donateurs',
  },
];

function MetricValue({ metric }: { metric: Metric }) {
  if (metric.value === null) return <>{metric.staticValue}</>;
  return <AnimatedCounter to={metric.value} suffix={metric.suffix} duration={1600} />;
}

const CARD_WIDTH = 220;
const CARD_OVERLAP = 20;

interface MetricCardProps {
  metric: Metric;
  index: number;
  totalCards: number;
  isExpanded: boolean;
  reducedMotion: boolean;
}

function MetricCard({ metric, index, totalCards, isExpanded, reducedMotion }: MetricCardProps) {
  const Icon = metric.icon;

  const centerOffset = (totalCards - 1) * 6;
  const collapsedX = index * 12 - centerOffset;
  const collapsedY = index * 3;
  const collapsedRotate = index * 2.5;

  const totalExpandedWidth = CARD_WIDTH + (totalCards - 1) * (CARD_WIDTH - CARD_OVERLAP);
  const expandedCenterOffset = totalExpandedWidth / 2;
  const spreadX =
    index * (CARD_WIDTH - CARD_OVERLAP) - expandedCenterOffset + CARD_WIDTH / 2;
  const spreadRotate = index * 4 - (totalCards - 1) * 2;

  const collapsedPose = {
    x: collapsedX,
    y: collapsedY,
    rotate: reducedMotion ? 0 : collapsedRotate,
    scale: 1,
  };
  const expandedPose = {
    x: spreadX,
    y: 0,
    rotate: reducedMotion ? 0 : spreadRotate,
    scale: 1,
  };

  return (
    <motion.div
      animate={{
        ...(isExpanded ? expandedPose : collapsedPose),
        zIndex: totalCards - index,
      }}
      initial={collapsedPose}
      transition={
        reducedMotion
          ? { duration: 0.2, ease: 'easeOut' }
          : {
              type: 'spring',
              stiffness: 220,
              damping: 26,
              mass: 1,
              delay: isExpanded ? index * 0.05 : 0,
            }
      }
      style={{
        maxWidth: `${CARD_WIDTH}px`,
        left: '50%',
        marginLeft: `-${CARD_WIDTH / 2}px`,
      }}
      className={cn(
        'absolute top-0 flex h-full w-full flex-col justify-between rounded-2xl p-6',
        'bg-white border border-shoma-teal/10',
        'shadow-[0_8px_24px_rgba(61,40,7,0.1)]',
        'hover:border-shoma-teal/25',
        'transition-[border-color] duration-300 ease-out',
        'transform-gpu'
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-shoma-sand to-shoma-terracotta/15 text-shoma-teal ring-1 ring-shoma-teal/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
      </div>
      <div className="mt-5">
        <div className="text-3xl font-extrabold text-shoma-teal sm:text-4xl">
          <MetricValue metric={metric} />
        </div>
        <p className="mt-2 font-semibold text-shoma-slate">{metric.label}</p>
        <p className="mt-1 text-sm text-shoma-slate/60 leading-snug">{metric.sublabel}</p>
      </div>
    </motion.div>
  );
}

/** Statische, altijd-leesbare versie voor mobiel (te smal om te waaieren). */
function MobileMetricGrid() {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4 md:hidden"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.id}
            variants={staggerItem}
            className="flex flex-col justify-between rounded-2xl border border-shoma-teal/10 bg-white p-5 shadow-[0_8px_24px_rgba(61,40,7,0.08)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-shoma-sand to-shoma-terracotta/15 text-shoma-teal ring-1 ring-shoma-teal/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <Icon className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-extrabold text-shoma-teal">
                <MetricValue metric={metric} />
              </div>
              <p className="mt-1.5 text-sm font-semibold text-shoma-slate">{metric.label}</p>
              <p className="mt-0.5 text-xs leading-snug text-shoma-slate/60">{metric.sublabel}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

interface TrustCardStackProps {
  className?: string;
}

export default function TrustCardStack({ className }: TrustCardStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className={cn('mb-6', className)}>
      <MobileMetricGrid />

      <button
        aria-expanded={isExpanded}
        aria-label={
          isExpanded ? 'Klap de cijferstack weer in' : 'Klik om alle cijfers te bekijken'
        }
        className={cn(
          'relative mx-auto hidden cursor-pointer appearance-none border-0 bg-transparent p-0',
          'min-h-[230px] w-full max-w-[860px]',
          'md:flex md:items-center md:justify-center'
        )}
        onClick={() => setIsExpanded((v) => !v)}
        type="button"
      >
        {metrics.map((metric, index) => (
          <MetricCard
            index={index}
            isExpanded={isExpanded}
            key={metric.id}
            metric={metric}
            reducedMotion={reducedMotion}
            totalCards={metrics.length}
          />
        ))}
      </button>

      <p className="mt-3 hidden text-center text-xs font-medium text-shoma-slate/45 md:block">
        {isExpanded ? 'Klik om weer in te klappen' : 'Klik op de kaarten om alle cijfers te zien →'}
      </p>
    </div>
  );
}
