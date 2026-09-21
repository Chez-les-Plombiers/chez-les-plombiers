import { CATEGORIES, EVENEMENTS, type SlugCategorie } from "./tri-evenements";
import selection from "./tri-selection.json";
import galerie from "./galerie.json";

/**
 * La photothèque, assemblée pour l'affichage.
 *
 * Trois fichiers y entrent, et chacun a son rôle :
 *   `tri-evenements.ts`   quel événement, quelle catégorie   (écrit à la main)
 *   `tri-selection.json`  ce qu'Étienne garde, et sa couverture
 *   `galerie.json`        les images générées, avec leurs dimensions
 *
 * ⚠️ On n'édite JAMAIS ce fichier pour changer une photo : on change la
 * sélection et on relance `gen-photos.mjs`. Sinon les deux divergent, et c'est
 * la sélection qui fait foi.
 */

type Selection = Record<
  string,
  {
    garde: number[];
    couverture: number | null;
    nomCorrige?: string;
    fusionneAvec?: string;
    horsCategories?: boolean;
    ordreImpose?: boolean;
  }
>;
type Galerie = Record<string, { n: number; src: string; l: number; h: number }[]>;

const SEL = selection as Selection;
const GAL = galerie as Galerie;

export interface Photo {
  src: string;
  l: number;
  h: number;
}

export interface EvenementGalerie {
  slug: string;
  nom: string;
  categorie: SlugCategorie;
  couverture: Photo;
  photos: Photo[];
}

/** Numéro de tête du dossier — « 08. DINER… » → 8. Sert à ordonner. */
function rang(slug: string): number {
  const m = slug.match(/^(\d+)-/);
  return m ? Number(m[1]) : 99;
}

function photosDe(slug: string): Photo[] {
  const sel = SEL[slug];
  const items = GAL[slug] ?? [];
  if (!sel) return [];
  // ⚠️ L'ordre de `garde` fait foi quand Étienne l'a imposé (TikTok : la vue
  // d'ouverture remontée, une photo repoussée à la fin). Sinon, chronologique.
  const parNumero = new Map(items.map((i) => [i.n, i]));
  const ordre = sel.ordreImpose ? sel.garde : [...sel.garde].sort((a, b) => a - b);
  return ordre
    .map((n) => parNumero.get(n))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .map(({ src, l, h }) => ({ src, l, h }));
}

/**
 * Les événements prêts à afficher.
 *
 * ⚠️ DEUX RÈGLES qui viennent d'Étienne et qu'on ne devine pas :
 *
 * 1. Oakley est venu deux fois ; les deux dossiers n'en font qu'UN ici.
 *    « On va pas les différencier. »
 * 2. La soirée d'ouverture n'apparaît PAS dans les catégories. Ce soir-là
 *    personne n'a pris de photos — les six qui existent vont sur `/histoire`.
 */
export const GALERIE: EvenementGalerie[] = (() => {
  const out: EvenementGalerie[] = [];
  const absorbes = new Set<string>();

  for (const e of [...EVENEMENTS].sort((a, b) => rang(a.slug) - rang(b.slug))) {
    const sel = SEL[e.slug];
    if (!sel || sel.horsCategories || absorbes.has(e.slug)) continue;

    let photos = photosDe(e.slug);
    let couvertureNum = sel.couverture;
    let couvertureSlug = e.slug;

    // La fusion : on annexe l'autre dossier et on l'écarte de la boucle.
    const autre = sel.fusionneAvec;
    if (autre && SEL[autre]) {
      absorbes.add(autre);
      const sien = photosDe(autre);
      photos = [...photos, ...sien];
      if (couvertureNum === null && SEL[autre].couverture !== null) {
        couvertureNum = SEL[autre].couverture;
        couvertureSlug = autre;
      }
    }
    if (photos.length === 0) continue;

    const parSrc = (GAL[couvertureSlug] ?? []).find((i) => i.n === couvertureNum);
    const couverture: Photo = parSrc
      ? { src: parSrc.src, l: parSrc.l, h: parSrc.h }
      : photos[0];

    out.push({
      slug: e.slug,
      nom: sel.nomCorrige ?? e.nom,
      categorie: e.categorie,
      couverture,
      // La couverture ouvre la série : c'est elle qu'on a choisie pour ça.
      photos: [couverture, ...photos.filter((p) => p.src !== couverture.src)],
    });
  }
  return out;
})();

export interface CategorieGalerie {
  slug: SlugCategorie;
  nom: string;
  evenements: EvenementGalerie[];
  total: number;
}

export const CATEGORIES_GALERIE: CategorieGalerie[] = CATEGORIES.map((c) => {
  const evenements = GALERIE.filter((e) => e.categorie === c.slug);
  return {
    slug: c.slug,
    nom: c.nom,
    evenements,
    total: evenements.reduce((s, e) => s + e.photos.length, 0),
  };
}).filter((c) => c.evenements.length > 0);

export function categorie(slug: string) {
  return CATEGORIES_GALERIE.find((c) => c.slug === slug);
}
export function evenement(slug: string) {
  return GALERIE.find((e) => e.slug === slug);
}
