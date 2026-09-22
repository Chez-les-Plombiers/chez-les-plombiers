import type { Metadata } from "next";
import { RefonteInfos } from "@/components/refonte/RefonteInfos";

/** Maquette de `/infos` — page de travail. Deviendra `/infos` à la bascule. */
export const metadata: Metadata = {
  title: "Venir, livrer, repartir — Chez Les Plombiers",
  description: "Trouver l'entrée au 39 rue des Bourdonnais, décharger, se garer, les horaires. Page faite pour être envoyée à un prestataire."
};

export default function RefonteInfosPage() {
  return <RefonteInfos />;
}
