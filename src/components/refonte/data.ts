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
 *
 * Une partie de ce contenu vient du **brief d'origine**, retrouvé le 20/09/2026
 * dans la page Notion « PRÉ-PROJET » : immeuble du 17e siècle, poutres
 * métalliques Eiffel, déchargement par l'impasse, liste d'équipements. Ces
 * éléments s'étaient perdus dans les réécritures successives du site.
 */

export const ADRESSE = "39 rue des Bourdonnais, Paris 1er";
export const TELEPHONE = "+33 7 61 47 10 73";

/**
 * Les trois lieux.
 *
 * ⚠️ Plus de champ `texte` : la tuile porte désormais une PHOTO du lieu, et une
 * photo dit « murs bruts, sol clair » mieux qu'une phrase. Étienne : « s'il y a
 * une photo au-dessus, il n'y a plus besoin d'avoir un descriptif ». La matière
 * sera décrite en toutes lettres sur la page du lieu.
 *
 * `equipements` liste ce qu'on demande le plus souvent au téléphone — court :
 * le détail vit sur la page du lieu et sur `/atelier/technique`.
 *
 * ⚠️ Corrections du 20/09/2026, dictées par Étienne :
 * - « murs de béton brut » → « murs bruts » : il ne dit pas béton ;
 * - « trois portes sur la cour » était FAUX. C'est **une seule porte à trois
 *   battants**. On n'en ouvre qu'un pour entrer ; ouvrir les trois élargit le
 *   passage. Trop détaillé pour cet encart — à écrire sur la page du lieu.
 *
 * `equipements` est volontairement vide pour LA BOUTIQUE et L'APPARTEMENT :
 * on ne connaît pas leur équipement avec certitude, et inventer ici se
 * retrouverait dans un devis.
 */
/**
 * Les trois lieux, tels qu'ils apparaissent en tuiles sur la page d'accueil.
 *
 * ⚠️ Chaque tuile porte TROIS photos qu'on fait défiler, et plus aucune phrase
 * descriptive ni liste d'équipements : une photo dit « murs bruts, sol clair »
 * mieux qu'un texte, et la liste rendait la tuile lourde. Étienne, deux fois :
 * « s'il y a une photo au-dessus, il n'y a plus besoin d'un descriptif », puis
 * « les descriptifs, on peut les enlever, ça réduit la taille ».
 *
 * `equipements` reste renseigné : il sert à la PAGE du lieu, pas à la tuile.
 * Il est vide pour L'APPARTEMENT — on ne connaît pas son équipement, et
 * inventer ici finirait dans un devis.
 */
export const ESPACES = [
  {
    slug: "atelier",
    nom: "L'Atelier",
    /** Ligne sous le nom. Courte : ce qui situe, rien d'autre. */
    meta: "200 m² · jusqu'à 200 personnes · dans la cour",
    prix: "1 000 à 4 000 €",
    /*
     * La première est le plan large au canapé rose et au coffre-fort du fond —
     * celle du lien Calendly, préférée d'Étienne. Les deux autres montrent les
     * rideaux et le sous-sol. La troisième est provisoire : Étienne cherche une
     * vue où les rideaux se lisent mieux.
     */
    photos: [
      "/photos/lieu/atelier-tuile.jpg",
      "/photos/lieu/atelier-tuile-2.jpg",
      "/photos/lieu/atelier-tuile-3.jpg",
    ],
    equipements: [
      "Rideaux",
      "Espace modulable",
      "Climatisation réversible",
      "Cuisine et bar équipés",
    ],
    page: "/atelier",
    pagePrete: false,
    tarifs: "/tarifs",
  },
  {
    slug: "boutique",
    nom: "La Boutique",
    meta: "45 m² · vitrine sur rue",
    prix: "1 000 €",
    /* Choix d'Étienne sur la planche contact : B06, puis B03, puis B01. */
    photos: [
      "/photos/boutique/tuile-1.jpg",
      "/photos/boutique/tuile-2.jpg",
      "/photos/boutique/tuile-3.jpg",
    ],
    /* Dicté par Étienne le 20/09/2026. Ne rien y ajouter sans le lui demander. */
    equipements: [
      "Climatisation réversible",
      "Wi-Fi haut débit",
      "Son Sonos",
      "Lumières Philips Hue commandables",
      "Frigo",
      "Bar / desk",
      "Toilettes et petite salle de bain",
      "Crochets au mur",
    ],
    page: "/boutique",
    pagePrete: false,
    tarifs: "/tarifs/boutique",
  },
  {
    slug: "appartement",
    nom: "L'Appartement",
    meta: "100 m² · au premier étage, au-dessus de L'Atelier",
    prix: "1 000 à 2 000 €",
    /* Choix d'Étienne : A04, A02, A10. ⚠️ Ces vues datent d'avant la pose des
       rideaux — à remplacer quand de nouvelles photos existeront. */
    photos: [
      "/photos/appartement/appartement-04.jpg",
      "/photos/appartement/appartement-02.jpg",
      "/photos/appartement/appartement-10.jpg",
    ],
    equipements: [],
    page: "/appartement",
    pagePrete: false,
    tarifs: "/tarifs/appartement",
  },
] as const;

/**
 * Les adresses du site. C'est le sommaire, et c'est tout le site.
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
  { href: "/histoire", titre: "L'histoire du lieu", detail: "Un garage de plombiers des années 1970 devenu lieu d'événements", pret: false },
] as const;

/**
 * Les faits. Vérifiables, chiffrés, et pour la plupart introuvables ailleurs.
 *
 * ⚠️ L'accès véhicule porte `fort: true` : il a sa propre section, illustrée
 * par une photo. Il ne doit PAS réapparaître dans la grille — et surtout pas en
 * gros titre (« UNE VOITURE PEUT ENTRER » : « c'est too much », Étienne).
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
  { valeur: "36 kVA", detail: "Triphasé, de quoi alimenter une scénographie complète — ou recharger un véhicule électrique.", fort: false },
  { valeur: "Déchargement par l'impasse", detail: "Une seconde porte sur l'impasse des Bourdonnais, pour le mobilier et la technique.", fort: false },
  { valeur: "200 m² + 100 m²", detail: "La surface d'événement, et le sous-sol qui va avec : stockage ou backstage.", fort: false },
  { valeur: "Ménage et régisseur", detail: "Compris dans le tarif, jamais en supplément.", fort: false },
  /*
   * ⚠️ À dire, justement parce que ça ne se devine pas. Étienne : « j'ai peur
   * que les gens se disent, est-ce qu'il y a un escalier entre les deux ? Il
   * faut dire qu'on est obligé de passer par la cour à chaque fois. »
   */
  { valeur: "On passe par la cour", detail: "Les trois espaces ne communiquent pas entre eux : on ressort et on traverse la cour pour aller de l'un à l'autre.", fort: false },
] as const;

/** Catégories de la photothèque. Pas de « tournages » : ce métier n'est pas recherché. */
export const CATEGORIES_PHOTOS = [
  { slug: "diners", nom: "Dîners privés", photo: "/photos/servaire/table-rouge.jpg" },
  { slug: "showrooms", nom: "Showrooms", photo: "/photos/servaire/invites-vitrine.jpg" },
  { slug: "defiles", nom: "Défilés", photo: "/photos/lieu/photo-01.jpg" },
  { slug: "lancements", nom: "Lancements", photo: "/photos/servaire/projection-cyclo.jpg" },
  { slug: "expositions", nom: "Expositions", photo: "/photos/servaire/cour-panneau.jpg" },
] as const;

/** Logos présents dans /public/images/clients — gardés pour un usage futur. */
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
