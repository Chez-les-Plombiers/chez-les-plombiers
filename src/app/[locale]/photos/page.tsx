import type { Metadata } from "next";
import { partage } from "@/lib/partage";
import { RefontePhotosIndex } from "@/components/refonte/RefontePhotos";

export const metadata: Metadata = partage({
  titre: "Photos — Chez Les Plombiers",
  description:
    "Les trois lieux et les événements par type : dîners, showrooms, défilés, lancements, expositions, automobile.",
  visuel: "photos",
  chemin: "/photos",
});

export default function Page() {
  return <RefontePhotosIndex />;
}
