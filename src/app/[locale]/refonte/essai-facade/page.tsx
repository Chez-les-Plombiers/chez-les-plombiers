import type { Metadata } from "next";
import { RefonteEssaiFacade } from "@/components/refonte/RefonteEssaiFacade";

/** ⚠️ Page d'essai — à supprimer une fois la façade placée pour de bon. */
export const metadata: Metadata = {
  title: "Essai — la façade annotée",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefonteEssaiFacade />;
}
