"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Divider from "@/components/ui/Divider";
import Card from "@/components/ui/Card";

const scheduleData = {
  "day-1": [
    { time: "09:00 AM - 10:30 AM", title: "Registrations & Credentials", desc: "Checking in delegations, distributing placards and security briefs.", location: "Grand Assembly Foyer" },
    { time: "11:00 AM - 12:30 PM", title: "Opening Plenary Ceremony", desc: "Keynote address by chief diplomats and society advisors.", location: "Plenary Summit Hall" },
    { time: "02:00 PM - 04:30 PM", title: "Committee Session I", desc: "Establishing agenda, opening speeches, and primary lobbying blocs.", location: "Committee Rooms" },
    { time: "04:45 PM - 06:30 PM", title: "Committee Session II", desc: "Formal debate, initial positioning, and introduction of working papers.", location: "Committee Rooms" },
  ],
  "day-2": [
    { time: "09:00 AM - 12:30 PM", title: "Committee Session III", desc: "Drafting resolutions, debates on amendments, and bilateral discussions.", location: "Committee Rooms" },
    { time: "01:30 PM - 03:00 PM", title: "Unscheduled Crisis Simulation", desc: "Special real-time scenario tracking strategic containment mandates.", location: "Committee Rooms / Security Council" },
    { time: "03:15 PM - 04:45 PM", title: "Committee Session IV", desc: "Final reading of resolution drafts, amendment voting, and passage.", location: "Committee Rooms" },
    { time: "05:00 PM - 06:30 PM", title: "Closing Plenary & Awards", desc: "Gavel distributions, secretariat summaries, and delegate reviews.", location: "Plenary Summit Hall" },
  ],
};

const deadlines = [
  { date: "June 15, 2026", title: "Priority Registration Closes", status: "Open" },
  { date: "June 30, 2026", title: "Regular Registration Closes", status: "Upcoming" },
  { date: "July 10, 2026", title: "Country Allocations & Background Guides", status: "Upcoming" },
  { date: "August 22, 2026", title: "Opening Summit Day", status: "Upcoming" },
];

export default function EventsPage() {
  const [activeDay, setActiveDay] = useState<"day-1" | "day-2">("day-1");

  return (
    <div className="flex flex-col w-full">
      {/* Intro Banner */}
      {/* Full-width warm-tan Header Banner styled like the Committees banner */}
      <Section className="py-0 relative" animate={false}>
        <div className="w-full bg-[#CBAD7F] relative overflow-hidden flex items-center md:items-end px-6 md:px-12 lg:px-16 py-3 md:py-5 h-[90px] md:h-[155px] border-b border-warm-tan/30 select-none">
          {/* Giant Background Text */}
          <h2 className="font-sans font-black text-[#011E33]/12 text-[3.1rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] 2xl:text-[10.5rem] uppercase tracking-tighter leading-none absolute top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:-bottom-3 left-6 md:left-12 lg:left-16 pointer-events-none whitespace-nowrap">
            AGENDA
          </h2>
          
          {/* Banner Front Content */}
          <div className="relative z-10 w-full flex justify-between items-center md:items-end text-[#011E33] mb-0 md:mb-1">
            <span className="font-sans font-bold text-[9px] sm:text-xs tracking-[0.25em] uppercase whitespace-nowrap">
              SCHEDULE & MILESTONES
            </span>
            <span className="font-serif italic text-xs md:text-sm font-semibold max-w-[280px] sm:max-w-md text-right leading-snug hidden md:block">
              "Plan your lobbying, prepare your positions, and follow key milestones"
            </span>
          </div>
        </div>
      </Section>

      {/* Deadlines Section */}
      <Section className="bg-paper">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Heading level={6} className="mb-2">
              Timeline
            </Heading>
            <Heading level={3} className="text-xl md:text-2xl text-primary-blue font-serif uppercase tracking-wider">
              Registration Milestones
            </Heading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deadlines.map((dl) => (
              <Card key={dl.title} interactive={false} className="border border-warm-tan/30 relative">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-serif text-lg font-bold text-primary-blue">{dl.date}</span>
                  <span className={`font-sans text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 border ${
                    dl.status === "Open" ? "border-primary-blue text-primary-blue bg-primary-blue/5" : "border-warm-tan/50 text-warm-tan bg-warm-tan/5"
                  }`}>
                    {dl.status}
                  </span>
                </div>
                <Heading level={5} className="text-xs md:text-sm font-semibold text-ink mb-2">
                  {dl.title}
                </Heading>
                <div className="flex items-center gap-1.5 text-[9px] text-ink/50 uppercase tracking-widest font-bold">
                  <CheckCircle className="h-3 w-3 text-warm-tan/60" />
                  <span>Mandatory Deadline</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Interactive Schedule */}
      <Section className="bg-light-beige/10 border-t border-warm-tan/20">
        <Container className="max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Heading level={6} className="mb-2">
              Sovereign Summit
            </Heading>
            <Heading level={3} className="text-xl md:text-2xl text-primary-blue font-serif uppercase tracking-wider">
              Two-Day Session Schedule
            </Heading>
          </div>

          {/* Day Toggles */}
          <div className="flex justify-center border-b border-warm-tan/30 mb-12">
            {(["day-1", "day-2"] as const).map((day, idx) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 sm:px-8 py-3.5 font-sans text-xs tracking-widest uppercase border-b-2 transition-all duration-300 ${
                  activeDay === day
                    ? "border-primary-blue text-primary-blue font-bold"
                    : "border-transparent text-ink/65 hover:text-primary-blue"
                }`}
              >
                Day 0{idx + 1}
              </button>
            ))}
          </div>

          {/* Schedule List */}
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {scheduleData[activeDay].map((event, idx) => (
              <div
                key={event.title}
                className="flex flex-col md:flex-row items-stretch border border-warm-tan/20 bg-paper hover:border-primary-blue/30 transition-all duration-300 rounded-[2px]"
              >
                {/* Time frame panel */}
                <div className="md:w-1/4 bg-light-beige/20 border-b md:border-b-0 md:border-r border-warm-tan/20 p-6 flex flex-col justify-center items-start md:items-center">
                  <div className="flex items-center gap-2 text-primary-blue">
                    <Clock className="h-4 w-4 text-warm-tan" />
                    <span className="font-serif text-sm font-semibold tracking-wide">
                      {event.time.split(" - ")[0]}
                    </span>
                  </div>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-ink/40 font-bold mt-1">
                    {event.time.split(" - ")[1]}
                  </span>
                </div>

                {/* Details panel */}
                <div className="md:w-3/4 p-6 flex flex-col justify-between gap-4">
                  <div>
                    <span className="font-serif text-[10px] tracking-widest uppercase text-warm-tan font-bold">
                      Session Milestone 0{idx + 1}
                    </span>
                    <Heading level={4} className="text-lg text-primary-blue mt-1 mb-2">
                      {event.title}
                    </Heading>
                    <p className="font-sans text-xs text-ink/75 leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold text-ink/50 pt-2 border-t border-warm-tan/10">
                    <MapPin className="h-3 w-3 text-warm-tan/70" />
                    <span>Location: {event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
