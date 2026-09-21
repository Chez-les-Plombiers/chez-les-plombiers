import Image from "next/image";
import { Barre, CADRE, Corps, LAITON, Page, Pied } from "./chrome";
import { CATEGORIES, EVENEMENTS } from "./tri-evenements";
import manifeste from "./tri-manifeste.json";

/**
 * Les planches contact de tri — page de travail, à supprimer après la sélection.
 *
 * ⚠️ PENSÉE POUR LE TÉLÉPHONE. Étienne trie depuis son mobile, en marchant.
 * D'où : trois vignettes par ligne (assez grandes pour juger, assez nombreuses
 * pour scanner), le numéro sur la vignette et pas à côté, et une seule
 * question par écran.
 *
 * ⚠️ On montre TOUT. J'avais proposé une présélection « dégrossie » — je n'en
 * suis pas capable : juger qu'une photo est ratée demande de la regarder, et
 * personne ne peut le faire à la place d'Étienne sur son propre lieu. Filtrer
 * d'avance reviendrait à jeter sa préférée sans qu'il le sache.
 *
 * Deux décisions par événement, pas une par photo : ce qu'on retire, et la
 * couverture. Le dossier décide déjà de la catégorie.
 */

type Manifeste = Record<
  string,
  { dossier: string; items: { n: string; src: string; origine: string }[] }
>;

const M = manifeste as Manifeste;

export function RefonteTriIndex() {
  const parCategorie = CATEGORIES.map((c) => ({
    ...c,
    evenements: EVENEMENTS.filter((e) => e.categorie === c.slug),
  }));
  const total = EVENEMENTS.reduce((s, e) => s + (M[e.slug]?.items.length ?? 0), 0);

  return (
    <Page>
      <Barre />
      <Corps>
        <div className="mt-3 border-b border-[var(--clp-bord)] pb-8 pt-4">
          <h1 className="font-clp text-sm font-bold uppercase tracking-[0.1em]">
            Tri de la photothèque
          </h1>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#C9C4BC]">
            {total} photos, {EVENEMENTS.length} événements. Pour chacun, deux
            réponses suffisent&nbsp;: <strong>ce qu&apos;on retire</strong> et{" "}
            <strong>la couverture</strong>. Par exemple «&nbsp;retirer 3, 7, 12
            — couverture 5&nbsp;».
          </p>
          <p className="mt-3 max-w-[62ch] text-[13px] leading-relaxed text-[#8A8A8A]">
            Écartés d&apos;avance : le 14 janvier (lieu en travaux), le dîner de
            Marine Abiad (privé), Danse avec la chute (tournage).
          </p>
        </div>

        {parCategorie.map((c) => (
          <section key={c.slug} className="mt-8">
            <p className="mb-3 px-1 font-clp text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
              {c.nom}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.evenements.map((e) => {
                const items = M[e.slug]?.items ?? [];
                return (
                  <a
                    key={e.slug}
                    href={`/refonte/tri/${e.slug}`}
                    className={`${CADRE} overflow-hidden transition-colors hover:border-[var(--clp-accent)]`}
                  >
                    <div className="relative aspect-[4/3] w-full">
                      {items[0] && (
                        <Image
                          src={items[0].src}
                          alt={e.nom}
                          fill
                          sizes="(max-width: 640px) 100vw, 360px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="border-t border-[var(--clp-bord)] p-4">
                      <p className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
                        {e.nom}
                      </p>
                      <p
                        className="mt-1 font-mono text-[11px]"
                        style={{ color: LAITON }}
                      >
                        {items.length} photos →
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        ))}
      </Corps>
      <Pied />
    </Page>
  );
}

export function RefonteTriEvenement({ slug }: { slug: string }) {
  const e = EVENEMENTS.find((x) => x.slug === slug);
  const bloc = M[slug];
  if (!e || !bloc) return null;

  const categorie = CATEGORIES.find((c) => c.slug === e.categorie);
  const i = EVENEMENTS.indexOf(e);
  const precedent = EVENEMENTS[i - 1];
  const suivant = EVENEMENTS[i + 1];

  return (
    <Page>
      <Barre />
      <Corps>
        <div className="mt-3 border-b border-[var(--clp-bord)] pb-6 pt-4">
          <a
            href="/refonte/tri"
            className="font-mono text-[11px] text-[#8A8A8A] hover:text-[#E8E4DC]"
          >
            ← Tous les événements
          </a>
          <h1 className="mt-3 font-clp text-sm font-bold uppercase tracking-[0.1em]">
            {e.nom}
          </h1>
          <p className="mt-1.5 font-mono text-[11px]" style={{ color: LAITON }}>
            {categorie?.nom} · {bloc.items.length} photos
          </p>
          <p className="mt-4 max-w-[62ch] text-[14px] leading-relaxed text-[#C9C4BC]">
            Dis-moi ce qu&apos;on retire, et laquelle sert de couverture.
          </p>
        </div>

        {/*
          Trois colonnes sur téléphone : assez grand pour juger une photo,
          assez dense pour en scanner cent sans y passer la journée.
        */}
        <div className="mt-6 grid grid-cols-3 gap-1.5 sm:grid-cols-5 lg:grid-cols-8">
          {bloc.items.map((it) => (
            <figure key={it.n} className="relative">
              <div className="relative aspect-square w-full overflow-hidden bg-[var(--clp-carte)]">
                <Image
                  src={it.src}
                  alt={it.n}
                  fill
                  sizes="(max-width: 640px) 33vw, 160px"
                  className="object-cover"
                />
              </div>
              {/* Le numéro SUR la vignette : à côté, il se décale d'une ligne. */}
              <figcaption className="absolute bottom-0 left-0 bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white">
                {it.n}
              </figcaption>
            </figure>
          ))}
        </div>

        <nav className="mt-10 flex flex-wrap justify-between gap-3 border-t border-[var(--clp-bord)] pt-6">
          {precedent ? (
            <a
              href={`/refonte/tri/${precedent.slug}`}
              className="font-mono text-[12px] text-[#A8A29A] hover:text-[#E8E4DC]"
            >
              ← {precedent.nom}
            </a>
          ) : (
            <span />
          )}
          {suivant && (
            <a
              href={`/refonte/tri/${suivant.slug}`}
              className="font-mono text-[12px] text-[#A8A29A] hover:text-[#E8E4DC]"
            >
              {suivant.nom} →
            </a>
          )}
        </nav>
      </Corps>
      <Pied />
    </Page>
  );
}
