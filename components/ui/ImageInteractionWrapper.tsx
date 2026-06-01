"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ImageInteractionWrapperProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function ImageInteractionWrapper({
  children,
  color = "#cbad7f",
  className = "",
}: ImageInteractionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  // Convert hex color to rgba for glow
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const glowColor = hexToRgba(color, 0.3);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="absolute -inset-2 rounded-full opacity-0 blur-xl transition-opacity duration-500"
        whileHover={{ opacity: 1 }}
        style={{ backgroundColor: glowColor, zIndex: -1 }}
      />
      {children}
    </motion.div>
  );
}
