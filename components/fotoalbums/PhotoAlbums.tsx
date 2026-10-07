import Image from 'next/image';
import { Camera, ChevronRight } from 'lucide-react';

const ALBUMS = [
  {
    id: 'bouw-kemps',
    title: 'Bouw van KEMPS',
    subtitle: 'Van grond tot school, stap voor stap',
    description:
      'De Kashasha English Medium Primary School (KEMPS) is letterlijk gebouwd door een hele gemeenschap. Deze foto\'s documenteren elk stadium van de bouw: van grondvoorbereiding, fundering, plantwerk tot voltooiing. Een project dat hoop en veerkracht symboliseert.',
    photos: [
      {
        src: '/images/fotoalbums/bouw-van-kemps/IMG_4604.jpg',
        alt: 'Bouwterrein voorbereiding',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/grond.jpg',
        alt: 'Grondwerken fase',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/fotos_maken_voor_thuisfront.jpg',
        alt: 'Rapportage voor thuisfront',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/P1050323.jpg',
        alt: 'Bouwvoortgang',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/7D277506-EE2D-452C-A75A-C123FA7C7E86.jpg',
        alt: 'Constructiewerk',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/93F13772-05BE-4F3F-8C89-391EB224253F.jpg',
        alt: 'Bouwvoortgang',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/IMG_0731.jpg',
        alt: 'Schoolgebouw in aanbouw',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/BE36A0CA-803D-4DD4-B774-B362FE5812E6.jpg',
        alt: 'Bouwvoortgang',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/IMG-20150920-WA0052.jpg',
        alt: 'Bouwvoortgang',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/IMG-20151104-WA0062.jpg',
        alt: 'Bouwvoortgang',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/IMG_0837.jpg',
        alt: 'Bouwvoortgang',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/IMG_1331.jpg',
        alt: 'Bouwvoortgang',
      },
      {
        src: '/images/fotoalbums/bouw-van-kemps/812B8B39-CF05-4C53-B302-F82DBFB4770D.jpg',
        alt: 'School voortgang',
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
      'Dankzij fondsenwerving in Nederland is KEMPS gebouwd. Van cascaderun tot cheque-overhandigingen: deze foto\'s tonen hoe supporters van Shoma in Nederland actief bijdragen aan onderwijs in Tanzania.',
    photos: [
      {
        src: '/images/fotoalbums/geld-inzameling-kemps/cascaderun.jpg',
        alt: 'Cascade Run actie',
      },
      {
        src: '/images/fotoalbums/geld-inzameling-kemps/Cascaderun_uitreiking_sponsorgeld_RSGWolfsbos_180417def71964.jpg',
        alt: 'Cascade Run overhandiging',
      },
      {
        src: '/images/fotoalbums/geld-inzameling-kemps/DeRanninkkrant.jpg',
        alt: 'Rannink kaasmarkt',
      },
      {
        src: '/images/fotoalbums/geld-inzameling-kemps/DeRanninkcheque.jpg',
        alt: 'Rannink cheque',
      },
      {
        src: '/images/fotoalbums/geld-inzameling-kemps/02_cheque_Borne.jpg',
        alt: 'Cheque Borne',
      },
      {
        src: '/images/fotoalbums/geld-inzameling-kemps/04_cheque_Borne.jpg',
        alt: 'Sponsorgeld',
      },
      {
        src: '/images/fotoalbums/geld-inzameling-kemps/20140914_1545431.jpg',
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
        src: '/images/fotoalbums/leven-in-rubya/P1000364.jpg',
        alt: 'Gemeenschap Rubya',
      },
      {
        src: '/images/fotoalbums/leven-in-rubya/P1000375.jpg',
        alt: 'Dagelijks leven',
      },
      {
        src: '/images/fotoalbums/leven-in-rubya/P1000302.jpg',
        alt: 'Leven in Rubya',
      },
      {
        src: '/images/fotoalbums/leven-in-rubya/P1000359.jpg',
        alt: 'Leven in Rubya',
      },
      {
        src: '/images/fotoalbums/leven-in-rubya/P1000366.jpg',
        alt: 'Leven in Rubya',
      },
      {
        src: '/images/fotoalbums/leven-in-rubya/P1000376.jpg',
        alt: 'Leven in Rubya',
      },
      {
        src: '/images/fotoalbums/leven-in-rubya/P1000605.jpg',
        alt: 'Leven in Rubya',
      },
      {
        src: '/images/fotoalbums/leven-in-rubya/P1000771.jpg',
        alt: 'Leven in Rubya',
      },
      {
        src: '/images/fotoalbums/leven-in-rubya/P1050227.jpg',
        alt: 'Schoolkinderen',
      },
      {
        src: '/images/fotoalbums/leven-in-rubya/P1070543.jpg',
        alt: 'Lokale cultuur',
      },
    ],
    color: 'amber',
    accent: 'bg-amber-500',
    tag: 'Gemeenschap',
  },
  {
    id: 'klaar-nieuw-schooljaar',
    title: 'Klaar voor een nieuw schooljaar!',
    subtitle: 'Een nieuwe start, vol verwachting',
    description:
      'Elk jaar begint met dezelfde hoop en energie: schone klaslokalen, nieuwe schoolspullen en kinderen die klaarstaan om weer te leren. Deze foto\'s vangen die jaarlijkse nieuwe start in Rubya.',
    photos: [
      { src: '/images/fotoalbums/klaar-voor-nieuw-schooljaar/Rubya20111.jpg', alt: 'Klaar voor het nieuwe schooljaar' },
      { src: '/images/fotoalbums/klaar-voor-nieuw-schooljaar/Rubya201131.jpg', alt: 'Klaar voor het nieuwe schooljaar' },
      { src: '/images/fotoalbums/klaar-voor-nieuw-schooljaar/Rubya201141.jpg', alt: 'Klaar voor het nieuwe schooljaar' },
      { src: '/images/fotoalbums/klaar-voor-nieuw-schooljaar/Rubya201151.jpg', alt: 'Klaar voor het nieuwe schooljaar' },
      { src: '/images/fotoalbums/klaar-voor-nieuw-schooljaar/Rubya201161.jpg', alt: 'Klaar voor het nieuwe schooljaar' },
      { src: '/images/fotoalbums/klaar-voor-nieuw-schooljaar/Rubya201171.jpg', alt: 'Klaar voor het nieuwe schooljaar' },
      { src: '/images/fotoalbums/klaar-voor-nieuw-schooljaar/Rubya201181.jpg', alt: 'Klaar voor het nieuwe schooljaar' },
      { src: '/images/fotoalbums/klaar-voor-nieuw-schooljaar/Rubya201191.jpg', alt: 'Klaar voor het nieuwe schooljaar' },
    ],
    color: 'shoma-teal',
    accent: 'bg-shoma-teal',
    tag: 'Schooljaar',
  },
  {
    id: 'ontwikkeling-keuken',
    title: 'Ontwikkeling keuken',
    subtitle: 'Een plek om warme maaltijden te bereiden',
    description:
      'De keuken van KEMPS is essentieel: hier wordt dagelijks voor honderden leerlingen een warme maaltijd bereid. Deze foto\'s tonen de ontwikkeling van deze belangrijke voorziening.',
    photos: [
      { src: '/images/fotoalbums/ontwikkeling-keuken/keuken-foto-1.jpg', alt: 'Ontwikkeling van de keuken' },
      { src: '/images/fotoalbums/ontwikkeling-keuken/keuken-foto-2.jpg', alt: 'Ontwikkeling van de keuken' },
      { src: '/images/fotoalbums/ontwikkeling-keuken/keuken-foto-3.jpg', alt: 'Ontwikkeling van de keuken' },
      { src: '/images/fotoalbums/ontwikkeling-keuken/keuken-foto-4.jpg', alt: 'Ontwikkeling van de keuken' },
      { src: '/images/fotoalbums/ontwikkeling-keuken/keuken-foto-5.jpg', alt: 'Ontwikkeling van de keuken' },
      { src: '/images/fotoalbums/ontwikkeling-keuken/keuken-foto-6.jpg', alt: 'Ontwikkeling van de keuken' },
      { src: '/images/fotoalbums/ontwikkeling-keuken/keuken-foto-7.jpg', alt: 'Ontwikkeling van de keuken' },
      { src: '/images/fotoalbums/ontwikkeling-keuken/keuken-foto-8.jpg', alt: 'Ontwikkeling van de keuken' },
    ],
    color: 'shoma-terracotta',
    accent: 'bg-shoma-terracotta',
    tag: 'Voorziening',
  },
];

// Elk album krijgt een eigen achtergrondkleur, zodat de albums duidelijk van elkaar gescheiden zijn
const ALBUM_BACKGROUNDS = ['bg-white', 'bg-shoma-cream', 'bg-shoma-sand', 'bg-shoma-clay'];

export default function PhotoAlbums() {
  return (
    <div id="fotos" className="scroll-mt-20">
      {/* Header */}
      <div className="bg-shoma-teal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-5 h-5 text-shoma-terracotta-light" aria-hidden="true" />
            <p className="text-shoma-terracotta-light font-semibold text-sm uppercase tracking-wider">
              Beelden uit Rubya, Tanzania
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Fotoalbums</h2>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            Foto&apos;s zeggen meer dan woorden. Bekijk hier hoe de projecten van Stichting Shoma het
            leven in Rubya veranderen: van de bouw van de school tot het dagelijks leven in de gemeenschap.
          </p>
        </div>
      </div>

      {/* Album index */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Fotoalbums" className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
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
      {ALBUMS.map((album, albumIndex) => (
        <section
          key={album.id}
          id={album.id}
          className={`${ALBUM_BACKGROUNDS[albumIndex % ALBUM_BACKGROUNDS.length]} py-16 scroll-mt-32`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Album header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`${album.accent} text-white text-xs font-bold rounded-lg px-2.5 py-1`}>
                    {album.tag}
                  </span>
                  <span className="text-shoma-slate/50 text-xs">
                    {album.photos.length} foto&apos;s
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-shoma-slate">
                  {album.title}
                </h3>
                <p className="text-shoma-slate/60 text-sm mt-0.5">{album.subtitle}</p>
              </div>
              <p className="text-shoma-slate/70 text-sm max-w-md leading-relaxed sm:text-right">
                {album.description}
              </p>
            </div>

            {/* Photo grid */}
            <div
              className={`grid gap-3 ${
                album.photos.length >= 8
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
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
          </div>
        </section>
      ))}

      {/* Placeholder notice */}
      <section className="bg-shoma-teal text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Camera className="w-10 h-10 mx-auto mb-3 text-shoma-terracotta-light" aria-hidden="true" />
          <h3 className="text-lg font-bold mb-2">Meer foto&apos;s onderweg</h3>
          <p className="text-white/80 text-sm max-w-md mx-auto leading-relaxed">
            We werken continu aan het uitbreiden van onze fotoalbums. Wilt u ons helpen door foto&apos;s
            te delen? Neem dan{' '}
            <a href="/contact" className="underline underline-offset-2 hover:text-shoma-terracotta-light">
              contact
            </a>{' '}
            met ons op.
          </p>
        </div>
      </section>
    </div>
  );
}
