import type { Metadata } from "next";
import { RefonteVisitesVirtuelles } from "@/components/refonte/RefonteVisitesVirtuelles";

export const metadata: Metadata = {
  title: "Visites virtuelles — Chez Les Plombiers",
  description: "Se promener dans les lieux à 360°, depuis un ordinateur ou un téléphone."
};

export default function Page() {
  return <RefonteVisitesVirtuelles />;
}
