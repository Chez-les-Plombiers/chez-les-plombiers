"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Les photos d'une tuile de lieu : trois vues qu'on fait défiler.
 *
 * Demande d'Étienne, 20/09/2026 : « ça serait logique qu'on puisse déjà voir
 * deux ou trois photos depuis cette page-là — des petites flèches à droite et à
 * gauche. Et quand on sera sur iPhone, il faudra juste les slider. »
 *
 * ── POURQUOI CE MONTAGE, ET PAS UN CARROUSEL CLASSIQUE ───────────────────
 *
 * Le défilement est un `overflow-x` natif avec accroche (`scroll-snap`). Le
 * glissement au doigt est donc celui du navigateur : rien à écrire, rien qui
 * lutte contre le geste du système, et ça marche même si le JavaScript n'a pas
 * encore été chargé. Les flèches ne font que pousser ce même défilement.
 *
 * ⚠️ Toute la tuile est un lien (décision d'Étienne : « que toute la tuile soit
 * un bouton à part entière »). Deux pièges en découlent :
 *
 * 1. Un `<button>` DANS un `<a>` est du HTML invalide. Les flèches sont donc
 *    hors du lien, posées par-dessus en `z-20` — le lien est en `z-10`.
 * 2. Un lien étiré par-dessus la zone photo **mangerait le glissement** : le
 *    doigt toucherait le lien, pas le conteneur qui défile, et rien ne
 *    bougerait horizontalement. Chaque vue porte donc son propre lien, à
 *    l'intérieur du conteneur défilant. Le navigateur sait déjà distinguer un
 *    appui d'un glissement sur un lien — c'est exactement ce qu'on veut.
 *
 * Ces liens de vue sont retirés de l'arbre d'accessibilité : le nom du lieu est
 * porté une seule fois, par le lien du bloc de texte en dessous.
 */
/**
 * ── LE CLIC : NAVIGUER OU AGRANDIR ────────────────────────────────────────
 *
 * Les deux, selon l'endroit, et la règle est simple :
 *
 * - sur une TUILE de l'accueil, la photo est une vignette de navigation. Le
 *   clic mène au lieu. Passer `href`.
 * - sur la PAGE d'un lieu, on y est déjà : le clic n'a plus rien à ouvrir
 *   ailleurs, il agrandit. Passer `agrandir`.
 *
 * Demande d'Étienne, 20/09/2026 : « si on clique, il faudrait que ça s'affiche
 * en grand ». Sur la page du lieu, oui. Sur la tuile, non : ce serait un
 * cul-de-sac au milieu d'un sommaire.
 */
interface TuilePhotosProps {
  photos: readonly string[];
  /** Cible du clic. Chaque vue porte ce lien pour que l'appui marche partout. */
  href?: string;
  /** Le clic ouvre la photo en grand au lieu de suivre un lien. */
  agrandir?: boolean;
  /** Pour les textes de remplacement. */
  lieu: string;
  /**
   * Format des vues. Les tuiles sont en 4/3 ; la photo d'ouverture est large.
   * Une classe Tailwind complète, pas un fragment : la compilation ne lit que
   * des noms de classe entiers.
   */
  ratio?: string;
  /** Vues par défilement. Une seule presque partout ; deux sur les larges. */
  sizes?: string;
}

export function TuilePhotos({
  photos,
  href,
  agrandir,
  lieu,
  ratio = "aspect-[4/3]",
  sizes = "(max-width: 640px) 100vw, 380px",
}: TuilePhotosProps) {
  const piste = useRef<HTMLDivElement>(null);
  const [vue, setVue] = useState(0);
  const [grande, setGrande] = useState<number | null>(null);

  function pousser(sens: -1 | 1) {
    const el = piste.current;
    if (!el) return;
    el.scrollBy({ left: sens * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={piste}
        onScroll={(e) => {
          const el = e.currentTarget;
          setVue(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((src, i) => {
          const image = (
            <Image
              src={src}
              alt={i === 0 ? `${lieu} — Chez les Plombiers` : ""}
              fill
              sizes={sizes}
              className="object-cover"
            />
          );
          const classe = `relative w-full shrink-0 snap-center ${ratio}`;

          return agrandir ? (
            <button
              key={src}
              type="button"
              aria-label={`Agrandir la photo ${i + 1} sur ${photos.length}`}
              onClick={() => setGrande(i)}
              className={`${classe} cursor-zoom-in`}
            >
              {image}
            </button>
          ) : (
            /* Muet pour l'arbre d'accessibilité : le nom du lieu est déjà
               porté une fois, par le lien du bloc de texte. */
            <a key={src} href={href} tabIndex={-1} aria-hidden className={classe}>
              {image}
            </a>
          );
        })}
      </div>

      {photos.length > 1 && (
        <>
          {/* Cachées sous `sm` : au doigt, on glisse. */}
          <Fleche sens={-1} actif={vue > 0} onPousser={pousser} />
          <Fleche sens={1} actif={vue < photos.length - 1} onPousser={pousser} />

          {/* Les points, eux, restent : sur mobile ils sont le seul indice
              qu'il y a autre chose à voir. */}
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
            {photos.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === vue ? "bg-white" : "bg-white/35"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {grande !== null && (
        <Visionneuse
          photos={photos}
          index={grande}
          lieu={lieu}
          onIndex={setGrande}
          onFermer={() => setGrande(null)}
        />
      )}
    </div>
  );
}

/**
 * La photo en grand.
 *
 * Volontairement sans bibliothèque : une superposition, deux flèches, Échap.
 * ⚠️ Le clavier doit fonctionner — flèches pour circuler, Échap pour fermer.
 * Une visionneuse qu'on ne peut refermer qu'à la souris est un piège.
 */
function Visionneuse({
  photos,
  index,
  lieu,
  onIndex,
  onFermer,
}: {
  photos: readonly string[];
  index: number;
  lieu: string;
  onIndex: (i: number) => void;
  onFermer: () => void;
}) {
  const aller = useCallback(
    (sens: -1 | 1) => {
      const suivant = index + sens;
      if (suivant >= 0 && suivant < photos.length) onIndex(suivant);
    },
    [index, photos.length, onIndex]
  );

  useEffect(() => {
    function touche(e: KeyboardEvent) {
      if (e.key === "Escape") onFermer();
      if (e.key === "ArrowRight") aller(1);
      if (e.key === "ArrowLeft") aller(-1);
    }
    window.addEventListener("keydown", touche);
    // Le fond ne doit pas défiler derrière la visionneuse.
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", touche);
      document.body.style.overflow = avant;
    };
  }, [aller, onFermer]);

  return (
    <div
      role="dialog"
      aria-modal
      aria-label={`${lieu}, photo ${index + 1} sur ${photos.length}`}
      onClick={onFermer}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 sm:p-10"
    >
      <div
        className="relative h-full w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[index]}
          alt={`${lieu} — Chez les Plombiers`}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <button
        type="button"
        aria-label="Fermer"
        onClick={onFermer}
        className="absolute right-4 top-4 z-10 border border-white/25 bg-black/50 px-3 py-2 font-mono text-[12px] leading-none text-white"
      >
        Fermer ✕
      </button>

      {photos.length > 1 && (
        <>
          <BoutonVisionneuse sens={-1} actif={index > 0} onAller={aller} />
          <BoutonVisionneuse sens={1} actif={index < photos.length - 1} onAller={aller} />
          <p className="absolute bottom-4 left-0 right-0 text-center font-mono text-[12px] text-white/60">
            {index + 1} / {photos.length}
          </p>
        </>
      )}
    </div>
  );
}

function BoutonVisionneuse({
  sens,
  actif,
  onAller,
}: {
  sens: -1 | 1;
  actif: boolean;
  onAller: (sens: -1 | 1) => void;
}) {
  return (
    <button
      type="button"
      aria-label={sens === -1 ? "Photo précédente" : "Photo suivante"}
      disabled={!actif}
      onClick={(e) => {
        e.stopPropagation();
        onAller(sens);
      }}
      className={`absolute top-1/2 z-10 -translate-y-1/2 border border-white/25 bg-black/50 px-3 py-4 font-mono text-[16px] leading-none text-white transition-opacity hover:bg-black/80 disabled:opacity-0 ${
        sens === -1 ? "left-4" : "right-4"
      }`}
    >
      {sens === -1 ? "‹" : "›"}
    </button>
  );
}

function Fleche({
  sens,
  actif,
  onPousser,
}: {
  sens: -1 | 1;
  actif: boolean;
  onPousser: (sens: -1 | 1) => void;
}) {
  return (
    <button
      type="button"
      aria-label={sens === -1 ? "Photo précédente" : "Photo suivante"}
      disabled={!actif}
      onClick={(e) => {
        // Sans ça, le clic remonterait jusqu'au lien de la vue et quitterait
        // la page au lieu de faire défiler.
        e.preventDefault();
        e.stopPropagation();
        onPousser(sens);
      }}
      className={`absolute top-1/2 z-20 hidden -translate-y-1/2 border border-white/25 bg-black/45 px-2.5 py-3 font-mono text-[12px] leading-none text-white backdrop-blur-sm transition-opacity hover:bg-black/70 disabled:opacity-0 sm:block ${
        sens === -1 ? "left-2" : "right-2"
      }`}
    >
      {sens === -1 ? "‹" : "›"}
    </button>
  );
}
