import Image from "next/image";
import Link from "next/link";
import { Galerie } from "./Galerie";
import { Barre, CADRE, Corps, LAITON, Page, Pied } from "./chrome";
import { ADRESSE } from "./data";
import {
  CATEGORIES_GALERIE,
  type CategorieGalerie,
  type EvenementGalerie,
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
  const total = CATEGORIES_GALERIE.reduce((s, c) => s + c.total, 0);

  return (
    <Page>
      <Barre />
      <Corps>
        <div className="mt-3 border-b border-[var(--clp-bord)] pb-8 pt-4">
          <h1 className="font-clp uppercase">
            <span className="block text-sm font-bold leading-relaxed tracking-[0.1em]">
              Photos
            </span>
            <span className="mt-1.5 block whitespace-nowrap text-[9px] font-normal leading-relaxed tracking-[0.06em] text-[#A8A29A] sm:text-[10px] sm:tracking-[0.08em]">
              {ADRESSE}
            </span>
          </h1>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#C9C4BC]">
            {total} photos, prises pendant de vrais événements. Cliquez sur une
            image pour l&apos;agrandir, et téléchargez celles dont vous avez
            besoin.
          </p>
        </div>

        {/* Six en 3×2 : deux fois plus grandes qu'en ligne de cinq. */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES_GALERIE.map((c) => (
            <Vignette
              key={c.slug}
              href={`${LIEN}/${c.slug}`}
              photo={c.evenements[0].couverture}
              titre={c.nom}
              detail={`${c.total} photos · ${c.evenements.length} ${
                c.evenements.length > 1 ? "événements" : "événement"
              }`}
            />
          ))}
        </div>
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

function Retour({ href, texte }: { href: string; texte: string }) {
  return (
    <div className="mt-3 pt-4">
      <Link
        href={href}
        className="font-mono text-[11px] text-[#8A8A8A] transition-colors hover:text-[#E8E4DC]"
      >
        ← {texte}
      </Link>
    </div>
  );
}

function Vignette({
  href,
  photo,
  titre,
  detail,
}: {
  href: string;
  photo: { src: string; l: number; h: number };
  titre: string;
  detail: string;
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
          className="object-cover"
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
