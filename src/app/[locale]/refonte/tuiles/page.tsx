import type { Metadata } from "next";
import Image from "next/image";

/**
 * Planche contact — le choix de la photo de tuile, un lieu à la fois.
 *
 * ⚠️ TEMPORAIRE. À supprimer une fois les trois photos choisies. Cette page
 * n'existe que pour qu'Étienne réponde par des numéros au lieu de décrire une
 * photo de mémoire.
 *
 * L'ATELIER n'y est pas : la photo est déjà tranchée — le plan large au canapé
 * rose et au coffre-fort du fond, celle du lien Calendly. Étienne : « c'est ma
 * préférée, on ne l'a pas beaucoup utilisée ».
 */
export const metadata: Metadata = {
  title: "Planche contact — photos de tuile",
  robots: { index: false, follow: false, nocache: true },
};

const BOUTIQUE = Array.from({ length: 11 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    num: `B${n}`,
    src: `/photos/boutique/candidats/b${n}.jpg`,
    // Les six premières sont les paysages, les cinq suivantes les portraits.
    format: i < 6 ? ("paysage" as const) : ("portrait" as const),
  };
});

const APPARTEMENT = Array.from({ length: 11 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { num: `A${n}`, src: `/photos/appartement/appartement-${n}.jpg` };
});

export default function TuilesPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] px-4 py-10 text-[#E8E4DC] antialiased sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        <h1 className="font-clp text-sm font-bold uppercase tracking-[0.1em]">
          Quelle photo pour quelle tuile ?
        </h1>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#A8A29A]">
          Réponds par des numéros — « B04 et A07 » suffit. La tuile est en
          format paysage&nbsp;: une photo verticale y sera recadrée serré.
        </p>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#8A8A8A]">
          L&apos;ATELIER est déjà choisi : le plan large au canapé rose et au
          coffre-fort du fond.
        </p>

        <Section titre="La Boutique">
          <Grille>
            {BOUTIQUE.map((p) => (
              <Vignette key={p.num} num={p.num} src={p.src} note={p.format} />
            ))}
          </Grille>
        </Section>

        <Section titre="L'Appartement">
          <Grille>
            {APPARTEMENT.map((p) => (
              <Vignette key={p.num} num={p.num} src={p.src} />
            ))}
          </Grille>
        </Section>

        <p className="mt-12 font-clp text-[10px] uppercase tracking-[0.18em] text-[#5E5E5E]">
          Page de travail, à supprimer après le choix
        </p>
      </div>
    </div>
  );
}

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <p className="mb-3 font-clp text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
        {titre}
      </p>
      {children}
    </section>
  );
}

function Grille({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
}

function Vignette({ num, src, note }: { num: string; src: string; note?: string }) {
  return (
    <figure className="border border-[#3A3A3A] bg-[#242424]">
      {/* Cadré comme la tuile le sera, pour qu'on juge le recadrage réel. */}
      <div className="relative aspect-[4/3] w-full">
        <Image src={src} alt={num} fill sizes="(max-width:640px) 50vw, 280px" className="object-cover" />
      </div>
      <figcaption className="flex items-baseline justify-between gap-2 border-t border-[#3A3A3A] px-3 py-2">
        <span className="font-mono text-[12px] font-bold">{num}</span>
        {note && <span className="font-mono text-[10px] text-[#8A8A8A]">{note}</span>}
      </figcaption>
    </figure>
  );
}
