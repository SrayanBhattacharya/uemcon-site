import React from "react";
import { Landmark, Lightbulb, Globe, ShieldCheck, Users, Globe2 } from "lucide-react";

const values = [
  { icon: Landmark, title: "Leadership" },
  { icon: Lightbulb, title: "Innovation" },
  { icon: Globe, title: "Diplomacy" },
  { icon: ShieldCheck, title: "Integrity" },
  { icon: Users, title: "Collaboration" },
  { icon: Globe2, title: "Global Perspective" },
];

export default function TeamValues() {
  return (
    <section className="bg-light-beige/20 py-24 border-y border-warm-tan/10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={value.title}
                className="text-center group animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
              >
                <div className="mb-6 flex justify-center text-warm-tan/80 group-hover:text-warm-tan transition-colors duration-300">
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <h4 className="font-sans text-sm font-medium text-ink/90 uppercase tracking-[0.1em]">
                  {value.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
