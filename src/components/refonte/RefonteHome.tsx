/* eslint-disable @next/next/no-html-link-for-pages --
 * `/tarifs` n'est PAS une route de cette application : c'est une autre zone
 * Next (le projet pricing), servie ici par réécriture. `next/link` tenterait
 * une navigation côté client vers une route que ce routeur ne connaît pas.
 */
import Image from "next/image";
import {
  ADRESSE,
  CATEGORIES_PHOTOS,
  CLIENTS,
  CLIENTS_TEXTE,
  ESPACES,
  FAITS,
  PAGES,
  REGLES,
  TELEPHONE,
} from "./data";

/**
 * Page d'accueil — troisième version, 20/09/2026. Changement de nature.
 *
 * Les deux premières essayaient de faire une belle vitrine. Étienne a tranché
 * autre chose : « si on veut voir du beau, on va sur Instagram ; un site sert à
 * donner des informations ». Le site devient donc un **sommaire d'adresses
 * qu'on envoie**, et cette page en est l'index.
 *
 * Ce qui a disparu, et pourquoi :
 * - le héros plein écran et les bandeaux — « à l'ancienne » ;
 * - le monogramme répété — un système devenu un tic ;
 * - les récits et les adjectifs — remplacés par des faits chiffrés.
 *
 * Ce qui reste : le nom, l'adresse, les trois lieux avec leurs chiffres, les
 * six portes, quelques photos, les marques en toutes lettres. C'est aussi, mot
 * pour mot, ce dont un modèle de langage a besoin pour citer le lieu.
 *
 * ⚠️ Cette page porte 81 % du trafic Google du site, sur le nom et l'adresse.
 * Elle doit continuer à dire en texte « Chez les Plombiers », « 39 rue des
 * Bourdonnais », « Paris 1er », « lieu événementiel ». C'est non négociable.
 *
 * Composant serveur, sans état.
 */

const RULE = "border-[#1B1A17]/15";
const LABEL = "font-clp text-[10px] uppercase tracking-[0.2em] text-[#77716A]";

export function RefonteHome() {
  return (
    <div className="min-h-screen bg-[#F1EEE8] text-[#1B1A17] antialiased">
      <Barre />
      <Identite />
      <Espaces />
      <Faits />
      <Sommaire />
      <Photos />
      <Clients />
      <Regles />
      <Pied />
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── Barre */

function Barre() {
  return (
    <header className={`border-b ${RULE}`}>
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Image
          // ⚠️ `logotype-noir.png` fait 2000×2000 avec d'énormes marges blanches :
          // à hauteur fixe, le lettrage devient minuscule. `logo-black.png` est
          // la version détourée.
          src="/images/logo/logo-black.png"
          alt="Chez les Plombiers"
          width={790}
          height={156}
          priority
          className="h-5 w-auto sm:h-6"
        />
        <nav className="flex items-center gap-2">
          <a
            href="/tarifs"
            className="bg-[#1B1A17] px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] text-[#F1EEE8] transition-opacity hover:opacity-85"
          >
            Tarifs
          </a>
          <a
            href="https://calendly.com/chezlesplombiers/visite"
            target="_blank"
            rel="noopener noreferrer"
            className={`border ${RULE} px-4 py-2.5 font-clp text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[#1B1A17]`}
          >
            Visiter
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────────────────── Identité */

function Identite() {
  return (
    <section className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16">
        <h1 className="max-w-3xl font-clp text-2xl font-bold uppercase leading-[1.15] tracking-[0.04em] sm:text-4xl">
          Lieu événementiel
          <br />
          {ADRESSE}
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#514C45]">
          Trois espaces à la même adresse, à deux pas du Pont Neuf. Showrooms,
          lancements presse, dîners privés, défilés, expositions.
        </p>
      </div>

      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <Image
          src="/photos/lieu/atelier-kv.jpg"
          alt="L'Atelier : canapé courbe rose, murs de béton brut, sol clair"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── Espaces */

function Espaces() {
  return (
    <section className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <p className={LABEL}>Les trois espaces</p>
        <div className={`mt-6 grid gap-px border-t ${RULE} sm:grid-cols-3`}>
          {ESPACES.map((e) => (
            <a
              key={e.slug}
              href={e.href}
              className={`group border-b ${RULE} py-6 pr-6 transition-colors hover:bg-[#E7E2DA]`}
            >
              <h2 className="font-clp text-sm font-bold uppercase tracking-[0.1em]">
                {e.nom}
              </h2>
              <p className="mt-1 font-mono text-[11px] text-[#77716A]">
                {e.surface} · {e.capacite} · {e.position.toLowerCase()}
              </p>
              <p className="mt-4 font-mono text-[15px] font-bold">
                {e.prix}
                <span className="ml-1.5 text-[10px] font-normal text-[#77716A]">
                  HT / jour
                </span>
              </p>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-[#514C45]">
                {e.texte}
              </p>
              <span className="mt-3 inline-block font-clp text-[10px] uppercase tracking-[0.16em] text-[#8A6D2F] transition-colors group-hover:text-[#1B1A17]">
                Prix et disponibilités →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────── Faits */

function Faits() {
  const [premier, ...suite] = FAITS;

  return (
    <section className={`border-b ${RULE} bg-[#E7E2DA]`}>
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <p className={LABEL}>Ce que le lieu permet</p>

        {/*
          L'accès véhicule ouvre la liste, et en plus grand : c'est l'argument
          le plus rare du lieu, et le seul terrain non-marque où le site
          produise de vrais contacts. Demande explicite d'Étienne.
        */}
        <div className={`mt-6 border-t ${RULE} py-7`}>
          <p className="font-clp text-xl font-bold uppercase tracking-[0.06em] sm:text-3xl">
            {premier.valeur}
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#514C45]">
            {premier.detail}
          </p>
        </div>

        <dl className={`grid gap-px border-t ${RULE} sm:grid-cols-2 lg:grid-cols-3`}>
          {suite.map((f) => (
            <div key={f.valeur} className={`border-b ${RULE} py-5 pr-6`}>
              <dt className="font-mono text-base font-bold">{f.valeur}</dt>
              <dd className="mt-1.5 text-[13px] leading-relaxed text-[#514C45]">
                {f.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────  Sommaire */

function Sommaire() {
  return (
    <section className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <p className={LABEL}>Tout le site</p>
        <ul className={`mt-6 border-t ${RULE}`}>
          {PAGES.map((p) => (
            <li key={p.href} className={`border-b ${RULE}`}>
              <a
                href={p.pret ? p.href : "#"}
                aria-disabled={!p.pret}
                className={`flex flex-wrap items-baseline gap-x-5 gap-y-1 py-4 transition-colors ${
                  p.pret ? "hover:bg-[#E7E2DA]" : "cursor-default opacity-55"
                }`}
              >
                <span className="min-w-[15rem] font-clp text-sm font-bold uppercase tracking-[0.08em]">
                  {p.titre}
                </span>
                <span className="flex-1 text-[13px] text-[#77716A]">
                  {p.detail}
                </span>
                <span className="font-mono text-[11px] text-[#8A6D2F]">
                  {p.pret ? p.href : "à venir"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────  Photos */

function Photos() {
  return (
    <section className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className={LABEL}>Photos par type d&apos;événement</p>
          <span className="font-mono text-[11px] text-[#77716A]">
            /photos — à venir
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {CATEGORIES_PHOTOS.map((c) => (
            <figure key={c.slug}>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E7E2DA]">
                <Image
                  src={c.photo}
                  alt={`${c.nom} Chez les Plombiers`}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="pt-2 font-clp text-[10px] uppercase tracking-[0.14em]">
                {c.nom}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────  Clients */

function Clients() {
  return (
    <section className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-12">
        <p className={LABEL}>Ils sont venus</p>
        <div className="mt-6 grid grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-6 lg:grid-cols-9">
          {CLIENTS.map((c) => (
            <div key={c} className="relative h-6 w-full opacity-45 grayscale">
              <Image
                src={`/images/clients/${c}.png`}
                alt={c.replace(/-/g, " ")}
                fill
                sizes="120px"
                className="object-contain object-left"
              />
            </div>
          ))}
        </div>
        {/* Les noms en toutes lettres : un logo est une image, un modèle de
            langage lit ce texte, pas les pixels. */}
        <p className="mt-7 max-w-4xl text-[13px] leading-relaxed text-[#77716A]">
          {CLIENTS_TEXTE}
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────  Règles */

function Regles() {
  return (
    <section className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-12">
        <p className={LABEL}>Horaires</p>
        <dl className={`mt-5 grid gap-px border-t ${RULE} sm:grid-cols-4`}>
          {REGLES.map(([quoi, quand]) => (
            <div key={quoi} className={`border-b ${RULE} py-4 pr-6`}>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[#77716A]">
                {quoi}
              </dt>
              <dd className="mt-1 text-[14px]">{quand}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────── Pied */

function Pied() {
  return (
    <footer className="bg-[#1A1A1A] text-[#E8E4DC]">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <Image
          src="/images/logo/logotype-adresse-blanc.png"
          alt={`Chez les Plombiers, ${ADRESSE}`}
          width={4501}
          height={1013}
          className="h-auto w-full max-w-[280px]"
        />

        <dl className="mt-10 grid gap-x-8 gap-y-6 font-mono text-[13px] sm:grid-cols-4">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">Adresse</dt>
            <dd className="mt-1.5">{ADRESSE}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">Téléphone</dt>
            <dd className="mt-1.5">
              <a href={`tel:${TELEPHONE.replace(/\s/g, "")}`} className="hover:text-white">
                {TELEPHONE}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">WhatsApp</dt>
            <dd className="mt-1.5">
              <a
                href="https://wa.me/33761471073"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Écrire un message
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">Instagram</dt>
            <dd className="mt-1.5">
              <a
                href="https://instagram.com/chezlesplombiers"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                @chezlesplombiers
              </a>
            </dd>
          </div>
        </dl>

        <p className="mt-12 font-clp text-[10px] uppercase tracking-[0.18em] text-[#8A8A8A]">
          Maquette de travail, non publiée
        </p>
      </div>
    </footer>
  );
}
