import React from "react";

const timelineEvents = [
  { step: "01", title: "Ideation", description: "Conceptualizing the vision" },
  { step: "02", title: "Planning", description: "Structuring the execution" },
  { step: "03", title: "Team Formation", description: "Assembling the leaders" },
  { step: "04", title: "Development", description: "Building the infrastructure" },
  { step: "05", title: "Outreach", description: "Expanding our global reach" },
  { step: "06", title: "Execution", description: "Delivering the conference" },
];

export default function TeamTimeline() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden" id="journey-section">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-warm-tan/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-warm-tan/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Section Title */}
      <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-8">
        <h2 className="font-serif text-5xl md:text-6xl text-warm-tan mb-4 font-normal tracking-tight">The Journey</h2>
        <div className="w-24 h-px bg-warm-tan/40 mx-auto"></div>
      </div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Horizontal Line Connector */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 z-0 bg-gradient-to-r from-transparent via-warm-tan/30 to-transparent"></div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4 relative z-10">
          {timelineEvents.map((event, index) => {
            const isTop = index % 2 === 0;

            return (
              <div 
                key={event.step}
                className="group flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: "both" }}
              >
                {/* Desktop Top Label (Odd Steps) */}
                <div className={`mb-8 h-20 flex-col justify-end hidden md:flex ${!isTop && "md:hidden"}`}>
                  {isTop && (
                    <>
                      <h3 className="font-serif text-sm uppercase tracking-[0.2em] mb-2 text-ink group-hover:text-warm-tan group-hover:drop-shadow-[0_0_8px_rgba(203,173,127,0.3)] transition-all duration-300">{event.title}</h3>
                      <p className="font-sans text-xs text-ink/50 max-w-[150px] mx-auto italic">{event.description}</p>
                    </>
                  )}
                </div>

                {/* Circle */}
                <div className={`w-14 h-14 rounded-full border border-warm-tan/30 bg-[#02233B] flex items-center justify-center text-warm-tan font-serif text-xs transition-all duration-300 cursor-pointer mb-4 md:mb-0 group-hover:shadow-[0_0_20px_rgba(203,173,127,0.4)] group-hover:border-warm-tan group-hover:scale-110 ${!isTop && "md:mt-[136px] order-2 md:order-none"}`}>
                  {event.step}
                </div>

                {/* Desktop Bottom Label (Even Steps) */}
                <div className={`mt-8 h-20 flex-col justify-start hidden md:flex ${isTop && "md:hidden"} md:order-none order-1`}>
                  {!isTop && (
                    <>
                      <h3 className="font-serif text-sm uppercase tracking-[0.2em] mb-2 text-ink group-hover:text-warm-tan group-hover:drop-shadow-[0_0_8px_rgba(203,173,127,0.3)] transition-all duration-300">{event.title}</h3>
                      <p className="font-sans text-xs text-ink/50 max-w-[150px] mx-auto italic">{event.description}</p>
                    </>
                  )}
                </div>

                {/* Mobile view text */}
                <div className="md:hidden order-1">
                  <h3 className="font-serif text-sm uppercase tracking-[0.2em] mb-2 text-warm-tan">{event.title}</h3>
                  <p className="font-sans text-xs text-ink/50 italic">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
