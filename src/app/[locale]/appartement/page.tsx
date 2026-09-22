import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefonteLieu } from "@/components/refonte/RefonteLieu";

/** Maquette de la page de lieu — deviendra `/appartement` à la bascule. */
export const metadata: Metadata = partage({
  titre: "L'Appartement — 100 m² au premier étage | Chez Les Plombiers",
  description:
    "100 m² au premier étage, jusqu'à 50 personnes. Dîners, réunions, shootings.",
  visuel: "appartement",
  chemin: "/appartement",
});

export default function Page() {
  return <RefonteLieu slug="appartement" />;
}
