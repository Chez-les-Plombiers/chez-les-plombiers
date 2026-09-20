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
    /*
     * ⚠️ 150, et ne jamais écrire 199 : c'est un chiffre de dossier, pas un
     * chiffre commercial. Étienne : « au-delà de 150 c'est trop ».
     * Le reste du site dit encore 200 par endroits : à aligner à la bascule.
     */
    meta: "200 m² · 150 pax · dans la cour",
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
    pagePrete: true,
    tarifs: "/tarifs",
  },
  {
    slug: "boutique",
    nom: "La Boutique",
    meta: "45 m² · vitrine sur rue",
    prix: "1 000 €",
    /*
     * Choix d'Étienne sur la planche contact : B06, B03, B01 — puis, en les
     * voyant en place, permutation des deux premières. La vue d'intérieur ouvre
     * la tuile, la façade vient ensuite.
     */
    photos: [
      "/photos/boutique/tuile-2.jpg",
      "/photos/boutique/tuile-1.jpg",
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
    pagePrete: true,
    tarifs: "/tarifs/boutique",
  },
  {
    slug: "appartement",
    nom: "L'Appartement",
    /*
     * ⚠️ Ne PAS écrire « au-dessus de L'Atelier ». Essayé le 20/09/2026 et
     * retiré dans l'heure — Étienne : « j'ai peur que les gens croient qu'on
     * peut y monter par un escalier ». C'est vrai, mais ça se dit ailleurs, en
     * même temps que « on passe par la cour ».
     */
    meta: "100 m² · au premier étage",
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
    pagePrete: true,
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
    { href: "/atelier/technique", titre: "Fiche technique et plans", detail: "Puissances, connectique, emplacements, plans à télécharger", pret: true },
  { href: "/photos", titre: "Photos", detail: "Par type d'événement : dîners, showrooms, défilés, lancements, expositions", pret: false },
  { href: "/infos", titre: "Venir et livrer", detail: "Trouver l'entrée, décharger par l'impasse, les horaires, le quartier", pret: true },
  { href: "/visiter", titre: "Réserver une visite", detail: "Gratuite, une demi-heure, du lundi au samedi", pret: true },
  { href: "/conditions", titre: "Conditions de location", detail: "Ce qu'on vous demande, et pourquoi", pret: true },
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

/**
 * Les vues de la photo d'ouverture : deux par lieu, dans l'ordre.
 *
 * Demande d'Étienne, 20/09/2026 : « le même système de photos qui défilent sur
 * la photo principale en haut, qu'on voie deux photos de l'atelier, deux de la
 * boutique et deux de l'appartement ».
 *
 * ⚠️ La première reste le plan chaud au canapé courbe : c'est le visuel qu'il a
 * choisi entre plusieurs, et c'est la première chose que voit un arrivant.
 *
 * ⏳ Au clic, on ira un jour dans la section photos du lieu concerné. Pour
 * l'instant les six pointent vers `/photos`, qui reste à construire.
 */
export const OUVERTURE_PHOTOS = [
  "/photos/lieu/atelier-kv.jpg",
  "/photos/lieu/atelier-tuile-2.jpg",
  "/photos/boutique/tuile-2.jpg",
  "/photos/boutique/tuile-1.jpg",
  "/photos/appartement/appartement-04.jpg",
  "/photos/appartement/appartement-02.jpg",
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

/**
 * Le détail d'un lieu — ce que porte sa page.
 *
 * ⚠️ Une page de lieu ne redonne PAS la grille de prix : les prix vivent à un
 * seul endroit, `/tarifs`. Elle annonce la fourchette et renvoie au calendrier.
 * C'est la règle qu'Étienne a posée en sortant le pricing de son sous-domaine,
 * et la dupliquer ici garantit qu'un jour les deux divergeront.
 *
 * ⚠️ CHIFFRES EN CONFLIT, à trancher par Étienne. Le site actuel se contredit
 * d'une page à l'autre : capacité cocktail « 150 » ou « 200 », hauteur sous
 * plafond « 4,11 m » ou « 4,5 m ». On retient ici 200 et 4,11 m — le premier
 * parce que c'est ce que disent la home et le pricing, le second parce qu'il
 * vient de la base de connaissances opérationnelle du concierge, qui sert à
 * répondre aux clients sur place. À confirmer au mètre.
 */
/**
 * La fiche Google du lieu. Le même lien que la punaise du calendrier tarifaire :
 * avis, horaires, photos, itinéraire — tout ce qu'on n'a pas à refaire.
 */
export const FICHE_GOOGLE =
  "https://www.google.com/maps/place/Chez+Les+Plombiers/@48.8602622,2.3454547,17z/data=!4m8!3m7!1s0x47e66e1e25b0e72f:0xb0e740c06d8e3c89!8m2!3d48.8602622!4d2.3480296!9m1!1b1!16s%2Fg%2F11y3glbp14";

/**
 * Le détail d'un lieu. Une entrée par lieu, une seule page pour les rendre.
 *
 * ⚠️ `equipement` et `enBref` sont VIDES pour LA BOUTIQUE et L'APPARTEMENT là
 * où on ne sait pas. La page s'adapte : une section sans données ne s'affiche
 * pas. Ne pas remplir « pour faire pareil » — un chiffre inventé ici finit
 * dans un devis. Il manque, au 20/09/2026 : la hauteur sous plafond et la
 * capacité des deux lieux, et tout l'équipement de L'APPARTEMENT.
 */
export const ATELIER = {
  slug: "atelier",
  nom: "L'Atelier",

  /*
   * Le premier paragraphe décrit ce qu'on voit ; le second situe. Les deux
   * reprennent le brief d'origine (page Notion « PRÉ-PROJET »), qui disait ces
   * choses mieux que les réécritures successives du site.
   *
   * ⚠️ Pas de « tournages » : Étienne ne veut pas de ce métier, alors que le
   * texte d'origine le citait. Ne pas le réintroduire en recopiant le Notion.
   */
  intro: [
    /*
     * ⚠️ NE PAS ÉCRIRE « ERP » NI « LIEU RECEVANT DU PUBLIC ». Le classement
     * n'est pas obtenu au 20/09/2026 — Étienne : « je ne suis pas encore ERP,
     * il ne faut pas en parler ». L'accessibilité PMR et les WC PMR, eux, sont
     * réels et peuvent être annoncés.
     *
     * ⚠️ L'espace insécable avant les deux-points n'est pas une coquetterie :
     * c'est la règle typographique française, et il empêche le « : » de tomber
     * seul en début de ligne, ce qui arrivait sur téléphone.
     */
    "Un garage de plombiers des années 1970, dans un immeuble du 17e siècle, entièrement reconverti. 200 m² au fond d'une cour\u00A0: murs bruts, poutres Eiffel, sol blanc en résine époxy.",
    "En plein cœur de Paris, à 100 m de la Samaritaine et à deux minutes à pied de Châtelet-Les Halles — RER A, B, D et métros 1, 4, 7, 11, 14.",
  ] as const,

  /** Les quatre nombres qu'on cherche en premier. Une bande, pas une grille. */
  enBref: [
    ["Surface", "200 m²"],
    ["Hauteur sous plafond", "4,50 m"],
    ["Capacité", "150 pax"],
    ["Sous-sol", "100 m²"],
  ] as const,

  /**
   * La fiche du lieu — ce qui DÉCIDE.
   *
   * ── LA LIGNE DE PARTAGE AVEC `/atelier/technique` ────────────────────────
   *
   * Étienne, le 20/09/2026 : « je me demande si tout ça, ça peut pas aller
   * dans la fiche technique… on peut dire qu'il y a du son, il y a de l'image,
   * mais tout ça il faut peut-être le mettre dans un truc technique ».
   *
   * Il a raison, et voici le test qui tranche chaque ligne :
   *
   *   Est-ce que ça change ma DÉCISION de louer  → ici.
   *   Est-ce que ça change mon PLAN d'installation → `/atelier/technique`.
   *
   * « On peut projeter 4,63 m de large » décide. « Optoma ZU820T, HDMI, RS232,
   * trigger 12 V » exécute. Les deux sont vrais, les deux sont utiles, mais
   * pas à la même personne ni au même moment : un client qui compare trois
   * lieux, contre un régisseur qui prépare son camion.
   *
   * ⚠️ Ne pas rapatrier les modèles ici « pour faire complet ». C'est ce qui
   * avait fait de cette page un mur, et c'est ce qui rend la fiche technique
   * inutile.
   */
  equipement: [
    {
      titre: "L'espace",
      lignes: [
        ["Volume", "200 m² de plain-pied, 4,50 m sous plafond"],
        ["Capacité", "150 pax debout · 80 assis · 60 à table"],
        ["Rideaux", "Ils segmentent l'espace : l'ouvrir en grand, le délimiter, le rendre plus intime"],
        ["Sous-sol", "100 m² de stockage, ou de backstage"],
      ],
    },
    {
      titre: "L'image",
      lignes: [
        ["Projection", "4,63 m de large en une seule image, sur le mur cyclo"],
        ["Sources", "Apple TV intégrée, ou une prise HDMI murale depuis le coin régie"],
      ],
    },
    {
      titre: "Le son",
      lignes: [
        ["Diffusion", "Douze enceintes réparties dans le lieu, calibrées pour lui"],
        ["Votre régie", "Une entrée XLR murale, pour brancher une platine"],
      ],
    },
    {
      titre: "La lumière",
      lignes: [
        ["Ambiances", "Plusieurs scénarios enregistrés, tout est variable en intensité"],
        ["Scénographie", "Un grill au plafond, pour accrocher vos propres projecteurs"],
      ],
    },
    {
      titre: "Les cuisines",
      lignes: [
        ["La grande", "En U : frigo-congélateur, machine à glaçons, four, lave-verres professionnel"],
        ["La petite", "En face, tout en longueur : micro-ondes et machine à café Jura à grains"],
      ],
    },
    {
      titre: "Le sol",
      lignes: [
        ["Charge", "800 kg/m² — une voiture peut rester"],
        ["Revêtement", "Résine époxy blanche"],
      ],
    },
    {
      titre: "Le confort",
      lignes: [
        ["Climatisation", "Réversible, sur toute la surface"],
        ["Accessibilité", "De plain-pied, accessible PMR, WC PMR"],
      ],
    },
  ] as const,

  /**
   * ⏳ Ces quatre blocs quittent la page de L'ATELIER dès que `/infos` sera
   * refaite : ce sont des questions d'exploitation, qui se posent APRÈS la
   * décision de louer. Ils restent ici en attendant pour ne rien perdre.
   */
  acces: [
    [
      "Une voiture peut entrer",
      "Accès direct depuis la rue, de plain-pied, sans marche ni seuil. Le Porsche Cayenne électrique a été présenté à l'intérieur, et le sol tient 800 kg/m² : elle peut rester.",
    ],
    [
      "Une porte, trois battants",
      "L'entrée se fait par un seul battant. Ouvrir les trois élargit le passage — pour un décor, une scénographie, un véhicule.",
    ],
    [
      "Déchargement par l'impasse",
      "Une seconde porte donne sur l'impasse des Bourdonnais : le mobilier et la technique n'ont pas à traverser la cour.",
    ],
    [
      "On passe par la cour",
      "L'Atelier, La Boutique et L'Appartement ne communiquent pas entre eux : il n'y a pas d'escalier intérieur. Pour aller de l'un à l'autre, on ressort et on traverse la cour.",
    ],
  ] as const,

  suite: [
    { href: "/infos", titre: "Venir et livrer", detail: "Trouver l'entrée, décharger par l'impasse, les horaires", pret: true },
        { href: "/atelier/technique", titre: "Fiche technique", detail: "Le détail : modèles, connectique, puissances", pret: false },
    { href: "/tarifs", titre: "Calendrier tarifaire", detail: "Les jours libres et le prix de chaque date", pret: true },
  ] as const,
} as const;

/**
 * LA BOUTIQUE.
 *
 * ⚠️ On ne connaît ni sa hauteur sous plafond ni sa capacité. `enBref` ne
 * porte donc que ce qui est sûr. L'équipement, lui, a été dicté par Étienne le
 * 20/09/2026 — ne rien y ajouter sans le lui demander.
 */
export const BOUTIQUE = {
  slug: "boutique",
  nom: "La Boutique",
  intro: [
    "Quarante-cinq mètres carrés sur la rue, sous l'enseigne « Couverture Plomberie » d'origine — celle qui a donné son nom au lieu. On y entre directement depuis le trottoir, sans passer par la cour.",
    "C'est le format d'un pop-up, d'un showroom de presse ou d'une vitrine de lancement : petit, visible de la rue, et au même endroit que les deux autres espaces.",
  ] as const,
  enBref: [
    ["Surface", "45 m²"],
    ["Position", "Sur la rue"],
    ["Location", "À la journée"],
  ] as const,
  equipement: [
    {
      titre: "L'espace",
      lignes: [
        ["Surface", "45 m² en vitrine sur la rue des Bourdonnais"],
        ["Bar", "Un comptoir qui fait bar ou desk d'accueil"],
        ["Accrochage", "Des crochets répartis sur tous les murs"],
      ],
    },
    {
      titre: "Le confort",
      lignes: [
        ["Climatisation", "Réversible"],
        ["Sanitaires", "Toilettes et une petite salle de bain"],
        ["Cuisine", "Un réfrigérateur"],
      ],
    },
    {
      titre: "Le réseau et l'ambiance",
      lignes: [
        ["Wi-Fi", "Haut débit"],
        ["Son", "Sonos"],
        ["Lumière", "Philips Hue, couleurs et intensité commandables"],
      ],
    },
  ] as const,
  suite: [
    { href: "/infos", titre: "Venir et livrer", detail: "Trouver l'entrée, les horaires, le quartier", pret: true },
    { href: "/photos", titre: "Photos", detail: "Par type d'événement", pret: false },
    { href: "/tarifs/boutique", titre: "Calendrier tarifaire", detail: "Les jours libres et le prix de chaque date", pret: true },
  ] as const,
} as const;

/**
 * L'APPARTEMENT.
 *
 * ⚠️ Son équipement est INCONNU au 20/09/2026, et la page l'assume : la
 * section n'apparaît pas plutôt que d'afficher des généralités. À demander à
 * Étienne. Les photos en ligne datent aussi d'avant la pose des rideaux.
 */
export const APPARTEMENT = {
  slug: "appartement",
  nom: "L'Appartement",
  intro: [
    "Cent mètres carrés au premier étage, d'anciens bureaux devenus un appartement : parquet clair, mobilier chiné, plusieurs pièces dont une entièrement rose.",
    "Il se loue seul — pour un dîner, une réunion, une prise de vue — ou en coulisses d'un événement qui se tient à L'Atelier. Attention : on y monte par l'escalier de l'immeuble, depuis la cour. Il n'y a pas de passage intérieur entre les deux.",
  ] as const,
  enBref: [
    ["Surface", "100 m²"],
    ["Étage", "Premier"],
    ["Accès", "Par la cour"],
  ] as const,
  equipement: [] as const,
  suite: [
    { href: "/infos", titre: "Venir et livrer", detail: "Trouver l'entrée, circuler entre les lieux", pret: true },
    { href: "/photos", titre: "Photos", detail: "Par type d'événement", pret: false },
    { href: "/tarifs/appartement", titre: "Calendrier tarifaire", detail: "Les jours libres et le prix de chaque date", pret: true },
  ] as const,
} as const;

/** Les teintes de fond par lieu, reprises du calendrier tarifaire. */
export const FONDS = {
  atelier: "#1C1A17",
  boutique: "#0F1720",
  appartement: "#1F1216",
} as const;
