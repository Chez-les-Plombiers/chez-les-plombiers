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
  /* Retrouvé par Étienne le 21/09/2026 : un mélange de plusieurs dîners
     signés HOMEMADE. Contient des HEIC, d'où la conversion par sips. */
  { slug: "homemade-mix", nom: "HOMEMADE — plusieurs dîners", categorie: "diners" },
];
