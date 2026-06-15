"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Frame,
  Lightbulb,
  Zap,
  MapPin,
  Warehouse,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Calendar,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { trackEvent } from "@/lib/analytics";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SeoPagesCrossLinks } from "@/components/SeoPagesCrossLinks";
import ClientLogosSection from "@/components/ClientLogosSection";
import { RippleButton } from "@/components/ui/ripple-button";
import { FEATURED_SERVICE_SLUGS, getServiceEnSlug } from "@/lib/services-data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface UspItem {
  icon: string;
  title: string;
  description: string;
}

interface ProductionItem {
  title: string;
  description: string;
}

interface WhyUsItem {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ShootingVoitureDict {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaPricing: string;
    ctaCalendly: string;
  };
  access: {
    sectionTitle: string;
    paragraph1: string;
    paragraph2: string;
    imageAlt: string;
  };
  usps: {
    sectionTitle: string;
    items: UspItem[];
  };
  productions: {
    sectionTitle: string;
    items: ProductionItem[];
  };
  gallery: {
    sectionTitle: string;
  };
  whyUs: {
    sectionTitle: string;
    items: WhyUsItem[];
  };
  faq: {
    sectionTitle: string;
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

/* ------------------------------------------------------------------ */
/*  Icon resolver                                                      */
/* ------------------------------------------------------------------ */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Car,
  Frame,
  Lightbulb,
  Zap,
  MapPin,
  Warehouse,
};

/* ------------------------------------------------------------------ */
/*  Gallery photos — 10 selected from evenements-auto-moto             */
/* ------------------------------------------------------------------ */

const GALLERY_NUMBERS = ["01", "03", "05", "07", "09", "11", "13", "15", "17", "19"];
const galleryPhotos = GALLERY_NUMBERS.map(
  (n) => `/images/services/gallery/evenements-auto-moto/${n}.jpg`
);

/* ------------------------------------------------------------------ */
/*  Bento grid helper                                                  */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
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
        <span className="text-lg lg:text-xl font-light pr-8">{item.question}</span>
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

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function ShootingVoitureContent() {
  const { dict, locale } = useI18n();
  const t = dict.shootingVoiture as ShootingVoitureDict;
  const prefix = locale === "en" ? "/en" : "";

  /* Lightbox state */
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryPhotos.length : null
    );
  }, []);
  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length
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

  if (!t) return null;

  return (
    <>
      {/* ============================================================ */}
      {/* (a) HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex flex-col justify-end overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/evenements-auto-moto.jpg"
            alt={t.hero.title}
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
            <h1 className="text-4xl lg:text-7xl mb-6 tracking-tight max-w-5xl">
              {t.hero.title}
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 font-light max-w-3xl mb-10">
              {t.hero.subtitle}
            </p>
            <p className="text-base lg:text-lg text-white/70 max-w-3xl mb-12 leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <RippleButton
                href={EXTERNAL_LINKS.pricing}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "shooting_hero_pricing",
                    destination: EXTERNAL_LINKS.pricing,
                  })
                }
                rippleColor="bg-black"
                className="bg-white text-black hover:text-white px-8 py-4 text-sm uppercase tracking-widest"
              >
                {t.hero.ctaPricing}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "shooting_hero_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
              >
                <Calendar className="w-4 h-4" />
                {t.hero.ctaCalendly}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>

      <ClientLogosSection theme="light" title="" />

      {/* ============================================================ */}
      {/* (b) LE SEUL STUDIO AUTO AVEC ACCES RUE                       */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {t.access.sectionTitle}
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-lg lg:text-xl text-gray-700 leading-relaxed"
            >
              <p>{t.access.paragraph1}</p>
              <p>{t.access.paragraph2}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src="/images/services/gallery/evenements-auto-moto/05.jpg"
                alt={t.access.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* (c) EQUIPEMENTS SHOOTING AUTO — 6 USPs                       */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {t.usps.sectionTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.usps.items.map((usp, i) => {
              const Icon = iconMap[usp.icon] || Car;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white p-8 border border-gray-100 hover:border-gray-300 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-black flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg mb-3">{usp.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {usp.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* (d) TYPES DE PRODUCTIONS AUTO — 5 cards                      */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {t.productions.sectionTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.productions.items.map((prod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-gray-200 p-8 hover:border-black transition-colors duration-300"
              >
                <h3 className="text-lg mb-3">{prod.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {prod.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* (e) GALERIE PHOTOS — bento grid + lightbox                   */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {t.gallery.sectionTitle}
          </motion.h2>

          {/* Desktop grid — portrait photos (3 cols, 3/4 aspect) */}
          <div className="hidden md:grid grid-cols-3 gap-3">
            {galleryPhotos.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
                className="relative overflow-hidden bg-gray-100 group cursor-pointer aspect-[3/4]"
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={src}
                  alt={`${t.hero.title} — photo ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Mobile grid (2 cols, portrait aspect) */}
          <div className="grid md:hidden grid-cols-2 gap-2">
            {galleryPhotos.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className={`relative overflow-hidden bg-gray-100 cursor-pointer ${
                  i === 0 ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"
                }`}
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={src}
                  alt={`${t.hero.title} — photo ${i + 1}`}
                  fill
                  sizes="50vw"
                  className="object-cover object-bottom"
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
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Precedent"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Suivant"
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
                  src={galleryPhotos[lightboxIndex]}
                  alt={`${t.hero.title} — photo ${lightboxIndex + 1}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
              <p className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm z-10">
                {lightboxIndex + 1} / {galleryPhotos.length}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ============================================================ */}
      {/* (f) POURQUOI CLP — 3 colonnes bg-black                       */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {t.whyUs.sectionTitle}
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {t.whyUs.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-xl mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* (g) REVIEWS                                                   */}
      {/* ============================================================ */}
      <ReviewsSection />

      {/* ============================================================ */}
      {/* (h) FAQ                                                       */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-12 tracking-tight"
          >
            {t.faq.sectionTitle}
          </motion.h2>
          <div className="border-t border-gray-200">
            {t.faq.items.map((item, i) => (
              <FaqAccordionItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl mb-10 tracking-tight">
            {locale === "en" ? "Our Events" : "Nos Événements"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_SERVICE_SLUGS.map((serviceSlug, i) => {
              const serviceDict = (dict.servicePages as Record<string, unknown>)?.services as Record<string, { title: string }> | undefined;
              const dictKey = locale === "en" ? getServiceEnSlug(serviceSlug) : serviceSlug;
              const serviceData = serviceDict?.[dictKey];
              if (!serviceData) return null;
              const serviceHref = locale === "en"
                ? `/en/services/${getServiceEnSlug(serviceSlug)}`
                : `/services/${serviceSlug}`;
              return (
                <motion.div
                  key={serviceSlug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Link
                    href={serviceHref}
                    onClick={() =>
                      trackEvent("nav_click", {
                        label: `shooting_crosslink_${serviceSlug}`,
                        destination: serviceHref,
                      })
                    }
                    className="group block border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-black hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-light uppercase tracking-[0.1em] group-hover:text-black transition-colors">
                        {serviceData.title}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ClientLogosSection compact />

      <SeoPagesCrossLinks currentSlugFr="shooting-voiture-paris" />

      {/* ============================================================ */}
      {/* (i) CTA FINAL                                                 */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl mb-6 tracking-tight">
              {t.cta.title}
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <RippleButton
                href={EXTERNAL_LINKS.pricing}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "shooting_pricing",
                    destination: EXTERNAL_LINKS.pricing,
                  })
                }
                rippleColor="bg-black"
                className="bg-white text-black hover:text-white px-8 py-4 text-sm uppercase tracking-widest"
              >
                {t.cta.pricing}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "shooting_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
              >
                <Calendar className="w-4 h-4" />
                {t.cta.calendly}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "shooting_whatsapp",
                    destination: EXTERNAL_LINKS.whatsapp,
                  })
                }
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
              >
                <MessageCircle className="w-4 h-4" />
                {t.cta.whatsapp}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
