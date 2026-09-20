/* eslint-disable @next/next/no-html-link-for-pages -- voir chrome.tsx */
import { TuilePhotos } from "./TuilePhotos";
import { Barre, Bloc, CADRE, Corps, LAITON, Page, Pied, Titre } from "./chrome";
import { ADRESSE, ATELIER, ESPACES, REGLES } from "./data";

/**
 * `/atelier` — la page du lieu.
 *
 * Elle répond à la question « c'est quoi, au juste ? », et elle y répond
 * complètement : dimensions, équipement, accès, horaires. C'est la page qu'on
 * envoie à un client qui a vu une photo et veut savoir si ça tient.
 *
 * ⚠️ Elle NE REDONNE PAS la grille de prix. Les prix vivent à un seul endroit,
 * `/tarifs`. On annonce la fourchette, on renvoie au calendrier. Recopier la
 * grille ici garantirait qu'un jour les deux se contredisent — c'est
 * exactement ce qui vient d'arriver à la capacité et à la hauteur sous plafond,
 * que le site actuel donne avec deux valeurs différentes selon la page.
 *
 * ⚠️ La même charpente servira à `/boutique` et `/appartement`. Quand ce sera
 * le cas, ce fichier devra devenir générique plutôt qu'être recopié deux fois —
 * seules les données changent.
 */
export function RefonteAtelier() {
  const lieu = ESPACES[0];

  return (
    <Page>
      <Barre lieu="L'ATELIER" />
      <Corps>
        <Ouverture photos={lieu.photos} prix={lieu.prix} />
        <Chiffres />
        <Equipement />
        <Acces />
        <Horaires />
        <Suite />
      </Corps>
      <Pied />
    </Page>
  );
}

/* ────────────────────────────────────────────────────────────── Ouverture */

function Ouverture({
  photos,
  prix,
}: {
  photos: readonly string[];
  prix: string;
}) {
  return (
    <Bloc>
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <div className={`${CADRE} overflow-hidden`}>
          {/* Le même défilement que sur les tuiles de l'accueil : on ne
              réinvente pas un second carrousel pour trois photos de plus. */}
          <TuilePhotos photos={photos} href="/photos" lieu="L'Atelier" />
        </div>

        <div className={`${CADRE} flex flex-col justify-between gap-6 p-5`}>
          <div>
            {/* ⚠️ Le H1 porte le nom du lieu ET l'adresse : le logo décliné
                au-dessus est une image, Google n'y lit rien. */}
            <h1 className="font-clp text-sm font-bold uppercase leading-relaxed tracking-[0.1em]">
              L&apos;Atelier — 200 m² au {ADRESSE}
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-[#A8A29A]">
              {ATELIER.intro}
            </p>
          </div>

          <div className="border-t border-[#3A3A3A] pt-4">
            <p className="font-mono text-xl font-bold">
              {prix}
              <span className="ml-1.5 text-[10px] font-normal text-[#8A8A8A]">
                HT / jour
              </span>
            </p>
            <p className="mt-1 text-[12px] text-[#8A8A8A]">
              Ménage et régisseur compris. Le prix dépend du jour.
            </p>
            <a
              href="/tarifs"
              className="mt-3 inline-block font-mono text-[11px] uppercase tracking-wider"
              style={{ color: LAITON }}
            >
              Voir le calendrier →
            </a>
          </div>
        </div>
      </div>
    </Bloc>
  );
}

/* ─────────────────────────────────────────────────────────────── Chiffres */

function Chiffres() {
  return (
    <>
      <Titre>Les dimensions</Titre>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {ATELIER.chiffres.map(([quoi, valeur, precision]) => (
          <div key={quoi} className={`${CADRE} p-5`}>
            <p className="font-clp text-[10px] uppercase tracking-[0.16em] text-[#8A8A8A]">
              {quoi}
            </p>
            <p className="mt-2 font-mono text-[15px] font-bold leading-snug">
              {valeur}
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#8A8A8A]">
              {precision}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ───────────────────────────────────────────────────────────── Équipement */

function Equipement() {
  return (
    <>
      <Titre>Ce qui est déjà là</Titre>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ATELIER.equipement.map(([quoi, detail]) => (
          <div key={quoi} className={`${CADRE} p-5`}>
            <p className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
              {quoi}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#A8A29A]">
              {detail}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────── Accès */

function Acces() {
  return (
    <>
      <Titre>Entrer, livrer, circuler</Titre>
      <div className="grid gap-3 sm:grid-cols-2">
        {ATELIER.acces.map(([quoi, detail]) => (
          <div key={quoi} className={`${CADRE} p-5`}>
            <p className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
              {quoi}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#A8A29A]">
              {detail}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────── Horaires */

function Horaires() {
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

/* ────────────────────────────────────────────────────────────────── Suite */

function Suite() {
  return (
    <>
      <Titre>Pour aller plus loin</Titre>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ATELIER.suite.map((p) => (
          <a
            key={p.href}
            href={p.pret ? p.href : undefined}
            aria-disabled={!p.pret}
            className={`${CADRE} flex flex-col justify-between gap-6 p-5 transition-colors ${
              p.pret ? "hover:border-[#C8A96E]" : "cursor-default opacity-50"
            }`}
          >
            <div>
              <p className="font-clp text-[12px] font-bold uppercase leading-snug tracking-[0.08em]">
                {p.titre}
              </p>
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
