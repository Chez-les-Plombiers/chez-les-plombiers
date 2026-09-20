import type { Metadata } from "next";
import { RefonteVisiter } from "@/components/refonte/RefonteVisiter";

/** Maquette — deviendra `/visiter`. */
export const metadata: Metadata = {
  title: "Maquette refonte — Réserver une visite",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefonteVisiter />;
}
