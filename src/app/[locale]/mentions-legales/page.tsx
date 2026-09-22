import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefonteMentionsLegales } from "@/components/refonte/RefonteLegal";

export const metadata: Metadata = partage({
  titre: "Mentions légales — Chez Les Plombiers",
  description:
    "Éditeur, hébergement, propriété intellectuelle.",
  visuel: "defaut",
  chemin: "/mentions-legales",
});

export default function Page() {
  return <RefonteMentionsLegales />;
}
