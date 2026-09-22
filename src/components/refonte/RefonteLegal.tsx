import { Barre, CADRE, Corps, Page, Pied, Retour, lien } from "./chrome";
import fr from "@/dictionaries/fr.json";

/**
 * Les deux pages obligatoires : mentions légales et politique de confidentialité.
 *
 * ── POURQUOI ELLES LISENT LE DICTIONNAIRE DU SITE ACTUEL ──────────────────
 *
 * Ce contenu existait déjà, il est juste, et il n'a aucune raison d'être
 * réécrit : le SIREN, l'hébergeur et les sous-traitants ne changent pas parce
 * que le site change de dessin. Le recopier ici créerait deux versions à tenir
 * à jour, et l'une des deux finirait fausse — or c'est précisément le genre de
 * page qu'on ne relit jamais.
 *
 * ⚠️ Ce ne sont PAS les conditions de location. Trois documents distincts,
 * souvent confondus :
 *   mentions légales        qui édite ce site, qui l'héberge     — obligation web
 *   politique de confidentialité  ce qu'on fait de vos données   — obligation RGPD
 *   conditions de location  ce qu'on se doit mutuellement        — le contrat
 * Les deux premiers concernent le SITE ; le troisième concerne la LOCATION et
 * se signe. `/conditions` en donne la substance en clair ; le contrat lui-même
 * n'est pas publié.
 *
 * ⚠️ Le contenu du dictionnaire porte des `<strong>` et des `<br />` — d'où
 * `dangerouslySetInnerHTML`. La source est un fichier du dépôt, pas une saisie
 * d'utilisateur : rien d'extérieur ne peut s'y glisser.
 */

const LEGAL = fr.mentionsLegales;
const RGPD = fr.politiqueConfidentialite;

type Bloc = { title: string; content?: string; intro?: string; items?: string[]; contact?: string };

export function RefonteMentionsLegales() {
  const blocs = [
    LEGAL.editeur,
    LEGAL.contact,
    LEGAL.hebergement,
    LEGAL.propriete,
    LEGAL.responsabilite,
    LEGAL.credits,
  ] as Bloc[];
  return (
    <Document titre="Mentions légales" blocs={blocs}>
      Qui édite ce site, qui l&apos;héberge, et à qui appartient ce qu&apos;on y
      voit.
    </Document>
  );
}

export function RefonteConfidentialite() {
  const blocs = [
    RGPD.responsable,
    RGPD.donnees,
    RGPD.finalites,
    RGPD.baseLegale,
    RGPD.conservation,
    RGPD.droits,
    RGPD.cookies,
    RGPD.sousTraitants,
    RGPD.miseAJour,
  ] as Bloc[];
  return (
    <Document titre="Politique de confidentialité" blocs={blocs}>
      Les données que nous recueillons, ce que nous en faisons, et comment les
      faire effacer.
    </Document>
  );
}

function Document({
  titre,
  children,
  blocs,
}: {
  titre: string;
  children: React.ReactNode;
  blocs: Bloc[];
}) {
  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href={lien("/")} texte="Accueil" />
        <h1 className="mt-3 font-clp text-sm font-bold uppercase tracking-[0.1em]">
          {titre}
        </h1>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#C9C4BC]">
          {children}
        </p>

        <div className="mt-8 space-y-3">
          {blocs.map((b) => (
            <section key={b.title} className={`${CADRE} p-5`}>
              <h2 className="font-clp text-[12px] font-bold uppercase tracking-[0.08em]">
                {b.title}
              </h2>
              {b.content && <Texte html={b.content} />}
              {b.intro && <Texte html={b.intro} />}
              {b.items && (
                <ul className="mt-2 space-y-1.5">
                  {b.items.map((it) => (
                    <li
                      key={it}
                      className="pl-4 text-[14px] leading-relaxed text-[#A8A29A] [text-indent:-1rem] [&_strong]:font-semibold [&_strong]:text-[#C9C4BC]"
                    >
                      <span aria-hidden>— </span>
                      <span dangerouslySetInnerHTML={{ __html: it }} />
                    </li>
                  ))}
                </ul>
              )}
              {b.contact && <Texte html={b.contact} />}
            </section>
          ))}
        </div>
      </Corps>
      <Pied />
    </Page>
  );
}

function Texte({ html }: { html: string }) {
  return (
    <p
      className="mt-2 text-[14px] leading-relaxed text-[#A8A29A] [&_strong]:font-semibold [&_strong]:text-[#C9C4BC]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
