import { Metadata } from 'next';
import { Award, Camera, GraduationCap, Leaf } from 'lucide-react';
import IndividualDonationForm from '@/components/compenseer/IndividualDonationForm';

export const metadata: Metadata = {
  title: 'Compenseer en Leer',
  description:
    'Compenseer uw CO₂-voetafdruk en plant bomen in Tanzania. Uw donatie steunt lokale schooltuinen en onderwijs in Rubya via Stichting Shoma.',
};

export default function CompenseerEnLeerPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-shoma-teal-dark text-white pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Compenseer & Leer
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            Bereken uw CO₂-voetafdruk, doneer en plant bomen in Rubya, Tanzania.
            Iedere boom groeit in een schooltuin en ondersteunt onderwijs.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-shoma-cream">
        <IndividualDonationForm />
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-shoma-teal mb-8 text-center">
            Hoe werkt het?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: '1',
                title: 'Voetafdruk invoeren',
                desc: 'Vlieguren, gereden kilometers of jaarlijkse CO₂-uitstoot',
              },
              {
                num: '2',
                title: 'Donatie berekenen',
                desc: 'Wij berekenen de CO₂ en hoeveel bomen daarvoor nodig zijn',
              },
              {
                num: '3',
                title: 'Impact zien',
                desc: 'Uw persoonlijke certificaat en updates over de boomgroei',
              },
              {
                num: '4',
                title: 'Betalen en planten',
                desc: 'Betaling met iDEAL, de bomen groeien in Rubya',
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 bg-shoma-terracotta text-shoma-slate rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-shoma-slate mb-2">{step.title}</h3>
                <p className="text-sm text-shoma-slate/75">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-shoma-sand">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-shoma-teal mb-8 text-center">
            Wat krijgt u?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Award,
                title: 'Persoonlijk certificaat',
                desc: 'Een pdf met uw naam, het aantal bomen, de gecompenseerde CO₂ en foto\'s van de groei',
              },
              {
                icon: Camera,
                title: 'Groei-updates',
                desc: 'Regelmatig foto\'s en voortgang van uw bomen in Rubya',
              },
              {
                icon: GraduationCap,
                title: 'Impact op onderwijs',
                desc: 'Ongeveer 50% van de donatie gaat naar het schoolfonds in Rubya',
              },
              {
                icon: Leaf,
                title: 'CO₂-compensatie',
                desc: 'Uw voetafdruk wordt in 20 tot 40 jaar volledig gecompenseerd',
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border border-shoma-teal/15 hover:shadow-md transition"
              >
                <benefit.icon className="mb-3 h-8 w-8 text-shoma-teal" aria-hidden="true" />
                <h3 className="font-bold text-shoma-slate mb-2">{benefit.title}</h3>
                <p className="text-sm text-shoma-slate/75">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-shoma-clay">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-shoma-teal mb-8 text-center">
            Veelgestelde vragen
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Hoe wordt mijn CO₂ berekend?',
                a: 'Op basis van vliegtijd (0.255 kg/uur), autokilometers (0.192 kg/km) of jaarlijkse voetafdruk. Dit zijn gemiddelde Europese emissiecijfers.',
              },
              {
                q: 'Zijn de bomen echt?',
                a: 'Ja, 100%. Lokale teams in Rubya planten en verzorgen bomen op schoolterreinen. De groei wordt met gps en foto\'s vastgelegd.',
              },
              {
                q: 'Hoe lang groeien de bomen?',
                a: 'Afhankelijk van de soort 20 tot 40 jaar. In die tijd leggen ze CO₂ vast, en ook daarna blijft de CO₂ opgeslagen.',
              },
              {
                q: 'Kan ik dit als bedrijf doen?',
                a: 'Ja. Kies "Voor bedrijven" en vul de gegevens van uw organisatie in (grootte, CO₂-scope). U krijgt een MVO-certificaat voor klanten en partners.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-lg border border-shoma-teal/15"
              >
                <summary className="px-6 py-4 min-h-11 cursor-pointer font-medium text-shoma-slate hover:bg-shoma-sand rounded-lg transition">
                  {faq.q}
                </summary>
                <div className="px-6 pb-4 text-sm text-shoma-slate/75 border-t border-shoma-teal/15">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
