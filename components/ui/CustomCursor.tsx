"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isLightSurface, setIsLightSurface] = useState(false);

  // Mouse coordinates using MotionValues
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for floaty, cinematic movement (tuned for higher responsiveness/fluidity)
  // Outer ring: slower and floaty
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 25 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 25 });

  // Inner dot: very fast, highly responsive
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 40 });

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
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Track mouseover globally to catch interactive items dynamically and re-evaluate surface brightness
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        // Expanded to include text, images, and cards per magnifying glass requirements, now including spans
        const isInteractive = target.closest("a, button, [role='button'], input, select, textarea, [data-cursor='hover'], p, h1, h2, h3, h4, h5, h6, img, li, blockquote, figure, span, strong, em, b, i, label, div[data-cursor='hover']");
        setIsHovering(!!isInteractive);

        // Light surfaces are specifically the light tan buttons/banners, or elements explicitly marked.
        // This avoids calling getComputedStyle entirely and prevents forced reflows!
        const hasLightBg = target.closest(".bg-primary-blue, .bg-\\[\\#CBAD7F\\], .bg-\\[\\#F4ECD8\\], [data-cursor-light='true']");
        setIsLightSurface(!!hasLightBg);
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

    if (isHidden) {
      document.documentElement.classList.remove("has-custom-cursor");
    } else {
      document.documentElement.classList.add("has-custom-cursor");
    }

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isMobile, isHidden]);

  if (isMobile) return null;

  // Cinematic state mappings for ring sizes
  const ringScale = isClicked ? 0.75 : isHovering ? 1.6 : 1;
  const cursorOpacity = isHidden ? 0 : 1;

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

  // SVG Data URI for displacement map (flat 1.25x zoom)
  const mapSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><defs><linearGradient id="r" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#f00"/><stop offset="100%" stop-color="#000"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f0"/><stop offset="100%" stop-color="#000"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#r)"/><rect width="100%" height="100%" fill="url(#g)" style="mix-blend-mode:screen"/></svg>`;
  const encodedMap = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(mapSvg)}`;

  return (
    <>
      {/* SVG Filter for Optical Zoom Magnification */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
        <filter id="cursor-lens" x="0%" y="0%" width="100%" height="100%" primitiveUnits="objectBoundingBox">
          <feImage href={encodedMap} result="map" preserveAspectRatio="none" x="0" y="0" width="1" height="1" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="0.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          mixBlendMode: (isHovering ? "normal" : blendMode) as any,
          backdropFilter: isHovering ? "url(#cursor-lens)" : "none",
          WebkitBackdropFilter: isHovering ? "url(#cursor-lens)" : "none",
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
        className="fixed left-0 top-0 w-8 h-8 rounded-full border pointer-events-none z-[99999] select-none -translate-x-1/2 -translate-y-1/2 overflow-hidden"
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
