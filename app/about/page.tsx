"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

export default function AboutPage() {
  const benefits = [
    {
      title: "Speak to Lead: Boosting Communication Skills",
      desc: "From fiery speeches to calm rebuttals, MUNs teach you to communicate, argue effectively, and respond on the spot. Participating in the UEM Conclave of Nations shall sharpen your public speaking and debating skills that will benefit you in future, presentations, interviews, and everyday conversations."
    },
    {
      title: "From Nerves to Nerve: Building Confidence",
      desc: "Step out, speak up, and own your voice. MUNs push you out of your comfort zone. Each notion, negotiation, or resolution will bring out your inner diplomat and boost your self-esteem. Over time, you'll find yourself having perfected delivering opinions with confidence and conviction—not just at symposiums, but in all aspects of life."
    },
    {
      title: "Making Meaningful Connections: The Power of Networking",
      desc: "MUNs are a networking goldmine where like-minded people from schools and universities gather under the same roof. At UEM Conclave of Nations, every delegate you encounter is a potential friend, future colleague or collaborator—making each interaction a valuable opportunity."
    },
    {
      title: "The Art of Agreement: Diplomacy & Negotiation",
      desc: "Unlike traditional debates, MUNs are not about winning but reaching a common ground. It trains you to reach a consensus in conflict. At UEM Conclave of Nations, you'll practice the art of negotiation, learning how to persuade but at the same time listen and compromise—essential skills for diplomacy, leadership and corporate environments alike."
    },
    {
      title: "Digging Deep: Research Like a Diplomat",
      desc: "MUNs demand more than a quick Google search, it requires thorough preparation. You will need to navigate international policies, historical treaties, real-time developments, and legal frameworks. Through research, you shall hone your skills to discern credible information."
    },
    {
      title: "Think Sharp, Act Smart: Critical Thinking & Solutions",
      desc: "At MUNs like UEM Conclave of Nations, critical thinking meets crisis. It gives you the opportunity to challenge your ability to think rationally and decisively. You'll analyse real-world problems, propose solutions while defending them logically—building problem-solving skills that will stay with you irrespective of global politics and everyday puzzles."
    },
    {
      title: "One Planet, Many Perspectives: Embracing Global Awareness",
      desc: "MUNs give you a front-row seat to international concerns—and a backstage pass to understanding them. UEM Conclave of Nations will expose you to global challenges and diverse viewpoints. The conference will help you develop empathy and a well-rounded perception of the world."
    },
    {
      title: "Bridging Borders: Experiencing Cultural Diversity",
      desc: "MUNs are melting pots of culture. At UEM Conclave of Nations, you'll interact with delegates championing diverse nations and understand their ideologies and traditions. Each council will foster mutual respect, open-mindedness, and camaraderie—one session at a time."
    },
    {
      title: "A Star on Your Resume: Showcasing Leadership",
      desc: "Participation in MUNs showcases initiative, cooperation, leadership, and global awareness. UEM Conclave of Nations proves you are more than academic grades—you're a mediator, problem-solver, thinker, and a speaker. MUN achievements are not just a line on your CV, but rather it's a highlight sought after by top recruiters."
    }
  ];

  return (
    <div className="flex flex-col w-full bg-paper text-ink min-h-[calc(100vh-81px)] relative overflow-hidden pb-16 md:pb-24">
      {/* Full-width warm-tan Header Banner */}
      <div className="w-full bg-[#CBAD7F] relative overflow-hidden flex items-center md:items-end px-6 md:px-12 lg:px-16 py-3 md:py-5 h-[90px] md:h-[155px] border-b border-warm-tan/30 select-none">
        {/* Giant Background Text */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-sans font-black text-[#011E33]/12 text-[3.1rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] 2xl:text-[10.5rem] uppercase tracking-tighter leading-none absolute top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:-bottom-3 left-6 md:left-12 lg:left-16 whitespace-nowrap">
            ABOUT
          </h2>
        </motion.div>

        {/* Banner Front Content */}
        <div className="relative z-10 w-full flex justify-between items-center md:items-end text-[#011E33] mb-0 md:mb-1 overflow-hidden">
          <motion.span 
            className="font-sans font-bold text-[9px] sm:text-xs tracking-[0.25em] uppercase whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            THE CONCLAVE EXPERIENCE
          </motion.span>
          <motion.span 
            className="font-serif italic text-xs md:text-sm font-semibold max-w-[250px] sm:max-w-md text-right leading-snug hidden md:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            "A symposium of strategy, a theatre of treaties, and tremendous fun"
          </motion.span>
        </div>
      </div>

      {/* Section 1: Overview */}
      <Section className="bg-paper pt-12 md:pt-20 pb-6 relative z-10" animate={false}>
        <Container className="max-w-4xl">
          <Card
            interactive={false}
            className="border border-warm-tan/30 relative p-6 sm:p-10"
          >
            {/* Corner decor */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-warm-tan/40" />
            <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-warm-tan/40" />
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-warm-tan/40" />
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-warm-tan/40" />

            <div className="mb-8 text-center md:text-left">
              <span className="font-sans font-bold text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold mb-1 block">
                Overview
              </span>
              <h3 className="text-xl md:text-2xl text-primary-blue font-serif uppercase tracking-wider mb-2">
                ABOUT UEMCON
              </h3>
              <p className="font-sans text-xs text-ink/60">
                Model United Nations conference organized by the University of Engineering & Management, Kolkata.
              </p>
              <div className="h-[1px] bg-warm-tan/20 w-full mt-4" />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6 font-sans text-sm md:text-base text-ink/80 leading-relaxed font-light text-justify max-w-3xl mx-auto"
            >
              <p className="border-l-2 border-[#CBAD7F] pl-6 font-serif italic text-base sm:text-lg text-ink font-medium mb-8">
                UEM Conclave of Nations (UEMCON) is a Model UN conference organised by the University of Engineering & Management in Kolkata, engaging extracurricular pursuits that immerse students in the world of global diplomacy. As young delegates step into the roles of United Nations representatives and Political leaders, they engage in discussions within simulated UN committees and parliamentary simulations, and their intellect, knowledge, and prowess are put to the test.
              </p>

              <p>
                Usually sponsored by colleges, universities, independent Model UN societies or debate chapters, these conferences give young people a stage to highlight and embellish their skills.
              </p>

              <p>
                These events rightfully acknowledge the commitment and quality of delegates. At the end of every conference, exceptional attendees from every committee receive honourable awards and certificates of distinction.
              </p>

              <p>
                The titles awarded are the much-sought-after Best Delegate, the prestigious High Commendation, and the notable Special Mention, with several worthy candidates.
              </p>

              <p>
                Model United Nations is essentially an ideal environment where students can use their enthusiasm for global affairs, commence their journey of personal growth, and improve their skills to become effective, passionate and distinguished delegates, exhibiting their quick thinking, analytical capacity and articulacy.
              </p>
            </motion.div>
          </Card>
        </Container>
      </Section>

      {/* Section 2: Benefits */}
      <Section className="bg-paper py-8 relative z-10" animate={false}>
        <Container className="max-w-6xl">
          <div className="mb-12 text-center">
            <span className="font-sans font-bold text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold mb-1 block">
              Skill Acquisition
            </span>
            <h3 className="text-xl md:text-3xl text-primary-blue font-serif uppercase tracking-wider mb-2">
              WHY PARTICIPATE IN UEMCON?
            </h3>
            <div className="h-[2px] bg-warm-tan/20 w-16 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-light-beige/30 hover:bg-light-beige/50 border border-warm-tan/20 p-6 flex flex-col justify-start relative text-left"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 h-[2px] bg-warm-tan w-12" />
                <h4 className="font-sans font-bold text-sm tracking-wide text-primary-blue uppercase mb-3">
                  {benefit.title}
                </h4>
                <p className="font-sans text-xs text-ink/75 leading-relaxed font-light text-justify">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 3: Road to UEMCON */}
      <Section className="bg-paper pt-8 pb-12 md:pb-20 relative z-10" animate={false}>
        <Container className="max-w-4xl">
          <Card
            interactive={false}
            className="border border-warm-tan/30 relative p-6 sm:p-10"
          >
            {/* Corner decor */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-warm-tan/40" />
            <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-warm-tan/40" />
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-warm-tan/40" />
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-warm-tan/40" />

            <div className="mb-8 text-center md:text-left">
              <span className="font-sans font-bold text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold mb-1 block">
                Heritage
              </span>
              <h3 className="text-xl md:text-2xl text-primary-blue font-serif uppercase tracking-wider mb-2">
                ROAD TO UEMCON
              </h3>
              <div className="h-[1px] bg-warm-tan/20 w-full mt-4" />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6 font-sans text-sm md:text-base text-ink/80 leading-relaxed font-light text-justify max-w-3xl mx-auto"
            >
              <p>
                The UEM Conclave of Nations '25, organised by the University of Engineering and Management, Kolkata, was one of the many conferences that have been successfully conducted. In this conference, there were around 200 participants. The different committees in this MUN have given the delegates an enriching experience in enhancing their diplomatic skills. Some of these committees included UNGA DISEC, Lok Sabha, UNHRC, UNCSW, International Press, COP30, and AUPSC. All of them were important committees that played an important role in discussing global concerns. The whole experience of this conference showed the high level of talent and wisdom of the delegates. They took home many memorable moments along with knowledge of international politics and diplomacy. They felt that they might be able to make positive contributions in the future as a result.
              </p>

              <p className="border-l-2 border-primary-blue pl-6 font-serif italic text-base sm:text-lg text-primary-blue font-medium mb-8">
                The much-awaited eleventh edition of UEM Conclave of Nations 2026 is scheduled for 22nd and 23rd of August, 2026. With the kind of record the past Model UN conferences have created for themselves, it is certain that the future conference will not only uphold but also beat their standards. For all delegates looking for a conference that builds a solid foundation in critical thinking, hones diplomatic skills, or fosters connection, this conference is promised to be a rewarding experience. With a range of committees aimed at testing even the most successful delegates, UEM Conclave of Nations '26 is anticipated to leave a profound and enduring impression on Model UN history.
              </p>
            </motion.div>

            <div className="flex justify-center pt-10 mt-6 border-t border-warm-tan/10">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#CBAD7F] font-bold py-1 px-4">
                <span>Diplomacy</span>
                <span className="text-[#CBAD7F]/50">•</span>
                <span>Leadership</span>
                <span className="text-[#CBAD7F]/50">•</span>
                <span>Growth</span>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
