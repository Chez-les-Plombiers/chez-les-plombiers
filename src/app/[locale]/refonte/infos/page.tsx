import type { Metadata } from "next";
import { RefonteInfos } from "@/components/refonte/RefonteInfos";

/** Maquette de `/infos` — page de travail. Deviendra `/infos` à la bascule. */
export const metadata: Metadata = {
  title: "Maquette refonte — Venir, livrer, repartir",
  robots: { index: false, follow: false, nocache: true },
};

export default function RefonteInfosPage() {
  return <RefonteInfos />;
}
