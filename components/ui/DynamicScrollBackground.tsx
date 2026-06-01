"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function DynamicScrollBackground() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Parallax transformations for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.06, 0.03]);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ willChange: "transform" }}>
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full top-[10%] left-[-10%]"
        style={{
          background: "radial-gradient(circle, rgba(2, 79, 134, 0.05), transparent 70%)",
          y: y1,
          opacity,
          willChange: "transform, opacity",
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full top-[60%] right-[-10%]"
        style={{
          background: "radial-gradient(circle, rgba(203, 173, 127, 0.04), transparent 70%)",
          y: y2,
          opacity,
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
