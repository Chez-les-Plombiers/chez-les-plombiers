import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefonteVisitesVirtuelles } from "@/components/refonte/RefonteVisitesVirtuelles";

export const metadata: Metadata = partage({
  titre: "Visites virtuelles — Chez Les Plombiers",
  description:
    "Se promener dans les lieux à 360°, depuis un ordinateur ou un téléphone.",
  visuel: "defaut",
  chemin: "/visites-virtuelles",
});

export default function Page() {
  return <RefonteVisitesVirtuelles />;
}
