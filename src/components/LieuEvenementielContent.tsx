"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Maximize,
  Monitor,
  UtensilsCrossed,
  Car,
  UserCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageCircle,
  Mail,
  X,
  ArrowRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { trackEvent } from "@/lib/analytics";
import { ReviewsSection } from "@/components/ReviewsSection";
import { RippleButton } from "@/components/ui/ripple-button";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface UspItem {
  title: string;
  description: string;
}

interface EventItem {
  title: string;
  description: string;
  href: string;
}

interface WhyUsItem {
  title: string;
  description: string;
}

interface GalleryPhoto {
  src: string;
  alt: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface LieuDict {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    ctaPricing: string;
  };
  space: {
    title: string;
    content1: string;
    content2: string;
  };
  usps: {
    title: string;
    items: UspItem[];
  };
  events: {
    title: string;
    items: EventItem[];
  };
  whyUs: {
    title: string;
    items: WhyUsItem[];
  };
  gallery: {
    title: string;
    photos: GalleryPhoto[];
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

/* -------------------------------------------------------------------------- */
/*  USP icon map                                                               */
/* -------------------------------------------------------------------------- */

const USP_ICONS = [MapPin, Maximize, Monitor, UtensilsCrossed, Car, UserCheck];

/* -------------------------------------------------------------------------- */
/*  Event images                                                               */
/* -------------------------------------------------------------------------- */

const EVENT_IMAGES = [
  "/images/services/gallery/fashion-shows/01.jpg",
  "/images/services/gallery/diners-exception/01.jpg",
  "/images/hero.png",
  "/images/services/gallery/evenements-auto-moto/01.jpg",
  "/photos/cyclorama-projection.jpg",
];

/* -------------------------------------------------------------------------- */
/*  Gallery photos                                                             */
/* -------------------------------------------------------------------------- */

const GALLERY_PHOTOS = [
  "/images/hero.png",
  "/photos/panorama-grande-salle.jpg",
  "/photos/entree-verriere.jpg",
  "/photos/cuisine-equipee.jpg",
  "/photos/fauteuils-design.jpg",
  "/photos/canape-rose.jpg",
  "/images/venue-1.png",
  "/images/venue-2.png",
  "/images/venue-3.png",
  "/photos/cyclorama-projection.jpg",
];

/* -------------------------------------------------------------------------- */
/*  Bento grid layout                                                          */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  FAQ Accordion Item                                                         */
/* -------------------------------------------------------------------------- */

function FaqAccordionItem({
  item,
  index,
}: {
  item: FaqItem;
  index: number;
}) {
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
            <p className="pb-6 text-gray-600 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                             */
/* -------------------------------------------------------------------------- */

export function LieuEvenementielContent() {
  const { dict, locale } = useI18n();
  const lieu = dict.lieuEvenementiel as LieuDict;
  const prefix = locale === "en" ? "/en" : "";

  // Gallery lightbox state
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

  if (!lieu) return null;

  const galleryAlts =
    lieu.gallery?.photos?.map((p) => p.alt) ||
    GALLERY_PHOTOS.map((_, i) => `Photo ${i + 1}`);

  return (
    <>
      {/* ================================================================== */}
      {/*  (a) Hero Section                                                   */}
      {/* ================================================================== */}
      <section className="relative min-h-[80vh] lg:min-h-[90vh] flex flex-col justify-end overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt={lieu.hero.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-white pb-16 lg:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-white/60 mb-6">
              {lieu.hero.subtitle}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light mb-8 tracking-tight max-w-5xl leading-[1.1]">
              {lieu.hero.title}
            </h1>
            <p className="text-lg lg:text-xl text-white/80 font-light max-w-2xl mb-12 leading-relaxed">
              {lieu.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <RippleButton
                href={EXTERNAL_LINKS.pricing}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-black"
                className="bg-white text-black hover:text-white px-8 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "lieu_hero_pricing",
                    destination: EXTERNAL_LINKS.pricing,
                  })
                }
              >
                {lieu.hero.ctaPricing}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "lieu_hero_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
              >
                <Calendar className="w-4 h-4" />
                {lieu.hero.cta}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  (b) Notre Espace                                                   */}
      {/* ================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-5xl font-light mb-10 tracking-tight">
                {lieu.space.title}
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>{lieu.space.content1}</p>
                <p>{lieu.space.content2}</p>
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
                alt={lieu.space.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  (c) USPs                                                           */}
      {/* ================================================================== */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {lieu.usps.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lieu.usps.items.map((usp, i) => {
              const Icon = USP_ICONS[i] || MapPin;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-8 bg-white border border-gray-100 hover:border-gray-300 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-black flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium mb-3 tracking-tight">
                    {usp.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {usp.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  (d) Types d'evenements                                             */}
      {/* ================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {lieu.events.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lieu.events.items.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`${prefix}${event.href}`}
                  className="group block overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-5">
                    <Image
                      src={EVENT_IMAGES[i] || "/images/hero.png"}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 tracking-tight group-hover:text-gray-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    {event.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium group-hover:gap-3 transition-all duration-300">
                    {locale === "en" ? "Learn more" : "En savoir plus"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  (e) Pourquoi nous choisir                                          */}
      {/* ================================================================== */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {lieu.whyUs.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {lieu.whyUs.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-10 h-px bg-white/30 mb-8" />
                <h3 className="text-xl font-light mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  (f) Galerie Photos — Bento Grid + Lightbox                         */}
      {/* ================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {lieu.gallery.title}
          </motion.h2>

          {/* Desktop bento (3 cols) */}
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
                  alt={galleryAlts[i] || `Photo ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Mobile grid (2 cols) */}
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
                  alt={galleryAlts[i] || `Photo ${i + 1}`}
                  fill
                  sizes="50vw"
                  className="object-cover object-center"
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
                  src={GALLERY_PHOTOS[lightboxIndex]}
                  alt={galleryAlts[lightboxIndex] || `Photo ${lightboxIndex + 1}`}
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

      {/* ================================================================== */}
      {/*  (g) Reviews                                                        */}
      {/* ================================================================== */}
      <ReviewsSection />

      {/* ================================================================== */}
      {/*  (h) FAQ                                                            */}
      {/* ================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-12 tracking-tight"
          >
            {lieu.faq.title}
          </motion.h2>
          <div className="border-t border-gray-200">
            {lieu.faq.items.map((item, i) => (
              <FaqAccordionItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  (i) CTA Section                                                    */}
      {/* ================================================================== */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-light mb-6 tracking-tight">
              {lieu.cta.title}
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              {lieu.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <RippleButton
                href={EXTERNAL_LINKS.pricing}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-black"
                className="bg-white text-black hover:text-white px-8 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "lieu_pricing",
                    destination: EXTERNAL_LINKS.pricing,
                  })
                }
              >
                {lieu.cta.pricing}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "lieu_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
              >
                <Calendar className="w-4 h-4" />
                {lieu.cta.calendly}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "lieu_whatsapp",
                    destination: EXTERNAL_LINKS.whatsapp,
                  })
                }
              >
                <MessageCircle className="w-4 h-4" />
                {lieu.cta.whatsapp}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
