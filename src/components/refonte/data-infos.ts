/**
 * Le contenu de `/infos` — la page d'exploitation.
 *
 * ── POURQUOI CETTE PAGE EXISTE ────────────────────────────────────────────
 *
 * Elle répond aux questions qui viennent APRÈS la décision de louer : où est
 * l'entrée, par où on décharge, jusqu'à quelle heure. Ces réponses vivaient sur
 * la page de L'ATELIER et l'avaient transformée en mur — Étienne : « trop de
 * tuiles ». Elles sont ici, et la page de lieu redevient une fiche.
 *
 * ── POURQUOI ELLE NE RESSEMBLE PAS AU RESTE ───────────────────────────────
 *
 * Le site a deux langages, et c'est voulu :
 *
 *   FICHE (tuiles)      accueil, pages de lieu   →  on compare, on scanne
 *   DOCUMENT (texte)    infos, histoire, technique →  on lit, on exécute
 *
 * Une tuile sert à comparer trois choses d'un coup d'œil. Un texte sert à
 * expliquer une chose en entier. Mettre « on passe par la cour » dans une tuile
 * était une erreur : c'est une explication, pas une donnée.
 *
 * ⚠️ Pas d'accordéons, malgré la tentation « façon Notion ». Sur une page
 * d'exploitation, le lecteur cherche UNE réponse parmi vingt : un sommaire qui
 * saute la lui donne aussi vite, sans rien casser. Un accordéon, lui, casse la
 * recherche du navigateur (⌘F ne trouve pas ce qui est replié) et casse
 * l'impression. Or c'est précisément cette page qu'une agence imprimera.
 *
 * ⚠️ Pas d'emojis ni de pictogrammes. Ils n'ajoutent aucune information, ils
 * datent, et ils jurent avec l'Eurostile et la machine à écrire. Une photo qui
 * montre la porte à trouver vaut trois paragraphes ; un pictogramme de porte ne
 * vaut rien.
 */

export interface Section {
  id: string;
  titre: string;
  /** Paragraphes. Le premier sert de résumé : le garder court. */
  texte: readonly string[];
  /** Faits détachés du texte, quand ils se consultent plus qu'ils ne se lisent. */
  faits?: readonly (readonly [string, string])[];
  /** Comme `faits`, mais chaque ligne est un lien. Réservé à « Nous joindre ». */
  contacts?: readonly {
    quoi: string;
    valeur: string;
    detail: string;
    href: string;
    externe?: boolean;
    /** Page du site : le préfixe de maquette lui est appliqué au rendu. */
    interne?: boolean;
  }[];
  /**
   * Liens sortants, GROUPÉS. Une liste à plat de douze noms ne se lit pas : on
   * ne sait pas si « Thérèse » est un restaurant ou un hôtel.
   */
  groupes?: readonly {
    titre: string;
    liens: readonly { nom: string; url: string }[];
  }[];
  /** Carte intégrée, quand la position vaut mieux qu'une description. */
  carte?: string;
  /**
   * Des photos, seulement si elles RÉPONDENT à la question de la section.
   *
   * ⚠️ C'est la règle de cette page : pas d'image d'ambiance. Un traiteur à 7h
   * du matin cherche une porte, pas une atmosphère. Une photo de repérage fait
   * mieux le travail qu'une photo d'agence ici — c'est le seul endroit du site
   * où c'est vrai.
   *
   * ⚠️ Photos d'Étienne, prises au téléphone le 20/09/2026, et archivées dans
   * `Dropbox/CHEZ LES PLOMBIERS/PHOTOS/PHOTOS PRATIQUES/`. Ne pas les
   * remplacer par des photos de communication : elles seraient plus belles et
   * moins utiles.
   */
  photos?: readonly { src: string; alt: string; legende: string }[];
}

export const INFOS_INTRO =
  "Tout ce qu'il faut savoir avant de venir, de livrer et de repartir. Cette page est faite pour être envoyée telle quelle à un prestataire, un traiteur ou un transporteur.";

export const SECTIONS: readonly Section[] = [
  {
    id: "entree",
    titre: "Trouver l'entrée",
    texte: [
      "L'adresse est le 39 rue des Bourdonnais, dans le 1er arrondissement, à trois minutes du Pont Neuf et à cent mètres de la Samaritaine.",
      "La rue donne sur une porte cochère. On la franchit, on traverse la cour, et L'Atelier est au fond, sur la droite. La Boutique, elle, est directement sur la rue, sous l'enseigne « Couverture Plomberie » d'origine — on ne passe pas par la cour pour y entrer.",
      "Les codes d'accès — la grille, la boîte à clés, le sous-sol — changent chaque semaine. Ils vous sont envoyés par WhatsApp avant votre date, et ne sont jamais publiés ici.",
    ],
    photos: [
      {
        src: "/photos/acces/rue.jpg",
        alt: "Le 39 rue des Bourdonnais : la grille ouverte sur la cour, et la vitrine de La Boutique",
        legende:
          "Depuis la rue. La grille du 39 est ouverte : on voit le passage, la cour, et tout au fond l'entrée de L'Atelier. À droite, la vitrine de La Boutique.",
      },
      {
        src: "/photos/acces/cour.jpg",
        alt: "La cour pavée, avec l'entrée de L'Atelier ouverte au fond",
        legende: "La cour, une fois la grille franchie. L'Atelier est droit devant.",
      },
    ],
  },
  {
    id: "venir",
    titre: "Venir",
    texte: [
      "C'est l'un des points les mieux desservis de Paris : cinq lignes de métro et trois RER à moins de cinq minutes à pied.",
    ],
    faits: [
      ["Métro Châtelet — 3 min", "Lignes 1, 4, 7, 11 et 14. Sortie Rivoli ou Sainte-Opportune."],
      ["RER Châtelet-Les Halles — 5 min", "RER A, B et D, depuis Roissy, Orly, La Défense et toutes les gares parisiennes."],
      ["Depuis les aéroports", "Roissy CDG : 35 min en RER B direct. Orly : 30 min via Orlyval puis RER B. Le Bourget : 40 min."],
      ["En voiture", "Parking public Indigo Saint-Eustache, à 4 min à pied."],
      ["Accessibilité", "L'entrée de L'Atelier est de plain-pied depuis la rue, et l'espace est entièrement accessible. WC PMR."],
      ["Stationnement de surface", "Payant du lundi au samedi, de 9h à 20h."],
    ],
    carte: "https://www.google.com/maps?q=39+rue+des+Bourdonnais+75001+Paris&output=embed",
  },
  {
    id: "livrer",
    titre: "Livrer et décharger",
    texte: [
      "L'Atelier a deux portes, et c'est ce qui rend les installations simples.",
      "La première donne sur la cour : c'est l'entrée. Elle compte trois battants — on n'en ouvre qu'un pour entrer, mais ouvrir les trois élargit le passage pour un décor, une scénographie ou un véhicule.",
      "La seconde donne sur l'impasse des Bourdonnais. C'est par là que passent le mobilier et la technique : ils n'ont pas à traverser la cour.",
    ],
    /*
     * ⚠️ Cotes relevées dans la page Notion « FR — INFOS GÉNÉRALES », qui est
     * le document opérationnel envoyé aux clients. Ne pas les arrondir : une
     * scénographie se dessine dessus.
     */
    faits: [
      ["Porte principale", "2,19 m de large × 3,66 m de haut, sur la cour."],
      ["Porte de l'impasse", "1,60 m × 2,39 m, deux vantaux de 0,80 m."],
      [
        "Reculer dans la cour",
        "Possible, pour un déchargement rapide — mais pas de stationnement, pas de montage ni de démontage. La cour dessert deux entrées d'immeuble au fond, à droite et à gauche : le passage des habitants doit rester libre en permanence.",
      ],
      [
        "Reculer dans l'impasse",
        "Possible, et c'est là que se font le montage et le démontage. ⚠️ Au-delà de 20 m³, un camion ne passe pas : prévoir plus petit, ou un transfert.",
      ],
      [
        "Une voiture peut entrer",
        "Accès direct depuis la rue, de plain-pied, sans marche ni seuil.",
      ],
      [
        "Elle peut rester",
        "Le sol tient 800 kg/m², et le triphasé 36 kVA permet de la recharger sur place.",
      ],
      ["Stockage", "100 m² en sous-sol, pour le stockage et les backstages."],
    ],
    photos: [
      {
        src: "/photos/acces/porte-trois-battants.jpg",
        alt: "La porte de L'Atelier, ses trois battants grands ouverts sur la cour",
        legende:
          "Les trois battants ouverts : 2,19 m de large, 3,66 m de haut.",
      },
      {
        src: "/photos/acces/impasse.jpg",
        alt: "L'impasse des Bourdonnais et la porte de service de L'Atelier",
        legende: "L'impasse des Bourdonnais. La porte de déchargement est celle du milieu.",
      },
    ],
  },
  {
    id: "circuler",
    titre: "Circuler entre les trois lieux",
    texte: [
      "L'Atelier, La Boutique et L'Appartement sont à la même adresse, mais ils ne communiquent pas entre eux : il n'y a pas d'escalier intérieur, pas de porte de liaison.",
      "L'Appartement est au premier étage, mais on y accède par son propre escalier, depuis la cour. Pour aller d'un lieu à l'autre, on ressort et on traverse la cour. C'est à prévoir si vous louez deux espaces le même jour : le service, les invités et la technique font le trajet dehors.",
      "Et c'est une obligation, pas une recommandation : dès que deux espaces sont loués ensemble, un agent est requis dans la cour. Il veille à ce que les portes restent fermées et à ce que personne n'entre dans l'immeuble.",
    ],
    photos: [
      {
        src: "/photos/acces/porte-appartement.jpg",
        alt: "La porte de l'immeuble dans la cour, avec son digicode, qui mène à L'Appartement",
        legende:
          "Dans la cour, la porte de l'immeuble et son digicode : c'est l'escalier de L'Appartement, et il ne mène pas à L'Atelier.",
      },
    ],
  },
  {
    id: "horaires",
    titre: "Les horaires",
    texte: [
      "Ces horaires ne se négocient pas : ils viennent de la copropriété et du voisinage, et c'est ce qui permet au lieu d'exister dans un immeuble d'habitation.",
    ],
    faits: [
      ["Accès", "À partir de 7h, pour le montage comme pour les livraisons."],
      /*
       * ⚠️ « Cour et cigarettes » était illisible (Étienne) : on croyait que la
       * cour fermait. C'est l'espace fumeurs qui ferme.
       */
      [
        "Fumeurs dans la cour",
        "Jusqu'à 22h ; après, sur la voie publique. Et la cour dessert deux entrées d'immeuble : dès qu'elle sert de coin fumeurs, la moitié doit rester dégagée pour le passage des habitants.",
      ],
      ["Musique", "Jusqu'à 23h, sans exception."],
      ["Fin d'événement", "Le lieu doit être entièrement vidé de ses invités à minuit."],
      ["Visites du lieu", "Du lundi au samedi, de 10h à 18h, sur rendez-vous. Gratuites, une demi-heure."],
    ],
  },
  {
    /*
     * ⚠️ SECTION AJOUTÉE LE 21/09/2026, et elle est commerciale avant d'être
     * informative. Étienne : « on n'accepte pas les particuliers, et très
     * souvent on a des visites de particuliers ». Chaque visite d'anniversaire
     * est une demi-heure perdue pour lui, et une déception pour la personne.
     *
     * Le dire tôt et clairement coûte quelques refus qu'on n'aurait pas eus,
     * et fait gagner tout le reste. Le ton reste net sans être sec : on
     * n'humilie pas quelqu'un qui cherchait une salle pour ses cinquante ans.
     */
    id: "qui",
    titre: "Pour qui",
    /*
     * ⚠️ DEUX PHRASES, ET ON S'ARRÊTE. Une première version expliquait le
     * pourquoi (l'immeuble d'habitation) et ajoutait « autant le savoir
     * maintenant plutôt qu'après une visite ». Étienne a coupé les deux :
     * « c'est tout, je peux pas dire plus ».
     *
     * Il a raison. Un refus qui se justifie invite à négocier le motif. Un
     * refus qui s'énonce ne s'argumente pas.
     */
    texte: [
      "Chez les Plombiers est un lieu réservé aux professionnels. Nous accueillons les marques, les agences et les entreprises : showrooms, lancements presse, dîners de marque, défilés, expositions, séminaires.",
      "Nous n'acceptons pas d'événements pour des particuliers : ni anniversaires, ni mariages, ni fêtes familiales.",
    ],
  },
  {
    id: "quartier",
    titre: "Le quartier",
    texte: [
      "Vos invités ont tout sur place : de quoi dîner avant ou après, de quoi dormir, et le Paris historique à pied.",
    ],
    /*
     * ⚠️ Liens vérifiés en avril 2026. Le Centre Pompidou a été retiré (fermé
     * pour rénovation jusqu'en 2030), ainsi que Pirouette, Champeaux et
     * l'Hôtel des Métiers — fermés ou inexistants. Revérifier avant la bascule.
     */
    groupes: [
      {
        titre: "Dîner",
        liens: [
          { nom: "Frenchie", url: "https://www.frenchie-restaurant.com" },
          { nom: "Verjus", url: "https://www.verjusparis.com" },
          { nom: "Le Soufflé", url: "https://www.lesouffle.fr" },
          { nom: "Loulou, aux Tuileries", url: "https://www.loulou-paris.com" },
        ],
      },
      {
        titre: "Dormir",
        liens: [
          { nom: "Hôtel du Louvre (Hyatt)", url: "https://www.hyatt.com/unbound-collection/en-US/paraz-hotel-du-louvre" },
          { nom: "Hôtel Le Pradey", url: "https://www.lepradey.com" },
          { nom: "Hôtel Thérèse", url: "https://www.hoteltherese.com" },
          { nom: "Citadines Les Halles", url: "https://www.discoverasr.com/fr/citadines/france/citadines-les-halles-paris" },
        ],
      },
      {
        titre: "À pied",
        liens: [
          { nom: "Pont Neuf — 3 min", url: "https://www.parisinfo.com/musee-monument-paris/71449/Pont-Neuf" },
          { nom: "Forum des Halles — 3 min", url: "https://www.westfield.com/fr/france/forumdeshalles" },
          { nom: "Musée du Louvre — 8 min", url: "https://www.louvre.fr" },
          { nom: "Notre-Dame — 12 min", url: "https://www.notredamedeparis.fr" },
        ],
      },
    ],
  },
  {
    /*
     * La dernière section, et la seule qui appelle une action. Pas de FAQ à la
     * suite : elle répéterait mot pour mot ce que la page vient de dire. Une
     * question fréquente qui a déjà sa section n'est pas une question fréquente,
     * c'est un doublon.
     */
    id: "joindre",
    titre: "Nous joindre",
    texte: [
      "Le plus rapide est WhatsApp : la réponse arrive en quelques minutes pendant les heures d'ouverture. Le même numéro fonctionne en appel, et l'adresse mail va au même endroit.",
    ],
    /*
     * ⚠️ Chaque ligne est cliquable, et pas de la même façon : WhatsApp ouvre
     * la conversation, le numéro compose, les adresses ouvrent un courriel, la
     * visite ouvre Calendly. Une page de contact dont il faut recopier le
     * numéro à la main n'est pas une page de contact.
     */
    contacts: [
      {
        quoi: "WhatsApp",
        valeur: "+33 7 61 47 10 73",
        detail: "Le canal le plus rapide : réponse en quelques minutes.",
        href: "https://wa.me/33761471073",
        externe: true,
      },
      {
        quoi: "Téléphone",
        valeur: "+33 7 61 47 10 73",
        detail: "Le même numéro, en appel.",
        href: "tel:+33761471073",
      },
      {
        quoi: "Courriel",
        valeur: "contact@chezlesplombiers.fr",
        /*
         * ⚠️ UNE SEULE ADRESSE PUBLIQUE, et ne pas en rajouter. Remarque de
         * Céline, relayée le 21/09/2026 : publier les adresses nominatives,
         * c'est se faire arroser par tout le monde. `contact@` est un groupe :
         * le message arrive quand même aux bonnes personnes.
         */
        detail: "Le message arrive à toute l'équipe.",
        href: "mailto:contact@chezlesplombiers.fr",
      },
      {
        quoi: "Visiter le lieu",
        valeur: "Réserver un créneau",
        detail: "Gratuit, une demi-heure, du lundi au samedi de 10h à 18h.",
        /* ⚠️ Vers NOTRE page, pas vers Calendly en direct : elle porte les
           repères et la mention « réservé aux professionnels ». Le préfixe de
           maquette est ajouté au rendu, par `lien()`. */
        href: "/visiter",
        interne: true,
      },
    ],
  },
] as const;
