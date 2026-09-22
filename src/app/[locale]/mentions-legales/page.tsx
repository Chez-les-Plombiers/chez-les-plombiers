import type { Metadata } from "next";
import { RefonteMentionsLegales } from "@/components/refonte/RefonteLegal";

export const metadata: Metadata = {
  title: "Mentions légales — Chez Les Plombiers",
  description: "Éditeur, hébergement, propriété intellectuelle."
};

export default function Page() {
  return <RefonteMentionsLegales />;
}
