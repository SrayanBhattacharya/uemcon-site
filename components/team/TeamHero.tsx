import React from "react";

export default function TeamHero() {
  return (
    <section className="relative overflow-hidden py-32 bg-paper">
      {/* Background patterns */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(203, 173, 127, 0.05) 40px, rgba(203, 173, 127, 0.05) 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(203, 173, 127, 0.05) 40px, rgba(203, 173, 127, 0.05) 41px)
          `
        }}
      />
      <div className="absolute inset-0 bg-[url('/patterns/world_map.png')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 relative z-10 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="font-serif text-5xl md:text-[56px] leading-tight font-semibold text-warm-tan mb-6 tracking-tight">
          OUR TEAM
        </h1>
        <p className="font-sans text-lg md:text-xl text-ink/80 max-w-2xl mx-auto">
          The minds, leaders and visionaries driving UEMCON forward.
        </p>
      </div>
    </section>
  );
}
