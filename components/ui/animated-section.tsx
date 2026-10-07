'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

interface AnimatedSectionProps extends Omit<ComponentPropsWithoutRef<'div'>, 'ref'> {
  as?: ElementType;
  delay?: number;
  y?: number;
}

/** Restrained scroll-in reveal for sections without their own bespoke motion. */
export function AnimatedSection({
  as = 'div',
  delay = 0,
  y = 28,
  children,
  ...props
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion();
  const MotionComponent = motion.create(as);

  return (
    <MotionComponent
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

/** Container/item variant pair for lists that should reveal as a staggered list. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};
