export const SITE_URL = "https://www.chezlesplombiers.fr";
export const SITE_NAME = "Chez Les Plombiers";

export const DEFAULT_METADATA = {
  title: "Lieu Évènementiel Paris 1er — 200m² | Chez Les Plombiers",
  description:
    "Louez un espace évènementiel unique de 200m² à Paris 1er : séminaires, dîners, défilés, cocktails. Dès 1 000 € HT/jour. Visite gratuite sur rendez-vous.",
  openGraph: {
    title: "Lieu Évènementiel Paris 1er — 200m² | Chez Les Plombiers",
    description:
      "Espace évènementiel de 200m² au cœur de Paris 1er. Fashion shows, séminaires, dîners d'exception. Dès 1 000 € HT/jour.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/hero.png`,
        width: 1200,
        height: 630,
        alt: "Chez Les Plombiers - Lieu évènementiel Paris 1er",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Lieu Évènementiel Paris 1er — 200m² | Chez Les Plombiers",
    description:
      "Espace évènementiel de 200m² au cœur de Paris 1er. Séminaires, dîners, défilés, cocktails. Dès 1 000 € HT/jour.",
    images: [`${SITE_URL}/images/hero.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const EXTERNAL_LINKS = {
  calendly: "https://calendly.com/chezlesplombiers/visite",
  // Les deux sous-domaines de tarification ont été rapatriés sous le domaine
  // principal le 19/09/2026 (ils restent joignables, en 301). Ces liens sont
  // devenus INTERNES : ils font enfin pointer le site vers ses propres pages
  // de prix, qui étaient jusqu'ici orphelines et donc invisibles de Google.
  pricing: "https://www.chezlesplombiers.fr/tarifs",
  pricingAppartement: "https://www.chezlesplombiers.fr/tarifs/appartement",
  whatsapp: "https://wa.me/33761471073",
  email: "mailto:contact@chezlesplombiers.fr",
  instagram: "https://instagram.com/chezlesplombiers",
};
