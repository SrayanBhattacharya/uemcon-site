import React from "react";
import Hero from "@/components/sections/Hero";
import TimelineSection from "@/components/sections/TimelineSection";
import FeaturedCommittees from "@/components/sections/FeaturedCommittees";
import DiplomacyBanner from "@/components/sections/DiplomacyBanner";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Cinematic Hero entry */}
      <Hero />
      
      {/* Historical evolution pathway */}
      <TimelineSection />
      
      {/* Specialized diplomatic chambers */}
      <FeaturedCommittees />
      
      {/* Final quote banner */}
      <DiplomacyBanner />
    </div>
  );
}
