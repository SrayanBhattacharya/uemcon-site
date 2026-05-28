"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "../ui/Section";
import Container from "../layout/Container";
import Heading from "../ui/Heading";
import Card from "../ui/Card";
import Divider from "../ui/Divider";
import { Landmark, FileText, Globe } from "lucide-react";

const timelineItems = [
  {
    year: "1919",
    title: "Covenant of the League of Nations",
    location: "Versailles, France",
    description:
      "Born from the ruins of the Great War, the League established the first permanent intergovernmental forum dedicated to international arbitration, collective security, and resolving disputes through open diplomacy.",
    icon: FileText,
  },
  {
    year: "1945",
    title: "Signing of the UN Charter",
    location: "San Francisco, USA",
    description:
      "Fifty nations united to sign the foundational charter of the United Nations, establishing the General Assembly, the Security Council, and a global framework to maintain peace, security, and human rights.",
    icon: Landmark,
  },
  {
    year: "Present",
    title: "UEMCON: Inheriting the Legacy",
    location: "UEM Society",
    description:
      "Continuing the tradition of diplomatic negotiation. We invite student delegates to represent global sovereigns, examine treaty archives, resolve historic crises, and design blueprints for a cooperative world.",
    icon: Globe,
  },
];

export default function TimelineSection() {
  return (
    <Section className="bg-light-beige/10 border-t border-b border-warm-tan/20">
      <Container className="max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Heading level={6} className="mb-3">
            Historical Context
          </Heading>
          <Heading level={2} className="mb-6">
            The Evolution of Diplomacy
          </Heading>
          <Divider accent centered className="mb-6" />
          <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
            From early treaty coalitions to global forums, the quest for international cooperation has shaped human history. Walk through the key epochs that inspire UEMCON.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 md:pl-0">
          {/* Vertical axis line */}
          <div className="absolute top-0 bottom-0 left-[11px] md:left-1/2 md:-translate-x-1/2 w-[1px] bg-warm-tan/30" />

          {/* Timeline Milestones */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className="relative flex flex-col md:flex-row items-stretch md:justify-between w-full"
                >
                  {/* Timeline Dot with icon */}
                  <div className="absolute top-2 left-[-20px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-none border border-warm-tan bg-[#022B4B] text-[#F4ECD8] z-10 shadow-md">
                    <Icon className="h-3 w-3" />
                  </div>

                  {/* Left Side Content Card (Desktop: Alternating position) */}
                  <div className={`w-full md:w-[46%] ${isEven ? "md:order-1" : "md:order-3 md:text-right"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Card className="hover:border-primary-blue/30 transition-all duration-300">
                        <div className={`flex flex-col ${!isEven && "md:items-end"}`}>
                          <span className="font-serif text-xl md:text-2xl font-bold text-warm-tan mb-1">
                            {item.year}
                          </span>
                          <Heading level={4} className="text-lg text-primary-blue mb-2">
                            {item.title}
                          </Heading>
                          <span className="font-sans text-[9px] tracking-widest text-ink/40 uppercase mb-4 font-semibold">
                            {item.location}
                          </span>
                          <p className={`font-sans text-xs text-ink/75 leading-relaxed ${!isEven && "md:text-right"}`}>
                            {item.description}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Center Space buffer */}
                  <div className="hidden md:block md:w-[8%] md:order-2" />

                  {/* Right Side Empty buffer */}
                  <div className="hidden md:block md:w-[46%] md:order-3" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
