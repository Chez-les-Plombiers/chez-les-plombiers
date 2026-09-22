import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  RefontePhotosCategorie,
  RefontePhotosLieu,
} from "@/components/refonte/RefontePhotos";
import {
  CATEGORIES_GALERIE,
  LIEUX_GALERIE,
  categorie,
  lieu,
} from "@/components/refonte/photos-data";
import { locales } from "@/lib/i18n";
import { type Visuel, partage } from "@/lib/partage";

/**
 * ⚠️ CETTE PAGE ÉTAIT EN `noindex`, ET ELLE EST RESTÉE COMME ÇA APRÈS LA
 * BASCULE. Titre « Maquette refonte — Photos », robots fermés : des réglages
 * de chantier, justes tant que la refonte vivait sous `/refonte`, oubliés le
 * 22/09. Pendant ce temps le sitemap déclarait ces adresses — on demandait
 * donc à Google de venir voir des pages qui lui disaient de repartir.
 *
 * ⚠️ C'est la partie la plus volumineuse du site : les catégories et les
 * lieux portent l'essentiel des 700 photos. Ne pas les refermer.
 *
 * Le visuel de partage suit ce que la page montre : le lieu quand c'en est
 * un, le visuel « photos » pour une catégorie d'événements.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string }>;
}): Promise<Metadata> {
  const { categorie: slug } = await params;
  const l = lieu(enLieu(slug));
  if (l) {
    return partage({
      titre: `${l.nom} en photos — Chez Les Plombiers`,
      description: `${l.total} photos du lieu, vide, au 39 rue des Bourdonnais.`,
      visuel: VISUEL_LIEU[slug] ?? "photos",
      chemin: `/photos/${slug}`,
    });
  }
  const c = categorie(slug);
  if (!c) return {};
  return partage({
    titre: `${c.nom} — Chez Les Plombiers`,
    description: `${c.total} photos, ${c.evenements.length} événements accueillis au 39 rue des Bourdonnais.`,
    visuel: "photos",
    chemin: `/photos/${slug}`,
  });
}

/** Un lieu partage sa propre image, pas le visuel générique de la galerie. */
const VISUEL_LIEU: Record<string, Visuel> = {
  atelier: "atelier",
  boutique: "boutique",
  appartement: "appartement",
};

/**
 * ⚠️ UNE SEULE ROUTE POUR LES DEUX AXES. `/photos/atelier` montre un lieu,
 * `/photos/diners` une catégorie d'événements : deux contenus, mais un seul
 * niveau d'URL. Un segment `/photos/lieu/atelier` aurait ajouté un palier que
 * rien ne justifie, et une adresse plus longue à dicter au téléphone.
 *
 * Dans le code les lieux s'appellent `lieu-atelier` — le préfixe évite toute
 * collision avec une future catégorie. Il ne se voit pas dans l'URL.
 */
const enLieu = (slug: string) => `lieu-${slug}`;

export function generateStaticParams() {
  const slugs = [
    ...LIEUX_GALERIE.map((l) => l.slug.replace(/^lieu-/, "")),
    ...CATEGORIES_GALERIE.map((c) => c.slug),
  ];
  return locales.flatMap((locale) => slugs.map((categorie) => ({ locale, categorie })));
}

export default async function Page({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie: slug } = await params;
  const l = lieu(enLieu(slug));
  if (l) return <RefontePhotosLieu l={l} />;
  const c = categorie(slug);
  if (!c) notFound();
  return <RefontePhotosCategorie c={c} />;
}
