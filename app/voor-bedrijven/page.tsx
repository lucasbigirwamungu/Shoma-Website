import type { Metadata } from 'next';
import Image from 'next/image';
import {
  CheckCircle, ArrowRight, BarChart3, Globe, FileText, Building2
} from 'lucide-react';
import B2BContactForm from '@/components/b2b/B2BContactForm';
import PartnerSection from '@/components/home/PartnerSection';
import CompenseerBedrijvenSections from '@/components/bedrijven/CompenseerBedrijvenSections';

export const metadata: Metadata = {
  title: 'Voor Bedrijven – MVO Partnerschap | Stichting Shoma',
  description:
    'Realiseer uw CSR-doelen met 100% transparantie. Investeer in onderwijs en schoon water in Tanzania, of laat uw team CO₂ compenseren met Compenseer & Leer. Directe SDG-bijdrage in uw duurzaamheidsrapportage.',
};

const sdgItems = [
  { sdg: 'SDG 1', label: 'Geen Armoede', color: 'bg-red-500', description: 'Scholing doorbreekt de armoedesyclus in Rubya' },
  { sdg: 'SDG 4', label: 'Kwaliteitsonderwijs', color: 'bg-yellow-500', description: 'KEMPS biedt Engels, hoogwaardig onderwijs aan 62+ kinderen' },
  { sdg: 'SDG 6', label: 'Schoon Water', color: 'bg-blue-500', description: '20.000 liter drinkwater per dag – school én gemeenschap' },
];

const tiers = [
  {
    tier: 'Tier 1',
    title: 'Klaslokaal Sponsor',
    amount: '€ 1.500,-',
    sdg: '4',
    sdgColor: 'bg-yellow-500',
    perks: [
      'Naamsvermelding op de KEMPS-school',
      'Logo op shoma.nl + sociale media',
      'Jaarlijks fotoverslag van uw lokaal',
      'SDG 4 certificaat voor uw jaarverslag',
    ],
    highlight: false,
  },
  {
    tier: 'Tier 2',
    title: 'Schoon Water Partner',
    amount: '€ 3.500,-',
    sdg: '6',
    sdgColor: 'bg-blue-500',
    perks: [
      'Naambordje op de waterinstallatie',
      'Persbericht & PR-content op maat',
      'Kwartaalupdate over waterverbruik',
      'SDG 6 certificaat + projectrapport',
      'Bezoek aan het project mogelijk',
    ],
    highlight: true,
  },
  {
    tier: 'Tier 3',
    title: 'Duurzame Energie Supporter',
    amount: '€ 2.500,-',
    sdg: '7',
    sdgColor: 'bg-yellow-400',
    perks: [
      'Logo op de solar-installatie',
      'Mediacoverage inclusief fotomateriaal',
      'Medewerkers-betrokkenheidspakket',
      'SDG 7 certificaat voor rapportage',
    ],
    highlight: false,
  },
];

const caseStudy = {
  partner: 'Stichting BAENT',
  result: '20.000 liter drinkwater per dag',
  sdg: 'SDG 6',
  description:
    'Stichting BAENT co-financierde de uitbreiding van de waterinfrastructuur op KEMPS. De opslagcapaciteit verdubbelde naar 20.000 liter en de pompcapaciteit werd drastisch vergroot. Resultaat: schoon water voor de school én de omliggende gemeenschap 24/7, commerciële waterhandelaren uitgesloten.',
};

export default function VoorBedrijvenPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="relative bg-shoma-teal-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80"
            alt="Solar energie Tanzania"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Building2 className="w-4 h-4 text-shoma-terracotta-light" aria-hidden="true" />
              <span className="text-sm font-medium text-white/90">Voor bedrijven & MVO-managers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Investeer in onderwijs en
              <span className="block text-shoma-terracotta-light">schoon water.</span>
            </h1>
            <p className="mt-5 text-xl text-white/75 leading-relaxed">
              Realiseer uw CSR-doelen met <strong className="text-white">100% transparantie</strong>: direct rapporteerbaar naar SDG 4, 6 en 7.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-7 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
              >
                Neem contact op
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#tiers"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-7 py-3.5 rounded-xl font-semibold transition-all"
              >
                Bekijk partnerschapstiers
              </a>
              <a
                href="#compenseer-en-leer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-7 py-3.5 rounded-xl font-semibold transition-all"
              >
                Compenseer & Leer voor teams
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Realiseer uw CSR-doelen: partners, tiers en ervaringen ──────────── */}
      <PartnerSection />

      {/* ─── Compenseer & Leer voor Bedrijven ────────────────────────────────── */}
      <section className="bg-shoma-sand py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-shoma-slate mb-3">
                Compenseer & Leer voor uw team
              </h2>
              <p className="text-shoma-slate/70 mb-6">
                Laat uw medewerkers hun CO₂-voetafdruk compenseren door bomen te planten in Tanzania, terwijl u gelijktijdig onderwijs financiert. Ideaal voor bedrijfsuitjes, incentives, of ESG-rapportage.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#compenseer-en-leer"
                  className="inline-flex items-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Ontdek Compenseer & Leer
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-white border-2 border-shoma-slate text-shoma-slate hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Bulk-aanbod aanvragen
                </a>
              </div>
            </div>
            <div className="w-full md:w-80 h-64 bg-white/70 rounded-3xl flex items-center justify-center border border-shoma-teal/15">
              <div className="text-center">
                <p className="font-semibold text-shoma-slate text-lg">CO₂ compensatie</p>
                <p className="text-sm text-shoma-slate/60">+ Onderwijs in Tanzania</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SDG Koppeling ───────────────────────────────────────────────────────── */}
      <section className="bg-shoma-cream py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-shoma-slate">
              Directe bijdrage aan de UN Sustainable Development Goals
            </h2>
            <p className="text-shoma-slate/55 mt-2 max-w-xl mx-auto">
              Opneembaar in uw eigen duurzaamheidsrapportage met projectbewijs en SDG-certificaat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sdgItems.map((item) => (
              <div key={item.sdg} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className={`${item.color} text-white rounded-xl px-3 py-1.5 inline-block mb-4 font-bold text-sm`}>
                  {item.sdg} – {item.label}
                </div>
                <p className="text-sm text-shoma-slate/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Waarom Shoma ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-shoma-terracotta font-semibold text-sm uppercase tracking-wider mb-3">
                Waarom Shoma?
              </p>
              <h2 className="text-3xl font-bold text-shoma-slate mb-6">
                Geen greenwashing. Bewezen resultaten.
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: BarChart3,
                    title: 'Kwantitatieve rapportage',
                    body: 'Jaarrekeningen beschikbaar vanaf 2013. Elke investering is traceerbaar naar specifieke projectuitkomsten.',
                  },
                  {
                    icon: Globe,
                    title: 'Lokale monitoring',
                    body: 'Professioneel lokaal team (Faisal, Dorothea, Erica) rapporteert direct aan het Nederlandse bestuur. Nul corruptierisico.',
                  },
                  {
                    icon: FileText,
                    title: 'Klaar voor uw verslag',
                    body: 'U ontvangt een projectrapport, SDG-certificaat en PR-content die u direct kunt opnemen in uw jaarverslag.',
                  },
                  {
                    icon: CheckCircle,
                    title: 'Onbezoldigd bestuur',
                    body: 'Alle bestuurders werken onbezoldigd en bezoeken Tanzania op eigen kosten. De jaarrekeningen laten zien waar uw budget terechtkomt.',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-shoma-teal/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-shoma-teal" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-shoma-slate">{item.title}</h3>
                        <p className="text-sm text-shoma-slate/60 mt-0.5 leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Case study */}
            <div className="bg-shoma-sand rounded-3xl p-8 border border-shoma-teal/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-shoma-teal rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BAENT</span>
                </div>
                <div>
                  <p className="font-bold text-shoma-slate">{caseStudy.partner}</p>
                  <span className="text-xs text-blue-600 font-semibold bg-blue-100 rounded-full px-2 py-0.5">
                    {caseStudy.sdg}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-shoma-teal mb-3">
                {caseStudy.result}
              </h3>
              <p className="text-sm text-shoma-slate/70 leading-relaxed">{caseStudy.description}</p>
              <div className="mt-5 pt-5 border-t border-shoma-teal/10">
                <p className="text-xs text-shoma-slate/50 italic">
                  &ldquo;Dankzij de professionele aanpak van Shoma konden wij direct bijdragen aan SDG 6.
                  Volledige transparantie over elke bestede euro.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Partnerschapstiers ──────────────────────────────────────────────────── */}
      <section id="tiers" className="bg-shoma-clay py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-shoma-slate">Partnerschapsmogelijkheden</h2>
            <p className="text-shoma-slate/55 mt-3 max-w-xl mx-auto">
              Kies het project dat het beste aansluit bij uw MVO-strategie. Alle tiers omvatten
              documentatie voor uw duurzaamheidsrapportage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.tier}
                className={`relative bg-white rounded-3xl p-7 border-2 transition-all flex flex-col ${
                  tier.highlight
                    ? 'border-shoma-teal shadow-xl shadow-shoma-teal/10 scale-[1.02]'
                    : 'border-gray-200 hover:border-shoma-teal/40 hover:shadow-md'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-shoma-teal text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      Meest gekozen
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-shoma-slate/50 uppercase tracking-wider">
                    {tier.tier}
                  </span>
                  <span className={`${tier.sdgColor} text-white text-xs font-bold rounded-md px-2 py-0.5`}>
                    SDG {tier.sdg}
                  </span>
                </div>
                <h3 className="font-bold text-shoma-slate text-xl mb-1">{tier.title}</h3>
                <p className="text-3xl font-extrabold text-shoma-teal mb-5">{tier.amount}</p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm text-shoma-slate/70">
                      <CheckCircle className="w-4 h-4 text-shoma-teal shrink-0 mt-0.5" aria-hidden="true" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                    tier.highlight
                      ? 'bg-shoma-teal hover:bg-shoma-teal-dark text-white shadow-sm'
                      : 'border-2 border-shoma-teal text-shoma-teal hover:bg-shoma-teal hover:text-white'
                  }`}
                >
                  Interesse tonen
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact formulier ────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-shoma-sand py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Tekst */}
            <div>
              <p className="text-shoma-terracotta font-semibold text-sm uppercase tracking-wider mb-3">
                Contact opnemen
              </p>
              <h2 className="text-3xl font-bold text-shoma-slate mb-5">
                Laten we kennis maken
              </h2>
              <p className="text-shoma-slate/65 leading-relaxed mb-6">
                Vul het formulier in en een bestuurslid van Stichting Shoma neemt binnen
                <strong className="text-shoma-slate"> 2 werkdagen</strong> contact op. Geen
                verplichtingen: eerst samen kijken wat past.
              </p>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-shoma-slate/70">
                  <div className="w-8 h-8 bg-shoma-teal/10 rounded-lg flex items-center justify-center">
                    <span className="text-shoma-teal font-bold text-xs">1</span>
                  </div>
                  Formulier invullen → direct doorgestuurd naar partners@shoma.nl
                </div>
                <div className="flex items-center gap-3 text-shoma-slate/70">
                  <div className="w-8 h-8 bg-shoma-teal/10 rounded-lg flex items-center justify-center">
                    <span className="text-shoma-teal font-bold text-xs">2</span>
                  </div>
                  Eerste gesprek: uw MVO-doelen × onze projecten afstemmen
                </div>
                <div className="flex items-center gap-3 text-shoma-slate/70">
                  <div className="w-8 h-8 bg-shoma-teal/10 rounded-lg flex items-center justify-center">
                    <span className="text-shoma-teal font-bold text-xs">3</span>
                  </div>
                  Partnercontract + SDG-documentatiepakket
                </div>
              </div>
              <div className="mt-8 p-5 bg-white rounded-2xl border border-shoma-teal/10">
                <p className="text-sm font-medium text-shoma-slate mb-1">Direct bellen?</p>
                <p className="text-xs text-shoma-slate/55">
                  Stuur een e-mail naar{' '}
                  <a href="mailto:partners@shoma.nl" className="text-shoma-teal hover:underline font-medium">
                    partners@shoma.nl
                  </a>{' '}
                  met uw telefoonnummer en gewenste belmoment.
                </p>
              </div>
            </div>

            {/* Formulier */}
            <B2BContactForm />
          </div>
        </div>
      </section>

      {/* ─── Compenseer & Leer (Bedrijven): features, pricing, FAQ en aanmelden ─ */}
      <CompenseerBedrijvenSections />
    </div>
  );
}
