import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefonteConfidentialite } from "@/components/refonte/RefonteLegal";

export const metadata: Metadata = partage({
  titre: "Politique de confidentialité — Chez Les Plombiers",
  description:
    "Les données que nous recueillons et ce que nous en faisons.",
  visuel: "defaut",
  chemin: "/confidentialite",
});

export default function Page() {
  return <RefonteConfidentialite />;
}
