"use client";

import React from "react";
import { motion } from "framer-motion";
import { Newspaper, Anchor, Landmark, ShieldAlert, Users, Leaf, Globe } from "lucide-react";
import Section from "../ui/Section";
import Container from "../layout/Container";
import Heading from "../ui/Heading";
import Card from "../ui/Card";
import Divider from "../ui/Divider";
import Button from "../ui/Button";

const committees = [
  {
    name: "IMO",
    fullName: "International Maritime Organization",
    agenda: "Formulating shipping regulation revisions to mitigate maritime carbon footprint and securing sovereign territorial trade lanes.",
    focus: "Oceanic trade routes, environmental compliance frameworks, and piracy prevention.",
    icon: Anchor,
    delegates: "40 Seats Available",
    color: "#4CA3A5", // Deep sea teal
  },
  {
    name: "UNW",
    fullName: "UN Women",
    agenda: "Safeguarding socio-economic equality, tackling gender-based wage disparities, and protecting women's rights in active conflict zones.",
    focus: "Universal franchise, gender-responsive national budgeting, and legal protection charters.",
    icon: Users,
    delegates: "50 Seats Available",
    color: "#B37D7D", // Elegant dusty rose
  },
  {
    name: "JPC",
    fullName: "Joint Parliamentary Committee",
    agenda: "Investigating corporate regulatory oversight, public sector allocations, and economic governance reforms under the Indian Parliament.",
    focus: "Bipartisan legislative consensus, accountability protocols, and policy intervention.",
    icon: Landmark,
    delegates: "35 Seats Available",
    color: "#5F8575", // Heritage sage green
  },
  {
    name: "UNCND",
    fullName: "United Nations Commission on Narcotic Drugs",
    agenda: "Evaluating cross-border synthetic drug cartels, regulating illicit supply chains, and constructing humanitarian rehabilitation policies.",
    focus: "Narcotic containment treaties, global policing coordination, and public health directives.",
    icon: ShieldAlert,
    delegates: "45 Seats Available",
    color: "#C87A53", // Muted rust/copper
  },
  {
    name: "IP",
    fullName: "International Press",
    agenda: "Providing critical investigative journalism, opinion editorials, and live photojournalism covering all active committee sessions.",
    focus: "Editorial integrity, press freedom, investigative reporting, and diplomatic caricatures.",
    icon: Newspaper,
    delegates: "20 Seats Available",
    color: "#8AA2B0", // Steel blue
  },
  {
    name: "UN CSC",
    fullName: "UN Civil Society Conference",
    agenda: "Amplifying grassroots and non-governmental voices to accelerate the Sustainable Development Goals (SDGs) and digital equity.",
    focus: "Grassroots mobilization, NGO partnerships, and multi-sectoral global agendas.",
    icon: Globe,
    delegates: "60 Seats Available",
    color: "#CBAD7F", // Signature warm tan
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function FeaturedCommittees() {
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
          Represent a nation, debate global policy, and negotiate treaties within our primary assemblies and specialized bodies.
        </p>

        {/* Committees Grid (3 columns, 2 rows) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {committees.map((committee) => {
            const Icon = committee.icon;
            return (
              <motion.div key={committee.name} variants={cardVariants} className="flex h-full">
                <Card
                  interactive={false}
                  className="flex flex-col justify-between w-full h-full group border border-warm-tan/20 hover:border-[var(--accent-color)] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                  style={{ "--accent-color": committee.color } as React.CSSProperties}
                >
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
                        <Heading level={5} serif={false} className="text-xs md:text-sm font-semibold tracking-wider text-ink mt-1">
                          {committee.fullName}
                        </Heading>
                      </div>
                      <div
                        className="p-2.5 rounded-none border bg-light-beige/10 transition-all duration-300 group-hover:border-[var(--accent-color)]"
                        style={{ borderColor: committee.color + '40', color: committee.color }}
                      >
                        <Icon className="h-5 w-5" />
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
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

      </Container>
    </Section>
  );
}
