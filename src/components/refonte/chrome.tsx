/* eslint-disable @next/next/no-html-link-for-pages --
 * `/tarifs` n'est PAS une route de cette application : c'est une autre zone
 * Next (le projet pricing), servie ici par réécriture. `next/link` tenterait
 * une navigation côté client vers une route que ce routeur ne connaît pas.
 */
import { Logo } from "./Logo";
import { ADRESSE, TELEPHONE } from "./data";

const TEL_BRUT = TELEPHONE.replace(/\s/g, "");
const WHATSAPP = "https://wa.me/33761471073";
const INSTAGRAM = "https://instagram.com/chezlesplombiers";
const CALENDLY = "https://calendly.com/chezlesplombiers/visite";

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

export const FOND = "#1A1A1A";
export const BLOC = "bg-[#242424]";
export const BORD = "border border-[#3A3A3A]";
export const LAITON = "#C8A96E";
export const CADRE = `${BLOC} ${BORD}`;
export const LABEL = "font-clp text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]";

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
  fond = FOND,
}: {
  children: React.ReactNode;
  fond?: string;
}) {
  return (
    <div
      className="min-h-screen text-[#E8E4DC] antialiased"
      style={{ backgroundColor: fond }}
    >
      {children}
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
 * ⚠️ L'adresse ne va PAS sous le mot-symbole : essayée le 20/09/2026 et retirée
 * le jour même — Étienne, « c'est trop petit, c'est peut-être pas la peine ».
 * La taille du mot-symbole, elle, est la bonne : ne pas la réduire.
 *
 * Sur une page de lieu, la ligne de pied nomme le lieu. C'est là tout l'intérêt
 * du logo décliné.
 */
export function Barre({ lieu }: { lieu?: string }) {
  return (
    <header className="mx-auto max-w-[1180px] px-4 pt-5 sm:px-6">
      {/*
        ⚠️ `flex-wrap` et des boutons qui rétrécissent : à 375 px, les trois
        boutons plus le logo ne tiennent pas sur une ligne, et « WHATSAPP »
        sortait de l'écran. Ils passent à la ligne, et leur pas horizontal se
        resserre sous `sm`.
      */}
      <div className={`${CADRE} flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-5`}>
        {/*
          ⚠️ Les classes `sm:hidden` / `hidden sm:inline-flex` étaient posées
          SUR le composant Logo, qui porte déjà `inline-flex`. Deux utilitaires
          d'affichage sur le même élément : c'est l'ordre du CSS généré qui
          tranche, pas celui de l'attribut — et `inline-flex` gagnait. Résultat,
          le logo s'affichait deux fois l'un sous l'autre sur téléphone.
          Les enveloppes ci-dessous n'ont pas d'affichage concurrent.
        */}
        <a href="/refonte" aria-label="Chez les Plombiers, accueil">
          <span className="sm:hidden">
            <Logo hauteur={24} pied={lieu} priority />
          </span>
          <span className="hidden sm:block">
            <Logo hauteur={34} pied={lieu} priority />
          </span>
        </a>
        <nav className="flex items-center gap-2">
          <a
            href="/tarifs"
            className="bg-[#C8A96E] px-3 py-2.5 font-clp text-[10px] uppercase tracking-[0.12em] text-[#1A1A1A] transition-colors hover:bg-[#D4B97E] sm:px-4 sm:tracking-[0.16em]"
          >
            Tarifs
          </a>
          <a
            href="https://calendly.com/chezlesplombiers/visite"
            target="_blank"
            rel="noopener noreferrer"
            className={`${BORD} px-3 py-2.5 font-clp text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E] sm:px-4 sm:tracking-[0.16em]`}
          >
            Visiter
          </a>
          {/*
            WhatsApp en troisième — le canal d'Étienne, assumé.
            ⚠️ Et c'est POUR ÇA que le numéro reste écrit en clair, cliquable,
            dans le pied de page. Quelqu'un sans WhatsApp — un téléphone pro, un
            ordinateur sans l'application — qui cliquerait ici tombe sur une
            page « téléchargez WhatsApp ». Ne pas retirer le numéro du pied de
            page : c'est lui qui empêche le cul-de-sac.
          */}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className={`${BORD} px-3 py-2.5 font-clp text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E] sm:px-4 sm:tracking-[0.16em]`}
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

/**
 * Le pied de page.
 *
 * ⚠️ Il ne doit PAS être quatre tuiles alignées, comme il l'était jusqu'au
 * 20/09/2026 : sans hiérarchie, on ne sait pas où regarder. Étienne : « il faut
 * qu'on en crée un un peu joli ». Trois colonnes de liens sous le logotype à
 * l'adresse, et une ligne de mentions.
 *
 * C'est le seul endroit du site où le logotype porte l'adresse gravée : en
 * haut, elle était « trop petite pour servir ». Ici, elle clôt la page.
 *
 * ⚠️ Le numéro de téléphone reste écrit en clair et cliquable. Le bouton du
 * haut envoie sur WhatsApp ; ce numéro est le filet pour qui n'a pas WhatsApp.
 */
export function Pied() {
  const colonnes: Array<{ titre: string; liens: Array<{ nom: string; href: string; externe?: boolean; suffixe?: string }> }> = [
    {
      titre: "Les lieux",
      liens: [
        { nom: "L'Atelier", href: "/refonte/atelier" },
        { nom: "La Boutique", href: "/tarifs/boutique" },
        { nom: "L'Appartement", href: "/tarifs/appartement" },
      ],
    },
    {
      titre: "Le site",
      liens: [
        { nom: "Tarifs et disponibilités", href: "/tarifs", suffixe: "/tarifs" },
        { nom: "Venir et livrer", href: "/refonte/infos", suffixe: "/infos" },
        { nom: "Réserver une visite", href: CALENDLY, externe: true },
      ],
    },
    {
      titre: "Nous joindre",
      liens: [
        { nom: "WhatsApp", href: WHATSAPP, externe: true },
        { nom: TELEPHONE, href: `tel:${TEL_BRUT}` },
        { nom: "@chezlesplombiers", href: INSTAGRAM, externe: true },
      ],
    },
  ];

  return (
    <footer className="mt-16 border-t border-[#3A3A3A]">
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
              {ADRESSE}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8 sm:mt-0 sm:flex sm:gap-14">
            {colonnes.map((col) => (
              <div key={col.titre}>
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
                        className="text-[13px] text-[#C9C4BC] transition-colors hover:text-white"
                      >
                        {l.nom}
                        {l.suffixe && (
                          /* L'adresse écrite : elle dit qu'on peut l'envoyer. */
                          <span className="ml-2 font-mono text-[11px] text-[#5E5E5E]">
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

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-[#3A3A3A] pt-6">
          <p className="font-mono text-[11px] text-[#5E5E5E]">
            Chez les Plombiers SAS · SIREN 928 788 157 · {ADRESSE}
          </p>
          <p className="font-clp text-[10px] uppercase tracking-[0.18em] text-[#5E5E5E]">
            Maquette de travail, non publiée
          </p>
        </div>
      </div>
    </footer>
  );
}
