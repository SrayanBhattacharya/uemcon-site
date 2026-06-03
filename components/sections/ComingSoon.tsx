"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import AmbientBackground from "@/components/ui/AmbientBackground";

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-hidden world-map-bg bg-[#011E33]">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/95 via-paper/90 to-paper/95 z-0" />

      {/* Premium Ambient Background */}
      <AmbientBackground color="#cbad7f" />

      <div className="relative z-10 w-full max-w-6xl text-center flex flex-col items-center select-none">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-warm-tan/30 bg-light-beige/30 backdrop-blur-md mb-8 animate-fade-in"
        >
          <Sparkles className="w-3.5 h-3.5 text-warm-tan animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-tan">
            Diplomacy in the Making
          </span>
        </motion.div>

        {/* Hero-style Massive Title */}
        <div className="flex flex-col items-center mb-6">
          <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.35em] text-[#CBAD7F] uppercase mb-1.5 block">
            11TH EDITION
          </span>
          <h1 className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 uppercase font-sans font-black text-[#F4ECD8] tracking-tighter">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[3.2rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13.5rem] leading-none"
            >
              UEM
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 2.0,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="flex flex-col justify-center items-start text-left leading-[0.85] text-[1.5rem] sm:text-[3.4rem] md:text-[4.4rem] lg:text-[5.3rem] xl:text-[6.2rem] whitespace-nowrap"
            >
              <span>CONCLAVE</span>
              <span>OF NATIONS</span>
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
            className="font-serif italic text-xs sm:text-sm md:text-base text-[#CBAD7F]/90 max-w-[280px] sm:max-w-xl md:max-w-2xl mt-4 mb-1.5 leading-relaxed"
          >
            "A symposium of strategy, a theatre of treaties, and tremendous fun"
          </motion.p>
        </div>

        {/* Main Content Card (Simplified, No Email) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mt-6"
        >
          <Card className="text-center relative backdrop-blur-lg bg-light-beige/40 border border-warm-tan/20 p-8 sm:p-10" interactive={false}>
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-warm-tan/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-warm-tan/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-warm-tan/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-warm-tan/40" />

            <Compass className="w-10 h-10 text-warm-tan mx-auto mb-5 animate-[spin_25s_linear_infinite]" />

            <Heading level={3} className="text-lg sm:text-xl font-light mb-3">
              The Grand Arena is Preparing Its Gates
            </Heading>

            <p className="text-xs sm:text-sm text-ink/75 leading-relaxed font-sans max-w-md mx-auto">
              We are preparing to launch a premium Model United Nations experience. Details on committees, registrations, and delegate applications are coming soon.
            </p>
          </Card>
        </motion.div>

        {/* Footer info / contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 text-center text-[10px] tracking-widest text-ink/40 uppercase font-sans font-medium"
        >
          © {new Date().getFullYear()} UEMCON. All Rights Reserved.
        </motion.div>
      </div>
    </div>
  );
}
