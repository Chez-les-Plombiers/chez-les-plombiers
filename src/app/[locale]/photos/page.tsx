import type { Metadata } from "next";
import { RefontePhotosIndex } from "@/components/refonte/RefontePhotos";

export const metadata: Metadata = {
  title: "Photos — Chez Les Plombiers",
  description: "Les trois lieux et les événements par type : dîners, showrooms, défilés, lancements, expositions, automobile."
};

export default function Page() {
  return <RefontePhotosIndex />;
}
