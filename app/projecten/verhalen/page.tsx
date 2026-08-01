import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, ChevronRight, ArrowLeft } from 'lucide-react';
import { PROJECT_STORIES, type ProjectStory } from '@/lib/project-stories';
import type { ProjectCategory } from '@/types';

export const metadata: Metadata = {
  title: "Projectverhalen – Stichting Shoma",
  description:
    'Lees de volledige verhalen achter de projecten van Stichting Shoma in Rubya, Tanzania: de bouw van KEMPS, watervoorziening, duurzame energie en leefomgeving.',
};

const CATEGORY_META: Record<ProjectCategory, { label: string; accent: string; tag: string }> = {
  education: { label: 'Onderwijs & KEMPS', accent: 'bg-shoma-teal', tag: 'Onderwijs' },
  water: { label: 'Water', accent: 'bg-blue-500', tag: 'Water' },
  energy: { label: 'Energie', accent: 'bg-shoma-terracotta', tag: 'Energie' },
};

const CATEGORY_ORDER: ProjectCategory[] = ['education', 'water', 'energy'];

export default function ProjectVerhalenPage() {
  return (
    <div className="min-h-screen bg-shoma-sand pt-20">
      {/* Header */}
      <div className="bg-shoma-teal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-shoma-terracotta-light" aria-hidden="true" />
            <p className="text-shoma-terracotta-light font-semibold text-sm uppercase tracking-wider">
              De verhalen achter de cijfers
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Projectverhalen</h1>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            Achter elk project zit een verhaal: hoe het begon, wie erbij betrokken waren en wat er
            onderweg gebeurde. Deze verhalen vullen de samenvattingen op onze{' '}
            <Link href="/projecten" className="underline underline-offset-2 hover:text-white">
              projectenpagina
            </Link>{' '}
            aan met meer context en geschiedenis.
          </p>
          <Link
            href="/projecten"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mt-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Terug naar projecten
          </Link>
        </div>
      </div>

      {/* Category index */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORY_ORDER.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm text-shoma-slate/60 hover:text-shoma-teal font-medium px-3 py-1.5 rounded-lg hover:bg-shoma-sand transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                {CATEGORY_META[cat].label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">
        {CATEGORY_ORDER.map((cat) => {
          const stories = PROJECT_STORIES.filter((s) => s.category === cat);
          if (stories.length === 0) return null;
          const meta = CATEGORY_META[cat];
          return (
            <section key={cat} id={cat} className="scroll-mt-32">
              <h2 className="text-2xl sm:text-3xl font-bold text-shoma-slate mb-8">{meta.label}</h2>
              <div className="space-y-10">
                {stories.map((story) => (
                  <StoryCard key={story.id} story={story} accent={meta.accent} tag={meta.tag} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function StoryCard({ story, accent, tag }: { story: ProjectStory; accent: string; tag: string }) {
  return (
    <article
      id={story.slug}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6 sm:p-8 scroll-mt-32"
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`${accent} text-white text-xs font-bold rounded-lg px-2.5 py-1`}>{tag}</span>
        <span className="text-shoma-slate/40 text-xs">{story.period}</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-shoma-slate mb-2">{story.title}</h3>
      <p className="text-shoma-slate/55 text-sm mb-6">{story.excerpt}</p>

      {story.photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {story.photos.map((photo, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl bg-gray-100"
              style={{ aspectRatio: '4/3' }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {story.body.map((paragraph, i) => (
          <p key={i} className="text-shoma-slate/70 text-sm leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <p className="text-xs text-shoma-slate/35 mt-6">
        Oorspronkelijk gepubliceerd op{' '}
        <a
          href={story.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-shoma-teal"
        >
          shoma.nl
        </a>
      </p>
    </article>
  );
}
