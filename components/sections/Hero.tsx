"use client";

import React from "react";
import { motion } from "framer-motion";
import { Landmark, Compass, ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import Container from "../layout/Container";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16">
      {/* Background World Map Pattern with subtle pan animation */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 world-map-bg bg-cover bg-center pointer-events-none"
      />

      {/* Decorative center vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/0 via-paper/50 to-paper pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl flex flex-col items-center">
        {/* Subtle emblem */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-warm-tan/30 bg-light-beige/20 mb-8"
        >
          <Landmark className="h-5 w-5 text-warm-tan" />
        </motion.div>

        {/* Small subtitle with fine lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-4 mb-6 uppercase tracking-[0.25em] text-[10px] md:text-xs font-semibold text-warm-tan"
        >
          <span className="w-8 h-[1px] bg-warm-tan/40" />
          <span>The Sovereign Forum for Global Affairs</span>
          <span className="w-8 h-[1px] bg-warm-tan/40" />
        </motion.div>

        {/* Main Serif Heading */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light text-primary-blue leading-[1.1] mb-8 uppercase tracking-wide">
          <span className="block overflow-hidden h-fit py-1">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block font-serif"
            >
              Diplomacy Meets
            </motion.span>
          </span>
          <span className="block overflow-hidden h-fit py-1 italic font-normal text-warm-tan">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block font-serif"
            >
              Timeless History
            </motion.span>
          </span>
        </h1>

        {/* Short refined description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs sm:text-sm md:text-base text-ink/75 leading-relaxed max-w-2xl mb-12"
        >
          Welcome to UEMCON, a premier Model United Nations assembly where delegates debate critical international affairs through the lens of historical global governance. Navigate archival treaty precedents, draft legacy solutions, and negotiate the future of cooperation.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
        >
          <Button variant="primary" href="/contact">
            Register Delegation
          </Button>
          <Button variant="outline" href="/events" className="flex items-center gap-2">
            <Compass className="h-3.5 w-3.5" />
            Explore Committees
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2 text-[9px] tracking-widest uppercase font-bold text-ink/50"
        >
          <span>Scroll to Explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </Container>
    </section>
  );
}
