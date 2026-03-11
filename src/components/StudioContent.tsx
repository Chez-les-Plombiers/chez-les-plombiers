"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  FolderDown,
  X,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Coffee,
  Wine,
  Shirt,
  Sparkles,
  Bath,
  Monitor,
  Wifi,
  GalleryVerticalEnd,
  Plus,
  Minus,
} from "lucide-react";
import JSZip from "jszip";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { useI18n } from "@/lib/i18n-context";

const STUDIO_PHOTOS = [
  { src: "/photos/studio/cyclorama-portrait.jpg", alt: "Mur cyclorama 4,63 m × 3,40 m — studio photo Paris 1er" },
  { src: "/photos/studio/cyclorama-wide.jpg", alt: "Vue panoramique du plateau studio avec grille technique au plafond" },
  { src: "/photos/studio/backstage-makeup.jpg", alt: "Espace backstage avec postes maquillage et flight cases" },
];

const PRESTATION_ICONS = [
  UtensilsCrossed, Coffee, Wine, Shirt, Sparkles, Bath, Monitor, Wifi, GalleryVerticalEnd,
];

interface SpecItem {
  label: string;
  value: string;
}

interface SpecGroup {
  title: string;
  items: SpecItem[];
}

export function StudioContent() {
  const { dict, locale } = useI18n();
  const studio = dict.studio as {
    title: string;
    heroTagline: string;
    accroche: string;
    seoDescription: string;
    keyFigures: { value: string; label: string }[];
    specsTitle: string;
    specGroups: SpecGroup[];
    prestationsTitle: string;
    prestationsIntro: string;
    prestations: string[];
    planTitle: string;
    planDescription: string;
    planDownload: string;
    tarifsTitle: string;
    tarifsPlaceholder: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    heroImageAlt: string;
    useCasesTitle: string;
    useCases: string[];
    galleryTitle: string;
    galleryDownloadAll: string;
    galleryDownloading: string;
    galleryDownload: string;
    faqTitle: string;
    faqItems: { question: string; answer: string }[];
  };

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % STUDIO_PHOTOS.length : null
    );
  }, []);
  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + STUDIO_PHOTOS.length) % STUDIO_PHOTOS.length : null
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

  const downloadPhoto = async (src: string, filename: string) => {
    const response = await fetch(src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("CLP-Studio-Photos");
      await Promise.all(
        STUDIO_PHOTOS.map(async (photo) => {
          const response = await fetch(photo.src);
          const blob = await response.blob();
          const name = photo.src.split("/").pop()!;
          folder?.file(name, blob);
        })
      );
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CLP-Studio-Photos.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="pt-0">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/studio/cyclorama-wide.jpg"
            alt={studio.heroImageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-8xl font-light text-white mb-6 tracking-tight">
              {studio.title}
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-2xl font-light leading-relaxed">
              {studio.heroTagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ACCROCHE + KEY FIGURES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl lg:text-3xl font-light leading-relaxed text-gray-900 tracking-tight"
            >
              {studio.accroche}
            </motion.p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-gray-200 py-12">
            {studio.keyFigures.map((fig, i) => (
              <motion.div
                key={fig.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <span className="block text-4xl lg:text-5xl font-light tracking-tighter text-gray-900 mb-2">
                  {fig.value}
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                  {fig.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE avec lightbox + download */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
          >
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              {studio.galleryTitle}
            </h2>
            <button
              onClick={downloadAll}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              <FolderDown className="w-4 h-4" />
              {isDownloading ? studio.galleryDownloading : studio.galleryDownloadAll}
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 auto-rows-[280px] md:auto-rows-[320px]">
            {/* Cyclorama portrait — tall left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-gray-200 md:col-span-4 md:row-span-2 group cursor-pointer"
              onClick={() => setLightboxIndex(0)}
            >
              <Image
                src={STUDIO_PHOTOS[0].src}
                alt={STUDIO_PHOTOS[0].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <button
                onClick={(e) => { e.stopPropagation(); downloadPhoto(STUDIO_PHOTOS[0].src, "cyclorama-portrait.jpg"); }}
                className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                aria-label={`${studio.galleryDownload} cyclorama`}
              >
                <Download className="w-4 h-4 text-black" />
              </button>
            </motion.div>
            {/* Cyclorama wide — top right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden bg-gray-200 md:col-span-8 group cursor-pointer"
              onClick={() => setLightboxIndex(1)}
            >
              <Image
                src={STUDIO_PHOTOS[1].src}
                alt={STUDIO_PHOTOS[1].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <button
                onClick={(e) => { e.stopPropagation(); downloadPhoto(STUDIO_PHOTOS[1].src, "cyclorama-wide.jpg"); }}
                className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                aria-label={`${studio.galleryDownload} studio`}
              >
                <Download className="w-4 h-4 text-black" />
              </button>
            </motion.div>
            {/* Backstage — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden bg-gray-200 md:col-span-8 group cursor-pointer"
              onClick={() => setLightboxIndex(2)}
            >
              <Image
                src={STUDIO_PHOTOS[2].src}
                alt={STUDIO_PHOTOS[2].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <button
                onClick={(e) => { e.stopPropagation(); downloadPhoto(STUDIO_PHOTOS[2].src, "backstage-makeup.jpg"); }}
                className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                aria-label={`${studio.galleryDownload} backstage`}
              >
                <Download className="w-4 h-4 text-black" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

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
                src={STUDIO_PHOTOS[lightboxIndex].src}
                alt={STUDIO_PHOTOS[lightboxIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 z-10">
              <p className="text-white/50 text-sm">
                {lightboxIndex + 1} / {STUDIO_PHOTOS.length}
              </p>
              <span className="text-white/30">|</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const photo = STUDIO_PHOTOS[lightboxIndex];
                  const filename = photo.src.split("/").pop()!;
                  downloadPhoto(photo.src, filename);
                }}
                className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                {studio.galleryDownload}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEO DESCRIPTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-light mb-8 tracking-tight">
                {locale === "en" ? "A unique studio in Paris 1st" : "Un studio unique à Paris 1er"}
              </h2>
              <div
                className="text-gray-600 text-lg leading-relaxed space-y-4 [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: studio.seoDescription }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-square overflow-hidden bg-gray-200"
            >
              <Image
                src="/photos/studio/cyclorama-portrait.jpg"
                alt="Cyclorama intégré sur murs de pierre — studio photo Paris"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SPECS TECHNIQUES */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-light mb-16 tracking-tight"
          >
            {studio.specsTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {studio.specGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
              >
                <h3 className="text-sm uppercase tracking-widest text-gray-900 font-semibold mb-6 pb-3 border-b border-gray-300">
                  {group.title}
                </h3>
                <dl className="space-y-4">
                  {group.items.map((item) => (
                    <div key={item.label} className="flex justify-between items-baseline gap-4">
                      <dt className="text-sm text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {item.label}
                      </dt>
                      <dd className="text-base text-gray-900 font-medium text-right">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESTATIONS — Cards avec icônes */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-light mb-4 tracking-tight">
              {studio.prestationsTitle}
            </h2>
            <p className="text-gray-500 text-lg">
              {studio.prestationsIntro}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studio.prestations.map((item, i) => {
              const Icon = PRESTATION_ICONS[i] || Wifi;
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  whileHover={{ y: -3 }}
                  className="flex items-start gap-4 border border-gray-100 bg-gray-50 p-5 cursor-default transition-shadow duration-300 hover:shadow-md hover:border-gray-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <span className="text-gray-800 text-sm leading-relaxed pt-2">{item}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-light mb-12 tracking-tight"
          >
            {studio.useCasesTitle}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {studio.useCases.map((uc, i) => (
              <motion.div
                key={uc}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border border-gray-200 bg-white p-5 text-center"
              >
                <span className="text-sm font-medium uppercase tracking-wider text-gray-800">
                  {uc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-light mb-12 tracking-tight"
          >
            {studio.faqTitle}
          </motion.h2>
          <div className="border-t border-gray-200">
            {studio.faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                  aria-expanded={faqOpenIndex === index}
                >
                  <span className="text-lg lg:text-xl pr-8 transition-colors duration-300 group-hover:text-gray-600">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 border border-gray-300 flex items-center justify-center transition-all duration-300 group-hover:border-black">
                    {faqOpenIndex === index ? (
                      <Minus className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    )}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpenIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-gray-700 leading-relaxed max-w-3xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN TECHNIQUE */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light mb-6 tracking-tight">
              {studio.planTitle}
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {studio.planDescription}
            </p>
            <a
              href="/images/floor-plan.png"
              download="plan-studio-chez-les-plombiers.png"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              {studio.planDownload}
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-4 border border-gray-200"
          >
            <Image
              src="/images/floor-plan.png"
              alt={locale === "en" ? "Floor plan — Chez Les Plombiers studio" : "Plan technique — Studio Chez Les Plombiers"}
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* TARIFS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-light mb-6 tracking-tight">
              {studio.tarifsTitle}
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {studio.tarifsPlaceholder}
            </p>
            <a
              href={EXTERNAL_LINKS.email}
              className="inline-flex items-center gap-3 border border-gray-900 text-gray-900 px-8 py-4 text-sm uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors"
            >
              {locale === "en" ? "Request a quote" : "Demander un devis"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-light mb-6 tracking-tight">
              {studio.ctaTitle}
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              {studio.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={EXTERNAL_LINKS.email}
                  className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
                >
                  {studio.ctaButton}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={EXTERNAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-white/30 text-white px-10 py-5 text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={locale === "en" ? "/en" : "/"}
              className="group flex items-center justify-between border border-gray-200 bg-white p-5 hover:border-black transition-colors duration-300"
            >
              <span className="text-sm font-medium uppercase tracking-wider group-hover:text-black transition-colors">
                {locale === "en" ? "Main Event Space — 200m²" : "Espace événementiel — 200 m²"}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
            </Link>
            <Link
              href={locale === "en" ? "/en/apartment" : "/appartement"}
              className="group flex items-center justify-between border border-gray-200 bg-white p-5 hover:border-black transition-colors duration-300"
            >
              <span className="text-sm font-medium uppercase tracking-wider group-hover:text-black transition-colors">
                {locale === "en" ? "The Pink Apartment — 100m²" : "L'Appartement Rose — 100 m²"}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
