"use client";

import { useRef, useState } from "react";
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
interface TuilePhotosProps {
  photos: readonly string[];
  /** Où va la tuile. Chaque vue porte ce lien pour que l'appui marche partout. */
  href: string;
  /** Pour les textes de remplacement. */
  lieu: string;
}

export function TuilePhotos({ photos, href, lieu }: TuilePhotosProps) {
  const piste = useRef<HTMLDivElement>(null);
  const [vue, setVue] = useState(0);

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
        {photos.map((src, i) => (
          <a
            key={src}
            href={href}
            tabIndex={-1}
            aria-hidden
            className="relative aspect-[4/3] w-full shrink-0 snap-center"
          >
            <Image
              src={src}
              alt={i === 0 ? `${lieu} — Chez les Plombiers` : ""}
              fill
              sizes="(max-width: 640px) 100vw, 380px"
              className="object-cover"
            />
          </a>
        ))}
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
    </div>
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
