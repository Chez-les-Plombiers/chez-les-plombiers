import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Chez Les Plombiers",
  description:
    "Politique de confidentialité et protection des données personnelles du site chezlesplombiers.fr",
  alternates: { canonical: `${SITE_URL}/politique-confidentialite` },
};

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl mb-12">
            Politique de Confidentialité
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl mb-4">Responsable du traitement</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Chez les Plombiers SAS</strong>
                <br />
                39 rue des Bourdonnais, 75001 Paris
                <br />
                Email : contact@chezlesplombiers.fr
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Données collectées</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous collectons les données suivantes dans le cadre de notre
                activité :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>
                  <strong>Données de navigation</strong> : adresse IP, type de
                  navigateur, pages consultées, durée de visite (via Google
                  Analytics)
                </li>
                <li>
                  <strong>Données de contact</strong> : nom, prénom, email,
                  téléphone (lorsque vous nous contactez ou réservez une visite
                  via Calendly)
                </li>
                <li>
                  <strong>Cookies</strong> : cookies analytiques et
                  fonctionnels, gérés via Axeptio
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Finalités du traitement</h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>
                  Répondre à vos demandes de contact et de réservation de visite
                </li>
                <li>
                  Améliorer notre site web et analyser la fréquentation (Google
                  Analytics)
                </li>
                <li>
                  Vous envoyer des informations commerciales (avec votre
                  consentement)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Base légale</h2>
              <p className="text-gray-700 leading-relaxed">
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>
                  Votre consentement (cookies, communications commerciales)
                </li>
                <li>
                  L&apos;exécution de mesures précontractuelles (demande de
                  visite, devis)
                </li>
                <li>
                  Notre intérêt légitime (amélioration du site, statistiques de
                  fréquentation)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Durée de conservation</h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données personnelles sont conservées pendant une durée
                maximale de 3 ans à compter de votre dernier contact. Les
                données de navigation sont conservées pendant 13 mois maximum.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Vos droits</h2>
              <p className="text-gray-700 leading-relaxed">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>Droit d&apos;accès à vos données personnelles</li>
                <li>Droit de rectification</li>
                <li>Droit à l&apos;effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d&apos;opposition</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à
                contact@chezlesplombiers.fr. Vous pouvez également adresser une
                réclamation à la CNIL (www.cnil.fr).
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Ce site utilise des cookies pour améliorer votre expérience de
                navigation et analyser le trafic. La gestion de vos préférences
                en matière de cookies est assurée par Axeptio. Vous pouvez
                modifier vos choix à tout moment en cliquant sur le widget
                Axeptio en bas de page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">
                Sous-traitants et destinataires
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données peuvent être transmises aux sous-traitants suivants
                :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>
                  <strong>Google Analytics</strong> (analyse de trafic) – Google
                  LLC, États-Unis
                </li>
                <li>
                  <strong>Calendly</strong> (réservation de visites) – Calendly
                  LLC, États-Unis
                </li>
                <li>
                  <strong>Vercel</strong> (hébergement) – Vercel Inc., États-Unis
                </li>
                <li>
                  <strong>Axeptio</strong> (gestion des cookies) – Axeptio SAS,
                  France
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Mise à jour</h2>
              <p className="text-gray-700 leading-relaxed">
                Cette politique de confidentialité peut être mise à jour à tout
                moment. Dernière mise à jour : février 2026.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
