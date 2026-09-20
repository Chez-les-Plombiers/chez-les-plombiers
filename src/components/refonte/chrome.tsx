/* eslint-disable @next/next/no-html-link-for-pages --
 * `/tarifs` n'est PAS une route de cette application : c'est une autre zone
 * Next (le projet pricing), servie ici par réécriture. `next/link` tenterait
 * une navigation côté client vers une route que ce routeur ne connaît pas.
 */
import { Logo } from "./Logo";
import { ADRESSE, TELEPHONE } from "./data";

const TEL_BRUT = TELEPHONE.replace(/\s/g, "");

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

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen text-[#E8E4DC] antialiased"
      style={{ backgroundColor: FOND }}
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
      <div className={`${CADRE} flex flex-wrap items-center justify-between gap-4 px-5 py-4`}>
        <a href="/refonte" aria-label="Chez les Plombiers, accueil">
          <Logo hauteur={26} pied={lieu} priority className="sm:hidden" />
          <Logo hauteur={34} pied={lieu} priority className="hidden sm:inline-flex" />
        </a>
        <nav className="flex items-center gap-2">
          <a
            href="/tarifs"
            className="bg-[#C8A96E] px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] text-[#1A1A1A] transition-colors hover:bg-[#D4B97E]"
          >
            Tarifs
          </a>
          <a
            href="https://calendly.com/chezlesplombiers/visite"
            target="_blank"
            rel="noopener noreferrer"
            className={`${BORD} px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E]`}
          >
            Visiter
          </a>
          {/*
            « Appeler » en troisième. Idée d'Étienne, 20/09/2026 : « n'importe
            qui qui a besoin de nous appeler arrive sur le site, pan — tarifs,
            visite, appeler ». Un `tel:` compose directement sur téléphone ;
            sur ordinateur, le numéro reste écrit en clair dans le pied de page.
          */}
          <a
            href={`tel:${TEL_BRUT}`}
            className={`${BORD} px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[#C8A96E] hover:text-[#C8A96E]`}
          >
            Appeler
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Pied() {
  const contacts: Array<[string, React.ReactNode]> = [
    ["Adresse", ADRESSE],
    [
      "Téléphone",
      <a key="t" href={`tel:${TELEPHONE.replace(/\s/g, "")}`} className="hover:text-white">
        {TELEPHONE}
      </a>,
    ],
    [
      "WhatsApp",
      <a key="w" href="https://wa.me/33761471073" target="_blank" rel="noopener noreferrer" className="hover:text-white">
        Écrire un message
      </a>,
    ],
    [
      "Instagram",
      <a key="i" href="https://instagram.com/chezlesplombiers" target="_blank" rel="noopener noreferrer" className="hover:text-white">
        @chezlesplombiers
      </a>,
    ],
  ];

  return (
    <footer className="mx-auto max-w-[1180px] px-4 pb-10 sm:px-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {contacts.map(([quoi, valeur]) => (
          <div key={quoi} className={`${CADRE} p-5`}>
            <p className="font-clp text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">
              {quoi}
            </p>
            <p className="mt-1.5 font-mono text-[13px]">{valeur}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 px-1 font-clp text-[10px] uppercase tracking-[0.18em] text-[#5E5E5E]">
        Maquette de travail, non publiée
      </p>
    </footer>
  );
}
