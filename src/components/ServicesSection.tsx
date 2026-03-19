"use client";

import { motion } from "motion/react";
import { Sparkles, Briefcase, Music, BookOpen, Coffee, Car, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Coffee,
  Briefcase,
  Music,
  BookOpen,
  Car,
};

export function ServicesSection() {
  const { dict, locale } = useI18n();
  const services = dict.services as {
    title: string;
    subtitle: string;
    learnMore: string;
    items: { icon: string; title: string; slug: string; description: string }[];
  };

  const prefix = locale === "en" ? "/en" : "";

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl lg:text-6xl mb-6">{services.title}</h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {services.items.map((service, index) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col"
              >
                <div className="mb-8 relative">
                  <div className="w-16 h-16 border border-gray-300 flex items-center justify-center transition-all duration-500 group-hover:border-black group-hover:rotate-6">
                    <Icon className="w-7 h-7 stroke-[1.5] transition-all duration-500 group-hover:scale-110" />
                  </div>
                  <div className="absolute -bottom-2 left-0 w-0 h-px bg-black transition-all duration-700 group-hover:w-12" />
                </div>
                <h3 className="text-2xl lg:text-3xl mb-5 font-light tracking-[0.15em] uppercase transition-transform duration-500 group-hover:translate-x-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed tracking-wide transition-colors duration-300 group-hover:text-gray-900 flex-1">
                  {service.description}
                </p>
                <Link
                  href={`${prefix}/services/${service.slug}`}
                  className="inline-flex items-center gap-2 mt-6 text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors duration-300 self-end"
                >
                  {services.learnMore}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
