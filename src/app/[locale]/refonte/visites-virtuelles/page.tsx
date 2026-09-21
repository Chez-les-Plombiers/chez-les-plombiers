import type { Metadata } from "next";
import { RefonteVisitesVirtuelles } from "@/components/refonte/RefonteVisitesVirtuelles";

export const metadata: Metadata = {
  title: "Maquette refonte — Visites virtuelles",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefonteVisitesVirtuelles />;
}
