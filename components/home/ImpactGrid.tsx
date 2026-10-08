'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Droplets, Sun, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { TextAnimate } from '@/components/ui/text-animate';
import { staggerContainer, staggerItem } from '@/components/ui/animated-section';

const SDG_COLORS: Record<number, string> = {
  1: 'bg-red-500',
  4: 'bg-yellow-500',
  6: 'bg-blue-500',
  7: 'bg-yellow-400',
  13: 'bg-green-600',
};

const projects = [
  {
    slug: 'kemps-basisschool',
    icon: BookOpen,
    category: 'Onderwijs',
    title: 'KEMPS Basisschool',
    summary:
      'Engelstalig onderwijs als sleutel tot de toekomst. 257 kinderen bezochten KEMPS in 2025, voor €30 per maand.',
    image: '/images/fotoalbums/aangeleverd-ongebruikt/kemps-basisschool-1.jpg',
    sdgGoals: [1, 4],
    stat: { value: '257', label: 'kinderen op KEMPS (2025)' },
    accentColor: 'from-shoma-terracotta/90',
  },
  {
    slug: 'schoon-water-baent',
    icon: Droplets,
    category: 'Schoon Water',
    title: 'Drinkwater Project',
    summary:
      'Met steun van Stichting BAENT verdubbelden we de opslagcapaciteit naar 20.000 liter: schoon water voor school én buurt.',
    image: '/images/projectverhalen/waterproject/IMG_1859.jpg',
    sdgGoals: [6],
    stat: { value: '20.000L', label: 'dagelijkse opslagcapaciteit' },
    accentColor: 'from-blue-600/90',
  },
  {
    slug: 'duurzame-energie-solar',
    icon: Sun,
    category: 'Duurzame Energie',
    title: 'Solar & Moestuin',
    summary:
      'Solarlampen voor studeren na zonsondergang en een moestuin die de exploitatiekosten met ~30% verlaagt.',
    image: '/images/zonnepaneel.jpg',
    sdgGoals: [7, 13],
    stat: { value: '~30%', label: 'minder operationele kosten' },
    accentColor: 'from-amber-600/90',
  },
];

export default function ImpactGrid() {
  return (
    <section className="bg-shoma-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-shoma-terracotta font-semibold text-sm uppercase tracking-wider mb-2">
              Onze projecten in Rubya
            </p>
            <TextAnimate
              as="h2"
              by="word"
              animation="blurInUp"
              once
              className="text-3xl sm:text-4xl font-bold text-shoma-slate"
            >
              Drie pijlers, één missie
            </TextAnimate>
          </div>
          <Link
            href="/projecten"
            className="flex items-center gap-1.5 text-shoma-teal font-semibold text-sm hover:gap-2.5 transition-all"
          >
            Alle projecten bekijken
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.slug}
                variants={staggerItem}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.accentColor} to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <Icon className="w-3.5 h-3.5 text-shoma-teal" aria-hidden="true" />
                    <span className="text-xs font-semibold text-shoma-teal">{project.category}</span>
                  </div>
                  {/* SDG badges */}
                  <div className="absolute top-3 right-3 flex gap-1">
                    {project.sdgGoals.map((sdg) => (
                      <span
                        key={sdg}
                        className={`${SDG_COLORS[sdg] ?? 'bg-gray-500'} text-white text-xs font-bold rounded-md px-1.5 py-0.5`}
                        title={`SDG ${sdg}`}
                      >
                        {sdg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-shoma-slate group-hover:text-shoma-teal transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-shoma-slate/65 text-sm leading-relaxed mt-2 flex-1">
                    {project.summary}
                  </p>

                  {/* Stat */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-shoma-terracotta">
                        {project.stat.value}
                      </span>
                      <span className="text-xs text-shoma-slate/50 ml-1.5">{project.stat.label}</span>
                    </div>
                    <Link
                      href={`/projecten/${project.slug}`}
                      className="flex items-center gap-1 text-sm font-semibold text-shoma-teal hover:text-shoma-teal-dark transition-colors"
                      aria-label={`Meer over ${project.title}`}
                    >
                      Meer info
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
