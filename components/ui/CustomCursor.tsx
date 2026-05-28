"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Helper function to dynamically climb the DOM tree, find solid backgrounds, and calculate relative luminance
const getElementLuminance = (el: HTMLElement): number => {
  let currentEl: HTMLElement | null = el;
  while (currentEl && currentEl !== document.documentElement) {
    const style = window.getComputedStyle(currentEl);
    const bg = style.backgroundColor;

    if (
      bg &&
      bg !== "transparent" &&
      bg !== "rgba(0, 0, 0, 0)" &&
      !bg.startsWith("initial") &&
      !bg.startsWith("inherit")
    ) {
      const match = bg.match(/[\d.]+/g);
      if (match && match.length >= 3) {
        const r = parseFloat(match[0]);
        const g = parseFloat(match[1]);
        const b = parseFloat(match[2]);
        const a = match[3] !== undefined ? parseFloat(match[3]) : 1.0;

        // Only use if the background is sufficiently opaque
        if (a > 0.1) {
          // Perceived brightness formula (Relative Luminance)
          return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        }
      }
    }
    currentEl = currentEl.parentElement;
  }
  return 0; // Default to dark (the main page background is deep navy #011E33)
};

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTextSelection, setIsTextSelection] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isLightSurface, setIsLightSurface] = useState(false);

  // Mouse coordinates using MotionValues
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for floaty, cinematic movement
  // Outer ring: slower and floaty
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  // Inner dot: very fast, highly responsive
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 50 });

  useEffect(() => {
    // Detect mobile / touch devices or screen size to disable custom cursor
    const checkDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouch || isSmallScreen);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (isHidden) setIsHidden(false);

      const target = e.target as HTMLElement;
      if (target) {
        // Detect actual paragraph/readable text selection zones to restore native cursor elegantly (excluding hero decorative elements)
        const isBodyText = target.closest("p, li, blockquote, textarea, input:not([type='button']):not([type='submit'])") && !target.closest(".hero-section");
        
        // Exclude buttons or links which may contain text elements inside
        const isInsideInteractive = target.closest("a, button, [role='button'], input[type='button'], input[type='submit']");

        if (isBodyText && !isInsideInteractive) {
          setIsTextSelection(true);
        } else {
          setIsTextSelection(false);
        }

        // Dynamically detect light surfaces (like buttons and light cards)
        const luminance = getElementLuminance(target);
        setIsLightSurface(luminance > 0.6); // 0.6 threshold separates light tan/white from deep navy
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Track mouseover globally to catch interactive items dynamically and re-evaluate surface brightness
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        const isInteractive = target.closest("a, button, [role='button'], input[type='button'], input[type='submit'], [data-cursor='hover']");
        setIsHovering(!!isInteractive);

        const luminance = getElementLuminance(target);
        setIsLightSurface(luminance > 0.6);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, isHidden]);

  // Apply visual-hide class dynamically to DocumentElement on desktop
  useEffect(() => {
    if (isMobile) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    if (isTextSelection || isHidden) {
      document.documentElement.classList.remove("has-custom-cursor");
    } else {
      document.documentElement.classList.add("has-custom-cursor");
    }

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isMobile, isTextSelection, isHidden]);

  if (isMobile) return null;

  // Cinematic state mappings for ring sizes
  const ringScale = isClicked ? 0.75 : isHovering ? 1.6 : 1;
  const cursorOpacity = isHidden || isTextSelection ? 0 : 1;

  // Cinematic state mappings for center dot size
  const dotScale = isClicked ? 0.7 : isHovering ? 0.75 : 1;

  // COLOR & BLENDING MATRIX
  // 1. Over light solid backgrounds (buttons): render solid black/navy with normal blend to bypass isolated stacking contexts
  // 2. Over dark/navy and brand headers: render cream and use difference blend for pixel-perfect text glyph inversion
  const blendMode = isLightSurface ? "normal" : "difference";
  
  const dotBgColor = isLightSurface ? "#011E33" : "#E7DFC9";
  
  const ringBorderColor = isLightSurface
    ? (isHovering ? "rgba(1, 30, 51, 0.85)" : "rgba(1, 30, 51, 0.45)")
    : (isHovering ? "rgba(231, 223, 201, 0.9)" : "rgba(231, 223, 201, 0.45)");

  const ringBgColor = isLightSurface
    ? (isHovering ? "rgba(1, 30, 51, 0.05)" : "rgba(0, 0, 0, 0)")
    : (isHovering ? "rgba(231, 223, 201, 0.05)" : "rgba(0, 0, 0, 0)");

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          mixBlendMode: blendMode as any,
        }}
        animate={{
          scale: ringScale,
          borderColor: ringBorderColor,
          backgroundColor: ringBgColor,
          opacity: cursorOpacity,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 25 },
          borderColor: { duration: 0.25 },
          backgroundColor: { duration: 0.25 },
          opacity: { duration: 0.2 },
        }}
        className="fixed left-0 top-0 w-8 h-8 rounded-full border pointer-events-none z-[99999] select-none -translate-x-1/2 -translate-y-1/2"
      />

      {/* Inner Center Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          mixBlendMode: blendMode as any,
        }}
        animate={{
          scale: dotScale,
          backgroundColor: dotBgColor,
          opacity: cursorOpacity,
        }}
        transition={{
          scale: { type: "spring", stiffness: 350, damping: 20 },
          backgroundColor: { duration: 0.25 },
          opacity: { duration: 0.15 },
        }}
        className="fixed left-0 top-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999] select-none -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
