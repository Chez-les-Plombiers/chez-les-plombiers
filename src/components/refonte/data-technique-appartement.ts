import type { Poste } from "./data-technique";

/**
 * La fiche technique de L'APPARTEMENT.
 *
 * ⚠️ ELLE EST BEAUCOUP PLUS COURTE QUE CELLE DE L'ATELIER, ET C'EST NORMAL.
 * L'ATELIER se loue à des régisseurs qui dimensionnent une installation :
 * puissances, connectique, arrivées DMX. L'APPARTEMENT se loue meublé et
 * équipé, à des gens qui veulent savoir s'ils pourront faire un café et
 * brancher une présentation. Ne pas chercher à l'étoffer pour qu'elle
 * ressemble à l'autre — ce serait meubler.
 *
 * ⚠️ MÊME RÈGLE QUE POUR L'ATELIER : ce qui n'est pas vérifié est écrit
 * comme tel, dans `reserve`. Une réserve affichée vaut mieux qu'une valeur
 * plausible, surtout quand quelqu'un s'en sert pour préparer sa journée.
 *
 * Contenu dicté par Étienne le 28/09/2026.
 */
export const TECHNIQUE_APPARTEMENT: readonly Poste[] = [
  {
    /*
     * Les surfaces en tête : c'est la première question, et c'est celle à
     * laquelle le plan ci-dessous ne répond plus depuis le réaménagement.
     * Les donner ici évite qu'on les déduise d'un document périmé.
     */
    titre: "Surfaces",
    lignes: [
      ["Surface louée", "100 m² au sol"],
      ["Salon blanc", "environ 76 m² — le parquet peint, sous la mezzanine"],
      ["Pièce rose", "environ 20 à 25 m²"],
      ["Cuisine", "environ 13 m²"],
      [
        "Mezzanine",
        "20 m² — bureau privé, NON compris dans la location et non accessible",
      ],
    ],
    reserve:
      "La surface louée est sûre. Le détail pièce par pièce est donné de mémoire, en attendant un relevé : prenez-le comme un ordre de grandeur, pas comme une cote.",
  },
  {
    titre: "Image et son",
    lignes: [
      ["Téléviseur", "Un téléviseur au salon"],
      ["Source vidéo sans fil", "Apple TV — AirPlay depuis un téléphone ou un ordinateur"],
      ["Son", "Système Sonos, en AirPlay également"],
      [
        "Zones audio",
        "Trois, indépendantes : le salon blanc, la pièce rose, et le téléviseur. On peut n'envoyer le son que dans l'une d'elles.",
      ],
    ],
    reserve:
      "La diagonale du téléviseur n'a pas encore été relevée. Si vous prévoyez une diffusion dont le format dépend de la taille de l'écran, demandez-nous la mesure — nous la prendrons.",
  },
  {
    titre: "Confort",
    lignes: [
      ["Climatisation", "Réversible — chaud et froid"],
      ["Éclairage", "Spots Philips Hue, intensité et température réglables"],
    ],
  },
  {
    titre: "Cuisine",
    lignes: [
      ["Équipement", "Cuisine entièrement équipée"],
      ["Four", "Four combiné encastré — four et micro-ondes"],
      ["Froid", "Réfrigérateur"],
      ["Café", "Machine à café"],
      ["Eau", "Carafe filtrante Brita"],
    ],
  },
  {
    titre: "Sanitaires et buanderie",
    lignes: [
      ["Toilettes", "Oui"],
      ["Salle de bains", "Avec baignoire"],
      ["Lave-linge", "Oui"],
    ],
  },
  {
    titre: "Bureautique",
    lignes: [["Imprimante", "Impression sans fil, depuis le Wi-Fi du lieu"]],
  },
] as const;

export const PLANS_APPARTEMENT = [
  {
    nom: "Plan coté",
    fichier: "/documents/plan-appartement-cotes.pdf",
    detail:
      "Le plan de l'architecte, avec les cotes principales. ⚠️ Daté de 2012 : il est antérieur au réaménagement et ne montre plus la distribution actuelle. Les surfaces à jour sont en haut de cette page. Un relevé à jour est en préparation.",
  },
] as const;
