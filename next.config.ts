import type { NextConfig } from "next";
import { redirectionsBascule } from "./src/lib/bascule";

// CSP : self + GA4/Clarity (analytics), Matterport + Google Maps (iframes visite).
// 'unsafe-inline' scripts : requis par les snippets GA/Clarity et Next sans infra nonce.
// ⚠️ `https://*.clarity.ms` et non `https://www.clarity.ms` : le tag Clarity
// n'est qu'un chargeur, il va ensuite chercher la vraie bibliothèque sur
// `scripts.clarity.ms`. Restreindre à `www` bloquait ce second script — donc
// Clarity ne collectait plus rien depuis le durcissement CSP du 26/08/2026,
// sans la moindre alerte. Constaté et corrigé le 19/09/2026.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.clarity.ms https://static.elfsight.com https://static.axept.io",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.axept.io",
  // img-src large : widgets tiers (Elfsight/Instagram, Axeptio, avatars Google) servent depuis des CDN variables
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://*.elfsightcdn.com https://fonts.gstatic.com https://fonts.axept.io",
  /*
   * ⚠️ LES DEUX API DE L'ÉTAT SONT INDISPENSABLES AU FORMULAIRE, et leur
   * absence ici le cassait en silence.
   *
   * `/nouveau-client` annonce « commencez à taper : l'annuaire des entreprises
   * remplit le SIRET et la TVA ». Le navigateur bloquait l'appel au titre de
   * cette politique : le champ ne proposait jamais rien, la page n'affichait
   * aucune erreur, et la promesse écrite juste en dessous restait lettre
   * morte. Signalé par Étienne le 23/09/2026.
   *
   * ⚠️ C'EST LE PIÈGE PROPRE À LA CSP : elle n'échoue jamais bruyamment. Le
   * `fetch` renvoie « Failed to fetch », le `catch` vide la liste, et tout a
   * l'air normal. Le seul endroit où ça se voit est la console du navigateur.
   * Après toute CSP touchée, ouvrir la console, pas seulement la page.
   *
   *   recherche-entreprises.api.gouv.fr → raison sociale, SIRET, TVA
   *   api-adresse.data.gouv.fr          → adresse postale de facturation
   */
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com https://*.elfsight.com https://*.elfsightcdn.com https://*.axept.io https://axeptio.imgix.net https://recherche-entreprises.api.gouv.fr https://api-adresse.data.gouv.fr",
  // ⚠️ `calendly.com` ajouté le 20/09/2026 : la page /visiter intègre le
  // calendrier au lieu de rediriger. Sans cette entrée, l'iframe est bloquée
  // en silence — page blanche, aucune erreur visible.
  "frame-src https://my.matterport.com https://www.google.com https://www.instagram.com https://calendly.com https://assets.calendly.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join("; ");

/**
 * Zone « tarifs » — application séparée servie sous le domaine principal.
 *
 * Le calendrier tarifaire est un autre projet Next (`chez-les-plombiers-pricing`).
 * Plutôt que de fusionner les deux bases de code, on le sert sous `/tarifs` par
 * réécriture : c'est le montage multi-zones de Next.js. L'application distante
 * déclare `basePath: "/tarifs"`, elle génère donc elle-même toutes ses URL et
 * ses assets sous ce préfixe — il n'y a rien à réécrire côté chemins.
 *
 * ⚠️ La cible est l'alias de déploiement `*.vercel.app`, PAS
 * `pricing.chezlesplombiers.fr`. Ce dernier redirige désormais en 308 vers
 * `/tarifs` : le viser ici créerait une boucle infinie.
 *
 * ⚠️ Cet hôte précis n'est pas devinable, et le nom « évident »
 * `chez-les-plombiers-pricing.vercel.app` N'EST PAS un alias du projet — il
 * répond quand même, avec un déploiement périmé, ce qui donne un 404 très
 * difficile à interpréter. L'alias de production permanent se lit avec
 * `vercel inspect <déploiement> --scope chez-les-plombiers`, section Aliases.
 * Le second alias stable (`…-pricing-chez-les-plombiers.vercel.app`) est
 * inutilisable ici : il est derrière la protection de déploiement (302).
 *
 * ⚠️ `src/proxy.ts` doit laisser passer `/tarifs` avant sa réécriture de langue,
 * sinon la requête part vers `/fr/tarifs` et n'arrive jamais ici.
 */
const PRICING_ZONE = "https://chez-les-plombiers-pricing-ivory.vercel.app";

const nextConfig: NextConfig = {
  /*
   * ⚠️⚠️ L'OPTIMISEUR D'IMAGES DE VERCEL EST COUPÉ, ET C'EST DÉLIBÉRÉ.
   *
   * Le 22/09/2026, quelques heures après la mise en ligne, toutes les images
   * du site ont commencé à renvoyer `402 Payment Required` —
   * `OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED`. Le plan Hobby plafonne le
   * nombre de transformations, et la photothèque en consomme énormément : 845
   * images, multipliées par chaque largeur d'écran demandée.
   *
   * ⚠️ Le symptôme est trompeur : la page se construit normalement, les
   * cadres et les légendes s'affichent, et seules les images manquent. On
   * cherche un bug de code là où il n'y en a pas.
   *
   * ⚠️ ET ON NE PERD RIEN. Nos images sont DÉJÀ optimisées à la fabrication :
   * `gen-photos.mjs` sort du WebP 1 200 px en qualité 72. L'optimiseur ne
   * faisait que les redimensionner une seconde fois, contre un quota.
   *
   * Ce qu'on perd vraiment : le redimensionnement par écran. Un téléphone
   * reçoit le 1 200 px au lieu d'un 640 px. C'est pourquoi les JPEG bruts de
   * `public/photos` ont été ramenés à une taille servable — voir
   * `NOTES-REFONTE.md`.
   */
  images: { unoptimized: true },
  async rewrites() {
    return {
      // `beforeFiles` : la réécriture doit primer sur toute route locale, pour
      // qu'une page `/tarifs` créée par mégarde côté vitrine ne masque jamais
      // l'application de tarification.
      beforeFiles: [
        { source: "/tarifs", destination: `${PRICING_ZONE}/tarifs` },
        { source: "/tarifs/:path*", destination: `${PRICING_ZONE}/tarifs/:path*` },
        /*
         * L'administration, a la racine du domaine (26/09/2026).
         *
         * ⚠️ Seule la PAGE remonte d'un cran : l'application distante declare
         * `basePath: "/tarifs"`, donc ses assets (`/tarifs/_next/*`) et ses
         * API (`/tarifs/api/*`) continuent de passer par les deux lignes
         * ci-dessus. Les supprimer laisserait `/admin` sans JavaScript.
         *
         * ⚠️ Le menu de l'administration utilise des `<a>` nus, pas
         * `next/link` : le routeur client de la zone croit vivre sous
         * `/tarifs` et reecrirait la barre d'adresse en `/tarifs/admin/...`.
         */
        { source: "/admin", destination: `${PRICING_ZONE}/tarifs/admin` },
        { source: "/admin/:path*", destination: `${PRICING_ZONE}/tarifs/admin/:path*` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(.+)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/documents/:path*.pdf",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect vercel.app URLs to custom domain to avoid duplicate content
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?:.*\\.)?vercel\\.app",
          },
        ],
        destination: "https://www.chezlesplombiers.fr/:path*",
        permanent: true,
      },
      // Redirect non-www to www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "chezlesplombiers.fr",
          },
        ],
        destination: "https://www.chezlesplombiers.fr/:path*",
        permanent: true,
      },
      /*
       * ⚠️ TROIS REDIRECTIONS ONT ÉTÉ RETIRÉES ICI LE 22/09/2026, à la
       * bascule : `/photos`, `/visiter` et `/histoire`. Elles renvoyaient
       * vers des ancres de l'ancien accueil parce que ces adresses ne
       * menaient nulle part. La refonte leur donne une vraie page — les
       * laisser l'aurait rendue injoignable, par un 308 silencieux.
       *
       * ⚠️ `/equipements` ne va plus à une ancre mais à `/atelier/technique`,
       * qui est la page qui répond vraiment.
       *
       * ⚠️ NE PAS EN AJOUTER SANS VÉRIFIER qu'aucune page ne porte ce nom.
       */
      // Fix Google sitelinks pointing to non-existent pages
      { source: "/l-histoire", destination: "/", permanent: true },
      { source: "/galerie", destination: "/photos", permanent: true },
      { source: "/equipements", destination: "/atelier/technique", permanent: true },
      { source: "/equipements-infos", destination: "/atelier/technique", permanent: true },
      { source: "/visite", destination: "/visiter", permanent: true },
      { source: "/contact", destination: "/visiter", permanent: true },
      // Fix GSC 404 errors
      { source: "/lieu", destination: "/", permanent: true },
      { source: "/en/fr", destination: "/en", permanent: true },
      // Old service slug redirect
      { source: "/services/diners-prives", destination: "/services/diners-exception", permanent: true },
      { source: "/en/services/diners-prives", destination: "/en/services/exceptional-dinners", permanent: true },
      // Legacy Squarespace pages
      { source: "/blank", destination: "/", permanent: true },
      { source: "/blank-1", destination: "/", permanent: true },
      { source: "/blank-2", destination: "/", permanent: true },
      /*
       * ⚠️ VIDE TANT QUE LA REFONTE N'EST PAS EN LIGNE. Tout est écrit et
       * relu dans `src/lib/bascule.ts`, derrière un seul interrupteur : la
       * fin du site anglais et le sort des pages sans équivalent. Y lire
       * aussi `A_RETIRER_DE_NEXT_CONFIG` — les redirections ci-dessus qui
       * rendraient les pages neuves injoignables si on les laissait.
       */
      ...redirectionsBascule(),
    ];
  },
};

export default nextConfig;
