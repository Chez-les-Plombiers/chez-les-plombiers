/**
 * Le tri de la photothèque — quel événement, quelle catégorie.
 *
 * ⚠️ TEMPORAIRE. Ce fichier, les pages `/refonte/tri/*` et le dossier
 * `public/photos/tri/` disparaissent une fois la sélection faite. Ils
 * n'existent que pour qu'Étienne réponde par des numéros depuis son téléphone.
 *
 * ── LES SIX CATÉGORIES, arrêtées le 21/09/2026 ────────────────────────────
 *
 * Six et pas cinq : en 3×2 les vignettes sont deux fois plus grandes qu'en
 * ligne de cinq. Et « Automobile » mérite sa case — c'est l'argument le plus
 * rare du lieu, et il a déjà sa page de référencement.
 *
 * ⚠️ « Défilés » reste séparé de « Showrooms », contre la première intuition
 * d'Étienne. Un showroom expose, un défilé demande un podium, un front row et
 * des coulisses : une agence qui cherche un lieu de défilé ne cliquera jamais
 * sur « showroom ». Une catégorie maigre mais juste vaut mieux qu'une
 * catégorie grasse et floue.
 *
 * ⚠️ Pas de catégorie « causes ». Les cinq autres disent CE QUI SE PASSE ; une
 * cause dit POURQUOI. Deux axes, et les mélanger perdrait le lecteur. Caisse
 * Claire est donc classé en Lancements (arbitrage d'Étienne), et le fait
 * qu'il prête le lieu pour des causes se dira sur `/histoire`.
 *
 * ── CE QUI EST ÉCARTÉ, ET POURQUOI ────────────────────────────────────────
 *
 *   01. 14 JANVIER 2025      le lieu encore en travaux — inutilisable
 *   04. DINER MARINE ABIAD   dîner privé, à ne pas publier
 *   15. DANSE AVEC LA CHUTE  un tournage, et Étienne n'en veut pas
 */

export const CATEGORIES = [
  { slug: "diners", nom: "Dîners" },
  { slug: "showrooms", nom: "Showrooms" },
  { slug: "defiles", nom: "Défilés" },
  { slug: "lancements", nom: "Lancements" },
  { slug: "expositions", nom: "Expositions" },
  { slug: "automobile", nom: "Automobile" },
] as const;

export type SlugCategorie = (typeof CATEGORIES)[number]["slug"];

/**
 * ── LE SECOND AXE : LES LIEUX ─────────────────────────────────────────────
 *
 * Décidé avec Étienne le 21/09/2026. Les six catégories ci-dessus répondent à
 * « qu'est-ce qui s'y passe ? ». Elles ne répondent pas à « à quoi ça
 * ressemble ? » — et ce sont deux personnes différentes qui posent ces deux
 * questions : celle qui compare des lieux, et celle qui n'est jamais venue.
 *
 * Les fondre en une seule liste abîmerait les deux. Ils vivent donc côte à
 * côte sur `/photos`, chacun sur sa rangée de filtres.
 *
 * ⚠️ LA BOUTIQUE n'a PAS de planche de tri, et c'est normal : le lieu a ouvert
 * le 01/09/2026 et personne ne l'a encore photographié. Ses vues viennent du
 * téléphone d'Étienne et sont déjà choisies — voir `PHOTOS_BOUTIQUE` dans
 * `photos-data.ts`. Un événement est prévu sous quinze jours.
 */
export const LIEUX = [
  { slug: "lieu-atelier", nom: "L'Atelier" },
  { slug: "lieu-boutique", nom: "La Boutique" },
  { slug: "lieu-appartement", nom: "L'Appartement" },
] as const;

export type SlugLieu = (typeof LIEUX)[number]["slug"];

export interface Evenement {
  /** Correspond à une clé du manifeste des vignettes. */
  slug: string;
  nom: string;
  categorie: SlugCategorie;
}

/**
 * L'ordre est celui des dossiers, pour qu'Étienne s'y retrouve. Les trois
 * écartés n'y figurent pas.
 */
export const EVENEMENTS: readonly Evenement[] = [
  { slug: "02-soiree-ouverture-10-janvier-25", nom: "Soirée d'ouverture", categorie: "lancements" },
  { slug: "03-shooting-interlope-7-mars-25", nom: "Interlope", categorie: "lancements" },
  { slug: "05-defile-litovska-1-octobre-2025", nom: "Défilé Litkovska", categorie: "defiles" },
  { slug: "06-showroom-oakley", nom: "Showroom Oakley", categorie: "showrooms" },
  { slug: "07-soiree-18-septembre-2025", nom: "Soirée du 18 septembre", categorie: "lancements" },
  { slug: "08-diner-kim-attaf-dng", nom: "Dîner Kim Attaf — DNG", categorie: "diners" },
  { slug: "10-michele-x-secours-populaire-vernissage-2-decembre-2025", nom: "Michele × Secours populaire", categorie: "expositions" },
  { slug: "11-roc", nom: "ROC", categorie: "lancements" },
  { slug: "12-dejeuner-homemade-19-mars-26", nom: "Déjeuner Homemade", categorie: "diners" },
  { slug: "13-mugler-rose", nom: "Mugler", categorie: "lancements" },
  { slug: "14-tiktok", nom: "TikTok", categorie: "lancements" },
  { slug: "16-leboncoin", nom: "Le Bon Coin", categorie: "lancements" },
  { slug: "17-caisse-claire", nom: "Caisse Claire", categorie: "lancements" },
  { slug: "18-oakley-26", nom: "Oakley 26", categorie: "showrooms" },
  { slug: "19-rayban-rose", nom: "Ray-Ban", categorie: "showrooms" },
  { slug: "20-caisse-claire-2", nom: "Caisse Claire 2", categorie: "lancements" },
  { slug: "21-servaire", nom: "Servaire & Co", categorie: "expositions" },
  { slug: "diners-vrac", nom: "Dîners — photos en vrac", categorie: "diners" },
  /*
   * ⚠️ « Voitures » EST le dîner Maison 123 « FUSION » — la Triumph garée près
   * de la table. Les deux catégories s'en nourrissent : Automobile pour les
   * cadrages sur la voiture, Dîners pour ceux sur la table. Ce sont les 23
   * originaux iPhone (2268 × 4032) de PHOTOS/SELECTION PHOTOS SITE/03. VOITURES,
   * pas les copies réduites du site.
   */
  { slug: "voitures", nom: "Dîner Maison 123 — Fusion", categorie: "automobile" },
  /*
   * ⚠️ MÊME PLANCHE QUE CI-DESSUS, AUTRE ÉVÉNEMENT. Le dossier
   * `SELECTION PHOTOS SITE/03. VOITURES` mélange la Triumph du dîner Maison
   * 123 et le Cayenne Electric — exactement comme le dossier téléphone. Ces
   * neuf vues rejoignent l'événement Porsche par `fusionneAvec` : il n'en
   * avait que cinq, et Automobile était la catégorie la plus maigre du site.
   * Voir `source` dans `tri-selection.json`.
   */
  { slug: "voitures-porsche", nom: "Porsche — vues du dossier voitures", categorie: "automobile" },
  /* Retrouvé par Étienne le 21/09/2026 : un mélange de plusieurs dîners
     signés HOMEMADE. Contient des HEIC, d'où la conversion par sips. */
  { slug: "homemade-mix", nom: "HOMEMADE — plusieurs dîners", categorie: "diners" },
  /*
   * Images tirées des 12 vidéos du dossier voitures, trois par vidéo (au quart,
   * à la moitié, aux trois quarts — on évite le début et la fin, souvent flous).
   * ⚠️ Les vidéos sont en 1 920 × 1 080 : les images en héritent, ce qui est
   * moins qu'une photo mais BIEN plus que les 952 px servis par Instagram, et
   * surtout c'est horizontal. Les pleines résolutions sont dans
   * `SELECTION PHOTOS SITE/03. VOITURES/IMAGES EXTRAITES/`.
   */
  { slug: "voitures-videos", nom: "Voitures — images de vidéos", categorie: "automobile" },
  /*
   * Retrouvé par Étienne dans son téléphone le 21/09/2026. Quatre photos et
   * UNE VIDÉO — la première d'une galerie. L'agence est REVOLVR (sans « e »
   * final, et non « Revolver » comme l'entend la dictée).
   */
  { slug: "24-new-balance", nom: "Déjeuner New Balance — REVOLVR", categorie: "diners" },
  /*
   * Deux dossiers retrouvés par Étienne le 22/09/2026 dans
   * `PHOTOS/SELECTION PHOTOS SITE`, un rangement qu'il avait oublié avoir
   * fait. 54 vues au total, dont 14 vidéos.
   *
   * ⚠️ DEUX PRÉCAUTIONS AVANT DE PUBLIER, et aucune n'est théorique :
   *
   * 1. Le dossier DINERS contient le dîner de MARINE ABIAD, que la liste des
   *    écartés en tête de ce fichier interdit de publier. Étienne l'a
   *    reconfirmé le 22/09. Rien ne sort de cette planche sans son tri.
   * 2. Le dossier PFW mélange des défilés CHEZ NOUS et des photos prises
   *    ailleurs — du street style devant des enseignes italiennes, des
   *    premiers rangs dans une salle qui n'est pas la nôtre. Publier le lieu
   *    d'un autre comme si c'était le sien serait une faute, et elle se
   *    verrait.
   */
  { slug: "25-diners-selection", nom: "Dîners — sélection retrouvée", categorie: "diners" },
  { slug: "26-pfw-defiles", nom: "Paris Fashion Week — défilés", categorie: "defiles" },
  /*
   * Retrouvé par Étienne sur son téléphone le 21/09/2026. Photos en pleine
   * résolution iPhone (2268 × 4032) ET vidéos — les premières vidéos destinées
   * à la photothèque. Archivé dans `PHOTOS/EVENTS/23. VOITURES — TELEPHONE`.
   */
  { slug: "voitures-telephone", nom: "Porsche — Cayenne électrique", categorie: "automobile" },
];
