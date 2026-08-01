import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, ExternalLink, Users, Heart, FileText, BadgeCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Over Ons – Stichting Shoma',
  description:
    'Leer meer over Stichting Shoma: onze oprichting in 2005, het onbezoldigde bestuur, ANBI-status en 20 jaar jaarrekeningen.',
};

const boardMembers = [
  { name: 'Frank Bigirwamungu', role: 'Voorzitter' },
  { name: 'Ton Bargeman', role: 'Penningmeester' },
  { name: 'Pytrik Gerbrandy', role: 'Onderwijs & PR' },
  { name: 'Inger van Bruggen', role: 'Onderwijs & PR' },
  { name: 'Alwin Docter', role: 'Technisch' },
  { name: 'Jaap van Bruggen', role: 'Technisch' },
];

const ambassadors = [
  { name: 'Jaap Bargeman', role: 'Ambassadeur' },
  { name: 'Jellie Bargeman', role: 'Ambassadeur' },
];

const localTeam = [
  { name: 'Faisal Katela', role: 'Lokale coördinator Tanzania' },
  { name: 'Dorothea Laurenti', role: 'Lokale coördinator Tanzania' },
  { name: 'Erica Frank', role: 'Lokale coördinator Tanzania' },
];

// Jaarrekeningen — alles beschikbaar
const annualReports = [
  {
    year: 2025,
    docs: [
      { label: 'Rapport 2024', href: '/jaarrekeningen/2025-01-19-Rapport-inzake-de-jaarrekening-2024.pdf' },
      { label: 'Financieel verslag', href: '/jaarrekeningen/Financieel-jaarverslag-Shoma-2025.pdf' },
    ],
  },
  {
    year: 2024,
    docs: [
      { label: 'Financieel verslag 2023', href: '/jaarrekeningen/2024-01-01-financieel-verslag-2023-stichting-Shoma.pdf' },
      { label: 'Rapport 2023', href: '/jaarrekeningen/2024-01-06-Rapport-inzake-de-jaarrekening-2023.pdf' },
    ],
  },
  {
    year: 2023,
    docs: [
      { label: 'Rapport 2022', href: '/jaarrekeningen/Rapport-inzake-de-jaarrekening-2022.pdf' },
    ],
  },
  {
    year: 2022,
    docs: [
      { label: 'Rapport 2025', href: '/jaarrekeningen/Rapport-inzake-de-jaarrekening-2025.pdf' },
    ],
  },
  {
    year: 2021,
    docs: [
      { label: 'Jaarrekening', href: '/jaarrekeningen/Jaarrekening-2021.pdf' },
      { label: 'Financieel verslag', href: '/jaarrekeningen/Financieel-verslag-2021.pdf' },
    ],
  },
  {
    year: 2020,
    docs: [
      { label: 'Jaarrekening', href: '/jaarrekeningen/Jaarrekening-Stichting-Shoma-2020.pdf' },
      { label: 'Financieel verslag', href: '/jaarrekeningen/2021-01-05-fianancieel-verslag-2020.pdf' },
    ],
  },
  {
    year: 2019,
    docs: [
      { label: 'Jaarrekening', href: '/jaarrekeningen/jaarrekening-shoma-2019.pdf' },
      { label: 'Jaarrekening (alt)', href: '/jaarrekeningen/2019-03-01-jaarrekening-2018.pdf' },
    ],
  },
  {
    year: 2018,
    docs: [
      { label: 'Jaarrekening', href: '/jaarrekeningen/Jaarrekening-2018-getekend.pdf' },
    ],
  },
  {
    year: 2017,
    docs: [
      { label: 'Jaarrekening', href: '/jaarrekeningen/jaarrekening-Shoma-2017.pdf' },
    ],
  },
  {
    year: 2016,
    docs: [
      { label: 'Jaarrekening', href: '/jaarrekeningen/Jaarrekening-Shoma-2016.pdf' },
    ],
  },
  {
    year: 2015,
    docs: [
      { label: 'Jaarrekening', href: '/jaarrekeningen/Jaarrekening2015Stichting-Onderwijsbevordering-N-W-Tanzania-2015CWNL1.pdf' },
    ],
  },
  {
    year: 2014,
    docs: [
      { label: 'Jaarrekening', href: '/jaarrekeningen/Jaarrekening_2014_Stichting_Onderwijsbevordering_Noord-West_Tanzania.pdf' },
    ],
  },
  {
    year: 2013,
    docs: [
      { label: 'Jaarrekening', href: '/jaarrekeningen/Jaarrekening_2013_Stichting_Onderwijsbevordering_Noord-West_Tanzania.pdf' },
      { label: 'Financieel verslag', href: '/jaarrekeningen/2013-09-11-financieel-jaarverslag-def.pdf' },
      { label: 'Jaarverslag (activiteiten)', href: '/jaarrekeningen/2014_0725-definitief-jaarverslag-2013.pdf' },
    ],
  },
];

export default function OverOnsPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-shoma-teal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Over Stichting Shoma</h1>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            Opgericht vanuit een persoonlijke verbinding. Gedreven door transparantie.
            Meer dan 20 jaar onderwijs bevordering in Rubya, Tanzania.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* Oprichtverhaal */}
        <section>
          <h2 className="text-2xl font-bold text-shoma-slate mb-6">Ons verhaal</h2>
          <div className="bg-shoma-sand rounded-3xl p-8 border border-shoma-teal/10">
            {/* "Shoma" betekenis */}
            <div className="inline-flex items-center gap-3 bg-shoma-teal/10 rounded-2xl px-5 py-3 mb-6">
              <span className="text-2xl font-extrabold text-shoma-teal">Shoma</span>
              <span className="text-shoma-slate/60 text-sm">is het Kihaya-woord voor</span>
              <span className="text-lg font-bold text-shoma-terracotta-dark">&ldquo;onderwijs&rdquo;</span>
            </div>
            <p className="text-shoma-slate/75 leading-relaxed mb-4">
              Stichting Shoma is in <strong className="text-shoma-slate">2005</strong> opgericht
              na een persoonlijk bezoek van een groep Nederlanders aan Rubya in augustus 2004,
              ter gelegenheid van het huwelijk van Frank Bigirwamungu — geboren in Rubya — en
              Marloes Bargeman, die er in 2000 als coassistent in het plaatselijke ziekenhuis
              werkte.
            </p>
            <p className="text-shoma-slate/75 leading-relaxed mb-4">
              Rubya ligt in het noordwesten van Tanzania nabij het Victoriameer. De bevolking
              leeft grotendeels van kleinschalige landbouw en is sterk afhankelijk van volatiele
              wereldmarktprijzen. Door de impact van HIV/AIDS is er een onevenredig grote groep
              weeskinderen die zonder steun niet naar school kunnen.
            </p>
            <p className="text-shoma-slate/75 leading-relaxed mb-4">
              Hoewel de Tanzaniaanse overheid stelt dat basisonderwijs gratis is, verplichten
              scholen gezinnen tot bijdragen voor uniformen, onderhoud en leermaterialen
              — oplopend tot €35 à €40 per jaar. Voor arme gezinnen en wezen is dit een
              onneembare barrière. Stichting Shoma doorbreekt die barrière.
            </p>
            <p className="text-shoma-slate/75 leading-relaxed">
              Wij geloven dat onderwijs de sleutel is tot een betere toekomst. Onze aanpak:
              onderwijs toegankelijk maken, leefomstandigheden verbeteren en lokale samenwerking
              stimuleren — volledig gerund door vrijwilligers in Nederland en Tanzania.
            </p>
          </div>
        </section>

        {/* ─── Fiscaal Aftrekbaar Banner ──────────────────────────────────────── */}
        <section id="fiscaal">
          <div className="bg-gradient-to-r from-shoma-terracotta to-shoma-terracotta-dark rounded-3xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <BadgeCheck className="w-9 h-9 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">
                  Uw donatie is fiscaal aftrekbaar
                </h2>
                <p className="text-white/85 leading-relaxed text-lg mb-3">
                  Stichting Shoma is erkend als <strong>ANBI (Algemeen Nut Beogende Instelling)</strong>{' '}
                  door de Nederlandse Belastingdienst. Dit betekent dat u uw donaties kunt
                  aftrekken van uw inkomstenbelasting.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="bg-white/15 rounded-xl px-4 py-2.5 text-sm font-medium">
                    Gewone gift: aftrekbaar boven de drempel
                  </div>
                  <div className="bg-white/15 rounded-xl px-4 py-2.5 text-sm font-medium">
                    Periodieke gift: 100% aftrekbaar (5 jaar)
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <a
                  href="https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/kosten-voor-anbi-aftrekken-als-gift"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm whitespace-nowrap"
                >
                  <FileText className="w-4 h-4" />
                  Meer info fiscale aftrek →
                </a>
              </div>
            </div>

            {/* ANBI gegevens in de banner */}
            <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'RSIN', value: '814390249' },
                { label: 'IBAN', value: 'NL55 ABNA 0501 3541 58' },
                { label: 'Status', value: 'ANBI erkend' },
                { label: 'Bestuursbeloning', value: 'Volledig onbezoldigd' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">{item.label}</p>
                  <p className="font-semibold text-white text-sm mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ANBI gegevens volledig */}
        <section id="anbi">
          <h2 className="text-2xl font-bold text-shoma-slate mb-6">ANBI-gegevens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Officiële naam', value: 'Stichting Onderwijsbevordering Noordwest Tanzania' },
              { label: 'Handelsnaam', value: 'Stichting Shoma' },
              { label: 'RSIN / Fiscaal nummer', value: '814390249' },
              { label: 'IBAN', value: 'NL55 ABNA 0501 3541 58' },
              { label: 'Status', value: 'ANBI erkend (Algemeen Nut Beogende Instelling)' },
              { label: 'Bestuursbeloning', value: 'Geen (volledig onbezoldigd)' },
              { label: 'Overhead', value: '0% — operationele kosten extern gesponsord' },
              { label: 'Bezoeken Tanzania', value: 'Op eigen kosten van bestuurders en vrijwilligers' },
            ].map((item) => (
              <div key={item.label} className="bg-shoma-sand rounded-xl p-4 border border-shoma-teal/10">
                <p className="text-xs font-semibold text-shoma-teal uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="font-medium text-shoma-slate text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          {/* Fiscale aftrek uitleg */}
          <div className="mt-5 bg-shoma-sand border border-shoma-terracotta/20 rounded-2xl p-5 flex items-start gap-4">
            <span className="text-2xl">📄</span>
            <div>
              <p className="font-semibold text-shoma-terracotta-dark mb-1">Wilt u meer informatie over de fiscale aftrek?</p>
              <p className="text-sm text-shoma-slate/70 leading-relaxed">
                Als ANBI-instelling kunt u uw donatie aan Stichting Shoma aftrekken van uw
                inkomstenbelasting. Bij een periodieke schenking (5 jaar vastgelegd via een
                schenkingsovereenkomst) is de volledige gift aftrekbaar zonder drempel.
              </p>
              <a
                href="https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/kosten-voor-anbi-aftrekken-als-gift"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-shoma-terracotta font-semibold text-sm hover:text-shoma-terracotta-dark underline underline-offset-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Klik hier voor meer informatie over de fiscale aftrek
              </a>
            </div>
          </div>
        </section>

        {/* Bestuur */}
        <section id="bestuur">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-shoma-teal" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-shoma-slate">Bestuur Nederland</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {boardMembers.map((member) => (
              <div key={member.name} className="bg-shoma-sand rounded-xl p-4 text-center border border-shoma-teal/10">
                <div className="w-10 h-10 bg-shoma-teal rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-sm">
                    {member.name.split(' ').pop()?.charAt(0)}
                  </span>
                </div>
                <p className="font-semibold text-shoma-slate text-xs leading-tight">{member.name}</p>
                <p className="text-xs text-shoma-teal mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Ambassadeurs */}
          <div className="flex items-center gap-3 mb-3 mt-2">
            <span className="text-base font-semibold text-shoma-slate/70">Ambassadeurs</span>
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            {ambassadors.map((a) => (
              <div key={a.name} className="flex items-center gap-2 bg-shoma-sand/60 border border-shoma-teal/10 rounded-xl px-4 py-2">
                <div className="w-7 h-7 bg-shoma-terracotta/20 rounded-full flex items-center justify-center">
                  <span className="text-shoma-terracotta-dark font-bold text-xs">{a.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-shoma-slate text-xs">{a.name}</p>
                  <p className="text-xs text-shoma-slate/45">{a.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-shoma-terracotta" aria-hidden="true" />
            <h3 className="text-lg font-bold text-shoma-slate">Lokaal team Tanzania</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {localTeam.map((member) => (
              <div key={member.name} className="bg-shoma-sand rounded-xl p-4 flex items-center gap-3 border border-shoma-teal/10">
                <div className="w-9 h-9 bg-shoma-terracotta rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">{member.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-shoma-slate text-sm">{member.name}</p>
                  <p className="text-xs text-shoma-slate/55">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jaarrekeningen */}
        <section id="jaarrekeningen">
          <h2 className="text-2xl font-bold text-shoma-slate mb-2">
            Jaarrekeningen 2013–2025
          </h2>
          <p className="text-shoma-slate/55 mb-6">
            De meest recente jaarrekeningen zijn direct downloadbaar als PDF. Oudere versies worden
            op aanvraag beschikbaar gesteld.
          </p>

          {/* 2025 — echte bestanden */}
          <div className="bg-shoma-sand rounded-2xl p-5 border border-shoma-teal/15 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold bg-shoma-teal text-white rounded-full px-2.5 py-0.5">Nieuw</span>
              <span className="font-semibold text-shoma-slate">Jaarrekening 2025</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {annualReports[0].docs.map((doc) => (
                <a
                  key={doc.href}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-shoma-teal hover:text-white text-shoma-slate border border-shoma-teal/20 hover:border-shoma-teal rounded-xl px-4 py-2.5 text-sm font-medium transition-all group"
                >
                  <Download className="w-3.5 h-3.5 text-shoma-teal group-hover:text-white" aria-hidden="true" />
                  {doc.label}
                </a>
              ))}
            </div>
          </div>

          {/* Overige jaren */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2">
            {annualReports.slice(1).map(({ year }) => (
              <div
                key={year}
                className="flex items-center justify-between bg-shoma-sand/60 rounded-xl px-3 py-2.5 text-shoma-slate/50 text-sm border border-transparent cursor-default"
                title="Beschikbaar op aanvraag — info@shoma.nl"
              >
                <span className="font-medium">{year}</span>
                <Download className="w-3 h-3 opacity-30" aria-hidden="true" />
              </div>
            ))}
          </div>
          <p className="text-xs text-shoma-slate/40 mt-3">
            Jaarrekeningen 2013–2024 zijn beschikbaar op aanvraag via{' '}
            <a href="mailto:info@shoma.nl" className="underline hover:text-shoma-teal">info@shoma.nl</a>.
          </p>
        </section>

        {/* Beleidsplan */}
        <section id="beleidsplan">
          <h2 className="text-2xl font-bold text-shoma-slate mb-2">
            Beleidsplan 2026–2028
          </h2>
          <p className="text-shoma-slate/55 mb-6 text-sm">
            Een nieuw bestuur, een nieuw beleidsplan. Shoma richt zich de komende jaren op
            groei en zelfredzaamheid van de gemeenschap in Rubya.
          </p>

          {/* Speerpunten */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { icon: null, title: 'ICT-lokaal', desc: 'Laptops voor 187 leerlingen — digitale vaardigheden als basis voor de toekomst' },
              { icon: null, title: 'Landbouwproject', desc: 'Irrigatiesysteem en moestuin voor eigen schoolinkomsten, ouders betrokken' },
              { icon: null, title: 'Zonne-energie', desc: 'Vervanging batterijen zonne-energie-installatie voor doorlopende stroomvoorziening' },
              { icon: null, title: 'Universitaire beurzen', desc: 'Financiële steun voor talentvolle leerlingen die de universiteit willen bereiken' },
              { icon: null, title: 'Vruchtbomen', desc: 'Aanplant vruchtbomen voor structureel eigen schoolinkomen op lange termijn' },
              { icon: null, title: 'Vermogen 2025', desc: 'Stichtingsvermogen gegroeid naar €21.188 — solide basis voor de komende periode' },
            ].map((item) => (
              <div key={item.title} className="bg-shoma-sand rounded-xl p-4 flex gap-3 border border-shoma-teal/10">
                {item.icon && <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>}
                <div>
                  <p className="font-semibold text-shoma-slate text-sm">{item.title}</p>
                  <p className="text-xs text-shoma-slate/55 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Beleidsplan 2026–2028',
                desc: 'Strategisch beleid: consolidatie, kwaliteitsversterking en lokale zelfredzaamheid.',
                href: '/documenten/beleidsplan-2026-2028.pdf',
              },
              {
                title: 'Investerings- en dekkingsplan 2026',
                desc: 'Gedetailleerde projectbegroting: ICT-lokaal, bewakersloge, moestuin & irrigatie.',
                href: '/documenten/investering-dekkingsplan-2026.pdf',
              },
              {
                title: 'Beleidsplan 2023–2025',
                desc: 'Vorig beleidsplan, ter archief.',
                href: '/documenten/Beleidsplan-2023-2025.pdf',
              },
              {
                title: 'Beleidsplan 2021–2023',
                desc: 'Ouder beleidsplan, ter archief.',
                href: '/documenten/beleidsplan-shoma-2021-2023.pdf',
              },
              {
                title: 'ANBI standaardformulier publicatieplicht',
                desc: 'Wettelijk verplichte ANBI-publicatie, RSIN 814390249.',
                href: '/documenten/2021-06-19-standaardform-pubplicht-anbi-algemeen-ib1101z2fol.pdf',
              },
            ].map((doc) => (
              <div
                key={doc.title}
                className="bg-shoma-sand rounded-2xl p-5 border border-shoma-teal/10 flex items-center justify-between gap-4 flex-wrap"
              >
                <div>
                  <p className="font-medium text-shoma-slate">{doc.title}</p>
                  <p className="text-sm text-shoma-slate/55 mt-0.5">{doc.desc}</p>
                </div>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-shoma-teal hover:bg-shoma-teal-dark text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shrink-0"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Statuten */}
        <section id="statuten">
          <h2 className="text-2xl font-bold text-shoma-slate mb-4">Statuten</h2>
          <div className="bg-shoma-sand rounded-2xl p-6 border border-shoma-teal/10 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-medium text-shoma-slate">Statutenwijziging Stichting Shoma 2025</p>
              <p className="text-sm text-shoma-slate/55 mt-0.5">
                Addendum op de statuten (concept juli 2025) — inclusief nieuw artikel 6 lid 8
                over tegenstrijdig belang. KvK-nummer: 04076887.
              </p>
              <p className="text-xs text-amber-600 mt-1.5 font-medium">
                ⚠ Concept — nog niet definitief gepasseerd bij de notaris
              </p>
            </div>
            <a
              href="/documenten/statuten-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-shoma-teal hover:bg-shoma-teal-dark text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download Statuten
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-shoma-teal rounded-3xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Overtuigd? Steun ons dan.</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Met alle administratie transparant op tafel kunt u met volle vertrouwen doneren.
            Elke euro gaat direct naar een kind in Rubya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/doneren"
              className="inline-flex items-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-7 py-3.5 rounded-xl font-semibold transition-all"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              Doneer nu
            </Link>
            <Link
              href="/voor-bedrijven"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-7 py-3.5 rounded-xl font-semibold transition-all"
            >
              Zakelijk samenwerken
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
