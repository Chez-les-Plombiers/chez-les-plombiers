export interface SeoPageInfo {
  slugFr: string;
  slugEn: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  image: string;
}

export const SEO_PAGES: SeoPageInfo[] = [
  {
    slugFr: "lieu-evenementiel-paris",
    slugEn: "event-venue-paris",
    titleFr: "Lieu Événementiel Paris",
    titleEn: "Event Venue Paris",
    descriptionFr: "200 m² modulables au cœur de Paris 1er, métro Châtelet.",
    descriptionEn: "200 sqm adaptable space in the heart of Paris 1st, Chatelet metro.",
    image: "/images/hero.png",
  },
  {
    slugFr: "espace-atypique-paris",
    slugEn: "unique-venue-paris",
    titleFr: "Espace Atypique Paris",
    titleEn: "Unique Venue Paris",
    descriptionFr: "Charme industriel et élégance contemporaine pour vos événements.",
    descriptionEn: "Industrial charm meets contemporary elegance for your events.",
    image: "/photos/espace-atypique.jpg",
  },
  {
    slugFr: "seminaire-entreprise-paris",
    slugEn: "corporate-seminar-paris",
    titleFr: "Séminaire Entreprise Paris",
    titleEn: "Corporate Seminar Paris",
    descriptionFr: "80 places assises, vidéoprojecteur 8 800 lumens, cuisine pro.",
    descriptionEn: "80 seated, 8,800-lumen projector, professional kitchen.",
    image: "/photos/espace-travail.jpg",
  },
  {
    slugFr: "shooting-voiture-paris",
    slugEn: "car-photoshoot-paris",
    titleFr: "Shooting Voiture Paris",
    titleEn: "Car Photoshoot Paris",
    descriptionFr: "Studio automobile avec accès direct véhicules, cyclorama et éclairage Kiosc.",
    descriptionEn: "Automotive studio with direct vehicle access, cyclorama and Kiosc lighting.",
    image: "/images/services/evenements-auto-moto.jpg",
  },
];

export const SERVICE_TO_SEO_PAGE: Record<string, string> = {
  "diners-exception": "lieu-evenementiel-paris",
  "fashion-shows": "espace-atypique-paris",
  "evenements-auto-moto": "shooting-voiture-paris",
  "evenements-professionnels": "seminaire-entreprise-paris",
  "evenements-culturels": "lieu-evenementiel-paris",
  "petit-dejeuners": "lieu-evenementiel-paris",
};
