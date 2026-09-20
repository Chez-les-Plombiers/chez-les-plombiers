import type { Metadata } from "next";
import { RefonteHome } from "@/components/refonte/RefonteHome";

/**
 * Maquette de la refonte — page de travail, pas une page du site.
 *
 * Déployée en production pour qu'Étienne puisse la regarder depuis son
 * téléphone et la montrer, mais fermée aux moteurs. Elle n'est liée depuis
 * aucune page et n'est pas au sitemap.
 *
 * ⚠️ À supprimer une fois la refonte bascule sur les vraies pages.
 */
export const metadata: Metadata = {
  title: "Maquette refonte — Chez Les Plombiers",
  robots: { index: false, follow: false, nocache: true },
};

export default function RefontePage() {
  return <RefonteHome />;
}
