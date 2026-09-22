import type { Metadata } from "next";
import { RefonteConfidentialite } from "@/components/refonte/RefonteLegal";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Chez Les Plombiers",
  description: "Les données que nous recueillons et ce que nous en faisons."
};

export default function Page() {
  return <RefonteConfidentialite />;
}
