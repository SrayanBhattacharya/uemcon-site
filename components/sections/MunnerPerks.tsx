"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "../ui/Section";
import Container from "../layout/Container";
import Heading from "../ui/Heading";

function ScrollParagraph({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.75, 1, 0.55, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [1, 1, 1, 0.99, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [12, 0, 0, 0, -12]);

  return (
    <motion.p
      ref={ref}
      style={{ opacity, scale, y }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

const GeometricSeal = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <motion.div 
      style={{ y }} 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none text-[#CAAC7E] opacity-[0.03]"
    >
      <svg width="450" height="450" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        {/* Concentric Globes */}
        <circle cx="50" cy="50" r="45" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="35" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="25" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="15" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="5" strokeWidth="0.5" />
        {/* Lat/Long Lines */}
        <line x1="5" y1="50" x2="95" y2="50" strokeWidth="0.5" />
        <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.5" />
        <line x1="18.18" y1="18.18" x2="81.82" y2="81.82" strokeWidth="0.5" />
        <line x1="18.18" y1="81.82" x2="81.82" y2="18.18" strokeWidth="0.5" />
        <line x1="26.46" y1="11.46" x2="73.54" y2="88.54" strokeWidth="0.25" />
        <line x1="11.46" y1="26.46" x2="88.54" y2="73.54" strokeWidth="0.25" />
        <line x1="73.54" y1="11.46" x2="26.46" y2="88.54" strokeWidth="0.25" />
        <line x1="88.54" y1="26.46" x2="11.46" y2="73.54" strokeWidth="0.25" />
        {/* Outer Wreath Abstract */}
        <path d="M10,50 A40,40 0 0,0 50,90 A40,40 0 0,0 90,50" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    </motion.div>
  );
};

export default function MunnerPerks() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <Section className="bg-paper border-t border-warm-tan/20 py-20 relative">
      <Container className="max-w-5xl">
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Left Column: Heading (5 Columns) */}
          <div className="md:col-span-5 text-left space-y-4 overflow-hidden">
            <motion.span 
              className="font-sans font-bold text-xs sm:text-sm tracking-[0.25em] text-[#CBAD7F] uppercase block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1 }}
            >
              Benefits
            </motion.span>
            <motion.h2 
              className="font-sans font-black uppercase tracking-tighter leading-[1.1] text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[3rem]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
            >
              <motion.span 
                className="text-[#F4ECD8] block text-3xl sm:text-4xl lg:text-5xl"
                variants={{
                  hidden: { opacity: 0, y: -50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
              >
                What are the
              </motion.span>
              <motion.span 
                className="text-[#CBAD7F] block"
                variants={{
                  hidden: { opacity: 0, x: -60 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
                }}
              >
                Perks of being a MUNner?
              </motion.span>
            </motion.h2>
            <motion.div 
              className="h-[2px] bg-warm-tan/20 mt-4" 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            />
          </div>

          {/* Right Column: Narrative content (7 Columns) */}
          <div className="md:col-span-7 text-left space-y-8 relative py-4">
            <GeometricSeal scrollYProgress={scrollYProgress} />
            
            <ScrollParagraph className="font-sans text-sm md:text-base text-[#FAF7EE] leading-relaxed font-light">
              UEM Conclave of Nations serves as a dynamic platform where the participants can refine their communication skills, bolster their confidence and discover the power of articulate expression through rigorous debate, strategic negotiations and calm rebuttals.
            </ScrollParagraph>
            
            <ScrollParagraph className="font-sans text-xs sm:text-sm text-[#F4ECD8]/75 leading-relaxed font-light">
              The conferences foster an environment that encourages individuals to step out of one's comfort zone and engage with a diverse community of like-minded peers from schools and universities alike, evolving into future opportunities. It trains them in diplomacy and negotiation, learning empathy and how to persuade but at the same time to listen and compromise as well.
            </ScrollParagraph>
            
            <ScrollParagraph className="font-sans text-xs sm:text-sm text-[#F4ECD8]/75 leading-relaxed font-light">
              UEMCON also challenges conventional thinking, that sharpens a participant by letting them hone their analytical, research-based, and problem-solving abilities— qualities that will remain invaluable far beyond the realm of diplomacy and global politics. Beyond policies and procedures lies showcasing awareness of various cultures, ideologies around the globe and embracing a mosaic of perspectives.
            </ScrollParagraph>
          </div>

        </div>
      </Container>
    </Section>
  );
}
