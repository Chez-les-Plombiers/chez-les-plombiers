import { Barre, Bloc, CADRE, Corps, LAITON, Page, Pied, Retour, lien } from "./chrome";
import { ADRESSE } from "./data";
import { ScanFacade } from "./ScanFacade";

/**
 * Page d'essai : deux emplacements possibles pour la façade annotée, côte à
 * côte, pour qu'Étienne tranche en la touchant plutôt qu'en l'imaginant.
 *
 * ⚠️ Une image de maquette n'aurait rien montré : tout l'enjeu est ce qui se
 * passe au doigt. D'où une vraie page, sur le vrai site, plutôt qu'un dessin.
 *
 * ⏳ À SUPPRIMER une fois l'emplacement choisi, avec sa route.
 */
export function RefonteEssaiFacade() {
  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href={lien("/")} texte="Accueil" />
        <h1 className="mt-3 font-clp text-sm font-bold uppercase tracking-[0.1em]">
          Essai — la façade annotée
        </h1>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#C9C4BC]">
          Deux emplacements possibles. Touchez les cadres : les trois noms sont
          lisibles sans rien faire, et l&apos;appui montre l&apos;intérieur.
        </p>

        <Essai
          numero="A"
          titre="Dans l'espace libre, à droite du titre"
          pour="Elle répond à la phrase « trois espaces à la même adresse » au moment exact où on la lit. Elle ne coûte pas une ligne de hauteur sur grand écran : elle occupe une place qui était vide."
          contre="Sur téléphone, elle passe sous le texte et allonge la page d'un écran avant d'arriver à L'Atelier."
        >
          {/* Reproduction fidèle du bloc d'ouverture de l'accueil. */}
          <div className={`${CADRE} p-5 sm:flex sm:items-start sm:gap-8`}>
            <div className="sm:flex-1">
              <p className="font-clp uppercase">
                <span className="block text-[13px] font-bold leading-relaxed tracking-[0.1em] sm:text-sm">
                  3 lieux événementiels
                </span>
                <span className="mt-1 block text-[11px] font-bold leading-relaxed tracking-[0.12em] sm:text-[12px]">
                  L&apos;Atelier · La Boutique · L&apos;Appartement
                </span>
                <span className="mt-1.5 block whitespace-nowrap text-[9px] font-normal leading-relaxed tracking-[0.06em] text-[#A8A29A] sm:text-[10px]">
                  {ADRESSE}
                </span>
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-[#A8A29A]">
                Trois espaces à la même adresse.
                <br />
                Showrooms, lancements presse, dîners privés, défilés,
                expositions, etc.
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:w-[46%] sm:shrink-0">
              <ScanFacade compact />
            </div>
          </div>
        </Essai>

        <Essai
          numero="B"
          titre="En pleine largeur, sur la page Venir et livrer"
          pour="C'est la page de référence : elle porte déjà une section « Circuler entre les trois lieux » qui explique tout ça en texte. Personne ne reproche à une image d'être grande sur une page qu'on consulte."
          contre="Il faut déjà être allé la chercher. Quelqu'un qui découvre l'accueil et se demande où est La Boutique ne la verra jamais."
        >
          <div className={`${CADRE} p-5`}>
            <p className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
              Circuler entre les trois lieux
            </p>
            <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed text-[#A8A29A]">
              L&apos;Atelier, La Boutique et L&apos;Appartement sont à la même
              adresse, mais ils ne communiquent pas entre eux.
            </p>
            <div className="mt-4 max-w-[760px]">
              <ScanFacade />
            </div>
          </div>
        </Essai>

        <p className="mt-12 border-t border-[var(--clp-bord)] pt-6 text-[14px] leading-relaxed text-[#8A8A8A]">
          Mon avis : les deux, et ce n&apos;est pas une dérobade. L&apos;encart
          A répond à la question de celui qui ne connaît pas le lieu, au moment
          où elle se pose. La version B sert à l&apos;équipe qui prépare une
          livraison. Ce ne sont pas les mêmes gens, et l&apos;image ne coûte
          qu&apos;un fichier.
        </p>
      </Corps>
      <Pied />
    </Page>
  );
}

function Essai({
  numero,
  titre,
  pour,
  contre,
  children,
}: {
  numero: string;
  titre: string;
  pour: string;
  contre: string;
  children: React.ReactNode;
}) {
  return (
    <Bloc grand>
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-mono text-[13px]" style={{ color: LAITON }}>
          {numero}
        </span>
        <h2 className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
          {titre}
        </h2>
      </div>
      {children}
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        {[
          ["Pour", pour],
          ["Contre", contre],
        ].map(([t, v]) => (
          <div key={t} className={`${CADRE} p-4`}>
            <dt className="font-clp text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
              {t}
            </dt>
            <dd className="mt-1.5 text-[13px] leading-relaxed text-[#C9C4BC]">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </Bloc>
  );
}
