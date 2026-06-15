"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { trackEvent } from "@/lib/analytics";
import { SEO_PAGES } from "@/lib/seo-pages-data";

export function SeoLandingPagesSection() {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const prefix = isEn ? "/en" : "";

  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl lg:text-6xl mb-6">
            {isEn ? "Discover Our Spaces" : "Découvrez Nos Espaces"}
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {isEn
              ? "A 200 sqm venue that adapts to all your projects — from corporate seminars to automotive photoshoots."
              : "Un lieu de 200 m² qui s'adapte à tous vos projets — du séminaire d'entreprise au shooting automobile."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SEO_PAGES.map((page, index) => {
            const slug = isEn ? page.slugEn : page.slugFr;
            const href = `${prefix}/${slug}`;

            return (
              <motion.div
                key={page.slugFr}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={href}
                  onClick={() =>
                    trackEvent("nav_click", {
                      label: `homepage_seo_${page.slugFr}`,
                      destination: href,
                    })
                  }
                  className="group block relative overflow-hidden aspect-[16/10]"
                >
                  <Image
                    src={page.image}
                    alt={isEn ? page.titleEn : page.titleFr}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <h3 className="text-white text-xl lg:text-2xl mb-2 tracking-tight">
                      {isEn ? page.titleEn : page.titleFr}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-md">
                      {isEn ? page.descriptionEn : page.descriptionFr}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors text-sm uppercase tracking-widest">
                      <span>{isEn ? "Learn more" : "En savoir plus"}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
