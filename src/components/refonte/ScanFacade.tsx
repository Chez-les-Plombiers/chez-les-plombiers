"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { LAITON } from "./chrome";
import { LIEUX_GALERIE } from "./photos-data";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  LA FAÇADE ANNOTÉE — « où sont les trois lieux ? »
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ── LE PROBLÈME, POSÉ PAR QUELQU'UN QUI NE CONNAÎT PAS ────────────────────
 *
 * Une amie d'Étienne, devant le site, le 22/09/2026 : « j'ai du mal à voir où
 * est la boutique. Est-ce que c'est en face ? À côté ? En dessous ? »
 *
 * Trois hypothèses, alors que la page dit « trois espaces à la même adresse ».
 * C'est que « à la même adresse » ne veut rien dire : ça peut être trois
 * boutiques voisines, trois étages, ou trois bâtiments. Le site AFFIRMAIT sans
 * MONTRER — et c'est le dernier gros trou de la refonte.
 *
 * ── D'OÙ ÇA VIENT ─────────────────────────────────────────────────────────
 *
 * Du travail de Charles, fait le 21/09/2026 : une élévation de rue, trois
 * zones, et un dépliement qui montre l'intérieur de chacune. La géométrie en
 * pourcentages ci-dessous est la sienne, relevée sur sa maquette, et sa
 * langue visuelle est conservée — les équerres, la ligne de balayage, le
 * dépliement par `clip-path`.
 *
 * ── CE QUI CHANGE, ET POURQUOI ────────────────────────────────────────────
 *
 * ⚠️ 1. LES NOMS SONT VISIBLES SANS RIEN TOUCHER. Chez Charles, tout est
 *    derrière un survol : c'est beau, et parfaitement inutile pour qui ne
 *    sait pas qu'il faut survoler — c'est-à-dire exactement la personne à qui
 *    ça s'adresse. Or ce qui répond à la question, ce n'est pas l'animation :
 *    c'est de LIRE « L'Appartement — 1er étage » posé sur la bonne fenêtre.
 *    Le dépliement devient le bonus de qui veut voir l'intérieur.
 *
 * ⚠️ 2. UN APPUI SIMPLE SUFFIT. Sa version demande de garder le doigt appuyé
 *    sur une pastille puis de le glisser sur une flèche. Sur un téléphone,
 *    personne ne trouvera ce geste — et le téléphone est la majorité du
 *    trafic. Ici : on touche, ça s'ouvre ; on touche ailleurs, ça se ferme.
 *
 * ⚠️ 3. LES PHOTOS VIENNENT DE LA PHOTOTHÈQUE. Charles avait UNE vue pour
 *    l'atelier et UNE pour la boutique — tout ce qu'il avait sous la main. On
 *    en a désormais 39, 14 et 15, déjà triées par Étienne. Une seule source.
 *
 * ⏳ L'image fait 927 px de large : elle vient de la maquette de Charles, pas
 *    d'un original. Suffisant pour l'encart, juste pour le plein écran. Les
 *    photos de façade d'Étienne montrent toutes la GRILLE FERMÉE — inutiles
 *    ici, puisque tout l'intérêt est de voir la cour au fond du porche.
 */

const FACADE = "/photos/lieu/facade-scan.jpg";

/** Géométrie des trois cadres, en % de l'image. Calée avec `/refonte/essai-facade`. */
export const ZONES = [
  {
    slug: "lieu-appartement",
    nom: "L'Appartement",
    ou: "1er étage",
    /*
     * ⚠️ RECALÉ SUR L'ANNOTATION D'ÉTIENNE, 22/09/2026. Charles l'avait posé à
     * 26,6 % de hauteur, donc À CHEVAL SUR LA POUTRE DU PORCHE : le cadre
     * attrapait moitié fenêtre, moitié poutre noire, et flottait. Étienne a
     * dessiné le bon emplacement — le renfoncement au-dessus de la cour, avec
     * son balcon, juste au-dessus de la porte de L'Atelier. C'est cohérent
     * avec l'accès : « son propre escalier, depuis la cour ».
     */
    zone: { left: "24%", top: "33%", width: "13%", height: "13%" },
    /* Le panneau se déplie vers le haut, au-dessus de la fenêtre. */
    panneau: { left: "8%", top: "1%", width: "40%" },
    /* Au-dessus de la fenêtre : rien ne la gêne là-haut. */
    etiquette: { left: "21%", top: "33%", ancrage: "dessus" },
  },
  {
    slug: "lieu-atelier",
    nom: "L'Atelier",
    ou: "au fond de la cour",
    zone: { left: "27.5%", top: "46%", width: "9%", height: "17%" },
    panneau: { left: "6%", top: "44%", width: "44%" },
    /* Sous le porche, pas à droite : à droite elle percutait La Boutique. */
    etiquette: { left: "16%", top: "64.5%", ancrage: "dessous" },
  },
  {
    slug: "lieu-boutique",
    nom: "La Boutique",
    ou: "sur la rue",
    zone: { left: "59.5%", top: "46%", width: "28%", height: "30%" },
    /* Elle se déplie dans sa propre vitrine : c'est là qu'elle est. */
    panneau: null,
    /* Dans sa propre vitrine, qui est large : elle y tient sans déborder. */
    etiquette: { left: "60%", top: "48.5%", ancrage: "dessous" },
  },
] as const;

const photosDe = (slug: string) =>
  LIEUX_GALERIE.find((l) => l.slug === slug)?.photos.slice(0, 6) ?? [];

export const FACADE_SRC = FACADE;

export function ScanFacade({
  compact = false,
  zones = ZONES,
}: {
  compact?: boolean;
  /** L'outil de calage passe les siennes, en cours de réglage. */
  zones?: typeof ZONES;
}) {
  const [ouverte, setOuverte] = useState<string | null>(null);
  const [vue, setVue] = useState(0);

  const ouvrir = useCallback((slug: string) => {
    setOuverte((a) => (a === slug ? null : slug));
    setVue(0);
  }, []);

  useEffect(() => {
    function touche(e: KeyboardEvent) {
      if (e.key === "Escape") setOuverte(null);
    }
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, []);

  return (
    /*
       ⚠️ CLIQUER AILLEURS SUR LA FAÇADE REFERME. Étienne : « quand on a
       cliqué une fois sur l'intérieur de la boutique, il faudrait pouvoir
       quitter en cliquant à côté ». Sans ça, la seule sortie était de
       re-toucher exactement le même cadre — qui est en partie recouvert par
       la photo qui vient de s'ouvrir.
    */
    <figure
      onClick={() => setOuverte(null)}
      className="relative m-0 select-none overflow-hidden border border-[var(--clp-bord)]"
    >
      <Image
        src={FACADE}
        alt="Le 39 rue des Bourdonnais : le porche ouvert sur la cour, et la vitrine de La Boutique"
        width={927}
        height={767}
        sizes={compact ? "(max-width: 900px) 100vw, 420px" : "(max-width: 1180px) 100vw, 900px"}
        className="block h-auto w-full"
        priority={!compact}
      />

      {/* Assombri d'un cran : les étiquettes claires doivent tenir sur une
          façade en pierre de taille, qui est presque blanche au soleil. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-black/20" />

      {zones.map((z) => {
        const active = ouverte === z.slug;
        const photos = photosDe(z.slug);
        return (
          <div key={z.slug}>
            {/* ── LA ZONE : toujours visible, et cliquable ── */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                ouvrir(z.slug);
              }}
              aria-expanded={active}
              aria-label={`${z.nom}, ${z.ou} — voir les photos`}
              style={z.zone}
              className={`absolute border transition-colors ${
                active
                  ? "border-[var(--clp-accent)] bg-[var(--clp-accent)]/10"
                  : "border-white/60 bg-white/5 hover:border-[var(--clp-accent)] hover:bg-[var(--clp-accent)]/10"
              }`}
            >
              <Equerres />
            </button>

            {/*
              ⚠️ L'ÉTIQUETTE EST HORS DU BOUTON, et sa place est réglée à la
              main pour chaque lieu. Posée mécaniquement « à droite de la
              zone », elle débordait de l'image pour L'Appartement et venait
              percuter celle de La Boutique pour L'Atelier — les deux zones
              étant à la même hauteur. Trois positions choisies valent mieux
              qu'une règle qui échoue deux fois sur trois.

              ⚠️ Et elle ne coupe plus : `max-w` en pourcentage de l'image,
              pas de `nowrap`. Sur un téléphone de 375 px la façade fait
              330 px — « L'Appartement · 1er étage » n'y tient pas d'un bloc.
            */}
            <span
              aria-hidden
              style={{
                left: z.etiquette.left,
                top: z.etiquette.top,
                maxWidth: "44%",
              }}
              className={`pointer-events-none absolute border border-[var(--clp-bord)] bg-black/80 px-1.5 py-1 font-clp text-[8px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-white backdrop-blur-[2px] sm:text-[10px] sm:tracking-[0.1em] ${
                z.etiquette.ancrage === "dessus" ? "-translate-y-full" : ""
              }`}
            >
              {z.nom}
              <small className="block font-normal tracking-[0.04em] text-[#A8A29A]">
                {z.ou}
              </small>
            </span>

            {/* ── LE DÉPLIEMENT ── */}
            {active && (
              <div
                style={z.panneau ?? z.zone}
                className="absolute overflow-hidden border border-[var(--clp-accent)] bg-black"
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: z.panneau ? "3 / 2" : undefined, height: z.panneau ? undefined : "100%" }}
                >
                  {photos[vue] && (
                    <Image
                      src={photos[vue].src}
                      alt={`${z.nom} — Chez les Plombiers`}
                      fill
                      sizes="(max-width: 900px) 60vw, 420px"
                      className="object-cover"
                    />
                  )}
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[2px] animate-[balayage_1.1s_ease-out] bg-[var(--clp-accent)]" />
                </div>
                {photos.length > 1 && (
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/70 px-1.5 py-1">
                    <Fleche sens={-1} actif={vue > 0} onAller={() => setVue((v) => v - 1)} />
                    <span className="font-mono text-[9px] text-white/70">
                      {vue + 1} / {photos.length}
                    </span>
                    <Fleche sens={1} actif={vue < photos.length - 1} onAller={() => setVue((v) => v + 1)} />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <figcaption className="border-t border-[var(--clp-bord)] bg-[var(--clp-carte)] px-3 py-2 font-mono text-[10px] leading-snug text-[#8A8A8A]">
        {ouverte ? "Touchez ailleurs pour refermer." : "Touchez un cadre pour voir l'intérieur."}
      </figcaption>
    </figure>
  );
}

/** Les équerres de Charles : quatre coins, rien au milieu. */
function Equerres() {
  return (
    <>
      {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t",
        "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((p) => (
        <i key={p} className={`absolute h-2 w-2 border-current ${p}`} style={{ color: LAITON }} />
      ))}
    </>
  );
}

function Fleche({ sens, actif, onAller }: { sens: -1 | 1; actif: boolean; onAller: () => void }) {
  return (
    <button
      type="button"
      disabled={!actif}
      onClick={(e) => { e.stopPropagation(); onAller(); }}
      aria-label={sens === -1 ? "Photo précédente" : "Photo suivante"}
      className="px-2 font-mono text-[13px] leading-none text-white disabled:opacity-25"
    >
      {sens === -1 ? "‹" : "›"}
    </button>
  );
}
