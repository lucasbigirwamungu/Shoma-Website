// Een localhost-waarde in de productie-omgeving levert kapotte deel-links op;
// val dan terug op het Vercel-productiedomein.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl =
  configuredUrl &&
  !(process.env.NODE_ENV === 'production' && configuredUrl.includes('localhost'))
    ? configuredUrl
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://shoma.nl';
