"use client";

import React from "react";
import Section from "../ui/Section";
import Container from "../layout/Container";
import Heading from "../ui/Heading";

export default function MunnerPerks() {
  return (
    <Section className="bg-paper border-t border-warm-tan/20 py-20 relative">
      <Container className="max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Left Column: Heading (5 Columns) */}
          <div className="md:col-span-5 text-left space-y-4">
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.25em] text-[#CBAD7F] uppercase block">
              Benefits
            </span>
            <h2 className="font-sans font-black uppercase tracking-tighter leading-[1.1] text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[3rem]">
              <span className="text-[#F4ECD8] block text-3xl sm:text-4xl lg:text-5xl">What are the</span>
              <span className="text-[#CBAD7F] block">
                Perks of being a MUNner?
              </span>
            </h2>
            <div className="h-[2px] bg-warm-tan/20 w-24 mt-4" />
          </div>

          {/* Right Column: Narrative content (7 Columns) */}
          <div className="md:col-span-7 text-left space-y-8">
            <p className="font-sans text-sm md:text-base text-[#FAF7EE] leading-relaxed font-light">
              UEM Conclave of Nations serves as a dynamic platform where the participants can refine their communication skills, bolster their confidence and discover the power of articulate expression through rigorous debate, strategic negotiations and calm rebuttals.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#F4ECD8]/75 leading-relaxed font-light">
              The conferences foster an environment that encourages individuals to step out of one's comfort zone and engage with a diverse community of like-minded peers from schools and universities alike, evolving into future opportunities. It trains them in diplomacy and negotiation, learning empathy and how to persuade but at the same time to listen and compromise as well.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#F4ECD8]/75 leading-relaxed font-light">
              UEMCON also challenges conventional thinking, that sharpens a participant by letting them hone their analytical, research-based, and problem-solving abilities— qualities that will remain invaluable far beyond the realm of diplomacy and global politics. Beyond policies and procedures lies showcasing awareness of various cultures, ideologies around the globe and embracing a mosaic of perspectives.
            </p>
          </div>

        </div>
      </Container>
    </Section>
  );
}
