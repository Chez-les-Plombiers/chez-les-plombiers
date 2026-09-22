import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefonteInfos } from "@/components/refonte/RefonteInfos";

/** Maquette de `/infos` — page de travail. Deviendra `/infos` à la bascule. */
export const metadata: Metadata = partage({
  titre: "Venir, livrer, repartir — Chez Les Plombiers",
  description:
    "Trouver l'entrée au 39 rue des Bourdonnais, décharger, se garer, les horaires. Page faite pour être envoyée à un prestataire.",
  visuel: "defaut",
  chemin: "/infos",
});

export default function RefonteInfosPage() {
  return <RefonteInfos />;
}
