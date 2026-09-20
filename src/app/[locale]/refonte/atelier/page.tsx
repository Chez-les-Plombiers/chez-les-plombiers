import type { Metadata } from "next";
import { RefonteAtelier } from "@/components/refonte/RefonteAtelier";

/**
 * Maquette de la page de L'ATELIER — page de travail, pas une page du site.
 *
 * Elle vit sous `/refonte` le temps de la construction : on ne touche pas au
 * site en production tant que tout n'est pas là. À la bascule, elle deviendra
 * `/atelier`.
 */
export const metadata: Metadata = {
  title: "Maquette refonte — L'Atelier",
  robots: { index: false, follow: false, nocache: true },
};

export default function RefonteAtelierPage() {
  return <RefonteAtelier />;
}
