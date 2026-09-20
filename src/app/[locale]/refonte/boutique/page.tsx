import type { Metadata } from "next";
import { RefonteLieu } from "@/components/refonte/RefonteLieu";

/** Maquette de la page de lieu — deviendra `/boutique` à la bascule. */
export const metadata: Metadata = {
  title: "Maquette refonte — boutique",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefonteLieu slug="boutique" />;
}
