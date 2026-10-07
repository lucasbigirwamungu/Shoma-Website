import type { Metadata, Viewport } from 'next';
import './globals.css';
import MorphicNavbar from '@/components/layout/MorphicNavbar';
import Footer from '@/components/layout/Footer';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: 'Stichting Shoma – Onderwijs voor kinderen in Tanzania',
    template: '%s | Stichting Shoma',
  },
  description:
    'Stichting Shoma bevordert onderwijs voor kansarme kinderen in Rubya, Noordwest-Tanzania. ANBI erkend, onbezoldigd bestuur en volledige transparantie via de jaarrekeningen.',
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
      'ANBI erkend · Onbezoldigd bestuur · Volledig transparant. Sponsor een kind voor slechts €40 per jaar.',
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
    description: 'ANBI erkend · Onbezoldigd bestuur · Volledig transparant.',
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
    <html lang="nl" className={cn("font-sans", geist.variable)}>
      <body className="flex flex-col min-h-screen antialiased">
        <MorphicNavbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
