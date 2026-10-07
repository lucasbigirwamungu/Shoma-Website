'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Eenmalige fade+rise zodra de sectie in beeld scrolt. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
}

/** Omhult een grid/lijst; kinderen moeten <StaggerItem> zijn. */
export function StaggerContainer({ children, className }: StaggerContainerProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reducedMotion ? 0 : 0.06 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={
        reducedMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 18, scale: 0.96 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
