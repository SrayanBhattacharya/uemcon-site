"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radio, Send, FileText } from "lucide-react";
import Section from "../ui/Section";
import Container from "../layout/Container";
import Heading from "../ui/Heading";
import Card from "../ui/Card";
import Divider from "../ui/Divider";

const dispatches = [
  {
    id: "01",
    name: "Trailer Reel",
    date: "25.05.2026",
    author: "Anshika",
    supervisor: "Poushali Di",
    icon: Radio,
    badge: "TRANSMISSION",
    content: `Something big is about to happen... ⚡️

The halls are silent, but they won't be for long. Whispered strategies, words that could move an entire room, and tension before a resolution – this is where it all unfolds. 🌍🎙️

From heated arguments and memorable instances to alliances, chaos, and breakthroughs – UEM Conclave Of Nations, 2026 is the place where your passion will meet its purpose. 🕊️📜

The wait is almost over. Now, it's time that the rules of diplomacy be revisited. Are you prepared for what's coming?`,
    note: "UEMCON'26 by UEMMUNSC — Coming Soon!",
  },
  {
    id: "02",
    name: "Date Reveal",
    date: "26.05.2026",
    author: "Anshika",
    supervisor: "Poushali Di",
    icon: Send,
    badge: "DATE CONFIRMED",
    content: `Something is stirring once again. 🌍✨
From discussions to diplomacy and the chaos before consensus – all of it begins here.

Save the dates – 22nd & 23rd August 2026.

UEM Conclave Of Nations, 2026 by UEMMUNSC is returning to host powerful conversations, groundbreaking ideas and diplomacy at its finest. A place where differing perspectives meet, ideas are critiqued, and opinions echo beyond the committee walls. The dates are set. Are you ready?`,
    note: "Dates: 22nd & 23rd August 2026",
  },
  {
    id: "03",
    name: "We Are Back Reel",
    date: "26.05.2026",
    author: "Isha",
    supervisor: "Poushali Di",
    icon: FileText,
    badge: "STATUS UPDATE",
    content: `Some conferences end with closing gavel, and some stay with you long after the room falls silent. 🛡✨️

Delegates revising directives in silence. Press rooms chasing the first headline. Agendas capable of dividing a room within minutes. 🕊⚡️

And thus, we return once more to where ideas are tested, challenged, and defended. UEM Conclave of Nations 2026 by UEM Model United Nations Student Chapter is back!`,
    note: "The placards rise again. Newtown Campus.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function NoticeBoard() {
  return (
    <Section className="bg-paper border-b border-warm-tan/20">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.25em] text-[#CBAD7F] uppercase block mb-3 animate-fade-in">
            Transmissions
          </span>
          <Heading level={2} className="mb-6">
            Telegraphic Dispatches
          </Heading>
          <Divider accent centered className="mb-6" />
          <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
            Latest communications, announcements, and planning bulletins from the UEM Model United Nations Secretariat.
          </p>
        </div>

        {/* Dispatches Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {dispatches.map((dispatch) => {
            const Icon = dispatch.icon;
            return (
              <motion.div key={dispatch.id} variants={itemVariants} className="flex h-full">
                <Card className="flex flex-col justify-between w-full h-full border border-warm-tan/30 bg-[#022B4B]/30 relative overflow-hidden group hover:border-[#CBAD7F] transition-all duration-300">
                  <div className="space-y-6">
                    {/* Dispatch Header */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="font-sans text-[8px] sm:text-[9px] font-black tracking-widest text-[#CBAD7F] uppercase block">
                          DISPATCH NO. {dispatch.id}
                        </span>
                        <Heading level={4} className="text-sm font-bold text-primary-blue font-sans">
                          {dispatch.name}
                        </Heading>
                      </div>
                      <span className="font-sans text-[8px] font-black tracking-widest text-[#011E33] bg-[#CBAD7F] px-2 py-0.5 uppercase">
                        {dispatch.badge}
                      </span>
                    </div>

                    <div className="h-[1px] bg-warm-tan/20 w-full" />

                    {/* Metadata Box */}
                    <div className="bg-[#011E33]/40 border border-warm-tan/10 p-3 space-y-1 text-[10px] font-sans">
                      <div className="flex justify-between text-ink/50">
                        <span>SENT DATE:</span>
                        <span className="text-[#F4ECD8] font-bold">{dispatch.date}</span>
                      </div>
                      <div className="flex justify-between text-ink/50">
                        <span>WRITTEN BY:</span>
                        <span className="text-[#F4ECD8] font-bold uppercase">{dispatch.author}</span>
                      </div>
                      <div className="flex justify-between text-ink/50">
                        <span>SECRETARY SIGN-OFF:</span>
                        <span className="text-[#F4ECD8] font-bold uppercase">{dispatch.supervisor}</span>
                      </div>
                    </div>

                    {/* Content text */}
                    <p className="font-sans text-[11px] sm:text-xs text-ink/80 leading-relaxed whitespace-pre-line italic">
                      "{dispatch.content}"
                    </p>
                  </div>

                  {/* Dispatch footer stamp */}
                  <div className="mt-8 pt-4 border-t border-warm-tan/10 flex items-center justify-between text-[10px] uppercase tracking-wider font-bold">
                    <span className="text-[#CBAD7F]">{dispatch.note}</span>
                    <Icon className="h-4 w-4 text-warm-tan/40 group-hover:text-warm-tan transition-colors duration-300" />
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
