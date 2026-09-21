import Image from "next/image";
import Link from "next/link";
import { TuilePhotos } from "./TuilePhotos";
import { CATEGORIES_GALERIE } from "./photos-data";
import { Barre, Bloc, CADRE, Corps, LAITON, Page, Pied, Titre, lien } from "./chrome";
import {
  ADRESSE,
  CLIENTS_TEXTE,
  ESPACES,
  OUVERTURE,
  PAGES,
} from "./data";

/**
 * Page d'accueil — quatrième version, 20/09/2026. Fond charbon, blocs encadrés.
 *
 * ── LE SYSTÈME, ET POURQUOI ──────────────────────────────────────────────
 *
 * 1. FOND CHARBON. Pas un goût : le calendrier tarifaire est déjà charbon, et
 *    c'est la page qu'Étienne envoie le plus. Un site beige qui débouche sur un
 *    calendrier noir, ce sont deux objets. Le vocabulaire est fixé dans le
 *    `globals.css` du pricing : CHARBON #1A1A1A pour le site, CHARBON MARRON
 *    pour L'ATELIER, bleu pour LA BOUTIQUE, rose pour L'APPARTEMENT.
 *
 * 2. DES BLOCS, PAS DES BANDES. Chaque information vit dans un cadre, dans un
 *    conteneur à marges. Étienne : « quand la photo prend toute la largeur, ça
 *    fait site des années 2010 ». Un bloc encadré se lit comme une fiche.
 *    Plusieurs blocs de même largeur par ligne, en grille.
 *
 * 3. PAS DE « LIRE PLUS ». Un site qui existe pour répondre ne met pas un clic
 *    entre la question et la réponse. Les blocs sont courts ET complets ; le
 *    développé est une vraie page qu'on peut envoyer (`/atelier/plans`).
 *
 * 4. PAS DE TITRE QUI CRIE. « Une voiture peut entrer » en capitales de 40 px
 *    était de la réclame (Étienne : « c'est too much »). La photo de la Triumph
 *    à l'intérieur prouve la même chose sans un mot.
 *
 * ⚠️ SEO — le point à ne pas casser. Cette page porte 81 % du trafic Google du
 * site, sur le nom et l'adresse. Le logo à l'adresse est une IMAGE : Google n'y
 * lit rien. L'adresse doit donc rester en TEXTE dans le H1, même à taille
 * modeste. Ne pas supprimer ce H1 en trouvant qu'il fait doublon avec le logo.
 *
 * Composant serveur, sans état.
 */

export function RefonteHome() {
  return (
    <Page>
      <Barre />
      <Corps>
        <Ouverture />
        <Espaces />
        <Preuve />
        <Photos />
        <Clients />
        <Sommaire />
      </Corps>
      <Pied />
    </Page>
  );
}

/* ────────────────────────────────────────────────────────────── Ouverture */

function Ouverture() {
  return (
    <Bloc>
      <div className={`${CADRE} overflow-hidden`}>
        {/*
          Trois vues, une par lieu, chacune nommée et menant chez elle. Même
          mécanique que les tuiles : défilement natif avec accroche, flèches
          par-dessus, glissement au doigt.
        */}
        <TuilePhotos
          photos={OUVERTURE.map((v) => v.src)}
          href={OUVERTURE.map((v) => lien(v.href))}
          etiquettes={OUVERTURE.map((v) => v.nom)}
          lieu="Chez les Plombiers"
          priority
          ratio="aspect-[16/10] sm:aspect-[21/9]"
          sizes="(max-width: 1180px) 100vw, 1180px"
        />
        <div className="border-t border-[var(--clp-bord)] px-5 py-5">
          {/* ⚠️ Le H1 : modeste en taille, mais c'est le texte que Google lit. */}
          {/*
            « Lieux » au pluriel : il y en a trois depuis l'ouverture de LA
            BOUTIQUE. « Pont Neuf » situe — le 1er arrondissement est vaste.

            ⚠️ Deux lignes, deux graisses. En une seule, le titre tombait sur
            quatre lignes de capitales grasses sur un iPhone — Étienne : « c'est
            un peu gros, ce serait bien que ce soit plus fin, plus élégant ».
            L'adresse, elle, reste en TEXTE : c'est elle que Google lit.
          */}
          <h1 className="font-clp uppercase">
            {/*
              ⚠️ LE CHIFFRE 3, ET PAS « LIEUX » AU PLURIEL. Remarque de Céline,
              relayée par Étienne le 21/09/2026 : sur un petit écran, quelqu'un
              qui ne voit que le haut de la page croit qu'il n'y a qu'un lieu.
              « Lieux » au pluriel ne se remarque pas ; « 3 » se remarque.
              Les trois noms suivent sur la même ligne : ils étaient répétés
              plus bas, ce doublon a été retiré.
            */}
            <span className="block text-[13px] font-bold leading-relaxed tracking-[0.1em] sm:text-sm">
              3 lieux événementiels
            </span>
            <span className="mt-1 block text-[11px] font-bold leading-relaxed tracking-[0.12em] sm:text-[12px]">
              L&apos;Atelier · La Boutique · L&apos;Appartement
            </span>
            {/* Une seule ligne sur téléphone : voir le commentaire jumeau
                dans RefonteLieu.tsx. */}
            <span className="mt-1.5 block whitespace-nowrap text-[9px] font-normal leading-relaxed tracking-[0.06em] text-[#A8A29A] sm:text-[10px] sm:tracking-[0.08em]">
              {ADRESSE}
            </span>
            {/* Plus petit encore : ce n'est pas l'adresse, c'est un repère. */}
            <span className="mt-0.5 block text-[9px] font-normal tracking-[0.12em] text-[#6E6A64] sm:text-[10px]">
              Pont Neuf
            </span>
          </h1>
          {/*
            ⚠️ Ce chapô doit tenir sur UNE ligne en grand écran : Étienne a
            relevé un retour à la ligne au milieu de « dîners privés ». Ne pas
            l'allonger, et ne pas lui remettre de `max-w-` : c'est ce qui le
            cassait en deux.
          */}
          <p className="mt-3 text-[14px] leading-relaxed text-[#A8A29A]">
            Trois espaces à la même adresse.
            <br />
            Showrooms, lancements presse, dîners privés, défilés, expositions, etc.
          </p>
        </div>
      </div>
    </Bloc>
  );
}

/* ─────────────────────────────────────────────────────────────── Espaces */

/**
 * Les trois lieux.
 *
 * ⚠️ Pas d'intertitre au-dessus : « les trois espaces », « ce que le lieu
 * permet » ont été retirés le 20/09/2026 — Étienne, « on s'en doute ». Les
 * tuiles se présentent toutes seules.
 *
 * ⚠️ UNE SEULE cible par tuile, et la tuile entière est le lien. C'est la
 * troisième forme en deux jours, et la bonne :
 *
 *   1. un seul lien « Prix et disponibilités » — Étienne : « j'arrive là, je
 *      vois L'ATELIER, ok c'est ce qu'il me faut, je veux voir des photos, je
 *      veux voir les infos ». Le prix n'est pas la première question.
 *   2. deux liens côte à côte — trop de décisions pour une vignette.
 *   3. la tuile entière, avec le contour qui s'allume au survol : « un peu
 *      comme t'as fait plus bas dans les tuiles tarifs et infos ».
 *
 * ⚠️ Plus de phrase descriptive : la photo la remplace. Ne pas la remettre « au
 * cas où » — c'est ce qui rendait le bloc trop lourd.
 *
 * ⚠️ PROVISOIRE : les pages de lieu n'existent pas encore, donc la tuile pointe
 * sur le calendrier du lieu. Une fois `/atelier` et `/boutique` construites,
 * passer `pagePrete` à true dans `data.ts` — rien d'autre à changer.
 */
function Espaces() {
  return (
    <Bloc grand>
      <div className="grid gap-3 sm:grid-cols-3">
        {ESPACES.map((e) => {
          const cible = e.pagePrete ? lien(e.page) : e.tarifs;
          return (
            <div
              key={e.slug}
              className={`${CADRE} group relative flex flex-col overflow-hidden transition-colors hover:border-[var(--clp-accent)]`}
            >
              {/*
                ⚠️ `z-10` N'EST PAS DÉCORATIF. Le lien étiré du titre plus bas
                (`after:inset-0`) recouvre TOUTE la tuile, photos comprises :
                sans cette élévation, le doigt touche le lien et non le
                conteneur défilant, et le carrousel est mort sur téléphone.
                C'est le piège déjà documenté dans TuilePhotos.tsx — et il est
                revenu par la porte du lien étiré. Les flèches sont en `z-20`,
                donc toujours au-dessus.
              */}
              <div className="relative z-10">
                <TuilePhotos photos={e.photos} href={cible} lieu={e.nom} />
              </div>

              {/*
                Le lien du bloc de texte est étiré sur tout ce qui reste de la
                tuile. Il porte le nom accessible : les liens des photos, eux,
                sont muets pour ne pas l'annoncer quatre fois.
              */}
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex-1">
                  <h2 className="font-clp text-sm font-bold uppercase tracking-[0.1em]">
                    <a href={cible} className="after:absolute after:inset-0 after:content-['']">
                      {e.nom}
                    </a>
                  </h2>
                  <p className="mt-1 text-[11px] leading-tight text-[#8A8A8A]">
                    {e.meta}
                  </p>
                  <p className="mt-4 font-mono text-base font-bold">
                    {e.prix}
                    <span className="ml-1.5 text-[10px] font-normal text-[#8A8A8A]">
                      HT / jour
                    </span>
                  </p>
                </div>
                <span
                  className="font-mono text-[11px] uppercase tracking-wider"
                  style={{ color: LAITON }}
                >
                  Voir le lieu →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Bloc>
  );
}

/* ──────────────────────────────────────────────────────────────── Preuve */

/**
 * L'accès véhicule, montré au lieu d'être clamé.
 *
 * ⚠️ Ne pas remettre de gros titre ici. Une version écrivait « UNE VOITURE PEUT
 * ENTRER » en capitales de 40 px ; Étienne : « c'est too much, il faut plutôt
 * mettre une photo ». La photo EST l'argument.
 *
 * ⚠️ Ne pas remettre non plus la colonne de chiffres qui l'accompagnait
 * (800 kg/m², plain-pied). Étienne, 21/09/2026 : « ce bloc est trop gros à
 * droite ». Et sur le fond, ces chiffres relèvent du plan d'installation, pas
 * de la décision de louer : ils sont sur la page du lieu et sur la fiche
 * technique. Ici, une photo et une ligne suffisent.
 */
function Preuve() {
  return (
    <Bloc grand>
      {/*
        ── LA RESPIRATION ────────────────────────────────────────────────────
        Une seule image, pleine largeur, après les trois tuiles de lieux.

        ⚠️ IL Y AVAIT DEUX PHOTOS CÔTE À CÔTE ICI — le dîner Maison 123 avec la
        Triumph, et le lancement Porsche Cayenne Electric. Remarque de Céline,
        reprise par Étienne le 21/09/2026 : une page faite de blocs de même
        taille fatigue, il lui faut une coupure. « Ça pourrait faire un peu une
        pause pour le regard. »

        Ce n'est donc pas un reproche fait à ces deux photos — Étienne aime
        celle du Porsche — mais au fait d'ajouter deux blocs de plus au même
        format. Les deux restent dans la photothèque.

        ⚠️ Pas de légende, et c'est le point : une pause qu'on commente n'est
        plus une pause. La salle vide se suffit.
      */}
      <div className={`${CADRE} overflow-hidden`}>
        {/*
           ⚠️ EXACTEMENT LE FORMAT DE LA VUE D'OUVERTURE. Étienne : « il faut
           qu'elle fasse un peu la même hauteur que la photo précédente ». Deux
           grandes images de hauteurs différentes ne se lisent pas comme un
           rythme, mais comme une erreur de gabarit. Le recadrage mange du ciel
           et du sol — la salle, elle, est au milieu.
        */}
        <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
          <Image
            src="/photos/lieu/home-2.jpg"
            alt="La grande salle de L'Atelier, vide — sol clair, poteaux bruts, verrière au fond"
            fill
            sizes="(max-width: 1180px) 100vw, 1180px"
            className="object-cover"
          />
        </div>
      </div>
    </Bloc>
  );
}

/* ──────────────────────────────────────────────────────────────  Sommaire */

/**
 * Les six adresses du site, en blocs de largeur égale.
 *
 * ⚠️ Pas de « lire plus » : chaque bloc dit ce que la page contient et donne
 * son URL. C'est ça qu'on envoie à un client qui demande les plans.
 */
function Sommaire() {
  return (
    <>
      <Titre>Tout le site</Titre>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.map((p) => (
          <a
            key={p.href}
            /*
               ⚠️ `lien()`, ET PAS `p.href` BRUT. Étienne : « cette tuile photo,
               faut que tu la recorriges, ça arrive pas au bon endroit. » Elle
               menait à `/photos`, qui redirige en 308 vers `/#portfolio` sur le
               site de production — donc au milieu de l'ANCIEN accueil. Les huit
               autres tuiles avaient le même défaut, moins visible parce que
               leurs adresses n'existent pas encore en production.
            */
            href={p.pret ? lien(p.href) : "#"}
            aria-disabled={!p.pret}
            className={`${CADRE} flex flex-col justify-between gap-6 p-5 transition-colors ${
              p.pret
                ? "hover:border-[var(--clp-accent)]"
                : "cursor-default opacity-50"
            }`}
          >
            <div>
              <h2 className="font-clp text-[13px] font-bold uppercase leading-snug tracking-[0.08em]">
                {p.titre}
              </h2>
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

/* ───────────────────────────────────────────────────────────────  Photos */

function Photos() {
  return (
    <>
      <Titre>Photos par type d&apos;événement</Titre>
      {/*
        ⚠️ Les couvertures viennent de `/photos`, pas d'une liste écrite à la
        main. Les cinq vignettes précédentes étaient des bouche-trous — « défilés »
        montrait une salle vide, « expositions » montrait la cour. Maintenant
        qu'Étienne a choisi une couverture par événement, la home les reprend :
        une seule vérité, et elle se met à jour toute seule.
      */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CATEGORIES_GALERIE.map((c) => (
          <Link
            key={c.slug}
            href={`/refonte/photos/${c.slug}`}
            className={`${CADRE} group overflow-hidden transition-colors hover:border-[var(--clp-accent)]`}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={c.couverture.src}
                alt={`${c.nom} Chez les Plombiers`}
                fill
                sizes="(max-width: 640px) 50vw, 380px"
                className={`object-cover ${c.cadrage ?? ""}`}
              />
            </div>
            <div className="border-t border-[var(--clp-bord)] px-4 py-3">
              <p className="font-clp text-[11px] font-bold uppercase tracking-[0.1em]">
                {c.nom}
              </p>
              <p className="mt-0.5 font-mono text-[11px]" style={{ color: LAITON }}>
                {c.total} photos →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────  Clients */

/**
 * ⚠️ La grille de logos a été retirée le 20/09/2026. Étienne, sur la maquette
 * précédente : « en bas les logos puis le texte, c'est pas très chic ». Et sur
 * le fond : un logo est une image ; un moteur, un modèle de langage, un client
 * qui cherche « Prada rue des Bourdonnais » lisent du texte.
 * `CLIENTS` reste dans `data.ts` : les logos serviront ailleurs.
 */
function Clients() {
  return (
    <>
      <Titre>Ils sont venus</Titre>
      <div className={`${CADRE} p-5`}>
        <p className="max-w-4xl text-[15px] leading-relaxed">{CLIENTS_TEXTE}</p>
      </div>
    </>
  );
}
