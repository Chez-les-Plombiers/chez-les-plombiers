import Image from "next/image";

/**
 * Le logotype, avec sa ligne de pied optionnelle.
 *
 * Le fichier officiel `logotype-adresse-blanc.png` grave l'adresse dans
 * l'image. Or Étienne veut la même construction déclinée par lieu :
 *
 *     CHEZ LES PLOMBIERS        CHEZ LES PLOMBIERS        CHEZ LES PLOMBIERS
 *         L'ATELIER                 LA BOUTIQUE             L'APPARTEMENT
 *
 * On ne fabrique donc pas trois PNG de plus : on compose le mot-symbole
 * détouré avec une ligne de texte en Eurostile — la fonte de la marque, qu'on
 * a. C'est plus net à toutes les tailles, ça se recolore par lieu (laiton,
 * bleu, rose), c'est lisible par un moteur de recherche, et une quatrième
 * déclinaison ne coûte rien.
 *
 * ⚠️ `logotype-noir.png` / `logotype-blanc` font 2000×2000 avec d'énormes
 * marges : à hauteur fixe le lettrage devient minuscule. On part de
 * `logo-white.png` / `logo-black.png`, qui sont détourés.
 *
 * ⚠️ Un logo reste une image. Ce composant porte un `alt` complet, mais il ne
 * remplace pas le H1 en texte de la page d'accueil, qui est ce que Google lit.
 */
interface LogoProps {
  /** Ligne de pied. Omise, le mot-symbole est seul — c'est le cas de l'en-tête. */
  pied?: string;
  /** Hauteur du mot-symbole en pixels. La ligne de pied s'y accorde. */
  hauteur?: number;
  /** `false` pour la version noire, sur fond clair. */
  clair?: boolean;
  className?: string;
  priority?: boolean;
}

export function Logo({
  pied,
  hauteur = 28,
  clair = true,
  className,
  priority,
}: LogoProps) {
  return (
    <span className={`inline-flex flex-col items-center ${className ?? ""}`}>
      <Image
        src={clair ? "/images/logo/logo-white.png" : "/images/logo/logo-black.png"}
        alt={pied ? `Chez les Plombiers — ${pied}` : "Chez les Plombiers"}
        width={790}
        height={156}
        priority={priority}
        style={{ height: hauteur, width: "auto" }}
      />
      {pied && (
        /*
         * Proportions relevées sur le lockup officiel à l'adresse : la ligne de
         * pied fait ~13 % de la hauteur du mot-symbole, très interlettrée, et
         * s'en écarte d'environ un quart de cette hauteur.
         */
        <span
          className="font-clp font-bold uppercase leading-none"
          style={{
            fontSize: Math.max(7, hauteur * 0.13),
            letterSpacing: "0.22em",
            marginTop: hauteur * 0.24,
            // L'interlettrage pousse le texte vers la droite : on compense
            // pour que la ligne reste optiquement centrée sous le mot-symbole.
            textIndent: "0.22em",
          }}
        >
          {pied}
        </span>
      )}
    </span>
  );
}
