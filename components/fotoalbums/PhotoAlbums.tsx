import { Camera } from 'lucide-react';
import AlbumBrowser, { type Album } from '@/components/fotoalbums/AlbumBrowser';
// Albums en foto's staan in lib/fotoalbums.json; de bestanden zelf in public/images/fotoalbums/<folder>/.
// Een foto toevoegen = bestand in de map zetten en een regel { file, alt, caption } aan het album toevoegen.
// De eerste foto van een album is de omslag; yearFrom en yearTo bepalen het jaartal en de volgorde.
import albums from '@/lib/fotoalbums.json';

// Nieuwste album eerst; bij hetzelfde eindjaar gaat het album dat later begon voor
const ALBUMS: Album[] = [...albums].sort(
  (a, b) => b.yearTo - a.yearTo || b.yearFrom - a.yearFrom
);

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
            Tik op een album om de foto&apos;s te openen.
          </p>
        </div>
      </div>

      {/* Albums: nieuwste eerst, foto's pas zichtbaar na openen */}
      <section className="bg-shoma-sand py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AlbumBrowser albums={ALBUMS} />
        </div>
      </section>

      {/* Placeholder notice */}
      <section className="bg-shoma-teal text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Camera className="w-10 h-10 mx-auto mb-3 text-shoma-terracotta-light" aria-hidden="true" />
          <h3 className="text-lg font-bold mb-2">Meer foto&apos;s onderweg</h3>
          <p className="text-white/80 text-sm max-w-md mx-auto leading-relaxed">
            We werken continu aan het uitbreiden van onze fotoalbums. Wilt u ons helpen door foto&apos;s
            te delen? Neem dan{' '}
            <a href="/contact" className="inline-block py-2 underline underline-offset-2 hover:text-shoma-terracotta-light">
              contact
            </a>{' '}
            met ons op.
          </p>
        </div>
      </section>
    </div>
  );
}
