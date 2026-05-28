"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "../ui/Section";
import Container from "../layout/Container";
import Heading from "../ui/Heading";
import Divider from "../ui/Divider";

export default function WhatIsUemcon() {
  return (
    <Section className="bg-paper border-b border-warm-tan/20 py-20 relative">
      <Container className="max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Left Column: Heading (5 Columns) */}
          <div className="md:col-span-5 text-left space-y-4">
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.25em] text-[#CBAD7F] uppercase block">
              Overview
            </span>
            <h2 className="font-sans font-black uppercase tracking-tighter leading-[1] flex flex-col gap-2">
              <span className="text-[#F4ECD8] text-3xl sm:text-4xl lg:text-5xl">What is</span>
              <span className="text-[#CBAD7F] text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[3rem] leading-tight">
                UEMCON (Conclave of Nations)?
              </span>
            </h2>
            <div className="h-[2px] bg-warm-tan/20 w-24 mt-4" />
          </div>

          {/* Right Column: Narrative content (7 Columns) */}
          <div className="md:col-span-7 text-left space-y-6">
            <p className="font-sans text-sm md:text-base text-[#FAF7EE] leading-relaxed font-light">
              UEM Conclave of Nations (UEMCON) is an engaging extracurricular pursuit that immerses students in the world of global diplomacy. As young delegates step into the roles of United Nations representatives and engage in discussions within simulated UN committees, their intellect, knowledge, and prowess are put to the test.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#F4ECD8]/75 leading-relaxed font-light">
              These events rightfully acknowledge the commitment and quality of delegates. At the end of every conference, exceptional attendees from every committee receive honourable awards and certificates of distinction.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#F4ECD8]/75 leading-relaxed font-light">
              Model United Nations is essentially an ideal environment where students can use their enthusiasm for global affairs, commence their journey of personal growth, and improve their skills to become effective, passionate delegates.
            </p>
          </div>

        </div>
      </Container>
    </Section>
  );
}
