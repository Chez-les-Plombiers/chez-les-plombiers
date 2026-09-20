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
 * ⚠️ LE JOUR DE LA BASCULE, C'EST ICI, ET NULLE PART AILLEURS.
 *
 * Les données portent les URL DÉFINITIVES (`/atelier`, `/infos`, `/visiter`).
 * Tant que la refonte vit sous `/refonte`, cette fonction ajoute le préfixe.
 * Le jour de la mise en ligne, on renvoie `href` tel quel et tout le site
 * bascule d'un coup.
 *
 * `/tarifs` en est exempté : ce n'est pas une page de cette application, c'est
 * l'autre zone Next, déjà en production à son adresse définitive.
 */
export function lien(href: string): string {
  if (href.startsWith("/tarifs")) return href;
  return `/refonte${href}`;
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
 * ── DEUX BARRES, ET LA DIFFÉRENCE EST UNE DÉCISION ────────────────────────
 *
 * Sur GRAND ÉCRAN : le logo et trois actions — Tarifs, Visiter, WhatsApp.
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
 * Tarifs et Visiter ne disparaissent pas : ils sont dans le sommaire de la
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
          className={`${BORD} whitespace-nowrap px-3 py-2.5 font-mono text-[12px] transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E] sm:hidden`}
        >
          {TELEPHONE}
        </a>

        {/* Grand écran : les trois actions. */}
        <nav className="hidden items-center gap-2 sm:flex">
          <a
            href="/tarifs"
            className="bg-[#C8A96E] px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] text-[#1A1A1A] transition-colors hover:bg-[#D4B97E]"
          >
            Tarifs
          </a>
          <a
            href={lien("/visiter")}
            className={`${BORD} px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E]`}
          >
            Visiter
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className={`${BORD} px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E]`}
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Pied() {
  const colonnes: Array<{ titre: string; liens: Array<{ nom: string; href: string; externe?: boolean; suffixe?: string }> }> = [
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
