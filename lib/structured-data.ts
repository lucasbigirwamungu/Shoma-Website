// Schema.org JSON-LD, zodat zoekmachines en AI-agents de stichting eenduidig kunnen herkennen
import { siteUrl } from '@/lib/site-url';
import { ORGANIZATION } from '@/lib/organization';

const ORG_ID = `${siteUrl}/#organization`;
const SITE_ID = `${siteUrl}/#website`;

export function organizationSchema() {
  return {
    '@type': 'NGO',
    '@id': ORG_ID,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    alternateName: 'Shoma',
    url: siteUrl,
    logo: `${siteUrl}/shoma-logo-transparent.png`,
    image: `${siteUrl}/images/hero-kemps.jpg`,
    description: ORGANIZATION.description,
    foundingDate: String(ORGANIZATION.foundingYear),
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    taxID: ORGANIZATION.rsin,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'KvK', value: ORGANIZATION.kvk },
      { '@type': 'PropertyValue', propertyID: 'RSIN', value: ORGANIZATION.rsin },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORGANIZATION.address.street,
      postalCode: ORGANIZATION.address.postalCode,
      addressLocality: ORGANIZATION.address.city,
      addressCountry: ORGANIZATION.address.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: ORGANIZATION.email,
        telephone: ORGANIZATION.telephone,
        availableLanguage: ['nl', 'en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'partnerships',
        email: ORGANIZATION.partnerEmail,
        availableLanguage: ['nl', 'en'],
      },
    ],
    areaServed: { '@type': 'Place', name: ORGANIZATION.areaServed },
    knowsAbout: ['Onderwijs in Tanzania', 'Schoolsponsoring', 'Schoon drinkwater', 'Zonne-energie', 'CO₂-compensatie'],
    sameAs: [ORGANIZATION.legacySite],
  };
}

function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: siteUrl,
    name: ORGANIZATION.name,
    inLanguage: 'nl-NL',
    publisher: { '@id': ORG_ID },
  };
}

export function homeJsonLd() {
  return { '@context': 'https://schema.org', '@graph': [organizationSchema(), websiteSchema()] };
}

export function pageJsonLd(type: 'AboutPage' | 'ContactPage', path: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': type,
        '@id': `${siteUrl}${path}`,
        url: `${siteUrl}${path}`,
        name,
        inLanguage: 'nl-NL',
        isPartOf: { '@id': SITE_ID },
        about: { '@id': ORG_ID },
      },
    ],
  };
}

// '<' escapen voorkomt dat tekst in de data de script-tag kan sluiten
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
