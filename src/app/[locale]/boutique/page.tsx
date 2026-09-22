import type { Metadata } from "next";
import { partage } from "@/lib/partage";
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
  return <RefonteLieu slug="boutique" />;
}
