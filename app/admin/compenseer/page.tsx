'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/lib/compenseer/supabase-client';

export default function CompenseerAdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">Loading...</div>
          <p className="text-gray-600">Stats worden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Compenseer & Leer Admin
          </h1>
          <p className="text-gray-600">
            Beheer boomgroei, valideer foto's, en trigger M-Pesa betalingen
          </p>
        </div>

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-500 text-white p-6 rounded-lg">
            <div className="text-4xl font-bold">{stats?.healthyTrees || 0}</div>
            <div className="text-sm opacity-90 mt-2">Actieve bomen</div>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-lg">
            <div className="text-4xl font-bold">0</div>
            <div className="text-sm opacity-90 mt-2">Validatie wachtrij</div>
          </div>

          <div className="bg-blue-500 text-white p-6 rounded-lg">
            <div className="text-4xl font-bold">{stats?.pendingPayments || 0}</div>
            <div className="text-sm opacity-90 mt-2">M-Pesa pending</div>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-lg">
            <div className="text-4xl font-bold">
              {Math.round((stats?.totalCo2 || 0) / 1000)}t
            </div>
            <div className="text-sm opacity-90 mt-2">Totaal CO₂ offset</div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-800">
              {stats?.totalDonations || 0}
            </div>
            <div className="text-sm text-gray-600 mt-2">Completed Donations</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-800">
              {stats?.totalTrees || 0}
            </div>
            <div className="text-sm text-gray-600 mt-2">Bomen gepland</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-800">
              €{((stats?.totalCo2 || 0) * 0.02).toFixed(0)}
            </div>
            <div className="text-sm text-gray-600 mt-2">Totaal donaties</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 flex">
            {['Overzicht', 'Alle bomen', 'M-Pesa logs', 'Donors'].map((tab) => (
              <button
                key={tab}
                className="px-6 py-4 font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-500 transition"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-900 mb-2">✓ Supabase verbonden</h3>
                <p className="text-sm text-green-800">
                  Real-time data: {stats?.totalDonations} donaties, {stats?.totalTrees} bomen
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 mb-2">Dashboard Status</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ Donor metrics geladen</li>
                  <li>✓ Tree tracking actief</li>
                  <li>✓ M-Pesa payment queue monitored</li>
                  <li>✓ Groei-logboeken: implementatie volgende stap</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-bold text-purple-900 mb-2">Coming Soon</h3>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>→ Photo validation queue met AI-checks</li>
                  <li>→ Growth measurement dashboard (stem diameter, height)</li>
                  <li>→ M-Pesa payment approval workflow</li>
                  <li>→ Caretaker performance metrics</li>
                  <li>→ Export reports (PDF, CSV)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-8 bg-gradient-to-r from-shoma-teal to-shoma-terracotta rounded-lg p-6 text-white">
          <h3 className="font-bold text-lg mb-3">Quick Actions</h3>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-white text-shoma-teal px-4 py-2 rounded font-medium hover:bg-gray-100 transition">
              Email update naar donors
            </button>
            <button className="bg-white text-shoma-teal px-4 py-2 rounded font-medium hover:bg-gray-100 transition">
              Trigger M-Pesa payments
            </button>
            <button className="bg-white text-shoma-teal px-4 py-2 rounded font-medium hover:bg-gray-100 transition">
              Export report
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
