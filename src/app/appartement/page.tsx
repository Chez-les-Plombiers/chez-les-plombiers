import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/metadata";
import { AppartementContent } from "./AppartementContent";

export const metadata: Metadata = {
  title: "L'Appartement Rose | Chez Les Plombiers Paris",
  description:
    "Un espace intime de 100m² pour 50 personnes. Shootings photo, interviews, réunions confidentielles. Cuisine équipée, mobilier design, Wi-Fi haut débit.",
  openGraph: {
    title: "L'Appartement Rose | Chez Les Plombiers Paris",
    description:
      "Un espace intime et lumineux, conçu pour des moments d'exception.",
    url: `${SITE_URL}/appartement`,
    images: [
      {
        url: `${SITE_URL}/images/appartement-hero.png`,
        width: 1200,
        height: 630,
        alt: "L'Appartement Rose - Chez Les Plombiers",
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/appartement`,
  },
};

export default function AppartementPage() {
  return (
    <>
      <Header />
      <AppartementContent />
      <Footer />
    </>
  );
}
