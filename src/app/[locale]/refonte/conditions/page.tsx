import type { Metadata } from "next";
import { RefonteConditions } from "@/components/refonte/RefonteConditions";

/** Maquette de `/conditions` — page de travail. */
export const metadata: Metadata = {
  title: "Maquette refonte — Conditions de location",
  robots: { index: false, follow: false, nocache: true },
};

export default function RefonteConditionsPage() {
  return <RefonteConditions />;
}
