import type { ProjectCategory } from '@/types';

// ─── Projectverhalen ──────────────────────────────────────────────────────────
// Losse, verhalende artikelen die niet in de 3 samengevatte thema-kaarten van
// lib/projects.ts passen. Overgenomen van de losse projectpagina's op shoma.nl
// (bron-URL per verhaal opgenomen voor herkomst/attributie).

export interface ProjectStory {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  period: string;
  excerpt: string;
  body: string[];
  photos: { src: string; alt: string }[];
  sourceUrl: string;
}

export const PROJECT_STORIES: ProjectStory[] = [
  {
    id: 'story-school-bijna-klaar',
    slug: 'de-school-is-bijna-klaar',
    title: 'De school is bijna klaar',
    category: 'education',
    period: '2021',
    excerpt: 'De Engelstalige lagere school nadert zijn voltooiing.',
    body: [
      'In 2010 kreeg Shoma het verzoek om een Engelstalige lagere school te stichten. Dit werd noodzakelijk geacht om kinderen meer doorgroeimogelijkheden te geven. Kennis van Engels is absoluut noodzakelijk om verder te kunnen studeren. De school is in 2016 met een eerste klas van start gegaan. Eind 2021 zaten er 173 leerlingen op school. Hiervan zijn er 89 waarvan de ouders het schoolgeld betalen en 84 door Shoma gesponsorde kinderen. De verhouding betalende kinderen en gesponsorde kinderen zal gestuurd worden op 2/3 staat tot 1/3. De klaslokalen zijn klaar en de bibliotheek is ingericht.',
      'De binnenplaats is betegeld, maar het gras moet nog worden aangebracht. Dit moet met de hand gebeuren door vrijwilligers ter plekke. Midden op het terrein zal nog een boom geplant worden zodat de schoolkinderen ook in de schaduw kunnen zitten. Tevens is de school voorzien van elektriciteit. Een project dat in samenwerking met Our Energy Foundation uit Hardenberg en Wilde Ganzen is verwezenlijkt.',
      'De inrichting van de eetzaal is één van onze nog openstaande projecten. Hiervoor is door de Rotary Enschede Zuid reeds geld beschikbaar gesteld. Ook moet er nog een voorziening worden getroffen zodat de kinderen veilig van het schoolniveau naar de onderliggende eetzaal kunnen komen.',
    ],
    photos: [
      { src: '/images/projectverhalen/school-bijna-klaar/CIZT0731.jpg', alt: 'KEMPS schoolgebouw' },
      { src: '/images/projectverhalen/school-bijna-klaar/GYVT3318.jpg', alt: 'KEMPS schoolgebouw' },
      { src: '/images/projectverhalen/school-bijna-klaar/MQNT1402.jpg', alt: 'KEMPS schoolgebouw' },
      { src: '/images/projectverhalen/school-bijna-klaar/CHFJ0071.jpg', alt: 'KEMPS schoolgebouw' },
      { src: '/images/projectverhalen/school-bijna-klaar/IMG_1732.jpg', alt: 'KEMPS schoolgebouw' },
      { src: '/images/projectverhalen/school-bijna-klaar/IMG_1775.jpg', alt: 'KEMPS schoolgebouw' },
      { src: '/images/projectverhalen/school-bijna-klaar/IMG_1856.jpg', alt: 'KEMPS schoolgebouw' },
    ],
    sourceUrl: 'https://www.shoma.nl/projecten/de-school-is-bijna-klaar/',
  },
  {
    id: 'story-voortgang-bouw-school',
    slug: 'voortgang-bouw-van-de-school',
    title: 'Voortgang bouw van de school (KEMPS)',
    category: 'education',
    period: '2015 – 2019',
    excerpt: 'Van eerste casco tot volledig dak: de bouw van KEMPS stap voor stap.',
    body: [
      'In januari 2015 is besloten te starten met de bouw van een Engelstalige lagere school (zie voor het waarom "de bouw van KEMPS").',
      'De school is casco gebouwd. In januari 2016 (start schooljaar in Tanzania) zijn de eerste 3 groepen van start gegaan. Twee klaslokalen, voldoende toiletten en een lerarenkamer waren klaar voor gebruik. De helft van de school was op dat moment voorzien van een dak. Er moest nog veel gebeuren, maar in april 2016 waren alle lokalen onderdak.',
      'In september 2019 was de stand van zaken zo, dat er 6 lokalen klaar waren voor het onderwijs. Er waren toen 6 groepen en dus voldoende ruimte. Voor januari 2020, wanneer het nieuwe schooljaar begint, moest er nog minimaal één lokaal afgebouwd worden.',
      'Inmiddels was met de bouw van de keuken begonnen. De verwachting was dat de keuken eind 2019 in gebruik genomen kon worden — hard nodig, omdat er met de start van het nieuwe schooljaar voor ca. 150 kinderen gekookt moest gaan worden.',
    ],
    photos: [
      { src: '/images/projectverhalen/voortgang-bouw-school/IMG_4604.jpg', alt: 'Bouw van KEMPS' },
      { src: '/images/projectverhalen/voortgang-bouw-school/foto-school.jpg', alt: 'Bouw van KEMPS' },
      { src: '/images/projectverhalen/voortgang-bouw-school/812B8B39-CF05-4C53-B302-F82DBFB4770D.jpg', alt: 'Bouw van KEMPS' },
      { src: '/images/projectverhalen/voortgang-bouw-school/foto-14.jpg', alt: 'Bouw van KEMPS' },
    ],
    sourceUrl: 'https://www.shoma.nl/projecten/school/',
  },
  {
    id: 'story-groot-stuk-grond',
    slug: 'een-groot-stuk-grond-voor-shoma',
    title: 'Een groot stuk grond voor Shoma',
    category: 'education',
    period: '2015',
    excerpt: 'Hoe Shoma 5 hectare grond kreeg van de lokale overheid van Kata Kashasha.',
    body: [
      'Shoma heeft van de lokale overheid van Kata (naam van een gebied) Kashasha 5 hectare grond gekregen om de bouw van een nieuwe school te realiseren. Frank is namens het bestuur in Nederland naar Rubya geweest om dit te regelen. Hij moest de gemeenschap ervan overtuigen dat het project bedoeld is om meerdere doelen te bereiken: een kwalitatief goede school neerzetten, zodat mensen hun kinderen niet naar scholen ver weg hoeven te sturen, makkelijker personeel voor het ziekenhuis in Rubya, en dat ook de lagere scholen in de omgeving profiteren doordat docenten elkaar enthousiast maken en verbeteren.',
      'Na deze toelichting moest er gestemd worden, waarbij het project grote steun kreeg.',
      'Inmiddels is het land opgemeten en officieel gemarkeerd en werd begonnen met de registratie van de school.',
    ],
    photos: [],
    sourceUrl: 'https://www.shoma.nl/projecten/school/een-groot-stuk-grond-voor-shoma/',
  },
  {
    id: 'story-inge-loes',
    slug: 'ervaringen-van-inge-loes-vredegoor',
    title: 'Ervaringen van Inge-Loes Vredegoor in Rubya/Tanzania',
    category: 'education',
    period: '2012',
    excerpt: 'Veldwerkverslag van twee studenten die de voorbereidingen voor de nieuwe Shoma-school onderzochten.',
    body: [
      'Wij, Joey Willemsen en Inge-Loes Vredegoor, hebben veldwerk verricht in Rubya, Tanzania, in de maanden oktober en november 2012. Dit verrichte veldwerk had betrekking op een project van Stichting Shoma. In Nederland kwamen we tijdens onze studie in contact met deze stichting en wilden we graag ons steentje bijdragen — door te helpen bij de voorbereidingen voor het bouwen van de nieuwe Shoma-school. Dit vrijwilligerswerk bestond globaal uit twee delen: schoolonderzoek en grondonderzoek.',
      'Om een goed beeld te krijgen van het huidige onderwijs in en rondom Rubya, hebben wij samen scholen in Rubya en omgeving bezocht: lessen, lesmethodieken, faciliteiten en problemen waar scholen tegenaan lopen. Zo probeerden we te voorkomen dat de nieuwe Shoma-school dezelfde problemen zou ondervinden.',
      'We hebben 8 overheidsscholen bezocht in Rubya en omgeving. Op elke school spraken we met hoofdonderwijzers en docenten, gaven we de scholen de gelegenheid vragen aan ons te stellen, en werd communicatie waar nodig ondersteund door Simon, die toelichting gaf in het Kiswahili.',
      'Tijdens deze gesprekken kregen we ook inzage in lesplannen, roosters en organisatiestructuren, plus een rondleiding op elke school om een goed beeld te krijgen van faciliteiten en ruimtes.',
      'We hebben gemerkt dat veel scholen tegen dezelfde problemen aanlopen: een groot gebrek aan boeken, klaslokalen (soms 115 kinderen in één klas) en toiletten (bijvoorbeeld 8 "toiletten" voor bijna 1000 leerlingen). Vaak gaan kinderen van 8 tot ca. 3 uur naar school zonder te eten of drinken.',
      'Ten slotte bezochten we 2 privéscholen, één in Dar es Salaam (1,5 week verblijf, als mogelijk voorbeeld voor de nieuwe Shoma-school) en één in Bukoba (net gestart in januari 2012), waarvan we ook veel leerden voor ons project.',
    ],
    photos: [],
    sourceUrl: 'https://www.shoma.nl/projecten/school/ervaringen-van-inge-loes-vredegoor-in-rubyatanzania/',
  },
  {
    id: 'story-leefomgeving',
    slug: 'verbetering-leefomgeving-en-hygiene',
    title: 'Verbetering leefomgeving en hygiëne',
    category: 'water',
    period: '2010 – heden',
    excerpt: 'Basisbehoeften eerst: waterplaatsen en veilige toiletten rond de scholen.',
    body: [
      'Om naar school te kunnen, moet eerst in een aantal andere basisbehoeften voorzien worden. Water is één van de belangrijkste — om te drinken, koken, wassen. Dit moet gehaald worden uit bronnen; waterleidingen zijn er in Rubya niet. Bij één van de natuurlijke bronnen hebben we in 2010 een waterplaats gemaakt om makkelijker water te kunnen halen. Verder hebben we in de loop der jaren bij meerdere scholen wc\'s gebouwd. De oude wc\'s waren vaak in zeer slechte staat en vormden een gevaar voor de kinderen, zowel instortingsgevaar als gevaar van de uitbraak van ziektes.',
    ],
    photos: [
      { src: '/images/projectverhalen/leefomgeving/Rubya201121.jpg', alt: 'Waterplaats Rubya' },
      { src: '/images/projectverhalen/leefomgeving/P1000369.jpg', alt: 'Leefomgeving Rubya' },
    ],
    sourceUrl: 'https://www.shoma.nl/projecten/leefomgeving/',
  },
  {
    id: 'story-licht-in-de-school',
    slug: 'licht-in-de-school',
    title: 'Licht in de school',
    category: 'energy',
    period: '2019',
    excerpt: 'Zonnepanelen voor school en bibliotheek, in samenwerking met Wilde Ganzen en Our Energy Foundation.',
    body: [
      'Door een unieke samenwerking tussen Wilde Ganzen, Our Energy Foundation uit Hardenberg en Shoma werd het mogelijk om de school (KEMPS) in Rubya, Tanzania, van elektriciteit te voorzien.',
      'Het landelijke energienet van Tanzania is ver verwijderd van de school. Daarom is gezocht naar een mogelijkheid om zonnepanelen te laten installeren en daarmee zowel school als bibliotheek te "verlichten". Het project werd uitgevoerd door Green Link Tanzania en stond onder toezicht van Our Energy Foundation, die expertise heeft in energieprojecten op basis van zonne-energie. Een projectaanvraag bij Wilde Ganzen werd goedgekeurd — alle drie partijen namen ieder een derde deel van de kosten voor hun rekening.',
      'De fondsenwerving was gereed, zodat de realisatie van het project eind 2019 gereed kon zijn.',
      'Tezamen met dit project werden ook twee waterpompen, aangedreven door zonne-energie, geleverd en geïnstalleerd.',
    ],
    photos: [],
    sourceUrl: 'https://www.shoma.nl/projecten/licht-in-de-school/',
  },
  {
    id: 'story-moestuin',
    slug: 'moestuin-moet-exploitatiekosten-drukken',
    title: 'Moestuin moet de exploitatiekosten drukken',
    category: 'energy',
    period: 'doorlopend',
    excerpt: 'Waarom en hoe de schoolmoestuin van KEMPS is opgezet, met hulp van ouders.',
    body: [
      'De kinderen op KEMPS krijgen iedere dag een warme maaltijd. De kosten hiervan zijn enorm gestegen — al het voedsel moet van de lokale markt gehaald worden. Door zelf te gaan verbouwen willen we de kosten van voedsel drukken. Voor het opzetten van de moestuin krijgen we veel ondersteuning van de ouders van de door ons gesponsorde kinderen. Het voordeel is niet alleen kostenbesparing, maar ook een voorbeeldfunctie: men ziet hoe men producten zelf kan verbouwen, en onze helpers vragen graag zelf wat zaad voor hun eigen moestuin.',
      'De start van zo\'n moestuin levert extra kosten op: de grond moet bewerkt worden, er moet mest komen en de gewassen moeten voldoende water krijgen om tot wasdom te komen.',
      'Voor de watervoorziening is een systeem van putten voorzien die met elkaar in verbinding staan en gevoed worden vanuit de 10.000 liter tank (onze "watertoren"). Bij de watervoorziening worden ook de bewakers ingezet, die daarnaast kleine onderhoudswerkzaamheden verzorgen — waardoor hun werk gevarieerder wordt en zij wat meer kunnen verdienen dan als bewaker alleen.',
    ],
    photos: [],
    sourceUrl: 'https://www.shoma.nl/projecten/moestuin-moet-de-exploitatiekosten-drukken/',
  },
  {
    id: 'story-solarlampen',
    slug: 'solarlampen',
    title: 'Solarlampen',
    category: 'energy',
    period: 'doorlopend',
    excerpt: 'Waarom kinderen in Rubya solarlampen nodig hebben om huiswerk te kunnen maken.',
    body: [
      'Rubya ligt vlakbij de evenaar, wat betekent dat het al rond 18.30 uur donker wordt. Aangezien kinderen na schooltijd vaak eerst hun ouders helpen (op het land werken, water halen, hout sprokkelen, kleren wassen) is er niet meteen tijd voor huiswerk. Daarna wordt er gegeten en is de zon al onder. De meeste mensen hebben geen elektriciteit en moeten het doen met kerosinelampen, die niet veel licht geven en gevaarlijk kunnen zijn — bovendien zijn kinderen vaak niet degenen met het eerste recht op licht. We hebben van Electrabel geld gekregen om solarlampen aan te schaffen, zodat de kinderen ook \'s avonds nog de gelegenheid hebben om huiswerk te doen.',
    ],
    photos: [],
    sourceUrl: 'https://www.shoma.nl/projecten/solarlampen/',
  },
  {
    id: 'story-waterproject',
    slug: 'waterproject',
    title: 'Waterproject',
    category: 'water',
    period: 'doorlopend',
    excerpt: 'Van natuurlijke bron tot centraal opvangreservoir: schoon drinkwater voor school en gemeenschap.',
    body: [
      'In de bedrijfsvoering van de school speelt de watervoorziening een belangrijke rol. Water is nodig voor de bereiding van de maaltijden, het drinken dat de kinderen krijgen en voor het schoonhouden van toiletten en gebouwen.',
      'In de directe omgeving van de school is één natuurlijke bron, die meer of minder water geeft afhankelijk van de periode. Het halen van water van deze bron vergt veel tijd — voor de school kostbaar, voor de omwonenden een zware belasting. Het water wordt meestal door kinderen gehaald.',
      'Omdat de school altijd over voldoende schoon water moet kunnen beschikken, is een project gedefinieerd waarbij het verkrijgen van schoon drinkwater zowel voor de school als voor de omwonenden sterk verbeterd wordt.',
      'Het water van de bron wordt met pompen omhoog gebracht naar de school. De school vangt ook regenwater op. Beide stromen komen in een centraal ondergronds opvangreservoir, vanwaar het water gedistribueerd wordt naar een tank voor de gemeenschap en naar de verbruikspunten van de school.',
      'Vervuild regenwater wordt apart opgevangen en gebruikt voor het schoonhouden van de toiletten en, in een later stadium, voor het bevloeien van de schoolmoestuin.',
      'De tank voor het water van de gemeenschap komt op het terrein net naast het schoolterrein. Verstrekking van het water aan de omwonenden wordt in de gemeenschap zelf georganiseerd; de school zorgt alleen voor voldoende aanvoer zolang de bron voldoende water geeft. De kosten van het project zijn begroot op ca. € 28.000.',
    ],
    photos: [],
    sourceUrl: 'https://www.shoma.nl/projecten/waterproject/',
  },
];

export function getStoryBySlug(slug: string): ProjectStory | undefined {
  return PROJECT_STORIES.find((s) => s.slug === slug);
}
