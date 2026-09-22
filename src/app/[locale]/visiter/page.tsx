import type { Metadata } from "next";
import { RefonteVisiter } from "@/components/refonte/RefonteVisiter";

/** Maquette — deviendra `/visiter`. */
export const metadata: Metadata = {
  title: "Réserver une visite — Chez Les Plombiers",
  description: "Visite gratuite d'une demi-heure, du lundi au samedi, sur rendez-vous."
};

export default function Page() {
  return <RefonteVisiter />;
}
