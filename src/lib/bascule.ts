/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  LA BASCULE — tout ce qui change le jour où la refonte devient LE site
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Un seul interrupteur, et tout ce qu'il commande écrit au même endroit. Une
 * bascule qui se fait à dix fichiers se fait à moitié : on se souvient des
 * pages, on oublie les redirections, et une adresse imprimée sur une plaquette
 * tombe dans le vide six mois plus tard.
 *
 * ── CE QUI RESTE À FAIRE À LA MAIN, CE FICHIER NE LE COUVRE PAS ───────────
 *
 *   1. `lien()` dans `components/refonte/chrome.tsx` — retirer le préfixe.
 *   2. Les routes : faire pointer `/`, `/infos`, `/conditions`… sur les
 *      composants de la refonte au lieu des anciens.
 *   3. `robots` : retirer les `noindex` des pages `/refonte/*`.
 *   4. `sitemap.ts` : le réécrire sur les nouvelles adresses.
 *   5. Supprimer les pages de tri (`/refonte/tri/*`, `public/photos/tri/`).
 *
 * ⚠️ NE PAS PASSER `BASCULE` À `true` SANS ÉTIENNE. Ces redirections font
 * disparaître le site anglais et détournent une vingtaine d'adresses indexées.
 * C'est réversible — un `false` et un déploiement — mais ça se décide.
 */
export const BASCULE = true;

/**
 * ── LE SITE ANGLAIS S'ARRÊTE ──────────────────────────────────────────────
 *
 * Décision d'Étienne, 22/09/2026 : la refonte est en français seul. Pour des
 * dimensions, des horaires et un plan d'accès, la traduction automatique des
 * navigateurs suffit largement — c'est la prose commerciale qu'elle abîme.
 *
 * ⚠️ MAIS ON NE LES LAISSE PAS MOURIR EN 404. Une vingtaine de pages `/en/*`
 * sont indexées ; chacune part en 301 vers son équivalent français, ce qui
 * transmet leur ancienneté au lieu de la perdre. Et surtout, ça supprime le
 * défaut actuel : `/en/refonte` sert du français en se déclarant `lang="en"`,
 * ce que Google lit comme une erreur.
 *
 * ⚠️ `/en/:path*` en dernier, et pas en premier : une règle générique placée
 * avant les règles précises les rendrait toutes inertes.
 */
const ANGLAIS: Array<[string, string]> = [
  ["/en", "/"],
  ["/en/apartment", "/appartement"],
  ["/en/info", "/infos"],
  ["/en/legal-notice", "/mentions-legales"],
  ["/en/privacy-policy", "/confidentialite"],
  ["/en/our-chef", "/partenaires"],
  ["/en/studio", "/atelier"],
  ["/en/guide", "/infos"],
  // Les sept pages de services : elles décrivaient un TYPE d'événement.
  // La photothèque le montre, désormais, au lieu de le raconter.
  ["/en/services/fashion-shows", "/photos/defiles"],
  ["/en/services/corporate-breakfasts", "/photos/diners"],
  ["/en/services/professional-events", "/photos"],
  ["/en/services/exceptional-dinners", "/photos/diners"],
  ["/en/services/cultural-events", "/photos/expositions"],
  ["/en/services/seminars-training", "/photos"],
  ["/en/services/automotive-events", "/photos/automobile"],
  // Les quatre pages de référencement non-marque.
  ["/en/event-venue-paris", "/"],
  ["/en/unique-venue-paris", "/"],
  ["/en/corporate-seminar-paris", "/"],
  ["/en/car-photoshoot-paris", "/"],
  // Le filet : toute autre adresse anglaise revient à l'accueil français.
  ["/en/:path*", "/"],
];

/**
 * ── LES PAGES FRANÇAISES SANS ÉQUIVALENT DANS LA REFONTE ──────────────────
 *
 * ⚠️ Elles ne vont PAS toutes à l'accueil. Une redirection vers `/` est un
 * aveu : elle dit au visiteur qu'on a supprimé ce qu'il cherchait. Chacune
 * pointe donc vers la page qui répond le mieux à sa question — les pages
 * « services » vers la catégorie de photos correspondante, le chef vers les
 * partenaires, le guide vers les infos pratiques.
 *
 * Les quatre pages de référencement, elles, vont bien à l'accueil : elles
 * n'avaient pas de contenu propre, c'étaient des variations de la même
 * présentation du lieu.
 */
const FRANCAIS: Array<[string, string]> = [
  ["/services/fashion-shows", "/photos/defiles"],
  ["/services/petit-dejeuners", "/photos/diners"],
  ["/services/evenements-professionnels", "/photos"],
  ["/services/diners-exception", "/photos/diners"],
  ["/services/evenements-culturels", "/photos/expositions"],
  ["/services/seminaires-formations", "/photos"],
  ["/services/evenements-auto-moto", "/photos/automobile"],
  ["/notre-chef", "/partenaires"],
  ["/studio", "/atelier"],
  ["/guide", "/infos"],
  ["/politique-confidentialite", "/confidentialite"],
  ["/lieu-evenementiel-paris", "/"],
  ["/espace-atypique-paris", "/"],
  ["/seminaire-entreprise-paris", "/"],
  ["/shooting-voiture-paris", "/"],
];

/**
 * ⚠️⚠️ LA LISTE LA PLUS DANGEREUSE DU FICHIER, ET ELLE NE S'EXÉCUTE PAS.
 *
 * Ces redirections existent AUJOURD'HUI dans `next.config.ts` et doivent être
 * SUPPRIMÉES à la bascule. Elles ont été ajoutées quand ces adresses ne
 * menaient nulle part ; la refonte leur donne une vraie page, et si on les
 * laisse, la page neuve devient injoignable — un 308 vers une ancre de
 * l'ancien accueil, sans le moindre message d'erreur.
 *
 *   /photos    → /#portfolio     la photothèque, 700 photos
 *   /visiter   → /#contact       la page de réservation de visite
 *   /histoire  → /#about         à venir
 *   /galerie   → /#portfolio     à garder : pas d'équivalent
 *   /equipements → /#equipments  à faire pointer sur /atelier/technique
 *
 * On ne peut pas les retirer d'ici : `next.config.ts` les déclare en dur. Cette
 * liste est là pour qu'on ne les oublie pas — la vérifier ligne à ligne.
 */
export const A_RETIRER_DE_NEXT_CONFIG = [
  "/photos",
  "/visiter",
  "/histoire",
  "/equipements",
  "/equipements-infos",
] as const;

/** Les redirections à servir, une fois la bascule faite. */
export function redirectionsBascule() {
  if (!BASCULE) return [];
  return [...FRANCAIS, ...ANGLAIS].map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
  }));
}
