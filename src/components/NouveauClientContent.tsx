"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  CheckCircle,
  AlertCircle,
  CreditCard,
  Shield,
  Clock,
  ChevronDown,
  X,
  Building2,
  Loader2,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  SIREN autocomplete types                                           */
/* ------------------------------------------------------------------ */

interface SireneResult {
  nom_complet: string;
  siren: string;
  siege: {
    siret: string;
    adresse: string;
    commune: string;
  };
}

/* ------------------------------------------------------------------ */
/*  Form data type                                                     */
/* ------------------------------------------------------------------ */

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  clientFinal: string;
  address: string;
  siret: string;
  tvaNumber: string;
  dateStart: string;
  dateEnd: string;
  creneau: string;
  guestCount: string;
  espace: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  clientFinal: "",
  address: "",
  siret: "",
  tvaNumber: "",
  dateStart: "",
  dateEnd: "",
  creneau: "",
  guestCount: "",
  espace: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function useDebouncedValue(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function NouveauClientContent() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // SIREN autocomplete
  const [sireneQuery, setSireneQuery] = useState("");
  const [sireneResults, setSireneResults] = useState<SireneResult[]>([]);
  const [sireneLoading, setSireneLoading] = useState(false);
  const [showSirene, setShowSirene] = useState(false);
  const [siretReadonly, setSiretReadonly] = useState(false);
  const sireneRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebouncedValue(sireneQuery, 300);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sireneRef.current && !sireneRef.current.contains(e.target as Node)) {
        setShowSirene(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch SIRENE API
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSireneResults([]);
      return;
    }

    let cancelled = false;
    setSireneLoading(true);

    fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(
        debouncedQuery
      )}&per_page=5`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.results) {
          setSireneResults(data.results);
          setShowSirene(true);
        }
      })
      .catch(() => {
        if (!cancelled) setSireneResults([]);
      })
      .finally(() => {
        if (!cancelled) setSireneLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const handleSireneSelect = useCallback(
    (result: SireneResult) => {
      setForm((prev) => ({
        ...prev,
        companyName: result.nom_complet,
        siret: result.siege.siret,
      }));
      setSireneQuery(result.nom_complet);
      setSiretReadonly(true);
      setShowSirene(false);
    },
    []
  );

  const clearSirene = useCallback(() => {
    setForm((prev) => ({ ...prev, companyName: "", siret: "" }));
    setSireneQuery("");
    setSiretReadonly(false);
    setSireneResults([]);
  }, []);

  const updateField = useCallback(
    (field: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Map form fields to API payload
    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      company: form.companyName,
      endClient: form.clientFinal || undefined,
      address: form.address,
      siret: form.siret,
      tva: form.tvaNumber,
      dateStart: form.dateStart,
      dateEnd: form.dateEnd || undefined,
      timeSlot: form.creneau,
      guestCount: parseInt(form.guestCount, 10) || 0,
      space: form.espace,
    };

    try {
      const res = await fetch("/api/nouveau-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setSubmitted(true);
      trackEvent("form_submit", {
        form_name: "nouveau_client",
        form_location: "nouveau-client",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Success state                                                    */
  /* ---------------------------------------------------------------- */

  if (submitted) {
    return (
      <>
        {/* Hero kept for visual continuity */}
        <section className="relative min-h-[50vh] flex flex-col justify-end overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/photos/panorama-grande-salle.jpg"
              alt="Vue panoramique de Chez Les Plombiers"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/65" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-white pb-16 pt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-6">
                Confirmation
              </p>
              <h1 className="text-4xl lg:text-7xl font-light mb-6 tracking-tight max-w-5xl">
                Informations envoy&eacute;es
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-8" />
              <h2 className="text-3xl lg:text-5xl font-light mb-6 tracking-tight">
                Merci pour votre confiance
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                C&eacute;line vous recontactera sous 48h avec une proposition
                tarifaire personnalis&eacute;e.
              </p>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Main render                                                      */
  /* ---------------------------------------------------------------- */

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex flex-col justify-end overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/panorama-grande-salle.jpg"
            alt="Vue panoramique de Chez Les Plombiers"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-white pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-6">
              Votre &eacute;v&eacute;nement
            </p>
            <h1 className="text-4xl lg:text-7xl font-light mb-6 tracking-tight max-w-5xl">
              Bienvenue Chez&nbsp;Les&nbsp;Plombiers
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 font-light max-w-3xl">
              Nous sommes ravis de vous accueillir. Quelques informations
              pour pr&eacute;parer votre proposition personnalis&eacute;e.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* INFO BLOCK — Ce qui va se passer                              */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-light mb-12 tracking-tight">
              Les prochaines &eacute;tapes
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              Merci de l&apos;int&eacute;r&ecirc;t que vous portez &agrave; nos
              espaces. Compl&eacute;tez les informations ci-dessous : vous
              recevrez votre proposition tarifaire personnalis&eacute;e sous 24
              heures.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Paiement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0 }}
                className="bg-gray-50 p-8 border border-gray-100"
              >
                <div className="w-12 h-12 bg-black flex items-center justify-center mb-6">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-medium mb-3">Paiement</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Votre r&eacute;servation est confirm&eacute;e d&egrave;s
                  r&eacute;ception du r&egrave;glement int&eacute;gral.
                </p>
              </motion.div>

              {/* Caution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="bg-gray-50 p-8 border border-gray-100"
              >
                <div className="w-12 h-12 bg-black flex items-center justify-center mb-6">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-medium mb-3">D&eacute;p&ocirc;t de garantie</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-2">
                  Un d&eacute;p&ocirc;t de garantie est demand&eacute; avant
                  chaque &eacute;v&eacute;nement :
                </p>
                <ul className="text-gray-600 leading-relaxed text-sm space-y-2">
                  <li>
                    <span className="font-medium text-black">5 000 &euro;</span>{" "}
                    pour Chez les Plombiers
                  </li>
                  <li>
                    <span className="font-medium text-black">3 000 &euro;</span>{" "}
                    pour l&apos;Appartement Rose
                  </li>
                </ul>
              </motion.div>

              {/* Restitution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="bg-gray-50 p-8 border border-gray-100"
              >
                <div className="w-12 h-12 bg-black flex items-center justify-center mb-6">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-medium mb-3">Restitution</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Le d&eacute;p&ocirc;t de garantie vous est restitu&eacute;
                  sous 8 jours ouvr&eacute;s apr&egrave;s votre
                  &eacute;v&eacute;nement, suite &agrave; l&apos;&eacute;tat
                  des lieux de sortie.
                </p>
              </motion.div>
            </div>

            {/* Important notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-8 bg-black text-white p-8"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-white/60 flex-shrink-0 mt-0.5" />
                <div className="text-sm leading-relaxed text-white/80">
                  <p className="mb-3">
                    Le d&eacute;p&ocirc;t de garantie est &agrave; r&eacute;gler
                    par virement bancaire,{" "}
                    <strong className="text-white">
                      au plus tard 48 heures avant le d&eacute;but de votre
                      &eacute;v&eacute;nement
                    </strong>
                    .
                  </p>
                  <p>
                    Pour les r&eacute;servations d&eacute;butant un lundi, nous
                    vous remercions d&apos;effectuer le virement au plus tard le
                    jeudi pr&eacute;c&eacute;dent afin de garantir sa bonne
                    r&eacute;ception.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FORM                                                          */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-light mb-6 tracking-tight">
              Vos coordonn&eacute;es
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ces informations nous permettront de pr&eacute;parer votre
              proposition sur mesure. Les champs marqu&eacute;s
              d&apos;un <span className="text-red-500">*</span> sont requis.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ---- Responsable ---- */}
            <fieldset className="space-y-6">
              <legend className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">
                Responsable facturation
              </legend>

              <FormField
                label="Pr&eacute;nom et Nom"
                required
                value={form.fullName}
                onChange={(v) => updateField("fullName", v)}
                placeholder="Jean Dupont"
                autoComplete="name"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Email facturation"
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => updateField("email", v)}
                  placeholder="facturation@entreprise.fr"
                  autoComplete="email"
                />
                <FormField
                  label="T&eacute;l&eacute;phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(v) => updateField("phone", v)}
                  placeholder="+33 6 00 00 00 00"
                  autoComplete="tel"
                />
              </div>
            </fieldset>

            {/* ---- Entreprise ---- */}
            <fieldset className="space-y-6">
              <legend className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">
                Entreprise
              </legend>

              {/* Company name with SIREN autocomplete */}
              <div ref={sireneRef} className="relative">
                <label className="block text-sm font-medium mb-2">
                  Nom l&eacute;gal de la soci&eacute;t&eacute;{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={siretReadonly ? form.companyName : sireneQuery}
                    onChange={(e) => {
                      if (siretReadonly) {
                        clearSirene();
                      } else {
                        setSireneQuery(e.target.value);
                        updateField("companyName", e.target.value);
                      }
                    }}
                    placeholder="Rechercher une entreprise..."
                    className="w-full bg-white border border-gray-200 px-4 py-4 pl-12 text-sm focus:outline-none focus:border-black transition-colors"
                    autoComplete="off"
                  />
                  {sireneLoading && (
                    <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                  )}
                  {siretReadonly && (
                    <button
                      type="button"
                      onClick={clearSirene}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                      aria-label="Effacer la s&eacute;lection"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Dropdown */}
                <AnimatePresence>
                  {showSirene && sireneResults.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-20 w-full bg-white border border-gray-200 mt-1 shadow-lg max-h-64 overflow-y-auto"
                    >
                      {sireneResults.map((result) => (
                        <li key={result.siren}>
                          <button
                            type="button"
                            onClick={() => handleSireneSelect(result)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <p className="text-sm font-medium">
                              {result.nom_complet}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              SIRET {result.siege.siret} &mdash;{" "}
                              {result.siege.commune}
                            </p>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <FormField
                label="Client final (si vous &ecirc;tes une agence)"
                value={form.clientFinal}
                onChange={(v) => updateField("clientFinal", v)}
                placeholder="Nom du client final"
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Adresse postale compl&egrave;te{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Num&eacute;ro, rue, code postal, ville"
                  rows={3}
                  className="w-full bg-white border border-gray-200 px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  autoComplete="street-address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="SIRET"
                  required
                  value={form.siret}
                  onChange={(v) => updateField("siret", v)}
                  placeholder="123 456 789 00012"
                  readOnly={siretReadonly}
                />
                <FormField
                  label="Num&eacute;ro de TVA"
                  required
                  value={form.tvaNumber}
                  onChange={(v) => updateField("tvaNumber", v)}
                  placeholder="FR 12 345678901"
                />
              </div>
            </fieldset>

            {/* ---- Event details ---- */}
            <fieldset className="space-y-6">
              <legend className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">
                D&eacute;tails de l&apos;&eacute;v&eacute;nement
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Date de d&eacute;but"
                  required
                  type="date"
                  value={form.dateStart}
                  onChange={(v) => updateField("dateStart", v)}
                />
                <FormField
                  label="Date de fin (optionnel)"
                  type="date"
                  value={form.dateEnd}
                  onChange={(v) => updateField("dateEnd", v)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Cr&eacute;neau"
                  required
                  value={form.creneau}
                  onChange={(v) => updateField("creneau", v)}
                  options={[
                    { value: "", label: "S\u00e9lectionnez..." },
                    { value: "Matin\u00e9e (7h-13h)", label: "Matin\u00e9e (7h-13h)" },
                    {
                      value: "Apr\u00e8s-midi (13h-19h)",
                      label: "Apr\u00e8s-midi (13h-19h)",
                    },
                    {
                      value: "Journ\u00e9e compl\u00e8te (7h-23h)",
                      label: "Journ\u00e9e compl\u00e8te (7h-23h)",
                    },
                  ]}
                />
                <FormField
                  label="Nombre d&apos;invit&eacute;s"
                  required
                  type="number"
                  value={form.guestCount}
                  onChange={(v) => updateField("guestCount", v)}
                  placeholder="Ex: 80"
                  min={1}
                  max={200}
                />
                <SelectField
                  label="Espace souhait&eacute;"
                  required
                  value={form.espace}
                  onChange={(v) => updateField("espace", v)}
                  options={[
                    { value: "", label: "S\u00e9lectionnez..." },
                    { value: "Chez les Plombiers", label: "Chez les Plombiers" },
                    { value: "Appartement Rose", label: "Appartement Rose" },
                    { value: "Les deux", label: "Les deux" },
                  ]}
                />
              </div>
            </fieldset>

            {/* ---- Error ---- */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 bg-red-50 text-red-700 px-6 py-4 text-sm border border-red-100"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---- Submit ---- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto bg-black text-white px-12 py-4 text-sm uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {submitting && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                Envoyer mes informations
              </button>
            </motion.div>
          </form>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable form components                                           */
/* ------------------------------------------------------------------ */

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  autoComplete?: string;
  min?: number;
  max?: number;
}

function FormField({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  readOnly,
  autoComplete,
  min,
  max,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        <span dangerouslySetInnerHTML={{ __html: label }} />
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete={autoComplete}
        min={min}
        max={max}
        className={`w-full bg-white border border-gray-200 px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors ${
          readOnly ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function SelectField({
  label,
  required,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        <span dangerouslySetInnerHTML={{ __html: label }} />
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        <select
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-gray-200 px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors appearance-none pr-10"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
