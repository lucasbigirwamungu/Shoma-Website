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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
