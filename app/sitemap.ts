import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';

const ROUTES = [
  '',
  '/over-ons',
  '/projecten',
  '/projecten/verhalen',
  '/compenseer-en-leer',
  '/voor-bedrijven',
  '/nieuws',
  '/contact',
  '/doneren',
  '/privacyverklaring',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '/nieuws' ? 'monthly' : 'yearly',
    priority: route === '' || route === '/doneren' ? 1 : 0.7,
  }));
}
