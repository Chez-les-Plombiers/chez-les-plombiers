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
  title: "Chez Les Plombiers — 3 lieux événementiels, Paris 1er",
  description: "Trois espaces à la même adresse, au 39 rue des Bourdonnais. Showrooms, lancements presse, dîners privés, défilés, expositions. Dès 1 000 € HT/jour."
};

export default function RefontePage() {
  return <RefonteHome />;
}
