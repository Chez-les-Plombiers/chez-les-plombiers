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
 *
 * ── LES VIDÉOS VIVENT DANS LA MÊME GRILLE ─────────────────────────────────
 *
 * Demande d'Étienne, 21/09/2026 : « il faut qu'on mélange les galeries
 * photos-vidéos et qu'on distingue les vidéos avec un petit bouton play au
 * milieu ». Une vidéo n'est donc pas un objet à part : c'est une vue dont
 * l'affiche est une image, marquée d'un rond. Elle ne se charge qu'au clic.
 *
 * ⚠️ C'est aussi ce qui évite d'alourdir la page, ce dont Étienne s'inquiétait
 * à juste titre : la grille ne télécharge que des affiches WebP. Le MP4 n'est
 * demandé que lorsqu'on ouvre la visionneuse.
 */
export function Galerie({ photos, titre }: { photos: Photo[]; titre: string }) {
  const [ouverte, setOuverte] = useState<number | null>(null);

  return (
    <>
      {/*
        ── DEUX COLONNES DÈS LE TÉLÉPHONE ────────────────────────────────────
        Étienne, 22/09/2026 : « affiche deux photos par colonne plutôt qu'une.
        Pour le défilement ce serait bien qu'on en voie même quatre d'un coup.
        Quand on clique on en voit une, comme une story Instagram. »

        C'est le bon partage du travail : la grille sert à BALAYER, la
        visionneuse à REGARDER. Une colonne unique faisait défiler une planche
        de soixante vues à la vitesse d'une seule — on renonçait avant la fin.
        À deux colonnes on en embrasse quatre, et le clic donne le plein écran.

        ⚠️ TROIS COLONNES SEULEMENT QUAND IL Y A DE QUOI LES REMPLIR. Étienne,
        sur la page Porsche : « il y a que quatre vidéos et puis elles sont
        collées à gauche ». C'est le propre de la maçonnerie : quatre images
        hautes sur trois colonnes donnent 2 + 1 + 1, et la page penche.
      */}
      <div
        className={`mt-6 columns-2 gap-3 [column-fill:_balance] ${
          photos.length >= 7 ? "lg:columns-3" : ""
        }`}
      >
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOuverte(i)}
            aria-label={
              p.video
                ? `Lire la vidéo ${i + 1} sur ${photos.length}`
                : `Agrandir la photo ${i + 1} sur ${photos.length}`
            }
            className="mb-3 block w-full cursor-zoom-in overflow-hidden border border-[var(--clp-bord)] bg-[var(--clp-carte)]"
          >
            <span className="relative block">
              <Image
                src={p.src}
                alt={`${titre} — Chez les Plombiers`}
                width={p.l}
                height={p.h}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                className="h-auto w-full"
              />
              {p.video && <Play />}
            </span>
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
        {p.video ? (
          /*
             ⚠️ `key` sur la source : sans elle, React réutilise l'élément en
             changeant son `src`, et le navigateur continue de jouer la vidéo
             précédente. Le `poster` évite le rectangle noir pendant le
             chargement — c'est la même image que dans la grille, déjà en cache.
          */
          <video
            key={p.video}
            src={p.video}
            poster={p.src}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
        ) : (
          <Image
            src={p.src}
            alt={`${titre} — Chez les Plombiers`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        )}
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
              href={p.video ?? p.src}
              download
              onClick={(e) => e.stopPropagation()}
              className="border border-white/25 bg-black/50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white transition-colors hover:border-white/60"
              style={{ color: LAITON }}
            >
              Télécharger {p.video ? "la vidéo" : ""} ↓
            </a>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Le rond de lecture posé au centre d'une affiche.
 *
 * ⚠️ Dessiné en CSS, pas en SVG ni en image : un triangle fait de bordures ne
 * coûte aucune requête et reste net à toute taille. `pointer-events-none` est
 * indispensable — sinon il intercepte le clic destiné au bouton qui l'entoure.
 */
function Play() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/45 backdrop-blur-[1px]">
        <span
          className="ml-[3px] block h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-white"
          aria-hidden
        />
      </span>
    </span>
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
