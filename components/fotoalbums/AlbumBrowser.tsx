'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, X } from 'lucide-react';
import AlbumGallery, { type AlbumPhoto } from '@/components/fotoalbums/AlbumGallery';

export type Album = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  accent: string;
  folder: string;
  yearFrom: number;
  yearTo: number;
  featureFirst?: boolean;
  photos: AlbumPhoto[];
};

const ACCENT_CLASSES: Record<string, string> = {
  teal: 'bg-shoma-teal',
  terracotta: 'bg-shoma-teal-light',
  amber: 'bg-amber-700',
};

const periodLabel = (album: Album) =>
  album.yearFrom === album.yearTo ? `${album.yearTo}` : `${album.yearFrom}–${album.yearTo}`;

const photoCount = (album: Album) =>
  `${album.photos.length} ${album.photos.length === 1 ? 'foto' : "foto's"}`;

export default function AlbumBrowser({ albums }: { albums: Album[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const coverRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Een directe link naar een album (/nieuws#bouw-kemps) klapt dat album meteen open
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (albums.some((album) => album.id === id)) setOpenId(id);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [albums]);

  // Breng het geopende album in beeld, zodat de foto's direct onder de duim staan
  useEffect(() => {
    if (!openId) return;
    panelRef.current?.scrollIntoView({ block: 'start' });
  }, [openId]);

  const close = useCallback((id: string) => {
    setOpenId(null);
    const cover = coverRefs.current[id];
    cover?.focus({ preventScroll: true });
    cover?.scrollIntoView({ block: 'center' });
  }, []);

  return (
    <ul className="grid grid-flow-row-dense grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {albums.map((album) => {
        const isOpen = album.id === openId;
        const cover = album.photos[0];
        const panelId = `album-${album.id}`;
        return (
          <Fragment key={album.id}>
            <li id={album.id}>
              <button
                ref={(node) => {
                  coverRefs.current[album.id] = node;
                }}
                type="button"
                onClick={() => (isOpen ? close(album.id) : setOpenId(album.id))}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group block w-full rounded-2xl text-left"
              >
                <span
                  className={`relative block aspect-[4/3] overflow-hidden rounded-2xl bg-shoma-clay ring-offset-2 ring-offset-shoma-sand transition-shadow duration-300 ${
                    isOpen
                      ? 'ring-2 ring-shoma-teal'
                      : 'shadow-[0_6px_18px_-8px_rgba(61,40,7,0.35)] group-hover:shadow-[0_14px_28px_-10px_rgba(61,40,7,0.45)]'
                  }`}
                >
                  <Image
                    src={`/images/fotoalbums/${album.folder}/${cover.file}`}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </span>
                <span className="mt-3 flex items-start justify-between gap-2">
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tabular-nums text-shoma-terracotta-ink">
                      {periodLabel(album)}
                    </span>
                    <span className="mt-0.5 block text-base font-bold leading-snug text-shoma-slate group-hover:text-shoma-teal sm:text-lg">
                      {album.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-shoma-slate/75">{photoCount(album)}</span>
                  </span>
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 text-shoma-teal transition-transform duration-300 motion-reduce:transition-none ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </li>

            {isOpen && (
              <li className="col-span-full">
                <div
                  ref={panelRef}
                  id={panelId}
                  role="region"
                  aria-label={`Album ${album.title}`}
                  className="rounded-3xl border border-shoma-teal/15 bg-white p-5 animate-in fade-in slide-in-from-top-2 duration-300 ease-out motion-reduce:animate-none sm:p-8"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`${ACCENT_CLASSES[album.accent] ?? 'bg-shoma-teal'} rounded-lg px-2.5 py-1 text-xs font-bold text-white`}
                        >
                          {album.tag}
                        </span>
                        <span className="text-xs tabular-nums text-shoma-slate/75">
                          {periodLabel(album)} · {photoCount(album)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-shoma-slate sm:text-3xl">{album.title}</h3>
                      <p className="mt-0.5 text-sm text-shoma-slate/75">{album.subtitle}</p>
                      <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-shoma-slate/75">
                        {album.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => close(album.id)}
                      aria-label={`Sluit album ${album.title}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-shoma-teal/25 text-shoma-teal transition-colors hover:bg-shoma-teal hover:text-white"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  <AlbumGallery
                    title={album.title}
                    folder={album.folder}
                    photos={album.photos}
                    featureFirst={album.featureFirst ?? true}
                  />

                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => close(album.id)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-shoma-teal/25 bg-white px-5 py-2.5 text-sm font-semibold text-shoma-teal transition-colors hover:bg-shoma-teal hover:text-white"
                    >
                      Sluit album
                      <ChevronDown className="h-4 w-4 rotate-180" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
}
