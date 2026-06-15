"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, ChevronLeft, ChevronRight, Download, FolderDown } from "lucide-react";
import JSZip from "jszip";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { useI18n } from "@/lib/i18n-context";
import { SERVICE_FR_SLUGS, getServiceEnSlug } from "@/lib/services-data";
import { ReviewsSection } from "@/components/ReviewsSection";
import { RippleButton } from "@/components/ui/ripple-button";
import ClientLogosSection from "@/components/ClientLogosSection";

const appartPhotos = Array.from({ length: 11 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return { src: `/photos/appartement/appartement-${num}.jpg`, key: num };
});

const VIDEO_URL =
  "https://www.dropbox.com/scl/fi/9m9pjrj837t1r19d7mp31/appartement-Rose-Slow.MP4?rlkey=dbwf002s38d9cmzoxts33wzmh&raw=1";

export function AppartementContent() {
  const { dict, locale } = useI18n();
  const appart = dict.appartement as {
    title: string;
    heroDescription: string;
    cta: string;
    sectionTitle: string;
    sectionDescription: string;
    surfaceLabel: string;
    capacityLabel: string;
    equipmentsTitle: string;
    equipments: string[];
    heroImageAlt: string;
    detailImageAlt: string;
    galleryTitle: string;
    gallerySubtitle: string;
    downloadAll: string;
    downloading: string;
    download: string;
    galleryAlts: Record<string, string>;
  };

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % appartPhotos.length : null
    );
  }, []);
  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + appartPhotos.length) % appartPhotos.length : null
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
      const folder = zip.folder("Appartement-Rose-Photos");
      await Promise.all(
        appartPhotos.map(async (photo) => {
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
      a.download = "Appartement-Rose-Photos.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="pt-0">
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/appartement-hero.png"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          <Image
            src="/images/appartement-hero.png"
            alt={appart.heroImageAlt}
            fill
            className="object-cover -z-10"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center flex flex-col items-center"
          >
            <h1 className="text-5xl lg:text-8xl mb-8 tracking-tight">
              {appart.title}
            </h1>
            <p className="text-xl lg:text-3xl text-white/90 mb-12 leading-relaxed max-w-2xl font-light">
              {appart.heroDescription}
            </p>

            <RippleButton
              href={EXTERNAL_LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              rippleColor="bg-black"
              className="bg-white text-black hover:text-white px-10 py-6 text-lg uppercase tracking-widest"
            >
              {appart.cta}
            </RippleButton>
          </motion.div>
        </div>
      </section>

      <ClientLogosSection theme="light" title="" />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl mb-6 tracking-tight">
              {appart.sectionTitle}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {appart.sectionDescription}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-10 border-y border-gray-200 py-8 max-w-md mx-auto">
              <div className="flex flex-col">
                <span className="text-6xl font-light tracking-tighter mb-2">
                  100
                  <span className="text-2xl ml-1 align-top">m&sup2;</span>
                </span>
                <span className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                  {appart.surfaceLabel}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-6xl font-light tracking-tighter mb-2">
                  50
                </span>
                <span className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                  {appart.capacityLabel}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest text-gray-900 mb-4">
                {appart.equipmentsTitle}
              </h3>
              <ul className="inline-grid grid-cols-1 gap-3 text-gray-600 text-left">
                {appart.equipments.map((item) => (
                  <li key={item} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-black mr-3 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-4xl lg:text-6xl mb-6">{appart.galleryTitle}</h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {appart.gallerySubtitle}
            </p>
            <button
              onClick={downloadAll}
              disabled={isDownloading}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              <FolderDown className="w-4 h-4" />
              {isDownloading ? appart.downloading : appart.downloadAll}
            </button>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-2"
            style={{ gridAutoRows: "200px" }}
          >
            {appartPhotos.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={`appart-bento-${i} relative overflow-hidden bg-gray-100 group cursor-pointer`}
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={photo.src}
                  alt={appart.galleryAlts?.[photo.key] || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading={i < 4 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const filename = photo.src.split("/").pop()!;
                    downloadPhoto(photo.src, filename);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                  aria-label={`${appart.download} ${appart.galleryAlts?.[photo.key] || ""}`}
                >
                  <Download className="w-4 h-4 text-black" />
                </button>
              </motion.div>
            ))}
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
                src={appartPhotos[lightboxIndex].src}
                alt={appart.galleryAlts?.[appartPhotos[lightboxIndex].key] || ""}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 z-10">
              <p className="text-white/50 text-sm">
                {lightboxIndex + 1} / {appartPhotos.length}
              </p>
              <span className="text-white/30">|</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const photo = appartPhotos[lightboxIndex];
                  const filename = photo.src.split("/").pop()!;
                  downloadPhoto(photo.src, filename);
                }}
                className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                {appart.download}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visite virtuelle Matterport */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl mb-4 tracking-tight text-center">
            {locale === "en" ? "Virtual Tour" : "Visite Virtuelle"}
          </h2>
          <p className="text-gray-500 text-center mb-12 text-lg">
            {locale === "en"
              ? "Explore The Pink Apartment in 3D"
              : "Explorez L'Appartement Rose en 3D"}
          </p>
          <div className="relative w-full aspect-video">
            <iframe
              src="https://my.matterport.com/show/?m=Km2zRqQTaKz"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
              title={locale === "en" ? "Virtual tour — The Pink Apartment" : "Visite virtuelle — L'Appartement Rose"}
            />
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <ReviewsSection />

      {/* Cross-links to services */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl mb-10 tracking-tight">
            {locale === "en" ? "Explore our main space" : "Découvrez notre espace principal"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SERVICE_FR_SLUGS.slice(0, 6).map((frSlug) => {
              const servicePages = dict.servicePages as {
                services: Record<string, { title: string }>;
              };
              const dictKey = locale === "en" ? getServiceEnSlug(frSlug) : frSlug;
              const service = servicePages.services[dictKey];
              if (!service) return null;
              const href = locale === "en"
                ? `/en/services/${getServiceEnSlug(frSlug)}`
                : `/services/${frSlug}`;
              return (
                <Link
                  key={frSlug}
                  href={href}
                  className="group flex items-center justify-between border border-gray-200 bg-white p-5 hover:border-black transition-colors duration-300"
                >
                  <span className="text-sm font-medium uppercase tracking-wider group-hover:text-black transition-colors">
                    {service.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
