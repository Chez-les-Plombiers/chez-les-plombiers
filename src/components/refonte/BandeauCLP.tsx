import Image from "next/image";

/**
 * Le bandeau blanc — la direction artistique retenue par Étienne (20/09/2026).
 *
 * C'est le key visual de l'Instagram de CHEZ LES PLOMBIERS, repris tel quel :
 * une photo, une bande blanche dessous, le monogramme à gauche, et le texte en
 * capitales très espacées. Le reprendre unifie le site et le compte, au lieu
 * d'inventer une identité par-dessus une identité qui fonctionne déjà.
 *
 * ⚠️ La troisième ligne est du TEXTE, pas une image. Le logotype existe avec
 * l'adresse gravée dessous, mais Étienne veut pouvoir la remplacer par
 * « L'ATELIER », « LA BOUTIQUE » ou « L'APPARTEMENT ROSE » — et du texte reste
 * lisible par les moteurs et les modèles de langage, ce qu'un logo n'est pas.
 */

interface BandeauCLPProps {
  /** Lignes du bandeau. La première est la plus grande. */
  lignes: readonly string[];
  /** Fond sombre : monogramme blanc et texte clair. */
  sombre?: boolean;
  className?: string;
}

export function BandeauCLP({ lignes, sombre = false, className = "" }: BandeauCLPProps) {
  const [titre, ...suite] = lignes;

  return (
    <div
      className={`flex items-center gap-4 px-5 py-4 sm:gap-7 sm:px-8 sm:py-6 ${
        sombre ? "bg-[#1B1A17] text-[#F1EEE8]" : "bg-white text-[#1B1A17]"
      } ${className}`}
    >
      <Image
        src={sombre ? "/images/logo/monogramme-blanc.png" : "/images/logo/monogramme-noir.png"}
        alt="Monogramme Chez les Plombiers"
        width={2709}
        height={1419}
        className="h-7 w-auto shrink-0 sm:h-10"
      />
      <div className="min-w-0">
        <p className="font-display text-[11px] font-medium uppercase leading-tight tracking-[0.24em] sm:text-[15px]">
          {titre}
        </p>
        {suite.map((l) => (
          <p
            key={l}
            className={`font-display text-[9px] uppercase leading-snug tracking-[0.22em] sm:text-[11px] ${
              sombre ? "text-[#F1EEE8]/60" : "text-[#77716A]"
            }`}
          >
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
