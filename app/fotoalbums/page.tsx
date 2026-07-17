import type { Metadata } from 'next';
import Image from 'next/image';
import { Camera, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Foto's – Stichting Shoma",
  description:
    "Bekijk foto's van de projecten van Stichting Shoma in Rubya, Tanzania: de keuken, de bouw van KEMPS, het dagelijkse leven en het nieuwe schooljaar.",
};

const ALBUMS = [
  {
    id: 'bouw-kemps',
    title: 'Bouw van KEMPS',
    subtitle: 'Van grond tot school — stap voor stap',
    description:
      'De Kashasha English Medium Primary School (KEMPS) is letterlijk gebouwd door een hele gemeenschap. Deze foto\'s documenteren elk stadium van de bouw: van grondvoorbereiding, fundering, plantwerk tot voltooiing. Een project dat hoop en veerkracht symboliseert.',
    photos: [
      {
        src: '/shoma/Geld inzameling voor Kemps/Bouw van KEMPS/030.jpg',
        alt: 'Bouwterrein voorbereiding',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/Bouw van KEMPS/034.jpg',
        alt: 'Grondwerken fase',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/Bouw van KEMPS/100_0594.jpg',
        alt: 'Bouwvoortgang',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/Bouw van KEMPS/100_0700_bearbeitet.jpg',
        alt: 'Construction progress',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/Bouw van KEMPS/01_beplanting_kavel.jpg',
        alt: 'Plantingswerk',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/Bouw van KEMPS/02_beplanting_kavel.jpg',
        alt: 'Beplanting',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/Bouw van KEMPS/210D5B35-70B7-476B-B7A1-10D029CE5410.jpg',
        alt: 'School voortgang',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/Fundament_school_06-11-15.jpg',
        alt: 'School fundament',
      },
    ],
    color: 'shoma-teal',
    accent: 'bg-shoma-teal',
    tag: 'Bouwproject',
  },
  {
    id: 'geld-inzameling',
    title: 'Geld Inzameling voor KEMPS',
    subtitle: 'Steun vanuit Nederland',
    description:
      'Dankzij fondsenwerving in Nederland is KEMPS gebouwd. Van cascaderun tot cheque-overhandigingen — deze foto\'s tonen hoe supporters van Shoma in Nederland actief bijdragen aan onderwijs in Tanzania.',
    photos: [
      {
        src: '/shoma/Geld inzameling voor Kemps/cascaderun.jpg',
        alt: 'Cascade Run actie',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/Cascaderun_uitreiking_sponsorgeld_RSGWolfsbos_180417def71964.jpg',
        alt: 'Cascade Run overhandiging',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/DeRanninkkrant.jpg',
        alt: 'Rannink kaasmarkt',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/DeRanninkcheque.jpg',
        alt: 'Rannink cheque',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/02_cheque_Borne.jpg',
        alt: 'Cheque Borne',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/04_cheque_Borne.jpg',
        alt: 'Sponsorgeld',
      },
      {
        src: '/shoma/Geld inzameling voor Kemps/20140914_1545431.jpg',
        alt: 'Evenement',
      },
    ],
    color: 'shoma-terracotta',
    accent: 'bg-shoma-terracotta',
    tag: 'Fundraising',
  },
  {
    id: 'leven-rubya',
    title: 'Leven in Rubya',
    subtitle: 'De gemeenschap achter het project',
    description:
      'Rubya is vol warmte, solidariteit en veerkracht. Deze foto\'s geven inkijk in het dagelijks leven, de mensen, families en gemeenschapsmomenten die Shoma inspireert.',
    photos: [
      {
        src: '/shoma/Leven in Rubya/P1000364.jpg',
        alt: 'Gemeenschap Rubya',
      },
      {
        src: '/shoma/Leven in Rubya/P1000375.jpg',
        alt: 'Dagelijks leven',
      },
      {
        src: '/shoma/Leven in Rubya/P1000557.jpg',
        alt: 'Familie moment',
      },
      {
        src: '/shoma/Leven in Rubya/P1050323.jpg',
        alt: 'Schoolkinderen',
      },
      {
        src: '/shoma/Leven in Rubya/P1070543.jpg',
        alt: 'Lokale cultuur',
      },
      {
        src: '/shoma/Leven in Rubya/P1070550.jpg',
        alt: 'Kinderen Rubya',
      },
      {
        src: '/shoma/Leven in Rubya/P1070553.jpg',
        alt: 'Gemeenschap moment',
      },
      {
        src: '/shoma/Leven in Rubya/P1070561.jpg',
        alt: 'Rubya leven',
      },
    ],
    color: 'amber',
    accent: 'bg-amber-500',
    tag: 'Gemeenschap',
  },
];

export default function FotoalbumsPage() {
  return (
    <div className="min-h-screen bg-shoma-sand pt-20">
      {/* Header */}
      <div className="bg-shoma-teal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-5 h-5 text-shoma-terracotta-light" aria-hidden="true" />
            <p className="text-shoma-terracotta-light font-semibold text-sm uppercase tracking-wider">
              Beelden uit Rubya, Tanzania
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Fotoalbums</h1>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            Foto's zeggen meer dan woorden. Bekijk hier hoe de projecten van Stichting Shoma het
            leven in Rubya veranderen — van de bouw van de school tot het dagelijks leven in de gemeenschap.
          </p>
        </div>
      </div>

      {/* Album index */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {ALBUMS.map((album) => (
              <a
                key={album.id}
                href={`#${album.id}`}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm text-shoma-slate/60 hover:text-shoma-teal font-medium px-3 py-1.5 rounded-lg hover:bg-shoma-sand transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                {album.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Albums */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">
        {ALBUMS.map((album, albumIndex) => (
          <section key={album.id} id={album.id} className="scroll-mt-32">
            {/* Album header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`${album.accent} text-white text-xs font-bold rounded-lg px-2.5 py-1`}>
                    {album.tag}
                  </span>
                  <span className="text-shoma-slate/40 text-xs">
                    {album.photos.length} foto&apos;s
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-shoma-slate">
                  {album.title}
                </h2>
                <p className="text-shoma-slate/55 text-sm mt-0.5">{album.subtitle}</p>
              </div>
              <p className="text-shoma-slate/60 text-sm max-w-md leading-relaxed sm:text-right">
                {album.description}
              </p>
            </div>

            {/* Photo grid */}
            <div
              className={`grid gap-3 ${
                album.photos.length >= 8
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                  : album.photos.length >= 6
                  ? 'grid-cols-2 sm:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-3'
              }`}
            >
              {album.photos.map((photo, photoIndex) => {
                // Make first photo of each album span wider on larger grids
                const isFeature = photoIndex === 0 && album.photos.length >= 6;
                return (
                  <div
                    key={photoIndex}
                    className={`relative overflow-hidden rounded-2xl bg-gray-100 group ${
                      isFeature ? 'col-span-2 row-span-2' : ''
                    }`}
                    style={{ aspectRatio: isFeature ? '4/3' : '1/1' }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes={
                        isFeature
                          ? '(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw'
                          : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                      }
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-shoma-teal-dark/0 group-hover:bg-shoma-teal-dark/30 transition-colors duration-300 flex items-end p-4">
                      <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight drop-shadow">
                        {photo.alt}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider (except last) */}
            {albumIndex < ALBUMS.length - 1 && (
              <div className="mt-16 border-t border-shoma-teal/10" />
            )}
          </section>
        ))}

        {/* Placeholder notice */}
        <section className="bg-shoma-teal-dark/5 border border-shoma-teal/15 rounded-3xl p-8 text-center">
          <Camera className="w-10 h-10 text-shoma-teal mx-auto mb-3 opacity-60" aria-hidden="true" />
          <h3 className="text-lg font-bold text-shoma-slate mb-2">Meer foto&apos;s onderweg</h3>
          <p className="text-shoma-slate/55 text-sm max-w-md mx-auto leading-relaxed">
            We werken continu aan het uitbreiden van onze fotoalbums. Wilt u ons helpen door foto&apos;s
            te delen? Neem dan{' '}
            <a href="/contact" className="text-shoma-teal underline underline-offset-2 hover:text-shoma-teal-dark">
              contact
            </a>{' '}
            met ons op.
          </p>
        </section>
      </div>
    </div>
  );
}
