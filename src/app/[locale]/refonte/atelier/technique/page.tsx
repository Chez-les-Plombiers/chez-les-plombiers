import type { Metadata } from "next";
import { RefonteTechnique } from "@/components/refonte/RefonteTechnique";

/** Maquette — deviendra `/atelier/technique`. Les plans y sont aussi. */
export const metadata: Metadata = {
  title: "Maquette refonte — Fiche technique",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefonteTechnique />;
}
