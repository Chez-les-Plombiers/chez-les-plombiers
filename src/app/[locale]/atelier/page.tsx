import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefonteLieu } from "@/components/refonte/RefonteLieu";

/** Maquette de la page de lieu — deviendra `/atelier` à la bascule. */
export const metadata: Metadata = partage({
  titre: "L'Atelier — 200 m² dans la cour | Chez Les Plombiers",
  description:
    "200 m² de plain-pied, jusqu'à 150 personnes, une voiture peut y entrer. Dimensions, équipements, tarifs.",
  visuel: "atelier",
  chemin: "/atelier",
});

export default function Page() {
  return <RefonteLieu slug="atelier" />;
}
