"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n-context";

export function VirtualTour() {
  const { dict } = useI18n();
  const t = dict.virtualTour as {
    label: string;
    title: string;
    description: string;
  };

  return (
    <section id="visite-virtuelle" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
            {t.label}
          </p>
          <h2 className="text-3xl lg:text-5xl font-light tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative w-full aspect-video"
        >
          <iframe
            src="https://my.matterport.com/show/?m=ucvB4GW2Go6"
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
            loading="lazy"
            title={t.title}
          />
        </motion.div>
      </div>
    </section>
  );
}
