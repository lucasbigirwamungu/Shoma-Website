/**
 * Complete newsletter database for Stichting Shoma
 * All 26 newsletters from 2012-2026
 * Source: shoma.nl/nieuwsbrieven/
 */

export interface Newsletter {
  id: number;
  date: string;
  month: string;
  year: number;
  title: string;
  summary: string;
  url: string;
  category: 'Nieuws' | 'Update' | 'Jaarverslag';
  highlight?: boolean; // True for main page featured items
}

export const allNewsletters: Newsletter[] = [
  // 2026
  {
    id: 26,
    date: 'September 2026',
    month: 'September',
    year: 2026,
    title: 'Nieuwsbrief september 2026',
    summary: 'De mooiste mijlpalen van de afgelopen periode op KEMPS: een nieuw ICT-lokaal met 40 laptops dankzij het Baarns Lyceum, stagiaires van de Hanzehogeschool, de Sinterklaasactie voor nieuwe speeltoestellen en verbeterde infrastructuur rond de school.',
    url: 'https://www.shoma.nl/algemeen/nieuwsbrief-september-2026/',
    category: 'Nieuws',
  },
  {
    id: 25,
    date: 'April 2026',
    month: 'April',
    year: 2026,
    title: 'Nieuwsbrief april 2026',
    summary: 'De nieuwsbrief van april 2026, als mosterd na de maaltijd alsnog gepubliceerd.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-april-2026/',
    category: 'Nieuws',
  },
  // 2025
  {
    id: 24,
    date: 'December 2025',
    month: 'December',
    year: 2025,
    title: 'Nieuwsbrief december 2025',
    summary: 'In de nieuwsbrief van Shoma van december vindt u weer mooie berichten.',
    url: 'https://www.shoma.nl/algemeen/in-de-nieuwsbrief-van-shoma-van-december-vindt-u-weer-mooie-berichten/',
    category: 'Nieuws',
  },
  {
    id: 1,
    date: 'Oktober 2025',
    month: 'Oktober',
    year: 2025,
    title: 'Nieuwsbrief oktober 2025',
    summary: 'Het najaar brengt nieuwe ontwikkelingen in ons onderwijs- en waterproject. Lees over de voortgang van onze initiatieven in Rubya.',
    url: 'https://www.shoma.nl/algemeen/de-nieuwsbrief-oktober-2025-is-uit/',
    category: 'Nieuws',
    highlight: true,
  },
  // 2024
  {
    id: 2,
    date: 'April 2024',
    month: 'April',
    year: 2024,
    title: 'Nieuwsbrief April 2024',
    summary: 'Voorjaarsupdate met de laatste berichten van onze partners in Tanzania. Ontdek wat er is bereikt dit kwartaal.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-shoma-april-2024/',
    category: 'Nieuws',
    highlight: true,
  },
  // 2022
  {
    id: 3,
    date: 'Juni 2022',
    month: 'Juni',
    year: 2022,
    title: 'Nieuwsbrief Juni 2022',
    summary: 'Zomernieuwsbrief met hoogtepunten van het schooljaar en plannen voor de toekomst.',
    url: 'https://www.shoma.nl/nieuwsbrieven/de-nieuwsbrief-van-juni-2022-is-uit/',
    category: 'Nieuws',
    highlight: true,
  },
  {
    id: 4,
    date: 'Januari 2022',
    month: 'Januari',
    year: 2022,
    title: 'Eerste nieuwsbrief van 2022',
    summary: 'Start van het jaar met nieuwe doelstellingen en plannen voor onderwijs en watervoorziening.',
    url: 'https://www.shoma.nl/nieuwsbrieven/de-eerste-nieuwsbrief-van-2022-is-uit/',
    category: 'Nieuws',
  },
  // 2021
  {
    id: 5,
    date: 'September 2021',
    month: 'September',
    year: 2021,
    title: 'Nieuwsbrief September 2021',
    summary: 'Herfstupdates over de voortgang van schoolprojecten na het coronajaar.',
    url: 'https://www.shoma.nl/algemeen/de-niewsbrief-van-september-2021-is-uit/',
    category: 'Nieuws',
  },
  // 2019
  {
    id: 6,
    date: 'September 2019',
    month: 'September',
    year: 2019,
    title: 'Nieuwsbrief September 2019',
    summary: 'Najaarsbericht met ontwikkelingen in onderwijs en gemeenschapsprojecten in Rubya.',
    url: 'https://www.shoma.nl/algemeen/nieuwsbrief-september-2019-is-uit/',
    category: 'Nieuws',
  },
  {
    id: 7,
    date: 'Januari 2019',
    month: 'Januari',
    year: 2019,
    title: 'Nieuwsbrief 2019 - Nummer 1',
    summary: 'Eerste nieuwsbrief van 2019 met updates van ons team in Tanzania.',
    url: 'https://www.shoma.nl/algemeen/nieuwsbrief-2019-nummer-1/',
    category: 'Nieuws',
  },
  // 2018
  {
    id: 8,
    date: 'December 2018',
    month: 'December',
    year: 2018,
    title: 'Jaarsluitende Nieuwsbrief December 2018',
    summary: 'Laatste nieuwsbrief van het jaar met overzicht van de belangrijkste ontwikkelingen.',
    url: 'https://www.shoma.nl/algemeen/in-deze-laatste-nieuwsbrief-van-dit-jaar-geven-we-u-een-overzicht-van-de-laatste-ontwikkelingen/',
    category: 'Nieuws',
  },
  {
    id: 9,
    date: 'Juni 2018',
    month: 'Juni',
    year: 2018,
    title: 'Nieuwsbrief Juni 2018',
    summary: 'Eerste nieuwsbrief van 2018 met updates over schoolontwikkelingen.',
    url: 'https://www.shoma.nl/algemeen/de-eerste-nieuwsbrief-van-2018-staat-op-de-site/',
    category: 'Nieuws',
  },
  {
    id: 10,
    date: 'Mei 2018',
    month: 'Mei',
    year: 2018,
    title: 'Nieuwsbrief Mei 2018',
    summary: 'Voorjaarsupdate met de laatste berichten vanuit Rubya.',
    url: 'https://www.shoma.nl/algemeen/de-nieuwsbrief-van-mei-2018/',
    category: 'Nieuws',
  },
  // 2017
  {
    id: 11,
    date: 'December 2017',
    month: 'December',
    year: 2017,
    title: 'Nieuwsbrief December 2017',
    summary: 'Jaarsluitende brief met terugblik op 2017 en vooruitkijk naar 2018.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-december-is-uit/',
    category: 'Nieuws',
  },
  {
    id: 12,
    date: 'Mei 2017',
    month: 'Mei',
    year: 2017,
    title: 'Nieuwsbrief Mei 2017',
    summary: 'Lente-update met voortgang van onderwijsprojecten.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-mei-2017/',
    category: 'Nieuws',
  },
  {
    id: 13,
    date: 'Februari 2017',
    month: 'Februari',
    year: 2017,
    title: 'Nieuwsbrief Februari 2017 (met Jaarverslag 2016)',
    summary: 'Nieuwsbrief en jaarverslag 2016 met volledige financieel overzicht.',
    url: 'https://www.shoma.nl/algemeen/nieuwsbrief-februari-2017-tevens-jaarverslag-2016/',
    category: 'Jaarverslag',
  },
  // 2016
  {
    id: 14,
    date: 'Oktober 2016',
    month: 'Oktober',
    year: 2016,
    title: 'Nieuwsbrief Oktober 2016',
    summary: 'Herfstupdate met voortgang van onderwijs- en infrastructuurprojecten.',
    url: 'https://www.shoma.nl/algemeen/nieuwsbrief-oktober-2016/',
    category: 'Nieuws',
  },
  {
    id: 15,
    date: 'Februari 2016',
    month: 'Februari',
    year: 2016,
    title: 'Nieuwsbrief Februari 2016',
    summary: 'Winternieuwsbrief met jaarlijkse voortgangsrapport.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-februari-2016-2/',
    category: 'Nieuws',
  },
  // 2015
  {
    id: 16,
    date: 'Juli 2015',
    month: 'Juli',
    year: 2015,
    title: 'Nieuwsbrief Juli 2015',
    summary: 'Zomernieuwsbrief met updates van het schooljaar.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-juli-2015/',
    category: 'Nieuws',
  },
  {
    id: 17,
    date: 'April 2015',
    month: 'April',
    year: 2015,
    title: 'Nieuwsbrief April 2015',
    summary: 'Voorjaarsupdate met voortgang van onderwijs- en waterprojecten.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-april-2015/',
    category: 'Nieuws',
  },
  // 2014
  {
    id: 18,
    date: 'Oktober 2014',
    month: 'Oktober',
    year: 2014,
    title: 'Nieuwsbrief Oktober 2014',
    summary: 'Herfstbericht met schoolupdates en ontwikkelingen in Rubya.',
    url: 'https://www.shoma.nl/algemeen/nieuwsbrief-oktober-2014-2/',
    category: 'Nieuws',
  },
  {
    id: 19,
    date: 'Februari 2014',
    month: 'Februari',
    year: 2014,
    title: 'Nieuwsbrief Februari 2014',
    summary: 'Winternieuwsbrief met jaarlijkse voortgangsrapport.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-februari-2014/',
    category: 'Nieuws',
  },
  // 2013
  {
    id: 20,
    date: 'December 2013',
    month: 'December',
    year: 2013,
    title: 'Nieuwsbrief December 2013',
    summary: 'Jaarsluitende nieuwsbrief met terugblik op 2013.',
    url: 'https://www.shoma.nl/algemeen/nieuwsbrief-december-2013/',
    category: 'Nieuws',
  },
  {
    id: 21,
    date: 'Januari 2013',
    month: 'Januari',
    year: 2013,
    title: 'Nieuwsbrief Januari 2013',
    summary: 'Nieuwjaarsbrief met plannen voor 2013.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-voorbeeld/',
    category: 'Nieuws',
  },
  // 2012
  {
    id: 22,
    date: 'Juni 2012',
    month: 'Juni',
    year: 2012,
    title: 'Nieuwsbrief Juni 2012',
    summary: 'Zomernieuwsbrief met updates van het schooljaar.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-juni-2012/',
    category: 'Nieuws',
  },
  {
    id: 23,
    date: 'Januari 2012',
    month: 'Januari',
    year: 2012,
    title: 'Nieuwsbrief Januari 2012',
    summary: 'Eerste nieuwsbrief van 2012 met nieuwe initiatieven.',
    url: 'https://www.shoma.nl/nieuwsbrieven/nieuwsbrief-januari-2012/',
    category: 'Nieuws',
  },
];

/**
 * Groepeer nieuwsbrieven per jaar
 */
export function groupNewslettersByYear(newsletters: Newsletter[]) {
  const grouped = new Map<number, Newsletter[]>();

  newsletters.forEach((nl) => {
    if (!grouped.has(nl.year)) {
      grouped.set(nl.year, []);
    }
    grouped.get(nl.year)!.push(nl);
  });

  // Sorteer per jaar (recent first)
  return new Map([...grouped.entries()].sort((a, b) => b[0] - a[0]));
}

/**
 * Get featured newsletters for main page (first 3)
 */
export function getFeaturedNewsletters(): Newsletter[] {
  return allNewsletters.filter((nl) => nl.highlight).slice(0, 3);
}

/**
 * Get archived newsletters (after featured)
 */
export function getArchivedNewsletters(): Newsletter[] {
  const featured = getFeaturedNewsletters();
  return allNewsletters.filter((nl) => !featured.includes(nl));
}
