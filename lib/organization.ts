// Vaste organisatiegegevens, gedeeld door JSON-LD, de Markdown-weergave, llms.txt en de MCP-server.
// Gelijk houden aan app/contact/page.tsx en de ANBI-gegevens op /over-ons.
export const ORGANIZATION = {
  name: 'Stichting Shoma',
  legalName: 'Stichting Onderwijsbevordering Noordwest Tanzania',
  foundingYear: 2005,
  description:
    'Stichting Shoma bevordert onderwijs voor kansarme kinderen in Rubya, Noordwest-Tanzania. ANBI erkend, onbezoldigd bestuur en openbare jaarrekeningen.',
  address: {
    street: 'Beekforelstraat 17',
    postalCode: '7559 HC',
    city: 'Hengelo',
    country: 'NL',
  },
  email: 'info@shoma.nl',
  partnerEmail: 'secretariaat@shoma.nl',
  telephone: '+31624225497',
  telephoneDisplay: '+31 (0) 6 24 22 54 97',
  kvk: '04076887',
  rsin: '814390249',
  iban: 'NL55 ABNA 0501 3541 58',
  legacySite: 'https://www.shoma.nl',
  areaServed: 'Rubya, Kagera, Tanzania',
} as const;

// Sponsorbedragen zoals op /, /projecten en /doneren
export const SPONSOR_TIERS = [
  { id: 'regular', label: 'Regulier onderwijs (overheidsschool)', amount: '€40 per kind per jaar', donateUrl: '/doneren?type=regular' },
  { id: 'kemps', label: 'KEMPS Engelstalig onderwijs', amount: '€350 per kind per jaar (of €30 per maand)', donateUrl: '/doneren?type=kemps' },
] as const;

// Partnerschapstiers zoals op /voor-bedrijven
export const PARTNER_TIERS = [
  { label: 'Slaapzaal voor 40 leerlingen', sdg: 'SDG 4', amount: '€1.500' },
  { label: 'Schoon Water Partner', sdg: 'SDG 6', amount: '€3.500' },
  { label: 'Duurzame Energie Supporter', sdg: 'SDG 7', amount: '€2.500' },
] as const;
