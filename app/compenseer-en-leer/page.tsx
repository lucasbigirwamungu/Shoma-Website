import { Metadata } from 'next';
import IndividualDonationForm from '@/components/compenseer/IndividualDonationForm';

export const metadata: Metadata = {
  title: 'Compenseer & Leer | Shoma',
  description:
    'Compenseer je CO₂ voetafdruk en plant bomen in Tanzania. Je donatie steunt lokale schooltuinen en onderwijs.',
};

export default function CompenseerEnLeerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-shoma-sand to-white">
      <section className="bg-gradient-to-r from-shoma-teal to-shoma-terracotta text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Compenseer & Leer
          </h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">
            Bereken je CO₂ voetafdruk, doneer, en plant bomen in Rubya, Tanzania.
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
                desc: 'Vluchturen, gereden km, of jaarlijkse CO₂ uitstoot',
              },
              {
                num: '2',
                title: 'Donatie berekenen',
                desc: 'We berekenen CO₂ en hoeveel bomen nodig zijn',
              },
              {
                num: '3',
                title: 'Impact zien',
                desc: 'Je persoonlijke certificate en boomgroei-updates',
              },
              {
                num: '4',
                title: 'Betaal & plant',
                desc: 'iDEAL betaling, bomen groeien in Rubya',
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 bg-shoma-terracotta text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-shoma-sand">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-shoma-teal mb-8 text-center">
            Wat krijg je?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '📜',
                title: 'Persoonlijk Certificate',
                desc: 'Mooi PDF met je naam, bomen, CO₂ offset en foto\'s van groei',
              },
              {
                icon: '📸',
                title: 'Groei-updates',
                desc: 'Regelmatig foto\'s en voortgang van jouw bomen in Rubya',
              },
              {
                icon: '👨‍👩‍👧‍👦',
                title: 'Onderwijs impact',
                desc: '~50% van donatie gaat naar schoolfonds in Rubya',
              },
              {
                icon: null,
                title: 'CO₂ offset',
                desc: 'Jouw voetafdruk compleet gecompenseerd over 20-40 jaar',
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
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
                a: 'Op basis van vliegtijd (0.255 kg/uur), autokilometers (0.192 kg/km) of jaarlijkse voetafdruk. Dit zijn gemiddelde EU emissies.',
              },
              {
                q: 'Zijn de bomen echt?',
                a: 'Ja, 100%. Lokale teams in Rubya planten en verzorgen bomen op schoolterreinen. Groei wordt met GPS + foto\'s gedocumenteerd.',
              },
              {
                q: 'Hoe lang groeien de bomen?',
                a: 'Afhankelijk van soort: 20-40 jaar. Gedurende dien tijd sequestren ze CO₂. Zelfs na dien tijd blijft de CO₂ opgeslagen.',
              },
              {
                q: 'Kan ik dit als bedrijf doen?',
                a: 'Ja! Klik "Voor bedrijven" en voer je organisatie in (grootte, CO₂ scope). Je krijgt MVO-certificaat voor klanten/partners.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-lg border border-gray-200"
              >
                <summary className="px-6 py-4 cursor-pointer font-medium text-gray-800 hover:bg-orange-100 transition">
                  {faq.q}
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-600 border-t border-gray-200">
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
