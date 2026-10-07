import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Newspaper, ExternalLink } from 'lucide-react';
import PhotoAlbums from '@/components/fotoalbums/PhotoAlbums';
import { allNewsletters, groupNewslettersByYear } from '@/lib/newsletter-data';

export const metadata: Metadata = {
  title: "Nieuws & Foto's – Stichting Shoma",
  description:
    "Het laatste nieuws, alle nieuwsbrieven van 2012-2026 en de fotoalbums van de projecten van Stichting Shoma in Rubya, Tanzania.",
};

// Featured news items (manually curated)
const featuredNews = [
  {
    id: 'featured-0',
    date: 'September 2026',
    title: 'Nieuw ICT-lokaal en stagiaires op KEMPS',
    summary:
      'In de nieuwsbrief van september 2026 delen we de mooiste mijlpalen van de afgelopen periode op KEMPS. Dankzij het Baarns Lyceum zijn 40 geüpdatete laptops geïnstalleerd met een stabiele internetverbinding. Stagiaires Daan en Ezra van de Hanzehogeschool ondersteunen drie maanden lang het onderwijs, de ICT-integratie en het bewegingsonderwijs. Samen met Pelle\'s Deurningen verkopen we chocoladeletters voor nieuwe speeltoestellen. Er is een nieuwe bewakersloge gebouwd, de parkeerplaats is gecementeerd en de toegangsweg is verbreed. Tientallen kansarme kinderen zijn weer voorzien van schoolgeld, uniform en leermiddelen.',
    category: 'Nieuwsbrief',
    categoryColor: 'bg-shoma-terracotta/15 text-shoma-teal-dark',
    url: 'https://www.shoma.nl/algemeen/nieuwsbrief-september-2026/',
  },
  {
    id: 'featured-1',
    date: 'Januari 2026',
    title: 'Bestuurswissel en een frisse blik op de toekomst',
    summary:
      'Na jaren van tomeloze inzet hebben een aantal bestuursleden het stokje overgedragen. Begin 2025 nam Jaap Bargeman afscheid als voorzitter; hij blijft samen met Jellie als ambassadeur verbonden aan Shoma. Ook namen we afscheid van Klaas en Betsie Niestijl. Onder leiding van voorzitter Frank Bigirwamungu gaat een vernieuwd bestuur aan de slag met het beleidsplan 2026–2028: een ICT-lokaal voor 187 leerlingen, een landbouwproject met irrigatie, universitaire beurzen voor talentvolle leerlingen en de aanplant van vruchtbomen voor eigen schoolinkomsten.',
    category: 'Organisatie',
    categoryColor: 'bg-purple-100 text-purple-800',
  },
  {
    id: 'featured-2',
    date: 'Maart 2025',
    title: 'KEMPS-leerlingen presteren uitmuntend op nationale examens',
    summary:
      'Leerlingen van de Kashasha English Medium Primary School scoorden boven het nationale gemiddelde. De hoog scorende leerlingen zijn door de overheid geselecteerd voor geavanceerde sterklassen op de middelbare school. KEMPS telt inmiddels 257 leerlingen (gestart in 2016 met slechts 13).',
    category: 'Onderwijs',
    categoryColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 'featured-3',
    date: 'Januari 2025',
    title: '210 kinderen gesponsord in schooljaar 2025',
    summary:
      'Dankzij de steun van onze donateurs ondersteunen we in schooljaar 2025 in totaal 210 kinderen: 155 op reguliere overheidsscholen (€40/jaar) en 55 via de KEMPS-school (€350/jaar). Het vermogen van de stichting is gegroeid naar €21.188.',
    category: 'Jaarverslag',
    categoryColor: 'bg-shoma-teal/10 text-shoma-teal',
  },
];

// Alle nieuwsbrieven, gegroepeerd per jaar (nieuwste eerst)
const newslettersByYear = groupNewslettersByYear(allNewsletters);

export default function NieuwsPage() {
  return (
    <div className="min-h-screen bg-shoma-sand pt-20">
      {/* Header */}
      <div className="bg-shoma-teal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-7 h-7 text-shoma-terracotta-light" aria-hidden="true" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Nieuws & Foto&apos;s</h1>
          </div>
          <p className="text-white/70 max-w-2xl">
            Rechtstreekse updates vanuit Rubya. Maximaal 4 nieuwsbrieven per jaar, enkel bij
            echte doorbraken en resultaten.
          </p>
          <a
            href="#fotos"
            className="inline-flex items-center gap-1.5 text-sm text-shoma-terracotta-light hover:text-white mt-5 font-medium transition-colors"
          >
            Direct naar de fotoalbums
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Featured news items (3 most recent) */}
      <section className="bg-shoma-sand py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {featuredNews.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.categoryColor}`}>
                {item.category}
              </span>
              <span className="text-xs text-shoma-slate/40">{item.date}</span>
            </div>
            <h2 className="text-xl font-bold text-shoma-slate mb-3">{item.title}</h2>
            <p className="text-shoma-slate/65 leading-relaxed text-sm">{item.summary}</p>
            {'url' in item && item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-shoma-teal hover:text-shoma-teal-dark font-semibold mt-4"
              >
                Lees de nieuwsbrief
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </article>
        ))}
        </div>
      </section>

      {/* Newsletter Archive - All 23 newsletters organized by year */}
      <section className="bg-shoma-cream py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-shoma-teal/15">
          <h2 className="text-2xl font-bold text-shoma-slate mb-6">Nieuwsbrief archief</h2>
          <p className="text-shoma-slate/60 text-sm mb-6">
            Alle nieuwsbrieven van Stichting Shoma van 2012 tot heden ({allNewsletters.length} uitgaven).
            Meer informatie? Neem contact op via <a href="mailto:info@shoma.nl" className="text-shoma-teal underline">info@shoma.nl</a>
          </p>

          <div className="space-y-3">
            {Array.from(newslettersByYear.entries()).map(([year, newsletters]) => {
              return (
                <details key={year} open={year === allNewsletters[0].year} className="group border border-shoma-teal/20 rounded-xl">
                  <summary className="flex items-center gap-3 cursor-pointer px-5 py-3 hover:bg-shoma-teal/5 transition-colors">
                    <span className="text-lg font-bold text-shoma-teal">{year}</span>
                    <span className="text-sm text-shoma-slate/55">
                      {newsletters.length} {newsletters.length === 1 ? 'uitgave' : 'uitgaven'}
                    </span>
                    <span className="ml-auto text-shoma-slate/40 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 py-3 bg-white/50 border-t border-shoma-teal/10 space-y-2">
                    {newsletters.map((nl) => (
                      <a
                        key={nl.id}
                        href={nl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 text-shoma-slate/70 hover:text-shoma-teal transition-colors group/link"
                      >
                        <span className="text-sm group-hover/link:text-shoma-teal">→</span>
                        <div className="flex-1">
                          <span className="text-sm font-medium group-hover/link:underline">{nl.title}</span>
                          <span className="text-xs text-shoma-slate/50"> ({nl.date})</span>
                        </div>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-shoma-clay py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-shoma-teal rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Ontvang updates per e-mail</h3>
          <p className="text-white/70 text-sm mb-5">
            Meld u aan voor de nieuwsbrief op de donatiepagina. Maximaal 4× per jaar,
            altijd met fotomateriaal vanuit Rubya.
          </p>
          <Link
            href="/doneren"
            className="inline-flex items-center gap-2 bg-white text-shoma-teal hover:bg-shoma-sand px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Aanmelden via donatiepagina
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        </div>
      </section>

      {/* Foto's – onder het nieuws op dezelfde pagina */}
      <PhotoAlbums />
    </div>
  );
}
