"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Palette,
  ScanEye,
  Sun,
  Heart,
  Projector,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageCircle,
  X,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { trackEvent } from "@/lib/analytics";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SeoPagesCrossLinks } from "@/components/SeoPagesCrossLinks";
import ClientLogosSection from "@/components/ClientLogosSection";
import { RippleButton } from "@/components/ui/ripple-button";

/* ---------- Types ---------- */

interface UspItem {
  icon: string;
  title: string;
  description: string;
}

interface EventItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface EspaceAtypiqueData {
  hero: {
    h1: string;
    subtitle: string;
    description: string;
    ctaPricing: string;
    ctaCalendly: string;
  };
  story: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  usps: {
    title: string;
    items: UspItem[];
  };
  events: {
    title: string;
    items: EventItem[];
  };
  matterport: {
    title: string;
    subtitle: string;
    iframeTitle: string;
  };
  gallery: {
    title: string;
    photos: string[];
    alts: string[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    ctaPricing: string;
    ctaCalendly: string;
    ctaWhatsApp: string;
  };
}

/* ---------- Icon map ---------- */

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Palette,
  ScanEye,
  Sun,
  Heart,
  Projector,
};

/* ---------- Bento grid ---------- */

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

/* ---------- FAQ accordion item ---------- */

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
            <p className="pb-6 text-gray-600 leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Main component ---------- */

const MATTERPORT_URL = "https://my.matterport.com/show/?m=ucvB4GW2Go6";

export function EspaceAtypiqueContent() {
  const { dict, locale } = useI18n();
  const data = dict.espaceAtypique as EspaceAtypiqueData;
  const prefix = locale === "en" ? "/en" : "";

  /* Gallery lightbox */
  const photos = data.gallery.photos;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : null
    );
  }, [photos.length]);
  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    );
  }, [photos.length]);

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
      {/* ═══════════════════════════════════
          (a) Hero
      ═══════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/canape-portes-atelier.jpg"
            alt={data.hero.h1}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-white pb-20 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6 tracking-tight max-w-5xl leading-[1.1]">
              {data.hero.h1}
            </h1>
            <p className="text-lg lg:text-xl text-white/80 font-light mb-4 max-w-2xl italic">
              {data.hero.subtitle}
            </p>
            <p className="text-base lg:text-lg text-white/70 font-light max-w-2xl mb-10 leading-relaxed">
              {data.hero.description}
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
                    label: "atypique_hero_pricing",
                    destination: EXTERNAL_LINKS.pricing,
                  })
                }
              >
                {data.hero.ctaPricing}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "atypique_hero_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
              >
                <Calendar className="w-4 h-4" />
                {data.hero.ctaCalendly}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>

      <ClientLogosSection theme="light" title="" />

      {/* ═══════════════════════════════════
          (b) L'Histoire du Lieu
      ═══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-5xl mb-8 tracking-tight">
                {data.story.title}
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>{data.story.paragraph1}</p>
                <p>{data.story.paragraph2}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src="/photos/entree-verriere.jpg"
                alt={data.gallery.alts[0]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          (c) Ce qui Rend Notre Espace Unique — 6 USPs
      ═══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {data.usps.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.usps.items.map((usp, i) => {
              const Icon = iconMap[usp.icon] || Building2;
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
                    <Icon className="w-6 h-6 text-white" />
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

      {/* ═══════════════════════════════════
          (d) Événements qui subliment un espace atypique — 4 cards
      ═══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {data.events.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.events.items.map((evt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`${prefix}${evt.link}`}
                  className="group block relative overflow-hidden aspect-[16/10]"
                >
                  <Image
                    src={evt.image}
                    alt={evt.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <h3 className="text-white text-xl lg:text-2xl mb-2 tracking-tight">
                      {evt.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-md">
                      {evt.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors text-sm uppercase tracking-widest">
                      <span>
                        {locale === "en" ? "Learn more" : "En savoir plus"}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          (e) Visite Virtuelle 3D — Matterport
      ═══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-5xl mb-4 tracking-tight">
              {data.matterport.title}
            </h2>
            <p className="text-white/60 text-lg">{data.matterport.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-video"
          >
            <iframe
              src={MATTERPORT_URL}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
              title={data.matterport.iframeTitle}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          (f) Galerie Photos — Bento grid + lightbox
      ═══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {data.gallery.title}
          </motion.h2>

          {/* Desktop bento (3 cols) */}
          <div
            className="hidden md:grid grid-cols-3 gap-2"
            style={{ gridAutoRows: "200px" }}
          >
            {photos.map((src, i) => (
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
                  alt={data.gallery.alts[i] || `Photo ${i + 1}`}
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
            {photos.map((src, i) => (
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
                  alt={data.gallery.alts[i] || `Photo ${i + 1}`}
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
                aria-label="Précédent"
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
                  src={photos[lightboxIndex]}
                  alt={
                    data.gallery.alts[lightboxIndex] ||
                    `Photo ${lightboxIndex + 1}`
                  }
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
              <p className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm z-10">
                {lightboxIndex + 1} / {photos.length}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ═══════════════════════════════════
          (g) Reviews
      ═══════════════════════════════════ */}
      <ReviewsSection />

      {/* ═══════════════════════════════════
          (h) FAQ
      ═══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-12 tracking-tight"
          >
            {data.faq.title}
          </motion.h2>
          <div className="border-t border-gray-200">
            {data.faq.items.map((item, i) => (
              <FaqAccordionItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ClientLogosSection compact />

      <SeoPagesCrossLinks currentSlugFr="espace-atypique-paris" />

      {/* ═══════════════════════════════════
          (i) CTA Final
      ═══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl mb-6 tracking-tight">
              {data.cta.title}
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              {data.cta.subtitle}
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
                    label: "atypique_pricing",
                    destination: EXTERNAL_LINKS.pricing,
                  })
                }
              >
                {data.cta.ctaPricing}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "atypique_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
              >
                <Calendar className="w-4 h-4" />
                {data.cta.ctaCalendly}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "atypique_whatsapp",
                    destination: EXTERNAL_LINKS.whatsapp,
                  })
                }
              >
                <MessageCircle className="w-4 h-4" />
                {data.cta.ctaWhatsApp}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
