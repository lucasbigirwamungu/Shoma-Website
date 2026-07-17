import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

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
      'Als detacheerder zochten wij naar een concreet project dat onze MVO-ambities waarmaakte. Shoma leverde dat zonder overhead.',
  },
];

const b2bTiers = [
  {
    tier: 'Tier 1',
    title: 'Klaslokaal Sponsor',
    amount: '€ 1.500,-',
    description: 'Directe bijdrage aan de fysieke inrichting van de KEMPS-school',
    sdg: '4',
    sdgColor: 'bg-yellow-500',
  },
  {
    tier: 'Tier 2',
    title: 'Schoon Water Partner',
    amount: '€ 3.500,-',
    description: 'Financiering van uitbreidingen aan het BAENT-drinkwaternetwerk',
    sdg: '6',
    sdgColor: 'bg-blue-500',
  },
  {
    tier: 'Tier 3',
    title: 'Duurzame Energie Supporter',
    amount: '€ 2.500,-',
    description: 'Financiering van solar-installaties op het schoolcomplex',
    sdg: '7',
    sdgColor: 'bg-yellow-400',
  },
];

export default function PartnerSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-shoma-terracotta font-semibold text-sm uppercase tracking-wider mb-2">
            Zakelijk partnerschap
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-shoma-slate">
            Realiseer uw CSR-doelen met bewezen impact
          </h2>
          <p className="mt-4 text-shoma-slate/60 max-w-2xl mx-auto">
            Bedrijven die met Shoma samenwerken dragen direct bij aan meetbare SDG-doelstellingen
            — met volledige transparantie en 0% overhead.
          </p>
        </div>

        {/* Partnership tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {b2bTiers.map((tier) => (
            <div
              key={tier.tier}
              className="relative bg-shoma-sand rounded-2xl p-6 border border-shoma-teal/10 hover:border-shoma-teal/30 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-bold text-shoma-teal/60 uppercase tracking-wider">
                  {tier.tier}
                </span>
                <span
                  className={`${tier.sdgColor} text-white text-xs font-bold rounded-md px-2 py-0.5`}
                >
                  SDG {tier.sdg}
                </span>
              </div>
              <h3 className="font-bold text-shoma-slate text-lg mb-1">{tier.title}</h3>
              <p className="text-3xl font-extrabold text-shoma-teal mb-3">{tier.amount}</p>
              <p className="text-sm text-shoma-slate/65 leading-relaxed">{tier.description}</p>
              <Link
                href="/voor-bedrijven#contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-shoma-terracotta hover:text-shoma-terracotta-dark transition-colors group-hover:gap-2.5"
              >
                Interesse tonen
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        {/* Partner quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {partners.map((partner) => (
            <div
              key={partner.name}
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
            </div>
          ))}
        </div>

        {/* B2B CTA */}
        <div className="text-center">
          <Link
            href="/voor-bedrijven"
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
