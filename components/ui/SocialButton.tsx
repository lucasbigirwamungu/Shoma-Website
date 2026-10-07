'use client';

/**
 * Social button: hover-reveal list of Shoma's social media kanalen.
 * Gebaseerd op de "Social Button" van kokonutui (https://kokonutui.com), aangepast
 * om te linken naar de echte kanalen van Stichting Shoma i.p.v. een share-intent.
 */

import type { LucideIcon } from 'lucide-react';
import { Facebook, Link2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SocialChannel {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  items?: SocialChannel[];
  className?: string;
}

const SHOMA_CHANNELS: SocialChannel[] = [
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/stichting.shoma',
  },
];

export default function SocialButton({
  label = 'Volg ons',
  items = SHOMA_CHANNELS,
  className,
  ...props
}: SocialButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        animate={{ opacity: isVisible ? 0 : 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <Button
          className={cn(
            'relative min-w-40',
            'bg-white/10 hover:bg-white/15',
            'text-white',
            'border border-white/20',
            'transition-colors duration-200',
            className
          )}
          {...props}
        >
          <span className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            {label}
          </span>
        </Button>
      </motion.div>

      <motion.div
        animate={{ width: isVisible ? 'auto' : 0 }}
        className="absolute top-0 left-0 flex h-10 overflow-hidden"
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {items.map((channel, i) => (
          <motion.a
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            aria-label={channel.label}
            className={cn(
              'h-10',
              'w-10',
              'flex items-center justify-center',
              'bg-shoma-terracotta',
              'text-white',
              i === 0 && 'rounded-l-md',
              i === items.length - 1 && 'rounded-r-md',
              'border-white/10 border-r last:border-r-0',
              'hover:bg-shoma-terracotta-dark',
              'outline-none',
              'relative overflow-hidden',
              'transition-colors duration-200'
            )}
            href={channel.href}
            key={channel.label}
            rel="noopener noreferrer"
            target="_blank"
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: isVisible ? i * 0.05 : 0,
            }}
          >
            <channel.icon className="h-4 w-4" />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
