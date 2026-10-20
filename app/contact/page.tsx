import type { Metadata } from 'next';
import { Mail, MapPin, Phone, Landmark, FileText, BadgeCheck } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import JsonLd from '@/components/seo/JsonLd';
import { pageJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Neem contact op met Stichting Shoma. Stel uw vraag via het contactformulier, of gebruik ons adres, telefoonnummer, e-mailadres of IBAN.',
};

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: 'Adres',
    lines: ['Stichting Shoma', 'Beekforelstraat 17', '7559 HC Hengelo'],
  },
  {
    icon: Phone,
    label: 'Telefoon',
    lines: ['+31 (0) 6 24 22 54 97'],
    href: 'tel:+31624225497',
  },
  {
    icon: Mail,
    label: 'E-mail',
    lines: ['info@shoma.nl'],
    href: 'mailto:info@shoma.nl',
  },
  {
    icon: Landmark,
    label: 'IBAN',
    lines: ['NL55 ABNA 0501 3541 58'],
  },
  {
    icon: FileText,
    label: 'KVK',
    lines: ['04076887'],
  },
  {
    icon: BadgeCheck,
    label: 'RSIN',
    lines: ['8143.90.249'],
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-shoma-sand">
      <JsonLd data={pageJsonLd('ContactPage', '/contact', 'Contact met Stichting Shoma')} />
      {/* Header */}
      <div className="bg-shoma-teal-dark text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-7 h-7 text-shoma-terracotta-light" aria-hidden="true" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Contact</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Heeft u een vraag over onze projecten, een donatie of wilt u op een andere manier
            bijdragen? Wij horen graag van u.
          </p>
        </div>
      </div>

      {/* Formulier + contactgegevens */}
      <section className="bg-shoma-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            <aside className="lg:col-span-2 bg-white rounded-3xl border border-shoma-teal/10 shadow-sm p-7 sm:p-8">
              <h2 className="text-xl font-bold text-shoma-slate mb-6">Contactgegevens</h2>
              <ul className="space-y-5">
                {CONTACT_DETAILS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex gap-4">
                      <div className="w-10 h-10 bg-shoma-teal/10 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-shoma-teal" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-shoma-slate/75 mb-0.5">
                          {item.label}
                        </p>
                        {item.lines.map((line) =>
                          item.href ? (
                            <a
                              key={line}
                              href={item.href}
                              className="block text-sm text-shoma-teal font-medium hover:underline underline-offset-2"
                            >
                              {line}
                            </a>
                          ) : (
                            <p key={line} className="text-sm text-shoma-slate/80 leading-relaxed">
                              {line}
                            </p>
                          )
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
