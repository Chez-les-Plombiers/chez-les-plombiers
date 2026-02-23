"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ArrowLeft,
  ChevronDown,
  Calendar,
  MessageCircle,
  Mail,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { SERVICE_IMAGES, getServiceEnSlug } from "@/lib/services-data";
import { ReviewsSection } from "@/components/ReviewsSection";

interface ServiceSpec {
  value: string;
  unit: string;
  label: string;
}

interface ServiceFaq {
  question: string;
  answer: string;
}

interface ServiceData {
  title: string;
  tagline: string;
  description: string;
  specs: ServiceSpec[];
  features: string[];
  faq: ServiceFaq[];
  meta: { title: string; description: string; ogDescription: string };
}

interface ServicePagesDict {
  backToHome: string;
  backToServices: string;
  specsTitle: string;
  featuresTitle: string;
  faqTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaCalendly: string;
  ctaWhatsApp: string;
  ctaEmail: string;
  services: Record<string, ServiceData>;
}

function FaqItem({ item, index }: { item: ServiceFaq; index: number }) {
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
        <span className="text-lg lg:text-xl font-light pr-8">{item.question}</span>
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

export function ServicePageContent({ slug }: { slug: string }) {
  const { dict, locale } = useI18n();
  const servicePages = dict.servicePages as ServicePagesDict;

  // In EN dict, the service key is the EN slug; in FR dict, it's the FR slug
  const dictKey = locale === "en" ? getServiceEnSlug(slug) : slug;
  const service = servicePages.services[dictKey];
  const image = SERVICE_IMAGES[slug] || "/images/hero.png";
  const prefix = locale === "en" ? "/en" : "";

  if (!service) return null;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-white pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Link
                href={`${prefix}/`}
                className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                {servicePages.backToHome}
              </Link>
              <span className="text-white/40">/</span>
              <Link
                href={`${prefix}/#services`}
                className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                {servicePages.backToServices}
              </Link>
            </div>
            <h1 className="text-4xl lg:text-7xl font-light mb-6 tracking-tight max-w-4xl">
              {service.title}
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 font-light max-w-2xl">
              {service.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description + Specs */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-8">
                {servicePages.specsTitle}
              </h2>
              <div className="grid grid-cols-2 gap-8">
                {service.specs.map((spec, i) => (
                  <div key={i} className="border-t border-gray-200 pt-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-5xl font-light tracking-tighter">
                        {spec.value}
                      </span>
                      {spec.unit && (
                        <span className="text-lg text-gray-500">{spec.unit}</span>
                      )}
                    </div>
                    <span className="text-sm uppercase tracking-widest text-gray-500 mt-2 block">
                      {spec.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-16 tracking-tight"
          >
            {servicePages.featuresTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 bg-white border border-gray-100 hover:border-gray-300 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-black flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-white stroke-[2.5]" />
                </div>
                <span className="text-gray-700 leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection />

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-light mb-12 tracking-tight"
          >
            {servicePages.faqTitle}
          </motion.h2>
          <div className="border-t border-gray-200">
            {service.faq.map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-light mb-6 tracking-tight">
              {servicePages.ctaTitle}
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              {servicePages.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-black hover:bg-white/90 px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                {servicePages.ctaCalendly}
              </a>
              <a
                href={EXTERNAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/30 hover:border-white px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                {servicePages.ctaWhatsApp}
              </a>
              <a
                href={EXTERNAL_LINKS.email}
                className="inline-flex items-center gap-3 border border-white/30 hover:border-white px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                {servicePages.ctaEmail}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
