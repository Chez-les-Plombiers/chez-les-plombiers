import type { Metadata } from "next";
import { RefonteTechnique } from "@/components/refonte/RefonteTechnique";

/** Maquette — deviendra `/atelier/technique`. Les plans y sont aussi. */
export const metadata: Metadata = {
  title: "Fiche technique et plans — L'Atelier | Chez Les Plombiers",
  description: "Puissances, connectique, emplacements, dimensions des portes, plans à télécharger."
};

export default function Page() {
  return <RefonteTechnique />;
}
