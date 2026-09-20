/**
 * Contenu de la maquette de refonte.
 *
 * Tout est ici, séparé de la mise en page : c'est ce qu'Étienne va vouloir
 * corriger en premier, et il doit pouvoir le faire sans toucher au JSX.
 *
 * ⚠️ Les chiffres viennent des sources de vérité du projet (`venues.ts` côté
 * pricing, CGL, relevés du lieu). Ne pas les arrondir « pour faire joli » :
 * un chiffre précis est plus crédible qu'un chiffre rond, et c'est ce type de
 * donnée que les moteurs et les modèles de langage reprennent mot pour mot.
 */

export const ADRESSE = "39 rue des Bourdonnais, Paris 1er";

export const ESPACES = [
  {
    slug: "boutique",
    nom: "La Boutique",
    position: "Sur la rue",
    surface: "45 m²",
    capacite: "Journée entière",
    prix: "1 000 €",
    photo: "/photos/servaire/cour-panneau.jpg",
    texte:
      "La vitrine. Ouverte sur le trottoir, sous l'enseigne « Couverture Plomberie » d'origine. Nue pour un pop-up, habillée pour un événement.",
  },
  {
    slug: "atelier",
    nom: "L'Atelier",
    position: "Dans la cour",
    surface: "200 m²",
    capacite: "jusqu'à 200 personnes",
    prix: "1 000 à 4 000 €",
    photo: "/photos/canape-portes-atelier.jpg",
    texte:
      "Le grand volume. Murs de béton brut, sol clair, trois portes qui s'ouvrent sur la cour. C'est ici que se tiennent les défilés, les lancements et les dîners.",
  },
  {
    slug: "appartement",
    nom: "L'Appartement",
    position: "Au premier étage",
    surface: "100 m²",
    capacite: "jusqu'à 50 personnes",
    prix: "1 000 à 2 000 €",
    photo: "/photos/appartement/appartement-01.jpg",
    texte:
      "Le confort. Parquet clair, mobilier chiné, lumière douce. Se loue seul, ou en coulisses de l'Atelier quand un événement a besoin d'un endroit où souffler.",
  },
] as const;

/** Ce qui est compris dans le prix, et que la plupart des lieux facturent en plus. */
export const INCLUS = [
  {
    titre: "Le ménage",
    texte: "Entrée et sortie. Compris dans le tarif, jamais en supplément.",
  },
  {
    titre: "Un régisseur sur place",
    texte:
      "Quelqu'un qui connaît le lieu est là pendant votre événement. Le plus souvent, c'est moi.",
  },
  {
    titre: "Vidéoprojection 4,63 m",
    texte:
      "Optoma 4K, 8 800 lumens, HDMI, AirPlay et Chromecast. Une image de quatre mètres soixante-trois de large.",
  },
  {
    titre: "Son Sonos et micros",
    texte:
      "Entrées XLR pour un DJ. Les micros baissent automatiquement la musique quand quelqu'un prend la parole.",
  },
  {
    titre: "Lumière pilotée",
    texte:
      "Éclairage DMX variable, du blanc chaud à la couleur. Cinq ambiances préréglées, ou la vôtre.",
  },
  {
    titre: "Fibre 1 Gb/s et RJ45",
    texte: "Wi-Fi invité avec un mot de passe simple, et des prises réseau partout.",
  },
  {
    titre: "Cuisine équipée",
    texte:
      "Réfrigérateur, machine à glaçons, lave-vaisselle, vaisselle et four à micro-ondes, pour votre traiteur.",
  },
  {
    titre: "Le droit de construire",
    texte:
      "On peut percer, fixer des écrans, poser des étagères, monter du mobilier sur mesure. Presque partout ailleurs, c'est interdit.",
  },
] as const;

/** Chiffres vérifiables — c'est ce qui nous distingue des adjectifs de la concurrence. */
export const SPECIFICATIONS = [
  { valeur: "800 kg", unite: "par m² au sol", detail: "Renforcé au double de la norme. Une voiture peut entrer et rester." },
  { valeur: "4,63 m", unite: "de projection", detail: "Sur le mur courbe, en une seule image." },
  { valeur: "36 kVA", unite: "en triphasé", detail: "De quoi alimenter une scénographie complète." },
  { valeur: "200 m²", unite: "de plain-pied", detail: "Accès véhicule direct depuis la rue, sans marche." },
] as const;

/**
 * Références. Les noms sont écrits en toutes lettres, volontairement : un logo
 * est une image, et un modèle de langage ne lit pas les pixels.
 */
export const REFERENCES = [
  {
    marque: "Servaire & Co",
    quoi: "Paris Design Week",
    quand: "Septembre 2026",
    texte:
      "Une semaine entière. Deux jours de montage, écrans fixés aux murs, étagères posées, mobilier construit sur mesure. Cent cinquante invités le mercredi soir, les trois portes ouvertes sur la cour, et la Boutique transformée en bar.",
    photos: [
      { src: "/photos/servaire/seuil-cour.jpg", alt: "L'entrée de l'Atelier vue depuis la cour pavée, pendant l'événement Servaire & Co" },
      { src: "/photos/servaire/table-rouge.jpg", alt: "Table de présentation rouge et vitrine dans l'Atelier, rideaux crème le long des murs" },
      { src: "/photos/servaire/invites-vitrine.jpg", alt: "Invités autour d'une vitrine, murs de béton brut et affiches encadrées" },
      { src: "/photos/servaire/projection-cyclo.jpg", alt: "Projection grand format sur le mur courbe pendant la Paris Design Week" },
    ],
  },
  {
    marque: "Porsche",
    quoi: "Lancement du Cayenne électrique",
    quand: "2026",
    texte:
      "La voiture est entrée dans l'Atelier. Le sol avait été renforcé à 800 kg/m² des années plus tôt, sans savoir encore pourquoi.",
    photos: [],
  },
  {
    marque: "Le Bon Coin",
    quoi: "Remise des prix immobilier, avec l'agence Zmirov",
    quand: "2026",
    texte:
      "Les annonces affichées dans tout le lieu, une prise de parole au micro, des journalistes. La musique baisse toute seule quand quelqu'un parle — personne n'a eu à s'en occuper.",
    photos: [],
  },
  {
    marque: "Oakley — Ray-Ban",
    quoi: "Showrooms de Fashion Week",
    quand: "2026",
    texte:
      "Oakley a construit son propre système d'accrochage dans l'Atelier. Ray-Ban s'est installé à l'étage, dans l'Appartement redécoré pour l'occasion.",
    photos: [],
  },
] as const;

/** Logos présents dans /public/images/clients — affichés ET nommés en texte. */
export const CLIENTS = [
  "porsche", "prada", "miu-miu", "levis", "oakley", "new-balance",
  "cnn", "publicis", "philip-morris", "schwarzkopf", "auditoire", "zmirov",
  "maison-123", "ghd", "roc", "litkovska", "backbone", "magnetism",
] as const;

export const CLIENTS_TEXTE =
  "Porsche, Prada, Miu Miu, Levi's, Oakley, Ray-Ban, New Balance, TikTok, Le Bon Coin, Mugler, CNN, Publicis, Zmirov, Servaire & Co et une centaine d'autres sont passés par le 39 rue des Bourdonnais.";

/** Règles du lieu — écrites d'avance, parce que les taire crée les malentendus. */
export const REGLES = [
  "Accès à partir de 7h",
  "Cour et cigarettes jusqu'à 22h",
  "Musique jusqu'à 23h",
  "Lieu vidé de ses invités à minuit",
] as const;
