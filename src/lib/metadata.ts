export const SITE_URL = "https://chezlesplombiers.fr";
export const SITE_NAME = "Chez Les Plombiers";

export const DEFAULT_METADATA = {
  title: "Chez Les Plombiers | Lieu Évènementiel Paris 1er",
  description:
    "Espace évènementiel de 200m² au cœur de Paris. Fashion shows, séminaires, dîners d'exception. 39 rue des Bourdonnais, 75001.",
  openGraph: {
    title: "Chez Les Plombiers | Lieu Évènementiel Paris 1er",
    description:
      "Espace évènementiel de 200m² au cœur de Paris. Fashion shows, séminaires, dîners d'exception.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/hero.png`,
        width: 1200,
        height: 630,
        alt: "Chez Les Plombiers - Lieu évènementiel Paris",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Chez Les Plombiers | Lieu Évènementiel Paris 1er",
    description:
      "Espace évènementiel de 200m² au cœur de Paris. Fashion shows, séminaires, dîners d'exception.",
    images: [`${SITE_URL}/images/hero.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const EXTERNAL_LINKS = {
  calendly: "https://calendly.com/chezlesplombiers/visite",
  pricing: "https://pricing.chezlesplombiers.fr",
  whatsapp: "https://wa.me/33688679981",
  email: "mailto:contact@chezlesplombiers.fr",
  instagram: "https://instagram.com/chezlesplombiers",
};
