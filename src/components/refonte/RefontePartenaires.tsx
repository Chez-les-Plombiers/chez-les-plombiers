import Image from "next/image";
import Link from "next/link";
import { Barre, CADRE, Corps, LAITON, Page, Pied, Retour, lien } from "./chrome";
import { ADRESSE } from "./data";
import { PARTENAIRES, SERVICES } from "./data-partenaires";

/**
 * `/partenaires` — langage DOCUMENT, comme `/infos` et `/conditions`.
 *
 * ⚠️ Deux niveaux, et la mise en page les distingue : les partenaires ont une
 * photo, un texte et des liens ; les services sont une simple liste. Ce n'est
 * pas une hiérarchie de valeur, c'est une hiérarchie d'exposition — on ne
 * publie pas le nom d'un prestataire comme on présente un associé.
 */
export function RefontePartenaires() {
  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href={lien("/")} texte="Accueil" />
        <div className="border-b border-[var(--clp-bord)] pb-8 pt-4">
          <h1 className="font-clp uppercase">
            <span className="block text-sm font-bold leading-relaxed tracking-[0.1em]">
              Partenaires
            </span>
            <span className="mt-1.5 block whitespace-nowrap text-[9px] font-normal leading-relaxed tracking-[0.06em] text-[#A8A29A] sm:text-[10px] sm:tracking-[0.08em]">
              {ADRESSE}
            </span>
          </h1>
          <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-[#C9C4BC]">
            Le lieu ne vient pas seul. Voici les personnes avec qui nous
            travaillons, et ce que nous pouvons organiser pour vous.
          </p>
        </div>

        {PARTENAIRES.map((p) => (
          <section key={p.nom} className="mt-8">
            <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
              {p.photo && (
                <div className={`${CADRE} overflow-hidden`}>
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={p.photo.src}
                      alt={p.photo.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div className={`${CADRE} flex flex-col justify-between gap-6 p-5`}>
                <div>
                  <h2 className="font-clp text-sm font-bold uppercase tracking-[0.1em]">
                    {p.nom}
                  </h2>
                  <p className="mt-1 font-mono text-[11px]" style={{ color: LAITON }}>
                    {p.role}
                  </p>
                  {p.texte.map((t) => (
                    <p
                      key={t}
                      className="mt-3 text-[14px] leading-relaxed text-[#C9C4BC]"
                    >
                      {t}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--clp-bord)] pt-4">
                  {p.liens.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[12px] transition-colors hover:text-[#E8E4DC]"
                      style={{ color: LAITON }}
                    >
                      {l.nom} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="mt-10 border-t border-[var(--clp-bord)] pt-8">
          <h2 className="font-clp text-[13px] font-bold uppercase tracking-[0.1em]">
            Ce que nous organisons
          </h2>
          <dl className="mt-5 max-w-[70ch] divide-y divide-[var(--clp-bord)] border-y border-[var(--clp-bord)]">
            {SERVICES.map((s) => (
              <div key={s.titre} className="py-3.5 sm:flex sm:gap-6">
                <dt
                  className="font-mono text-[12px] sm:w-40 sm:shrink-0"
                  style={{ color: LAITON }}
                >
                  {s.titre}
                </dt>
                <dd className="mt-1 text-[14px] leading-relaxed text-[#C9C4BC] sm:mt-0">
                  {s.texte}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href="/refonte/conditions"
            className="mt-5 inline-block font-mono text-[12px]"
            style={{ color: LAITON }}
          >
            Conditions de location →
          </Link>
        </section>
      </Corps>
      <Pied />
    </Page>
  );
}
