import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JoinTeamCTA() {
  return (
    <section className="py-32 max-w-[1440px] mx-auto px-4 md:px-16 text-center">
      <h2 className="font-serif text-[40px] leading-tight font-medium text-warm-tan mb-8">
        Interested in becoming part of UEMCON?
      </h2>
      <Link 
        href="/contact" 
        className="inline-flex items-center gap-3 bg-warm-tan text-paper font-sans text-sm font-semibold px-8 py-4 rounded hover:bg-[#b09568] transition-colors duration-300"
      >
        Join UEMCON
        <ArrowRight size={18} />
      </Link>
    </section>
  );
}
