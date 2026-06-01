"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
  underlineColor?: string;
  delay?: number;
}

export default function AnimatedText({
  text,
  className = "",
  el = "span",
  once = true,
  underlineColor,
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once });
  const prefersReducedMotion = useReducedMotion();
  const Wrapper = el as React.ElementType;

  // Split text into words
  const words = text.split(" ");

  const container: any = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: prefersReducedMotion ? 0 : 0.05, 
        delayChildren: delay 
      },
    }),
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Wrapper ref={ref as any} className={`relative inline-block ${className}`}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap"
      >
        {words.map((word, index) => (
          <span className="overflow-hidden pb-1" key={index}>
            <motion.span variants={child} className="inline-block whitespace-pre" style={{ willChange: "transform, opacity" }}>
              {word}{" "}
            </motion.span>
          </span>
        ))}
      </motion.span>

      {underlineColor && (
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: delay + (words.length * 0.05) + 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 w-full h-[2px] origin-left rounded-full"
          style={{ backgroundColor: underlineColor, willChange: "transform" }}
        />
      )}
    </Wrapper>
  );
}
