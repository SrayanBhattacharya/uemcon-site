import React from "react";
import { notFound } from "next/navigation";
import committeesData from "@/lib/committees.json";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

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
    <div className="py-12 md:py-20 px-6 md:px-12 lg:px-16 space-y-12">
      {/* Header Info */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span
              className="font-sans text-[10px] tracking-[0.3em] font-black uppercase"
              style={{ color: committee.color }}
            >
              Simulation Session
            </span>
            <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F4ECD8] uppercase tracking-tight leading-none">
              {committee.name}
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-[#F4ECD8]/75 font-medium">
              {committee.fullName}
            </p>
          </div>

          {/* Emblem Wrapper */}
          {committee.icon ? (
            <div
              className="p-3 bg-[#022B4B] border flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 overflow-hidden shrink-0 select-none"
              style={{ borderColor: committee.color + "30" }}
            >
              <img
                src={committee.icon}
                alt={`${committee.name} Emblem`}
                className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          ) : (
            <div
              className="p-3 bg-[#022B4B] border flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 shrink-0 text-center select-none"
              style={{ borderColor: committee.color + "40" }}
            >
              <svg
                className="w-12 h-12 mb-1"
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
        </div>

        <div className="h-[1px] bg-warm-tan/20 w-full" />
      </div>

      {/* Quick Action Button */}
      <div className="flex flex-wrap gap-4">
        <Button disabled variant="outline" className="px-8">
          Registrations Opening Soon
        </Button>
        <Button disabled variant="outline" className="px-8">
          Study Guide Coming Soon
        </Button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
        {/* Left 2 Columns: Long Description */}
        <div className="lg:col-span-2 space-y-6 font-sans text-sm sm:text-base text-ink/80 leading-relaxed">
          {committee.content.map((paragraph, index) => (
            <p key={index} className="text-justify font-sans font-light">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Right 1 Column: Agenda details and key focus */}
        <div className="space-y-6">
          {/* Card detailing Agenda & Key Directives */}
          <div
            className="p-6 bg-[#022B4B] border border-warm-tan/10 rounded-none relative overflow-hidden space-y-6"
            style={{ borderLeft: `4px solid ${committee.color}` }}
          >
            {/* Subtle decorative color dot */}
            <div
              className="absolute top-4 right-4 w-2 h-2 rounded-full"
              style={{ backgroundColor: committee.color }}
            />

            <div className="space-y-3">
              <Heading level={6} className="font-sans font-black tracking-widest uppercase">
                Primary Agenda
              </Heading>
              <p className="font-sans text-xs text-ink/90 italic leading-relaxed">
                "{committee.agenda}"
              </p>
            </div>

            <div className="h-[1px] bg-warm-tan/10 w-full" />

            <div className="space-y-3">
              <Heading level={6} className="font-sans font-black tracking-widest uppercase">
                Key Directives
              </Heading>
              <p className="font-sans text-xs text-[#F4ECD8]/70 leading-relaxed">
                {committee.focus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
