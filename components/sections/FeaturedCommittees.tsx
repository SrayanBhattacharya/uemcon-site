"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Scale, FileSignature, ArrowRight } from "lucide-react";
import Section from "../ui/Section";
import Container from "../layout/Container";
import Heading from "../ui/Heading";
import Card from "../ui/Card";
import Divider from "../ui/Divider";
import Button from "../ui/Button";

const committees = [
  {
    name: "DISEC",
    fullName: "Disarmament & International Security",
    agenda: "Evaluating the militarization of oceanic trade routes and sovereignty limits in the polar boundaries.",
    focus: "Strategic containment, demilitarization, and geopolitical treaty structures.",
    icon: Shield,
    delegates: "45 Seats Available",
  },
  {
    name: "UNSC",
    fullName: "United Nations Security Council",
    agenda: "Addressing the legal mandate of unilateral interventionism and peacekeeping in disputed borders.",
    focus: "Collective enforcement, global security architectures, and veto protocols.",
    icon: Scale,
    delegates: "15 Seats Available",
  },
  {
    name: "Historic Summit, 1945",
    fullName: "Special Archival Simulation",
    agenda: "Negotiating the reconstruction of post-war borders, war tribunals, and the foundations of global currency.",
    focus: "Treaty revisions, historical simulation, and international boundary allocation.",
    icon: FileSignature,
    delegates: "30 Seats Available",
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
    <Section className="bg-[#FAF7EE] relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Heading level={6} className="mb-3">
            Sovereign Chambers
          </Heading>
          <Heading level={2} className="mb-6">
            Featured Committees
          </Heading>
          <Divider accent centered className="mb-6" />
          <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
            Represent a nation, research archival precedents, and negotiate in one of our three primary chambers. Spanning security, disarmament, and historic treaty frameworks.
          </p>
        </div>

        {/* Committees Grid */}
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
                <Card className="flex flex-col justify-between w-full h-full group hover:border-primary-blue/30 transition-all duration-300">
                  <div className="space-y-6">
                    {/* Header: Name and Emblem */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-serif text-3xl font-bold text-primary-blue/30 group-hover:text-primary-blue/70 transition-colors duration-300">
                          {committee.name}
                        </span>
                        <Heading level={5} className="text-xs md:text-sm font-semibold tracking-wider text-ink mt-1">
                          {committee.fullName}
                        </Heading>
                      </div>
                      <div className="p-2.5 rounded-none border border-warm-tan/30 bg-light-beige/10 text-warm-tan group-hover:text-primary-blue group-hover:border-primary-blue/40 transition-colors duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="h-[1px] bg-warm-tan/20 w-full" />

                    {/* Content: Agenda Brief */}
                    <div className="space-y-3">
                      <h5 className="font-serif text-xs font-semibold text-primary-blue uppercase tracking-widest">
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

                  {/* Footer metadata */}
                  <div className="mt-8 pt-4 border-t border-warm-tan/10 flex items-center justify-between text-[9px] uppercase tracking-wider text-ink/40 font-bold">
                    <span>{committee.delegates}</span>
                    <span className="flex items-center gap-1 text-primary-blue hover:text-warm-tan transition-colors duration-300 cursor-pointer">
                      Study Archive
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Global CTA Banner */}
        <div className="text-center">
          <Button variant="secondary" href="/events">
            View All Chambers & Rules
          </Button>
        </div>
      </Container>
    </Section>
  );
}
