'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { TextAnimate } from '@/components/ui/text-animate';
import { staggerContainer, staggerItem } from '@/components/ui/animated-section';
import TierCardFlip from '@/components/home/TierCardFlip';

type Partner = {
  name: string;
  // Tekst in het logovak zolang er geen logo-afbeelding is
  initials: string;
  // Pad naar een logo in /public, bv. '/images/partners/wilde-ganzen.svg'
  logo?: string;
  color: string;
  contribution: string;
  quote?: string;
  // Feitelijke toelichting, getoond zonder aanhalingsteken als er geen quote is
  description?: string;
};

const partners: Partner[] = [
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
    color: 'bg-shoma-teal-light',
    contribution: 'Detacherings-partner',
    quote:
      'Als detacheerder zochten wij naar een concreet project dat onze MVO-ambities waarmaakte. Shoma leverde precies dat.',
  },
  {
    name: 'Wilde Ganzen',
    initials: 'Wilde Ganzen',
    logo: '/images/partners/wilde-ganzen.svg',
    color: 'bg-shoma-teal',
    contribution: 'Premie op 6 projecten sinds 2016',
    description:
      'Wilde Ganzen kende een premie toe aan zes Shoma-projecten in Tanzania: van drinkwater en waterdistributie voor school en gemeenschap tot zonnepanelen, een bibliotheek en een schoolbus.',
  },
];

// Elke partner precies één keer, plus een uitnodiging voor nieuwe partners
const stripPartners: Partner[] = [
  ...partners,
  {
    name: 'Uw bedrijf hier?',
    initials: '?',
    color: 'bg-shoma-slate',
    contribution: 'Word onze volgende partner',
  },
];

function PartnerLogo({ partner, size }: { partner: Partner; size: 'sm' | 'lg' }) {
  const box = size === 'sm' ? 'h-9 w-9 rounded-lg' : 'h-14 w-14 rounded-xl';

  if (partner.logo) {
    // Logo's zijn meestal liggend, dus een breder vak dan het vierkante initialenvak
    const logoBox = size === 'sm' ? 'h-9 w-16 rounded-lg' : 'h-14 w-24 rounded-xl';

    return (
      <div
        className={`${logoBox} relative shrink-0 overflow-hidden border border-shoma-teal/10 bg-white`}
      >
        <Image
          src={partner.logo}
          alt={`Logo ${partner.name}`}
          fill
          sizes="96px"
          className="object-contain p-1.5"
        />
      </div>
    );
  }

  return (
    <div className={`${partner.color} ${box} flex shrink-0 items-center justify-center`}>
      <span
        className={`text-center font-bold leading-tight text-white ${
          size === 'sm' ? 'px-0.5 text-[9px]' : 'px-1 text-xs'
        }`}
      >
        {partner.initials}
      </span>
    </div>
  );
}

const b2bTiers = [
  {
    tier: 'Tier 1',
    title: 'Slaapzaal voor 40 leerlingen',
    amount: '€ 1.500,-',
    description: 'Directe bijdrage aan een slaapzaal voor 40 leerlingen op de KEMPS-school',
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
          <TextAnimate
            as="h2"
            by="word"
            animation="blurInUp"
            once
            className="text-3xl sm:text-4xl font-bold text-shoma-slate"
          >
            Realiseer uw CSR-doelen met bewezen impact
          </TextAnimate>
          <p className="mt-4 text-shoma-slate/75 max-w-2xl mx-auto">
            Bedrijven die met Shoma samenwerken dragen direct bij aan meetbare SDG-doelstellingen
            met volledige transparantie.
          </p>
        </div>

        {/* Partnerstrook */}
        <div className="mb-14 flex flex-wrap justify-center gap-4">
          {stripPartners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-3 rounded-xl border border-shoma-teal/10 bg-shoma-sand/60 px-5 py-3"
            >
              <PartnerLogo partner={partner} size="sm" />
              <div className="whitespace-nowrap">
                <p className="text-sm font-semibold text-shoma-slate">{partner.name}</p>
                <p className="text-xs text-shoma-teal">{partner.contribution}</p>
              </div>
            </div>
          ))}
        </div>

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
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
              <PartnerLogo partner={partner} size="lg" />
              <div className="flex-1">
                {partner.quote && (
                  <div className="flex items-start gap-2 mb-2">
                    <Quote className="w-4 h-4 text-shoma-teal/40 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-shoma-slate/75 leading-relaxed italic">
                      {partner.quote}
                    </p>
                  </div>
                )}
                {!partner.quote && partner.description && (
                  <p className="mb-2 text-sm text-shoma-slate/75 leading-relaxed">
                    {partner.description}
                  </p>
                )}
                <div className={partner.quote || partner.description ? 'mt-3' : ''}>
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
