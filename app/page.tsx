import React from "react";
import Hero from "@/components/sections/Hero";
import WhatIsUemcon from "@/components/sections/WhatIsUemcon";
import FeaturedCommittees from "@/components/sections/FeaturedCommittees";
import TimelineSection from "@/components/sections/TimelineSection";
import DiplomacyBanner from "@/components/sections/DiplomacyBanner";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Cinematic Hero entry */}
      <Hero />
      
      {/* Narrative Intro Section */}
      <WhatIsUemcon />
      
      {/* Specialized diplomatic committees */}
      <FeaturedCommittees />
      
      {/* Historical evolution pathway */}
      <TimelineSection />
      
      {/* Final quote banner */}
      <DiplomacyBanner />
    </div>
  );
}
