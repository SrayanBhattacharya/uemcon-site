"use client";

import { motion } from "framer-motion";
import React from "react";
import Container from "../layout/Container";
import Card from "../ui/Card";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

import committeesData from "@/lib/committees.json";
import Link from "next/link";

interface Committee {
  id: string;
  name: string;
  fullName: string;
  agenda: string;
  focus: string;
  icon: string | null;
  color: string;
  type: string;
  content: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function FeaturedCommittees() {
  const committees = committeesData as Committee[];

  return (
    <Section id="committees-section" className="py-0 relative" animate={false}>
      {/* Full-width warm-tan Header Banner styled like the second screenshot (no picture) */}
      <div className="w-full bg-[#CBAD7F] relative overflow-hidden flex items-center md:items-end px-6 md:px-12 lg:px-16 py-3 md:py-5 h-[90px] md:h-[155px] border-b border-warm-tan/30 select-none">
        {/* Giant Background Text */}
        <h2 className="font-sans font-black text-[#011E33]/12 text-[3.1rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] 2xl:text-[10.5rem] uppercase tracking-tighter leading-none absolute top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:-bottom-3 left-6 md:left-12 lg:left-16 pointer-events-none whitespace-nowrap">
          COMMITTEES
        </h2>

        {/* Banner Front Content */}
        <div className="relative z-10 w-full flex justify-between items-center md:items-end text-[#011E33] mb-0 md:mb-1">
          <span className="font-sans font-bold text-[9px] sm:text-xs tracking-[0.25em] uppercase whitespace-nowrap">
            OFFICIAL SIMULATION COMMITTEES
          </span>
          <span className="font-serif italic text-xs md:text-sm font-semibold max-w-[250px] sm:max-w-md text-right leading-snug hidden md:block">
            "A symposium of strategy, a theatre of treaties, and tremendous fun"
          </span>
        </div>
      </div>

      <Container className="py-16 md:py-24">
        {/* Elegant top brief */}
        <p className="font-sans text-xs sm:text-sm text-ink/75 max-w-2xl mb-12 leading-relaxed">
          Represent a nation, debate global policy, and negotiate treaties
          within our primary assemblies and specialized bodies.
        </p>

        {/* Committees Grid (3 columns) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {committees.map((committee) => {
            return (
              <motion.div
                key={committee.id}
                variants={cardVariants}
                className="flex h-full"
              >
                <Card
                  interactive={false}
                  className="flex flex-col justify-between w-full h-full group border border-warm-tan/20 hover:border-[var(--accent-color)] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                  style={
                    { "--accent-color": committee.color } as React.CSSProperties
                  }
                >
                  <div className="flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-6">
                      {/* Header: Name and Emblem */}
                      <div className="flex justify-between items-start">
                        <div>
                          <span
                            className="font-sans text-3xl font-black transition-all duration-300 opacity-30 group-hover:opacity-85"
                            style={{ color: committee.color }}
                          >
                            {committee.name}
                          </span>
                          <Heading
                            level={5}
                            serif={false}
                            className="text-xs md:text-sm font-semibold tracking-wider text-ink mt-1"
                          >
                            {committee.fullName}
                          </Heading>
                        </div>
                        <div
                          className="p-0 rounded-none border bg-light-beige/20 transition-all duration-300 group-hover:border-[var(--accent-color)] group-hover:bg-light-beige/30 flex items-center justify-center w-16 h-16 overflow-hidden shrink-0"
                          style={{ borderColor: committee.color + "30" }}
                        >
                          {committee.icon ? (
                            <img
                              src={committee.icon}
                              alt={`${committee.name} emblem`}
                              className="object-contain transition-transform duration-500 group-hover:scale-110 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                              style={{
                                height: `48px`,
                                width: `48px`,
                              }}
                            />
                          ) : (
                            <svg
                              className="w-10 h-10 transition-transform duration-500 group-hover:scale-110"
                              viewBox="0 0 100 100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ color: committee.color }}
                            >
                              <circle
                                cx="50"
                                cy="50"
                                r="44"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeDasharray="3 3"
                              />
                              <path
                                d="M50 15 A35 35 0 0 0 50 85"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path
                                d="M15 50 Q50 65 85 50"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div className="h-[1px] bg-warm-tan/20 w-full" />

                      {/* Content: Agenda Brief */}
                      <div className="space-y-3">
                        <h5
                          className="font-serif text-xs font-semibold uppercase tracking-widest"
                          style={{ color: committee.color }}
                        >
                          Primary Agenda:
                        </h5>
                        <p className="font-sans text-xs text-ink/80 leading-relaxed italic">
                          "{committee.agenda}"
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-serif text-[10px] font-semibold text-warm-tan uppercase tracking-widest">
                          Key Directives:
                        </h5>
                        <p className="font-sans text-[11px] text-ink/60 leading-relaxed">
                          {committee.focus}
                        </p>
                      </div>
                    </div>

                    {/* Details Button */}
                    <div className="pt-2">
                      <Link
                        href={`/committees/${committee.id}`}
                        className="inline-flex items-center gap-2 font-sans font-bold text-[10px] tracking-widest uppercase transition-all duration-300 py-3 px-4 w-full justify-between text-center select-none border border-warm-tan/20 hover:border-[var(--accent-color)] text-[#F4ECD8] hover:bg-[var(--accent-color)] hover:text-[#011E33] cursor-pointer"
                      >
                        <span>View Details</span>
                        <span>➤</span>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
