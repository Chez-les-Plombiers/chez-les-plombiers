import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefonteTechnique } from "@/components/refonte/RefonteTechnique";

/** Maquette — deviendra `/atelier/technique`. Les plans y sont aussi. */
export const metadata: Metadata = partage({
  titre: "Fiche technique et plans — L'Atelier | Chez Les Plombiers",
  description:
    "Puissances, connectique, emplacements, dimensions des portes, plans à télécharger.",
  visuel: "atelier",
  chemin: "/atelier/technique",
});

export default function Page() {
  return <RefonteTechnique />;
}
