"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useTeamGrid } from "./TeamGridProvider";

const departmentColors: Record<string, string> = {
  "Technical Affairs": "rgba(242, 201, 76, 1)", // Subtle Electric Gold
  "Delegate Affairs": "rgba(45, 104, 196, 1)",  // Royal Blue
  "External Affairs": "rgba(203, 173, 127, 1)", // Soft Diplomatic Gold
  "Logistics": "rgba(163, 168, 183, 1)",       // Muted Silver
  "Graphics & Design": "rgba(217, 70, 239, 1)", // Creative Gradient approximation (Fuchsia)
  "Photography": "rgba(156, 163, 175, 1)",      // Gray
  "Finance": "rgba(46, 139, 87, 1)",            // Sea Green
  "Content": "rgba(147, 112, 219, 1)",          // Medium Purple
  "Sponsorship": "rgba(255, 215, 0, 1)",        // Gold
  "Social Media & Marketing": "rgba(59, 130, 246, 1)", // Blue
  "Default": "rgba(203, 173, 127, 1)",
};

interface InteractiveCardWrapperProps {
  id: string;
  department: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isCreator?: boolean;
}

export default function InteractiveCardWrapper({
  id,
  department,
  children,
  className = "",
  style,
  isCreator = false,
}: InteractiveCardWrapperProps) {
  const { hoveredCardId, setHoveredCardId } = useTeamGrid();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const accentColor = departmentColors[department] || departmentColors["Default"];
  const spotlightColor = accentColor.replace("1)", isCreator ? "0.08)" : "0.15)"); 
  const borderScanColor = accentColor.replace("1)", isCreator ? "0.6)" : "0.85)"); 
  const ambientShadowColor = accentColor.replace("1)", isCreator ? "0.15)" : "0.25)"); 

  // Motion values for tracking cursor relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Magnetic Pull Springs (Limit to 4-6px max)
  const xSpring = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });
  const ySpring = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    mouseX.set(x);
    mouseY.set(y);

    // Calculate distance from center for magnetic pull (-0.5 to 0.5)
    const centerX = width / 2;
    const centerY = height / 2;
    const moveX = ((x - centerX) / centerX) * 5; // Max 5px movement
    const moveY = ((y - centerY) / centerY) * 5; // Max 5px movement

    xSpring.set(moveX);
    ySpring.set(moveY);
  }

  function handleMouseEnter() {
    setIsHovered(true);
    setHoveredCardId(id);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    setHoveredCardId(null);
    xSpring.set(0);
    ySpring.set(0);
  }

  // Gallery Focus Effect Logic
  const isAnotherCardHovered = hoveredCardId !== null && hoveredCardId !== id;
  const cardOpacity = isAnotherCardHovered ? 0.8 : 1; // Simplify 85/75 to a sleek 80%
  const scaleAdjustment = isAnotherCardHovered ? 0.98 : 1;

  // Spotlight Template
  const spotlightTemplate = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;
  
  // Border Intelligence Gradient
  const borderTemplate = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${borderScanColor}, transparent 50%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: cardOpacity, y: 0, scale: scaleAdjustment }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        x: xSpring,
        y: ySpring,
        ...style,
      }}
      className={`group relative overflow-hidden rounded-lg border border-warm-tan/10 bg-light-beige/20 backdrop-blur-sm transition-shadow duration-700 ${className}`}
    >
      {/* Dynamic Hover Shadow Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          boxShadow: `0 10px 25px rgba(0,0,0,0.2), 0 25px 60px rgba(0,0,0,0.15), 0 0 50px ${ambientShadowColor}`,
        }}
      />

      {/* Layer 1: Background Depth Shift */}
      <div className="absolute inset-0 bg-gradient-to-br from-paper/0 to-paper/80 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none" />

      {/* Layer 2: Border Intelligence Effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none z-10"
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
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: spotlightTemplate,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Layer 4: Creator Special Touch (Glass Sheen) */}
      {isCreator && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 w-[50%] bg-gradient-to-r from-transparent via-warm-tan/10 to-transparent skew-x-[30deg]"
          initial={{ x: "-300%" }}
          animate={{ x: "300%" }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        />
      )}

      {/* Content wrapper with isolation for z-indexing over the effects */}
      <div className="relative z-20 h-full w-full flex flex-col p-6 md:p-8">
        {children}
      </div>
    </motion.div>
  );
}
