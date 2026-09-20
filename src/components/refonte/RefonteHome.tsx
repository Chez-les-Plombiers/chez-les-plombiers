/* eslint-disable @next/next/no-html-link-for-pages --
 * `/tarifs` n'est PAS une route de cette application : c'est une autre zone
 * Next (le projet pricing), servie ici par réécriture. `next/link` tenterait
 * une navigation côté client vers une route que ce routeur ne connaît pas, et
 * le lien casserait. L'ancre classique est le bon outil.
 */
import Image from "next/image";
import { BandeauCLP } from "./BandeauCLP";
import {
  ADRESSE,
  CLIENTS,
  CLIENTS_TEXTE,
  ESPACES,
  INCLUS,
  REFERENCES,
  REGLES,
  SPECIFICATIONS,
} from "./data";

/**
 * Maquette de la page d'accueil — deuxième version, 20/09/2026.
 *
 * Reprise après les retours d'Étienne sur la première :
 *
 * - **Le bandeau blanc devient le système.** C'est le key visual de son
 *   Instagram : photo, bande blanche, monogramme, capitales espacées. On ne
 *   redessine pas une identité par-dessus une identité qui marche.
 * - **Plus de rangée de logos en haut** — « template des années 2010, un peu
 *   bullshit ». À la place, trois tuiles d'événements qui montrent la marque ET
 *   ce qu'elle a fait ici. Les logos redescendent, discrets.
 * - **Plus de bandeau noir de chiffres** — « on dirait les chiffres des
 *   agences, tant de cafés bus ». Les chiffres reviennent posés sur le papier,
 *   dans la section des équipements.
 * - **Plus de paragraphe à la première personne.** Il ne veut pas écrire
 *   « c'est moi qui fais les visites ». Un avant / après le dit mieux : le soin
 *   se voit, il ne se raconte pas.
 * - **Palette gris / blanc cassé**, en écho au sol de l'ATELIER. ⚠️ La
 *   référence RAL ne doit PAS être écrite sur le site.
 *
 * Composant serveur, sans état.
 */

const PAPER = "bg-[#F1EEE8] text-[#1B1A17]";
const RULE = "border-[#1B1A17]/14";
const EYEBROW =
  "font-display text-[11px] uppercase tracking-[0.2em] text-[#77716A]";
const H2 =
  "font-display font-normal normal-case leading-[1.05] tracking-[-0.02em]";

export function RefonteHome() {
  return (
    <div className={`${PAPER} min-h-screen antialiased`}>
      <Barre />
      <Ouverture />
      <Tuiles />
      <Espaces />
      <Inclus />
      <Signature />
      <References />
      <AvantApres />
      <Confiance />
      <Regles />
      <Fin />
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── Barre */

function Barre() {
  return (
    <header className={`sticky top-0 z-40 border-b ${RULE} bg-[#F1EEE8]/92 backdrop-blur`}>
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-3.5 sm:px-10">
        <Image
          src="/images/logo/monogramme-noir.png"
          alt="Chez les Plombiers"
          width={2709}
          height={1419}
          className="h-6 w-auto sm:h-7"
        />
        <nav className="hidden items-center gap-8 text-[13px] text-[#77716A] lg:flex">
          <a href="#espaces" className="transition-colors hover:text-[#1B1A17]">Les espaces</a>
          <a href="#inclus" className="transition-colors hover:text-[#1B1A17]">Ce qui est inclus</a>
          <a href="#references" className="transition-colors hover:text-[#1B1A17]">Références</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/tarifs"
            className="bg-[#1B1A17] px-4 py-2.5 font-display text-[10px] uppercase tracking-[0.18em] text-[#F1EEE8] transition-opacity hover:opacity-85 sm:text-[11px]"
          >
            Tarifs
          </a>
          <a
            href="#visiter"
            className={`hidden border ${RULE} px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-[#1B1A17] sm:block`}
          >
            Visiter
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────── Ouverture */

function Ouverture() {
  return (
    <section>
      {/*
        La photo d'abord, en grand, sans texte par-dessus — puis le bandeau
        blanc en dessous. C'est le key visual d'Instagram passé à l'échelle de
        la page, et ça règle au passage le reproche d'Étienne sur la première
        version : la barre de navigation disparaissait dans la photo.
      */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src="/photos/lieu/photo-00.jpg"
          alt="L'Atelier de Chez les Plombiers : canapé courbe rose, murs de béton brut et sol clair"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <BandeauCLP
        lignes={[
          "Chez les Plombiers",
          "Trois espaces — 39 rue des Bourdonnais",
          "Paris 1er, à deux pas du Pont Neuf",
        ]}
      />

      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-10 sm:py-20">
        <h1 className={`max-w-4xl text-[2.4rem] sm:text-6xl lg:text-7xl ${H2}`}>
          Trois espaces,
          <br />
          une seule adresse.
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#77716A] sm:text-base">
          Showrooms, lancements presse, dîners, tournages. La rue, la cour et
          l&apos;étage d&apos;un ancien atelier de plomberie, à deux pas du Pont
          Neuf.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/tarifs"
            className="bg-[#1B1A17] px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.18em] text-[#F1EEE8] transition-opacity hover:opacity-85"
          >
            Prix et disponibilités
          </a>
          <a
            href="#visiter"
            className={`border ${RULE} px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-[#1B1A17]`}
          >
            Réserver une visite
          </a>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── Tuiles */

/**
 * Trois événements en tuiles, à la place de la rangée de logos.
 *
 * Idée d'Étienne : montrer la marque ET ce qu'elle a fait ici, plutôt qu'un
 * alignement de logos qui « fait template d'agence ». Une tuile dit les deux.
 */
const TUILES = [
  {
    marque: "Servaire & Co",
    quoi: "Paris Design Week",
    photo: "/photos/servaire/projection-cyclo.jpg",
    alt: "Projection grand format sur le mur courbe pendant la Paris Design Week",
  },
  {
    marque: "Porsche",
    quoi: "Lancement du Cayenne électrique",
    photo: "/photos/lieu/photo-01.jpg",
    alt: "L'Atelier, accès de plain-pied et sol renforcé pour les lancements automobiles",
  },
  {
    marque: "Servaire & Co",
    quoi: "Cent cinquante invités, portes ouvertes sur la cour",
    photo: "/photos/servaire/invites-vitrine.jpg",
    alt: "Invités autour d'une vitrine pendant la soirée Servaire & Co",
  },
] as const;

function Tuiles() {
  return (
    <section className={`border-y ${RULE}`}>
      <div className="grid gap-px bg-[#1B1A17]/14 sm:grid-cols-3">
        {TUILES.map((t, i) => (
          <a
            key={`${t.marque}-${i}`}
            href="#references"
            className="group relative block aspect-[4/3] overflow-hidden bg-[#E4E0D8]"
          >
            <Image
              src={t.photo}
              alt={t.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1A17]/75 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-[15px] uppercase tracking-[0.16em] text-white">
                {t.marque}
              </p>
              <p className="mt-1 text-[13px] text-white/75">{t.quoi}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── Espaces */

function Espaces() {
  return (
    <section id="espaces">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-10 sm:py-24">
        <p className={EYEBROW}>Les espaces</p>
        <h2 className={`mt-4 max-w-3xl text-3xl sm:text-5xl ${H2}`}>
          La rue, la cour, l&apos;étage.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#77716A]">
          Ils ne se ressemblent pas et ne servent pas aux mêmes événements. Ils
          partagent la même adresse, le même soin, et les mêmes rideaux. On les
          loue séparément ou ensemble — et passer de l&apos;un à l&apos;autre,
          c&apos;est traverser une cour.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {ESPACES.map((e) => (
            <article key={e.slug}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E4E0D8]">
                <Image
                  src={e.photo}
                  alt={`${e.nom}, ${e.position.toLowerCase()}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Le bandeau blanc décliné par lieu — le système d'Instagram. */}
              <BandeauCLP
                lignes={[e.nom, `${e.surface} — ${e.capacite}`, e.position]}
                className="!px-4 !py-3.5"
              />

              <div className="pt-5">
                <p className="text-[14px] leading-relaxed text-[#77716A]">{e.texte}</p>
                <p className="mt-4 font-display text-[13px]">
                  <span className="text-[#1B1A17]">{e.prix}</span>{" "}
                  <span className="text-[#77716A]">HT la journée</span>
                </p>
                <a
                  href={`/tarifs/${e.slug}`}
                  className={`mt-3 inline-block border-b ${RULE} pb-0.5 font-display text-[11px] uppercase tracking-[0.16em] transition-colors hover:border-[#1B1A17]`}
                >
                  Calendrier et tarifs →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── Inclus */

function Inclus() {
  return (
    <section id="inclus" className={`border-t ${RULE} bg-[#E9E5DD]`}>
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr]">
          <div>
            <p className={EYEBROW}>Ce qui est inclus</p>
            <h2 className={`mt-4 text-3xl sm:text-4xl ${H2}`}>Tout est déjà là.</h2>

            {/*
              Les chiffres reviennent ici, posés sur le papier. Le bandeau noir
              de la première version faisait « chiffres d'agence » — mêmes
              données, sans l'effet plaquette.
            */}
            <dl className={`mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t ${RULE} pt-8`}>
              {SPECIFICATIONS.map((s) => (
                <div key={s.valeur}>
                  <dt className={`text-2xl sm:text-3xl ${H2}`}>{s.valeur}</dt>
                  <dd className="mt-1 font-display text-[10px] uppercase tracking-[0.16em] text-[#77716A]">
                    {s.unite}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <dl className={`grid gap-px border-t ${RULE} sm:grid-cols-2`}>
            {INCLUS.map((i) => (
              <div key={i.titre} className={`border-b ${RULE} py-5 pr-6`}>
                <dt className="font-display text-[15px] normal-case">{i.titre}</dt>
                <dd className="mt-1.5 text-[13.5px] leading-relaxed text-[#77716A]">
                  {i.texte}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── Signature */

function Signature() {
  return (
    <section className={`border-t ${RULE}`}>
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-2">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E4E0D8]">
          <Image
            src="/photos/servaire/seuil-cour.jpg"
            alt="Le seuil de l'Atelier vu depuis la cour pavée, portes ouvertes pendant un événement"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="lg:pl-6">
          <p className={EYEBROW}>Le passage</p>
          <h2 className={`mt-4 text-3xl sm:text-5xl ${H2}`}>
            Trois portes qui s&apos;ouvrent
            <br className="hidden sm:block" /> sur une cour pavée.
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#77716A]">
            On ne rentre pas dans l&apos;Atelier depuis la rue : on traverse une
            cour. Et pendant un événement, les trois portes s&apos;ouvrent en
            grand — la cour devient une pièce de plus, où l&apos;on sort prendre
            l&apos;air et se parler.
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#77716A]">
            C&apos;est aussi par là qu&apos;entrent les voitures, les
            scénographies et les livraisons. Une adresse sur rue, un lieu qui ne
            se donne qu&apos;une fois le porche franchi.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── Références */

function References() {
  const [phare, ...autres] = REFERENCES;

  return (
    <section id="references" className={`border-t ${RULE} bg-[#E9E5DD]`}>
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-10 sm:py-24">
        <p className={EYEBROW}>Références</p>
        <h2 className={`mt-4 max-w-3xl text-3xl sm:text-5xl ${H2}`}>
          Ce qui s&apos;est passé ici.
        </h2>

        <article className="mt-14">
          <h3 className={`text-2xl ${H2}`}>{phare.marque}</h3>
          <p className="mt-1 font-display text-[11px] uppercase tracking-[0.16em] text-[#77716A]">
            {phare.quoi} · {phare.quand}
          </p>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#77716A]">
            {phare.texte}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {phare.photos.map((p) => (
              <div
                key={p.src}
                className="relative aspect-[3/4] w-full overflow-hidden bg-[#E4E0D8]"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </article>

        <div className={`mt-16 grid gap-px border-t ${RULE} lg:grid-cols-3`}>
          {autres.map((r) => (
            <article key={r.marque} className={`border-b ${RULE} py-7 pr-8`}>
              <h3 className={`text-lg ${H2}`}>{r.marque}</h3>
              <p className="mt-1 font-display text-[11px] uppercase tracking-[0.16em] text-[#77716A]">
                {r.quoi}
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[#77716A]">
                {r.texte}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── Avant / après */

/**
 * Remplace le paragraphe à la première personne qu'Étienne a refusé.
 *
 * Il ne veut pas écrire « c'est moi qui fais les visites ». Deux photos au même
 * endroit, avril 2024 et aujourd'hui, disent la même chose sans qu'il ait à la
 * dire — et c'est plus difficile à contredire qu'une déclaration.
 */
function AvantApres() {
  return (
    <section className={`border-t ${RULE}`}>
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-10 sm:py-24">
        <p className={EYEBROW}>Avril 2024 — aujourd&apos;hui</p>
        <h2 className={`mt-4 max-w-2xl text-3xl sm:text-4xl ${H2}`}>
          C&apos;était un atelier de plomberie.
        </h2>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <figure>
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#E4E0D8]">
              <Image
                src="/photos/avant/atelier-avant-travaux.jpg"
                alt="Le lieu avant les travaux, en avril 2024 : sol de béton nu, murs décrépis"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="pt-2 font-display text-[10px] uppercase tracking-[0.16em] text-[#77716A]">
              Avril 2024
            </figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#E4E0D8]">
              <Image
                src="/photos/lieu/photo-02.jpg"
                alt="Le même volume aujourd'hui, sol clair et murs de béton conservés"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="pt-2 font-display text-[10px] uppercase tracking-[0.16em] text-[#77716A]">
              Aujourd&apos;hui
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── Confiance */

/** Les logos, redescendus et discrets — plus la liste en toutes lettres, lisible. */
function Confiance() {
  return (
    <section className={`border-t ${RULE}`}>
      <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-10 sm:py-14">
        <div className="grid grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-6 lg:grid-cols-9">
          {CLIENTS.map((c) => (
            <div key={c} className="relative h-6 w-full opacity-40 grayscale">
              <Image
                src={`/images/clients/${c}.png`}
                alt={c.replace(/-/g, " ")}
                fill
                sizes="140px"
                className="object-contain object-left"
              />
            </div>
          ))}
        </div>
        <p className="mt-7 max-w-4xl text-[13px] leading-relaxed text-[#77716A]">
          {CLIENTS_TEXTE}
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── Règles */

function Regles() {
  return (
    <section className={`border-t ${RULE} bg-[#E9E5DD]`}>
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-10 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:items-center">
          <div>
            <p className={EYEBROW}>Les règles, écrites d&apos;avance</p>
            <h2 className={`mt-4 text-2xl sm:text-3xl ${H2}`}>
              Un immeuble habité,
              <br className="hidden sm:block" /> des voisins qui dorment.
            </h2>
          </div>
          <ul className="grid gap-px sm:grid-cols-2">
            {REGLES.map((r) => (
              <li key={r} className={`border-t ${RULE} py-3.5 text-[15px] text-[#77716A]`}>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────  Fin */

function Fin() {
  return (
    <section id="visiter" className="bg-[#1B1A17] text-[#F1EEE8]">
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 sm:py-28">
        <h2 className={`max-w-3xl text-3xl sm:text-5xl ${H2}`}>Venez voir.</h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#F1EEE8]/70">
          La visite est gratuite et dure une demi-heure. Vous pouvez aussi
          regarder les prix et les dates libres avant, sans nous écrire.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="https://calendly.com/chezlesplombiers/visite"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F1EEE8] px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.18em] text-[#1B1A17] transition-opacity hover:opacity-85"
          >
            Réserver une visite
          </a>
          <a
            href="/tarifs"
            className="border border-[#F1EEE8]/45 px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[#F1EEE8] hover:text-[#1B1A17]"
          >
            Prix et disponibilités
          </a>
          <a
            href="https://wa.me/33761471073"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#F1EEE8]/45 px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[#F1EEE8] hover:text-[#1B1A17]"
          >
            WhatsApp
          </a>
        </div>

        <div className="mt-16">
          <Image
            src="/images/logo/logotype-adresse-blanc.png"
            alt={`Chez les Plombiers, ${ADRESSE}`}
            width={4501}
            height={1013}
            className="h-auto w-full max-w-[320px] opacity-80"
          />
          <p className="mt-6 font-display text-[10px] uppercase tracking-[0.18em] text-[#F1EEE8]/40">
            Maquette de travail, non publiée
          </p>
        </div>
      </div>
    </section>
  );
}
