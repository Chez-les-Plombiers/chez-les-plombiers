import { Barre, Corps, Page, Pied, Retour, lien } from "./chrome";
import { CalibreFacade } from "./CalibreFacade";

/**
 * Page de travail : caler les trois cadres de la façade à la souris.
 *
 * ⚠️ Elle a d'abord servi à comparer deux emplacements pour la façade —
 * Étienne n'a retenu ni l'un ni l'autre et a proposé le bouton, qui est
 * meilleur. Elle sert désormais à autre chose, et c'est un progrès : régler
 * un rectangle en le dessinant plutôt qu'en décrivant des pourcentages.
 *
 * ⏳ À SUPPRIMER une fois les cadres calés, avec sa route.
 */
export function RefonteEssaiFacade() {
  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href={lien("/")} texte="Accueil" />
        <h1 className="mt-3 font-clp text-sm font-bold uppercase tracking-[0.1em]">
          Caler les trois cadres
        </h1>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#C9C4BC]">
          Glissez un cadre pour le déplacer, un coin pour le redimensionner. Le
          bloc de code en bas se met à jour tout seul — envoyez-le-moi et je le
          pose.
        </p>
        <div className="mt-6">
          <CalibreFacade />
        </div>
      </Corps>
      <Pied />
    </Page>
  );
}
