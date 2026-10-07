'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import KempsClassChart from '@/components/projecten/KempsClassChart';

// Toont de klasgrafiek pas wanneer een bezoeker om meer informatie vraagt
export default function KempsClassChartToggle() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div className="mt-8">
      <div className="text-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="kemps-klasgrafiek"
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all"
        >
          {open ? 'Verberg informatie' : 'Klik voor meer informatie'}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="kemps-klasgrafiek"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-8">
              <KempsClassChart />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
