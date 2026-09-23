import Image from "next/image";
import Link from "next/link";
import { Barre, CADRE, Corps, LAITON, Page, Pied, Retour, lien } from "./chrome";
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
          </h1>
          {/*
            ⚠️ Pas de mesure : le chapô tient sur une ligne. Même demande qu'à
            `/visiter`, 23/09/2026. Il fait 117 caractères pour 1 132 px de page.
            ⚠️ Les autres chapôs du site gardent leur mesure — mesurés, ils vont de
            163 à 227 caractères et se couperaient en deux lignes pleine largeur,
            exactement ce qu'on cherche à éviter ici.
          */}
          <p className="mt-4 text-[15px] leading-relaxed text-[#C9C4BC]">
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
          {/*
            ⚠️ DEUX COLONNES, POUR REMPLIR UN TROU. Étienne, capture à l'appui :
            la liste des services tenait sur 70 caractères et laissait la
            moitié droite de la page vide sur un grand écran.

            La photo est verticale, ce qui tombe bien : c'est le seul format
            qui accompagne une liste sans l'écraser. Et elle est cadrée VERS LE
            BAS — « qu'on voie le sol plutôt que le plafond ». Le sol clair est
            ce qui rend ce lieu louable ; les gaines du plafond, on les a déjà
            vues dix fois sur le site.
          */}
          <div className="mt-5 gap-8 lg:flex lg:items-stretch">
          <dl className="flex-1 divide-y divide-[var(--clp-bord)] border-y border-[var(--clp-bord)]">
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
            {/*
              ⚠️ `self-stretch` ET PAS UN FORMAT FIXE. Étienne : « il faut que
              la photo fasse la même hauteur que le texte qui est à gauche ».
              Avec un `aspect-[4/5]`, elle dépassait — et elle aurait dépassé
              d'autant plus à chaque prestation ajoutée. Là, elle suit la
              colonne de gauche quelle qu'en soit la longueur, et le recadrage
              se fait tout seul.
            */}
            <figure className={`${CADRE} m-0 mt-6 hidden overflow-hidden lg:mt-0 lg:block lg:w-[38%] lg:shrink-0 lg:self-stretch`}>
              <div className="relative h-full min-h-[320px] w-full">
                <Image
                  src="/photos/galerie/lieu-atelier/011.webp"
                  alt="L'Atelier, ses poteaux bruts et ses canapés roses, vu depuis le fond de la salle"
                  fill
                  sizes="(max-width: 1024px) 0px, 420px"
                  className="object-cover object-bottom"
                />
              </div>
            </figure>
          </div>
          <Link
            href={lien("/conditions")}
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
