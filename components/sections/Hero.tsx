"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Container from "../layout/Container";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-57px)] flex items-center justify-center overflow-hidden py-8 bg-[#011E33] border-b border-warm-tan/20">
      {/* Background World Map Pattern (faded) */}
      <div className="absolute inset-0 world-map-bg bg-cover bg-center opacity-[0.03] pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center justify-center text-center max-w-6xl px-4 -mt-8 sm:-mt-14">
        
        {/* Massive Geometric Title (Frans Hals style) */}
        <div className="flex flex-col items-center select-none my-3">
          <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.35em] text-[#CBAD7F] uppercase mb-1.5 block animate-fade-in">
            2026 EDITION
          </span>
          <h1 className="font-sans font-black text-[#F4ECD8] text-[4.5rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13rem] uppercase tracking-tighter leading-none">
            UEMCON
          </h1>
          <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#CBAD7F]/90 max-w-[280px] sm:max-w-xl md:max-w-2xl mt-2.5 mb-1.5 leading-relaxed">
            "A symposium of strategy, a theatre of treaties, and tremendous fun"
          </p>
        </div>

        {/* Date & Venue details strip */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#F4ECD8]/80 font-bold mb-4.5 mt-1.5 select-none border-t border-b border-[#CBAD7F]/20 py-1.5 px-6">
          <div className="flex items-center gap-2">
            <span className="text-[#CBAD7F]">📅</span>
            <span>22nd & 23rd August 2026</span>
          </div>
          <div className="hidden sm:block text-[#CBAD7F]/50">•</div>
          <div className="flex items-center gap-2">
            <span className="text-[#CBAD7F]">📍</span>
            <span>UEM Newtown, Kolkata</span>
          </div>
        </div>

        {/* Status indicator with clock icon (Frans Hals style) */}
        <div className="flex items-center gap-2.5 font-sans font-bold text-xs sm:text-sm md:text-base text-[#F4ECD8] mb-6 select-none">
          <Clock className="h-4.5 w-4.5 text-[#CBAD7F] animate-pulse" />
          <span>Summit Registry is open today</span>
        </div>

        {/* Stacked Offset Block-Buttons (Frans Hals style) */}
        <div className="flex flex-col items-center justify-center space-y-3 z-20">
          
          {/* Button 1 (Explore Committees) - Dark box, light text */}
          <motion.a
            href="#committees-section"
            whileHover={{ x: 6 }}
            className="w-[260px] sm:w-[320px] bg-[#022B4B] text-[#F4ECD8] border border-warm-tan/40 px-6 py-4 font-sans font-bold text-xs uppercase tracking-widest flex items-center justify-between cursor-pointer shadow-md"
          >
            <span>Explore Committees</span>
            <span>➤</span>
          </motion.a>

          {/* Button 2 (Register delegate) - Light box, dark text (Offset left) */}
          <motion.a
            href="/contact"
            whileHover={{ x: -6 }}
            className="w-[260px] sm:w-[320px] bg-[#F4ECD8] text-[#011E33] border-none px-6 py-4 font-sans font-bold text-xs uppercase tracking-widest flex items-center justify-between cursor-pointer shadow-lg transform -translate-x-3 sm:-translate-x-6"
          >
            <span>◀</span>
            <span>Register Delegate</span>
          </motion.a>

        </div>

      </Container>
    </section>
  );
}
