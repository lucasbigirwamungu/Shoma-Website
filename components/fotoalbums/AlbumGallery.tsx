'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export type AlbumPhoto = {
  file: string;
  alt: string;
  // Optioneel bijschrift; zonder bijschrift tonen we de alt-tekst
  caption?: string;
};

type AlbumGalleryProps = {
  title: string;
  folder: string;
  photos: AlbumPhoto[];
};

const photoSrc = (folder: string, file: string) => `/images/fotoalbums/${folder}/${file}`;

export default function AlbumGallery({ title, folder, photos }: AlbumGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = openIndex !== null;
  const hasMultiple = photos.length > 1;

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrevious = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );

  // Toetsenbord, scroll-lock en focus zolang de lightbox open is
  useEffect(() => {
    if (!isOpen) return;

    const trigger = lastTriggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      } else if (event.key === 'ArrowLeft') {
        showPrevious();
      } else if (event.key === 'ArrowRight') {
        showNext();
      } else if (event.key === 'Tab') {
        // Houd de focus binnen de lightbox
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [isOpen, close, showPrevious, showNext]);

  const current = openIndex !== null ? photos[openIndex] : null;

  return (
    <>
      {/* Photo grid */}
      <div
        className={`grid gap-3 ${
          photos.length >= 8 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {photos.map((photo, photoIndex) => {
          // Make first photo of each album span wider on larger grids
          const isFeature = photoIndex === 0 && photos.length >= 6;
          const label = photo.caption || photo.alt;
          return (
            <button
              key={photo.file}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setOpenIndex(photoIndex);
              }}
              aria-label={`Vergroot foto: ${label}`}
              className={`relative block w-full overflow-hidden rounded-2xl bg-gray-100 group focus:outline-none focus-visible:ring-2 focus-visible:ring-shoma-terracotta focus-visible:ring-offset-2 ${
                isFeature ? 'col-span-2 row-span-2' : ''
              }`}
              style={{ aspectRatio: isFeature ? '4/3' : '1/1' }}
            >
              <Image
                src={photoSrc(folder, photo.file)}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes={
                  isFeature
                    ? '(max-width: 1024px) 100vw, 50vw'
                    : '(max-width: 1024px) 50vw, 25vw'
                }
              />
              {/* Hover overlay */}
              <span className="absolute inset-0 bg-shoma-teal-dark/0 group-hover:bg-shoma-teal-dark/30 transition-colors duration-300 flex items-end p-4">
                <span className="text-white text-left text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight drop-shadow">
                  {label}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {current && openIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}: foto ${openIndex + 1} van ${photos.length}`}
          className="fixed inset-0 z-[100] flex flex-col bg-shoma-slate/95"
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-sm font-medium text-white/70" aria-live="polite">
              {openIndex + 1} / {photos.length}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Sluiten"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-shoma-terracotta"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            {hasMultiple && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                aria-label="Vorige foto"
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-shoma-terracotta sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
            )}

            <Image
              key={current.file}
              src={photoSrc(folder, current.file)}
              alt={current.alt}
              width={1600}
              height={1200}
              sizes="100vw"
              onClick={(event) => event.stopPropagation()}
              className="h-auto max-h-full w-auto max-w-full rounded-2xl object-contain"
            />

            {hasMultiple && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Volgende foto"
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-shoma-terracotta sm:right-6"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            )}
          </div>

          <p className="px-4 py-4 text-center text-sm text-white/90 sm:px-6">
            {current.caption || current.alt}
          </p>
        </div>
      )}
    </>
  );
}
