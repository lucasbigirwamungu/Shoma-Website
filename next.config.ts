import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Bewust minimaal: geen script-src, want die vraagt om nonces in de hele app
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Pagina's leveren HTML of (voor agents) Markdown, afhankelijk van Accept; zie middleware.ts
        source: '/((?!api/|_next/|mcp|\\.well-known/|.*\\.[^/]+$).*)',
        headers: [{ key: 'Vary', value: 'Accept' }],
      },
    ];
  },
  async redirects() {
    // Voorspelbare Engelstalige paden voor agents en scanners
    return [
      { source: '/about', destination: '/over-ons', permanent: true },
      { source: '/privacy', destination: '/privacyverklaring', permanent: true },
      { source: '/donate', destination: '/doneren', permanent: true },
    ];
  },
  images: {
    // Geen 3840px-variant: 2048px volstaat voor de grootste weergave en halveert de zwaarste bestanden
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default nextConfig;
