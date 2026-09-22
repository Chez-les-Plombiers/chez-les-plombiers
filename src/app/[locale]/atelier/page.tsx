import type { Metadata } from "next";
import { RefonteLieu } from "@/components/refonte/RefonteLieu";

/** Maquette de la page de lieu — deviendra `/atelier` à la bascule. */
export const metadata: Metadata = {
  title: "L'Atelier — 200 m² dans la cour | Chez Les Plombiers",
  description: "200 m² de plain-pied, jusqu'à 150 personnes, une voiture peut y entrer. Dimensions, équipements, tarifs."
};

export default function Page() {
  return <RefonteLieu slug="atelier" />;
}
