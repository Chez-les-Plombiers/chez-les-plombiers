"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, FolderDown } from "lucide-react";
import JSZip from "jszip";
import { useI18n } from "@/lib/i18n-context";

interface Photo {
  src: string;
  altKey: string;
}

// Desktop bento: 3 cols x 8 rows (each row ~200px)
// Row 1-2: [canape-rose 2x2 HERO]        [panorama 1x1]
//                                          [projection-rideaux 1x1]
// Row 3-4: [projection-netflix 1x1]       [cyclorama 2x2]
//          [canape-portes 1x1]
// Row 5-6: [cuisine-ouverte 2x2]          [entree-verriere 1x1]
//                                          [fauteuils 1x1]
// Row 7-8: [espace-travail 1x1]           [cuisine-equipee 2x2]
//          [sanitaires 1x1]
const photos: Photo[] = [
  { src: "/photos/canape-rose.jpg", altKey: "canapeRose" },
  { src: "/photos/panorama-grande-salle.jpg", altKey: "panorama" },
  { src: "/photos/projection-rideaux.jpg", altKey: "projectionRideaux" },
  { src: "/photos/projection-netflix.jpg", altKey: "projectionNetflix" },
  { src: "/photos/cyclorama-projection.jpg", altKey: "cyclorama" },
  { src: "/photos/canape-portes-atelier.jpg", altKey: "canapePortes" },
  { src: "/photos/cuisine-ouverte.jpg", altKey: "cuisineOuverte" },
  { src: "/photos/entree-verriere.jpg", altKey: "entreeVerriere" },
  { src: "/photos/fauteuils-design.jpg", altKey: "fauteuilsDesign" },
  { src: "/photos/espace-travail.jpg", altKey: "espaceTravail" },
  { src: "/photos/cuisine-equipee.jpg", altKey: "cuisineEquipee" },
  { src: "/photos/sanitaires.jpg", altKey: "sanitaires" },
];

export function PortfolioSection() {
  const { dict } = useI18n();
  const portfolio = dict.portfolio as {
    title: string;
    subtitle: string;
    downloadAll: string;
    downloading: string;
    download: string;
    alts: Record<string, string>;
  };

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : null
    );
  }, []);
  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
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
      const folder = zip.folder("Chez-Les-Plombiers-Photos");
      await Promise.all(
        photos.map(async (photo) => {
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
      a.download = "Chez-Les-Plombiers-Photos.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl lg:text-6xl mb-6">{portfolio.title}</h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {portfolio.subtitle}
          </p>
          <button
            onClick={downloadAll}
            disabled={isDownloading}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
          >
            <FolderDown className="w-4 h-4" />
            {isDownloading ? portfolio.downloading : portfolio.downloadAll}
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-2"
          style={{ gridAutoRows: "200px" }}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className={`clp-bento-${i} relative overflow-hidden bg-gray-100 group cursor-pointer`}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={photo.src}
                alt={portfolio.alts?.[photo.altKey] || ""}
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
                aria-label={`${portfolio.download} ${portfolio.alts?.[photo.altKey] || ""}`}
              >
                <Download className="w-4 h-4 text-black" />
              </button>
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
                src={photos[lightboxIndex].src}
                alt={portfolio.alts?.[photos[lightboxIndex].altKey] || ""}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 z-10">
              <p className="text-white/50 text-sm">
                {lightboxIndex + 1} / {photos.length}
              </p>
              <span className="text-white/30">|</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const photo = photos[lightboxIndex];
                  const filename = photo.src.split("/").pop()!;
                  downloadPhoto(photo.src, filename);
                }}
                className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                {portfolio.download}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
