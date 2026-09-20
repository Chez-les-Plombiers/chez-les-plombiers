/**
 * Contenu de la maquette de refonte.
 *
 * ⚠️ Le site change de nature (décision Étienne, 20/09/2026) : ce n'est plus
 * une vitrine, c'est un **jeu d'adresses qu'on envoie**. Un client demande les
 * plans, on envoie un lien ; les dimensions, un lien ; des photos de dîners, un
 * lien. Chaque page répond à UNE question, complètement.
 *
 * Deux faits mesurés soutiennent ce choix : 96,6 % des clics Google viennent de
 * gens qui tapent déjà le nom ou l'adresse — ils viennent vérifier, pas se
 * faire séduire ; et ce sont les données chiffrées, pas les adjectifs, que les
 * modèles de langage reprennent.
 *
 * ⚠️ Ne pas arrondir les chiffres « pour faire joli ». C'est leur précision qui
 * les rend crédibles et citables.
 */

export const ADRESSE = "39 rue des Bourdonnais, Paris 1er";
export const TELEPHONE = "+33 7 61 47 10 73";

export const ESPACES = [
  {
    slug: "atelier",
    nom: "L'Atelier",
    position: "Dans la cour",
    surface: "200 m²",
    capacite: "jusqu'à 200 personnes",
    prix: "1 000 à 4 000 €",
    texte: "Murs de béton brut, sol clair, trois portes sur la cour.",
    href: "/tarifs",
  },
  {
    slug: "boutique",
    nom: "La Boutique",
    position: "Sur la rue",
    surface: "45 m²",
    capacite: "journée entière",
    prix: "1 000 €",
    texte: "La vitrine, sous l'enseigne « Couverture Plomberie » d'origine.",
    href: "/tarifs/boutique",
  },
  {
    slug: "appartement",
    nom: "L'Appartement",
    position: "Au premier étage",
    surface: "100 m²",
    capacite: "jusqu'à 50 personnes",
    prix: "1 000 à 2 000 €",
    texte: "Parquet clair, mobilier chiné. Se loue seul ou en coulisses.",
    href: "/tarifs/appartement",
  },
] as const;

/**
 * Les six adresses du site. C'est le sommaire, et c'est tout le site.
 *
 * `/tarifs` et `/infos` existent. Les autres sont à construire — elles sont
 * listées ici pour que la structure soit visible et discutable avant d'être
 * écrite, et marquées `pret: false` en attendant.
 */
export const PAGES = [
  { href: "/tarifs", titre: "Tarifs et disponibilités", detail: "Les prix jour par jour et le calendrier des trois lieux", pret: true },
  { href: "/atelier/plans", titre: "Plans et dimensions", detail: "Plans cotés, à télécharger", pret: false },
  { href: "/atelier/technique", titre: "Fiche technique", detail: "Électricité, son, lumière, réseau, projection", pret: false },
  { href: "/photos", titre: "Photos", detail: "Par type d'événement : dîners, showrooms, défilés, lancements, expositions", pret: false },
  { href: "/infos", titre: "Venir et livrer", detail: "Accès, stationnement, déchargement, le quartier", pret: true },
  { href: "/visiter", titre: "Réserver une visite", detail: "Gratuite, une demi-heure, sur rendez-vous", pret: false },
] as const;

/**
 * Les faits. Vérifiables, chiffrés, et pour la plupart introuvables ailleurs.
 *
 * L'accès véhicule ouvre la liste à la demande d'Étienne : c'est son argument
 * le plus rare, et le seul terrain non-marque où le site produit des contacts.
 */
export const FAITS = [
  {
    valeur: "Une voiture peut entrer",
    detail:
      "Accès direct depuis la rue, de plain-pied, sans marche ni seuil. Le Porsche Cayenne électrique a été présenté à l'intérieur.",
    fort: true,
  },
  { valeur: "800 kg/m²", detail: "Sol renforcé au double de la norme, pour que la voiture puisse rester.", fort: false },
  { valeur: "4,63 m", detail: "Largeur de projection en une seule image, sur le mur courbe.", fort: false },
  { valeur: "36 kVA", detail: "Triphasé, de quoi alimenter une scénographie complète.", fort: false },
  { valeur: "200 m² + 100 m²", detail: "La surface d'événement, et le stockage en sous-sol qui va avec.", fort: false },
  { valeur: "Ménage et régisseur", detail: "Compris dans le tarif, jamais en supplément.", fort: false },
] as const;

/** Catégories de la photothèque. Pas de « tournages » : ce métier n'est pas recherché. */
export const CATEGORIES_PHOTOS = [
  { slug: "diners", nom: "Dîners privés", photo: "/photos/servaire/table-rouge.jpg" },
  { slug: "showrooms", nom: "Showrooms", photo: "/photos/servaire/invites-vitrine.jpg" },
  { slug: "defiles", nom: "Défilés", photo: "/photos/lieu/photo-01.jpg" },
  { slug: "lancements", nom: "Lancements", photo: "/photos/servaire/projection-cyclo.jpg" },
  { slug: "expositions", nom: "Expositions", photo: "/photos/servaire/cour-panneau.jpg" },
] as const;

/** Logos présents dans /public/images/clients — affichés ET nommés en texte. */
export const CLIENTS = [
  "porsche", "prada", "miu-miu", "levis", "oakley", "new-balance",
  "cnn", "publicis", "philip-morris", "schwarzkopf", "auditoire", "zmirov",
  "maison-123", "ghd", "roc", "litkovska", "backbone", "magnetism",
] as const;

export const CLIENTS_TEXTE =
  "Porsche, Prada, Miu Miu, Levi's, Oakley, Ray-Ban, New Balance, TikTok, Le Bon Coin, Mugler, CNN, Publicis, Zmirov et Servaire & Co sont passés par le 39 rue des Bourdonnais.";

/** Règles du lieu — écrites d'avance, parce que les taire crée les malentendus. */
export const REGLES = [
  ["Accès", "à partir de 7h"],
  ["Cour et cigarettes", "jusqu'à 22h"],
  ["Musique", "jusqu'à 23h"],
  ["Invités", "le lieu est vidé à minuit"],
] as const;
