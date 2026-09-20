import type { Metadata } from "next";
import manifest from "@/components/refonte/source-manifest.json";

/**
 * Planche-contact — page de travail.
 *
 * Les photos d'événements d'Inès (`Dropbox/CHEZ LES PLOMBIERS/INES/`) portent des
 * noms génériques (`STORY 1.jpg`) : impossible de choisir sans les voir. Cette
 * page les affiche toutes, numérotées, pour qu'Étienne désigne celles qu'il veut
 * depuis son téléphone — « servaire 07, 12, 21 » suffit.
 *
 * ⚠️ Vignettes à 520 px, qualité 62 : elles ne servent qu'à choisir. Une fois la
 * sélection faite, on importe les fichiers d'origine en pleine résolution et on
 * SUPPRIME `public/photos/source/` — 8,6 Mo n'ont rien à faire dans le dépôt à
 * demeure.
 */
export const metadata: Metadata = {
  title: "Planche-contact — refonte",
  robots: { index: false, follow: false, nocache: true },
};

const TITRES: Record<string, string> = {
  servaire: "Servaire & Co — Paris Design Week",
  leboncoin: "Le Bon Coin — remise des prix, avec Zmirov",
  oakley: "Oakley — showroom Fashion Week",
  rayban: "Ray-Ban — l'Appartement",
  mugler: "Mugler",
  tiktok: "TikTok",
};

/** L'ordre d'affichage : les événements dont on parle déjà sur la page d'accueil d'abord. */
const ORDRE = ["servaire", "leboncoin", "oakley", "rayban", "mugler", "tiktok"];

export default function PlancheContact() {
  const dossiers = manifest as Record<string, string[]>;
  const total = Object.values(dossiers).reduce((n, l) => n + l.length, 0);

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#16130F] antialiased">
      <header className="sticky top-0 z-40 border-b border-[#16130F]/12 bg-[#F7F5F1]/95 px-5 py-4 backdrop-blur sm:px-10">
        <p className="font-display text-[13px] uppercase tracking-[0.2em]">
          Planche-contact
        </p>
        <p className="mt-1 text-[13px] text-[#6F6960]">
          {total} photos d&apos;Inès. Donne-moi les numéros de celles que tu veux —
          « servaire 07, 12 » suffit.
        </p>
      </header>

      <main className="mx-auto max-w-[1600px] px-5 py-10 sm:px-10">
        {ORDRE.filter((k) => dossiers[k]?.length).map((slug) => (
          <section key={slug} className="mb-16">
            <h2 className="font-display text-lg font-normal normal-case tracking-[-0.01em]">
              {TITRES[slug] ?? slug}
            </h2>
            <p className="mt-0.5 font-display text-[11px] uppercase tracking-[0.16em] text-[#6F6960]">
              {slug} · {dossiers[slug].length} photos
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {dossiers[slug].map((f) => (
                <figure key={f} className="group">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDEAE5]">
                    {/*
                      <img> volontairement, pas next/image : ce sont déjà des
                      vignettes, les faire repasser par l'optimiseur pour 430
                      fichiers ne servirait qu'à alourdir le build.
                    */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/photos/source/${slug}/${f}`}
                      alt={`${slug} ${f.replace(".jpg", "")}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="pt-1 font-display text-[10px] uppercase tracking-[0.14em] text-[#6F6960]">
                    {f.replace(".jpg", "")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
