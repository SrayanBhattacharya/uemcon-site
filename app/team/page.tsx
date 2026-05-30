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
    <div className="flex flex-col w-full bg-paper text-ink min-h-screen">
      <TeamHero />
      <TeamOverview />
      
      {/* 
        The Technical Affairs Division acts as the digital infrastructure and technology 
        execution backbone, hence its highlighted premium placement. 
      */}
      <TechnicalAffairsHighlight />
      
      <div className="py-24">
        <DepartmentSection />
      </div>

      <TeamTimeline />
      <TeamValues />
      <JoinTeamCTA />
    </div>
  );
}
