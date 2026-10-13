import { Camera, ChevronRight } from 'lucide-react';
import AlbumGallery from '@/components/fotoalbums/AlbumGallery';
// Albums en foto's staan in lib/fotoalbums.json; de bestanden zelf in public/images/fotoalbums/<folder>/.
// Een foto toevoegen = bestand in de map zetten en een regel { file, alt, caption } aan het album toevoegen.
import albums from '@/lib/fotoalbums.json';

const ALBUMS = albums;

const ACCENT_CLASSES: Record<string, string> = {
  teal: 'bg-shoma-teal',
  terracotta: 'bg-shoma-teal-light',
  amber: 'bg-amber-700',
};

// Elk album krijgt een eigen achtergrondkleur, zodat de albums duidelijk van elkaar gescheiden zijn
const ALBUM_BACKGROUNDS = ['bg-white', 'bg-shoma-cream', 'bg-shoma-sand', 'bg-shoma-clay'];

export default function PhotoAlbums() {
  return (
    <div id="fotos" className="scroll-mt-20">
      {/* Header */}
      <div className="bg-shoma-teal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Fotoalbums</h2>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            Foto&apos;s zeggen meer dan woorden. Bekijk hier hoe de projecten van Stichting Shoma het
            leven in Rubya veranderen: van de bouw van de school tot het dagelijks leven in de gemeenschap.
          </p>
        </div>
      </div>

      {/* Album index */}
      <div className="bg-white border-b border-shoma-teal/10 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Fotoalbums" className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {ALBUMS.map((album) => (
              <a
                key={album.id}
                href={`#${album.id}`}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm text-shoma-slate/75 hover:text-shoma-teal font-medium px-3 py-1.5 rounded-lg hover:bg-shoma-sand transition-colors"
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
                  <span
                    className={`${ACCENT_CLASSES[album.accent] ?? 'bg-shoma-teal'} text-white text-xs font-bold rounded-lg px-2.5 py-1`}>
                    {album.tag}
                  </span>
                  <span className="text-shoma-slate/75 text-xs">
                    {album.photos.length} foto&apos;s
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-shoma-slate">
                  {album.title}
                </h3>
                <p className="text-shoma-slate/75 text-sm mt-0.5">{album.subtitle}</p>
              </div>
              <p className="text-shoma-slate/75 text-sm max-w-md leading-relaxed sm:text-right">
                {album.description}
              </p>
            </div>

            <AlbumGallery title={album.title} folder={album.folder} photos={album.photos} />
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
