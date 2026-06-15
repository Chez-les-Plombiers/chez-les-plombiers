"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageCircle,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";
import { SERVICE_IMAGES, SERVICE_GALLERY, FEATURED_SERVICE_SLUGS, getServiceEnSlug } from "@/lib/services-data";
import { SEO_PAGES, SERVICE_TO_SEO_PAGE } from "@/lib/seo-pages-data";
import { ReviewsSection } from "@/components/ReviewsSection";
import ClientLogosSection from "@/components/ClientLogosSection";
import { RippleButton } from "@/components/ui/ripple-button";

/** Slugs dont la galerie s'affiche en grille paysage uniforme 3:2 (au lieu du bento). */
const LANDSCAPE_GALLERY_SLUGS = ["diners-exception", "evenements-culturels"];

interface ServiceSpec {
  value: string;
  unit: string;
  label: string;
}

interface ServiceFaq {
  question: string;
  answer: string;
}

interface ServiceData {
  title: string;
  tagline: string;
  description: string;
  descriptionExtended?: string;
  specs: ServiceSpec[];
  features: string[];
  faq: ServiceFaq[];
  meta: { title: string; description: string; ogDescription: string };
}

interface ServicePagesDict {
  backToHome: string;
  backToServices: string;
  specsTitle: string;
  featuresTitle: string;
  galleryTitle: string;
  faqTitle: string;
  alsoDiscoverTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPricing: string;
  ctaCalendly: string;
  ctaWhatsApp: string;
  services: Record<string, ServiceData>;
}

function FaqItem({ item, index }: { item: ServiceFaq; index: number }) {
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

/**
 * Compute bento grid position for a photo at given index.
 * Repeating pattern every 6 items / 4 rows:
 *   [BIG 2×2] [small] → row 1-2
 *              [small]
 *   [small] [BIG 2×2] → row 3-4
 *   [small]
 */
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

export function ServicePageContent({ slug }: { slug: string }) {
  const { dict, locale } = useI18n();
  const servicePages = dict.servicePages as ServicePagesDict;

  // In EN dict, the service key is the EN slug; in FR dict, it's the FR slug
  const dictKey = locale === "en" ? getServiceEnSlug(slug) : slug;
  const service = servicePages.services[dictKey];
  const image = SERVICE_IMAGES[slug] || "/images/hero.png";
  const gallery = SERVICE_GALLERY[slug] || [];
  const prefix = locale === "en" ? "/en" : "";

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % gallery.length : null
    );
  }, [gallery.length]);
  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + gallery.length) % gallery.length : null
    );
  }, [gallery.length]);

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

  if (!service) return null;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
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
                {servicePages.backToHome}
              </Link>
              <span className="text-white/40">/</span>
              <Link
                href={`${prefix}/#services`}
                className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                {servicePages.backToServices}
              </Link>
            </div>
            <h1 className="text-4xl lg:text-7xl mb-6 tracking-tight max-w-4xl">
              {service.title}
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 font-light max-w-2xl mb-10">
              {service.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <RippleButton
                href={EXTERNAL_LINKS.pricing}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-black"
                className="bg-white text-black hover:text-white px-10 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "service_hero_pricing",
                    destination: EXTERNAL_LINKS.pricing,
                  })
                }
              >
                {servicePages.ctaPricing}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-10 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "service_hero_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
              >
                <Calendar className="w-4 h-4" />
                {servicePages.ctaCalendly}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>

      <ClientLogosSection theme="light" title="" />

      {/* Description + Specs */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6 text-lg lg:text-xl text-gray-700 leading-relaxed">
                <p>{service.description}</p>
                {service.descriptionExtended && (
                  <p>{service.descriptionExtended}</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8">
                {servicePages.specsTitle}
              </h2>
              <div className="grid grid-cols-2 gap-8">
                {service.specs.map((spec, i) => (
                  <div key={i} className="border-t border-gray-200 pt-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-5xl font-light tracking-tighter">
                        {spec.value}
                      </span>
                      {spec.unit && (
                        <span className="text-lg text-gray-500">{spec.unit}</span>
                      )}
                    </div>
                    <span className="text-sm uppercase tracking-widest text-gray-500 mt-2 block">
                      {spec.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Bento */}
      {gallery.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
            >
              {servicePages.galleryTitle}
            </motion.h2>

            {LANDSCAPE_GALLERY_SLUGS.includes(slug) ? (
              /* Galerie paysage — grille uniforme 3:2 */
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {gallery.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
                    className="relative aspect-[3/2] overflow-hidden bg-gray-100 group cursor-pointer"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <Image
                      src={src}
                      alt={`${service.title} — photo ${i + 1}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <>
                {/* Desktop bento (3 cols) */}
                <div
                  className="hidden md:grid grid-cols-3 gap-2"
                  style={{ gridAutoRows: "200px" }}
                >
                  {gallery.map((src, i) => (
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
                        alt={`${service.title} — photo ${i + 1}`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                  ))}
                </div>

                {/* Mobile grid (2 cols) */}
                <div className="grid md:hidden grid-cols-2 gap-2">
                  {gallery.map((src, i) => (
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
                        alt={`${service.title} — photo ${i + 1}`}
                        fill
                        sizes="50vw"
                        className="object-cover object-top"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
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
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer z-10"
                  aria-label="Précédent"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
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
                    src={gallery[lightboxIndex]}
                    alt={`${service.title} — photo ${lightboxIndex + 1}`}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
                <p className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm z-10">
                  {lightboxIndex + 1} / {gallery.length}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* Features */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {servicePages.featuresTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 bg-white border border-gray-100 hover:border-gray-300 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-black flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-white stroke-[2.5]" />
                </div>
                <span className="text-gray-700 leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection />

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-12 tracking-tight"
          >
            {servicePages.faqTitle}
          </motion.h2>
          <div className="border-t border-gray-200">
            {service.faq.map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links to other services */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl mb-10 tracking-tight">
            {servicePages.alsoDiscoverTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_SERVICE_SLUGS.filter((s) => s !== slug).map((otherSlug, i) => {
              const otherDictKey = locale === "en" ? getServiceEnSlug(otherSlug) : otherSlug;
              const otherService = servicePages.services[otherDictKey];
              if (!otherService) return null;
              const otherHref = locale === "en"
                ? `/en/services/${getServiceEnSlug(otherSlug)}`
                : `/services/${otherSlug}`;
              return (
                <motion.div
                  key={otherSlug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Link
                    href={otherHref}
                    onClick={() =>
                      trackEvent("nav_click", {
                        label: `crosslink_${otherSlug}`,
                        destination: otherHref,
                      })
                    }
                    className="group block border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-black hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-light uppercase tracking-[0.1em] group-hover:text-black transition-colors">
                        {otherService.title}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: 0.36 }}
            >
              <Link
                href={locale === "en" ? "/en/apartment" : "/appartement"}
                onClick={() =>
                  trackEvent("nav_click", {
                    label: "crosslink_appartement",
                    destination: locale === "en" ? "/en/apartment" : "/appartement",
                  })
                }
                className="group block border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-black hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-light uppercase tracking-[0.1em] group-hover:text-black transition-colors">
                    {locale === "en" ? "The Pink Apartment" : "L'Appartement Rose"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {(() => {
        const seoSlugFr = SERVICE_TO_SEO_PAGE[slug];
        const seoPage = seoSlugFr
          ? SEO_PAGES.find((p) => p.slugFr === seoSlugFr)
          : null;
        if (!seoPage) return null;
        const seoSlug = locale === "en" ? seoPage.slugEn : seoPage.slugFr;
        const seoHref = `${prefix}/${seoSlug}`;
        return (
          <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <Link
                href={seoHref}
                onClick={() =>
                  trackEvent("nav_click", {
                    label: `service_to_seo_${seoPage.slugFr}`,
                    destination: seoHref,
                  })
                }
                className="group flex items-center justify-between py-4 border-b border-gray-200 hover:border-black transition-colors duration-300"
              >
                <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                  {locale === "en"
                    ? `See also: ${seoPage.titleEn}`
                    : `Voir aussi : ${seoPage.titleFr}`}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </section>
        );
      })()}

      <ClientLogosSection compact />

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl mb-6 tracking-tight">
              {servicePages.ctaTitle}
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              {servicePages.ctaDescription}
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
                    label: "service_pricing",
                    destination: EXTERNAL_LINKS.pricing,
                  })
                }
              >
                {servicePages.ctaPricing}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "service_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
              >
                <Calendar className="w-4 h-4" />
                {servicePages.ctaCalendly}
              </RippleButton>
              <RippleButton
                href={EXTERNAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "service_whatsapp",
                    destination: EXTERNAL_LINKS.whatsapp,
                  })
                }
              >
                <MessageCircle className="w-4 h-4" />
                {servicePages.ctaWhatsApp}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
