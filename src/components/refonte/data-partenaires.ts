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
     * Celle-ci les montre tous les deux : Mathias qui dresse, et L'Atelier
     * derrière lui. Elle vient du site actuel (`/notre-chef`).
     * ⏳ Étienne en cherche une autre, prise chez nous, sur le site d'HOMEMADE.
     */
    photo: {
      src: "/images/chef-mathias-portrait.jpg",
      alt: "Mathias Rouveure dressant un service à L'Atelier, devant les fenêtres de la cour",
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
      "Le ménage de sortie est compris dans la location. Un passage supplémentaire pendant un événement de plusieurs jours peut s'organiser, en supplément.",
  },
  {
    titre: "Mobilier",
    texte:
      "Le mobilier du lieu est compris. Pour tout ce qui viendrait s'y ajouter, HOMEMADE s'en charge : écrivez à Anna, anna@homemadelab.fr, de notre part.",
  },
] as const;
