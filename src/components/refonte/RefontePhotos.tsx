import Image from "next/image";
import Link from "next/link";
import { Galerie } from "./Galerie";
import { Barre, CADRE, Corps, LAITON, lien, Page, Pied, Retour } from "./chrome";
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

/*
 * ⚠️ PASSER PAR `lien()`, JAMAIS ÉCRIRE L'ADRESSE EN DUR. Ce fichier gardait
 * « /refonte/photos » : il a survécu à la bascule du 22/09 parce qu'il
 * court-circuitait le helper, et il ne fonctionnait plus que grâce à la
 * redirection de secours `/refonte/:path*` → `/:path*`.
 *
 * Ça marchait, donc rien ne l'a signalé — mais chaque clic payait un aller-
 * retour 301, et l'adresse affichée était fausse le temps du rebond. Le jour
 * où cette redirection de secours sera retirée, le lien tombe en 404.
 */
const LIEN = lien("/photos");

/* ───────────────────────────────────────────────────── Les six catégories */

export function RefontePhotosIndex() {
  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href={lien("/")} texte="Accueil" />
        {/*
          ⚠️ NI TITRE, NI TRAIT DE SÉPARATION. Deux retraits successifs
          d'Étienne le 21/09/2026 : d'abord l'adresse et la phrase
          d'explication, puis le titre lui-même — « comme on vient de cliquer
          sur Photos et qu'on en voit plein, j'enlèverais le titre Photos,
          j'enlèverais le trait de séparation, je remonterais un peu tout ça ».

          Il a raison : on arrive ici en cliquant « Photos », l'onglet du
          navigateur dit « Photos », et la page est couverte de photos. Le titre
          ne faisait que repousser le contenu d'un écran.

          ⚠️ Le `h1` reste, pour les lecteurs d'écran et pour Google — mais
          `sr-only`. Une page sans titre de niveau 1 est une page sans nom pour
          qui ne la voit pas.
        */}
        <h1 className="sr-only">Photos — Chez les Plombiers</h1>

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
    /* Ce que le sélecteur affiche quand on coche la catégorie. */
    enfants: c.evenements.map((e) => ({
      slug: e.slug,
      nom: e.nom,
      href: `${LIEN}/${c.slug}/${e.slug}`,
      detail: `${e.photos.length} photos`,
      photo: e.couverture,
      axe: "evenements" as const,
    })),
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
        {/*
          ── LE CHEMIN DE RETOUR VERS LE LIEU ──────────────────────────────

          ⚠️ LA RELATION ÉTAIT À SENS UNIQUE. La fiche d'un lieu renvoie vers
          ses photos par une tuile « Photos » ; l'inverse n'existait pas. On
          arrivait ici depuis `/boutique` et on ne pouvait plus y retourner
          autrement que par le bouton du navigateur. Étienne, 23/09/2026 :
          « on ne peut plus revenir sur la fiche de la boutique ».

          ⚠️ CE N'EST PAS UN BOUTON « RETOUR » AU SENS DU NAVIGATEUR, ET C'EST
          DÉLIBÉRÉ. Ce site est fait pour être ENVOYÉ : un régisseur reçoit
          `/infos` par message, un client reçoit `/photos/atelier`. Pour eux il
          n'existe aucune page précédente — un bouton fondé sur l'historique ne
          ferait rien, ou les sortirait du site, sans que son libellé puisse
          les prévenir. Un lien nommé marche aussi bien qu'on arrive d'un clic
          ou d'un lien reçu par message.

          ⚠️ LE « ← TOUTES LES PHOTOS » DU HAUT RESTE. C'est le parent dans
          l'adresse ; les deux chemins sont légitimes et ne se remplacent pas —
          l'un remonte dans la photothèque, l'autre traverse vers le lieu.

          ⚠️ Rien de tel sur les pages d'ÉVÉNEMENTS : un dîner ou un défilé
          n'appartient pas à un lieu unique dans les données. Ne pas
          généraliser ce lien par souci de symétrie.
        */}
        <a
          href={lien(`/${l.slug.replace(/^lieu-/, "")}`)}
          className={`${CADRE} mt-8 flex items-center justify-between gap-4 p-5 transition-colors hover:border-[var(--clp-accent)]`}
        >
          <span>
            <span className="block font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
              La fiche de {l.nom}
            </span>
            <span className="mt-1.5 block text-[13px] leading-relaxed text-[#A8A29A]">
              Dimensions, équipement, tarifs et disponibilités
            </span>
          </span>
          <span className="shrink-0 font-mono text-[11px]" style={{ color: LAITON }}>
            &rarr;
          </span>
        </a>
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
              legende={e.legende}
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
  legende,
}: {
  href: string;
  photo: { src: string; l: number; h: number };
  titre: string;
  detail: string;
  cadrage?: string;
  legende?: string;
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
        {/* La date, sous le nom : « Soirée des Plombiers » ne dit pas
            laquelle, et il y en aura d'autres. */}
        {legende && (
          <p className="mt-0.5 font-mono text-[11px] text-[#8A8A8A]">{legende}</p>
        )}
        <p className="mt-1 font-mono text-[11px]" style={{ color: LAITON }}>
          {detail} →
        </p>
      </div>
    </Link>
  );
}
