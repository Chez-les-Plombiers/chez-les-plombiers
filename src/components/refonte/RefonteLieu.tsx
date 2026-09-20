import { TuilePhotos } from "./TuilePhotos";
import { Barre, CADRE, Corps, LAITON, Page, Pied, Titre, lien } from "./chrome";
import {
  ADRESSE,
  APPARTEMENT,
  ATELIER,
  BOUTIQUE,
  ESPACES,
  FONDS,
} from "./data";

/**
 * La page d'un lieu — une seule, pour les trois.
 *
 * Elle répond à « c'est quoi, au juste ? » et y répond complètement :
 * dimensions, équipement, prix, et les adresses où aller ensuite. C'est celle
 * qu'on envoie à un client qui a vu une photo et veut savoir si ça tient.
 *
 * ⚠️ Elle NE REDONNE PAS la grille de prix. Les prix vivent à un seul endroit,
 * `/tarifs`. On annonce la fourchette, on renvoie au calendrier. Recopier la
 * grille ici garantirait qu'un jour les deux se contredisent — c'est
 * exactement ce qui est arrivé à la capacité et à la hauteur sous plafond, que
 * le site actuel donne avec deux valeurs différentes selon la page.
 *
 * ⚠️ Elle ne porte PLUS l'accès, le déchargement ni les horaires : ces
 * questions se posent après la décision de louer, et vivent sur `/infos`, en
 * texte. Les garder ici avait fait de la page un mur — Étienne : « trop de
 * tuiles ». Ne pas les rapatrier « parce que ça a l'air incomplet ».
 *
 * ⚠️ Une section sans données ne s'affiche pas. L'APPARTEMENT n'a pas encore
 * d'équipement connu : sa page saute la section plutôt que d'afficher des
 * généralités. C'est visible, et c'est voulu — ça rappelle ce qui manque.
 */

const LIEUX = { atelier: ATELIER, boutique: BOUTIQUE, appartement: APPARTEMENT };
export type SlugLieu = keyof typeof LIEUX;

export function RefonteLieu({ slug }: { slug: SlugLieu }) {
  const lieu = LIEUX[slug];
  const tuile = ESPACES.find((e) => e.slug === slug)!;

  return (
    <Page fond={FONDS[slug]}>
      <Barre lieu={lieu.nom.toUpperCase()} />
      <Corps>
        <Ouverture lieu={lieu} tuile={tuile} />
        {lieu.enBref.length > 0 && <EnBref lignes={lieu.enBref} />}
        {lieu.equipement.length > 0 && <Equipement themes={lieu.equipement} />}
        <Suite pages={lieu.suite} />
      </Corps>
      <Pied />
    </Page>
  );
}

type Lieu = (typeof LIEUX)[SlugLieu];
type Tuile = (typeof ESPACES)[number];

/* ────────────────────────────────────────────────────────────── Ouverture */

function Ouverture({ lieu, tuile }: { lieu: Lieu; tuile: Tuile }) {
  return (
    <section className="mt-3">
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <div className={`${CADRE} overflow-hidden`}>
          {/*
            Le même défilement que sur les tuiles de l'accueil — mais ici le
            clic agrandit au lieu de naviguer : on est déjà sur la page du lieu,
            il n'y a plus rien à ouvrir ailleurs.
          */}
          <TuilePhotos
            photos={tuile.photos}
            agrandir
            priority
            lieu={lieu.nom}
            ratio="aspect-[4/3] sm:aspect-[3/2]"
            sizes="(max-width: 1024px) 100vw, 760px"
          />
        </div>

        <div className={`${CADRE} flex flex-col justify-between gap-6 p-5`}>
          <div>
            {/*
              ⚠️ Le H1 porte le nom du lieu ET l'adresse : le logo décliné
              au-dessus est une image, Google n'y lit rien. Et l'adresse doit y
              rester même si elle semble faire doublon — Étienne : « c'est
              pertinent, parce que si on envoie la fiche, on arrive directement
              par là ».
            */}
            <h1 className="font-clp uppercase">
              {/* La surface est le premier mot de `meta` : « 200 m² · … ». */}
              <span className="block text-sm font-bold leading-relaxed tracking-[0.1em]">
                {lieu.nom} — {tuile.meta.split(" · ")[0]}
              </span>
              {/*
                ⚠️ Trois niveaux, et l'ordre compte. Le nom porte ; l'adresse
                suit, assez petite pour tenir sur une ligne ; « Pont Neuf » est
                plus petit encore, parce que ce n'est PAS l'adresse — Étienne :
                « c'est une indication en plus, genre : au fait, c'est vers
                Pont Neuf ».
              */}
              {/* ⚠️ 9 px et interlettrage resserré sous `sm` : Eurostile
                  Extended est large, et à 10 px l'adresse passait sur deux
                  lignes sur un iPhone. Étienne la veut sur une seule. */}
              <span className="mt-1.5 block whitespace-nowrap text-[9px] font-normal leading-relaxed tracking-[0.06em] text-[#A8A29A] sm:whitespace-normal sm:text-[11px] sm:tracking-[0.12em]">
                {ADRESSE}
              </span>
              <span className="mt-0.5 block text-[9px] font-normal tracking-[0.12em] text-[#6E6A64] sm:text-[10px]">
                Pont Neuf
              </span>
            </h1>
            {lieu.intro.map((paragraphe) => (
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
              {tuile.prix}
              <span className="ml-1.5 text-[10px] font-normal text-[#8A8A8A]">
                HT / jour
              </span>
            </p>
            {/*
              ⚠️ Plus de « régisseur compris » : il devient une prestation
              facturée à part (décision d'Étienne, 20/09/2026). Et « ménage de
              sortie », pas « ménage » : le ménage quotidien d'un événement de
              plusieurs jours n'est pas inclus.
            */}
            <p className="mt-1 text-[12px] leading-relaxed text-[#8A8A8A]">
              Le prix dépend du jour de la semaine. Ménage de sortie compris.
            </p>
            {/*
              « Calendrier tarifaire » et pas « voir le calendrier » : le mot
              dit à lui seul qu'on y trouvera les jours libres ET les prix.
            */}
            <a
              href={tuile.tarifs}
              className="mt-3 inline-block font-mono text-[11px] uppercase tracking-wider"
              style={{ color: LAITON }}
            >
              Calendrier tarifaire →
            </a>

            {/*
              ⚠️ Ne PAS remettre la fiche Google ici. Elle y était jusqu'au
              20/09/2026 et elle n'y avait pas sa place : à côté d'un prix, on
              cherche une disponibilité, pas un itinéraire. Sur iPhone, les
              deux liens finissaient même sur la même ligne, collés. Elle est
              au pied de page, donc sur TOUTES les pages — c'est là qu'on
              cherche une adresse.
            */}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── En bref */

/** Les nombres qu'on cherche en premier, sur une seule bande. */
function EnBref({ lignes }: { lignes: readonly (readonly [string, string])[] }) {
  return (
    <section className="mt-3">
      <div
        className={`${CADRE} grid grid-cols-2 divide-[#3A3A3A] sm:divide-x ${
          lignes.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4"
        }`}
      >
        {lignes.map(([quoi, valeur]) => (
          <div key={quoi} className="border-t border-[#3A3A3A] px-5 py-4 first:border-t-0 sm:border-t-0">
            <p className="font-mono text-[11px] text-[#8A8A8A]">{quoi}</p>
            <p className="mt-1 font-mono text-lg font-bold">{valeur}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────── Équipement */

/**
 * ⚠️ UNE seule section pour tout l'équipement, et pas deux.
 *
 * Il y avait « Les dimensions » puis « Ce qui est déjà là », et la projection
 * comme l'électricité figuraient dans les deux. Étienne : « j'ai peur que ce
 * soit un peu redondant… c'est trop disparate ». Le découpage par thème règle
 * les deux : chaque sujet est dit une fois, en entier, au même endroit.
 *
 * ⚠️ Les intitulés de ligne ne sont pas en capitales interlettrées. À 10 px,
 * l'interlettrage rend le gris illisible — Étienne : « on le voit moins bien
 * parce qu'il est plus clair ».
 */
function Equipement({
  themes,
}: {
  themes: readonly {
    titre: string;
    lignes: readonly (readonly [string, string])[];
  }[];
}) {
  return (
    <>
      <Titre>La fiche du lieu</Titre>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <div key={theme.titre} className={`${CADRE} p-5`}>
            <p className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
              {theme.titre}
            </p>
            <dl className="mt-4 space-y-3">
              {theme.lignes.map(([quoi, valeur]) => (
                <div key={quoi}>
                  <dt className="font-mono text-[11px]" style={{ color: LAITON }}>
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

function Suite({
  pages,
}: {
  pages: readonly { href: string; titre: string; detail: string; pret: boolean }[];
}) {
  return (
    <>
      <Titre>Pour aller plus loin</Titre>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pages.map((p) => (
          <a
            key={p.href}
            href={p.pret ? lien(p.href) : undefined}
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
