import Image from "next/image";
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
 * Maquette de la page d'accueil — refonte du 20/09/2026.
 *
 * Trois partis pris, tous discutables et tous volontaires :
 *
 * 1. **On arrête de crier.** La feuille de style globale met TOUS les titres en
 *    capitales ; c'est ce qui fait le plus « site de 2018 ». Ici les grands
 *    énoncés sont en casse normale (`normal-case`), et les capitales sont
 *    réservées aux minuscules étiquettes. C'est le changement qui se voit le
 *    plus, pour le moins d'effort.
 * 2. **Les photos portent la couleur, la page n'en a pas.** Papier chaud, encre
 *    presque noire, filets fins. Le lieu est déjà coloré, la page ne doit pas
 *    lutter contre lui.
 * 3. **Les chiffres sont des éléments graphiques.** 800 kg/m², 4,63 m, 36 kVA :
 *    c'est ce que la concurrence ne donne jamais, et c'est ce qu'un modèle de
 *    langage reprend mot pour mot.
 *
 * Composant serveur, sans état : tout est statique, rien à hydrater.
 */

const PAPER = "bg-[#F7F5F1] text-[#16130F]";
const RULE = "border-[#16130F]/12";
const EYEBROW =
  "font-display text-[11px] uppercase tracking-[0.18em] text-[#6F6960]";

export function RefonteHome() {
  return (
    <div className={`${PAPER} min-h-screen antialiased`}>
      <Barre />
      <Ouverture />
      <Clients />
      <Espaces />
      <Chiffres />
      <Inclus />
      <Signature />
      <References />
      <Regles />
      <Hote />
      <Fin />
    </div>
  );
}

/* ───────────────────────────────────────────────────────────── Barre */

function Barre() {
  return (
    <header
      className={`sticky top-0 z-40 border-b ${RULE} bg-[#F7F5F1]/90 backdrop-blur`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-10">
        <span className="font-display text-[13px] uppercase tracking-[0.2em]">
          Chez les Plombiers
        </span>
        <nav className="hidden items-center gap-8 text-[13px] text-[#6F6960] md:flex">
          <a href="#espaces" className="transition-colors hover:text-[#16130F]">Les espaces</a>
          <a href="#inclus" className="transition-colors hover:text-[#16130F]">Ce qui est inclus</a>
          <a href="#references" className="transition-colors hover:text-[#16130F]">Références</a>
          <a href="/tarifs" className="transition-colors hover:text-[#16130F]">Tarifs</a>
        </nav>
        <a
          href="/tarifs"
          className="border border-[#16130F] px-4 py-2 font-display text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-[#16130F] hover:text-[#F7F5F1]"
        >
          Voir les tarifs
        </a>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────── Ouverture */

function Ouverture() {
  return (
    <section className="relative">
      <div className="relative h-[72vh] min-h-[480px] w-full sm:h-[82vh]">
        <Image
          src="/photos/canape-portes-atelier.jpg"
          alt="L'Atelier de Chez les Plombiers : murs de béton brut, sol clair, rideaux et canapé rose"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16130F]/70 via-[#16130F]/15 to-[#16130F]/10" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-10 sm:px-10 sm:pb-16">
          <h1 className="max-w-4xl font-display text-[2.6rem] font-normal normal-case leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
            Trois espaces,
            <br />
            une seule adresse.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">
            Showrooms, lancements presse, dîners, tournages. {ADRESSE}, à deux pas
            du Pont Neuf.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/tarifs"
              className="bg-white px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.16em] text-[#16130F] transition-opacity hover:opacity-85"
            >
              Prix et disponibilités
            </a>
            <a
              href="#visiter"
              className="border border-white/70 px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#16130F]"
            >
              Réserver une visite
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── Clients */

function Clients() {
  return (
    <section className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-10 sm:py-12">
        <div className="grid grid-cols-3 items-center gap-x-8 gap-y-7 sm:grid-cols-6 lg:grid-cols-9">
          {CLIENTS.map((c) => (
            <div key={c} className="relative h-7 w-full opacity-45 grayscale">
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
        {/*
          Les noms en toutes lettres sous les logos. Un logo est une image : un
          moteur et un modèle de langage lisent ce texte, pas les pixels.
        */}
        <p className="mt-8 max-w-4xl text-[13px] leading-relaxed text-[#6F6960]">
          {CLIENTS_TEXTE}
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── Espaces */

function Espaces() {
  return (
    <section id="espaces" className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24">
        <p className={EYEBROW}>Les espaces</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-normal normal-case leading-[1.05] tracking-[-0.02em] sm:text-5xl">
          La rue, la cour, l&apos;étage.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#6F6960]">
          Ils ne se ressemblent pas et ne servent pas aux mêmes événements. Ils
          partagent la même adresse, le même soin, et les mêmes rideaux. On les
          loue séparément, ou ensemble — et passer de l&apos;un à l&apos;autre,
          c&apos;est traverser une cour.
        </p>

        <div className="mt-14 grid gap-px sm:grid-cols-3">
          {ESPACES.map((e) => (
            <article key={e.slug} className="group">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDEAE5]">
                <Image
                  src={e.photo}
                  alt={`${e.nom} — ${e.texte.slice(0, 60)}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 bg-[#F7F5F1] px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.16em]">
                  {e.position}
                </span>
              </div>

              <div className="px-1 pt-5 sm:px-4">
                <h3 className="font-display text-xl font-normal normal-case tracking-[-0.01em]">
                  {e.nom}
                </h3>
                <p className="mt-1 font-display text-[11px] uppercase tracking-[0.14em] text-[#6F6960]">
                  {e.surface} · {e.capacite}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-[#6F6960]">
                  {e.texte}
                </p>
                <p className="mt-4 font-display text-[13px]">
                  À partir de{" "}
                  <span className="text-[#16130F]">{e.prix.split(" à ")[0]}</span>{" "}
                  <span className="text-[#6F6960]">HT la journée</span>
                </p>
                <a
                  href={`/tarifs/${e.slug}`}
                  className={`mt-4 inline-block border-b ${RULE} pb-0.5 font-display text-[11px] uppercase tracking-[0.14em] transition-colors hover:border-[#16130F]`}
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

/* ─────────────────────────────────────────────────────────────── Chiffres */

function Chiffres() {
  return (
    <section className="bg-[#16130F] text-[#F7F5F1]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {SPECIFICATIONS.map((s) => (
            <div key={s.valeur}>
              <p className="font-display text-4xl font-normal normal-case tracking-[-0.02em] sm:text-5xl">
                {s.valeur}
              </p>
              <p className="mt-1.5 font-display text-[11px] uppercase tracking-[0.16em] text-[#F7F5F1]/55">
                {s.unite}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#F7F5F1]/70">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────── Inclus */

function Inclus() {
  return (
    <section id="inclus" className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className={EYEBROW}>Ce qui est inclus</p>
            <h2 className="mt-4 font-display text-3xl font-normal normal-case leading-[1.05] tracking-[-0.02em] sm:text-4xl">
              Tout est déjà là.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#6F6960]">
              Vous arrivez, vous branchez, ça marche. Rien de ce qui suit
              n&apos;est en supplément — y compris le ménage, que la plupart des
              lieux facturent à part.
            </p>
          </div>

          <dl className={`grid gap-px border-t ${RULE} sm:grid-cols-2`}>
            {INCLUS.map((i) => (
              <div key={i.titre} className={`border-b ${RULE} py-5 pr-6`}>
                <dt className="font-display text-[15px] normal-case">{i.titre}</dt>
                <dd className="mt-1.5 text-[13.5px] leading-relaxed text-[#6F6960]">
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

/* ─────────────────────────────────────────────────────────────── Signature */

function Signature() {
  return (
    <section className={`border-b ${RULE}`}>
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-2">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDEAE5]">
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
          <h2 className="mt-4 font-display text-3xl font-normal normal-case leading-[1.05] tracking-[-0.02em] sm:text-5xl">
            Trois portes qui s&apos;ouvrent
            <br className="hidden sm:block" /> sur une cour pavée.
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#6F6960]">
            On ne rentre pas dans l&apos;Atelier depuis la rue : on traverse une
            cour. Et pendant un événement, les trois portes s&apos;ouvrent en
            grand — la cour devient une pièce de plus, où l&apos;on sort fumer,
            prendre l&apos;air, se parler.
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#6F6960]">
            C&apos;est aussi par là qu&apos;entrent les voitures, les
            scénographies et les livraisons. Une adresse sur rue, un lieu qui ne
            se donne qu&apos;une fois le porche franchi.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── Références */

function References() {
  const [phare, ...autres] = REFERENCES;

  return (
    <section id="references" className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24">
        <p className={EYEBROW}>Références</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-normal normal-case leading-[1.05] tracking-[-0.02em] sm:text-5xl">
          Ce qui s&apos;est passé ici.
        </h2>

        {/* Cas principal — Servaire, le seul récit qui montre tout à la fois. */}
        <article className="mt-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <h3 className="font-display text-2xl font-normal normal-case tracking-[-0.01em]">
                {phare.marque}
              </h3>
              <p className="mt-1 font-display text-[11px] uppercase tracking-[0.14em] text-[#6F6960]">
                {phare.quoi} · {phare.quand}
              </p>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#6F6960]">
                {phare.texte}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {phare.photos.map((p) => (
              <div
                key={p.src}
                className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDEAE5]"
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

        {/* Les autres cas, en liste sèche. */}
        <div className={`mt-16 grid gap-px border-t ${RULE} lg:grid-cols-3`}>
          {autres.map((r) => (
            <article key={r.marque} className={`border-b ${RULE} py-7 pr-8`}>
              <h3 className="font-display text-lg font-normal normal-case">
                {r.marque}
              </h3>
              <p className="mt-1 font-display text-[11px] uppercase tracking-[0.14em] text-[#6F6960]">
                {r.quoi}
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[#6F6960]">
                {r.texte}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────── Règles */

function Regles() {
  return (
    <section className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-10 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <div>
            <p className={EYEBROW}>Les règles, écrites d&apos;avance</p>
            <h2 className="mt-4 font-display text-2xl font-normal normal-case leading-tight tracking-[-0.01em] sm:text-3xl">
              Un immeuble habité,
              <br className="hidden sm:block" /> des voisins qui dorment.
            </h2>
          </div>
          <ul className="grid gap-px sm:grid-cols-2">
            {REGLES.map((r) => (
              <li
                key={r}
                className={`border-t ${RULE} py-3.5 text-[15px] text-[#6F6960]`}
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── Hôte */

function Hote() {
  return (
    <section className={`border-b ${RULE}`}>
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-20">
        <div className="max-w-2xl">
          <p className={EYEBROW}>Qui vous reçoit</p>
          <h2 className="mt-4 font-display text-2xl font-normal normal-case leading-tight tracking-[-0.01em] sm:text-4xl">
            C&apos;est moi qui fais les visites.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-[#6F6960]">
            Je m&apos;appelle Étienne, le lieu est à moi, et je suis là. C&apos;est
            moi qui vous ferai visiter, moi qui répondrai le soir de votre
            événement, et moi qui repeindrai le mur si quelque chose s&apos;abîme.
            Les rideaux, le mobilier, les lumières : tout a été choisi une pièce
            après l&apos;autre.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6F6960]">
            C&apos;est la raison pour laquelle il n&apos;y a que trois espaces, et
            pourquoi ils sont tous à la même adresse.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────── Fin */

function Fin() {
  return (
    <section id="visiter" className="bg-[#16130F] text-[#F7F5F1]">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28">
        <h2 className="max-w-3xl font-display text-3xl font-normal normal-case leading-[1.05] tracking-[-0.02em] sm:text-5xl">
          Venez voir.
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#F7F5F1]/70">
          La visite est gratuite et dure une demi-heure. Vous pouvez aussi
          regarder les prix et les dates libres avant, sans nous écrire.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="https://calendly.com/chezlesplombiers/visite"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F7F5F1] px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.16em] text-[#16130F] transition-opacity hover:opacity-85"
          >
            Réserver une visite
          </a>
          <a
            href="/tarifs"
            className="border border-[#F7F5F1]/50 px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-[#F7F5F1] hover:text-[#16130F]"
          >
            Prix et disponibilités
          </a>
          <a
            href="https://wa.me/33761471073"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#F7F5F1]/50 px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-[#F7F5F1] hover:text-[#16130F]"
          >
            WhatsApp
          </a>
        </div>

        <p className="mt-16 font-display text-[11px] uppercase tracking-[0.16em] text-[#F7F5F1]/45">
          {ADRESSE} · Maquette de travail, non publiée
        </p>
      </div>
    </section>
  );
}
