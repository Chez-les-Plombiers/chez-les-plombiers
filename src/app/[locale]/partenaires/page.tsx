import type { Metadata } from "next";
import { RefontePartenaires } from "@/components/refonte/RefontePartenaires";

export const metadata: Metadata = {
  title: "Partenaires — Chez Les Plombiers",
  description: "Mathias Rouveure, chef partenaire, et ce que nous organisons : sécurité, ménage, mobilier, régisseur."
};

export default function Page() {
  return <RefontePartenaires />;
}
