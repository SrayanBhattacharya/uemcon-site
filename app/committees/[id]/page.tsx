import Button from "@/components/ui/Button";
import committeesData from "@/lib/committees.json";
import { notFound } from "next/navigation";
import Image from "next/image";

import AmbientBackground from "@/components/ui/AmbientBackground";
import AnimatedText from "@/components/ui/AnimatedText";
import ClientScrollReveal from "@/components/ui/ClientScrollReveal";
import ImageInteractionWrapper from "@/components/ui/ImageInteractionWrapper";

interface Committee {
  id: string;
  name: string;
  fullName: string;
  agenda: string;
  focus: string;
  icon: string | null;
  color: string;
  type: string;
  quote?: string;
  author?: string;
  backgroundImage?: string;
  content: string[];
}

export function generateStaticParams() {
  const committees = committeesData as Committee[];
  return committees.map((c) => ({
    id: c.id,
  }));
}

export default async function CommitteePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;
  const committees = committeesData as Committee[];
  const committee = committees.find((c) => c.id === id);

  if (!committee) {
    notFound();
  }

  return (
    <div
      className="relative min-h-screen flex flex-col w-full"
      style={{
        background: `radial-gradient(circle at 50% 30%, ${committee.color}0c 0%, #011e33 100%)`,
      }}
    >
      <AmbientBackground color={committee.color} />

      {/* Hero Banner Section */}
      <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] overflow-hidden flex items-end border-b border-warm-tan/10">
        {/* Banner Image */}
        <Image
          src={committee.backgroundImage || "/backgrounds/disec.webp"}
          alt={`${committee.name} Background`}
          fill
          priority
          className="object-cover transition-transform duration-1000 ease-out hover:scale-105 filter brightness-[0.7] contrast-[1.05] opacity-40"
        />
        {/* Color overlay matching committee colors */}
        <div
          className="absolute inset-0 z-10 opacity-30 mix-blend-color-burn"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${committee.color} 0%, transparent 70%)`,
          }}
        />
        {/* Dynamic Dark Gradient fading to base background color */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper/10 via-paper/60 to-paper z-10" />

        {/* Banner content */}
        <div className="w-full relative z-20 px-6 md:px-12 lg:px-16 pb-8 md:pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">

              <AnimatedText
                text={committee.name}
                el="h1"
                className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F4ECD8] uppercase tracking-tight leading-none"
                delay={0.2}
              />
              <ClientScrollReveal delay={0.4}>
                <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#F4ECD8]/90 font-medium mt-1">
                  {committee.fullName}
                </p>
              </ClientScrollReveal>
            </div>

            {/* Emblem Wrapper */}
            <div className="shrink-0">
              <ClientScrollReveal delay={0.3} direction="left">
                <ImageInteractionWrapper color={committee.color}>
                  {committee.icon ? (
                    <div
                      className="p-3 bg-[#022B4B]/80 backdrop-blur-sm border flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 overflow-hidden shrink-0 select-none relative group"
                      style={{ borderColor: committee.color + "30" }}
                    >
                      <div
                        style={{
                          transform:
                            committee.id === "disec" ? "scale(1.3)" : "none",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src={committee.icon}
                          alt={`${committee.name} Emblem`}
                          width={112}
                          height={112}
                          className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-700 ease-out group-hover:scale-110 relative z-10 h-full w-full"
                        />
                      </div>
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
                        <circle
                          cx="50"
                          cy="50"
                          r="44"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="3 3"
                        />
                        <path
                          d="M50 15 A35 35 0 0 0 50 85"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M15 50 Q50 65 85 50"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="10"
                          fill="currentColor"
                          opacity="0.2"
                        />
                      </svg>
                      <span className="font-sans text-[8px] font-black text-warm-tan tracking-widest uppercase">
                        TBD LOGO
                      </span>
                    </div>
                  )}
                </ImageInteractionWrapper>
              </ClientScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-12 lg:px-16 py-8 md:py-12 space-y-8 md:space-y-10 w-full relative z-20 flex-grow">
        {/* Quick Action Button with dynamic themed styles */}
        <ClientScrollReveal delay={0.15} direction="up">
          <div className="flex flex-wrap gap-4">
            <Button
              disabled
              variant="outline"
              className="px-8 transition-all duration-300 border hover:shadow-md"
              style={{
                borderColor: committee.color + "30",
                color: committee.color,
              }}
            >
              Registrations Opening Soon
            </Button>
            <Button
              disabled
              variant="outline"
              className="px-8 transition-all duration-300 border hover:shadow-md"
              style={{
                borderColor: committee.color + "30",
                color: committee.color,
              }}
            >
              Study Guide Coming Soon
            </Button>
          </div>
        </ClientScrollReveal>

        {/* Quote Callout with dynamic gradient background */}
        {committee.quote && (
          <ClientScrollReveal delay={0.25}>
            <div
              className="border-l-4 pl-6 py-3 italic text-lg sm:text-xl text-[#F4ECD8]/95 font-serif max-w-4xl relative overflow-hidden"
              style={{
                borderColor: committee.color,
                background: `linear-gradient(to right, ${committee.color}08, transparent)`,
              }}
            >
              "{committee.quote}"
              <span
                className="block text-xs uppercase tracking-widest font-sans font-semibold mt-2 not-italic opacity-60"
                style={{ color: committee.color }}
              >
                — {committee.author || "Unknown"}
              </span>
            </div>
          </ClientScrollReveal>
        )}

        {/* Main Content paragraphs */}
        <div className="max-w-4xl pt-4">
          <div className="space-y-6 font-sans text-sm sm:text-base text-ink/80 leading-relaxed">
            {committee.content.map((paragraph, index) => (
              <ClientScrollReveal key={index} delay={0.35 + index * 0.04}>
                <p className="text-justify font-sans font-light">{paragraph}</p>
              </ClientScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
