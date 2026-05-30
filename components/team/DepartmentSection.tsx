import React from "react";
import { teamDepartments } from "@/app/team/data/team";
import { User, Globe, Mail } from "lucide-react";
import { TeamGridProvider } from "./TeamGridProvider";
import InteractiveCardWrapper from "./InteractiveCardWrapper";

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function DepartmentSection() {
  return (
    <div className="flex flex-col gap-24">
      {Object.entries(teamDepartments).map(([departmentName, members], idx) => (
        <section id={slugify(departmentName)} key={departmentName} className="max-w-[1440px] mx-auto px-4 md:px-16 w-full scroll-mt-24">
          <div className="flex items-center gap-6 mb-12 animate-in fade-in slide-in-from-bottom-8">
            <h2 className="font-serif text-3xl md:text-[40px] text-warm-tan whitespace-nowrap">
              {departmentName}
            </h2>
            <div className="h-px w-full bg-warm-tan/20"></div>
          </div>
          
          <TeamGridProvider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map((member, index) => (
                <InteractiveCardWrapper 
                  key={member.id} 
                  id={member.id} 
                  department={member.department}
                  className="items-center text-center !p-6" // Override padding for the smaller standard card
                  style={{ animationDelay: `${(idx * 100) + (index * 100)}ms`, animationFillMode: "both" }}
                >
                  {/* Portrait Activation */}
                  <div className="relative w-24 h-24 shrink-0 group-hover:-translate-y-1 transition-transform duration-700 ease-out z-10 mb-6 mx-auto">
                    {/* Rotating slow ring */}
                    <div className="absolute inset-[-4px] rounded-full border border-warm-tan/0 border-t-warm-tan/50 border-r-warm-tan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-[spin_10s_linear_infinite]" />
                    
                    <div className="w-full h-full rounded-full overflow-hidden border border-warm-tan/30 bg-paper/50 flex items-center justify-center relative shadow-inner group-hover:shadow-[inset_0_0_15px_rgba(203,173,127,0.15)] transition-shadow duration-700">
                      <User size={32} className="text-warm-tan/40" />
                    </div>
                  </div>
                  
                  {/* Typography Refinement */}
                  <h3 className="font-serif text-[22px] font-medium text-ink mb-1 group-hover:text-warm-tan group-hover:-translate-y-[2px] transition-all duration-500 ease-out z-10 relative">
                    {member.name}
                  </h3>
                  <p className="font-sans text-xs text-ink/60 uppercase tracking-widest mb-6 group-hover:tracking-[0.2em] transition-all duration-700 ease-out z-10 relative">
                    {member.department}
                  </p>
                  
                  {/* Staggered Icon Animation */}
                  <div className="flex gap-4 mt-auto justify-center z-10 relative">
                    <a href="#" className="text-ink hover:text-warm-tan transition-colors opacity-60 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 delay-75 duration-500">
                      <Globe size={18} strokeWidth={1.5} />
                    </a>
                    <a href="#" className="text-ink hover:text-warm-tan transition-colors opacity-60 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 delay-150 duration-500">
                      <Mail size={18} strokeWidth={1.5} />
                    </a>
                  </div>
                </InteractiveCardWrapper>
              ))}
            </div>
          </TeamGridProvider>
        </section>
      ))}
    </div>
  );
}
