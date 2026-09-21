import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RefontePhotosCategorie } from "@/components/refonte/RefontePhotos";
import { CATEGORIES_GALERIE, categorie } from "@/components/refonte/photos-data";
import { locales } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Maquette refonte — Photos",
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    CATEGORIES_GALERIE.map((c) => ({ locale, categorie: c.slug }))
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie: slug } = await params;
  const c = categorie(slug);
  if (!c) notFound();
  return <RefontePhotosCategorie c={c} />;
}
