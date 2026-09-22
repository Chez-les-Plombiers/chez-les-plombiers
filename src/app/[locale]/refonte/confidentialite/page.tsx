import type { Metadata } from "next";
import { RefonteConfidentialite } from "@/components/refonte/RefonteLegal";

export const metadata: Metadata = {
  title: "Maquette refonte — Politique de confidentialité",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefonteConfidentialite />;
}
