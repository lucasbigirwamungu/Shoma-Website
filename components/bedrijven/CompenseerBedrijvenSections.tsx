import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, BarChart3, Users, FileText, Shield, TrendingUp, Award, Zap
} from 'lucide-react';
import CompenseerB2BForm from '@/components/compenseer/CompenseerB2BForm';

// ─── Compenseer & Leer voor Bedrijven ──────────────────────────────────────
// Onderdeel van de pagina Voor Bedrijven (/voor-bedrijven#compenseer-en-leer)

const features = [
  {
    icon: Users,
    title: 'Team Member Management',
    desc: 'Voeg medewerkers toe, monitor individuele voetafdrukken, en laat iedereen zien hoeveel bomen zij hebben geplant.',
  },
  {
    icon: BarChart3,
    title: 'Realtime Dashboard',
    desc: 'Volg groepscijfers: totale CO₂ gecompenseerd, bomen gepland, impact op onderwijs. Live updates vanuit Tanzania.',
  },
  {
    icon: FileText,
    title: 'Maandelijkse Rapportage',
    desc: 'Gedetailleerde rapporten voor interne communicatie: wie participeerde, welke bomen zijn geplant, schoolimpact.',
  },
  {
    icon: Award,
    title: 'ESG-Certificaten',
    desc: 'Officiële Shoma-certificaten met groepscijfers, geschikt voor jaarverslagen en duurzaamheidscommunicatie.',
  },
  {
    icon: Shield,
    title: 'Custom CO₂ Scope',
    desc: 'Definieer uw eigen CO₂-scope (kantoor, reizen, operaties) of gebruik pre-set bedrijfsprofielen.',
  },
  {
    icon: TrendingUp,
    title: 'Impact-Tracking',
    desc: 'Foto\'s van bomen in groei, lokale updates en schoolbijdrages, allemaal teruggekoppeld aan uw team.',
  },
];

const pricingTiers = [
  {
    size: '1–25 medewerkers',
    monthlyFee: '€ 99,-',
    perPersonFee: '€ 7,50',
    features: [
      'Team-account met beheerder-dashboard',
      'Per persoon: voetafdruk-calculator',
      'Maandelijkse groepsrapportage (PDF)',
      'Jaarlijks ESG-certificaat',
      'Support via e-mail',
    ],
  },
  {
    size: '26–100 medewerkers',
    monthlyFee: '€ 299,-',
    perPersonFee: '€ 5,99',
    features: [
      'Team-account + meerdere admins',
      'Advanced dashboard met filters',
      'Wekelijkse updates in plaats van maandelijks',
      'Gepersonaliseerde team-rapportage',
      'Directe telefoon-support',
      'Custom integrations (Slack, Teams)',
    ],
    highlight: true,
  },
  {
    size: '100+ medewerkers',
    monthlyFee: 'Custom',
    perPersonFee: 'Onderhandeld',
    features: [
      'Enterprise-niveau account',
      'Unlimited dashboards & rapportage',
      'Dedicated account manager',
      'Jaarlijkse bedrijfsbezoek aan Tanzania (optioneel)',
      'Custom branding in rapporten',
      'API-access voor interne integraties',
    ],
  },
];

const useCases = [
  {
    title: 'Jaarlijkse MVO-dag',
    description: 'Laat alle medewerkers CO₂ compenseren als onderdeel van uw bedrijfscultuur. Zichtbare impact met foto\'s en rapportage.',
  },
  {
    title: 'Employee Wellbeing',
    description: 'Offer compensatie als incentive voor hardlopers, fietser, of goede prestaties. Team groeit samen.',
  },
  {
    title: 'Duurzame Reizen',
    description: 'Compenseer vliegreis-emissies van zakenreizen direct. Team-dashboard toont gecombineerde impact.',
  },
  {
    title: 'ESG-Rapportage',
    description: 'Officiële certificaten voor uw duurzaamheidsverslag. Meetbare klimaataktie + geverifieerde sociaal impact.',
  },
  {
    title: 'Klant-Incentives',
    description: 'Schenk compensatie-packages aan klanten als dank. Sterk marketinginstrument met impact.',
  },
  {
    title: 'Offsite Events',
    description: 'Team-building: iedereen compenseert samen, ziet live-updates, krijgt groepscertificaat.',
  },
];

export default function CompenseerBedrijvenSections() {
  return (
    <div id="compenseer-en-leer" className="scroll-mt-20">
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-shoma-teal to-shoma-teal-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80"
            alt="Team planting trees"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-4 h-4 text-shoma-terracotta-light" aria-hidden="true" />
              <span className="text-sm font-medium text-white/90">Compenseer & Leer voor Bedrijven</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              CO₂ Compensatie voor uw team.
              <span className="block text-shoma-terracotta-light">Onderwijs voor Tanzania.</span>
            </h2>
            <p className="mt-6 text-xl text-white/80 leading-relaxed max-w-2xl">
              Laat medewerkers voetafdrukken compenseren door bomen te planten, terwijl onderwijs in Tanzania wordt gefinancierd. Met team-dashboard, rapportage en ESG-certificaten.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg"
              >
                Zie Pricing
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="#compenseer-contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-4 rounded-xl font-bold text-base transition-all"
              >
                Vraag Demo aan
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Features ─────────────────────────────────────────────────────────── */}
      <section className="bg-shoma-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-shoma-slate mb-4">
              Volledige team-oplossing
            </h2>
            <p className="text-lg text-shoma-slate/60 max-w-2xl mx-auto">
              Van inschrijving tot rapportage: alles wat u nodig hebt om uw team CO₂ te laten compenseren met transparantie.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-shoma-teal/10 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-shoma-teal" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-shoma-slate mb-2">{feature.title}</h3>
                  <p className="text-shoma-slate/65 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────────────────────────── */}
      <section id="pricing" className="bg-white py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-shoma-slate mb-4">
              Transparante Pricing
            </h2>
            <p className="text-lg text-shoma-slate/60 max-w-2xl mx-auto">
              Maandelijkse basis-fee + per-persoon kosten. Geen verborgen charges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.size}
                className={`relative rounded-3xl p-8 border-2 flex flex-col transition-all ${
                  tier.highlight
                    ? 'border-shoma-teal bg-gradient-to-br from-shoma-teal/5 to-white shadow-xl'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-shoma-teal text-white text-sm font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      Meest populair
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-shoma-slate mb-2">{tier.size}</h3>
                <div className="mb-6">
                  <div className="text-4xl font-extrabold text-shoma-teal">{tier.monthlyFee}</div>
                  <p className="text-sm text-shoma-slate/60 mt-1">per maand, plus {tier.perPersonFee} per persoon</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-shoma-slate/70">
                      <span className="text-shoma-teal font-bold mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#compenseer-contact"
                  className={`w-full text-center py-3 rounded-xl font-bold transition-all ${
                    tier.highlight
                      ? 'bg-shoma-teal hover:bg-shoma-teal-dark text-white'
                      : 'border-2 border-shoma-teal text-shoma-teal hover:bg-shoma-teal hover:text-white'
                  }`}
                >
                  Aan de slag
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Use Cases ────────────────────────────────────────────────────────── */}
      <section className="bg-shoma-clay py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-shoma-slate mb-4">
              Hoe bedrijven het gebruiken
            </h2>
            <p className="text-lg text-shoma-slate/60 max-w-2xl mx-auto">
              Van MVO-initiatieven tot ESG-rapportage: Compenseer & Leer past in elk bedrijfsplan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-shoma-slate mb-2">{useCase.title}</h3>
                <p className="text-shoma-slate/65 text-sm leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────────────── */}
      <section className="bg-shoma-sand py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-shoma-slate mb-4">
              Hoe het werkt
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Maak team-account',
                desc: 'Registreer uw bedrijf, voeg een beheerder toe, kies uw CO₂-scope (kantoor/reizen/custom).',
              },
              {
                step: '2',
                title: 'Nodig team uit',
                desc: 'Stuur uitnodigingslinks naar medewerkers. Zij vullen voetafdruk in, zien bomen-impact.',
              },
              {
                step: '3',
                title: 'Monitor in real-time',
                desc: 'Beheerders zien live-dashboard: hoeveel CO₂ gecompenseerd, hoeveel bomen, schoolbijdrage.',
              },
              {
                step: '4',
                title: 'Ontvang rapportage',
                desc: 'Maandelijks rapport met details, foto\'s van bomen in Tanzania, schoolupdates. Jaarlijks ESG-certificaat.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-shoma-teal text-white font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-shoma-slate mb-1">{item.title}</h3>
                  <p className="text-shoma-slate/65">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="bg-shoma-cream py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-shoma-slate mb-4">
              Veelgestelde vragen
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: 'Hoe lang duurt het om bomen te zien groeien?',
                a: 'Bomen verschijnen in uw dashboard binnen 2-3 weken na betaling. Foto\'s vanuit Tanzania: eerste update na 4-6 weken, daarna maandelijks.',
              },
              {
                q: 'Kan ik de CO₂-berekening aanpassen?',
                a: 'Ja. U kunt standaard-voetafdrukken (kantoor per persoon, reizen per km) gebruiken of uw eigen bedrijfsscope definiëren (energy, water, waste).',
              },
              {
                q: 'Hoe zit het met rapportage? Kan ik meerdere formaten krijgen?',
                a: 'Maandelijks PDF-rapport is standaard. ESG-rapportage met GRI-mapping kan op aanvraag. Custom integraties (Excel, Power BI) voor enterprise-klanten.',
              },
              {
                q: 'Is dit ESG-compliant? Kan ik het in mijn jaarverslag opnemen?',
                a: 'Ja. Uw geplante bomen zijn geverifieerd door lokale partners in Tanzania. ESG-certificaat toont CO₂-reducties en onderwijs-impact. Geschikt voor GRI, CSRD, SA8000.',
              },
              {
                q: 'Wat gebeurt er als een boom doodgaat?',
                a: 'Zeer zeldzaam (lokaal team monitort). Als voorkomen: vervanging gratis, u ontvangt melding + foto van nieuwe boom.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-shoma-slate mb-3">{item.q}</h3>
                <p className="text-shoma-slate/65 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact / Sign Up ────────────────────────────────────────────────── */}
      <section id="compenseer-contact" className="bg-shoma-clay py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-shoma-terracotta font-semibold text-sm uppercase tracking-wider mb-3">
                Aan de slag
              </p>
              <h2 className="text-3xl font-bold text-shoma-slate mb-5">
                Laat ons uw team helpen CO₂ compenseren
              </h2>
              <p className="text-shoma-slate/65 leading-relaxed mb-6">
                Vul het formulier in en we nemen binnen 24 uur contact op. We helpen u de juiste CO₂-scope te kiezen en uw team in te stellen.
              </p>
              <div className="space-y-4 text-sm">
                {[
                  'Gratis demo van het team-dashboard',
                  'Hulp bij CO₂-scope-bepaling',
                  'Custom pricing voor grote groepen',
                  'Setup-ondersteuning',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-shoma-slate/70">
                    <span className="text-shoma-teal font-bold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <CompenseerB2BForm />
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-shoma-teal to-shoma-terracotta text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Klaar om uw team CO₂ te laten compenseren?
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
            Start gratis, geen creditcard vereist. Eerste maand 50% korting.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#compenseer-contact"
              className="inline-flex items-center gap-2 bg-white text-shoma-teal hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all"
            >
              Registreer nu
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <Link
              href="/compenseer-en-leer"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-all"
            >
              Individueel Compenseer & Leer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
