import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/lib/projects';
import { ArrowRight, CheckCircle, BookOpen, GraduationCap, Users } from 'lucide-react';
import KempsClassChart from '@/components/projecten/KempsClassChart';

export const metadata: Metadata = {
  title: 'Onze Projecten – Stichting Shoma',
  description:
    'Bekijk alle projecten van Stichting Shoma in Rubya, Tanzania: KEMPS onderwijs, regulier onderwijs, drinkwater en duurzame energie.',
};

const SDG_COLORS: Record<number, string> = {
  1: 'bg-red-500', 4: 'bg-yellow-500', 6: 'bg-blue-500',
  7: 'bg-yellow-400', 13: 'bg-green-600',
};

const SDG_NAMES: Record<number, string> = {
  1: 'Geen Armoede', 4: 'Kwaliteitsonderwijs',
  6: 'Schoon Water', 7: 'Duurzame Energie', 13: 'Klimaat',
};

export default function ProjectenPage() {
  return (
    <div className="min-h-screen bg-shoma-sand pt-20">
      {/* Header */}
      <div className="bg-shoma-teal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-shoma-terracotta-light font-semibold text-sm uppercase tracking-wider mb-3">
            Impact in Rubya, Tanzania
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Onze projecten</h1>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            Drie pijlers, één missie: onderwijs, schoon water en duurzame energie voor
            de gemeenschap van Rubya. Elk project volledig transparant gefinancierd en lokaal gecontroleerd.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ─── Onderwijs: KEMPS vs Regulier ──────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-shoma-slate mb-2">Onderwijs</h2>
          <p className="text-shoma-slate/60 mb-8">
            Shoma ondersteunt twee typen onderwijs: het Engelstalige KEMPS-programma en het
            reguliere overheidsonderwijs. Beide zijn essentieel, maar vragen om een andere aanpak.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* KEMPS kaart */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-shoma-teal/20 hover:border-shoma-teal/40 transition-all">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80"
                  alt="KEMPS basisschool Tanzania"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-shoma-teal-dark/80 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
                  <span className="text-white font-bold">KEMPS Onderwijs</span>
                </div>
                <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold rounded-lg px-2 py-1">SDG 4</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-shoma-slate text-lg mb-2">Kashasha English Medium Primary School</h3>
                <p className="text-sm text-shoma-slate/65 leading-relaxed mb-4">
                  KEMPS is gestart in 2016 met 13 leerlingen en telt nu <strong>257 leerlingen</strong>.
                  De school biedt hoogwaardig Engelstalig onderwijs — de voertaal van het Tanzaniaans
                  vervolgonderwijs. Shoma sponsort <strong>55 leerlingen</strong>{' '}
                  voor wie de kosten onbetaalbaar zijn.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-shoma-sand rounded-xl p-3 text-center">
                    <p className="font-extrabold text-shoma-teal text-xl">257</p>
                    <p className="text-xs text-shoma-slate/55 mt-0.5">leerlingen totaal</p>
                  </div>
                  <div className="bg-shoma-sand rounded-xl p-3 text-center">
                    <p className="font-extrabold text-shoma-terracotta text-xl">55</p>
                    <p className="text-xs text-shoma-slate/55 mt-0.5">door Shoma gesponsord</p>
                  </div>
                  <div className="bg-shoma-sand rounded-xl p-3 text-center col-span-2">
                    <p className="font-extrabold text-shoma-teal text-xl">€ 350</p>
                    <p className="text-xs text-shoma-slate/55 mt-0.5">per kind per jaar</p>
                  </div>
                  {/* Financiële voortgang */}
                  <div className="col-span-2 mt-3 space-y-2">
                    <div className="flex justify-between text-xs text-shoma-slate/55 mb-1.5">
                      <span>Financieringsvoortgang</span>
                      <span className="font-semibold text-shoma-teal">62%</span>
                    </div>
                    <div className="w-full h-2 bg-shoma-sand rounded-full overflow-hidden">
                      <div className="h-full bg-shoma-teal rounded-full" style={{ width: '62%' }} />
                    </div>
                    <div className="flex justify-between text-xs text-shoma-slate/50">
                      <span>€ 19.250 ingezameld</span>
                      <span>Doel: € 31.000</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/doneren?type=kemps"
                  className="inline-flex items-center gap-2 bg-shoma-teal hover:bg-shoma-teal-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all w-full justify-center"
                >
                  Sponsor een KEMPS-leerling
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Regulier onderwijs kaart */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-shoma-terracotta/20 hover:border-shoma-terracotta/40 transition-all">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80"
                  alt="Regulier onderwijs Tanzania"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-shoma-terracotta-dark/80 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
                  <span className="text-white font-bold">Regulier Onderwijs</span>
                </div>
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold rounded-lg px-2 py-1">SDG 1</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-shoma-slate text-lg mb-2">Overheidsscholen in Rubya</h3>
                <p className="text-sm text-shoma-slate/65 leading-relaxed mb-4">
                  Hoewel de overheid basisonderwijs gratis noemt, zijn er bijdragen voor uniformen en
                  materialen (€35–€40/jaar). Voor arme gezinnen is dit onbetaalbaar. Shoma betaalt dit voor{' '}
                  <strong>155 kinderen</strong> per jaar.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-shoma-sand rounded-xl p-3 text-center">
                    <p className="font-extrabold text-shoma-terracotta text-xl">155</p>
                    <p className="text-xs text-shoma-slate/55 mt-0.5">kinderen (2025)</p>
                  </div>
                  <div className="bg-shoma-sand rounded-xl p-3 text-center">
                    <p className="font-extrabold text-shoma-terracotta text-xl">€ 40</p>
                    <p className="text-xs text-shoma-slate/55 mt-0.5">per kind per jaar</p>
                  </div>
                  {/* Financiële voortgang */}
                  <div className="col-span-2 mt-3 space-y-2">
                    <div className="flex justify-between text-xs text-shoma-slate/55 mb-1.5">
                      <span>Financieringsvoortgang</span>
                      <span className="font-semibold text-shoma-terracotta">97%</span>
                    </div>
                    <div className="w-full h-2 bg-shoma-sand rounded-full overflow-hidden">
                      <div className="h-full bg-shoma-terracotta rounded-full" style={{ width: '97%' }} />
                    </div>
                    <div className="flex justify-between text-xs text-shoma-slate/50">
                      <span>€ 6.200 ingezameld</span>
                      <span>Doel: € 6.400</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/doneren?type=regular"
                  className="inline-flex items-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all w-full justify-center"
                >
                  Sponsor een schoolkind
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* KEMPS klasgrafiek */}
          <KempsClassChart />
        </section>

        {/* ─── Overige projecten ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-shoma-slate mb-2">Water & Energie</h2>
          <p className="text-shoma-slate/60 mb-8">
            Schoon water en duurzame energie zijn randvoorwaarden voor goed onderwijs.
          </p>

          <div className="space-y-10">
            {PROJECTS.filter((p) => p.category !== 'education').map((project, index) => (
              <article
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? '' : ''}`}>
                  <div className="relative h-64 lg:h-auto min-h-64">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      {project.sdgGoals.map((sdg) => (
                        <span key={sdg} className={`${SDG_COLORS[sdg]} text-white text-xs font-bold rounded-lg px-2.5 py-1 shadow-sm`} title={`SDG ${sdg}: ${SDG_NAMES[sdg]}`}>
                          SDG {sdg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-shoma-slate mb-3">{project.title}</h2>
                    <p className="text-shoma-slate/65 leading-relaxed mb-6">{project.description}</p>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {project.stats.map((stat) => (
                        <div key={stat.label} className="bg-shoma-sand rounded-xl p-3 text-center">
                          <p className="font-extrabold text-shoma-teal text-lg leading-tight">{stat.value}</p>
                          <p className="text-xs text-shoma-slate/55 mt-1 leading-tight">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-shoma-slate/55 mb-1.5">
                        <span>Financieringsvoortgang</span>
                        <span className="font-semibold text-shoma-teal">
                          {Math.round((project.currentFunding / project.targetFunding) * 100)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-shoma-sand rounded-full overflow-hidden">
                        <div
                          className="h-full bg-shoma-teal rounded-full"
                          style={{ width: `${Math.min((project.currentFunding / project.targetFunding) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-shoma-slate/50 mt-1">
                        <span>€ {project.currentFunding.toLocaleString('nl-NL')} ingezameld</span>
                        <span>Doel: € {project.targetFunding.toLocaleString('nl-NL')}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.sdgGoals.map((sdg) => (
                        <span key={sdg} className="inline-flex items-center gap-1.5 text-xs bg-shoma-sand text-shoma-teal font-medium rounded-full px-3 py-1">
                          <CheckCircle className="w-3 h-3" />
                          {SDG_NAMES[sdg]}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/doneren"
                      className="inline-flex items-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm self-start"
                    >
                      Ondersteun dit project <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── Overzicht totalen ──────────────────────────────────────────────── */}
        <section className="mt-14">
          <div className="bg-shoma-teal-dark rounded-3xl p-8 text-white">
            <h2 className="text-xl font-bold mb-6 text-center">Totaaloverzicht gesponsorde leerlingen 2025</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white/10 rounded-2xl p-5 text-center">
                <GraduationCap className="w-8 h-8 mx-auto mb-2 text-shoma-terracotta-light" />
                <p className="text-3xl font-extrabold">74</p>
                <p className="text-sm text-white/70 mt-1">KEMPS-leerlingen gesponsord</p>
                <p className="text-xs text-white/50 mt-0.5">Nursery t/m Klas 7</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-shoma-terracotta-light" />
                <p className="text-3xl font-extrabold">155</p>
                <p className="text-sm text-white/70 mt-1">Reguliere leerlingen gesponsord</p>
                <p className="text-xs text-white/50 mt-0.5">€40/jaar per kind</p>
              </div>
              <div className="bg-shoma-terracotta/80 rounded-2xl p-5 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-3xl font-extrabold">229</p>
                <p className="text-sm text-white/90 mt-1">Totaal kinderen geholpen</p>
                <p className="text-xs text-white/70 mt-0.5">Schooljaar 2025</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
