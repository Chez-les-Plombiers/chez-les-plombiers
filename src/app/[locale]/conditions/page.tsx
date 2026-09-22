import type { Metadata } from "next";
import { RefonteConditions } from "@/components/refonte/RefonteConditions";

/** Maquette de `/conditions` — page de travail. */
export const metadata: Metadata = {
  title: "Conditions de location — Chez Les Plombiers",
  description: "Réserver et payer, avant et pendant votre événement, en partant, et le dépôt de garantie."
};

export default function RefonteConditionsPage() {
  return <RefonteConditions />;
}
