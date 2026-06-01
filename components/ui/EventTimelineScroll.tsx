"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EventTimelineScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function EventTimelineScroll({
  children,
  className,
  ...props
}: EventTimelineScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track the scroll progress of the entire timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth the scroll progress to avoid jitter
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map progress to scaleY for the glowing timeline line
  const scaleY = useTransform(springProgress, [0, 1], [0, 1]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)} {...props}>
      {/* Background track line */}
      <div className="absolute left-[39px] md:left-[25%] top-0 bottom-0 w-[2px] bg-warm-tan/10 hidden md:block" />
      
      {/* Animated glowing progress line */}
      <motion.div
        className="absolute left-[39px] md:left-[25%] top-0 bottom-0 w-[2px] bg-primary-blue origin-top hidden md:block z-10"
        style={{ scaleY, willChange: "transform" }}
      />
      
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
