import Image from "next/image";
import { Barre, CADRE, Corps, LAITON, Page, Pied } from "./chrome";
import { ADRESSE, FICHE_GOOGLE } from "./data";
import { INFOS_INTRO, SECTIONS, type Section } from "./data-infos";

/**
 * `/infos` — le document d'exploitation.
 *
 * ⚠️ C'est le SECOND langage du site, et il ne doit pas dériver vers le
 * premier. Pas de tuiles ici : du texte, à une largeur où l'œil tient la ligne
 * (≈ 68 caractères), avec un sommaire qui saute. Voir l'en-tête de
 * `data-infos.ts` pour le raisonnement complet.
 *
 * ⚠️ Tout est déplié. Ne pas « ranger » en accordéons : ⌘F ne trouverait plus
 * ce qui est replié, et l'impression sortirait une page de titres. Or c'est
 * exactement cette page qu'une agence imprime pour son transporteur.
 */
export function RefonteInfos() {
  return (
    <Page>
      <Barre />
      <Corps>
        <Entete />
        <div className="mt-8 gap-10 lg:flex lg:items-start">
          <Sommaire />
          <div className="min-w-0 flex-1">
            {SECTIONS.map((s) => (
              <Bloc key={s.id} section={s} />
            ))}
          </div>
        </div>
      </Corps>
      <Pied />
    </Page>
  );
}

function Entete() {
  return (
    <div className="mt-3 border-b border-[#3A3A3A] pb-8 pt-4">
      <h1 className="font-clp uppercase">
        <span className="block text-sm font-bold leading-relaxed tracking-[0.1em]">
          Venir, livrer, repartir
        </span>
        <span className="mt-1 block text-[11px] font-normal tracking-[0.16em] text-[#A8A29A]">
          {ADRESSE}
        </span>
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#C9C4BC]">
        {INFOS_INTRO}
      </p>
      <a
        href={FICHE_GOOGLE}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block font-mono text-[11px] text-[#8A8A8A] transition-colors hover:text-[#E8E4DC]"
      >
        Itinéraire et fiche Google →
      </a>
    </div>
  );
}

/**
 * Le sommaire.
 *
 * Collant sur grand écran, simple bande de liens au-dessus du texte sur
 * téléphone — une colonne collante n'a pas de sens quand il n'y a qu'une
 * colonne.
 */
function Sommaire() {
  return (
    <nav
      aria-label="Sommaire"
      className="mb-10 lg:sticky lg:top-8 lg:mb-0 lg:w-56 lg:shrink-0"
    >
      <p className="font-clp text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
        Sur cette page
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 lg:block lg:space-y-2">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="font-mono text-[12px] text-[#A8A29A] transition-colors hover:text-[#E8E4DC]"
            >
              {s.titre}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Bloc({ section }: { section: Section }) {
  return (
    <section
      id={section.id}
      // `scroll-mt` : sans ça, le titre se colle au bord haut de la fenêtre
      // après un saut depuis le sommaire.
      className="scroll-mt-8 border-b border-[#3A3A3A] py-10 first:pt-0 last:border-0"
    >
      <h2 className="font-clp text-[13px] font-bold uppercase tracking-[0.1em]">
        {section.titre}
      </h2>

      {section.texte.map((paragraphe) => (
        <p
          key={paragraphe}
          // ⚠️ 62ch, pas plus : au-delà, l'œil perd la ligne suivante. C'est la
          // différence la plus visible avec les pages en tuiles.
          className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-[#C9C4BC]"
        >
          {paragraphe}
        </p>
      ))}

      {section.photos && (
        /*
          Une photo occupe la largeur du texte ; deux se partagent la ligne.
          Le format reste 3/2 dans les deux cas : ce sont des photos de
          repérage, on les compare mieux au même cadre.
        */
        <div
          className={`mt-6 grid max-w-[68ch] gap-3 ${
            section.photos.length > 1 ? "sm:grid-cols-2" : "max-w-[62ch]"
          }`}
        >
          {section.photos.map((ph) => (
            <figure key={ph.src} className={`${CADRE} overflow-hidden`}>
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={ph.src}
                  alt={ph.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-[#3A3A3A] px-4 py-3 text-[12px] leading-relaxed text-[#8A8A8A]">
                {ph.legende}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {section.faits && (
        /*
         * Des faits, pas des tuiles : une liste de définitions. On les consulte
         * plus qu'on ne les lit, mais ils restent dans le fil du document.
         */
        <dl className="mt-6 max-w-[68ch] divide-y divide-[#3A3A3A] border-y border-[#3A3A3A]">
          {section.faits.map(([quoi, detail]) => (
            <div key={quoi} className="py-3.5 sm:flex sm:gap-6">
              <dt
                className="font-mono text-[12px] sm:w-56 sm:shrink-0"
                style={{ color: LAITON }}
              >
                {quoi}
              </dt>
              <dd className="mt-1 text-[14px] leading-relaxed text-[#C9C4BC] sm:mt-0">
                {detail}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {section.carte && (
        <div className={`${CADRE} mt-6 max-w-[68ch] overflow-hidden`}>
          <iframe
            src={section.carte}
            title="Chez les Plombiers, 39 rue des Bourdonnais, Paris 1er"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[300px] w-full border-0"
            /* La carte de Google arrive en blanc : on la calme pour qu'elle ne
               troue pas la page. Au survol, elle reprend ses vraies couleurs. */
            style={{ filter: "grayscale(1) invert(0.92) contrast(0.85)" }}
          />
        </div>
      )}

      {section.contacts && (
        <dl className="mt-6 max-w-[68ch] divide-y divide-[#3A3A3A] border-y border-[#3A3A3A]">
          {section.contacts.map((c) => (
            <div key={c.quoi} className="py-3.5 sm:flex sm:gap-6">
              <dt
                className="font-mono text-[12px] sm:w-56 sm:shrink-0"
                style={{ color: LAITON }}
              >
                {c.quoi}
              </dt>
              <dd className="mt-1 sm:mt-0">
                <a
                  href={c.href}
                  {...(c.externe
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-[14px] text-[#E8E4DC] underline decoration-[#5E5E5E] underline-offset-4 transition-colors hover:decoration-[#C8A96E]"
                >
                  {c.valeur}
                </a>
                <span className="mt-0.5 block text-[13px] leading-relaxed text-[#8A8A8A]">
                  {c.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      {section.groupes && (
        <div className="mt-6 grid max-w-[68ch] gap-6 sm:grid-cols-3">
          {section.groupes.map((g) => (
            <div key={g.titre}>
              <p className="font-mono text-[12px]" style={{ color: LAITON }}>
                {g.titre}
              </p>
              <ul className="mt-2 space-y-1.5">
                {g.liens.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#C9C4BC] underline decoration-[#5E5E5E] underline-offset-4 transition-colors hover:text-white hover:decoration-[#C8A96E]"
                    >
                      {l.nom}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
