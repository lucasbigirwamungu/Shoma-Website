'use client';

import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { getDashboardStats } from '@/lib/compenseer/supabase-client';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';

type DashboardStats = Awaited<ReturnType<typeof getDashboardStats>>;

export default function CompenseerAdminPage() {
  const { user, logout } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setStats(await getDashboardStats());
      } catch (error) {
        console.error('Failed to load stats:', error);
        setFailed(true);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const cards = [
    { label: 'Afgeronde donaties', value: stats?.totalDonations ?? 0 },
    { label: 'Bomen toegewezen', value: stats?.totalTrees ?? 0 },
    { label: 'Gezonde bomen', value: stats?.healthyTrees ?? 0 },
    { label: 'M-Pesa-betalingen in afwachting', value: stats?.pendingPayments ?? 0 },
    { label: 'CO₂ gecompenseerd', value: `${(Math.round((stats?.totalCo2 ?? 0) / 100) / 10).toLocaleString('nl-NL')} t` },
  ];

  return (
    <main className="min-h-screen bg-shoma-sand px-4 pb-16 pt-28 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-shoma-slate mb-2">
              Beheer Compenseer en Leer
            </h1>
            <p className="text-shoma-slate/75">
              Actuele cijfers uit de database{user ? `, ingelogd als ${user.email}` : ''}.
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-shoma-teal/25 bg-white px-4 py-2 text-sm font-semibold text-shoma-teal transition-colors hover:bg-shoma-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-shoma-terracotta focus-visible:ring-offset-2"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Uitloggen
          </button>
        </div>

        {failed && (
          <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            De cijfers konden niet worden geladen. Controleer de verbinding met de database en
            laad de pagina opnieuw.
          </p>
        )}

        <dl className="grid grid-cols-2 lg:grid-cols-5 gap-4" aria-busy={loading}>
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-shoma-teal/15 bg-white p-6">
              <dd className="text-3xl font-bold text-shoma-teal tabular-nums">
                {loading ? <span className="text-shoma-slate/40">...</span> : card.value}
              </dd>
              <dt className="mt-2 text-sm text-shoma-slate/75">{card.label}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-shoma-slate/75">
          Het valideren van groeifoto&apos;s, het goedkeuren van M-Pesa-betalingen en het exporteren
          van rapporten zijn nog niet gebouwd. Tot die tijd gebeurt dit rechtstreeks in Supabase.
        </p>
      </div>
    </main>
  );
}
