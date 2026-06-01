import React from "react";
import type { Metadata } from "next";

import TeamHero from "@/components/team/TeamHero";
import TeamOverview from "@/components/team/TeamOverview";
import TechnicalAffairsHighlight from "@/components/team/TechnicalAffairsHighlight";
import DepartmentSection from "@/components/team/DepartmentSection";
import TeamTimeline from "@/components/team/TeamTimeline";
import TeamValues from "@/components/team/TeamValues";
import JoinTeamCTA from "@/components/team/JoinTeamCTA";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the minds, leaders, and visionaries driving UEMCON forward.",
};

export default function TeamPage() {
  return (
    <div className="flex flex-col w-full bg-[#011E33] text-[#F4ECD8] min-h-[100vh] items-center justify-center relative overflow-hidden py-20 px-6">
      {/* Background World Map Pattern (faded) */}
      <div className="absolute inset-0 world-map-bg opacity-[0.05] pointer-events-none" />

      {/* Symmetrical fine decorative border */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-warm-tan/10 pointer-events-none hidden md:block" />

      <div className="max-w-2xl text-center relative z-10 flex flex-col items-center">
        <span className="font-sans font-bold text-xs tracking-[0.35em] text-[#CBAD7F] uppercase mb-4 animate-pulse">
          Secretariat Dispatch
        </span>
        
        <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl uppercase text-[#F4ECD8] tracking-tighter leading-none mb-6">
          Team Selection <br />
          <span className="text-[#CBAD7F]">Underway</span>
        </h1>
        
        <p className="font-serif italic text-sm sm:text-base text-[#F4ECD8]/80 leading-relaxed mb-8 max-w-lg">
          "The diplomatic gears are turning. We are currently curating the executive chairs, directors, and organizers who will direct the simulations of UEMCON 2026."
        </p>

        <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#CBAD7F] font-bold border-t border-b border-[#CBAD7F]/20 py-2.5 px-6">
          <span>Finalizing Roster</span>
          <span className="text-[#CBAD7F]/50">•</span>
          <span>Unveiling Soon</span>
        </div>
      </div>

      {/* 
      <div className="flex flex-col w-full bg-paper text-ink min-h-screen">
        <TeamHero />
        <TeamOverview />
        
        <TechnicalAffairsHighlight />
        
        <div className="py-24">
          <DepartmentSection />
        </div>

        <TeamTimeline />
        <TeamValues />
        <JoinTeamCTA />
      </div>
      */}
    </div>
  );
}
