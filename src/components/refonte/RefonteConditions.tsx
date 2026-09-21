import { Barre, Corps, LAITON, Page, Pied } from "./chrome";
import { ADRESSE } from "./data";
import { DEPOTS, DEPOT_MODALITES, MOMENTS } from "./regles";

/**
 * `/conditions` — ce qu'on vous demande.
 *
 * ⚠️ Ce n'est PAS la page des informations. La séparation vient d'Étienne, le
 * 20/09/2026, et elle est juste : « il y a des infos, mais il y a aussi des
 * demandes ». Une information dit ce que le lieu est — elle se lit avant de
 * réserver, par celui qui décide. Une demande dit ce qu'on attend de vous —
 * elle se lit après, par la production. Mélanger les deux alourdit la première
 * et affaiblit la seconde.
 *
 * ⚠️ Le contenu ne vit pas ici : il vit dans `regles.ts`, source unique. Ne pas
 * écrire une règle dans ce fichier — elle n'arriverait ni au concierge `/guide`
 * ni au contrat.
 *
 * Même langage que `/infos` : un document, pas des tuiles. On le lit en entier
 * une fois, et on y revient pour une ligne.
 */
export function RefonteConditions() {
  return (
    <Page>
      <Barre />
      <Corps>
        {/*
          ⚠️ PLEINE LARGEUR. La première version posait le chapô dans une
          colonne de 62 caractères pendant que le reste de la page en faisait
          le double : la page paraissait coupée en deux. Étienne : « il faut
          tout mettre sur la même largeur ».
        */}
        <div className="mt-3 border-b border-[var(--clp-bord)] pb-8 pt-4">
          <h1 className="font-clp uppercase">
            <span className="block text-sm font-bold leading-relaxed tracking-[0.1em]">
              Conditions de location
            </span>
            <span className="mt-1.5 block whitespace-nowrap text-[9px] font-normal leading-relaxed tracking-[0.06em] text-[#A8A29A] sm:text-[10px] sm:tracking-[0.08em]">
              {ADRESSE}
            </span>
          </h1>
          {/*
            ⚠️ Ne pas remettre « rien ici n'est du juridique » : Étienne l'a
            coupé. Et ne pas remonter le principe du ménage en tête de page —
            il est le chapô de « En partant », à sa place.
          */}
          <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-[#C9C4BC]">
            Voici les quelques règles qui nous permettent de bien fonctionner
            avec vous, et de continuer à recevoir dans un immeuble
            d&apos;habitation. Nous vous remercions par avance de votre
            attention.
          </p>
        </div>

        <div className="mt-8 gap-10 lg:flex lg:items-start">
          <nav
            aria-label="Sommaire"
            className="mb-10 lg:sticky lg:top-8 lg:mb-0 lg:w-56 lg:shrink-0"
          >
            <p className="font-clp text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
              Sur cette page
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 lg:block lg:space-y-2">
              {MOMENTS.map((m) => (
                <li key={m.id}>
                  <a
                    href={`#${m.id}`}
                    className="font-mono text-[12px] text-[#A8A29A] transition-colors hover:text-[#E8E4DC]"
                  >
                    {m.titre}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#depot"
                  className="font-mono text-[12px] text-[#A8A29A] transition-colors hover:text-[#E8E4DC]"
                >
                  Le dépôt de garantie
                </a>
              </li>
            </ul>
          </nav>

          <div className="min-w-0 flex-1">
            {MOMENTS.map((m) => (
              <section
                key={m.id}
                id={m.id}
                className="scroll-mt-8 border-b border-[var(--clp-bord)] py-10 first:pt-0"
              >
                <h2 className="font-clp text-[13px] font-bold uppercase tracking-[0.1em]">
                  {m.titre}
                </h2>
                <p className="mt-3 max-w-[70ch] text-[14px] italic leading-relaxed text-[#8A8A8A]">
                  {m.chapo}
                </p>

                <div className="mt-6 max-w-[70ch] space-y-6">
                  {m.regles.map((r) => (
                    <div key={r.titre}>
                      <p className="text-[15px] font-bold">{r.titre}</p>
                      {/*
                        Le pourquoi est dans le même paragraphe que la consigne,
                        volontairement : séparé, on ne le lit pas, et une
                        consigne sans raison se discute.
                      */}
                      <p className="mt-1 text-[15px] leading-[1.75] text-[#C9C4BC]">
                        {r.texte}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section id="depot" className="scroll-mt-8 py-10">
              <h2 className="font-clp text-[13px] font-bold uppercase tracking-[0.1em]">
                Le dépôt de garantie
              </h2>
              {/*
                ⚠️ TROIS MONTANTS, et LA BOUTIQUE n'en a pas. Étienne :
                « les 5 000 €, c'est que pour l'atelier ». Valeurs reprises de
                `venues.ts` dans le projet pricing, qui fait foi. Ne pas
                inventer une caution pour LA BOUTIQUE par souci de symétrie.
              */}
              <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed text-[#C9C4BC]">
                Son montant dépend de l&apos;espace que vous réservez.
              </p>
              <dl className="mt-5 max-w-[70ch] divide-y divide-[var(--clp-bord)] border-y border-[var(--clp-bord)]">
                {DEPOTS.map((d) => (
                  <div key={d.lieu} className="py-3.5 sm:flex sm:gap-6">
                    <dt
                      className="font-mono text-[12px] sm:w-44 sm:shrink-0"
                      style={{ color: LAITON }}
                    >
                      {d.lieu}
                    </dt>
                    <dd className="mt-1 font-mono text-[14px] text-[#E8E4DC] sm:mt-0">
                      {d.montant}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 max-w-[70ch] text-[14px] leading-relaxed text-[#8A8A8A]">
                {DEPOT_MODALITES}
              </p>
            </section>
          </div>
        </div>
      </Corps>
      <Pied />
    </Page>
  );
}
