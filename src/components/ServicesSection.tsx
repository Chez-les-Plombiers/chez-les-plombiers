"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Briefcase, Music, Coffee, Car, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Coffee,
  Briefcase,
  Music,
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            {services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.items.map((service, index) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <Link
                  href={`${prefix}/services/${service.slug}`}
                  className="block relative group h-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={`
                      relative overflow-hidden border p-8 transition-all duration-300 ease-in-out h-full flex flex-col
                      ${isHovered
                        ? "border-black shadow-[0_8px_30px_rgba(0,0,0,0.12)] bg-gray-50 scale-[1.02]"
                        : "border-gray-200 hover:border-gray-400 bg-white"
                      }
                    `}
                  >
                    {/* Icon */}
                    <div className="mb-6 relative">
                      <div
                        className={`
                          w-14 h-14 border flex items-center justify-center transition-all duration-300
                          ${isHovered ? "border-black rotate-6 bg-black text-white" : "border-gray-300 text-gray-700"}
                        `}
                      >
                        <Icon className="w-6 h-6 stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`
                        text-xl lg:text-2xl tracking-[0.1em] uppercase mb-4 transition-all duration-300
                        ${isHovered ? "text-black" : "text-gray-900"}
                      `}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`
                        text-sm leading-relaxed tracking-wide flex-1 transition-colors duration-300
                        ${isHovered ? "text-gray-800" : "text-gray-500"}
                      `}
                    >
                      {service.description}
                    </p>

                    {/* Arrow CTA */}
                    <div
                      className={`
                        flex items-center gap-2 mt-6 text-sm uppercase tracking-widest transition-all duration-300
                        ${isHovered ? "text-black translate-x-1 opacity-100" : "text-gray-400 opacity-60"}
                      `}
                    >
                      {services.learnMore}
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                      />
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
