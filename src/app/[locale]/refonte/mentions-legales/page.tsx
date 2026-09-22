import type { Metadata } from "next";
import { RefonteMentionsLegales } from "@/components/refonte/RefonteLegal";

export const metadata: Metadata = {
  title: "Maquette refonte — Mentions légales",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefonteMentionsLegales />;
}
