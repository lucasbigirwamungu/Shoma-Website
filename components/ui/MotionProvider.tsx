'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Laat Motion zelf prefers-reduced-motion volgen: verplaatsing, schaal en rotatie
 * vallen dan weg, vervaging blijft. Componenten hoeven hun markup daardoor niet
 * meer op de voorkeur te vertakken (dat gaf hydration-fouten en onzichtbare inhoud).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
