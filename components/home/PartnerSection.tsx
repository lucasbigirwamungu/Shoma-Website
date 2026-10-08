'use client';

import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { TextAnimate } from '@/components/ui/text-animate';
import { Marquee } from '@/components/ui/marquee';
import { staggerContainer, staggerItem } from '@/components/ui/animated-section';
import TierCardFlip from '@/components/home/TierCardFlip';

const partners = [
  {
    name: 'Stichting BAENT',
    initials: 'BAENT',
    color: 'bg-shoma-teal',
    contribution: 'Financiering waterproject',
    quote:
      'Dankzij de professionele aanpak van Shoma konden wij direct bijdragen aan SDG 6. Volledige transparantie over elke bestede euro.',
  },
  {
    name: 'Inextern',
    initials: 'INX',
    color: 'bg-shoma-terracotta',
    contribution: 'Detacherings-partner',
    quote:
      'Als detacheerder zochten wij naar een concreet project dat onze MVO-ambities waarmaakte. Shoma leverde precies dat.',
  },
];

const b2bTiers = [
  {
    tier: 'Tier 1',
    title: 'Klaslokaal Sponsor',
    amount: '€ 1.500,-',
    description: 'Directe bijdrage aan de fysieke inrichting van de KEMPS-school',
    sdg: '4',
    sdgName: 'Kwaliteitsonderwijs',
    sdgColor: 'bg-yellow-500',
    glowColor: 'rgba(234,179,8,0.5)',
    image: '/images/tier1-onderwijs.jpg',
    imageAlt: 'Leerlingen eten samen in het nieuwe KEMPS-klaslokaal',
  },
  {
    tier: 'Tier 2',
    title: 'Schoon Water Partner',
    amount: '€ 3.500,-',
    description: 'Financiering van uitbreidingen aan het BAENT-drinkwaternetwerk',
    sdg: '6',
    sdgName: 'Schoon water en sanitair',
    sdgColor: 'bg-blue-500',
    glowColor: 'rgba(59,130,246,0.5)',
    image: '/images/schoonwater.jpg',
    imageAlt: 'Schoon stromend water uit de nieuwe keukenkraan op KEMPS',
  },
  {
    tier: 'Tier 3',
    title: 'Duurzame Energie Supporter',
    amount: '€ 2.500,-',
    description: 'Financiering van solar-installaties op het schoolcomplex',
    sdg: '7',
    sdgName: 'Betaalbare en duurzame energie',
    sdgColor: 'bg-yellow-400',
    glowColor: 'rgba(250,204,21,0.5)',
    image: '/images/zonnepaneel.jpg',
    imageAlt: 'Zonnepanelen op een dak',
  },
];

export default function PartnerSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-shoma-terracotta font-semibold text-sm uppercase tracking-wider mb-2">
            Zakelijk partnerschap
          </p>
          <TextAnimate
            as="h2"
            by="word"
            animation="blurInUp"
            once
            className="text-3xl sm:text-4xl font-bold text-shoma-slate"
          >
            Realiseer uw CSR-doelen met bewezen impact
          </TextAnimate>
          <p className="mt-4 text-shoma-slate/60 max-w-2xl mx-auto">
            Bedrijven die met Shoma samenwerken dragen direct bij aan meetbare SDG-doelstellingen
            met volledige transparantie.
          </p>
        </div>

        {/* Partner ticker */}
        <Marquee pauseOnHover className="mb-14 [--duration:28s]">
          {[...partners, { name: 'Uw bedrijf hier?', initials: '?', color: 'bg-shoma-slate', contribution: 'Word onze volgende partner', quote: '' }].map(
            (partner) => (
              <div
                key={partner.name}
                className="mx-3 flex items-center gap-3 rounded-xl border border-shoma-teal/10 bg-shoma-sand/60 px-5 py-3"
              >
                <div
                  className={`${partner.color} flex h-9 w-9 shrink-0 items-center justify-center rounded-lg`}
                >
                  <span className="px-0.5 text-center text-[9px] font-bold leading-tight text-white">
                    {partner.initials}
                  </span>
                </div>
                <div className="whitespace-nowrap">
                  <p className="text-sm font-semibold text-shoma-slate">{partner.name}</p>
                  <p className="text-xs text-shoma-teal">{partner.contribution}</p>
                </div>
              </div>
            )
          )}
        </Marquee>

        {/* Partnership tiers */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {b2bTiers.map((tier) => (
            <motion.div key={tier.tier} variants={staggerItem}>
              <TierCardFlip
                tier={tier.tier}
                title={tier.title}
                amount={tier.amount}
                description={tier.description}
                sdg={tier.sdg}
                sdgName={tier.sdgName}
                sdgColorClass={tier.sdgColor}
                glowColor={tier.glowColor}
                image={tier.image}
                imageAlt={tier.imageAlt}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Partner quotes */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={staggerItem}
              className="flex gap-5 bg-shoma-sand/60 rounded-2xl p-6 border border-shoma-teal/10"
            >
              {/* Logo placeholder */}
              <div
                className={`${partner.color} w-14 h-14 rounded-xl flex items-center justify-center shrink-0`}
              >
                <span className="text-white font-bold text-xs text-center leading-tight px-1">
                  {partner.initials}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <Quote className="w-4 h-4 text-shoma-teal/40 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-shoma-slate/75 leading-relaxed italic">
                    {partner.quote}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="font-semibold text-shoma-slate text-sm">{partner.name}</p>
                  <p className="text-xs text-shoma-teal">{partner.contribution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* B2B CTA */}
        <div className="text-center">
          <Link
            href="/voor-bedrijven#tiers"
            className="inline-flex items-center gap-2 bg-shoma-teal hover:bg-shoma-teal-dark text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Bekijk alle partnerschapsmogelijkheden
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
