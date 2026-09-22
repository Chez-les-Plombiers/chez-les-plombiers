/* eslint-disable @next/next/no-html-link-for-pages --
 * `/tarifs` n'est PAS une route de cette application : c'est une autre zone
 * Next (le projet pricing), servie ici par réécriture. `next/link` tenterait
 * une navigation côté client vers une route que ce routeur ne connaît pas.
 */
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { ADRESSE, ADRESSE_LOGO, FICHE_GOOGLE, TELEPHONE } from "./data";

const TEL_BRUT = TELEPHONE.replace(/\s/g, "");
const WHATSAPP = "https://wa.me/33761471073";
const INSTAGRAM = "https://instagram.com/chezlesplombiers";

/**
 * La charpente partagée par toutes les pages de la refonte.
 *
 * Elle vivait dans `RefonteHome.tsx` jusqu'au 20/09/2026, puis la page de lieu
 * est arrivée et il a fallu choisir : recopier, ou sortir. On sort. Une page de
 * lieu qui dériverait de la page d'accueil se verrait tout de suite — c'est un
 * site de quelques pages, pas un catalogue.
 *
 * ── LE SYSTÈME ────────────────────────────────────────────────────────────
 *
 * Fond charbon, blocs encadrés, marges latérales, plusieurs blocs de même
 * largeur par ligne, Eurostile pour les titres. Validé par Étienne le
 * 20/09/2026 après trois tours : « c'est exactement ça que je voulais ».
 *
 * ⚠️ Règles nées de ses retours — les enfreindre, c'est refaire une erreur :
 * rien ne touche le bord de l'écran (« une photo pleine largeur, ça fait site
 * des années 2010 ») ; des contours, pas seulement des filets ; pas de titre
 * qui crie ; pas de monogramme répété ; pas de « lire plus ».
 */

/**
 * ── LA PALETTE PAR LIEU ───────────────────────────────────────────────────
 *
 * ⚠️ Ce ne sont PAS de simples fonds. Reprises telles quelles du calendrier
 * tarifaire (`globals.css` du projet pricing), où chaque lieu décline QUATRE
 * valeurs : le fond, la carte, la bordure et l'accent. Étienne, le 21/09/2026,
 * en comparant les deux : « sur l'appartement t'as un peu teinté le fond mais
 * pas le reste, alors que sur les tarifs le changement est plus joli ». Il
 * avait raison — teinter le seul fond donne une page grise posée sur du rose.
 *
 * ⚠️ Le fond reste SOMBRE dans tous les cas. Un aplat clair (rose, bleu clair)
 * casserait tout le système, conçu pour du charbon.
 *
 * ⚠️ Si ces valeurs changent ici, elles doivent changer dans le pricing aussi.
 * Les deux sont côte à côte dans la même navigation : une divergence se verrait
 * immédiatement.
 */
export const THEMES = {
  site:        { fond: "#1A1A1A", carte: "#242424", bord: "#3A3A3A", accent: "#C8A96E" },
  atelier:     { fond: "#1C1A17", carte: "#262320", bord: "#3D3830", accent: "#C8A96E" },
  boutique:    { fond: "#0F1720", carte: "#16212C", bord: "#2C4054", accent: "#7EC2E6" },
  appartement: { fond: "#1F1216", carte: "#2A1A20", bord: "#4D323C", accent: "#E4A2B5" },
} as const;

export type NomTheme = keyof typeof THEMES;

/*
 * Les classes passent par des variables CSS posées sur la coquille de page :
 * un seul endroit décide, tout le reste suit — y compris la barre et le pied,
 * qui sont partagés.
 */
export const BLOC = "bg-[var(--clp-carte)]";
export const BORD = "border border-[var(--clp-bord)]";
export const LAITON = "var(--clp-accent)";
export const CADRE = `${BLOC} ${BORD}`;
/** Le trait de séparation, quand il n'y a pas de cadre. */
export const TRAIT = "border-[var(--clp-bord)]";
export const LABEL = "font-clp text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]";

/**
 * ⚠️ BASCULE FAITE LE 22/09/2026 — la fonction rend l'adresse telle quelle.
 *
 * Les données ont toujours porté les URL DÉFINITIVES (`/atelier`, `/infos`,
 * `/visiter`). Tant que la refonte vivait sous `/refonte`, cette fonction
 * ajoutait le préfixe ; le jour de la mise en ligne, une ligne a suffi.
 *
 * ⚠️ ELLE EST CONSERVÉE, ET TOUS SES APPELS AVEC. Un second chantier se
 * préparerait de la même façon — sous un préfixe, sans toucher à un seul lien
 * — et il faudrait alors la retrouver. La supprimer ferait gagner trente
 * lignes et perdre le mécanisme.
 */
export function lien(href: string): string {
  return href;
}

/**
 * Un groupe de blocs.
 *
 * ⚠️ DEUX respirations, et la distinction compte. `mt-3` est le même écart
 * qu'entre deux blocs d'une grille : il dit « ceci continue ce qui précède »
 * (la grille des faits sous la photo de la voiture, par exemple). `grand`
 * donne le `mt-8` d'un intertitre : il dit « nouveau sujet ».
 *
 * Le besoin est apparu le 20/09/2026 en retirant les intertitres « les trois
 * espaces » et « ce que le lieu permet » : sans eux, tous les groupes se sont
 * retrouvés collés. Étienne : « il y a des espaces entre les blocs qui ont
 * sauté ». C'était l'intertitre qui portait la respiration, pas le groupe.
 */
export function Bloc({
  children,
  grand,
}: {
  children: React.ReactNode;
  grand?: boolean;
}) {
  return <section className={grand ? "mt-8" : "mt-3"}>{children}</section>;
}

export function Titre({ children }: { children: React.ReactNode }) {
  return <p className={`${LABEL} mb-3 mt-8 px-1`}>{children}</p>;
}

/**
 * La coquille de page.
 *
 * `fond` permet à une page de lieu de porter sa teinte — le charbon marron de
 * L'ATELIER, le bleu de LA BOUTIQUE, le rose de L'APPARTEMENT, déjà en place
 * dans le calendrier tarifaire. Le fond reste SOMBRE dans tous les cas : un
 * aplat clair casserait tout le système, conçu pour du charbon.
 */
export function Page({
  children,
  theme = "site",
}: {
  children: React.ReactNode;
  theme?: NomTheme;
}) {
  const t = THEMES[theme];
  return (
    <div
      className="min-h-screen text-[#E8E4DC] antialiased"
      style={
        {
          backgroundColor: t.fond,
          "--clp-carte": t.carte,
          "--clp-bord": t.bord,
          "--clp-accent": t.accent,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/**
 * Le lien de retour, en tête de chaque page qui n'est pas l'accueil.
 *
 * ⚠️ Le logo de la barre ramène déjà à l'accueil, mais rien ne le dit —
 * Étienne, 21/09/2026 : « là il n'y a pas de bouton pour revenir, on considère
 * qu'on clique sur le logo ? » Une convention que le visiteur doit deviner
 * n'en est pas une.
 *
 * ⚠️ Il porte le nom de la page d'où l'on vient, pas le mot « retour ». Sur
 * une page de photos, « ← Dîners » dit où l'on remonte ; « ← Retour » ne dit
 * rien et dépend de l'historique du navigateur.
 */
/**
 * Le retour en haut de page.
 *
 * ⚠️ C'ÉTAIT UN SIMPLE TEXTE GRIS, ET C'ÉTAIT TROP PEU. Étienne, 21/09/2026 :
 * « c'est juste un texte cliquable, il est un peu petit. Est-ce qu'on pourrait
 * pas faire un petit bouton avec une flèche plus gros ? »
 *
 * Deux choses le rendaient faible : rien ne disait qu'on pouvait cliquer, et
 * la zone tactile faisait à peine 16 px de haut — sous les 44 px qu'Apple
 * recommande, donc un bouton qu'on rate au pouce. Il porte maintenant un
 * cadre, le même que les blocs, et se touche sans viser.
 */
export function Retour({ href, texte }: { href: string; texte: string }) {
  return (
    <div className="pt-4">
      <Link
        href={href}
        className={`${CADRE} inline-flex items-center gap-2 px-4 py-2.5 font-mono text-[12px] text-[#C9C4BC] transition-colors hover:border-[var(--clp-accent)] hover:text-[#E8E4DC]`}
      >
        <span aria-hidden className="text-[14px] leading-none">
          &larr;
        </span>
        {texte}
      </Link>
    </div>
  );
}

export function Corps({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-[1180px] px-4 pb-16 sm:px-6">{children}</main>
  );
}

/**
 * L'en-tête.
 *
 * ── DEUX BARRES, ET LA DIFFÉRENCE EST UNE DÉCISION ────────────────────────
 *
 * Sur GRAND ÉCRAN : le logo et trois entrées — Tarifs, Visites, WhatsApp.
 *
 * ⚠️ TROIS NOMS, AUCUN VERBE. C'était « Visiter » entre deux substantifs.
 * Étienne, 22/09/2026 : « comme ça il n'y a pas de verbe ». Un verbe au
 * milieu de noms se lit comme un ordre, et déséquilibre la série.
 *
 * Sur TÉLÉPHONE : le logo et LE NUMÉRO, rien d'autre.
 *
 * Étienne avait raison de trouver les trois boutons « un peu gros » : à 375 px
 * ils occupent le tiers du premier écran pour proposer trois choses dont deux
 * sont déjà dans la page. Il a aussi donné, sans la nommer, la raison de garder
 * la troisième : « le livreur de chez Option a voulu nous appeler, il a trouvé
 * mon téléphone sur le site ». C'est ça, l'usage mobile de ce site — quelqu'un
 * debout dans la rue qui doit joindre un humain maintenant.
 *
 * ⚠️ On affiche LE NUMÉRO, pas le mot « Appeler » ni « WhatsApp ». Un mot ne
 * sert que si on le touche ; un numéro se lit, se recopie, se dicte à un
 * collègue, et s'appelle d'un doigt. Un livreur au volant ne tape pas sur un
 * bouton, il lit et compose.
 *
 * ⚠️ `tel:` et pas `wa.me` : c'est le seul lien qui ne peut pas échouer. Un
 * téléphone professionnel sans WhatsApp, et le bouton mène à « téléchargez
 * WhatsApp ». WhatsApp reste partout ailleurs — le pied de page, `/infos`,
 * `/visiter` — et sur grand écran.
 *
 * Tarifs et Visites ne disparaissent pas : ils sont dans le sommaire de la
 * page et dans le pied.
 */
export function Barre({ lieu }: { lieu?: string }) {
  return (
    <header className="mx-auto max-w-[1180px] px-4 pt-5 sm:px-6">
      <div className={`${CADRE} flex items-center justify-between gap-4 px-4 py-4 sm:px-5`}>
        <a href={lien("/")} aria-label="Chez les Plombiers, accueil">
          <span className="sm:hidden">
            <Logo hauteur={22} pied={lieu} priority />
          </span>
          <span className="hidden sm:block">
            <Logo hauteur={34} pied={lieu} priority />
          </span>
        </a>

        {/* Téléphone : le numéro seul. */}
        <a
          href={`tel:${TEL_BRUT}`}
          className={`${BORD} whitespace-nowrap px-3 py-2.5 font-mono text-[12px] transition-colors hover:border-[var(--clp-accent)] hover:text-[var(--clp-accent)] sm:hidden`}
        >
          {TELEPHONE}
        </a>

        {/* Grand écran : les trois actions. */}
        <nav className="hidden items-center gap-2 sm:flex">
          {/*
            ⚠️ BLANC CASSÉ, PAS LAITON PLEIN. Remarque de Céline : rempli, le
            laiton « apparaît comme une couleur à part entière », alors qu'en
            trait ou en mot il passe pour un accent. Un aplat doré dans une
            page qui n'a pas d'autre couleur pleine déséquilibre tout.
            Le blanc cassé est déjà la couleur du texte de la page : il ne
            introduit aucune couleur nouvelle, et rempli il garde son rôle de
            bouton principal. Le laiton reste ce qu'il est — un trait, un mot.
            ⚠️ Et il ne suit PAS le thème du lieu : rose ou bleu plein seraient
            pires encore.
          */}
          <a
            href="/tarifs"
            className="bg-[#E8E4DC] px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] text-[#1A1A1A] transition-opacity hover:opacity-85"
          >
            Tarifs
          </a>
          <a
            href={lien("/visiter")}
            className={`${BORD} px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[var(--clp-accent)] hover:text-[var(--clp-accent)]`}
          >
            Visites
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className={`${BORD} px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[var(--clp-accent)] hover:text-[var(--clp-accent)]`}
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Pied() {
  const colonnes: Array<{
    titre: string;
    liens: Array<{
      nom: string;
      href: string;
      externe?: boolean;
      suffixe?: string;
      punaise?: boolean;
    }>;
  }> = [
    {
      titre: "Les lieux",
      liens: [
        { nom: "L'Atelier", href: lien("/atelier") },
        { nom: "La Boutique", href: lien("/boutique") },
        { nom: "L'Appartement", href: lien("/appartement") },
      ],
    },
    {
      titre: "Le site",
      liens: [
        { nom: "Tarifs et disponibilités", href: "/tarifs", suffixe: "/tarifs" },
        { nom: "Venir et livrer", href: lien("/infos"), suffixe: "/infos" },
        { nom: "Conditions de location", href: lien("/conditions"), suffixe: "/conditions" },
        { nom: "Réserver une visite", href: lien("/visiter"), suffixe: "/visiter" },
      ],
    },
    {
      titre: "Nous joindre",
      liens: [
        { nom: "WhatsApp", href: WHATSAPP, externe: true },
        { nom: TELEPHONE, href: `tel:${TEL_BRUT}` },
        { nom: "@chezlesplombiers", href: INSTAGRAM, externe: true },
        /*
          L'itinéraire descend ici depuis la page de lieu (20/09/2026). Une
          adresse se cherche en bas de page, pas à côté d'un prix — et au pied,
          elle est sur toutes les pages d'un coup.
        */
        { nom: "Itinéraire", href: FICHE_GOOGLE, externe: true, punaise: true },
      ],
    },
  ];

  return (
    <footer className="mt-16 border-t border-[var(--clp-bord)]">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <div className="gap-10 sm:flex sm:items-start sm:justify-between">
          {/*
            ⚠️ L'adresse ne passe PLUS par la ligne de pied du logo : son
            interlettrage la faisait déborder du mot-symbole. Étienne : « il
            faut que l'adresse fasse la même largeur que le logo, là ça dépasse
            trop ». Elle est donc posée dessous, dans un bloc de la largeur du
            logo, et son corps s'ajuste pour la remplir sans la dépasser.
            Et le logo est plus grand : « comme d'habitude, on aime bien quand
            le logo est plus gros ».
          */}
          <div className="w-[240px] shrink-0 sm:w-[300px]">
            <Logo hauteur={38} className="w-full [&_img]:!h-auto [&_img]:!w-full" />
            <p className="mt-2 w-full text-center font-clp text-[9px] font-bold uppercase tracking-[0.12em] text-[#A8A29A] sm:text-[11px]">
              {ADRESSE_LOGO}
            </p>
          </div>

          {/*
            ⚠️ DEUX COLONNES SUR TÉLÉPHONE, ET « NOUS JOINDRE » EN PLEINE
            LARGEUR. À trois colonnes serrées les libellés se coupaient en
            deux ; à une seule, le pied devenait interminable. Le compromis
            tient : les deux listes courtes côte à côte, les contacts dessous.
          */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-0 sm:flex sm:gap-14">
            {colonnes.map((col) => (
              <div key={col.titre} className={col.titre === "Nous joindre" ? "col-span-2 sm:col-span-1" : ""}>
                <p className="font-clp text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
                  {col.titre}
                </p>
                <ul className="mt-3 space-y-2">
                  {col.liens.map((l) => (
                    <li key={l.nom}>
                      <a
                        href={l.href}
                        {...(l.externe
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex items-center gap-1.5 text-[13px] text-[#C9C4BC] transition-colors hover:text-white"
                      >
                        {l.punaise && (
                          <MapPin
                            className="h-3.5 w-3.5 shrink-0"
                            style={{ color: LAITON }}
                          />
                        )}
                        {l.nom}
                        {l.suffixe && (
                          /*
                             L'adresse écrite : elle dit qu'on peut l'envoyer.
                             ⚠️ MASQUÉE SUR TÉLÉPHONE. Dans une colonne de
                             180 px, « Tarifs et disponibilités » passe à la
                             ligne et le `/tarifs` part flotter tout seul à
                             droite — le pied ressemblait à un tableau cassé.
                             Et sur un téléphone on ne recopie pas une adresse
                             à la main : on partage la page.
                          */
                          <span className="ml-2 hidden font-mono text-[11px] text-[#5E5E5E] sm:inline">
                            {l.suffixe}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-[var(--clp-bord)] pt-6">
          {/*
            ⚠️ MENTIONS LÉGALES ET CONFIDENTIALITÉ SONT OBLIGATOIRES, et elles
            se cherchent ici — dernière ligne, à côté du SIREN. Les mettre dans
            une colonne du pied leur donnerait le même poids qu'aux tarifs.
          */}
          <div className="font-mono text-[11px] leading-relaxed text-[#5E5E5E]">
            <p>Chez les Plombiers SAS · SIREN 928 788 157 · {ADRESSE}</p>
            <p className="mt-1.5 flex gap-4">
              <a href={lien("/mentions-legales")} className="transition-colors hover:text-[#A8A29A]">
                Mentions légales
              </a>
              <a href={lien("/confidentialite")} className="transition-colors hover:text-[#A8A29A]">
                Confidentialité
              </a>
            </p>
          </div>
          <p className="font-clp text-[10px] uppercase tracking-[0.18em] text-[#5E5E5E]">
            Maquette de travail, non publiée
          </p>
        </div>
      </div>
    </footer>
  );
}
