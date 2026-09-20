/**
 * La fiche technique de L'ATELIER, et les plans.
 *
 * ⚠️ Deux pages, un seul fichier : `/atelier/technique` et `/atelier/plans`
 * répondent à la même personne — le régisseur ou le scénographe qui prépare.
 * Les séparer dans le code inviterait à la divergence.
 *
 * ⚠️ RAPPORT À LA PAGE DU LIEU. `/atelier` donne l'équipement en une ligne par
 * thème : « Optoma ZU820T, 8 800 lumens ». Ici on donne la connectique, les
 * puissances, les emplacements. Même sujet, deux profondeurs — ce n'est pas un
 * doublon, c'est le pas suivant. Si une valeur change, elle change AUX DEUX
 * endroits : la ligne courte vit dans `data.ts`, le détail ici.
 *
 * ⚠️ CE QUI N'EST PAS SOURCÉ EST MARQUÉ. Plusieurs valeurs viennent de la base
 * du concierge (`guide-knowledge.ts`), qui sert à répondre sur place et n'a
 * jamais été relue comme un document contractuel. Un régisseur qui dimensionne
 * une installation d'après cette page doit pouvoir savoir ce qui est vérifié.
 */

export interface Poste {
  titre: string;
  lignes: readonly (readonly [string, string])[];
  /** Ce qu'on ne sait pas encore, dit franchement. */
  reserve?: string;
}

export const TECHNIQUE: readonly Poste[] = [
  {
    titre: "Électricité",
    lignes: [
      ["Puissance", "36 kVA en triphasé"],
      ["Prises triphasées", "Trois, réparties dans la salle"],
      ["Prises de courant", "En périphérie et sur les poteaux, dont des prises en hauteur"],
      ["Tableau", "Dans le local technique, au fond de la salle à gauche, derrière une porte à code"],
      ["Véhicules", "Le triphasé permet de recharger un véhicule électrique à l'intérieur"],
    ],
    reserve:
      "Le détail des calibres par départ n'est pas publié. À demander si vous dimensionnez une installation.",
  },
  {
    titre: "Image",
    lignes: [
      ["Vidéoprojecteur", "Optoma ZU820T, laser, 8 800 lumens"],
      ["Image", "4,63 m de large en une seule projection, sur le mur courbe"],
      ["Entrées", "HDMI, dont une prise murale depuis le coin régie"],
      ["Sans fil", "Apple TV intégrée — AirPlay"],
      ["Pilotage", "Trigger 12 V, télécommande filaire, RJ45, RS232"],
    ],
  },
  {
    titre: "Son",
    lignes: [
      ["Diffusion", "Système Sonos intégré, enceintes calibrées pour le lieu"],
      ["Sources", "AirPlay, Spotify Connect, ou l'application Sonos sur l'iPad du lieu"],
      ["Régie extérieure", "Entrées XLR directement dans le mur"],
      ["Réseau requis", "Le Wi-Fi du lieu — la musique et la projection passent par lui"],
    ],
    reserve:
      "⚠️ Ajouter des enceintes, en particulier des caissons de basses, est interdit : certaines fréquences ont été réduites pour le voisinage, et c'est ce qui permet de jouer jusqu'à 23h.",
  },
  {
    titre: "Lumière",
    lignes: [
      ["Pilotage", "DMX, couleurs et intensité"],
      ["Scénarios", "Cinq préréglages, et un mode libre par groupe de luminaires"],
      ["Accroche", "Un grill au plafond : projecteurs à la pince, avec les arrivées DMX"],
      ["Console", "Kiosc, sur l'iPad du lieu"],
    ],
  },
  {
    titre: "Réseau",
    lignes: [
      ["Fibre", "1 Gb symétrique, dédiée au lieu"],
      ["Wi-Fi", "Entièrement configurable : on crée les réseaux dont vous avez besoin, y compris un réseau invités séparé"],
      ["Filaire", "Prises RJ45 réparties dans le lieu"],
    ],
  },
  {
    titre: "Structure et sol",
    lignes: [
      ["Charge au sol", "800 kg/m²"],
      ["Revêtement", "Résine époxy claire"],
      ["Hauteur sous plafond", "4,50 m — elle varie selon les poutres"],
      ["Accès", "De plain-pied depuis la rue, sans marche ni seuil"],
      ["Porte", "Une porte à trois battants sur la cour ; les trois s'ouvrent"],
    ],
    reserve:
      "⚠️ La charge de 800 kg/m² n'a pas été retrouvée dans les documents du bureau d'études structure (LCV Ingénierie) : le CCTP ne cite que le DTU 13.3 et des critères de flèche. À sourcer avant de la porter sur un document contractuel.",
  },
  {
    titre: "Climatisation et sécurité",
    lignes: [
      ["Climatisation", "Réversible, sur toute la surface"],
      ["Classement", "Établissement recevant du public"],
      ["Accessibilité", "De plain-pied, WC PMR"],
    ],
  },
];

/**
 * Les plans téléchargeables.
 *
 * ⚠️ Ces fichiers existent déjà sur le site actuel, dans `/public/documents`.
 * Ne pas en refaire d'autres : ce sont les documents de l'architecte et du
 * géomètre, et ils font foi.
 */
export const PLANS = [
  {
    nom: "Plan du lieu",
    fichier: "/documents/plan-chez-les-plombiers.pdf",
    detail: "Le plan général de L'Atelier.",
    poids: "195 Ko",
  },
  {
    nom: "Cotations architecte",
    fichier: "/documents/cotations-architecte-globales.pdf",
    detail: "Les cotes relevées par l'architecte, sur l'ensemble du lieu.",
    poids: "1,8 Mo",
  },
  {
    nom: "Vues et mesures",
    fichier: "/documents/vues-mesures.pdf",
    detail: "Les élévations et les mesures, vue par vue.",
    poids: "7,2 Mo",
  },
  {
    nom: "Implantation des lumières",
    fichier: "/documents/plan-implantation-lumieres.pdf",
    detail: "La position des points lumineux et des arrivées DMX.",
    poids: "511 Ko",
  },
] as const;
