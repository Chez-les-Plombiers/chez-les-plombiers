import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefonteConditions } from "@/components/refonte/RefonteConditions";

/** Maquette de `/conditions` — page de travail. */
export const metadata: Metadata = partage({
  titre: "Conditions de location — Chez Les Plombiers",
  description:
    "Réserver et payer, avant et pendant votre événement, en partant, et le dépôt de garantie.",
  visuel: "defaut",
  chemin: "/conditions",
});

export default function RefonteConditionsPage() {
  return <RefonteConditions />;
}
