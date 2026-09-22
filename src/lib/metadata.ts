export const SITE_URL = "https://www.chezlesplombiers.fr";
export const SITE_NAME = "Chez Les Plombiers";

/*
 * ⚠️ `DEFAULT_METADATA` A ÉTÉ SUPPRIMÉ LE 22/09/2026 — il n'était importé
 * nulle part. C'était un piège dormant : un bloc d'apparence officielle,
 * décrivant l'ancien site (« Lieu Évènementiel Paris 1er — 200m² », photo
 * `hero.png`), que le premier qui aurait cherché « les métadonnées par
 * défaut » aurait rebranché de bonne foi. Le vrai repli est dans
 * `app/[locale]/layout.tsx`, et les pages passent par `lib/partage.ts`.
 */

export const EXTERNAL_LINKS = {
  calendly: "https://calendly.com/chezlesplombiers/visite",
  // Les deux sous-domaines de tarification ont été rapatriés sous le domaine
  // principal le 19/09/2026 (ils restent joignables, en 301). Ces liens sont
  // devenus INTERNES : ils font enfin pointer le site vers ses propres pages
  // de prix, qui étaient jusqu'ici orphelines et donc invisibles de Google.
  pricing: "https://www.chezlesplombiers.fr/tarifs",
  pricingAppartement: "https://www.chezlesplombiers.fr/tarifs/appartement",
  whatsapp: "https://wa.me/33761471073",
  email: "mailto:contact@chezlesplombiers.fr",
  instagram: "https://instagram.com/chezlesplombiers",
};
