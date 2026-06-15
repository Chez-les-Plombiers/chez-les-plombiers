"use client";

import { motion } from "motion/react";
import { MapPin, Mail, Phone, Instagram, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { trackEvent } from "@/lib/analytics";
import { RippleButton } from "@/components/ui/ripple-button";

const icons: LucideIcon[] = [MapPin, Mail, Phone, Instagram];

const hrefs: (string | null)[] = [
  null,
  EXTERNAL_LINKS.email,
  EXTERNAL_LINKS.whatsapp,
  EXTERNAL_LINKS.instagram,
];

export function ContactSection() {
  const { dict } = useI18n();
  const header = dict.header as { ctaQuote: string };
  const contact = dict.contact as {
    title: string;
    subtitle: string;
    info: { label: string; value: string; subValue?: string }[];
    visit: {
      title: string;
      description: string;
      cta: string;
      hoursTitle: string;
      hours: { day: string; time: string }[];
    };
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-5xl lg:text-7xl mb-8 tracking-tight">
              {contact.title}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed text-balance"
          >
            {contact.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {contact.info.map((info, index) => {
              const Icon = icons[index];
              const href = hrefs[index];
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start space-x-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2">
                        {info.label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          target={
                            info.label === "Instagram" ||
                            info.label === "WhatsApp"
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            info.label === "Instagram" ||
                            info.label === "WhatsApp"
                              ? "noopener noreferrer"
                              : undefined
                          }
                          onClick={() =>
                            trackEvent("contact_click", {
                              method: info.label.toLowerCase(),
                              destination: href,
                            })
                          }
                          className="tracking-tight hover:text-white/70 transition-colors duration-300 block"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="tracking-tight">{info.value}</div>
                      )}
                      {info.subValue && (
                        <div className="text-white/60 mt-1 tracking-tight">
                          {info.subValue}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="border border-white/20 p-12 lg:p-16 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <Calendar className="w-16 h-16 mb-8 text-white/80" />
                <h3 className="text-3xl lg:text-4xl mb-6 tracking-tight">
                  {contact.visit.title}
                </h3>
                <p className="text-lg text-white/70 leading-relaxed mb-10">
                  {contact.visit.description}
                </p>

                <div className="flex flex-col gap-3">
                  <RippleButton
                    href={EXTERNAL_LINKS.pricing}
                    target="_blank"
                    rel="noopener noreferrer"
                    rippleColor="bg-black"
                    className="w-full bg-white text-black hover:text-white py-5 lg:py-7 text-sm lg:text-lg uppercase tracking-[0.1em] lg:tracking-[0.2em]"
                    onClick={() =>
                      trackEvent("cta_click", {
                        label: "contact_pricing",
                        destination: EXTERNAL_LINKS.pricing,
                      })
                    }
                  >
                    {header.ctaQuote}
                  </RippleButton>
                  <RippleButton
                    href={EXTERNAL_LINKS.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    rippleColor="bg-white"
                    className="w-full border border-white text-white hover:text-black py-5 lg:py-7 text-sm lg:text-lg uppercase tracking-[0.1em] lg:tracking-[0.2em]"
                    onClick={() =>
                      trackEvent("cta_click", {
                        label: "contact_calendly",
                        destination: EXTERNAL_LINKS.calendly,
                      })
                    }
                  >
                    {contact.visit.cta}
                  </RippleButton>
                  <RippleButton
                    href={EXTERNAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    rippleColor="bg-white"
                    className="w-full border border-white text-white hover:text-black py-5 lg:py-7 text-sm lg:text-lg uppercase tracking-[0.1em] lg:tracking-[0.2em]"
                    onClick={() =>
                      trackEvent("cta_click", {
                        label: "contact_whatsapp",
                        destination: EXTERNAL_LINKS.whatsapp,
                      })
                    }
                  >
                    WhatsApp
                  </RippleButton>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="text-sm text-white/50 uppercase tracking-[0.15em] mb-3">
                    {contact.visit.hoursTitle}
                  </div>
                  <div className="space-y-2 text-white/70">
                    {contact.visit.hours.map((h) => (
                      <div key={h.day} className="flex justify-between text-sm">
                        <span>{h.day}</span>
                        <span>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </section>
  );
}
