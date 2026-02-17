"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";

const images = ["/images/venue-1.png", "/images/venue-2.png", "/images/venue-3.png"];

export function PortfolioSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { dict } = useI18n();
  const portfolio = dict.portfolio as {
    title: string;
    subtitle: string;
    projects: { title: string; category: string; alt: string }[];
  };

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl lg:text-6xl mb-6">{portfolio.title}</h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {portfolio.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-200 mb-4">
                <Image
                  src={images[index]}
                  alt={project.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                >
                  <div className="text-white text-center">
                    <div className="text-sm uppercase tracking-widest mb-2">
                      {project.category}
                    </div>
                  </div>
                </motion.div>
              </div>
              <h3 className="text-xl mb-1">{project.title}</h3>
              <p className="text-sm text-gray-600 uppercase tracking-wider">
                {project.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
