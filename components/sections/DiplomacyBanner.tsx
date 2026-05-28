"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "../ui/Section";
import Container from "../layout/Container";
import { Quote } from "lucide-react";

export default function DiplomacyBanner() {
  return (
    <Section className="bg-light-beige/20 border-t border-b border-warm-tan/30 relative overflow-hidden py-24 md:py-32">
      {/* Decorative fine borders */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border border-warm-tan/10 pointer-events-none" />
      <div className="absolute top-5 left-5 right-5 bottom-5 border border-warm-tan/10 pointer-events-none" />

      <Container className="max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Quote Icon */}
          <div className="text-warm-tan/40">
            <Quote className="h-6 w-6" />
          </div>

          {/* Large Editorial Serif Quote */}
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-primary-blue leading-relaxed italic max-w-3xl">
            "The United Nations was not created to take mankind to heaven, but to save humanity from hell."
          </blockquote>

          {/* Quote Author */}
          <cite className="not-italic flex flex-col items-center gap-1.5">
            <span className="font-sans text-[11px] tracking-[0.25em] uppercase font-bold text-warm-tan">
              Dag Hammarskjöld
            </span>
            <span className="font-sans text-[9px] tracking-widest uppercase text-ink/40 font-semibold">
              Second Secretary-General of the United Nations
            </span>
          </cite>
        </motion.div>
      </Container>
    </Section>
  );
}
