"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import Container from "../layout/Container";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="hero-section relative min-h-[calc(100vh-57px)] flex items-center justify-center overflow-hidden py-8 bg-[#011E33] border-b border-warm-tan/20">
      {/* Background World Map Pattern (faded) */}
      <div className="absolute inset-0 world-map-bg bg-cover bg-center opacity-[0.03] pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center justify-center text-center max-w-6xl px-4 -mt-8 sm:-mt-14">
        {/* Massive Geometric Title (Frans Hals style) */}
        <div className="flex flex-col items-center select-none my-3">
          <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.35em] text-[#CBAD7F] uppercase mb-1.5 block animate-fade-in">
            11TH EDITION
          </span>
          <h1 className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 uppercase font-sans font-black text-[#F4ECD8] tracking-tighter">
            <span className="text-[3.2rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13.5rem] leading-none">
              UEM
            </span>
            <span className="flex flex-col justify-center items-start text-left leading-[0.85] text-[1.5rem] sm:text-[3.4rem] md:text-[4.4rem] lg:text-[5.3rem] xl:text-[6.2rem] whitespace-nowrap">
              <span>CONCLAVE</span>
              <span>OF NATIONS</span>
            </span>
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

        {/* Stacked Offset Block-Buttons (Frans Hals style) */}
        <div className="flex flex-col items-center justify-center space-y-4 z-20">
          {/* Button 1 (Explore Committees) - Dark box, light text */}
          <motion.a
            href="#committees-section"
            whileHover={{ x: 6 }}
            className="w-[260px] sm:w-[320px] min-h-[56px] bg-[#022B4B] text-[#F4ECD8] border border-warm-tan/40 px-6 py-4 font-sans font-bold text-xs uppercase tracking-widest flex items-center justify-between cursor-pointer shadow-md"
          >
            <span>Explore Committees</span>
            <span>➤</span>
          </motion.a>

          {/* Button 2 (Register) - Light box, dark text (Offset left) */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ x: -6 }}
            className="w-[260px] sm:w-[320px] min-h-[56px] bg-[#F4ECD8] text-[#011E33] border-none px-6 py-4 font-sans font-bold text-xs uppercase tracking-widest flex items-center justify-between cursor-pointer shadow-lg transform -translate-x-3 sm:-translate-x-6 focus:outline-none"
          >
            <span>◀</span>
            <span>Register</span>
          </motion.button>
        </div>
      </Container>

      {/* Choice Modal Pop-up */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#011E33]/90 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#011E33] border-2 border-warm-tan/40 p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 select-none"
            >
              {/* Fine decorative inner border */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-warm-tan/10 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-[#F4ECD8]/60 hover:text-warm-tan p-1.5 focus:outline-none border border-warm-tan/20 bg-[#022B4B] cursor-pointer transition-colors duration-200"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="mb-6">
                <span className="font-serif text-[9px] tracking-[0.3em] uppercase text-warm-tan font-bold block mb-1">
                  CONFERENCE REGISTRY
                </span>
                <h3 className="font-sans font-black text-xl sm:text-2xl text-[#F4ECD8] uppercase tracking-wider">
                  SELECT ENTRY PORTAL
                </h3>
                <div className="h-[1px] bg-warm-tan/20 w-full mt-3.5" />
              </div>

              {/* Description */}
              <p className="font-sans text-xs text-[#F4ECD8]/70 leading-relaxed mb-6">
                Please select your registration pathway below. Delegates
                participate in formal committee debates, while Executive Board
                members chair and direct the proceedings.
              </p>

              {/* Portals */}
              <div className="space-y-4">
                {/* Delegate Option */}
                <div className="space-y-1.5">
                  <motion.a
                    href="/contact?type=delegate"
                    whileHover={{ x: 4 }}
                    className="w-full bg-[#F4ECD8] text-[#011E33] px-5 py-3.5 font-sans font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-between cursor-pointer shadow-md"
                  >
                    <span>Delegate Registration</span>
                    <span>➤</span>
                  </motion.a>
                </div>

                {/* EB Option */}
                <div className="space-y-1.5">
                  <motion.a
                    href="/contact?type=eb"
                    whileHover={{ x: 4 }}
                    className="w-full bg-[#022B4B] text-[#F4ECD8] border border-warm-tan/30 px-5 py-3.5 font-sans font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-between cursor-pointer shadow-md"
                  >
                    <span>Executive Board Applications</span>
                    <span>➤</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
