"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollLinkedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "up" | "down" | "neutral";
}

export default function ScrollLinkedCard({
  children,
  className,
  direction = "neutral",
  ...props
}: ScrollLinkedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track scroll position relative to this card's viewport intersection
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Determine translation values based on direction
  const yRange = direction === "up" ? [30, -30] : direction === "down" ? [-30, 30] : [0, 0];

  // Map scroll progress to the translation range
  const rawY = useTransform(scrollYProgress, [0, 1], yRange);
  
  // Apply a spring for buttery smooth interpolation (prevent jitter)
  const springY = useSpring(rawY, { stiffness: 100, damping: 30, mass: 1 });

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ y: springY, willChange: "transform" }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 20px 40px -10px rgba(2, 79, 134, 0.15), 0 0 20px 0 rgba(2, 79, 134, 0.05)",
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 300, damping: 20 },
        boxShadow: { duration: 0.3 }
      }}
      className={cn(
        "relative rounded-none transition-shadow group cursor-pointer",
        className
      )}
      {...(props as any)}
    >
      {/* Subtle glow overlay for premium hover effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none mix-blend-screen bg-gradient-to-tr from-transparent via-[#BDEBFF]/10 to-transparent" />
      {children}
    </motion.div>
  );
}
