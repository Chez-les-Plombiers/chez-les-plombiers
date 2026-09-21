"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CADRE, LAITON } from "./chrome";

/**
 * Le sélecteur de `/photos` — deux rangées de boutons, deux axes.
 *
 * ── POURQUOI DEUX RANGÉES ET PAS UNE LISTE ────────────────────────────────
 *
 * Arrêté avec Étienne le 21/09/2026. La photothèque répond à deux questions
 * que posent deux personnes différentes :
 *
 *   « à quoi ça ressemble ? »     → un LIEU, vide.        Celle qui n'est jamais venue.
 *   « qu'est-ce qui s'y passe ? » → un TYPE d'événement.  Celle qui compare des lieux.
 *
 * Les fondre en une seule liste abîmerait les deux : on chercherait « dîners »
 * entre « L'Atelier » et « Défilés ». Séparées, chaque rangée se lit d'un coup.
 *
 * ⚠️ MAIS UNE SEULE PAGE. Étienne : « il y a pas un endroit qui regroupe
 * toutes les photos ? » Si : celle-ci. Deux axes ne justifient pas deux pages
 * — un visiteur qui cherche des photos ne doit pas avoir à deviner laquelle.
 *
 * ── CE QUE FAIT UN BOUTON ─────────────────────────────────────────────────
 *
 * Il filtre, il ne navigue pas. Rien de coché = tout est montré, ce qui est
 * l'état utile par défaut : on arrive pour voir, pas pour trier. Les boutons
 * ne se cochent que pour réduire.
 *
 * ⚠️ Pas de `useSearchParams` ni de route par filtre : l'état vit dans la
 * page. Un filtre est un geste de lecture, pas une adresse à partager — et
 * chaque combinaison deviendrait une URL indexable pour un contenu identique.
 */

export interface Tuile {
  slug: string;
  nom: string;
  href: string;
  detail: string;
  photo: { src: string; l: number; h: number };
  cadrage?: string;
  axe: "lieux" | "evenements";
}

export function SelecteurPhotos({ tuiles }: { tuiles: Tuile[] }) {
  const [choisis, setChoisis] = useState<string[]>([]);

  const lieux = tuiles.filter((t) => t.axe === "lieux");
  const evenements = tuiles.filter((t) => t.axe === "evenements");
  const montrees = choisis.length
    ? tuiles.filter((t) => choisis.includes(t.slug))
    : tuiles;

  function basculer(slug: string) {
    setChoisis((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]));
  }

  return (
    <>
      <div className="mt-6 space-y-4">
        <Rangee titre="Les lieux" tuiles={lieux} choisis={choisis} onBasculer={basculer} />
        <Rangee
          titre="Les événements"
          tuiles={evenements}
          choisis={choisis}
          onBasculer={basculer}
        />
      </div>

      {choisis.length > 0 && (
        <button
          type="button"
          onClick={() => setChoisis([])}
          className="mt-4 font-mono text-[11px] text-[#8A8A8A] underline-offset-4 transition-colors hover:text-[#E8E4DC] hover:underline"
        >
          Tout afficher
        </button>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {montrees.map((t) => (
          <Link
            key={t.slug}
            href={t.href}
            className={`${CADRE} group overflow-hidden transition-colors hover:border-[var(--clp-accent)]`}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={t.photo.src}
                alt={t.nom}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                className={`object-cover ${t.cadrage ?? ""}`}
              />
            </div>
            <div className="border-t border-[var(--clp-bord)] p-4">
              <p className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
                {t.nom}
              </p>
              <p className="mt-1 font-mono text-[11px]" style={{ color: LAITON }}>
                {t.detail} →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

function Rangee({
  titre,
  tuiles,
  choisis,
  onBasculer,
}: {
  titre: string;
  tuiles: Tuile[];
  choisis: string[];
  onBasculer: (slug: string) => void;
}) {
  if (tuiles.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
      <p className="shrink-0 font-clp text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A] sm:w-32 sm:text-right">
        {titre}
      </p>
      {/* Le défilement horizontal évite d'empiler six boutons sur un iPhone. */}
      <div className="-mx-1 flex flex-wrap gap-2 px-1">
        {tuiles.map((t) => {
          const actif = choisis.includes(t.slug);
          return (
            <button
              key={t.slug}
              type="button"
              aria-pressed={actif}
              onClick={() => onBasculer(t.slug)}
              className={`border px-3 py-2 font-mono text-[12px] transition-colors ${
                actif
                  ? "border-[var(--clp-accent)] text-[#E8E4DC]"
                  : "border-[var(--clp-bord)] text-[#A8A29A] hover:border-[#5A5A5A] hover:text-[#E8E4DC]"
              }`}
              style={actif ? { backgroundColor: "var(--clp-carte)" } : undefined}
            >
              {t.nom}
            </button>
          );
        })}
      </div>
    </div>
  );
}
