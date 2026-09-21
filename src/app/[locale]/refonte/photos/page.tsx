import type { Metadata } from "next";
import { RefontePhotosIndex } from "@/components/refonte/RefontePhotos";

export const metadata: Metadata = {
  title: "Maquette refonte — Photos",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefontePhotosIndex />;
}
