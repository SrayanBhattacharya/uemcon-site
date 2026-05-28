"use client";

import React from "react";
import { motion } from "framer-motion";
import { Landmark, Compass, Award, Star } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Divider from "@/components/ui/Divider";
import Card from "@/components/ui/Card";

const pillars = [
  {
    title: "Academic Rigor",
    description: "Our debates are anchored in deep historical research, archival treaties, and international law precedents. We challenge delegates to think beyond soundbites.",
    icon: Landmark,
  },
  {
    title: "Diplomatic Realism",
    description: "Simulating authentic crisis scenarios, national security priorities, and geopolitical mandates that govern genuine global diplomacy.",
    icon: Compass,
  },
  {
    title: "Legacy Leadership",
    description: "Developing public speaking, negotiation, crisis management, and consensus-building skills that form the bedrock of tomorrow's governance.",
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Intro Banner */}
      <Section className="bg-light-beige/10 border-b border-warm-tan/20">
        <Container className="max-w-4xl text-center py-8">
          <Heading level={6} className="mb-3">
            About the Secretariat
          </Heading>
          <Heading level={1} className="mb-6">
            Sovereign Legacy
          </Heading>
          <Divider accent centered className="mb-6" />
          <p className="font-sans text-xs sm:text-sm md:text-base text-ink/75 leading-relaxed max-w-2xl mx-auto">
            UEMCON is the official Model United Nations conference hosted by the University of Engineering & Management. We exist to groom intellectual leaders who respect history and navigate the future.
          </p>
        </Container>
      </Section>

      {/* Secretary-General's Welcome (Editorial Letter layout) */}
      <Section className="bg-[#FAF7EE]">
        <Container className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="border border-warm-tan/30 p-8 md:p-12 bg-light-beige/5 relative shadow-sm"
          >
            {/* Fine styling elements */}
            <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-warm-tan/40" />
            <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-warm-tan/40" />
            <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-warm-tan/40" />
            <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-warm-tan/40" />

            <div className="flex justify-between items-center mb-8">
              <span className="font-serif text-[10px] tracking-widest uppercase text-warm-tan font-bold">
                Archival Document: A/79/101
              </span>
              <span className="font-sans text-[9px] tracking-widest text-ink/40 uppercase font-semibold">
                May 2026
              </span>
            </div>

            <Heading level={3} className="text-xl md:text-2xl text-primary-blue font-serif mb-6 italic font-medium">
              "A Call to Sovereign Minds"
            </Heading>

            <div className="font-sans text-xs md:text-sm text-ink/80 space-y-6 leading-relaxed">
              <p>
                Distinguished Delegates, Advisors, and Honored Guests,
              </p>
              <p>
                It is my privilege to welcome you to the UEM Model United Nations conference. As we navigate an era of unprecedented global challenges, the lessons of history become our most vital compass. The design of our statecraft cannot afford to forget the treaties, compromises, and protocols that have sustained peace in epochs past.
              </p>
              <p>
                UEMCON is not merely an academic exercise. It is a crucible of global negotiation. Here, you are asked to set aside personal bias, step into the shoes of sovereign nations, and defend national mandates under heavy strategic scrutiny. You will wrestle with the polarities of national interest and international solidarity.
              </p>
              <p>
                We hope this conference inspires you to debate with intelligence, draft with clarity, and lead with empathy. The archives of global diplomacy await your signatures.
              </p>
              <p className="pt-4 font-serif text-warm-tan font-semibold tracking-wider text-xs">
                Sincerely,
              </p>
              <p className="font-serif text-primary-blue font-bold tracking-widest text-sm uppercase">
                The Secretary-General
              </p>
              <p className="font-sans text-[10px] text-ink/50 uppercase tracking-widest font-semibold">
                Secretariat of UEMCON 2026
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Pillars Section */}
      <Section className="bg-light-beige/10 border-t border-b border-warm-tan/20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Heading level={6} className="mb-3">
              Our Foundations
            </Heading>
            <Heading level={2} className="mb-6">
              The Three Core Pillars
            </Heading>
            <Divider accent centered className="mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} className="text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border border-warm-tan/30 flex items-center justify-center text-warm-tan bg-light-beige/10 mb-6">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <Heading level={4} className="text-lg text-primary-blue mb-3">
                    {pillar.title}
                  </Heading>
                  <p className="font-sans text-xs text-ink/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}
