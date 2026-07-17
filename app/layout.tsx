import type { Metadata, Viewport } from 'next';
import './globals.css';
import SideNavbar from '@/components/layout/SideNavbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Stichting Shoma – Onderwijs voor kinderen in Tanzania',
    template: '%s | Stichting Shoma',
  },
  description:
    'Stichting Shoma bevordert onderwijs voor kansarme kinderen in Rubya, Noordwest-Tanzania. ANBI erkend, 0% overhead – elke euro gaat direct naar een kind.',
  keywords: [
    'Stichting Shoma',
    'Tanzania onderwijs',
    'ANBI donatie',
    'KEMPS school',
    'Rubya Tanzania',
    'onderwijs sponsoring',
    'MVO partner',
  ],
  authors: [{ name: 'Stichting Shoma' }],
  creator: 'Stichting Shoma',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shoma.nl'
  ),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: '/',
    siteName: 'Stichting Shoma',
    title: 'Stichting Shoma – Onderwijs voor kinderen in Tanzania',
    description:
      '0% overhead · ANBI erkend · Elke euro direct naar Rubya. Sponsor een kind voor slechts €40 per jaar.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Kinderen op school in Rubya, Tanzania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stichting Shoma – Onderwijs voor kinderen in Tanzania',
    description: '0% overhead · ANBI erkend · Elke euro direct naar Rubya.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D5C63',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className="flex flex-col min-h-screen antialiased">
        <SideNavbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
