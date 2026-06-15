"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Train,
  Car,
  Footprints,
  Accessibility,
  Plane,
  Maximize2,
  Users,
  Clock,
  Zap,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Calendar,
  MessageCircle,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { trackEvent } from "@/lib/analytics";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SeoPagesCrossLinks } from "@/components/SeoPagesCrossLinks";
import ClientLogosSection from "@/components/ClientLogosSection";
import { RippleButton } from "@/components/ui/ripple-button";
import { VenueGuide } from "@/components/VenueGuide";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AccessItem {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

interface DetailItem {
  icon: string;
  label: string;
  value: string;
}

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href: string;
}

interface NeighborhoodLink {
  name: string;
  url: string;
}

interface NeighborhoodCategory {
  title: string;
  intro: string;
  items: NeighborhoodLink[];
}

interface FaqItem {
  question: string;
  answer: string;
}

interface InfosDict {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    address: string;
    ctaCalendly: string;
    ctaMaps: string;
    imageAlt: string;
  };
  access: {
    sectionTitle: string;
    intro: string;
    items: AccessItem[];
  };
  details: {
    sectionTitle: string;
    items: DetailItem[];
  };
  contact: {
    sectionTitle: string;
    intro: string;
    items: ContactItem[];
  };
  map: {
    sectionTitle: string;
    intro: string;
    iframeTitle: string;
  };
  neighborhood: {
    sectionTitle: string;
    intro: string;
    categories: NeighborhoodCategory[];
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
  Train,
  Car,
  Footprints,
  Accessibility,
  Plane,
  Maximize2,
  Users,
  Clock,
  Zap,
  Phone,
  Mail,
  MapPin,
  Instagram,
};

const GOOGLE_MAPS_DIRECTIONS =
  "https://maps.google.com/?q=39+rue+des+Bourdonnais+75001+Paris";
const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps?q=39+rue+des+Bourdonnais+75001+Paris&output=embed";

/* ------------------------------------------------------------------ */
/*  FAQ accordion                                                      */
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

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function InfosContent() {
  const { locale, dict } = useI18n();
  const t = dict.infos as InfosDict;

  if (!t) return null;

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex flex-col justify-end overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt={t.hero.imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-white pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-6">
              {t.hero.eyebrow}
            </p>
            <h1 className="text-4xl lg:text-7xl mb-6 tracking-tight max-w-5xl">
              {t.hero.title}
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 font-light max-w-3xl mb-6">
              {t.hero.subtitle}
            </p>
            <div className="flex items-center gap-3 text-white/80 mb-10">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <span className="text-base lg:text-lg">{t.hero.address}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <RippleButton
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "infos_hero_calendly",
                    destination: EXTERNAL_LINKS.calendly,
                  })
                }
                rippleColor="bg-black"
                className="bg-white text-black hover:text-white px-8 py-4 text-sm uppercase tracking-widest"
              >
                <Calendar className="w-4 h-4" />
                {t.hero.ctaCalendly}
              </RippleButton>
              <RippleButton
                href={GOOGLE_MAPS_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "infos_hero_maps",
                    destination: GOOGLE_MAPS_DIRECTIONS,
                  })
                }
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-8 py-4 text-sm uppercase tracking-widest"
              >
                <ArrowUpRight className="w-4 h-4" />
                {t.hero.ctaMaps}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>

      <ClientLogosSection theme="light" title="" />

      {/* ============================================================ */}
      {/* DETAILS — 4 stats                                             */}
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
            {t.details.sectionTitle}
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {t.details.items.map((item, i) => {
              const Icon = iconMap[item.icon] || Maximize2;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white p-8 lg:p-10 flex flex-col gap-4"
                >
                  <Icon className="w-6 h-6 text-gray-400" />
                  <p className="text-2xl lg:text-3xl font-light tracking-tight">
                    {item.value}
                  </p>
                  <p className="text-sm uppercase tracking-[0.1em] text-gray-500">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* VENUE GUIDE — Full info accordion (FR only)                   */}
      {/* ============================================================ */}
      {locale === "fr" && <VenueGuide />}

      {/* ============================================================ */}
      {/* ACCESS — 6 cards                                              */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-3xl lg:text-5xl mb-6 tracking-tight">
              {t.access.sectionTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.access.intro}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.access.items.map((item, i) => {
              const Icon = iconMap[item.icon] || Train;
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
                  <h3 className="text-lg mb-1">{item.title}</h3>
                  <p className="text-xs uppercase tracking-[0.1em] text-gray-400 mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MAP — Google Maps embed                                       */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <h2 className="text-3xl lg:text-5xl mb-6 tracking-tight">
              {t.map.sectionTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.map.intro}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden border border-gray-200"
          >
            <iframe
              src={GOOGLE_MAPS_EMBED}
              title={t.map.iframeTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* NEIGHBORHOOD — 3 cards                                        */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-3xl lg:text-5xl mb-6 tracking-tight">
              {t.neighborhood.sectionTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.neighborhood.intro}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.neighborhood.categories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-gray-200 bg-white p-8 hover:border-black transition-colors duration-300"
              >
                <h3 className="text-lg mb-3">{category.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {category.intro}
                </p>
                <ul className="space-y-3">
                  {category.items.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent("nav_click", {
                            label: `infos_neighborhood_${link.name
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "_")
                              .replace(/^_|_$/g, "")}`,
                            destination: link.url,
                          })
                        }
                        className="group inline-flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
                      >
                        <span className="border-b border-gray-300 group-hover:border-black transition-colors">
                          {link.name}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTACT — 4 cards                                             */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-3xl lg:text-5xl mb-6 tracking-tight">
              {t.contact.sectionTitle}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              {t.contact.intro}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {t.contact.items.map((item, i) => {
              const Icon = iconMap[item.icon] || Phone;
              const isExternal = item.href.startsWith("http");
              return (
                <motion.a
                  key={i}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={() =>
                    trackEvent("contact_click", {
                      method: `infos_${item.icon.toLowerCase()}`,
                      destination: item.href,
                    })
                  }
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-black p-8 lg:p-10 flex flex-col gap-4 group hover:bg-white/[0.03] transition-colors"
                >
                  <Icon className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                  <p className="text-xs uppercase tracking-[0.1em] text-white/50">
                    {item.label}
                  </p>
                  <p className="text-base lg:text-lg font-light break-words">
                    {item.value}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* REVIEWS                                                       */}
      {/* ============================================================ */}
      <ReviewsSection />

      {/* ============================================================ */}
      {/* FAQ                                                           */}
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

      <ClientLogosSection compact />

      <SeoPagesCrossLinks currentSlugFr="" />

      {/* ============================================================ */}
      {/* CTA FINAL                                                     */}
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
                    label: "infos_pricing",
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
                    label: "infos_calendly",
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
                    label: "infos_whatsapp",
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
