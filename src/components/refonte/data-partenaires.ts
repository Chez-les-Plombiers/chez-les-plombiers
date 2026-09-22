/**
 * `/partenaires` — les gens avec qui on travaille.
 *
 * ── POURQUOI UNE PAGE, ET PAS UNE PAGE « NOTRE CHEF » ────────────────────
 *
 * Le site actuel a un `/notre-chef` dédié à Mathias, et c'est le problème :
 * une page pour une personne paraît mince, et elle ne répond à aucune question
 * qu'on se pose. Personne ne cherche « le chef de Chez les Plombiers ».
 *
 * En revanche « qui va faire à manger ? » est une vraie question, posée avant
 * de réserver. Une page qui y répond, et qui montre qu'il y a un réseau
 * derrière le lieu, rassure une agence bien mieux qu'une biographie.
 *
 * ── DEUX NIVEAUX, ET C'EST VOULU ─────────────────────────────────────────
 *
 * ⚠️ Étienne, 21/09/2026 : « on va pas mettre Salim et Mathias au même
 * niveau. Salim, c'est un mec qui fait la sécurité chez nous ; Mathias, c'est
 * mon meilleur copain qui est chef. »
 *
 * Mathias est donc un PARTENAIRE, nommé, avec son entreprise et ses liens.
 * La sécurité est un SERVICE qu'on organise — réel, nécessaire, mais on ne
 * publie pas le nom d'un prestataire à qui on donne du travail. Les deux sont
 * d'accord pour être cités ; c'est la hiérarchie qui compte, pas l'accord.
 */

export interface Partenaire {
  nom: string;
  role: string;
  /** Un paragraphe, deux au plus. On présente, on ne vend pas. */
  texte: readonly string[];
  liens: readonly { nom: string; url: string }[];
  photo?: { src: string; alt: string };
}

export const PARTENAIRES: readonly Partenaire[] = [
  {
    nom: "Mathias Rouveure",
    role: "Chef — HOMEMADE",
    texte: [
      "Mathias est notre chef partenaire. Diplômé de l'École hôtelière de Lausanne, il a tenu ses propres restaurants avant de fonder HOMEMADE, avec lequel il signe les dîners, les déjeuners et les cocktails du lieu.",
      "Ce sont lui et ses équipes qui prennent en charge nos événements, et c'est également à eux que nous confions la location du mobilier. Pour ce point, écrivez à Anna — anna@homemadelab.fr — en précisant que vous venez de notre part.",
      "Sa cuisine se pense avec l'événement plutôt qu'à côté : le menu se construit avec vous, en fonction de ce que vous organisez et du nombre de convives.",
    ],
    liens: [
      { nom: "homemadelab.fr", url: "https://www.homemadelab.fr/" },
      { nom: "@mathiasrouveure", url: "https://www.instagram.com/mathiasrouveure/" },
    ],
    /*
     * ⚠️ LUI, ET PAS SEULEMENT SON TRAVAIL. Il y avait ici la photo d'un
     * déjeuner dressé — bonne image, mauvais endroit : sur une page qui
     * s'appelle « Partenaires », on vient voir des gens. Étienne, 22/09/2026 :
     * « il faudra mettre une photo de lui quand même. »
     *
     * ⚠️ TROISIÈME ÉTAT DE CETTE IMAGE. Il y a d'abord eu une photo de plat,
     * puis un portrait du site actuel où Mathias est de profil et dans
     * l'ombre. Celle-ci est d'Étienne, prise CHEZ NOUS : il est de face, il
     * sourit, et le mur brut derrière lui dit où on est. « Elle me plaît
     * mieux puisqu'elle est prise chez les plombiers. »
     *
     * ⚠️ Recadrée en 4/3 depuis une verticale 1000 × 1338, en gardant le haut
     * (22 % de marge coupée en haut) : le cadre de la page est horizontal, et
     * c'est le visage qu'on vient chercher sur une page « Partenaires ».
     */
    photo: {
      src: "/photos/lieu/mathias-atelier.webp",
      alt: "Mathias Rouveure assis devant un mur brut de L'Atelier, ses casseroles et ses légumes autour de lui",
    },
  },
];

/**
 * Les services qu'on organise sans les nommer.
 *
 * ⚠️ Ne pas y ajouter de noms de prestataires sans l'accord explicite
 * d'Étienne, et sans une bonne raison. Publier le nom de quelqu'un à qui on
 * donne du travail l'engage autant que nous.
 */
export const SERVICES = [
  {
    titre: "Sécurité",
    texte:
      "Les agents sont à votre charge et se réservent en amont. Nous travaillons avec une équipe que nous connaissons bien et pouvons vous mettre en relation. Le nombre requis dépend du nombre d'invités — voir les conditions de location.",
  },
  {
    titre: "Ménage",
    texte:
      "Le ménage de sortie est compris dans la location : nous vous remettons le lieu propre, et nous le reprenons de même.",
  },
  {
    /*
     * Ajouté le 22/09/2026 sur une remarque de Céline, et elle a raison :
     * le ménage passe LE MATIN, le mobilier arrive APRÈS, et le montage
     * salit. Entre les deux, personne. C'était une prestation réelle qui
     * n'était nulle part écrite, donc jamais vendue.
     */
    titre: "Permanence de ménage",
    texte:
      "Un événement se prépare souvent toute la journée : le mobilier arrive après notre passage du matin, et le montage laisse des traces. Nous pouvons prévoir une présence sur la journée, pour que le lieu soit net à l'ouverture des portes. En supplément.",
  },
  {
    /*
     * ⚠️ NE PAS CONFONDRE AVEC L'ANCIENNE MENTION « régisseur compris »,
     * retirée du site le 20/09/2026 parce qu'elle était fausse. Le régisseur
     * existe, il est excellent, et il se facture.
     */
    titre: "Régisseur",
    texte:
      "Une personne peut vous être dédiée du matin au soir, avant et après votre événement. Elle réceptionne vos livraisons en votre absence, installe le mobilier, branche vos ordinateurs aux écrans, et va chercher ce qui manque. En supplément.",
  },
  {
    titre: "Mobilier",
    texte:
      "Le mobilier du lieu est compris. Pour tout ce qui viendrait s'y ajouter, HOMEMADE s'en charge : écrivez à Anna, anna@homemadelab.fr, de notre part.",
  },
] as const;
