import { Barre, CADRE, Corps, LAITON, Page, Pied, Retour, lien } from "./chrome";
import { PLANS, TECHNIQUE } from "./data-technique";

/**
 * `/atelier/technique` et `/atelier/plans` — la fiche du régisseur.
 *
 * Langage DOCUMENT, comme `/infos` : on ne scanne pas une fiche technique, on
 * la lit et on y revient. Sommaire collant, texte à une largeur tenable, tout
 * déplié (une fiche technique repliée ne s'imprime pas, et elle s'imprime).
 *
 * ⚠️ Ce n'est pas un doublon de la page du lieu. `/atelier` dit « Optoma
 * ZU820T, 8 800 lumens » ; ici on donne la connectique, les puissances, les
 * emplacements. Même sujet, deux profondeurs. Si une valeur change, elle
 * change AUX DEUX endroits.
 *
 * ⚠️ Les réserves sont affichées, pas cachées. Un régisseur qui dimensionne
 * une installation doit savoir ce qui est vérifié et ce qui ne l'est pas.
 */
export function RefonteTechnique() {
  return (
    <Page theme="atelier">
      <Barre lieu="L'ATELIER" />
      <Corps>
        <Retour href={lien("/atelier")} texte="L'Atelier" />
        <div className="border-b border-[var(--clp-bord)] pb-8 pt-4">
          <h1 className="font-clp uppercase">
            <span className="block text-sm font-bold leading-relaxed tracking-[0.1em]">
              Fiche technique — L&apos;Atelier
            </span>
          </h1>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#C9C4BC]">
            Les puissances, la connectique et les emplacements. Cette page est
            faite pour être envoyée telle quelle à un régisseur, un scénographe
            ou un prestataire technique.
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
            {/*
              ⚠️ UNE ENTRÉE PAR LIGNE SUR TÉLÉPHONE. Étienne, capture à
              l'appui : « le sommaire est mal calé ». En `flex-wrap`, cinq
              entrées de longueurs inégales se répartissaient sur trois lignes
              ragées — ça ne se lisait plus comme une liste mais comme un
              paragraphe cassé. Elles s'alignent dès `sm`, où la place revient.
            */}
            <ul className="mt-3 space-y-2 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2 sm:space-y-0 lg:block lg:space-y-2">
              {TECHNIQUE.map((p) => (
                <li key={p.titre}>
                  <a
                    href={`#${slug(p.titre)}`}
                    className="font-mono text-[12px] text-[#A8A29A] transition-colors hover:text-[#E8E4DC]"
                  >
                    {p.titre}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#plans"
                  className="font-mono text-[12px] text-[#A8A29A] transition-colors hover:text-[#E8E4DC]"
                >
                  Plans à télécharger
                </a>
              </li>
            </ul>
          </nav>

          <div className="min-w-0 flex-1">
            {TECHNIQUE.map((poste) => (
              <section
                key={poste.titre}
                id={slug(poste.titre)}
                className="scroll-mt-8 border-b border-[var(--clp-bord)] py-8 first:pt-0"
              >
                <h2 className="font-clp text-[13px] font-bold uppercase tracking-[0.1em]">
                  {poste.titre}
                </h2>
                <dl className="mt-4 max-w-[68ch] divide-y divide-[var(--clp-bord)] border-y border-[var(--clp-bord)]">
                  {poste.lignes.map(([quoi, valeur]) => (
                    <div key={quoi} className="py-3 sm:flex sm:gap-6">
                      <dt
                        className="font-mono text-[12px] sm:w-52 sm:shrink-0"
                        style={{ color: LAITON }}
                      >
                        {quoi}
                      </dt>
                      <dd className="mt-1 text-[14px] leading-relaxed text-[#C9C4BC] sm:mt-0">
                        {valeur}
                      </dd>
                    </div>
                  ))}
                </dl>
                {poste.reserve && (
                  /* Affichée, jamais masquée : c'est ce qui distingue une
                     fiche technique d'une plaquette. */
                  <p className="mt-4 max-w-[68ch] border-l-2 border-[#5E5E5E] pl-4 text-[13px] leading-relaxed text-[#8A8A8A]">
                    {poste.reserve}
                  </p>
                )}
              </section>
            ))}

            <section id="plans" className="scroll-mt-8 py-8">
              <h2 className="font-clp text-[13px] font-bold uppercase tracking-[0.1em]">
                Plans à télécharger
              </h2>
              <p className="mt-3 max-w-[62ch] text-[14px] leading-relaxed text-[#8A8A8A]">
                Les documents de l&apos;architecte et du géomètre, tels quels.
              </p>
              <div className="mt-5 grid max-w-[68ch] gap-3 sm:grid-cols-2">
                {PLANS.map((p) => (
                  <a
                    key={p.fichier}
                    href={p.fichier}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${CADRE} flex flex-col justify-between gap-4 p-5 transition-colors hover:border-[var(--clp-accent)]`}
                  >
                    <div>
                      <p className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
                        {p.nom}
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#A8A29A]">
                        {p.detail}
                      </p>
                    </div>
                    <span className="font-mono text-[11px]" style={{ color: LAITON }}>
                      PDF · {p.poids} ↓
                    </span>
                  </a>
                ))}
              </div>
              {/*
                ── TOUT PRENDRE D'UN COUP ──────────────────────────────────
                Demande d'Étienne, 23/09/2026. Un régisseur qui prépare une
                implantation les veut tous les quatre ; quatre clics, c'est
                quatre occasions d'en oublier un.

                ⚠️ L'ARCHIVE EST REFABRIQUÉE À CHAQUE DÉPLOIEMENT, par
                `gen-plans-zip.mjs` en `prebuild`. C'est la seule protection
                contre la dérive : un zip fabriqué une fois à la main devient
                faux dès qu'un plan est remplacé, sans que rien ne le
                signale — et c'est un document qu'on envoie à un prestataire.

                ⚠️ Le poids est annoncé. 9,6 Mo sur un téléphone en 4G, ça se
                décide avant de cliquer, pas après.
              */}
              <a
                href="/documents/plans-chez-les-plombiers.zip"
                download
                className={`${CADRE} mt-3 inline-flex max-w-[68ch] items-center gap-3 px-5 py-4 transition-colors hover:border-[var(--clp-accent)]`}
              >
                <span className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
                  Tout télécharger
                </span>
                <span className="font-mono text-[11px]" style={{ color: LAITON }}>
                  ZIP · 9,6 Mo ↓
                </span>
              </a>
            </section>
          </div>
        </div>
      </Corps>
      <Pied />
    </Page>
  );
}

/** Accents et espaces retirés, pour servir d'ancre. */
function slug(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
}
