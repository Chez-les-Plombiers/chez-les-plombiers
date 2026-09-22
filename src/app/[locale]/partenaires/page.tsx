import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefontePartenaires } from "@/components/refonte/RefontePartenaires";

export const metadata: Metadata = partage({
  titre: "Partenaires — Chez Les Plombiers",
  description:
    "Mathias Rouveure, chef partenaire, et ce que nous organisons : sécurité, ménage, mobilier, régisseur.",
  visuel: "defaut",
  chemin: "/partenaires",
});

export default function Page() {
  return <RefontePartenaires />;
}
