import React from "react";
import { allDomains } from "@/app/team/data/team";

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function TeamOverview() {
  return (
    <section className="py-24 border-y border-warm-tan/10 bg-[url('/textures/parchment.png')] bg-repeat relative">
      <div className="absolute inset-0 bg-paper/95 z-0" />
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8">
          <h2 className="font-serif text-3xl md:text-[40px] text-warm-tan mb-4">Organizational Structure</h2>
          <div className="h-px w-24 bg-warm-tan/30 mx-auto"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 relative">
          {allDomains.map((domain, index) => (
            <a 
              key={domain}
              href={`#${slugify(domain)}`}
              className="px-6 py-3 rounded-full border border-warm-tan/20 bg-light-beige/30 backdrop-blur-md text-ink hover:text-warm-tan hover:border-warm-tan/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 inline-block"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
            >
              <span className="font-sans text-sm font-medium tracking-wide">{domain}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
