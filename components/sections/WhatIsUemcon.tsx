"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Section from "../ui/Section";
import Container from "../layout/Container";
import Heading from "../ui/Heading";
import Divider from "../ui/Divider";

function ScrollParagraph({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.75, 1, 0.55, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [4, 0, 0, 0, 4]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [1, 1, 1, 0.99, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [12, 0, 0, 0, -12]);

  return (
    <motion.p
      ref={ref}
      style={{ opacity, filter, scale, y }}
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

export default function WhatIsUemcon() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <Section className="bg-paper border-b border-warm-tan/20 py-20 relative">
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
              Overview
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
                  hidden: { opacity: 0, x: -60 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
              >
                What is
              </motion.span>
              <motion.span 
                className="text-[#CBAD7F] block"
                variants={{
                  hidden: { opacity: 0, x: -60 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
                }}
              >
                UEMCON
              </motion.span>
              <motion.span 
                className="text-[#CBAD7F] block"
                variants={{
                  hidden: { opacity: 0, x: -60 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } }
                }}
              >
                (Conclave of Nations)?
              </motion.span>
            </motion.h2>
            <motion.div 
              className="h-[2px] bg-warm-tan/20 mt-4" 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            />
          </div>

          {/* Right Column: Narrative content (7 Columns) */}
          <div className="md:col-span-7 text-left space-y-8 relative py-4">
            <GeometricSeal scrollYProgress={scrollYProgress} />
            
            <ScrollParagraph className="font-sans text-sm md:text-base text-[#FAF7EE] leading-relaxed font-light">
              UEM Conclave of Nations(UEMCON) stands as one of Kolkata’s premier Model United Nations conferences, organised by the University of Engineering & Management, Kolkata. It is more than just a simulation of diplomacy, UEMCON is a dynamic platform where students step into the world of international relations, parliamentary discourse, journalism, and global policymaking.
            </ScrollParagraph>
            
            <ScrollParagraph className="font-sans text-xs sm:text-sm text-[#F4ECD8]/75 leading-relaxed font-light">
              This event rightfully acknowledges the passion, commitment and quality of the delegates. At the end of the two days conference, phenomenal candidates from every committee are honoured for their extreme hardwork and outstanding performance with awards and merit certificates.
            </ScrollParagraph>
            
            <ScrollParagraph className="font-sans text-xs sm:text-sm text-[#F4ECD8]/75 leading-relaxed font-light">
              At its core, UEMCON celebrates the spirit of intense debate, adequate discourse and personal growth. It provides delegates — whether first-timers or experienced participants — with an opportunity to challenge themselves with the global affairs, refine their skills, and leave a lasting impact through their ideas and convictions.
            </ScrollParagraph>
          </div>

        </div>
      </Container>
    </Section>
  );
}
