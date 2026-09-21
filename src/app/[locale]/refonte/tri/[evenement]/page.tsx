import type { Metadata } from "next";
import { RefonteTriEvenement } from "@/components/refonte/RefonteTri";
import { EVENEMENTS, LIEUX } from "@/components/refonte/tri-evenements";
import { locales } from "@/lib/i18n";

/** ⚠️ Page de travail temporaire — à supprimer après la sélection des photos. */
export const metadata: Metadata = {
  title: "Tri — planche contact",
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  /* Les lieux se trient par la même page — la planche ignore ce qu'elle montre. */
  const slugs = [...LIEUX.map((l) => l.slug), ...EVENEMENTS.map((e) => e.slug)];
  return locales.flatMap((locale) => slugs.map((s) => ({ locale, evenement: s })));
}

export default async function Page({
  params,
}: {
  params: Promise<{ evenement: string }>;
}) {
  const { evenement } = await params;
  return <RefonteTriEvenement slug={evenement} />;
}
