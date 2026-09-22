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

export const metadata: Metadata = {
  title: "Maquette refonte — Photos",
  robots: { index: false, follow: false, nocache: true },
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
