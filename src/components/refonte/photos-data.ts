import {
  CATEGORIES,
  EVENEMENTS,
  LIEUX,
  type SlugCategorie,
  type SlugLieu,
} from "./tri-evenements";
import selection from "./tri-selection.json";
import galerie from "./galerie.json";
import photosLieux from "./photos-lieux.json";

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
type Galerie = Record<
  string,
  { n: number; src: string; l: number; h: number; video?: string }[]
>;

const SEL = selection as Selection;
const GAL = galerie as Galerie;

export interface Photo {
  /** L'image — l'affiche, quand c'est une vidéo. */
  src: string;
  l: number;
  h: number;
  /**
   * Le MP4, si cette vue est une vidéo. `src` en est alors l'affiche, ce qui
   * laisse la grille se comporter exactement comme une grille de photos.
   */
  video?: string;
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
    .map(({ src, l, h, video }) => ({ src, l, h, ...(video ? { video } : {}) }));
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
  /*
   * ⚠️ LES ABSORBÉS SE CALCULENT AVANT LA BOUCLE, PAS PENDANT. En les
   * marquant au fil de l'eau, la fusion ne marchait que si l'absorbeur
   * passait en premier — et l'ordre vient du numéro de dossier, donc du
   * hasard. `voitures-porsche` s'est ainsi affiché DEUX fois : une comme
   * événement à lui, une dans Porsche qui venait de l'absorber.
   */
  const absorbes = new Set(
    Object.values(SEL)
      .map((s) => s.fusionneAvec)
      .filter((x): x is string => Boolean(x))
  );

  for (const e of [...EVENEMENTS].sort((a, b) => rang(a.slug) - rang(b.slug))) {
    const sel = SEL[e.slug];
    if (!sel || sel.horsCategories || absorbes.has(e.slug)) continue;

    let photos = photosDe(e.slug);
    let couvertureNum = sel.couverture;
    let couvertureSlug = e.slug;

    // La fusion : on annexe l'autre dossier et on l'écarte de la boucle.
    const autre = sel.fusionneAvec;
    if (autre && SEL[autre]) {
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
  /*
   * Photo de rue, et deux corrections successives : le cadrage centré
   * décapitait le premier rang, `object-top` laissait « trop d'air au-dessus
   * des têtes des filles ». Un quart de la hauteur, donc — entre les deux.
   */
  defiles: {
    evenement: "05-defile-litovska-1-octobre-2025",
    n: 8,
    cadrage: "object-[center_25%]",
  },
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

/* ─────────────────────────────────────────── Le second axe : les lieux */

export interface LieuGalerie {
  slug: SlugLieu;
  nom: string;
  photos: Photo[];
  couverture: Photo;
  total: number;
}

/**
 * Les photos d'un lieu — le lieu lui-même, vide.
 *
 * ⚠️ DEUX SOURCES, ET C'EST VOULU. Quand une planche de tri a été dépouillée,
 * c'est elle qui fait foi. Tant qu'elle ne l'est pas, on retombe sur les vues
 * DÉJÀ retenues pour le site (`photos-lieux.json`) : elles ont été choisies une
 * à une, elles ne sont pas un pis-aller. Publier 49 vues non triées de
 * L'ATELIER en attendant serait pire que d'en montrer 7 sûres.
 *
 * ⚠️ LA BOUTIQUE n'a que cette seconde source, et durablement : le lieu a
 * ouvert le 01/09/2026 et n'a pas encore été photographié.
 */
const REPLI = photosLieux as Record<string, Photo[]>;

export const LIEUX_GALERIE: LieuGalerie[] = LIEUX.map((l) => {
  const triees = photosDe(l.slug);
  const photos = triees.length > 0 ? triees : (REPLI[l.slug] ?? []);
  const num = SEL[l.slug]?.couverture ?? null;
  const choisie = (GAL[l.slug] ?? []).find((i) => i.n === num);
  const couverture: Photo = choisie
    ? { src: choisie.src, l: choisie.l, h: choisie.h }
    : photos[0];
  return {
    slug: l.slug,
    nom: l.nom,
    photos: couverture
      ? [couverture, ...photos.filter((p) => p.src !== couverture.src)]
      : photos,
    couverture,
    total: photos.length,
  };
}).filter((l) => l.total > 0);

export function lieu(slug: string) {
  return LIEUX_GALERIE.find((l) => l.slug === slug);
}

export function categorie(slug: string) {
  return CATEGORIES_GALERIE.find((c) => c.slug === slug);
}
export function evenement(slug: string) {
  return GALERIE.find((e) => e.slug === slug);
}
