import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefonteTechnique } from "@/components/refonte/RefonteTechnique";

export const metadata: Metadata = partage({
  titre: "Fiche technique et plan — L'Appartement | Chez Les Plombiers",
  description:
    "Équipement, climatisation, cuisine, sanitaires, et le plan coté à télécharger.",
  visuel: "appartement",
  chemin: "/appartement/technique",
});

export default function Page() {
  return <RefonteTechnique lieu="appartement" />;
}
