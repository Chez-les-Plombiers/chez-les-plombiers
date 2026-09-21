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
  /** La vignette de la catégorie. Voir `COUVERTURES` juste au-dessus. */
  couverture: Photo;
  /**
   * Cadrage de cette vignette, quand le centre ne convient pas. Classe
   * Tailwind complète — la compilation ne lit que des noms entiers.
   */
  cadrage?: string;
}

/**
 * La vignette d'une CATÉGORIE, choisie à part.
 *
 * ⚠️ Elle valait jusqu'ici la couverture du premier événement de la catégorie.
 * C'est un mauvais choix par défaut : le premier événement l'est par son
 * numéro de dossier, pas par sa qualité — « Lancements » ouvrait donc sur un
 * fond blanc quelconque alors que ROC est bien plus parlant. Et remonter la
 * couverture de ROC pour régler ça changerait aussi la vignette de ROC sur sa
 * propre page. Deux besoins, deux réglages.
 *
 * `cadrage` répond au même problème dans l'autre sens : la photo est la bonne,
 * c'est le recadrage en 4/3 qui coupe. Sur « Défilés », il coupait les têtes.
 */
const COUVERTURES: Partial<
  Record<SlugCategorie, { evenement: string; n: number; cadrage?: string }>
> = {
  /* La projection bleu et jaune sur le mur — choix d'Étienne, 21/09/2026. */
  lancements: { evenement: "11-roc", n: 13 },
  /* Photo de rue : le cadrage centré décapitait le premier rang. */
  defiles: { evenement: "05-defile-litovska-1-octobre-2025", n: 8, cadrage: "object-top" },
};

export const CATEGORIES_GALERIE: CategorieGalerie[] = CATEGORIES.map((c) => {
  const evenements = GALERIE.filter((e) => e.categorie === c.slug);
  const choix = COUVERTURES[c.slug];
  /* `Photo` ne porte pas son numéro ; le nom du fichier, si — `013.webp`. */
  const fichier = choix && `/${String(choix.n).padStart(3, "0")}.webp`;
  const voulue = choix
    ? evenements
        .find((e) => e.slug === choix.evenement)
        ?.photos.find((p) => p.src.endsWith(fichier!))
    : undefined;
  return {
    slug: c.slug,
    nom: c.nom,
    evenements,
    total: evenements.reduce((s, e) => s + e.photos.length, 0),
    /* Repli sur le premier événement : une catégorie sans choix explicite
       garde le comportement d'avant, et un numéro devenu faux ne casse rien. */
    couverture: voulue ?? evenements[0]?.couverture,
    cadrage: voulue ? choix?.cadrage : undefined,
  };
}).filter((c) => c.evenements.length > 0);

export function categorie(slug: string) {
  return CATEGORIES_GALERIE.find((c) => c.slug === slug);
}
export function evenement(slug: string) {
  return GALERIE.find((e) => e.slug === slug);
}
