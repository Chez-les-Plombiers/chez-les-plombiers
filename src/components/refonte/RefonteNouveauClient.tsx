"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Barre, CADRE, Corps, LABEL, LAITON, Page, Pied, Retour, lien } from "./chrome";
import { DEPOTS, DEPOT_MODALITES, MOMENTS } from "./regles";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  `/nouveau-client` — les informations de facturation, une fois la date tenue
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Ce n'est PAS un formulaire de contact. On n'arrive pas ici depuis le site :
 * Étienne envoie l'adresse à un client dont la date est déjà posée, pour
 * récupérer de quoi facturer. D'où le `noindex`, et d'où le ton — on ne vend
 * plus rien, on organise.
 *
 * ── CE QUI A ÉTÉ REPRIS LE 22/09/2026, ET POURQUOI ────────────────────────
 *
 * La page était restée sur l'ancien site : en-tête blanc, ancien pied, et
 * surtout l'ancienne nomenclature. Quatre défauts, du plus grave au moindre.
 *
 * ⚠️ 1. LA BOUTIQUE N'EXISTAIT PAS DANS LE CHOIX D'ESPACE. Le lieu a ouvert le
 *    01/09/2026 ; un client qui l'avait visité ne pouvait pas le déclarer et
 *    cochait « Chez les Plombiers » faute de mieux. C'est une erreur de
 *    facturation qui commence, pas une coquille.
 *
 * ⚠️ 2. LE FORMULAIRE CONTREDISAIT `/conditions` SUR L'ARGENT. Il annonçait
 *    deux dépôts de garantie (5 000 € et 3 000 €) pour deux lieux, quand la
 *    page des conditions en annonce trois — dont AUCUN pour LA BOUTIQUE.
 *    Deux pages du même site qui donnent deux montants, c'est la discussion
 *    la plus désagréable possible, le jour de l'état des lieux. Les montants
 *    ne sont donc plus écrits ici : ils sont importés de `regles.ts`, la même
 *    source que `/conditions`. Ne pas les recopier « pour aller plus vite ».
 *
 * ⚠️ 3. LES CRÉNEAUX ÉTAIENT LES MÊMES POUR LES TROIS LIEUX. On proposait une
 *    matinée à L'APPARTEMENT, qui ne se loue qu'à la journée. Le client
 *    demandait une chose invendable, et c'est nous qui devions le reprendre.
 *    Le choix dépend maintenant du lieu — voir `CRENEAUX` plus bas.
 *
 * ⚠️ 4. « Appartement Rose » et « Chez les Plombiers » désignaient les lieux.
 *    Le premier est un alias historique, le second est le nom de la MARQUE,
 *    qui couvre les trois. Employé pour L'ATELIER seul, il rend la phrase
 *    fausse dès qu'il y a plusieurs lieux.
 */

interface ResultatSirene {
  nom_complet: string;
  siege: { siret: string };
  matching_etablissements?: { adresse?: string }[];
}

interface Formulaire {
  nom: string;
  email: string;
  telephone: string;
  societe: string;
  clientFinal: string;
  adresse: string;
  siret: string;
  tva: string;
  dateDebut: string;
  dateFin: string;
  creneau: string;
  invites: string;
  espace: string;
}

const VIDE: Formulaire = {
  nom: "", email: "", telephone: "", societe: "", clientFinal: "", adresse: "",
  siret: "", tva: "", dateDebut: "", dateFin: "", creneau: "", invites: "", espace: "",
};

/**
 * ⚠️ CES CRÉNEAUX DOIVENT SUIVRE `venues.ts` DU PROJET PRICING, qui décide de
 * ce qui est réellement vendable. Au 22/09/2026 : L'ATELIER se découpe,
 * LA BOUTIQUE et L'APPARTEMENT se louent à la journée entière — l'APPARTEMENT
 * parce qu'il abrite les bureaux et que la copropriété est sensible.
 *
 * ⚠️ Le passage de « matinée + après-midi » à « matinée + soirée » est acté
 * mais pas fait ; il se fera dans le calendrier tarifaire. Le jour où il sera
 * fait, CETTE LISTE EST À CHANGER AUSSI, sinon le formulaire vendra un
 * après-midi que le calendrier ne montre plus.
 */
const JOURNEE = "Journée complète";
const CRENEAUX: Record<string, readonly string[]> = {
  "L'Atelier": ["Matinée (7 h – 13 h)", "Après-midi (13 h – 19 h)", "Journée complète (7 h – 23 h)"],
  "La Boutique": [JOURNEE],
  "L'Appartement": [JOURNEE],
  "Plusieurs lieux": [JOURNEE],
};
const ESPACES = Object.keys(CRENEAUX);

/** Les règles d'argent, prises à la source qui alimente `/conditions`. */
const RESERVER = MOMENTS.find((m) => m.id === "reserver")!;

function useDifferee(valeur: string, delai: number) {
  const [v, setV] = useState(valeur);
  useEffect(() => {
    const t = setTimeout(() => setV(valeur), delai);
    return () => clearTimeout(t);
  }, [valeur, delai]);
  return v;
}

/** Ferme une liste de suggestions quand on clique ailleurs. */
function useFermetureExterne(ref: React.RefObject<HTMLDivElement | null>, fermer: () => void) {
  useEffect(() => {
    function surClic(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) fermer();
    }
    document.addEventListener("mousedown", surClic);
    return () => document.removeEventListener("mousedown", surClic);
  }, [ref, fermer]);
}

export function RefonteNouveauClient() {
  const [form, setForm] = useState<Formulaire>(VIDE);
  const [envoye, setEnvoye] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");

  const champ = useCallback(
    (cle: keyof Formulaire, valeur: string) => setForm((p) => ({ ...p, [cle]: valeur })),
    [],
  );

  /* ── L'annuaire des entreprises ──────────────────────────────────────── */
  const [requeteSirene, setRequeteSirene] = useState("");
  const [resultatsSirene, setResultatsSirene] = useState<ResultatSirene[]>([]);
  const [listeSirene, setListeSirene] = useState(false);
  const [siretVerrouille, setSiretVerrouille] = useState(false);
  const refSirene = useRef<HTMLDivElement>(null);
  const sireneDifferee = useDifferee(requeteSirene, 300);
  useFermetureExterne(refSirene, () => setListeSirene(false));

  useEffect(() => {
    if (sireneDifferee.length < 2) return setResultatsSirene([]);
    let annule = false;
    fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(sireneDifferee)}&per_page=5`)
      .then((r) => r.json())
      .then((d) => {
        if (annule || !d.results) return;
        setResultatsSirene(d.results);
        setListeSirene(true);
      })
      .catch(() => !annule && setResultatsSirene([]));
    return () => { annule = true; };
  }, [sireneDifferee]);

  /**
   * Le numéro de TVA intracommunautaire se CALCULE à partir du SIREN — il n'y
   * a rien à aller chercher. Clé = (12 + 3 × (SIREN mod 97)) mod 97.
   */
  const tvaDepuisSiret = (siret: string) => {
    const siren = siret.replace(/\s/g, "").slice(0, 9);
    if (siren.length !== 9 || Number.isNaN(Number(siren))) return "";
    const cle = (12 + 3 * (parseInt(siren, 10) % 97)) % 97;
    return `FR${String(cle).padStart(2, "0")}${siren}`;
  };

  const choisirSirene = (r: ResultatSirene) => {
    setForm((p) => ({
      ...p,
      societe: r.nom_complet,
      siret: r.siege.siret,
      tva: tvaDepuisSiret(r.siege.siret),
    }));
    setRequeteSirene(r.nom_complet);
    setSiretVerrouille(true);
    setListeSirene(false);
  };

  /* ── L'adresse postale ───────────────────────────────────────────────── */
  const [requeteAdresse, setRequeteAdresse] = useState("");
  const [resultatsAdresse, setResultatsAdresse] = useState<string[]>([]);
  const [listeAdresse, setListeAdresse] = useState(false);
  const refAdresse = useRef<HTMLDivElement>(null);
  const adresseDifferee = useDifferee(requeteAdresse, 300);
  useFermetureExterne(refAdresse, () => setListeAdresse(false));

  useEffect(() => {
    if (adresseDifferee.length < 5) return setResultatsAdresse([]);
    let annule = false;
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(adresseDifferee)}&limit=5`)
      .then((r) => r.json())
      .then((d) => {
        if (annule || !d.features) return;
        setResultatsAdresse(
          d.features.map((f: { properties: { label: string; context: string } }) =>
            `${f.properties.label} (${f.properties.context})`),
        );
        setListeAdresse(true);
      })
      .catch(() => !annule && setResultatsAdresse([]));
    return () => { annule = true; };
  }, [adresseDifferee]);

  /*
   * ⚠️ CHANGER DE LIEU REMET LE CRÉNEAU À ZÉRO. Sans ça, un client qui
   * choisit « Matinée » à L'ATELIER puis bascule sur L'APPARTEMENT garde une
   * matinée invisible dans l'état — le champ n'affiche plus l'option, mais la
   * valeur part quand même dans le mail.
   */
  const changerEspace = (espace: string) => {
    const possibles = CRENEAUX[espace] ?? [];
    setForm((p) => ({
      ...p,
      espace,
      creneau: possibles.length === 1 ? possibles[0] : "",
    }));
  };

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur("");
    setEnvoi(true);
    try {
      /*
       * ⚠️ LA ROUTE D'API ATTEND SES NOMS DE CHAMPS ANGLAIS. Elle n'est pas
       * réécrite ici : elle alimente une base Notion dont les colonnes portent
       * ces noms. Traduire des deux côtés casserait l'historique.
       */
      const r = await fetch("/api/nouveau-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.nom,
          email: form.email,
          phone: form.telephone,
          company: form.societe,
          endClient: form.clientFinal || undefined,
          address: form.adresse,
          siret: form.siret,
          tva: form.tva,
          dateStart: form.dateDebut,
          dateEnd: form.dateFin || undefined,
          timeSlot: form.creneau,
          guestCount: parseInt(form.invites, 10) || 0,
          space: form.espace,
        }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || "L'envoi n'a pas abouti.");
      }
      setEnvoye(true);
      trackEvent("form_submit", { form_name: "nouveau_client", form_location: "nouveau-client" });
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "L'envoi n'a pas abouti.");
    } finally {
      setEnvoi(false);
    }
  };

  if (envoye) {
    return (
      <Page>
        <Barre />
        <Corps>
          <div className={`${CADRE} mt-10 p-8 sm:p-12`}>
            <p className={LABEL}>Bien reçu</p>
            <h1 className="mt-4 font-clp text-lg font-bold uppercase leading-relaxed tracking-[0.08em]">
              Merci, nous avons vos informations.
            </h1>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#C9C4BC]">
              Vous recevez votre proposition tarifaire sous 24 heures, à{" "}
              <span className="font-mono text-[14px]" style={{ color: LAITON }}>
                {form.email}
              </span>
              . Si rien ne vous parvient, écrivez-nous plutôt que d&apos;attendre&nbsp;:
              c&apos;est le plus souvent un filtre anti-spam.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={lien("/conditions")} className={`${CADRE} px-4 py-3 font-mono text-[12px] text-[#C9C4BC] transition-colors hover:border-[var(--clp-accent)]`}>
                Lire les conditions de location
              </a>
              <a href={lien("/infos")} className={`${CADRE} px-4 py-3 font-mono text-[12px] text-[#C9C4BC] transition-colors hover:border-[var(--clp-accent)]`}>
                Venir et livrer
              </a>
            </div>
          </div>
        </Corps>
        <Pied />
      </Page>
    );
  }

  const creneaux = CRENEAUX[form.espace] ?? [];

  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href={lien("/")} texte="Accueil" />

        <div className="mt-3 border-b border-[var(--clp-bord)] pb-8 pt-4">
          <h1 className="font-clp uppercase">
            <span className="block text-sm font-bold leading-relaxed tracking-[0.1em]">
              Vos informations de facturation
            </span>
          </h1>
          {/*
            ⚠️ Dire à quoi sert la page dès la première phrase. Le client
            arrive par un lien, sans contexte : il doit comprendre en une
            ligne pourquoi on lui demande un SIRET.
          */}
          <p className="mt-4 max-w-[86ch] text-[15px] leading-relaxed text-[#C9C4BC]">
            Vous avez une date en vue chez nous. Ces informations nous permettent
            d&apos;établir votre proposition tarifaire, que vous recevez sous 24 heures.
            Rien n&apos;est engagé tant que vous ne l&apos;avez pas acceptée.
          </p>
        </div>

        {/* ── Ce qu'il faut savoir avant de donner un SIRET ──────────────── */}
        {/*
          ── LA LARGEUR ────────────────────────────────────────────────────
          Étienne, 23/09/2026 : « sur la page nouveau client, il faut utiliser
          toute la largeur de la page ».

          Le haut de page était plafonné à 70 caractères pendant que le
          formulaire, juste en dessous, occupait les 1 130 px : la page se
          lisait en deux moitiés, dont une vide à droite.

          ⚠️ MAIS ON NE SUPPRIME PAS LA MESURE, ON LA RÉPARTIT. Une ligne de
          prose de 1 130 px de large est illisible — l'œil perd le début de la
          ligne suivante. Les quatre règles passent donc sur deux colonnes, et
          la fourchette des dépôts vient à côté d'elles : la largeur est
          occupée, et chaque colonne garde une mesure qui se lit.
        */}
        <section className="py-10">
          <h2 className="font-clp text-[13px] font-bold uppercase tracking-[0.1em]">
            {RESERVER.titre}
          </h2>
          <div className="mt-5 grid gap-x-10 border-y border-[var(--clp-bord)] sm:grid-cols-2">
            {RESERVER.regles.map((r, i) => (
              <div
                key={r.titre}
                /*
                  Le filet entre les règles suit la colonne, pas la page : sur
                  deux colonnes, un `divide-y` global tracerait un trait en
                  travers du vide.
                */
                className={`py-4 ${i >= 2 ? "sm:border-t sm:border-[var(--clp-bord)]" : ""} ${
                  i > 0 ? "border-t border-[var(--clp-bord)] sm:border-t-0" : ""
                }`}
              >
                <p className="font-mono text-[13px]" style={{ color: LAITON }}>
                  {r.titre}
                </p>
                <p className="mt-1.5 max-w-[62ch] text-[14px] leading-relaxed text-[#C9C4BC]">
                  {r.texte}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <h3 className="font-clp text-[13px] font-bold uppercase tracking-[0.1em]">
                Le dépôt de garantie
              </h3>
              <dl className="mt-4 divide-y divide-[var(--clp-bord)] border-y border-[var(--clp-bord)]">
                {DEPOTS.map((d) => (
                  <div key={d.lieu} className="py-3.5 sm:flex sm:gap-6">
                    <dt className="font-mono text-[12px] sm:w-44 sm:shrink-0" style={{ color: LAITON }}>
                      {d.lieu}
                    </dt>
                    <dd className="mt-1 font-mono text-[14px] text-[#E8E4DC] sm:mt-0">{d.montant}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="max-w-[62ch] self-end text-[14px] leading-relaxed text-[#8A8A8A]">
              {DEPOT_MODALITES}{" "}
              <a href={lien("/conditions")} className="underline decoration-[var(--clp-bord)] underline-offset-4 hover:text-[#C9C4BC]">
                Toutes les conditions de location
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── Le formulaire ──────────────────────────────────────────────── */}
        <form onSubmit={envoyer} className="border-t border-[var(--clp-bord)] py-10">
          <Section titre="Responsable de la facturation">
            <Champ label="Prénom et nom" requis valeur={form.nom} sur={(v) => champ("nom", v)} autoComplete="name" />
            <Champ label="Email de facturation" requis type="email" valeur={form.email} sur={(v) => champ("email", v)} autoComplete="email" />
            <Champ label="Téléphone" requis type="tel" valeur={form.telephone} sur={(v) => champ("telephone", v)} autoComplete="tel" />
          </Section>

          <Section titre="Entreprise">
            {/* L'annuaire officiel remplit à lui seul la raison sociale, le SIRET et la TVA. */}
            <div ref={refSirene} className="relative sm:col-span-2">
              <Champ
                label="Nom légal de la société"
                requis
                valeur={requeteSirene}
                sur={(v) => {
                  setRequeteSirene(v);
                  champ("societe", v);
                  if (siretVerrouille) {
                    setSiretVerrouille(false);
                    setForm((p) => ({ ...p, siret: "", tva: "" }));
                  }
                }}
                aide="Commencez à taper : l'annuaire des entreprises remplit le SIRET et la TVA."
              />
              {listeSirene && resultatsSirene.length > 0 && (
                <ul className={`${CADRE} absolute z-20 mt-1 w-full`}>
                  {resultatsSirene.map((r) => (
                    <li key={r.siege.siret}>
                      <button
                        type="button"
                        onClick={() => choisirSirene(r)}
                        className="block w-full px-3 py-2.5 text-left text-[13px] text-[#C9C4BC] transition-colors hover:bg-[var(--clp-bord)]"
                      >
                        {r.nom_complet}
                        <span className="ml-2 font-mono text-[11px] text-[#8A8A8A]">{r.siege.siret}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Champ label="Client final" valeur={form.clientFinal} sur={(v) => champ("clientFinal", v)} aide="Si vous êtes une agence : la marque pour qui vous réservez." />

            <div ref={refAdresse} className="relative sm:col-span-2">
              <Champ
                label="Adresse postale de facturation"
                requis
                valeur={form.adresse}
                sur={(v) => { champ("adresse", v); setRequeteAdresse(v); }}
                autoComplete="street-address"
              />
              {listeAdresse && resultatsAdresse.length > 0 && (
                <ul className={`${CADRE} absolute z-20 mt-1 w-full`}>
                  {resultatsAdresse.map((a) => (
                    <li key={a}>
                      <button
                        type="button"
                        onClick={() => { champ("adresse", a); setListeAdresse(false); }}
                        className="block w-full px-3 py-2.5 text-left text-[13px] text-[#C9C4BC] transition-colors hover:bg-[var(--clp-bord)]"
                      >
                        {a}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Champ label="SIRET" requis valeur={form.siret} sur={(v) => champ("siret", v)} lectureSeule={siretVerrouille} mono />
            <Champ label="N° de TVA intracommunautaire" requis valeur={form.tva} sur={(v) => champ("tva", v)} mono aide={siretVerrouille ? "Calculé depuis le SIRET. Corrigez-le s'il diffère." : undefined} />
          </Section>

          <Section titre="Votre événement">
            <Liste label="Espace souhaité" requis valeur={form.espace} sur={changerEspace} options={ESPACES} />
            {/*
              Le créneau ne s'affiche qu'une fois le lieu choisi, et disparaît
              quand le lieu n'en propose qu'un : proposer « Journée complète »
              comme unique option d'une liste déroulante est une question dont
              on connaît déjà la réponse.
            */}
            {creneaux.length > 1 ? (
              <Liste label="Créneau" requis valeur={form.creneau} sur={(v) => champ("creneau", v)} options={creneaux} />
            ) : (
              <div>
                <p className={LABEL}>Créneau</p>
                <p className={`${CADRE} mt-2 px-3 py-3 font-mono text-[13px] text-[#8A8A8A]`}>
                  {form.espace ? `${JOURNEE} — c'est le seul créneau de ce lieu.` : "Choisissez d'abord un espace."}
                </p>
              </div>
            )}
            <Champ label="Date de début" requis type="date" valeur={form.dateDebut} sur={(v) => champ("dateDebut", v)} mono />
            <Champ label="Date de fin" type="date" valeur={form.dateFin} sur={(v) => champ("dateFin", v)} mono aide="Seulement si l'événement dure plusieurs jours." />
            <Champ label="Nombre d'invités" requis type="number" valeur={form.invites} sur={(v) => champ("invites", v)} mono />
          </Section>

          {erreur && (
            <p className="mt-8 border border-[#8C3B3B] bg-[#2A1616] px-4 py-3 font-mono text-[13px] text-[#E8B4B4]">
              {erreur}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={envoi}
              className="border border-[var(--clp-accent)] px-6 py-3.5 font-clp text-[11px] uppercase tracking-[0.16em] text-[#E8E4DC] transition-colors hover:bg-[var(--clp-accent)] hover:text-[#141414] disabled:opacity-50"
            >
              {envoi ? "Envoi…" : "Envoyer mes informations"}
            </button>
            <p className="font-mono text-[11px] text-[#8A8A8A]">
              Les champs marqués d&apos;un astérisque sont nécessaires à la facturation.
            </p>
          </div>
        </form>
      </Corps>
      <Pied />
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-10 first:mt-0">
      <legend className="font-clp text-[13px] font-bold uppercase tracking-[0.1em]">{titre}</legend>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

interface ChampProps {
  label: string;
  valeur: string;
  sur: (v: string) => void;
  requis?: boolean;
  type?: string;
  aide?: string;
  mono?: boolean;
  lectureSeule?: boolean;
  autoComplete?: string;
}

function Champ({ label, valeur, sur, requis, type = "text", aide, mono, lectureSeule, autoComplete }: ChampProps) {
  return (
    <div>
      <label className="block">
        <span className={LABEL}>
          {label}
          {requis && <span style={{ color: LAITON }}> *</span>}
        </span>
        <input
          type={type}
          value={valeur}
          required={requis}
          readOnly={lectureSeule}
          autoComplete={autoComplete}
          onChange={(e) => sur(e.target.value)}
          /*
           * ⚠️ `text-[16px]` sur les champs, et pas moins. En dessous de 16 px,
           * Safari sur iPhone zoome tout seul à la mise au point et la page
           * part de travers — un défaut qu'on ne voit jamais sur un ordinateur.
           */
          className={`mt-2 w-full border border-[var(--clp-bord)] bg-[var(--clp-carte)] px-3 py-3 text-[16px] text-[#E8E4DC] outline-none transition-colors focus:border-[var(--clp-accent)] ${
            mono ? "font-mono text-[14px]" : ""
          } ${lectureSeule ? "text-[#8A8A8A]" : ""}`}
        />
      </label>
      {aide && <p className="mt-1.5 text-[12px] leading-relaxed text-[#8A8A8A]">{aide}</p>}
    </div>
  );
}

function Liste({
  label, valeur, sur, options, requis,
}: {
  label: string; valeur: string; sur: (v: string) => void; options: readonly string[]; requis?: boolean;
}) {
  return (
    <label className="block">
      <span className={LABEL}>
        {label}
        {requis && <span style={{ color: LAITON }}> *</span>}
      </span>
      <select
        value={valeur}
        required={requis}
        onChange={(e) => sur(e.target.value)}
        className="mt-2 w-full appearance-none border border-[var(--clp-bord)] bg-[var(--clp-carte)] px-3 py-3 text-[16px] text-[#E8E4DC] outline-none transition-colors focus:border-[var(--clp-accent)]"
      >
        <option value="">Choisir…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
