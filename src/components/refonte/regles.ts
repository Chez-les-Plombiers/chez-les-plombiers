/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  LES CONDITIONS DE LOCATION — SOURCE UNIQUE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ C'EST ICI QU'ON AJOUTE UNE RÈGLE. Nulle part ailleurs.
 *
 * Avant ce fichier, une règle vivait à cinq endroits : la tête d'Étienne, la
 * base du concierge `/guide`, la FAQ du site, le contrat, et la page publique.
 * Cinq copies, donc cinq versions qui divergent. Ce n'est pas une crainte
 * théorique : `guide-knowledge.ts` portait encore
 * « Couvre-feu bruit : [À REMPLIR PAR FRED] » le 20/09/2026, alors que la
 * réponse — 23h — était affichée sur la page d'accueil le matin même.
 *
 * ── CE QUI EST UNE RÈGLE, ET CE QUI N'EN EST PAS ──────────────────────────
 *
 *   INFORMATION → ce que le lieu EST.        « le mur cyclo fait 4,63 m »
 *                 Vit sur la page du lieu.    On la lit avant de réserver.
 *
 *   RÈGLE       → ce qu'on vous DEMANDE.     « merci de tout remporter »
 *                 Vit ici.                    On la lit après avoir réservé.
 *
 * ── LE TON, ET C'EST LA CHOSE LA PLUS FACILE À CASSER ─────────────────────
 *
 * ⚠️ Étienne, le 21/09/2026, sur la première version : « c'est comme si c'était
 * toi qui me parlais à moi. Toi tu es mon assistant, c'est normal que tu me
 * parles direct — mais pas aux clients. Il faut être plus cordial, on est dans
 * un monde un peu luxe. »
 *
 * Le registre est celui de l'hôtellerie : on VOUVOIE, on demande, on remercie,
 * on explique. Jamais d'impératif sec (« Triez les déchets », « Emportez »),
 * jamais de menace. « Nous vous remercions de… », « nous avons besoin de… »,
 * « merci de nous prévenir ».
 *
 * ⚠️ Mais le POURQUOI reste, dans la même phrase que la demande. Une consigne
 * sans raison se négocie au téléphone ; une consigne expliquée s'applique.
 * Cordial ne veut pas dire vague.
 *
 * ── LE CAS QUI A FAIT NAÎTRE CE FICHIER ───────────────────────────────────
 *
 * Le 18/09/2026, une équipe a laissé douze packs de thé à la menthe au premier
 * étage, par gentillesse, sans prévenir. Le ménage est passé autour, et Étienne
 * a descendu les packs au sous-sol à la main. La règle n'est pas « ne laissez
 * pas de packs » : c'est que le ménage nettoie et ne range pas. Une dizaine de
 * règles en découlent, y compris celles qu'on n'a pas encore rencontrées.
 */

export interface Regle {
  titre: string;
  /** Ce qu'on demande, et pourquoi. Le pourquoi n'est pas facultatif. */
  texte: string;
}

export interface MomentRegles {
  id: string;
  titre: string;
  chapo: string;
  regles: readonly Regle[];
}

/**
 * Le principe qui gouverne le reste. Il tient en une phrase, et il évite
 * d'avoir à en écrire cent.
 *
 * ⚠️ Il ne doit plus s'afficher en gros caractères en tête de page — Étienne :
 * « c'est vrai, mais il ne faut pas le mettre aussi gros, aussi haut ». Il vit
 * désormais comme chapô de la section « En partant », à sa place.
 */
export const PRINCIPE =
  "Nous vous remettons le lieu rangé et propre, et nous vous remercions de nous le rendre dans le même état : notre équipe de ménage nettoie, mais elle ne range pas.";

export const MOMENTS: readonly MomentRegles[] = [
  {
    /*
     * ⚠️ CETTE SECTION EST LA PLUS IMPORTANTE DE LA PAGE, et elle vient en
     * premier parce que c'est chronologiquement le premier moment — mais
     * surtout parce que c'est la seule qui protège vraiment le lieu.
     *
     * Elle est née de deux mésaventures réelles, racontées par Étienne le
     * 21/09/2026 :
     *
     * 1. Une cliente a envoyé un « avis de virement » le jour même en disant
     *    que c'était réglé. En le lisant attentivement, le virement était
     *    PROGRAMMÉ deux à trois semaines plus tard. Un avis de virement n'est
     *    pas un paiement : c'est une intention datée.
     * 2. Publicis, réservation validée depuis trois semaines pour
     *    L'Appartement, 2 000 €, toujours pas encaissés. Étienne : « comme
     *    c'est un plus petit montant on fait moins attention ». C'est
     *    précisément là que ça glisse.
     *
     * ⚠️ Le mot qui compte est REÇU, pas « envoyé ». Ne pas l'adoucir en
     * relisant la page : c'est toute la règle.
     *
     * ⚠️ Et ne pas la déplacer plus bas « parce que c'est commercial ». Une
     * condition de paiement qu'on découvre à la fin d'une page n'a jamais
     * empêché personne d'entrer sans avoir payé.
     */
    id: "reserver",
    titre: "Réserver et payer",
    chapo:
      "Nous posons volontiers une option pendant que votre projet se précise. Voici comment elle devient une réservation.",
    regles: [
      {
        titre: "Une option tient sept jours",
        texte:
          "Passé ce délai, la date redevient libre et peut être proposée à quelqu'un d'autre. Nous ne relançons pas : nous préférons vous laisser décider sans pression.",
      },
      {
        titre: "La réservation est confirmée à réception du paiement",
        texte:
          "La totalité de la location est réglée par virement au moment de la réservation. Et c'est bien la réception qui compte, pas l'envoi : tant que les fonds ne sont pas sur le compte, la date reste ouverte.",
      },
      {
        titre: "Un avis de virement ne vaut pas paiement",
        texte:
          "Nous le disons sans détour parce que la confusion est fréquente et de bonne foi : un avis de virement atteste d'un ordre donné, parfois programmé à plusieurs semaines. Seul le crédit effectif sur notre compte confirme la date.",
      },
      {
        /*
         * ⚠️ Cette règle disait « là encore, reçu et non envoyé » — et Étienne
         * a demandé ce que ça voulait dire. S'il ne comprend pas la règle de
         * son propre lieu, un client ne la comprendra pas davantage.
         *
         * Le raccourci reprenait le slogan de la ligne du dessus au lieu de
         * dire la chose utile : un virement met un à trois jours ouvrés à
         * arriver. C'est le délai bancaire qui rend le « 48 heures avant »
         * contraignant, et c'est lui qu'il fallait écrire.
         */
        titre: "Le dépôt de garantie doit être sur le compte 48 heures avant",
        texte:
          "Comptez un à trois jours ouvrés pour qu'un virement nous parvienne : l'envoyer la veille ne suffit pas. Tant que la location et le dépôt ne sont pas encaissés, nous ne pouvons pas vous remettre les clés — y compris le matin même, et nous en serions sincèrement navrés.",
      },
    ],
  },
  {
    id: "avant",
    titre: "Avant votre événement",
    chapo:
      "Quelques informations dont nous avons besoin en amont pour bien vous recevoir. Rien ici n'est bloquant : c'est de l'organisation, pas de l'autorisation.",
    regles: [
      {
        titre: "Nous annoncer vos livraisons",
        texte:
          "Merci de nous indiquer ce qui arrive, quand, et par quelle porte. L'impasse des Bourdonnais est prévue pour cela, mais la cour est partagée avec l'immeuble : un camion qui s'y installe à l'improviste bloque des riverains.",
      },
      {
        titre: "Nous prévenir si vous stockez",
        texte:
          "Vous pouvez laisser du matériel avant ou après votre événement, le sous-sol est là pour cela — merci simplement de nous le signaler. Sans quoi nous ne pouvons pas distinguer un stockage prévu d'un oubli, et il finit déplacé.",
      },
      {
        titre: "Nous présenter vos prestataires",
        texte:
          "Traiteur, technique, sécurité, fleuriste : leurs noms et leurs horaires nous permettent de leur ouvrir sans avoir à vous appeler le jour même.",
      },
      {
        titre: "Prévoir les agents de sécurité",
        texte:
          "Un agent est requis à partir de 30 invités, et deux à partir de 60. Ils sont à votre charge et se réservent en amont — nous pouvons vous orienter vers une équipe que nous connaissons bien.",
      },
      {
        titre: "Un agent dans la cour si vous louez deux espaces",
        texte:
          "Dès que deux de nos trois espaces sont réservés ensemble, la présence d'un agent dans la cour devient nécessaire : il veille à ce que les portes restent fermées et à ce que personne n'entre dans l'immeuble. La cour dessert des logements, et c'est ce qui nous permet de continuer à y recevoir.",
      },
    ],
  },
  {
    id: "pendant",
    titre: "Pendant votre événement",
    chapo:
      "Ces horaires nous viennent de la copropriété et du voisinage. Ce sont eux qui permettent au lieu d'exister dans un immeuble d'habitation, et nous ne pouvons malheureusement pas nous en écarter.",
    regles: [
      {
        titre: "La musique s'arrête à 23h",
        texte:
          "Sans exception, nous en sommes désolés. Nos enceintes ont été calibrées pour le lieu, certaines fréquences ayant été atténuées pour le voisinage : nous vous demandons de ne pas ajouter d'enceintes, en particulier de caissons de basses, car c'est ce réglage qui nous permet de jouer jusqu'à 23h.",
      },
      {
        titre: "La cour reste fumeurs jusqu'à 22h",
        texte:
          "Au-delà, nous invitons vos fumeurs à rejoindre la voie publique. Et parce que la cour dessert deux entrées d'immeuble, merci de n'en occuper que la moitié : les habitants doivent pouvoir passer à tout moment.",
      },
      {
        titre: "Le lieu est vidé à minuit",
        texte:
          "Vos invités auront quitté les lieux à minuit. Le démontage peut se poursuivre au-delà, dans le calme.",
      },
      {
        titre: "Il n'est pas possible de fumer à l'intérieur",
        texte:
          "Vape comprise, nous vous remercions de votre compréhension. Le lieu occupe un immeuble du 17e siècle, et l'odeur reste dans les murs bruts.",
      },
      {
        titre: "Nous signaler tout incident sur le moment",
        texte:
          "Un dommage annoncé se règle simplement ; découvert à l'état des lieux, il se discute mal. Cela vaut aussi pour ce qui ne se voit pas — une prise qui ne répond plus, une fuite.",
      },
    ],
  },
  {
    id: "partir",
    titre: "En partant",
    chapo: PRINCIPE,
    regles: [
      {
        titre: "Remporter ce que vous avez apporté",
        texte:
          "Décor, matériel, boissons, invendus. Si vous souhaitez nous laisser quelque chose — même avec la meilleure intention —, merci de nous en parler avant de partir et nous conviendrons ensemble d'un endroit. Sans cela, notre équipe nettoie autour, et les cartons restent.",
      },
      {
        titre: "Trier les déchets",
        texte:
          "Trois poubelles vous attendent dans la cuisine de jour, côté machine à café : verre, jaune pour le plastique, le papier et le métal, et tout-venant. La collecte de l'immeuble refuse les sacs mal triés.",
      },
      {
        titre: "Replacer le mobilier",
        texte:
          "Le canapé, les fauteuils, les tables et les portants reviennent à leur place, et les rideaux se replient ouverts. Si ce n'était pas fait dans les vingt-quatre heures, nous organiserions l'intervention nous-mêmes et un forfait de 300 € HT serait retenu sur le dépôt de garantie.",
      },
      {
        titre: "Rendre les clés à la boîte",
        texte:
          "Avec le même code que la grille et le sous-sol, celui que nous vous aurons transmis par message avant votre date.",
      },
    ],
  },
];

/**
 * Le dépôt de garantie — et il DIFFÈRE selon le lieu.
 *
 * ⚠️ Une seule page pour les trois, mais trois montants. Étienne, 21/09/2026 :
 * « les 5 000 €, c'est que pour l'atelier, pas pour l'appartement ». Valeurs
 * reprises de `venues.ts` dans le projet pricing, qui fait foi.
 *
 * ⚠️ LA BOUTIQUE n'a PAS de caution (décision d'Étienne du 15/09/2026). Ne pas
 * en inventer une par souci de symétrie.
 */
export const DEPOTS = [
  { lieu: "L'Atelier", montant: "5 000 €" },
  { lieu: "La Boutique", montant: "Aucun dépôt demandé" },
  { lieu: "L'Appartement", montant: "3 000 €" },
] as const;

export const DEPOT_MODALITES =
  "Par virement, reçu au plus tard 48 heures avant votre événement, et restitué sous huit jours après l'état des lieux.";
