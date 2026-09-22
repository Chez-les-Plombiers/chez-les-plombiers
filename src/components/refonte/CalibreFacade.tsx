"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CADRE } from "./chrome";
import { FACADE_SRC, ZONES } from "./ScanFacade";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  L'OUTIL DE CALAGE DES TROIS CADRES
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ POURQUOI IL EXISTE : parce que j'ai fait perdre du temps à Étienne.
 *
 * Trois passes ont été nécessaires pour poser trois rectangles — je lisais des
 * pourcentages sur une grille, il vérifiait à l'écran, il renvoyait une
 * capture annotée, je corrigeais de travers. Sa question, le 22/09/2026 :
 * « dis-moi si on peut faire une sélection un peu plus facile via un autre
 * outil. » Oui, évidemment, et c'est par là qu'il fallait commencer.
 *
 * Un réglage visuel se règle à la souris, sur l'objet lui-même. Personne ne
 * devrait décrire un rectangle avec des mots.
 *
 * ── COMMENT S'EN SERVIR ───────────────────────────────────────────────────
 *
 *   glisser le cadre        le déplacer
 *   glisser un coin         le redimensionner
 *   le bloc de code en bas  se met à jour tout seul — me l'envoyer, ou le
 *                           coller directement dans `ScanFacade.tsx`
 *
 * ⏳ À SUPPRIMER une fois les cadres calés, avec sa route.
 */

type Cadre = { left: number; top: number; width: number; height: number };
type Etat = Record<string, Cadre>;

const pourcent = (v: string) => Number(v.replace("%", ""));

const DEPART: Etat = Object.fromEntries(
  ZONES.map((z) => [
    z.slug,
    {
      left: pourcent(z.zone.left),
      top: pourcent(z.zone.top),
      width: pourcent(z.zone.width),
      height: pourcent(z.zone.height),
    },
  ])
);

const COINS = [
  ["nw", "left-0 top-0 cursor-nwse-resize"],
  ["ne", "right-0 top-0 cursor-nesw-resize"],
  ["sw", "bottom-0 left-0 cursor-nesw-resize"],
  ["se", "bottom-0 right-0 cursor-nwse-resize"],
] as const;

export function CalibreFacade() {
  const [cadres, setCadres] = useState<Etat>(DEPART);
  const image = useRef<HTMLDivElement>(null);

  /**
   * ⚠️ TOUT SE CALCULE EN POURCENTAGE DE L'IMAGE, jamais en pixels : c'est la
   * seule unité qui survive au changement de taille d'écran, et c'est elle
   * qu'attend `ScanFacade`.
   */
  function saisir(e: React.PointerEvent, slug: string, coin: string | null) {
    e.preventDefault();
    e.stopPropagation();
    const boite = image.current?.getBoundingClientRect();
    if (!boite) return;
    const depart = cadres[slug];
    const x0 = e.clientX;
    const y0 = e.clientY;
    (e.target as Element).setPointerCapture(e.pointerId);

    function bouger(ev: PointerEvent) {
      const dx = ((ev.clientX - x0) / boite!.width) * 100;
      const dy = ((ev.clientY - y0) / boite!.height) * 100;
      const c = { ...depart };
      if (!coin) {
        c.left = depart.left + dx;
        c.top = depart.top + dy;
      } else {
        if (coin.includes("w")) {
          c.left = depart.left + dx;
          c.width = depart.width - dx;
        }
        if (coin.includes("e")) c.width = depart.width + dx;
        if (coin.includes("n")) {
          c.top = depart.top + dy;
          c.height = depart.height - dy;
        }
        if (coin.includes("s")) c.height = depart.height + dy;
      }
      c.width = Math.max(1, c.width);
      c.height = Math.max(1, c.height);
      setCadres((a) => ({ ...a, [slug]: c }));
    }
    function lacher() {
      window.removeEventListener("pointermove", bouger);
      window.removeEventListener("pointerup", lacher);
    }
    window.addEventListener("pointermove", bouger);
    window.addEventListener("pointerup", lacher);
  }

  const code = ZONES.map((z) => {
    const c = cadres[z.slug];
    const n = (v: number) => `${v.toFixed(1)}%`;
    return `  // ${z.nom}\n  zone: { left: "${n(c.left)}", top: "${n(c.top)}", width: "${n(
      c.width
    )}", height: "${n(c.height)}" },`;
  }).join("\n");

  return (
    <>
      <div
        ref={image}
        className="relative select-none overflow-hidden border border-[var(--clp-bord)]"
      >
        <Image
          src={FACADE_SRC}
          alt="La façade du 39 rue des Bourdonnais"
          width={927}
          height={767}
          sizes="(max-width: 1180px) 100vw, 1180px"
          className="pointer-events-none block h-auto w-full"
          priority
        />
        {ZONES.map((z) => {
          const c = cadres[z.slug];
          return (
            <div
              key={z.slug}
              onPointerDown={(e) => saisir(e, z.slug, null)}
              style={{
                left: `${c.left}%`,
                top: `${c.top}%`,
                width: `${c.width}%`,
                height: `${c.height}%`,
              }}
              className="absolute cursor-move border-2 border-[var(--clp-accent)] bg-[var(--clp-accent)]/10"
            >
              <span className="pointer-events-none absolute -top-5 left-0 whitespace-nowrap bg-black/80 px-1.5 py-0.5 font-mono text-[10px] text-white">
                {z.nom}
              </span>
              {COINS.map(([coin, pos]) => (
                <span
                  key={coin}
                  onPointerDown={(e) => saisir(e, z.slug, coin)}
                  className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 border border-black bg-white ${pos}`}
                  style={{ margin: "8px" }}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div className={`${CADRE} mt-4 p-4`}>
        <p className="font-clp text-[11px] uppercase tracking-[0.15em] text-[#8A8A8A]">
          À me renvoyer, ou à coller dans <code>ScanFacade.tsx</code>
        </p>
        <pre className="mt-2 overflow-x-auto font-mono text-[11px] leading-relaxed text-[#C9C4BC]">
          {code}
        </pre>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(code)}
          className={`${CADRE} mt-3 px-3 py-2 font-mono text-[11px] text-[#C9C4BC] transition-colors hover:border-[var(--clp-accent)]`}
        >
          Copier
        </button>
        <button
          type="button"
          onClick={() => setCadres(DEPART)}
          className="ml-3 font-mono text-[11px] text-[#8A8A8A] underline-offset-4 hover:underline"
        >
          Repartir des valeurs actuelles
        </button>
      </div>
    </>
  );
}
