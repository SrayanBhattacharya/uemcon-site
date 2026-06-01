"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

export default function ScrollRevealSection({
  children,
  delay = 0,
  className,
  as: Component = "section",
  ...props
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const MotionComponent = motion(Component as any);

  if (prefersReducedMotion) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <MotionComponent
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // Cinematic ease-out curve
      }}
      className={cn("w-full relative", className)}
      style={{ willChange: "transform, opacity" }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
