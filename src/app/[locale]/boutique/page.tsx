import type { Metadata } from "next";
import { RefonteLieu } from "@/components/refonte/RefonteLieu";

/** Maquette de la page de lieu — deviendra `/boutique` à la bascule. */
export const metadata: Metadata = {
  title: "La Boutique — 45 m² vitrine sur rue | Chez Les Plombiers",
  description: "45 m² avec vitrine sur le 39 rue des Bourdonnais. Pop-up, showroom de presse, lancement."
};

export default function Page() {
  return <RefonteLieu slug="boutique" />;
}
