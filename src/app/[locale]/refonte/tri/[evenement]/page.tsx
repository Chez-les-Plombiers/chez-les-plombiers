import type { Metadata } from "next";
import { RefonteTriEvenement } from "@/components/refonte/RefonteTri";
import { EVENEMENTS } from "@/components/refonte/tri-evenements";
import { locales } from "@/lib/i18n";

/** ⚠️ Page de travail temporaire — à supprimer après la sélection des photos. */
export const metadata: Metadata = {
  title: "Tri — planche contact",
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    EVENEMENTS.map((e) => ({ locale, evenement: e.slug }))
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ evenement: string }>;
}) {
  const { evenement } = await params;
  return <RefonteTriEvenement slug={evenement} />;
}
