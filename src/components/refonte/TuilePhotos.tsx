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
  /**
   * Cible du clic. Chaque vue porte ce lien pour que l'appui marche partout.
   * Un tableau donne une cible PAR vue — la vue d'ouverture de LA BOUTIQUE
   * mène à LA BOUTIQUE, pas à une page commune.
   */
  href?: string | readonly string[];
  /**
   * Nom posé sur chaque vue. Réservé à l'ouverture : c'est ce qui transforme
   * trois photos en trois lieux. Sur une tuile, le nom est déjà dans le texte
   * juste dessous — l'y répéter ne ferait que salir la photo.
   */
  etiquettes?: readonly string[];
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
  /**
   * Charge la PREMIÈRE vue sans attendre. À réserver à la photo d'ouverture :
   * six photos chargées d'un coup sur un téléphone en 4G, c'est une page qui
   * reste grise plusieurs secondes.
   */
  priority?: boolean;
}

export function TuilePhotos({
  photos,
  href,
  etiquettes,
  agrandir,
  lieu,
  ratio = "aspect-[4/3]",
  sizes = "(max-width: 640px) 100vw, 380px",
  priority,
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
              priority={priority && i === 0}
              className="object-cover"
            />
          );
          const classe = `relative w-full shrink-0 snap-center ${ratio}`;
          const cible = Array.isArray(href) ? href[i] : (href as string | undefined);
          /*
             Le nom du lieu, posé en bas à gauche. Le dégradé n'est pas une
             coquetterie : sans lui, un texte clair disparaît sur une photo
             claire — et deux de ces trois photos le sont.
          */
          const etiquette = etiquettes?.[i] ? (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"
              />
              {/*
                 ⚠️ À DROITE, PAS À GAUCHE. Étienne, 22/09/2026 : le titre
                 « 3 lieux événementiels » est calé à gauche juste en dessous,
                 et le nom du lieu s'alignait dessus — deux textes sur la même
                 verticale, qui se disputaient le même coin. À droite, ils se
                 répondent au lieu de se superposer, et le regard balaie la
                 largeur de l'image.
              */}
              <span className="pointer-events-none absolute bottom-3 right-4 font-clp text-[11px] font-bold uppercase tracking-[0.14em] text-white sm:bottom-4 sm:right-5 sm:text-[13px]">
                {etiquettes[i]}
              </span>
            </>
          ) : null;

          return agrandir ? (
            <button
              key={src}
              type="button"
              aria-label={`Agrandir la photo ${i + 1} sur ${photos.length}`}
              onClick={() => setGrande(i)}
              className={`${classe} cursor-zoom-in`}
            >
              {image}
              {etiquette}
            </button>
          ) : (
            /* Muet pour l'arbre d'accessibilité : le nom du lieu est déjà
               porté une fois, par le lien du bloc de texte. */
            <a key={src} href={cible} tabIndex={-1} aria-hidden className={classe}>
              {image}
              {etiquette}
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
              qu'il y a autre chose à voir.

              ⚠️ À GAUCHE, PAS AU CENTRE — ET CE N'EST PAS UN GOÛT. Ils étaient
              centrés, et le nom du lieu est calé à droite sur la même ligne :
              « L'APPARTEMENT » mesure 157 px sur un écran de 375, et mordait
              de 17 px sur les points. Signalé par Étienne le 22/09/2026, qui
              proposait de décaler ou de réduire le nom.

              ⚠️ RÉDUIRE LE NOM NE SUFFISAIT PAS. Pour dégager les 17 px plus
              une respiration correcte, il aurait fallu passer de 11 à 9 px —
              illisible sur un téléphone, et la collision serait revenue au
              premier lieu portant un nom plus long.

              Le défaut ne se voit qu'en dessous d'environ 500 px de large : le
              héros est le seul carrousel étiqueté, et les trois tuiles de
              l'accueil appellent ce composant SANS `etiquettes`, donc sans
              rien à heurter. Le correctif s'applique quand même à toutes les
              tailles : une règle sous `sm:` n'aurait décrit qu'un symptôme,
              alors que le vrai défaut est d'avoir posé deux éléments de
              largeur variable sur le même centre.

              Le nom à droite, les points à gauche, au même retrait : ils se
              répondent au lieu de se disputer le centre, et aucun nom de lieu,
              si long soit-il, ne peut plus les rejoindre. */}
          {/*
              ⚠️ `items-center` ET UNE HAUTEUR, sinon les points tombent 5 px
              trop bas. Un point fait 6 px, la ligne de texte du nom en fait
              16 : caler les deux sur le même `bottom` aligne leurs BAS, pas
              leurs milieux. Tant que les points étaient centrés, à l'écart du
              nom, personne ne pouvait le voir ; côte à côte, ça se remarque.
              La hauteur suit celle de la ligne de texte (16 px, puis 20 px).
          */}
          <div className="pointer-events-none absolute bottom-3 left-4 right-4 z-20 flex h-4 items-center justify-start gap-1.5 sm:bottom-4 sm:left-5 sm:right-5 sm:h-5">
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
