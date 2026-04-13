import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NouveauClientContent } from "@/components/NouveauClientContent";
import { SITE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nouveau Client — Chez les Plombiers",
    description:
      "Formulaire de réservation pour les clients de Chez les Plombiers. Renseignez vos informations de facturation pour finaliser votre réservation.",
    robots: { index: false, follow: false },
    openGraph: {
      title: "Nouveau Client — Chez les Plombiers",
      description:
        "Formulaire de réservation pour les clients de Chez les Plombiers.",
      url: `${SITE_URL}/nouveau-client`,
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/hero.png`,
          width: 1200,
          height: 630,
          alt: "Chez les Plombiers — Nouveau Client",
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/nouveau-client`,
    },
  };
}

export default function NouveauClientPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <NouveauClientContent />
      </main>
      <Footer />
    </>
  );
}
