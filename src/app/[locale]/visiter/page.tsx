import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefonteVisiter } from "@/components/refonte/RefonteVisiter";

/** Maquette — deviendra `/visiter`. */
export const metadata: Metadata = partage({
  titre: "Réserver une visite — Chez Les Plombiers",
  description:
    "Visite gratuite d'une demi-heure, du lundi au samedi, sur rendez-vous.",
  visuel: "defaut",
  chemin: "/visiter",
});

export default function Page() {
  return <RefonteVisiter />;
}
