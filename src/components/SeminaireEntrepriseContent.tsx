"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  LayoutGrid,
  Projector,
  UtensilsCrossed,
  Clock,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageCircle,
  Mail,
  X,
  Train,
  ParkingCircle,
  Hotel,
  Accessibility,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { trackEvent } from "@/lib/analytics";
import { ReviewsSection } from "@/components/ReviewsSection";

/* ---------- Types ---------- */

interface UspItem {
  icon: string;
  title: string;
  description: string;
}

interface FormatItem {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface SeminaireDict {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaPricing: string;
    ctaCalendly: string;
    imageAlt: string;
  };
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    imageAlt: string;
  };
  usps: {
    title: string;
    items: UspItem[];
  };
  formats: {
    title: string;
    items: FormatItem[];
  };
  location: {
    title: string;
    subtitle: string;
    address: string;
    metro: string;
    metroLines: string;
    rer: string;
    parkings: string;
    hotels: string;
    pmr: string;
  };
  gallery: {
    title: string;
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    pricing: string;
    calendly: string;
    whatsapp: string;
  };
}

/* ---------- Constants ---------- */

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  LayoutGrid,
  Projector,
  UtensilsCrossed,
  Clock,
  MapPin,
};

const GALLERY_PHOTOS = [
  "/photos/espace-travail.jpg",
  "/photos/cuisine-ouverte.jpg",
  "/photos/projection-netflix.jpg",
  "/photos/panorama-grande-salle.jpg",
  "/images/about.png",
  "/images/services/seminaires-formations.png",
  "/images/services/petit-dejeuners.png",
  "/images/services/evenements-professionnels.png",
];

/* ---------- Bento helper ---------- */

function getBentoStyle(index: number): React.CSSProperties {
  const block = Math.floor(index / 6);
  const pos = index % 6;
  const baseRow = block * 4 + 1;

  const positions: Record<number, React.CSSProperties> = {
    0: { gridColumn: "1 / 3", gridRow: `${baseRow} / ${baseRow + 2}` },
    1: { gridColumn: "3 / 4", gridRow: `${baseRow} / ${baseRow + 1}` },
    2: { gridColumn: "3 / 4", gridRow: `${baseRow + 1} / ${baseRow + 2}` },
    3: { gridColumn: "1 / 2", gridRow: `${baseRow + 2} / ${baseRow + 3}` },
    4: { gridColumn: "2 / 4", gridRow: `${baseRow + 2} / ${baseRow + 4}` },
    5: { gridColumn: "1 / 2", gridRow: `${baseRow + 3} / ${baseRow + 4}` },
  };

  return positions[pos] || {};
}

/* ---------- Sub-components ---------- */

function FaqAccordion({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-gray-200"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-lg lg:text-xl font-light pr-8">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Main Component ---------- */

export function SeminaireEntrepriseContent() {
  const { dict, locale } = useI18n();
  const t = dict.seminaireEntreprise as SeminaireDict;
  const prefix = locale === "en" ? "/en" : "";

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : null
    );
  }, []);
  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
        : null
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-end overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/espace-travail.jpg"
            alt={t.hero.imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-white pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Link
                href={`${prefix}/`}
                className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                {locale === "en" ? "Home" : "Accueil"}
              </Link>
            </div>
            <h1 className="text-4xl lg:text-7xl font-light mb-6 tracking-tight max-w-5xl">
              {t.hero.title}
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 font-light max-w-2xl mb-4">
              {t.hero.subtitle}
            </p>
            <p className="text-base lg:text-lg text-white/70 font-light max-w-3xl mb-10">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={EXTERNAL_LINKS.pricing}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "seminaire_hero_pricing",
                    destination: EXTERNAL_LINKS.pricing,
                  })
                }
                className="inline-flex items-center gap-3 bg-white text-black hover:bg-white/90 px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300"
              >
                {t.hero.ctaPricing}
              </a>
              <a
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "seminaire_hero_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
                className="inline-flex items-center gap-3 border border-white/30 hover:border-white text-white px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                {t.hero.ctaCalendly}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== ABOUT — Un lieu hors du commun ====== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-5xl font-light mb-8 tracking-tight">
                {t.about.title}
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>{t.about.paragraph1}</p>
                <p>{t.about.paragraph2}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src="/photos/panorama-grande-salle.jpg"
                alt={t.about.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== USPs — Equipements tout inclus ====== */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {t.usps.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.usps.items.map((usp, i) => {
              const IconComponent = ICON_MAP[usp.icon] || Building2;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white border border-gray-100 p-8 hover:border-gray-300 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-black flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{usp.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {usp.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== FORMATS DE SEMINAIRES ====== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {t.formats.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.formats.items.map((format, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-gray-200 p-8 hover:border-black transition-colors duration-300 group"
              >
                <span className="text-sm text-gray-400 font-mono mb-4 block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-medium mb-4 group-hover:text-black transition-colors">
                  {format.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {format.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== LOCALISATION ====== */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-light mb-4 tracking-tight">
              {t.location.title}
            </h2>
            <p className="text-lg text-gray-500 mb-12">
              {t.location.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-100 p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium mb-1">{t.location.address}</p>
                <p className="text-gray-500 text-sm">{t.location.metro}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-white border border-gray-100 p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                <Train className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium mb-1">{t.location.metroLines}</p>
                <p className="text-gray-500 text-sm">{t.location.rer}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-white border border-gray-100 p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                <ParkingCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium mb-1">{t.location.parkings}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-white border border-gray-100 p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                <Hotel className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium mb-1">{t.location.hotels}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="bg-white border border-gray-100 p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                <Accessibility className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium mb-1">{t.location.pmr}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== GALERIE PHOTOS ====== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {t.gallery.title}
          </motion.h2>

          {/* Desktop bento */}
          <div
            className="hidden md:grid grid-cols-3 gap-2"
            style={{ gridAutoRows: "200px" }}
          >
            {GALLERY_PHOTOS.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
                className="relative overflow-hidden bg-gray-100 group cursor-pointer"
                style={getBentoStyle(i)}
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={src}
                  alt={`${t.hero.title} — photo ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Mobile grid */}
          <div className="grid md:hidden grid-cols-2 gap-2">
            {GALLERY_PHOTOS.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className={`relative overflow-hidden bg-gray-100 cursor-pointer ${
                  i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                }`}
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={src}
                  alt={`${t.hero.title} — photo ${i + 1}`}
                  fill
                  sizes="50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer z-10"
                aria-label={locale === "en" ? "Close" : "Fermer"}
              >
                <X className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer z-10"
                aria-label={locale === "en" ? "Previous" : "Précédent"}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer z-10"
                aria-label={locale === "en" ? "Next" : "Suivant"}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-[90vw] max-h-[85vh] w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={GALLERY_PHOTOS[lightboxIndex]}
                  alt={`${t.hero.title} — photo ${lightboxIndex + 1}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
              <p className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm z-10">
                {lightboxIndex + 1} / {GALLERY_PHOTOS.length}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ====== REVIEWS ====== */}
      <ReviewsSection />

      {/* ====== FAQ ====== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-12 tracking-tight"
          >
            {t.faq.title}
          </motion.h2>
          <div className="border-t border-gray-200">
            {t.faq.items.map((item, i) => (
              <FaqAccordion key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-light mb-6 tracking-tight">
              {t.cta.title}
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={EXTERNAL_LINKS.pricing}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "seminaire_pricing",
                    destination: EXTERNAL_LINKS.pricing,
                  })
                }
                className="inline-flex items-center gap-3 bg-white text-black hover:bg-white/90 px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300"
              >
                {t.cta.pricing}
              </a>
              <a
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "seminaire_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
                className="inline-flex items-center gap-3 border border-white/30 hover:border-white px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                {t.cta.calendly}
              </a>
              <a
                href={EXTERNAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "seminaire_whatsapp",
                    destination: EXTERNAL_LINKS.whatsapp,
                  })
                }
                className="inline-flex items-center gap-3 border border-white/30 hover:border-white px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                {t.cta.whatsapp}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
