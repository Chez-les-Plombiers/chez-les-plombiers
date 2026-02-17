import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Mentions Légales | Chez Les Plombiers",
  description: "Mentions légales du site chezlesplombiers.fr",
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
};

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl mb-12">Mentions Légales</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl mb-4">Éditeur du site</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Chez les Plombiers SAS</strong>
                <br />
                39 rue des Bourdonnais, 75001 Paris
                <br />
                Capital social : 5 000 €
                <br />
                SIREN : 928 788 157
                <br />
                SIRET : 928 788 157 00016
                <br />
                TVA intracommunautaire : FR04 928 788 157
                <br />
                Code NAF / APE : 82 30Z – Organisation de foires, salons
                professionnels et congrès
                <br />
                Date de création : 02/05/2024
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Email : contact@chezlesplombiers.fr
                <br />
                Téléphone : 06 88 67 99 81
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Hébergement</h2>
              <p className="text-gray-700 leading-relaxed">
                Ce site est hébergé par{" "}
                <strong>Vercel Inc.</strong>
                <br />
                440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Propriété intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images, logos,
                vidéos) est la propriété exclusive de Chez les Plombiers SAS,
                sauf mention contraire. Toute reproduction, représentation,
                modification, publication ou adaptation de tout ou partie des
                éléments du site est interdite sans autorisation écrite
                préalable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">
                Limitation de responsabilité
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Les informations contenues sur ce site sont aussi précises que
                possible et le site est mis à jour régulièrement, mais peut
                toutefois contenir des inexactitudes, des omissions ou des
                lacunes. Chez les Plombiers SAS ne pourra être tenue responsable
                des dommages directs ou indirects résultant de
                l&apos;utilisation de ce site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Crédits</h2>
              <p className="text-gray-700 leading-relaxed">
                Conception et développement :{" "}
                <a
                  href="https://www.growth-acceleration.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  Growth Acceleration
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
