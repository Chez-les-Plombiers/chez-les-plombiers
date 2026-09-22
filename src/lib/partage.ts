import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./metadata";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  CE QU'ON VOIT QUAND ON COLLE UN LIEN DANS WHATSAPP
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ LE PIÈGE QUI A COÛTÉ CETTE PAGE, ET IL N'EST PAS INTUITIF.
 *
 * Les métadonnées de Next sont fusionnées **en surface**. Une page qui écrit
 * `title` mais pas `openGraph` n'en dérive PAS son titre de partage : elle
 * hérite du bloc `openGraph` du layout, en entier, tel quel. Documenté noir
 * sur blanc dans `generate-metadata.md` — « All openGraph fields from
 * app/layout.js are inherited […] because app/about/page.js doesn't set
 * openGraph metadata ».
 *
 * Conséquence observée le 22/09/2026 : les quatorze pages du site avaient
 * chacune un bon `<title>`, et partageaient toutes le MÊME aperçu — celui de
 * l'ancien site, « Lieu Évènementiel Paris 1er — 200m² », avec une photo de
 * L'ATELIER. Envoyer le lien de L'APPARTEMENT montrait L'ATELIER.
 *
 * ⚠️ Le défaut est invisible depuis le téléphone qui envoie : WhatsApp garde
 * l'aperçu en cache par URL, et l'expéditeur voit souvent autre chose que le
 * destinataire. Ne pas se fier à un essai maison — lire le HTML.
 *
 * ── D'OÙ CE HELPER ────────────────────────────────────────────────────────
 *
 * Il fabrique `openGraph` + `twitter` à partir du titre et de la description
 * que la page écrit déjà. Le seul argument à réfléchir est l'image. Trois
 * endroits à tenir cohérents devenaient trois endroits à oublier ; il n'en
 * reste qu'un.
 */

/**
 * Les visuels de partage, fabriqués par `gen-og.mjs` et posés dans
 * `public/og/`.
 *
 * ⚠️ DES FICHIERS STATIQUES, PAS `ImageResponse`. Une image de partage est
 * réclamée par des robots qu'on ne contrôle pas, en rafale, au moment précis
 * où un lien circule. Elle ne doit dépendre d'aucun quota — le 22/09/2026,
 * celui du plan Hobby a été épuisé et toutes les images du site sont tombées
 * en 402. Un JPEG dans `public/` ne peut pas échouer.
 */
export type Visuel = "defaut" | "atelier" | "boutique" | "appartement" | "photos";

interface Options {
  titre: string;
  description: string;
  /** Le lieu montré par la page. `defaut` = le visuel de marque. */
  visuel?: Visuel;
  /** Chemin de la page, pour la canonique. « / » pour l'accueil. */
  chemin: string;
}

export function partage({ titre, description, visuel = "defaut", chemin }: Options): Metadata {
  const url = chemin === "/" ? SITE_URL : `${SITE_URL}${chemin}`;
  const image = `${SITE_URL}/og/${visuel}.jpg`;

  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: titre,
      description,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "website",
      /*
       * ⚠️ Déclarer les dimensions RÉELLES du fichier. L'ancien bloc annonçait
       * 1200 × 630 pour un PNG de 4032 × 2268 pesant 1,8 Mo : les clients qui
       * font confiance à l'annonce réservaient une vignette au mauvais format,
       * et ceux qui téléchargeaient abandonnaient avant la fin.
       */
      images: [{ url: image, width: 1200, height: 630, alt: titre }],
    },
    twitter: {
      card: "summary_large_image",
      title: titre,
      description,
      images: [image],
    },
  };
}
