import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RefontePhotosEvenement } from "@/components/refonte/RefontePhotos";
import {
  CATEGORIES_GALERIE,
  categorie,
  evenement,
} from "@/components/refonte/photos-data";
import { locales } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Maquette refonte — Photos",
  robots: { index: false, follow: false, nocache: true },
};

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
