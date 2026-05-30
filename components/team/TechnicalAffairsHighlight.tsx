import React from "react";
import { technicalAffairs } from "@/app/team/data/team";
import { TeamGridProvider } from "./TeamGridProvider";
import InteractiveCardWrapper from "./InteractiveCardWrapper";

export default function TechnicalAffairsHighlight() {
  return (
    <section id="technical-affairs" className="py-24 max-w-[1440px] mx-auto px-4 md:px-16 scroll-mt-24">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h2 className="font-serif text-4xl text-warm-tan mb-4 tracking-tight">Technical Affairs</h2>
        <div className="h-px w-24 bg-warm-tan/30 mx-auto"></div>
      </div>
      
      <TeamGridProvider>
        <div className="grid md:grid-cols-2 gap-8">
          {technicalAffairs.map((member, index) => (
            <InteractiveCardWrapper 
              key={member.id} 
              id={member.id} 
              department={member.department}
              isCreator={true}
              className="!p-0 md:!flex-row items-center gap-8" // Override default padding to match the custom layout
            >
              <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                {/* Background Icon Detail */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-opacity duration-1000 group-hover:opacity-10 z-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-warm-tan"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                
                {/* Portrait Activation */}
                <div className="relative w-32 h-32 shrink-0 group-hover:-translate-y-1 transition-transform duration-700 ease-out z-10">
                  {/* Rotating slow ring */}
                  <div className="absolute inset-[-4px] rounded-full border border-warm-tan/0 border-t-warm-tan/50 border-r-warm-tan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-[spin_10s_linear_infinite]" />
                  
                  <div className="w-full h-full rounded-full overflow-hidden border border-warm-tan/30 bg-paper/50 flex items-center justify-center relative shadow-inner group-hover:shadow-[inset_0_0_15px_rgba(203,173,127,0.15)] transition-shadow duration-700">
                    <span className="font-serif text-3xl text-warm-tan/50">{member.name.charAt(0)}</span>
                  </div>
                </div>
                
                <div className="text-center md:text-left z-10">
                  {/* Typography Refinement */}
                  <h3 className="font-serif text-2xl font-medium text-warm-tan mb-1 group-hover:-translate-y-[2px] transition-transform duration-500 ease-out">
                    {member.name}
                  </h3>
                  <p className="font-sans text-sm text-ink/70 mb-4 uppercase tracking-widest group-hover:tracking-[0.15em] transition-all duration-700 ease-out">
                    {member.role}
                  </p>
                  
                  {/* Staggered Icon Animation */}
                  <div className="flex gap-4 justify-center md:justify-start">
                    <a href="#" className="text-ink/50 hover:text-warm-tan transition-colors opacity-60 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 delay-75 duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="#" className="text-ink/50 hover:text-warm-tan transition-colors opacity-60 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 delay-150 duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </a>
                  </div>
                </div>
              </div>
            </InteractiveCardWrapper>
          ))}
        </div>
      </TeamGridProvider>
    </section>
  );
}
