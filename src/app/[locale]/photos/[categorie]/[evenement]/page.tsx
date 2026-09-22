import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RefontePhotosEvenement } from "@/components/refonte/RefontePhotos";
import {
  CATEGORIES_GALERIE,
  categorie,
  evenement,
} from "@/components/refonte/photos-data";
import { locales } from "@/lib/i18n";
import { partage } from "@/lib/partage";

/**
 * ⚠️ Même oubli que sur la page de catégorie : `noindex` de chantier laissé
 * après la bascule. Ces pages portent le nom des marques reçues — c'est
 * exactement ce qu'un prospect cherche quand il tape « défilé rue des
 * Bourdonnais ». Voir le commentaire du niveau au-dessus.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string; evenement: string }>;
}): Promise<Metadata> {
  const { categorie: cs, evenement: es } = await params;
  const c = categorie(cs);
  const e = evenement(es);
  if (!c || !e) return {};
  return partage({
    titre: `${e.nom} — ${c.nom} | Chez Les Plombiers`,
    description: `${e.photos.length} photos de ${e.nom}, accueilli au 39 rue des Bourdonnais, Paris 1er.`,
    visuel: "photos",
    chemin: `/photos/${cs}/${es}`,
  });
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    CATEGORIES_GALERIE.flatMap((c) =>
      c.evenements.map((e) => ({ locale, categorie: c.slug, evenement: e.slug }))
    )
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ categorie: string; evenement: string }>;
}) {
  const { categorie: cs, evenement: es } = await params;
  const c = categorie(cs);
  const e = evenement(es);
  if (!c || !e) notFound();
  return <RefontePhotosEvenement c={c} e={e} />;
}
