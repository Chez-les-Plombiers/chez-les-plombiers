import type { Metadata } from "next";
import { RefonteLieu } from "@/components/refonte/RefonteLieu";

/** Maquette de la page de lieu — deviendra `/appartement` à la bascule. */
export const metadata: Metadata = {
  title: "L'Appartement — 100 m² au premier étage | Chez Les Plombiers",
  description: "100 m² au premier étage, jusqu'à 50 personnes. Dîners, réunions, shootings."
};

export default function Page() {
  return <RefonteLieu slug="appartement" />;
}
