import type { Metadata } from "next";
import { RefontePartenaires } from "@/components/refonte/RefontePartenaires";

export const metadata: Metadata = {
  title: "Maquette refonte — Partenaires",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefontePartenaires />;
}
