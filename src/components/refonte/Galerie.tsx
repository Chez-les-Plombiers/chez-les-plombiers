"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { LAITON } from "./chrome";
import type { Photo } from "./photos-data";

/**
 * La grille d'un événement, et sa visionneuse.
 *
 * ⚠️ Grille en MAÇONNERIE (colonnes CSS), pas en carrés recadrés. Sur les
 * pages de tri, le carré était le bon choix : on comparait. Ici on regarde, et
 * un plan large recadré en carré perd la salle — c'est précisément ce qu'un
 * client vient voir. Les photos gardent donc leur format.
 *
 * ⚠️ Le clic agrandit. Sur une page de photos, c'est la seule attente.
 */
export function Galerie({ photos, titre }: { photos: Photo[]; titre: string }) {
  const [ouverte, setOuverte] = useState<number | null>(null);

  return (
    <>
      <div className="mt-6 gap-3 [column-fill:_balance] sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOuverte(i)}
            aria-label={`Agrandir la photo ${i + 1} sur ${photos.length}`}
            className="mb-3 block w-full cursor-zoom-in overflow-hidden border border-[var(--clp-bord)] bg-[var(--clp-carte)]"
          >
            <Image
              src={p.src}
              alt={`${titre} — Chez les Plombiers`}
              width={p.l}
              height={p.h}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              className="h-auto w-full"
            />
          </button>
        ))}
      </div>

      {ouverte !== null && (
        <Visionneuse
          photos={photos}
          index={ouverte}
          titre={titre}
          onIndex={setOuverte}
          onFermer={() => setOuverte(null)}
        />
      )}
    </>
  );
}

/**
 * ⚠️ Le clavier doit fonctionner — flèches pour circuler, Échap pour fermer.
 * Une visionneuse qu'on ne peut refermer qu'à la souris est un piège.
 */
function Visionneuse({
  photos,
  index,
  titre,
  onIndex,
  onFermer,
}: {
  photos: Photo[];
  index: number;
  titre: string;
  onIndex: (i: number) => void;
  onFermer: () => void;
}) {
  const aller = useCallback(
    (sens: -1 | 1) => {
      const n = index + sens;
      if (n >= 0 && n < photos.length) onIndex(n);
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
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", touche);
      document.body.style.overflow = avant;
    };
  }, [aller, onFermer]);

  const p = photos[index];

  return (
    <div
      role="dialog"
      aria-modal
      aria-label={`${titre}, photo ${index + 1} sur ${photos.length}`}
      onClick={onFermer}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/93 p-4 sm:p-10"
    >
      <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
        <Image
          src={p.src}
          alt={`${titre} — Chez les Plombiers`}
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
          <Fleche sens={-1} actif={index > 0} onAller={aller} />
          <Fleche sens={1} actif={index < photos.length - 1} onAller={aller} />
          <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2">
            <p className="font-mono text-[12px] text-white/60">
              {index + 1} / {photos.length}
            </p>
            {/* Le téléchargement de LA photo qu'on regarde : c'est là qu'on le
                cherche, pas dans un bouton global en haut de page. */}
            <a
              href={p.src}
              download
              onClick={(e) => e.stopPropagation()}
              className="border border-white/25 bg-black/50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white transition-colors hover:border-white/60"
              style={{ color: LAITON }}
            >
              Télécharger ↓
            </a>
          </div>
        </>
      )}
    </div>
  );
}

function Fleche({
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
        sens === -1 ? "left-2 sm:left-4" : "right-2 sm:right-4"
      }`}
    >
      {sens === -1 ? "‹" : "›"}
    </button>
  );
}
