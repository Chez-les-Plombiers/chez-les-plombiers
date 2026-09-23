import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import {
  DonneesLieu,
  LIEUX_STRUCTURES,
} from "@/components/refonte/DonneesStructurees";
import { RefonteLieu } from "@/components/refonte/RefonteLieu";

/** Maquette de la page de lieu — deviendra `/boutique` à la bascule. */
export const metadata: Metadata = partage({
  titre: "La Boutique — 40 m² vitrine sur rue | Chez Les Plombiers",
  description:
    "40 m² avec vitrine sur le 39 rue des Bourdonnais. Pop-up, showroom de presse, lancement.",
  visuel: "boutique",
  chemin: "/boutique",
});

export default function Page() {
  return (
    <>
      <DonneesLieu lieu={LIEUX_STRUCTURES.boutique} />
      <RefonteLieu slug="boutique" />
    </>
  );
}
