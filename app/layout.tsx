import type { Metadata, Viewport } from 'next';
import './globals.css';
import MorphicNavbar from '@/components/layout/MorphicNavbar';
import Footer from '@/components/layout/Footer';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { siteUrl } from "@/lib/site-url";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });


export const metadata: Metadata = {
  title: {
    default: 'Stichting Shoma – Onderwijs voor kinderen in Tanzania',
    template: '%s | Stichting Shoma',
  },
  description:
    'Stichting Shoma bevordert onderwijs voor kansarme kinderen in Rubya, Noordwest-Tanzania. ANBI erkend, onbezoldigd bestuur en openbare jaarrekeningen.',
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
  metadataBase: new URL(siteUrl),
  // './' wordt per route opgelost, zodat elke pagina naar zichzelf verwijst
  alternates: { canonical: './' },
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
        url: '/images/hero-kemps.jpg',
        width: 1600,
        height: 1201,
        alt: 'Leerlingen en team van KEMPS voor het schoolgebouw in Rubya, Tanzania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stichting Shoma – Onderwijs voor kinderen in Tanzania',
    description: 'ANBI erkend · Onbezoldigd bestuur · Volledig transparant.',
    images: ['/images/hero-kemps.jpg'],
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
  themeColor: '#4a3010',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={cn("font-sans", inter.variable)}>
      <body className="flex flex-col min-h-screen antialiased">
        <a
          href="#inhoud"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-shoma-slate focus:shadow-lg"
        >
          Ga naar de inhoud
        </a>
        <MorphicNavbar />
        <main id="inhoud" tabIndex={-1} className="flex-1 outline-none">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
