/* eslint-disable @next/next/no-html-link-for-pages -- voir chrome.tsx */
import { TuilePhotos } from "./TuilePhotos";
import { Barre, Bloc, CADRE, Corps, LAITON, Page, Pied, Titre } from "./chrome";
import { ADRESSE, ATELIER, ESPACES, FICHE_GOOGLE } from "./data";

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
 * ⚠️ Elle ne porte PLUS l'accès, le déchargement ni les horaires. Ces réponses
 * se posent APRÈS la décision de louer : elles sont sur `/infos`, en texte.
 * Les garder ici avait fait de la page un mur — Étienne : « trop de tuiles ».
 * Ne pas les rapatrier « parce que ça a l'air incomplet » : c'est complet pour
 * la question que cette page pose.
 *
 * ⚠️ La même charpente servira à `/boutique` et `/appartement`. Quand ce sera
 * le cas, ce fichier devra devenir générique plutôt qu'être recopié deux fois —
 * seules les données changent.
 */
export function RefonteAtelier() {
  const lieu = ESPACES[0];

  return (
    /*
     * ⚠️ ESSAI — le charbon marron de L'ATELIER, repris du calendrier tarifaire.
     * Étienne, 20/09/2026 : « tout ce qu'on avait mis en place en termes de code
     * couleur, on peut le récupérer sur les pages, ce serait joli. Peut-être que
     * ça ferait trop lourd, faudra faire un test. » Voici le test. Si c'est
     * trop, retirer `fond` et la page revient au charbon froid.
     */
    <Page fond="#1C1A17">
      <Barre lieu="L'ATELIER" />
      <Corps>
        <Ouverture photos={lieu.photos} prix={lieu.prix} />
        <EnBref />
        <Equipement />
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
          {/*
            Le même défilement que sur les tuiles de l'accueil — mais ici le
            clic agrandit au lieu de naviguer : on est déjà sur la page du lieu,
            il n'y a plus rien à ouvrir ailleurs.
          */}
          <TuilePhotos photos={photos} agrandir lieu="L'Atelier" />
        </div>

        <div className={`${CADRE} flex flex-col justify-between gap-6 p-5`}>
          <div>
            {/* ⚠️ Le H1 porte le nom du lieu ET l'adresse : le logo décliné
                au-dessus est une image, Google n'y lit rien. Et l'adresse doit
                y rester même si elle semble faire doublon — Étienne : « c'est
                pertinent, parce que si on envoie la fiche, on arrive
                directement par là ». */}
            {/*
              Deux graisses, deux tailles, dans un seul titre : le nom et la
              surface portent, l'adresse suit en plus petit. C'est la manière du
              calendrier tarifaire, qu'Étienne voulait retrouver ici.
            */}
            <h1 className="font-clp uppercase">
              <span className="block text-sm font-bold leading-relaxed tracking-[0.1em]">
                L&apos;Atelier — 200 m²
              </span>
              <span className="mt-1 block text-[11px] font-normal tracking-[0.16em] text-[#A8A29A]">
                {ADRESSE}
              </span>
            </h1>
            {ATELIER.intro.map((paragraphe) => (
              <p
                key={paragraphe}
                className="mt-3 text-[14px] leading-relaxed text-[#A8A29A]"
              >
                {paragraphe}
              </p>
            ))}
          </div>

          <div className="border-t border-[#3A3A3A] pt-4">
            <p className="font-mono text-xl font-bold">
              {prix}
              <span className="ml-1.5 text-[10px] font-normal text-[#8A8A8A]">
                HT / jour
              </span>
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#8A8A8A]">
              Ménage et régisseur compris. Le prix dépend du jour de la semaine.
            </p>
            {/*
              « Calendrier tarifaire » et pas « voir le calendrier » : le mot
              dit à lui seul qu'on y trouvera les jours libres ET les prix.
              Étienne : « ça implique qu'il y a un calendrier, donc on arrive à
              voir les jours dispo ou pas et qu'il y a les prix ».
            */}
            <a
              href="/tarifs"
              className="mt-3 inline-block font-mono text-[11px] uppercase tracking-wider"
              style={{ color: LAITON }}
            >
              Calendrier tarifaire →
            </a>
            <p className="mt-1 text-[11px] text-[#5E5E5E]">
              Les jours libres, et le prix de chaque date.
            </p>

            {/* La fiche Google : avis, horaires, itinéraire. Rien à refaire. */}
            <a
              href={FICHE_GOOGLE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-[#8A8A8A] transition-colors hover:text-[#E8E4DC]"
            >
              <span aria-hidden>📍</span> Voir la fiche Google
            </a>
          </div>
        </div>
      </div>
    </Bloc>
  );
}

/* ─────────────────────────────────────────────────────────────── En bref */

/** Les quatre nombres qu'on cherche en premier, sur une seule bande. */
function EnBref() {
  return (
    <Bloc>
      <div className={`${CADRE} grid grid-cols-2 divide-y divide-[#3A3A3A] sm:grid-cols-4 sm:divide-y-0 sm:divide-x`}>
        {ATELIER.enBref.map(([quoi, valeur]) => (
          <div key={quoi} className="px-5 py-4">
            <p className="font-mono text-[11px] text-[#8A8A8A]">{quoi}</p>
            <p className="mt-1 font-mono text-lg font-bold">{valeur}</p>
          </div>
        ))}
      </div>
    </Bloc>
  );
}

/* ───────────────────────────────────────────────────────────── Équipement */

/**
 * ⚠️ UNE seule section pour tout l'équipement, et pas deux.
 *
 * Il y avait « Les dimensions » puis « Ce qui est déjà là », et la projection
 * comme l'électricité figuraient dans les deux. Étienne : « j'ai peur que ce
 * soit un peu redondant… c'est trop disparate, il y a trop de trucs ». Le
 * découpage par thème règle les deux : chaque sujet est dit une fois, en
 * entier, au même endroit.
 *
 * ⚠️ Les intitulés de ligne ne sont plus en capitales interlettrées. À 10 px,
 * l'interlettrage rend le gris illisible — Étienne : « on le voit moins bien
 * parce qu'il est plus clair ». Ils sont en laiton, bas de casse, non traqués.
 */
function Equipement() {
  return (
    <>
      <Titre>La fiche du lieu</Titre>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ATELIER.equipement.map((theme) => (
          <div key={theme.titre} className={`${CADRE} p-5`}>
            <p className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
              {theme.titre}
            </p>
            <dl className="mt-4 space-y-3">
              {theme.lignes.map(([quoi, valeur]) => (
                <div key={quoi}>
                  <dt
                    className="font-mono text-[11px]"
                    style={{ color: LAITON }}
                  >
                    {quoi}
                  </dt>
                  <dd className="mt-0.5 text-[13px] leading-relaxed text-[#C9C4BC]">
                    {valeur}
                  </dd>
                </div>
              ))}
            </dl>
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
            /* ⚠️ BASCULE : `/infos` est encore la maquette. Retirer le préfixe
               le jour de la mise en ligne — une seule ligne à changer. */
            href={p.pret ? (p.href === "/infos" ? "/refonte/infos" : p.href) : undefined}
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
