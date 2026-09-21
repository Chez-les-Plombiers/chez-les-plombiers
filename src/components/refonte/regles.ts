/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  LES RÈGLES DU LIEU — SOURCE UNIQUE
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
 * Étienne, 20/09/2026, et c'est la bonne ligne de partage :
 *
 *   INFORMATION → ce que le lieu EST.        « le mur courbe fait 4,63 m »
 *                 Vit sur la page du lieu.    On la lit avant de réserver.
 *
 *   RÈGLE       → ce qu'on vous DEMANDE.     « rangez avant de partir »
 *                 Vit ici.                    On la lit après avoir réservé.
 *
 * Si la phrase peut commencer par « merci de », c'est une règle.
 *
 * ── COMMENT ÉCRIRE UNE RÈGLE ──────────────────────────────────────────────
 *
 * Toujours donner le POURQUOI. Une consigne sans raison se discute ; une
 * consigne expliquée s'applique. « Musique jusqu'à 23h » se négocie au
 * téléphone ; « le lieu est dans un immeuble d'habitation, et c'est cet
 * horaire qui lui permet d'exister » ne se négocie pas.
 *
 * ── LE CAS QUI A FAIT NAÎTRE CE FICHIER ───────────────────────────────────
 *
 * Le 18/09/2026, une équipe a laissé douze packs de thé à la menthe au premier
 * étage, par gentillesse, sans prévenir. Le ménage est passé autour, et Étienne
 * a descendu les packs au sous-sol à la main.
 *
 * La règle n'est pas « ne laissez pas de packs ». Le principe, jamais écrit
 * jusqu'ici, est : LE MÉNAGE NETTOIE, IL NE RANGE PAS. Une dizaine de règles en
 * découlent, y compris celles qu'on n'a pas encore rencontrées.
 */

export interface Regle {
  /** Court, à l'impératif ou au constat. C'est ce qu'on retient. */
  titre: string;
  /** Ce qu'on demande, puis pourquoi. Le pourquoi n'est pas facultatif. */
  texte: string;
}

export interface MomentRegles {
  id: string;
  titre: string;
  /** Une phrase qui donne l'esprit du moment. */
  chapo: string;
  regles: readonly Regle[];
}

/**
 * Le principe qui gouverne tout le reste. Il tient en une phrase, et il évite
 * d'avoir à écrire cent règles.
 */
export const PRINCIPE =
  "Le lieu vous est livré rangé et propre. Il doit repartir rangé : le ménage nettoie, il ne range pas.";

export const MOMENTS: readonly MomentRegles[] = [
  {
    id: "avant",
    titre: "Avant l'événement",
    chapo:
      "Ce qu'on a besoin de savoir en amont. Rien ici n'est bloquant — c'est du calendrier, pas de l'autorisation.",
    regles: [
      {
        titre: "Un agent de sécurité selon le nombre d'invités",
        texte:
          "Il est à votre charge et se réserve en amont. ⚠️ Le seuil est à confirmer : la page d'information envoyée aux clients dit un agent SSIAP au-delà de 50 personnes et deux au-delà de 100 ; Étienne annonce un agent jusqu'à 30, deux au-delà de 30, trois au-delà de 80. Les deux ne peuvent pas être vrais.",
      },
      {
        titre: "Deux espaces loués, un agent dans la cour",
        texte:
          "Dès que vous louez deux des trois espaces, un agent est requis dans la cour : il veille à ce que les portes restent fermées et à ce que personne n'entre dans l'immeuble. Ce n'est pas négociable — la cour dessert des logements.",
      },
      {
        titre: "Annoncez vos livraisons",
        texte:
          "Dites-nous ce qui arrive, quand, et par où. La porte sur l'impasse des Bourdonnais est faite pour ça, mais la cour est partagée avec l'immeuble : un camion qui s'y installe sans prévenir bloque des riverains.",
      },
      {
        titre: "Prévenez si vous stockez",
        texte:
          "Vous pouvez laisser du matériel avant ou après l'événement, le sous-sol est là pour ça — mais dites-le. Du matériel trouvé sur place sans avoir été annoncé ne peut pas être distingué d'un oubli, et finit déplacé.",
      },
      {
        titre: "Signalez les prestataires",
        texte:
          "Traiteur, technique, sécurité, fleuriste : donnez-nous les noms et les horaires. C'est ce qui permet de leur ouvrir sans vous appeler.",
      },
    ],
  },
  {
    id: "pendant",
    titre: "Pendant l'événement",
    chapo:
      "Ces horaires viennent de la copropriété et du voisinage. Ce sont eux qui permettent au lieu d'exister dans un immeuble d'habitation — ils ne se négocient pas.",
    regles: [
      {
        titre: "La musique s'arrête à 23h",
        texte:
          "Sans exception. Les enceintes Sonos sont calibrées pour le lieu, certaines fréquences ayant été réduites pour le voisinage : ajouter des enceintes, en particulier des caissons de basses, est interdit.",
      },
      {
        titre: "La cour ferme à 22h",
        texte:
          "Après 22h, les fumeurs se rendent sur la voie publique. La cour donne sur des fenêtres d'habitation, et une conversation à vingt personnes y porte plus qu'on ne le croit.",
      },
      {
        titre: "Le lieu est vidé à minuit",
        texte:
          "Les invités sont partis à minuit. Le démontage peut se poursuivre au-delà, en silence.",
      },
      {
        titre: "On ne fume pas à l'intérieur",
        /* ⚠️ Ne pas justifier par « c'est un ERP » : le classement n'est pas
           obtenu au 20/09/2026. La raison tient sans lui. */
        texte:
          "Strictement, y compris la vape. Le lieu est un immeuble d'habitation du 17e siècle, et l'odeur reste dans les murs bruts.",
      },
      {
        titre: "Signalez tout dommage immédiatement",
        texte:
          "Un dommage annoncé se règle ; un dommage découvert à l'état des lieux se discute mal. Cela vaut aussi pour ce qui ne se voit pas : une prise qui ne fonctionne plus, une fuite.",
      },
    ],
  },
  {
    id: "partir",
    titre: "En partant",
    chapo: PRINCIPE,
    regles: [
      {
        titre: "Emportez ce que vous avez apporté",
        texte:
          "Décor, matériel, boissons, invendus. Si vous voulez laisser quelque chose — même en cadeau, même par gentillesse — dites-le nous avant de partir et convenons d'un endroit. Sinon, le ménage nettoie autour, et c'est nous qui descendons les cartons.",
      },
      {
        titre: "Triez les déchets",
        texte:
          "Trois poubelles dans la cuisine de jour, côté machine à café : verre, jaune (plastique, papier, métal), tout-venant. La collecte de l'immeuble refuse les sacs mal triés.",
      },
      {
        titre: "Remettez le mobilier exactement où il était",
        texte:
          "Le canapé, les fauteuils, les tables, les portants. Si ce n'est pas fait dans les 24 heures qui suivent la fin de la location, nous organisons l'intervention nous-mêmes et un forfait de 300 € HT est retenu sur le dépôt de garantie.",
      },
      {
        titre: "Rendez les clés à la boîte",
        texte:
          "Même code que la grille et le sous-sol. Il change chaque semaine et vous est envoyé avant votre date.",
      },
    ],
  },
] as const;

/**
 * Le dépôt de garantie. Il vit à part : ce n'est pas une consigne, c'est une
 * condition financière, et on la cherche pour elle-même.
 *
 * ⚠️ Montant et délai repris du calendrier tarifaire, où ils sont déjà
 * affichés. Ne pas les recopier ailleurs : s'ils changent, ils doivent changer
 * ici et là-bas, et nulle part de plus.
 */
export const DEPOT = {
  montant: "5 000 €",
  paiement: "par virement, avant l'événement",
  restitution: "restitué sous 8 jours après l'état des lieux",
} as const;
