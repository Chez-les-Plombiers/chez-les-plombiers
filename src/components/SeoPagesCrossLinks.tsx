"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { trackEvent } from "@/lib/analytics";
import { SEO_PAGES } from "@/lib/seo-pages-data";

interface SeoPagesCrossLinksProps {
  currentSlugFr: string;
}

export function SeoPagesCrossLinks({ currentSlugFr }: SeoPagesCrossLinksProps) {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const prefix = isEn ? "/en" : "";

  const otherPages = SEO_PAGES.filter((p) => p.slugFr !== currentSlugFr);

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl lg:text-3xl font-light mb-10 tracking-tight"
        >
          {isEn ? "Discover also" : "Découvrez aussi"}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherPages.map((page, i) => {
            const slug = isEn ? page.slugEn : page.slugFr;
            const href = `${prefix}/${slug}`;

            return (
              <motion.div
                key={page.slugFr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={href}
                  onClick={() =>
                    trackEvent("nav_click", {
                      label: `seo_crosslink_${page.slugFr}`,
                      destination: href,
                    })
                  }
                  className="group block overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-4">
                    <Image
                      src={page.image}
                      alt={isEn ? page.titleEn : page.titleFr}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg mb-1 tracking-tight group-hover:text-gray-600 transition-colors">
                    {isEn ? page.titleEn : page.titleFr}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    {isEn ? page.descriptionEn : page.descriptionFr}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium group-hover:gap-3 transition-all duration-300">
                    {isEn ? "Learn more" : "En savoir plus"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
