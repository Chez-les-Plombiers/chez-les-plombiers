/* eslint-disable @next/next/no-html-link-for-pages --
 * `/tarifs` n'est PAS une route de cette application : c'est une autre zone
 * Next (le projet pricing), servie ici par réécriture. `next/link` tenterait
 * une navigation côté client vers une route que ce routeur ne connaît pas.
 */
import Image from "next/image";
import {
  ADRESSE,
  CATEGORIES_PHOTOS,
  CLIENTS_TEXTE,
  ESPACES,
  FAITS,
  PAGES,
  REGLES,
  TELEPHONE,
} from "./data";

/**
 * Page d'accueil — quatrième version, 20/09/2026. Fond charbon, blocs encadrés.
 *
 * ── LE SYSTÈME, ET POURQUOI ──────────────────────────────────────────────
 *
 * 1. FOND CHARBON. Pas un goût : le calendrier tarifaire est déjà charbon, et
 *    c'est la page qu'Étienne envoie le plus. Un site beige qui débouche sur un
 *    calendrier noir, ce sont deux objets. Le vocabulaire est fixé dans le
 *    `globals.css` du pricing : CHARBON #1A1A1A pour le site, CHARBON MARRON
 *    pour L'ATELIER, bleu pour LA BOUTIQUE, rose pour L'APPARTEMENT.
 *
 * 2. DES BLOCS, PAS DES BANDES. Chaque information vit dans un cadre, dans un
 *    conteneur à marges. Étienne : « quand la photo prend toute la largeur, ça
 *    fait site des années 2010 ». Un bloc encadré se lit comme une fiche.
 *    Plusieurs blocs de même largeur par ligne, en grille.
 *
 * 3. PAS DE « LIRE PLUS ». Un site qui existe pour répondre ne met pas un clic
 *    entre la question et la réponse. Les blocs sont courts ET complets ; le
 *    développé est une vraie page qu'on peut envoyer (`/atelier/plans`).
 *
 * 4. PAS DE TITRE QUI CRIE. « Une voiture peut entrer » en capitales de 40 px
 *    était de la réclame (Étienne : « c'est too much »). La photo de la Triumph
 *    à l'intérieur prouve la même chose sans un mot.
 *
 * ⚠️ SEO — le point à ne pas casser. Cette page porte 81 % du trafic Google du
 * site, sur le nom et l'adresse. Le logo à l'adresse est une IMAGE : Google n'y
 * lit rien. L'adresse doit donc rester en TEXTE dans le H1, même à taille
 * modeste. Ne pas supprimer ce H1 en trouvant qu'il fait doublon avec le logo.
 *
 * Composant serveur, sans état.
 */

/* Palette — reprise telle quelle du pricing pour que les deux ne divergent pas. */
const FOND = "#1A1A1A";
const BLOC = "bg-[#242424]";
const BORD = "border border-[#3A3A3A]";
const LAITON = "#C8A96E";

const CADRE = `${BLOC} ${BORD}`;
const LABEL =
  "font-clp text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]";

export function RefonteHome() {
  return (
    <div
      className="min-h-screen text-[#E8E4DC] antialiased"
      style={{ backgroundColor: FOND }}
    >
      <Barre />
      <main className="mx-auto max-w-[1180px] px-4 pb-16 sm:px-6">
        <Ouverture />
        <Espaces />
        <Preuve />
        <Faits />
        <Sommaire />
        <Photos />
        <Clients />
        <Regles />
      </main>
      <Pied />
    </div>
  );
}

/** Espace vertical entre deux groupes de blocs. Une seule valeur, partout. */
function Bloc({ children }: { children: React.ReactNode }) {
  return <section className="mt-3">{children}</section>;
}

function Titre({ children }: { children: React.ReactNode }) {
  return <p className={`${LABEL} mb-3 mt-8 px-1`}>{children}</p>;
}

/* ───────────────────────────────────────────────────────────────── Barre */

function Barre() {
  return (
    <header className="mx-auto max-w-[1180px] px-4 pt-5 sm:px-6">
      <div className={`${CADRE} flex flex-wrap items-center justify-between gap-4 px-5 py-4`}>
        {/*
          Le logotype à l'adresse plutôt que le seul nom : il dit où on est dès
          la première seconde, et il remplace le titre géant « 39 RUE DES
          BOURDONNAIS, PARIS 1ER » qu'Étienne trouvait grotesque.
        */}
        <Image
          src="/images/logo/logotype-adresse-blanc.png"
          alt={`Chez les Plombiers — ${ADRESSE}`}
          width={4501}
          height={1013}
          priority
          className="h-10 w-auto sm:h-14"
        />
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
        </nav>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────────────────── Ouverture */

function Ouverture() {
  return (
    <Bloc>
      <div className={`${CADRE} overflow-hidden`}>
        <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
          <Image
            src="/photos/lieu/atelier-kv.jpg"
            alt="L'Atelier : canapé courbe rose, murs de béton brut, sol clair"
            fill
            priority
            sizes="(max-width: 1180px) 100vw, 1180px"
            className="object-cover"
          />
        </div>
        <div className="border-t border-[#3A3A3A] px-5 py-5">
          {/* ⚠️ Le H1 : modeste en taille, mais c'est le texte que Google lit. */}
          <h1 className="font-clp text-sm font-bold uppercase leading-relaxed tracking-[0.1em]">
            Lieu événementiel — {ADRESSE}
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#A8A29A]">
            Trois espaces à la même adresse, à deux pas du Pont Neuf. Showrooms,
            lancements presse, dîners privés, défilés, expositions.
          </p>
        </div>
      </div>
    </Bloc>
  );
}

/* ─────────────────────────────────────────────────────────────── Espaces */

function Espaces() {
  return (
    <>
      <Titre>Les trois espaces</Titre>
      <div className="grid gap-3 sm:grid-cols-3">
        {ESPACES.map((e) => (
          <a
            key={e.slug}
            href={e.href}
            className={`${CADRE} group flex flex-col justify-between gap-5 p-5 transition-colors hover:border-[#C8A96E]`}
          >
            <div>
              <h2 className="font-clp text-sm font-bold uppercase tracking-[0.1em]">
                {e.nom}
              </h2>
              <p className="mt-1 text-[11px] leading-tight text-[#8A8A8A]">
                {e.surface} · {e.capacite} · {e.position.toLowerCase()}
              </p>
              <p className="mt-4 font-mono text-base font-bold">
                {e.prix}
                <span className="ml-1.5 text-[10px] font-normal text-[#8A8A8A]">
                  HT / jour
                </span>
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#A8A29A]">
                {e.texte}
              </p>
            </div>
            <span
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{ color: LAITON }}
            >
              Prix et disponibilités →
            </span>
          </a>
        ))}
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────── Preuve */

/**
 * L'accès véhicule, montré au lieu d'être clamé.
 *
 * ⚠️ Ne pas remettre de gros titre ici. La version précédente écrivait « UNE
 * VOITURE PEUT ENTRER » en capitales de 40 px ; Étienne : « c'est too much, ça
 * va pas, il faut plutôt mettre une photo ». La photo EST l'argument.
 */
function Preuve() {
  return (
    <>
      <Titre>Ce que le lieu permet</Titre>
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <figure className={`${CADRE} overflow-hidden`}>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="/images/services/gallery/evenements-auto-moto/01.jpg"
              alt="Une voiture garée à l'intérieur de L'Atelier, entre les poteaux de béton"
              fill
              sizes="(max-width: 1024px) 100vw, 780px"
              className="object-cover"
            />
          </div>
          <figcaption className="border-t border-[#3A3A3A] px-5 py-4 text-[13px] leading-relaxed text-[#A8A29A]">
            Une voiture entre depuis la rue, de plain-pied, sans marche ni
            seuil, et peut rester : le sol tient 800 kg/m².
          </figcaption>
        </figure>

        <div className={`${CADRE} flex flex-col justify-center gap-5 p-5`}>
          <div>
            <p className="font-mono text-2xl font-bold">800 kg/m²</p>
            <p className="mt-1 text-[13px] text-[#A8A29A]">
              Le double de la norme.
            </p>
          </div>
          <div className="h-px bg-[#3A3A3A]" />
          <div>
            <p className="font-mono text-2xl font-bold">Plain-pied</p>
            <p className="mt-1 text-[13px] text-[#A8A29A]">
              Accès direct depuis la rue, sans marche ni seuil.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ───────────────────────────────────────────────────────────────── Faits */

function Faits() {
  // Le premier fait est l'accès véhicule : il a sa propre section, juste au-dessus.
  const reste = FAITS.filter((f) => !f.fort);

  return (
    <Bloc>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reste.map((f) => (
          <div key={f.valeur} className={`${CADRE} p-5`}>
            <p className="font-mono text-base font-bold">{f.valeur}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#A8A29A]">
              {f.detail}
            </p>
          </div>
        ))}
      </div>
    </Bloc>
  );
}

/* ──────────────────────────────────────────────────────────────  Sommaire */

/**
 * Les six adresses du site, en blocs de largeur égale.
 *
 * ⚠️ Pas de « lire plus » : chaque bloc dit ce que la page contient et donne
 * son URL. C'est ça qu'on envoie à un client qui demande les plans.
 */
function Sommaire() {
  return (
    <>
      <Titre>Tout le site</Titre>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.map((p) => (
          <a
            key={p.href}
            href={p.pret ? p.href : "#"}
            aria-disabled={!p.pret}
            className={`${CADRE} flex flex-col justify-between gap-6 p-5 transition-colors ${
              p.pret
                ? "hover:border-[#C8A96E]"
                : "cursor-default opacity-50"
            }`}
          >
            <div>
              <h2 className="font-clp text-[13px] font-bold uppercase leading-snug tracking-[0.08em]">
                {p.titre}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#A8A29A]">
                {p.detail}
              </p>
            </div>
            <span
              className="font-mono text-[11px]"
              style={{ color: p.pret ? LAITON : "#8A8A8A" }}
            >
              {p.pret ? p.href : "à venir"}
            </span>
          </a>
        ))}
      </div>
    </>
  );
}

/* ───────────────────────────────────────────────────────────────  Photos */

function Photos() {
  return (
    <>
      <Titre>Photos par type d&apos;événement</Titre>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES_PHOTOS.map((c) => (
          <figure key={c.slug} className={`${CADRE} overflow-hidden`}>
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={c.photo}
                alt={`${c.nom} Chez les Plombiers`}
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-[#3A3A3A] px-3 py-2.5 font-clp text-[10px] uppercase tracking-[0.12em]">
              {c.nom}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────  Clients */

/**
 * ⚠️ La grille de logos a été retirée le 20/09/2026. Étienne, sur la maquette
 * précédente : « en bas les logos puis le texte, c'est pas très chic ». Et sur
 * le fond : un logo est une image ; un moteur, un modèle de langage, un client
 * qui cherche « Prada rue des Bourdonnais » lisent du texte.
 * `CLIENTS` reste dans `data.ts` : les logos serviront ailleurs.
 */
function Clients() {
  return (
    <>
      <Titre>Ils sont venus</Titre>
      <div className={`${CADRE} p-5`}>
        <p className="max-w-4xl text-[15px] leading-relaxed">{CLIENTS_TEXTE}</p>
      </div>
    </>
  );
}

/* ───────────────────────────────────────────────────────────────  Règles */

function Regles() {
  return (
    <>
      <Titre>Horaires</Titre>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {REGLES.map(([quoi, quand]) => (
          <div key={quoi} className={`${CADRE} p-5`}>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#8A8A8A]">
              {quoi}
            </p>
            <p className="mt-1.5 text-[14px]">{quand}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────── Pied */

function Pied() {
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
      <a
        key="w"
        href="https://wa.me/33761471073"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        Écrire un message
      </a>,
    ],
    [
      "Instagram",
      <a
        key="i"
        href="https://instagram.com/chezlesplombiers"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
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
