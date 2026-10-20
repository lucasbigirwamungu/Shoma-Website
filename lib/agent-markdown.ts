// Markdown-versies van de publieke pagina's, voor AI-agents die `Accept: text/markdown` sturen.
// De middleware serveert deze in plaats van HTML. De inhoud volgt de pagina's zelf;
// voeg bij een nieuwe publieke pagina hier ook een entry toe (de tests controleren dat).
import { siteUrl } from '@/lib/site-url';
import { ORGANIZATION, PARTNER_TIERS, SPONSOR_TIERS } from '@/lib/organization';
import { PROJECTS } from '@/lib/projects';
import { PROJECT_STORIES } from '@/lib/project-stories';
import { allNewsletters } from '@/lib/newsletter-data';

const url = (path: string) => `${siteUrl}${path}`;

// Pagina's die zelf doorverwijzen; de agent volgt de redirect en krijgt daarna Markdown
export const REDIRECTING_PATHS = ['/fotoalbums', '/compenseer-bedrijven'];

const footer = () => `
---

Stichting Shoma · ${ORGANIZATION.legalName} · KvK ${ORGANIZATION.kvk} · RSIN ${ORGANIZATION.rsin} · ANBI erkend
Contact: ${ORGANIZATION.email} · ${ORGANIZATION.telephoneDisplay} · [Alle pagina's](${url('/sitemap.xml')}) · [llms.txt](${url('/llms.txt')})
`;

const home = () => `# Stichting Shoma: onderwijs voor kinderen in Rubya, Tanzania

> ANBI erkend · Onbezoldigd bestuur · Opgericht ${ORGANIZATION.foundingYear}

Shoma betekent "onderwijs" in het Kihaya. Sinds ${ORGANIZATION.foundingYear} bouwt Stichting Shoma aan kansen voor kinderen in Rubya, Tanzania: door onderwijs, infrastructuur en gemeenschapsprojecten.

- **€40** = 1 jaar op een overheidsschool voor een kansarm kind
- **€350 per jaar** (of €30 per maand) = 1 kind op de Engelstalige KEMPS-school
- **€1** = 50 liter schoon drinkwater via het BAENT-pompstation

[Doneer direct](${url('/doneren')}) · [Zakelijk partner worden](${url('/voor-bedrijven')})

## Transparantie

Het bestuur werkt volledig onbezoldigd. De getekende jaarrekeningen van 2012 tot en met 2025 staan openbaar op [Over ons](${url('/over-ons#jaarrekeningen')}). Donaties zijn fiscaal aftrekbaar dankzij de ANBI-status (RSIN ${ORGANIZATION.rsin}).

## Drie pijlers, één missie

${PROJECTS.map((p) => `### ${p.title}\n\n${p.summary}.\n\n${p.stats.map((s) => `- ${s.label}: ${s.value} ${s.unit}`.trim()).join('\n')}`).join('\n\n')}

[Alle projecten bekijken](${url('/projecten')})

## Blijf op de hoogte

Maximaal 4 nieuwsbrieven per jaar met fotoreportages en voortgangsupdates rechtstreeks vanuit Rubya. Aanmelden kan via de [donatiepagina](${url('/doneren')}).
`;

const overOns = () => `# Over Stichting Shoma

Opgericht vanuit een persoonlijke verbinding. Gedreven door transparantie. Meer dan 20 jaar onderwijsbevordering in Rubya, Tanzania.

## Ons verhaal

Shoma is het Kihaya-woord voor "onderwijs". Stichting Shoma is in 2005 opgericht na een persoonlijk bezoek van een groep Nederlanders aan Rubya in augustus 2004, ter gelegenheid van het huwelijk van Frank Bigirwamungu (geboren in Rubya) en Marloes Bargeman, die er in 2000 als coassistent in het plaatselijke ziekenhuis werkte.

Rubya ligt in het noordwesten van Tanzania nabij het Victoriameer. De bevolking leeft grotendeels van kleinschalige landbouw. Door de impact van HIV/AIDS is er een onevenredig grote groep weeskinderen die zonder steun niet naar school kunnen.

Hoewel de Tanzaniaanse overheid stelt dat basisonderwijs gratis is, verplichten scholen gezinnen tot bijdragen voor uniformen, onderhoud en leermaterialen, oplopend tot €35 à €40 per jaar. Voor arme gezinnen en wezen is dit een onneembare barrière. Stichting Shoma doorbreekt die barrière, volledig gerund door vrijwilligers in Nederland en Tanzania.

## ANBI-gegevens

| Gegeven | Waarde |
| --- | --- |
| Officiële naam | ${ORGANIZATION.legalName} |
| Handelsnaam | ${ORGANIZATION.name} |
| RSIN / fiscaal nummer | ${ORGANIZATION.rsin} |
| KvK | ${ORGANIZATION.kvk} |
| IBAN | ${ORGANIZATION.iban} |
| Status | ANBI erkend (Algemeen Nut Beogende Instelling) |
| Bestuursbeloning | Geen (volledig onbezoldigd) |
| Bezoeken Tanzania | Op eigen kosten van bestuurders en vrijwilligers |

Donaties zijn aftrekbaar van de inkomstenbelasting. Een periodieke gift (5 jaar vastgelegd) is volledig aftrekbaar zonder drempel. [Meer informatie bij de Belastingdienst](https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/kosten-voor-anbi-aftrekken-als-gift).

## Bestuur Nederland

- Frank Bigirwamungu, voorzitter
- Ton Bargeman, penningmeester
- Pytrik Gerbrandy, onderwijs & PR
- Inger van Bruggen, onderwijs & PR
- Alwin Docter, technisch
- Jaap van Bruggen, technisch

Ambassadeurs: Jaap Bargeman, Jellie Bargeman, Klaas Alko Niestijl, Betsy Niestijl-Posthuma.

Lokaal team Tanzania: Faisal Katela (lokale coördinator), Amani Peter (headmaster KEMPS), Erica Frank (lokale coördinator).

## Jaarrekeningen, beleidsplan en statuten

Alle jaarrekeningen 2012-2025, het beleidsplan 2026-2028, het investerings- en dekkingsplan 2026 en de statuten staan als PDF op de [HTML-versie van deze pagina](${url('/over-ons')}).

Beleidsplan 2026-2028: een ICT-lokaal (laptops voor 187 leerlingen), een landbouwproject met irrigatie, vervanging van de batterijen van de zonne-energie-installatie, universitaire beurzen en de aanplant van vruchtbomen voor eigen schoolinkomsten.

[Doneer nu](${url('/doneren')}) · [Zakelijk samenwerken](${url('/voor-bedrijven')})
`;

const projecten = () => `# Onze projecten

Onderwijs, schoon water en duurzame energie voor de gemeenschap van Rubya: van de bouw van een eigen school tot solarlampen en een schoolmoestuin.

## Hoe het begon

Na overleg met de lokale bevolking is ervoor gekozen om bij de kinderen te beginnen. Het naar school laten gaan van (wees)kinderen die dat zelf niet kunnen betalen is de basis van het werk. Om de kwaliteit van het onderwijs te verhogen heeft Shoma daarnaast een eigen Engelstalige school gebouwd: KEMPS.

${PROJECTS.map((p) => `## ${p.title}\n\n${p.description}\n\n${p.stats.map((s) => `- ${s.label}: ${s.value} ${s.unit}`.trim()).join('\n')}`).join('\n\n')}

## Regulier onderwijs

Hoewel de overheid basisonderwijs gratis noemt, zijn er bijdragen voor uniformen en materialen (€35-€40 per jaar). Shoma betaalt dit voor 155 kinderen per jaar, voor €40 per kind per jaar.

## Sponsoren

${SPONSOR_TIERS.map((t) => `- [${t.label}](${url(t.donateUrl)}): ${t.amount}`).join('\n')}

## Projectverhalen

${PROJECT_STORIES.map((s) => `- [${s.title}](${url(`/projecten/verhalen#${s.slug}`)}) (${s.period}): ${s.excerpt}`).join('\n')}
`;

const verhalen = () => `# Projectverhalen

Achter elk project zit een verhaal: hoe het begon, wie erbij betrokken waren en wat er onderweg gebeurde.

${PROJECT_STORIES.map((s) => `## ${s.title}\n\n*${s.period}*\n\n${s.body.join('\n\n')}\n\nBron: ${s.sourceUrl}`).join('\n\n')}
`;

const compenseerEnLeer = () => `# Compenseer & Leer

Bereken uw CO₂-voetafdruk, doneer en plant bomen in Rubya, Tanzania. Iedere boom groeit in een schooltuin en ondersteunt onderwijs.

## Hoe werkt het?

1. **Voetafdruk invoeren:** vlieguren, gereden kilometers of jaarlijkse CO₂-uitstoot.
2. **Donatie berekenen:** 1,5 tot 2,5 cent per kilo CO₂, afhankelijk van uw totaal.
3. **Impact zien:** persoonlijk certificaat en updates over de boomgroei.
4. **Betalen en planten:** betaling met iDEAL; lokale teams planten de bomen op schoolterreinen in Rubya.

## Wat krijgt u?

- Een pdf-certificaat met uw naam, het aantal bomen, de gecompenseerde CO₂ en foto's van de groei
- Regelmatig foto's en voortgang van uw bomen
- Ongeveer 50% van de donatie gaat naar het schoolfonds in Rubya
- Uw voetafdruk wordt in 20 tot 40 jaar volledig gecompenseerd

## Veelgestelde vragen

**Hoe wordt mijn CO₂ berekend?** Op basis van vliegtijd (0,255 kg per uur), autokilometers (0,192 kg per km) of jaarlijkse voetafdruk: gemiddelde Europese emissiecijfers.

**Zijn de bomen echt?** Ja. Lokale teams in Rubya planten en verzorgen bomen op schoolterreinen. De groei wordt met gps en foto's vastgelegd.

**Kan ik dit als bedrijf doen?** Ja, via [Voor bedrijven](${url('/voor-bedrijven#compenseer-en-leer')}).

De calculator en betaling staan op de [HTML-versie van deze pagina](${url('/compenseer-en-leer')}).
`;

const voorBedrijven = () => `# Voor bedrijven en MVO-managers

Investeer in onderwijs en schoon water. Realiseer uw CSR-doelen met volledige transparantie, rapporteerbaar naar SDG 4, 6 en 7.

## Partnerschapstiers

${PARTNER_TIERS.map((t) => `- **${t.label}** (${t.sdg}): ${t.amount}`).join('\n')}

Alle tiers omvatten documentatie voor uw duurzaamheidsrapportage.

## Partners

- Stichting BAENT: financiering waterproject (opslagcapaciteit verdubbeld naar 20.000 liter)
- Inextern: detacheringspartner
- Wilde Ganzen: premie op 6 projecten sinds 2016

## Compenseer & Leer voor uw team

Medewerkers compenseren hun CO₂-voetafdruk door bomen te planten in Tanzania, terwijl u tegelijk onderwijs financiert. Geschikt voor MVO-dagen, incentives en ESG-rapportage. Prijzen en voorwaarden staan op de [HTML-versie van deze pagina](${url('/voor-bedrijven#compenseer-en-leer')}).

## Contact

Vul het formulier in op [${url('/voor-bedrijven#contact')}](${url('/voor-bedrijven#contact')}) of mail naar ${ORGANIZATION.partnerEmail}.
`;

const nieuws = () => `# Nieuws & foto's

Rechtstreekse updates vanuit Rubya. Maximaal 4 nieuwsbrieven per jaar.

${allNewsletters.map((n) => `## ${n.title}\n\n*${n.date}*\n\n${n.summary}\n\n[Lees de nieuwsbrief](${n.url})`).join('\n\n')}

De fotoalbums staan op de [HTML-versie van deze pagina](${url('/nieuws#fotos')}).
`;

const contact = () => `# Contact

Heeft u een vraag over de projecten, een donatie of wilt u op een andere manier bijdragen?

## Contactgegevens

- **Adres:** ${ORGANIZATION.name}, ${ORGANIZATION.address.street}, ${ORGANIZATION.address.postalCode} ${ORGANIZATION.address.city}
- **Telefoon:** ${ORGANIZATION.telephoneDisplay}
- **E-mail:** ${ORGANIZATION.email}
- **Zakelijke partners:** ${ORGANIZATION.partnerEmail}
- **IBAN:** ${ORGANIZATION.iban}
- **KvK:** ${ORGANIZATION.kvk}
- **RSIN:** ${ORGANIZATION.rsin}

Het contactformulier staat op de [HTML-versie van deze pagina](${url('/contact')}).
`;

const doneren = () => `# Doneren aan Stichting Shoma

Geen tussenpersonen. Uw donatie wordt in Rubya omgezet in onderwijs, schoon water of energie voor kinderen in Tanzania.

- **Onbezoldigd bestuur:** de jaarrekeningen staan openbaar op [Over ons](${url('/over-ons#jaarrekeningen')}).
- **ANBI erkend:** uw donatie is fiscaal aftrekbaar; u krijgt automatisch een kwitantie per e-mail na betaling.

## Kies uw bijdrage

${SPONSOR_TIERS.map((t) => `- [${t.label}](${url(t.donateUrl)}): ${t.amount}`).join('\n')}

Maandelijks of eenmalig, met een eigen bedrag vanaf €5 per maand. De betaling (iDEAL, Apple Pay, creditcard) gebeurt via Mollie op de [donatiepagina](${url('/doneren')}) en moet door de donateur zelf worden afgerond.

## Liever een bankoverschrijving?

- **IBAN:** ${ORGANIZATION.iban}
- **T.n.v.:** ${ORGANIZATION.name}
- **Omschrijving:** uw naam en "donatie"
`;

const bedankt = () => `# Dank u wel

Deze pagina verschijnt na een geslaagde donatie. De donateur ontvangt binnen enkele minuten een bevestiging en de fiscale ANBI-kwitantie per e-mail.

[Terug naar de homepage](${url('/')}) · [Bekijk de projecten](${url('/projecten')})
`;

const privacy = () => `# Privacyverklaring

${ORGANIZATION.legalName} (Stichting Shoma) verwerkt persoonsgegevens in overeenstemming met de AVG. Laatst gewijzigd: 11 oktober 2026.

## Verwerkingsverantwoordelijke

${ORGANIZATION.legalName}, handelsnaam ${ORGANIZATION.name}, ${ORGANIZATION.address.street}, ${ORGANIZATION.address.postalCode} ${ORGANIZATION.address.city}. KvK ${ORGANIZATION.kvk}, RSIN ${ORGANIZATION.rsin}. Privacyzaken: ${ORGANIZATION.partnerEmail}.

## Samenvatting

- **Welke gegevens:** van donateurs naam, adres (indien verstrekt), e-mail, IBAN en giftbedrag; van nieuwsbriefabonnees naam en e-mail; van contactzoekers naam en e-mail; van websitebezoekers technische gegevens zoals een geanonimiseerd IP-adres.
- **Waarom:** financiële administratie, de wettelijke ANBI-administratieplicht en de digitale nieuwsbrief.
- **Bewaartermijn:** donatiegegevens 7 jaar (fiscale bewaarplicht); nieuwsbriefgegevens zolang u ingeschreven staat; losse vragen uiterlijk 1 jaar na afhandeling.
- **Delen:** gegevens worden nooit verkocht of verhuurd; alleen gedeeld met partijen die noodzakelijk zijn, zoals de bank.
- **Uw rechten:** inzage, correctie, verwijdering en bezwaar via ${ORGANIZATION.partnerEmail}; reactie binnen 4 weken. Klachten kunnen naar de [Autoriteit Persoonsgegevens](https://www.autoriteitpersoonsgegevens.nl).

De volledige tekst staat op de [HTML-versie van deze pagina](${url('/privacyverklaring')}).
`;

export const MARKDOWN_PAGES: Record<string, { title: string; render: () => string }> = {
  '/': { title: 'Home', render: home },
  '/over-ons': { title: 'Over ons', render: overOns },
  '/projecten': { title: 'Projecten', render: projecten },
  '/projecten/verhalen': { title: 'Projectverhalen', render: verhalen },
  '/compenseer-en-leer': { title: 'Compenseer & Leer', render: compenseerEnLeer },
  '/voor-bedrijven': { title: 'Voor bedrijven', render: voorBedrijven },
  '/nieuws': { title: 'Nieuws', render: nieuws },
  '/contact': { title: 'Contact', render: contact },
  '/doneren': { title: 'Doneren', render: doneren },
  '/doneren/bedankt': { title: 'Bedankt', render: bedankt },
  '/privacyverklaring': { title: 'Privacyverklaring', render: privacy },
};

function normalize(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function getPageMarkdown(pathname: string): string | null {
  const page = MARKDOWN_PAGES[normalize(pathname)];
  return page ? page.render() + footer() : null;
}

export function notFoundMarkdown(pathname: string): string {
  return `# 404: pagina niet gevonden

The page \`${pathname}\` does not exist on the Stichting Shoma website. De link klopt niet of de pagina is verplaatst.

Probeer een van deze pagina's:

${Object.entries(MARKDOWN_PAGES)
  .filter(([path]) => path !== '/doneren/bedankt')
  .map(([path, page]) => `- [${page.title}](${url(path)})`)
  .join('\n')}

Alle pagina's staan in de [sitemap](${url('/sitemap.xml')}). Een overzicht voor AI-agents staat in [llms.txt](${url('/llms.txt')}).
`;
}
