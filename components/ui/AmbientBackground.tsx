"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AmbientBackgroundProps {
  color: string;
}

export default function AmbientBackground({ color }: AmbientBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const gradientColor1 = hexToRgba(color, 0.03);
  const gradientColor2 = hexToRgba(color, 0.04);

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <div 
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 50%, ${gradientColor2}, transparent 70%)` }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ willChange: "transform" }}>
      {/* Soft moving orb 1 */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-60"
        style={{
          background: `radial-gradient(circle, ${gradientColor1}, transparent 70%)`,
          left: '10%',
          top: '-10%',
          willChange: 'transform',
        }}
        animate={{
          x: [0, 40, 0, -40, 0],
          y: [0, 20, 60, 20, 0],
          scale: [1, 1.05, 1, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Soft moving orb 2 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, ${gradientColor2}, transparent 70%)`,
          right: '-5%',
          bottom: '20%',
          willChange: 'transform',
        }}
        animate={{
          x: [0, -40, -20, 30, 0],
          y: [0, 30, -30, -20, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Particles (Reduced count for performance) */}
      {Array.from({ length: 4 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = Math.random() * 20 + 25;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: `${initialX}%`,
              top: `${initialY}%`,
              opacity: Math.random() * 0.1 + 0.05,
              willChange: 'transform, opacity',
            }}
            animate={{
              y: [0, -80, -160],
              x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20],
              opacity: [0, Math.random() * 0.2, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        );
      })}
    </div>
  );
}
