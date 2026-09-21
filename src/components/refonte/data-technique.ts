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
    /*
     * L'image en tête : c'est ce qu'on demande le plus, et de loin. Ordre
     * dicté par Étienne — « la tuile image, il faut la mettre au-dessus de
     * réseau, elle est prioritaire ».
     */
    titre: "Image",
    lignes: [
      ["Vidéoprojecteur", "Optoma ZU820T, laser, 8 800 lumens"],
      ["Image projetée", "4,53 m de large × 2,55 m de haut, en 16:9"],
      ["Mur cyclorama", "4,63 m de large × 3,40 m de haut, incurvé, blanc"],
      ["Source sans fil", "Apple TV intégrée — AirPlay"],
      ["Source filaire", "Une prise HDMI murale, depuis le coin régie"],
      ["Pilotage", "Trigger 12 V, télécommande filaire, RJ45, RS232"],
      ["Image fixe", "Possible via Screen Canvas sur l'Apple TV, pour un logo ou un visuel"],
    ],
  },
  {
    titre: "Son",
    lignes: [
      ["Diffusion", "Sonos Port, enceintes encastrées au plafond sur tout l'espace"],
      ["Calibrage", "Réglées pour le lieu : certaines fréquences ont été réduites pour le voisinage"],
      ["Sources", "AirPlay, Spotify Connect, ou l'application Sonos sur l'iPad du lieu"],
      ["Votre régie", "Entrée XLR dans l'alcôve, près du mur cyclo"],
      ["Micros", "Quatre micros HF"],
      ["Réseau requis", "Le Wi-Fi du lieu — la musique et la projection passent par lui"],
    ],
    reserve:
      "⚠️ Les enceintes de retour et les caissons de basses sont interdits : le calibrage du lieu est ce qui permet de jouer jusqu'à 23h, et une enceinte non calibrée le défait.",
  },
  {
    titre: "Lumière",
    lignes: [
      ["Pilotage", "DMX, par un boîtier CueCore 3 — on peut s'y connecter pour programmer"],
      ["Scénarios", "Cinq préréglages, et un mode libre par groupe de luminaires"],
      ["Rails", "Compatibles projecteurs 3 allumages, DALI ou DMX ; on peut y accrocher les vôtres"],
      ["Accroche", "Un grill au plafond, avec les arrivées DMX"],
      ["Console", "Kiosc, sur l'iPad du lieu"],
    ],
  },
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
    titre: "Réseau",
    lignes: [
      ["Fibre", "1 Gb/s symétrique, dédiée"],
      ["Wi-Fi", "Entièrement configurable ; réseau invités sur demande"],
      ["Filaire", "Prises RJ45 partout"],
    ],
  },
  {
    titre: "Structure et sol",
    lignes: [
      ["Charge au sol", "800 kg/m²"],
      ["Revêtement", "Résine époxy blanche"],
      ["Hauteur sous plafond", "4,50 m — elle varie selon les poutres"],
      ["Accès", "De plain-pied depuis la rue, sans marche ni seuil"],
      ["Porte principale", "2,19 m de large × 3,66 m de haut, sur la cour, à trois battants"],
      ["Porte de l'impasse", "1,60 m × 2,39 m, deux vantaux de 0,80 m"],
    ],
    reserve:
      "⚠️ Deux valeurs à confirmer au mètre. La hauteur sous plafond : la page d'information envoyée aux clients dit ~4,10 m, le site disait 4,11 puis 4,5, et 4,50 a été retenu. Et la charge de 800 kg/m² n'apparaît dans aucun document du bureau d'études structure (LCV Ingénierie) : le CCTP ne cite que le DTU 13.3 et des critères de flèche.",
  },
  {
    titre: "Climatisation et accessibilité",
    lignes: [
      ["Climatisation", "Réversible, sur toute la surface"],
      ["Accès", "De plain-pied, accessible aux personnes à mobilité réduite"],
      ["Sanitaires", "WC PMR"],
      ["Agent de sécurité", "Requis au-delà d'un certain nombre d'invités — seuil à confirmer, voir les conditions de location"],
    ],
    /*
     * ⚠️ NE PAS ÉCRIRE « ERP » NI « CLASSEMENT ». Le classement n'est pas
     * obtenu au 20/09/2026 — Étienne : « je ne suis pas encore ERP, il ne faut
     * pas en parler ». L'accessibilité, elle, est réelle.
     */
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
