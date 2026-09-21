import type { Metadata } from "next";
import { RefonteTriIndex } from "@/components/refonte/RefonteTri";

/** ⚠️ Page de travail temporaire — à supprimer après la sélection des photos. */
export const metadata: Metadata = {
  title: "Tri de la photothèque",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefonteTriIndex />;
}
