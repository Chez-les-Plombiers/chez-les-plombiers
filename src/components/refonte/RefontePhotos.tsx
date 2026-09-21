import Image from "next/image";
import Link from "next/link";
import { Galerie } from "./Galerie";
import { Barre, CADRE, Corps, LAITON, Page, Pied, Retour } from "./chrome";
import { SelecteurPhotos, type Tuile } from "./SelecteurPhotos";
import {
  CATEGORIES_GALERIE,
  LIEUX_GALERIE,
  type CategorieGalerie,
  type EvenementGalerie,
  type LieuGalerie,
} from "./photos-data";

/**
 * `/photos` — trois niveaux, et chacun répond à une question différente.
 *
 *   /photos                      « à quoi ça ressemble ? »
 *   /photos/diners               « et pour un dîner ? »
 *   /photos/diners/kim-attaf     « montre-moi celui-là en entier »
 *
 * ── POURQUOI PAR ÉVÉNEMENT, ET PAS UNE GRILLE UNIQUE ─────────────────────
 *
 * Une grille de 285 photos mélangées ne se regarde pas : on en scanne dix et
 * on s'en va. Découpée par événement, elle se lit — et elle dit trois choses
 * d'un coup : qu'on a l'habitude, que d'autres ont fait confiance, et que ce
 * sont de vrais événements et pas des photos de catalogue.
 *
 * ⚠️ Et les noms des marques sont du TEXTE. « TikTok », « Le Bon Coin »,
 * « Mugler », « Ray-Ban », « Oakley », « Secours populaire » : c'est ce qu'un
 * moteur indexe et ce qu'un modèle de langage reprend quand on lui demande où
 * louer à Paris. Une grille anonyme ne dit rien à personne.
 * Étienne a confirmé le 21/09/2026 qu'on peut tous les nommer.
 */

const LIEN = "/refonte/photos";

/* ───────────────────────────────────────────────────── Les six catégories */

export function RefontePhotosIndex() {
  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href="/refonte" texte="Accueil" />
        {/*
          ⚠️ Un titre, et rien dessous. Il y avait ici l'adresse et une phrase
          d'explication ; Étienne, 21/09/2026 : « ça sert à rien […] on s'en
          fiche. Les gens comprennent. » Une page qui s'appelle « Photos » et
          qui montre des photos n'a pas besoin qu'on la présente.
        */}
        <div className="border-b border-[var(--clp-bord)] pb-6 pt-4">
          <h1 className="font-clp text-sm font-bold uppercase leading-relaxed tracking-[0.1em]">
            Photos
          </h1>
        </div>

        <SelecteurPhotos tuiles={TUILES} />
      </Corps>
      <Pied />
    </Page>
  );
}

/**
 * Les tuiles des deux axes, dans l'ordre d'affichage : les lieux, puis les
 * types d'événements. Calculé ici, côté serveur — le sélecteur ne fait que
 * masquer, il n'a rien à recalculer.
 */
const TUILES: Tuile[] = [
  ...LIEUX_GALERIE.map((l) => ({
    slug: l.slug,
    nom: l.nom,
    /* Le préfixe `lieu-` sert au code, pas à l'URL. Voir la route. */
    href: `${LIEN}/${l.slug.replace(/^lieu-/, "")}`,
    detail: `${l.total} photos`,
    photo: l.couverture,
    axe: "lieux" as const,
  })),
  ...CATEGORIES_GALERIE.map((c) => ({
    slug: c.slug,
    nom: c.nom,
    href: `${LIEN}/${c.slug}`,
    detail: `${c.total} photos · ${c.evenements.length} ${
      c.evenements.length > 1 ? "événements" : "événement"
    }`,
    photo: c.couverture,
    cadrage: c.cadrage,
    axe: "evenements" as const,
  })),
];

/* ────────────────────────────────────────── Les photos d'un seul lieu */

/**
 * ⚠️ Un lieu n'a pas de sous-dossiers, contrairement à une catégorie : on
 * tombe directement sur ses photos. C'est voulu — « L'Atelier » n'a pas
 * d'« événements », c'est une pièce.
 */
export function RefontePhotosLieu({ l }: { l: LieuGalerie }) {
  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href={LIEN} texte="Toutes les photos" />
        <h1 className="mt-3 font-clp text-sm font-bold uppercase tracking-[0.1em]">
          {l.nom}
        </h1>
        <p className="mt-1.5 font-mono text-[11px]" style={{ color: LAITON }}>
          {l.total} photos
        </p>
        <Galerie photos={l.photos} titre={l.nom} />
      </Corps>
      <Pied />
    </Page>
  );
}

/* ──────────────────────────────────── Les événements d'une catégorie */

export function RefontePhotosCategorie({ c }: { c: CategorieGalerie }) {
  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href={LIEN} texte="Toutes les photos" />
        <h1 className="mt-3 font-clp text-sm font-bold uppercase tracking-[0.1em]">
          {c.nom}
        </h1>
        <p className="mt-1.5 font-mono text-[11px]" style={{ color: LAITON }}>
          {c.total} photos
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.evenements.map((e) => (
            <Vignette
              key={e.slug}
              href={`${LIEN}/${c.slug}/${e.slug}`}
              photo={e.couverture}
              titre={e.nom}
              detail={`${e.photos.length} photos`}
            />
          ))}
        </div>
      </Corps>
      <Pied />
    </Page>
  );
}

/* ─────────────────────────────────────────────── Un événement en entier */

export function RefontePhotosEvenement({
  c,
  e,
}: {
  c: CategorieGalerie;
  e: EvenementGalerie;
}) {
  const i = c.evenements.indexOf(e);
  const suivant = c.evenements[i + 1] ?? c.evenements[0];

  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href={`${LIEN}/${c.slug}`} texte={c.nom} />
        <h1 className="mt-3 font-clp text-sm font-bold uppercase tracking-[0.1em]">
          {e.nom}
        </h1>
        <p className="mt-1.5 font-mono text-[11px]" style={{ color: LAITON }}>
          {c.nom} · {e.photos.length} photos
        </p>

        <Galerie photos={e.photos} titre={e.nom} />

        {suivant !== e && (
          <div className="mt-10 border-t border-[var(--clp-bord)] pt-6">
            <Link
              href={`${LIEN}/${c.slug}/${suivant.slug}`}
              className="font-mono text-[12px] text-[#A8A29A] transition-colors hover:text-[#E8E4DC]"
            >
              {suivant.nom} →
            </Link>
          </div>
        )}
      </Corps>
      <Pied />
    </Page>
  );
}

/* ───────────────────────────────────────────────────────────── Communs */


function Vignette({
  href,
  photo,
  titre,
  detail,
  cadrage,
}: {
  href: string;
  photo: { src: string; l: number; h: number };
  titre: string;
  detail: string;
  cadrage?: string;
}) {
  return (
    <Link
      href={href}
      className={`${CADRE} group overflow-hidden transition-colors hover:border-[var(--clp-accent)]`}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={photo.src}
          alt={titre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className={`object-cover ${cadrage ?? ""}`}
        />
      </div>
      <div className="border-t border-[var(--clp-bord)] p-4">
        <p className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
          {titre}
        </p>
        <p className="mt-1 font-mono text-[11px]" style={{ color: LAITON }}>
          {detail} →
        </p>
      </div>
    </Link>
  );
}
