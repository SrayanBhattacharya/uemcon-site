"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface InteractiveCommitteeCardProps {
  id: string;
  color: string;
  children: React.ReactNode;
  className?: string;
  isHoveredByOther?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export default function InteractiveCommitteeCard({
  id,
  color,
  children,
  className = "",
  isHoveredByOther = false,
  onHoverStart,
  onHoverEnd,
}: InteractiveCommitteeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Convert hex color to rgba for gradients. Fallback to a default if not provided.
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const spotlightColor = hexToRgba(color, 0.12);
  const borderScanColor = hexToRgba(color, 0.6);
  const ambientShadowColor = hexToRgba(color, 0.2);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Magnetic Pull Springs for 3D Tilt
  const xSpring = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });
  const ySpring = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    if (!cardRef.current || prefersReducedMotion) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    mouseX.set(x);
    mouseY.set(y);

    const centerX = width / 2;
    const centerY = height / 2;
    
    // Tilt rotation (max 3 degrees)
    const rotateX = ((y - centerY) / centerY) * -3; 
    const rotateY = ((x - centerX) / centerX) * 3;

    xSpring.set(rotateY);
    ySpring.set(rotateX);
  }

  function handleMouseEnter() {
    setIsHovered(true);
    if (onHoverStart) onHoverStart();
  }

  function handleMouseLeave() {
    setIsHovered(false);
    if (onHoverEnd) onHoverEnd();
    xSpring.set(0);
    ySpring.set(0);
  }

  // Gallery Focus Effect Logic
  const cardOpacity = isHoveredByOther ? 0.4 : 1; 
  const scaleAdjustment = isHoveredByOther ? 0.97 : (isHovered && !prefersReducedMotion ? 1.02 : 1);
  const yAdjustment = isHovered && !prefersReducedMotion ? -6 : 0;

  // Spotlight Template
  const spotlightTemplate = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;
  
  // Border Intelligence Gradient
  const borderTemplate = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, ${borderScanColor}, transparent 50%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        opacity: cardOpacity, 
        scale: scaleAdjustment,
        y: yAdjustment
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: prefersReducedMotion ? 0 : ySpring,
        rotateY: prefersReducedMotion ? 0 : xSpring,
        transformPerspective: 1000,
      }}
      className={`group relative overflow-hidden rounded-none border border-transparent bg-light-beige/45 shadow-md transition-shadow duration-700 ${className}`}
    >
      {/* Loading Border Animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="rgba(203, 173, 127, 0.4)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </svg>

      {/* Dynamic Hover Shadow Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          boxShadow: `0 12px 30px rgba(0,0,0,0.15), 0 0 40px ${ambientShadowColor}`,
        }}
      />

      {/* Layer 1: Background Depth Shift */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#011E33]/0 to-[#011E33]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" />

      {/* Layer 2: Border Intelligence Effect */}
      {isHovered && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-none pointer-events-none z-10"
          style={{
            background: borderTemplate,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px", // Border thickness
          }}
        />
      )}

      {/* Layer 3: Cursor Reactive Spotlight */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
          style={{
            background: spotlightTemplate,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Content wrapper with isolation for z-indexing over the effects */}
      <div 
        className="relative z-20 h-full w-full flex flex-col p-6 md:p-8 lg:p-10"
      >
        {children}
      </div>
    </motion.div>
  );
}
