import type { Metadata } from "next";
import { RefonteLieu } from "@/components/refonte/RefonteLieu";

/** Maquette de la page de lieu — deviendra `/appartement` à la bascule. */
export const metadata: Metadata = {
  title: "Maquette refonte — appartement",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefonteLieu slug="appartement" />;
}
