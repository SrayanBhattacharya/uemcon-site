import React from "react";
import { notFound } from "next/navigation";
import committeesData from "@/lib/committees.json";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

import AmbientBackground from "@/components/ui/AmbientBackground";
import AnimatedText from "@/components/ui/AnimatedText";
import ClientScrollReveal from "@/components/ui/ClientScrollReveal";
import ImageInteractionWrapper from "@/components/ui/ImageInteractionWrapper"; // Let's create this next for the emblem

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

export function generateStaticParams() {
  const committees = committeesData as Committee[];
  return committees.map((c) => ({
    id: c.id,
  }));
}

export default async function CommitteePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const committees = committeesData as Committee[];
  const committee = committees.find((c) => c.id === id);

  if (!committee) {
    notFound();
  }

  return (
    <div className="pt-6 pb-12 md:py-20 px-6 md:px-12 lg:px-16 space-y-8 md:space-y-12 relative min-h-screen">
      <AmbientBackground color={committee.color} />
      
      {/* Header Info */}
      <div className="space-y-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <ClientScrollReveal delay={0.1} direction="down">
              <span
                className="font-sans text-[10px] tracking-[0.3em] font-black uppercase"
                style={{ color: committee.color }}
              >
                Simulation Session
              </span>
            </ClientScrollReveal>
            <AnimatedText 
              text={committee.name} 
              el="h1" 
              className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F4ECD8] uppercase tracking-tight leading-none"
              delay={0.2}
            />
            <ClientScrollReveal delay={0.4}>
              <p className="font-serif italic text-lg sm:text-xl text-[#F4ECD8]/75 font-medium mt-2">
                {committee.fullName}
              </p>
            </ClientScrollReveal>
          </div>

          {/* Emblem Wrapper */}
          <ClientScrollReveal delay={0.3} direction="left">
            <ImageInteractionWrapper color={committee.color}>
              {committee.icon ? (
                <div
                  className="p-3 bg-[#022B4B]/80 backdrop-blur-sm border flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 overflow-hidden shrink-0 select-none relative group"
                  style={{ borderColor: committee.color + "30" }}
                >
                  <img
                    src={committee.icon}
                    alt={`${committee.name} Emblem`}
                    className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-700 ease-out group-hover:scale-110 relative z-10"
                    style={{ height: "100%", width: "100%" }}
                  />
                  {/* Subtle lighting response on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              ) : (
                <div
                  className="p-3 bg-[#022B4B]/80 backdrop-blur-sm border flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 shrink-0 text-center select-none group"
                  style={{ borderColor: committee.color + "40" }}
                >
                  <svg
                    className="w-12 h-12 mb-1 transition-transform duration-700 ease-out group-hover:scale-110"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: committee.color }}
                  >
                    <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                    <path d="M50 15 A35 35 0 0 0 50 85" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M15 50 Q50 65 85 50" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.2" />
                  </svg>
                  <span className="font-sans text-[8px] font-black text-warm-tan tracking-widest uppercase">
                    TBD LOGO
                  </span>
                </div>
              )}
            </ImageInteractionWrapper>
          </ClientScrollReveal>
        </div>

        <ClientScrollReveal delay={0.5} direction="none">
          <div className="h-[1px] bg-warm-tan/20 w-full" />
        </ClientScrollReveal>
      </div>

      {/* Quick Action Button */}
      <ClientScrollReveal delay={0.6} direction="up" className="relative z-10">
        <div className="flex flex-wrap gap-4">
          <Button disabled variant="outline" className="px-8 transition-transform hover:-translate-y-0.5">
            Registrations Opening Soon
          </Button>
          <Button disabled variant="outline" className="px-8 transition-transform hover:-translate-y-0.5">
            Study Guide Coming Soon
          </Button>
        </div>
      </ClientScrollReveal>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto pt-4 relative z-10">
        <div className="space-y-6 font-sans text-sm sm:text-base text-ink/80 leading-relaxed">
          {committee.content.map((paragraph, index) => (
            <ClientScrollReveal key={index} delay={0.2 + (index * 0.1)}>
              <p className="text-justify font-sans font-light">
                {paragraph}
              </p>
            </ClientScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
