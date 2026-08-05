"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../layout/Container";
import Section from "../ui/Section";
import Card from "../ui/Card";

export default function Sponsors() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-paper border-t border-warm-tan/10 pt-4 pb-2 relative overflow-hidden"
    >
      {/* Background Subtle Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary-blue/5 blur-[120px] pointer-events-none -z-10" />
      
      <Container className="max-w-4xl">
        <div className="text-center mb-5">
          <motion.span
            className="font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] text-[#CBAD7F] uppercase block mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Partners & Sponsors
          </motion.span>
          <motion.h3
            className="font-serif text-2xl md:text-3xl text-primary-blue uppercase tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Supported By
          </motion.h3>
          <div className="w-12 h-[1px] bg-warm-tan/30 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              interactive={true}
              className="border border-warm-tan/20 bg-light-beige/5 p-10 relative flex flex-col items-center justify-center text-center group transition-all"
            >
              {/* Corner decor */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-warm-tan/30 group-hover:border-primary-blue/50 transition-colors" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-warm-tan/30 group-hover:border-primary-blue/50 transition-colors" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-warm-tan/30 group-hover:border-primary-blue/50 transition-colors" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-warm-tan/30 group-hover:border-primary-blue/50 transition-colors" />

              {/* Premium Badge: Sponsor of India's Got Latent S2 */}
              <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-warm-tan/30 bg-warm-tan/5 backdrop-blur-sm text-[10px] font-semibold tracking-[0.18em] text-warm-tan uppercase transition-all duration-300 group-hover:border-warm-tan/60 group-hover:bg-warm-tan/10">
                <svg className="w-3.5 h-3.5 text-warm-tan/80 group-hover:text-warm-tan animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.564-.386-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span>Sponsor of India's Got Latent S2</span>
              </div>

              <div className="relative w-64 h-28 md:w-72 md:h-32 mb-6 flex items-center justify-center">
                <Image
                  src="/sponsers/avvatar.webp"
                  alt="Avvatar Sponsor Logo"
                  fill
                  className="object-contain filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out"
                  priority
                />
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif text-xl md:text-2xl tracking-wider text-[#F4ECD8] uppercase group-hover:text-primary-blue transition-colors duration-300">
                  Avvatar
                </h4>
                <p className="font-sans text-sm italic text-ink/60 group-hover:text-ink/80 transition-colors duration-300">
                  "Fuel your voice with Avvatar"
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
