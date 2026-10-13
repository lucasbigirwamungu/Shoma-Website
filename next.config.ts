import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Er is nog geen eigen privacypagina: verwijs naar het officiële privacybeleid op shoma.nl
  async redirects() {
    return [
      {
        source: '/privacyverklaring',
        destination:
          'https://www.shoma.nl/privacybeleid-stichting-onderwijsbevordering-noord-west-tanzania/',
        permanent: false,
      },
    ];
  },
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
    ];
  },
  images: {
    // Geen 3840px-variant: 2048px volstaat voor de grootste weergave en halveert de zwaarste bestanden
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default nextConfig;
