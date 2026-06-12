"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, Variants, useMotionTemplate } from "framer-motion";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

function ScrollParagraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0, 1, 1, 1]);
  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [4, 0, 0, 0]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;
  const y = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [12, 0, 0, 0]);

  return (
    <motion.p
      ref={ref}
      style={{ opacity, filter, y }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

export default function AboutPage() {
  const { scrollY } = useScroll();
  
  // Banner parallax transforms
  const yBannerBg = useTransform(scrollY, [0, 300], [0, 80]);
  const yBannerFrontLeft = useTransform(scrollY, [0, 300], [0, 30]);
  const yBannerFrontRight = useTransform(scrollY, [0, 300], [0, 45]);
  
  const springBannerBg = useSpring(yBannerBg, { stiffness: 80, damping: 20 });
  const springBannerFrontLeft = useSpring(yBannerFrontLeft, { stiffness: 80, damping: 20 });
  const springBannerFrontRight = useSpring(yBannerFrontRight, { stiffness: 80, damping: 20 });

  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start end", "end start"],
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], [-5, 10]);
  const yLine = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const ySection = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const yAmbient = useTransform(scrollYProgress, [0, 1], [-10, 15]);

  const springYHeader = useSpring(yHeader, { stiffness: 100, damping: 30 });
  const springYLine = useSpring(yLine, { stiffness: 100, damping: 30 });
  const springYSection = useSpring(ySection, { stiffness: 80, damping: 40 });
  const springYAmbient = useSpring(yAmbient, { stiffness: 50, damping: 20 });

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const documentVariants: Variants = {
    hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
    visible: {
      clipPath: "inset(-20% -20% -20% -20%)",
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1],
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20, borderColor: "rgba(203, 173, 127, 0)" },
    visible: {
      opacity: 1, y: 0, borderColor: "rgba(203, 173, 127, 0.1)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div ref={pageRef} className="flex flex-col w-full bg-paper text-ink min-h-[calc(100vh-81px)] relative overflow-hidden pb-16 md:pb-24">
      
      {/* Ambient Diplomatic Details */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center opacity-[0.025]"
        style={{ y: springYAmbient }}
      >
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
          <circle cx="400" cy="400" r="380" stroke="#CBAD7F" strokeWidth="1" strokeDasharray="4 12" />
          <circle cx="400" cy="400" r="360" stroke="#CBAD7F" strokeWidth="0.5" />
          <path d="M400 0L400 800" stroke="#CBAD7F" strokeWidth="0.5" />
          <path d="M0 400L800 400" stroke="#CBAD7F" strokeWidth="0.5" />
          <rect x="200" y="200" width="400" height="400" transform="rotate(45 400 400)" stroke="#CBAD7F" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="150" stroke="#CBAD7F" strokeWidth="1" />
          <circle cx="400" cy="400" r="130" stroke="#CBAD7F" strokeWidth="0.5" strokeDasharray="2 6" />
        </svg>
      </motion.div>

      {/* Full-width warm-tan Header Banner */}
      <div className="w-full bg-[#CBAD7F] relative overflow-hidden flex items-center md:items-end px-6 md:px-12 lg:px-16 py-3 md:py-5 h-[90px] md:h-[155px] border-b border-warm-tan/30 select-none">
        {/* Giant Background Text */}
        <motion.div style={{ y: springBannerBg }} className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-sans font-black text-[#011E33]/12 text-[3.1rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] 2xl:text-[10.5rem] uppercase tracking-tighter leading-none absolute top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:-bottom-3 left-6 md:left-12 lg:left-16 whitespace-nowrap">
              ABOUT US
            </h2>
          </motion.div>
        </motion.div>

        {/* Banner Front Content */}
        <div className="relative z-10 w-full flex justify-between items-center md:items-end text-[#011E33] mb-0 md:mb-1 overflow-hidden">
          <motion.div style={{ y: springBannerFrontLeft }}>
            <motion.span 
              className="font-sans font-bold text-[9px] sm:text-xs tracking-[0.25em] uppercase whitespace-nowrap block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              THE CONCLAVE EXPERIENCE
            </motion.span>
          </motion.div>
          <motion.div style={{ y: springBannerFrontRight }}>
            <motion.span 
              className="font-serif italic text-xs md:text-sm font-semibold max-w-[250px] sm:max-w-md text-right leading-snug hidden md:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              "A symposium of strategy, a theatre of treaties, and tremendous fun"
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Sections: About Us & About UEMCON */}
      <Section className="bg-transparent pt-12 md:pt-20 pb-6 relative z-10" animate={false}>
        <Container className="max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1, margin: "-10% 0px -10% 0px" }}
            variants={containerVariants}
          >
            {/* Single Card containing both sections */}
            <motion.div variants={documentVariants} style={{ transformOrigin: "top center" }}>
              <Card
                interactive={false}
                className="border border-warm-tan/30 relative p-6 sm:p-10 bg-paper/50 backdrop-blur-sm"
              >
                {/* Corner decor */}
                <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-warm-tan/40" />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-warm-tan/40" />
                <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-warm-tan/40" />
                <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-warm-tan/40" />

                {/* Section 1: About Us */}
                <motion.div className="mb-6 text-center md:text-left" variants={titleVariants} style={{ y: springYHeader }}>
                  <span className="font-sans font-bold text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold mb-1 block">
                    Institution
                  </span>
                  <h3 className="text-xl md:text-2xl text-primary-blue font-serif uppercase tracking-wider mb-2">
                    ABOUT US
                  </h3>
                  <motion.div 
                    className="h-[1px] bg-warm-tan/20 w-full mt-4 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ y: springYLine }}
                  />
                </motion.div>

                <motion.div 
                  variants={sectionVariants}
                  className="space-y-6 font-sans text-sm md:text-base text-ink/80 leading-relaxed font-light text-justify max-w-3xl mx-auto mb-10"
                >
                  <ScrollParagraph className="border-l-2 border-[#CBAD7F] pl-6 font-serif italic text-base sm:text-lg text-ink font-medium mb-8">
                    The University of Engineering and Management, Kolkata is a private university located in New Town offering programmes across engineering, management, and law. It has established itself as one of the best universities in India through extensive academic structure, advanced laboratories and research-oriented environment.
                  </ScrollParagraph>

                  <ScrollParagraph>
                    It looks forward to developing individuals who are not only skilled professionals but also responsible contributors to society by emphasising on innovation, discipline and practical learning.
                  </ScrollParagraph>
                </motion.div>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-warm-tan/10 my-10" />

                {/* Section 2: About UEMCON */}
                <motion.div className="mb-6 text-center md:text-left" variants={titleVariants} style={{ y: springYHeader }}>
                  <span className="font-sans font-bold text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold mb-1 block">
                    Conference
                  </span>
                  <h3 className="text-xl md:text-2xl text-primary-blue font-serif uppercase tracking-wider mb-2">
                    ABOUT UEMCON
                  </h3>
                  <motion.div 
                    className="h-[1px] bg-warm-tan/20 w-full mt-4 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ y: springYLine }}
                  />
                </motion.div>

                <motion.div 
                  variants={sectionVariants}
                  className="space-y-6 font-sans text-sm md:text-base text-ink/80 leading-relaxed font-light text-justify max-w-3xl mx-auto"
                >
                  <ScrollParagraph className="border-l-2 border-primary-blue pl-6 font-serif italic text-base sm:text-lg text-primary-blue font-medium mb-8">
                    The UEM Conclave of Nations has been one of the city’s largest diplomatic conferences where delegates, journalists, and young leaders are brought to an environment shaped by debate, negotiation and critical inquiry. Over the years, it worked with organisations such as the United Nations Information Centre (UNIC) for India and Bhutan and the MUN Refugee Challenge, which is a testimony to its ongoing involvement with meaningful global discourse.
                  </ScrollParagraph>

                  <ScrollParagraph>
                    The conference, through the committees, press simulations and parliamentary discussions, allows its participants to acquire political awareness and the ability to navigate global conversations in a responsible and perspective manner.
                  </ScrollParagraph>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}

