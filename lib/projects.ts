import type { Project } from '@/types';

// ─── Statische projectdata ────────────────────────────────────────────────────
// In een latere fase koppelen we dit aan de Supabase projects-tabel.
// De id's matchen de seeded UUID-waardes (of worden dynamisch geladen).

export const PROJECTS: Project[] = [
  {
    id: 'project-education',
    slug: 'kemps-basisschool',
    title: 'KEMPS Basisschool',
    category: 'education',
    summary: 'Kwalitatief Engelstalig basisonderwijs als sleutel naar een betere toekomst',
    description:
      'De Kashasha English Medium Primary School (KEMPS) is in 2016 gestart met 13 leerlingen en telt nu 257 leerlingen. De school biedt hoogwaardig onderwijs in het Engels – de voertaal van het Tanzaniaanse vervolgonderwijs. De school beschikt over een bibliotheek, elektriciteit, een keuken en een betegelde binnenplaats. Shoma sponsort 55 leerlingen verdeeld over Nursery t/m Klas 4. Hoog scorende leerlingen worden door de overheid geselecteerd voor geavanceerde sterklassen. Sponsoring kost €350 per kind per jaar.',
    currentFunding: 18600,
    targetFunding: 25000,
    impactMultiplier: 350,
    imageUrl:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    sdgGoals: [1, 4],
    stats: [
      { label: 'Leerlingen op KEMPS', value: '257', unit: 'totaal' },
      { label: 'Door Shoma gesponsord', value: '55', unit: 'leerlingen' },
      { label: 'Sponsorkosten p.j.', value: '€350', unit: '/kind/jaar' },
    ],
  },
  {
    id: 'project-water',
    slug: 'schoon-water-baent',
    title: 'Schoon Drinkwater',
    category: 'water',
    summary: 'Veilig drinkwater voor de school én de omliggende gemeenschap',
    description:
      'Met steun van Stichting Wilde Ganzen realiseerde Shoma een diepe bron (60–80 meter) op het schoolterrein. Het water wordt opgeslagen in ondergrondse tanks en via zonnepompen gedistribueerd. De installatie voorziet de school en de omliggende gemeenschap buiten schooltijd van schoon drinkwater. Commerciële waterhandelaren zijn expliciet uitgesloten. Dit project reduceert schoolverzuim doordat kinderen niet langer uren per dag water hoeven te halen.',
    currentFunding: 12400,
    targetFunding: 20000,
    impactMultiplier: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&q=80',
    sdgGoals: [6],
    stats: [
      { label: 'Opslagcapaciteit', value: '20.000', unit: 'liter' },
      { label: 'Capaciteitsverhoging', value: '100%', unit: 'verdubbeld' },
      { label: 'Bereik', value: 'School + gemeenschap', unit: '' },
    ],
  },
  {
    id: 'project-energy',
    slug: 'duurzame-energie-solar',
    title: 'Duurzame Energie',
    category: 'energy',
    summary: 'Solarlampen en een eigen moestuin voor financiële zelfstandigheid',
    description:
      'In samenwerking met Our Energy Foundation en Green Link Tanzania zijn zonnepanelen geplaatst op de school én de bibliotheek. Solarlampen zorgen dat leerlingen ook na zonsondergang kunnen studeren. De school exploiteert daarnaast een eigen moestuin met een 10.000-liter watertank, waarbij ouders actief helpen. Doel: de kosten voor warme maaltijden structureel verlagen en de school financieel zelfstandiger maken.',
    currentFunding: 7800,
    targetFunding: 15000,
    impactMultiplier: 50,
    imageUrl:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    sdgGoals: [7, 13],
    stats: [
      { label: 'Solarlampen geïnstalleerd', value: '24', unit: 'stuks' },
      { label: 'Kostenbesparing moestuin', value: '~30%', unit: 'minder kosten' },
      { label: 'Extra studietijd', value: '+2', unit: 'uur/dag' },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
