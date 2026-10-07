'use client';

import { Share2 } from 'lucide-react';

export default function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Stichting Shoma – Onderwijs voor Tanzania',
          text: 'Ik steun onderwijs voor kinderen in Rubya, Tanzania via Stichting Shoma. ANBI erkend en volledig transparant. Doe jij ook mee?',
          url: 'https://shoma.nl',
        });
      } catch {
        // Gebruiker annuleerde het deelscherm, geen actie nodig
      }
    } else {
      // Fallback: kopieer URL naar klembord
      await navigator.clipboard.writeText('https://shoma.nl');
      alert('Link gekopieerd naar het klembord!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-shoma-teal border border-shoma-teal/30 hover:bg-shoma-teal hover:text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
    >
      <Share2 className="w-4 h-4" aria-hidden="true" />
      Deel op social media
    </button>
  );
}
