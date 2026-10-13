import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ShieldCheck, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacyverklaring',
  description:
    'Privacyverklaring van Stichting Shoma: welke persoonsgegevens wij verwerken, waarom wij dat doen, hoe lang wij ze bewaren en welke rechten u heeft.',};

const PDF_HREF = '/documenten/Privacyverklaring-Stichting-Shoma-2026.pdf';
const PRIVACY_EMAIL = 'secretariaat@shoma.nl';

const linkClass = 'text-shoma-teal font-medium underline underline-offset-2 hover:text-shoma-teal-dark';

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-shoma-teal/15 pt-8 mt-8 first:border-t-0 first:pt-0 first:mt-0">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-shoma-slate mb-4">{title}</h2>
      <div className="space-y-4 text-shoma-slate/85 leading-relaxed">{children}</div>
    </section>
  );
}

function Bullets({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-5 space-y-2 marker:text-shoma-teal">{children}</ul>;
}

export default function PrivacyverklaringPage() {
  return (
    <div className="min-h-screen bg-shoma-sand">
      {/* Header */}
      <div className="bg-shoma-teal-dark text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-7 h-7 text-shoma-terracotta-light" aria-hidden="true" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Privacyverklaring</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Stichting Onderwijsbevordering Noordwest Tanzania (Stichting Shoma) gaat zorgvuldig om met
            uw persoonsgegevens. Hier leest u welke gegevens wij verzamelen, waarom en hoe wij ermee
            omgaan.
          </p>
          <p className="text-white/70 text-sm mt-4">Laatst gewijzigd: 11 oktober 2026</p>
        </div>
      </div>

      <div className="bg-shoma-cream py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-3xl border border-shoma-teal/10 shadow-sm p-7 sm:p-10">
            <Section id="inleiding" title="1. Privacyverklaring Stichting Onderwijsbevordering Noordwest Tanzania">
              <p>
                Stichting Onderwijsbevordering Noordwest Tanzania respecteert de privacy van haar
                donateurs, relaties, nieuwsbriefabonnees en websitebezoekers. Wij verwerken
                persoonsgegevens zorgvuldig en in overeenstemming met de Algemene Verordening
                Gegevensbescherming (AVG). In deze verklaring leggen we uit welke gegevens we
                verzamelen, waarom we dit doen en hoe we hiermee omgaan.
              </p>
            </Section>

            <Section id="contactgegevens" title="2. Contactgegevens">
              <p>De verantwoordelijke voor de verwerking van de persoonsgegevens is:</p>
              <Bullets>
                <li><strong>Naam:</strong> Stichting Onderwijsbevordering Noordwest Tanzania</li>
                <li><strong>Handelsnaam:</strong> Stichting Shoma</li>
                <li><strong>Postadres:</strong> Beekforelstraat 17, 7559 HC Hengelo</li>
                <li>
                  <strong>Website:</strong>{' '}
                  <a href="https://www.shoma.nl" className={linkClass}>www.shoma.nl</a>
                </li>
                <li><strong>KVK-nummer:</strong> 04076887</li>
                <li><strong>RSIN / Fiscaal nummer (ANBI):</strong> 814390249</li>
                <li>
                  <strong>E-mailadres voor privacyzaken:</strong>{' '}
                  <a href={`mailto:${PRIVACY_EMAIL}`} className={linkClass}>{PRIVACY_EMAIL}</a>
                </li>
              </Bullets>
            </Section>

            <Section id="persoonsgegevens" title="3. Welke persoonsgegevens verwerken wij?">
              <p>
                Aangezien onze stichting volledig uit vrijwilligers bestaat en zich richt op de
                ondersteuning van projecten in noordwest Tanzania, verwerken wij enkel noodzakelijke
                gegevens:
              </p>
              <Bullets>
                <li>
                  <strong>Donateurs &amp; Vrienden:</strong> Voor- en achternaam, adresgegevens (indien
                  verstrekt), e-mailadres, bankrekeningnummer (IBAN) en de hoogte van de gedane giften.
                </li>
                <li><strong>Nieuwsbriefabonnees:</strong> Voornaam, achternaam en e-mailadres.</li>
                <li>
                  <strong>Contactzoekers:</strong> Naam en e-mailadres wanneer u contact met ons
                  opneemt via de website of per e-mail.
                </li>
                <li>
                  <strong>Beeldmateriaal:</strong> Foto&apos;s en video&apos;s van bestuursleden en van
                  projectbezoeken in Tanzania.
                </li>
                <li>
                  <strong>Websitebezoekers:</strong> Technische gegevens zoals een geanonimiseerd
                  IP-adres en paginabezoeken via functionele en analytische cookies.
                </li>
              </Bullets>
            </Section>

            <Section id="doelen" title="4. Doelen en grondslagen van de verwerking">
              <p>Wij verwerken uw persoonsgegevens uitsluitend voor de volgende doelen:</p>
              <ol className="list-decimal pl-5 space-y-3 marker:text-shoma-teal marker:font-semibold">
                <li>
                  <strong>Financiële administratie:</strong> Om giften en donaties correct te verwerken
                  en te administreren. <em>Grondslag: Uitvoering van de overeenkomst.</em>
                </li>
                <li>
                  <strong>Wettelijke verplichting:</strong> Als ANBI-stichting zijn wij verplicht een
                  transparante administratie bij te houden voor de Belastingdienst.{' '}
                  <em>Grondslag: Wettelijke verplichting.</em>
                </li>
                <li>
                  <strong>Digitale nieuwsbrief:</strong> Om u periodiek te informeren over de voortgang
                  van de projecten in Tanzania.{' '}
                  <em>
                    Grondslag: Toestemming (via de aanmelding) of Gerechtvaardigd belang (voor bestaande
                    actieve donateurs).
                  </em>
                </li>
                <li>
                  <strong>Visuele verslaglegging:</strong> Het plaatsen van foto&apos;s en video&apos;s
                  op onze website en in nieuwsbrieven om de impact van de projecten en onze bezoeken aan
                  Tanzania transparant te tonen aan onze achterban.{' '}
                  <em>Grondslag: Toestemming of Gerechtvaardigd belang.</em>
                </li>
              </ol>
            </Section>

            <Section id="nieuwsbrief" title="5. Digitale nieuwsbrief & Mailings">
              <p>
                Voor het verzenden van onze digitale nieuwsbrief maken wij gebruik van een extern
                e-mailmarketingsysteem genoemd TransIP.
              </p>
              <Bullets>
                <li>
                  Wanneer u zich inschrijft voor onze nieuwsbrief, geeft u expliciet toestemming om uw
                  naam en e-mailadres voor dit doel te gebruiken.
                </li>
                <li>
                  Bestaande donateurs kunnen wij op basis van ons gerechtvaardigd belang updates sturen
                  over de besteding van de gelden.
                </li>
                <li>
                  <strong>Uitschrijven:</strong> Onderaan iedere e-mail en digitale nieuwsbrief vindt u
                  een duidelijke link waarmee u zich te allen tijde direct en kosteloos kunt afmelden.
                  Uw gegevens worden dan direct van de mailinglijst verwijderd.
                </li>
              </Bullets>
            </Section>

            <Section id="beeldmateriaal" title="6. Beeldmateriaal (Foto's en Video's)">
              <p>
                Stichting Onderwijsbevordering Noordwest Tanzania publiceert foto&apos;s en video&apos;s
                van bestuursleden en projectbezoeken in Tanzania op de website en in nieuwsbrieven.
              </p>
              <Bullets>
                <li>Wij gaan hierbij altijd discreet en respectvol te werk.</li>
                <li>
                  Lokale medewerkers in Tanzania is ter plekke toestemming gevraagd voor het opnemen van
                  foto&apos;s en videomateriaal t.b.v. publicatiedoeleinden van onze stichting.
                </li>
                <li>
                  Mocht u onverhoopt een foto op onze website of in een nieuwsbrief zien waar u zelf op
                  staat en waar u bezwaar tegen heeft, dan kunt u dit aan ons kenbaar maken. Wij zullen
                  de betreffende afbeelding dan zo spoedig mogelijk (en uiterlijk binnen 1 maand)
                  verwijderen of onherkenbaar maken.
                </li>
              </Bullets>
            </Section>

            <Section id="bewaartermijnen" title="7. Hoe lang bewaren wij uw gegevens?">
              <p>Wij bewaren uw gegevens niet langer dan noodzakelijk:</p>
              <Bullets>
                <li>
                  <strong>Donatiegegevens:</strong> Vanwege de fiscale bewaarplicht voor stichtingen
                  bewaren wij financiële gegevens en de bijbehorende contactgegevens{' '}
                  <strong>7 jaar</strong> na de gedane gift.
                </li>
                <li>
                  <strong>Nieuwsbriefgegevens:</strong> Wij bewaren uw aanmeldgegevens zolang u
                  ingeschreven staat voor de nieuwsbrief. Na afmelding worden uw gegevens binnen de
                  software gearchiveerd of permanent gewist.
                </li>
                <li>
                  <strong>Contactgegevens:</strong> Indien u ons een losse vraag stelt, verwijderen wij
                  uw gegevens uiterlijk 1 jaar nadat uw vraag volledig is afgehandeld, tenzij u donateur
                  of nieuwsbriefabonnee bent geworden.
                </li>
              </Bullets>
            </Section>

            <Section id="derden" title="8. Delen van persoonsgegevens met derden">
              <p>
                Stichting Onderwijsbevordering Noordwest Tanzania verkoopt, verhuurt of deelt uw
                gegevens <strong>nooit</strong> aan derden. Uw gegevens worden uitsluitend gedeeld met
                partijen die noodzakelijk zijn voor onze bedrijfsvoering (zoals de bank voor het
                verwerken van transacties).
              </p>
            </Section>

            <Section id="beveiliging" title="9. Beveiliging van uw gegevens">
              <p>
                Wij nemen passende technische en organisatorische maatregelen om misbruik, verlies,
                onbevoegde toegang en ongewenste openbaarmaking van uw persoonsgegevens tegen te gaan.
                Onze website maakt gebruik van een betrouwbaar SSL-certificaat (herkenbaar aan het
                slotje in de adresbalk) om te borgen dat gegevensverkeer versleuteld verloopt.
              </p>
            </Section>

            <Section id="rechten" title="10. Uw rechten">
              <p>
                U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te laten
                verwijderen. Ook kunt u bezwaar maken tegen de verwerking van uw gegevens of uw
                toestemming voor de nieuwsbrief intrekken.
              </p>
              <p>
                Richt uw verzoek hiervoor aan het secretariaat via{' '}
                <a href={`mailto:${PRIVACY_EMAIL}`} className={linkClass}>{PRIVACY_EMAIL}</a>. Wij
                zullen zo spoedig mogelijk en uiterlijk binnen 4 weken op uw verzoek reageren. Mocht u
                ontevreden zijn over de afhandeling, dan heeft u het recht een klacht in te dienen bij
                de Nederlandse toezichthouder via de website van de{' '}
                <a
                  href="https://www.autoriteitpersoonsgegevens.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Autoriteit Persoonsgegevens
                </a>
                .
              </p>
            </Section>
          </article>

          <div className="mt-6 bg-shoma-sand rounded-2xl p-5 border border-shoma-teal/10 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-medium text-shoma-slate">Privacyverklaring Stichting Shoma 2026</p>
              <p className="text-sm text-shoma-slate/75 mt-0.5">De volledige verklaring als PDF.</p>
            </div>
            <a
              href={PDF_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-shoma-teal hover:bg-shoma-teal-dark text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 active:scale-[0.97] shrink-0"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
