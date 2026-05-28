"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Container from "./Container";

const navLinksLeft = [
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
];

const navLinksRight = [
  { name: "Contact", href: "/contact" },
  { name: "Register", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-[#011E33]/95 border-b border-warm-tan/20 py-2.5 shadow-sm backdrop-blur-md"
          : "bg-transparent py-4"
      )}
    >
      <Container className="flex items-center justify-between relative">
        
        {/* Mobile Menu Icon (aligned left on mobile) */}
        <button
          className="md:hidden text-[#F4ECD8] p-1.5 focus:outline-none border border-warm-tan/20 bg-[#022B4B]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Desktop Left Nav Links */}
        <nav className="hidden md:flex items-center gap-12 w-1/3">
          {navLinksLeft.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans font-black text-xs tracking-widest uppercase transition-colors duration-300 relative py-1 focus-visible:outline focus-visible:outline-warm-tan",
                  isActive ? "text-[#F4ECD8] border-b-2 border-[#CBAD7F]" : "text-[#F4ECD8]/70 hover:text-[#F4ECD8]"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Center Logo (Frans Hals style SVG Emblem) */}
        <div className="flex justify-center w-1/3 text-center">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center select-none group focus-visible:outline focus-visible:outline-warm-tan py-1"
            aria-label="UEMCON Home"
          >
            {/* Elegant SVG placeholder logo representing a globe and UEMCON */}
            <svg
              className="h-10 w-10 text-[#CBAD7F] group-hover:text-[#F4ECD8] transition-colors duration-300"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1.5" />
              <path d="M50 6 A44 44 0 0 0 50 94" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <path d="M50 6 A44 44 0 0 1 50 94" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <path d="M6 50 Q50 65 94 50" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <path d="M6 50 Q50 35 94 50" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <line x1="50" y1="6" x2="50" y2="94" stroke="currentColor" strokeWidth="1.5" />
              <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="1.5" />
              <rect x="42" y="38" width="16" height="20" rx="8" stroke="currentColor" strokeWidth="3" fill="#011E33" />
              <circle cx="50" cy="45" r="2.5" fill="currentColor" />
            </svg>
          </Link>
        </div>

        {/* Desktop Right Nav Links */}
        <nav className="hidden md:flex items-center justify-end gap-12 w-1/3">
          {navLinksRight.map((link, idx) => {
            const isActive = pathname === link.href;
            const isLast = idx === navLinksRight.length - 1;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-sans font-black text-xs tracking-widest uppercase transition-colors duration-300 relative py-1 focus-visible:outline focus-visible:outline-warm-tan",
                  isActive ? "text-[#F4ECD8] border-b-2 border-[#CBAD7F]" : "text-[#F4ECD8]/70 hover:text-[#F4ECD8]",
                  isLast && "text-[#CBAD7F] hover:text-[#F4ECD8]"
                )}
              >
                {link.name} {isLast && "➤"}
              </Link>
            );
          })}
        </nav>

        {/* Empty placeholder on mobile to balance flex layout */}
        <div className="md:hidden w-8" />
      </Container>

      {/* Simple Mobile Dropdown Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-x-0 top-[57px] bg-[#011E33] border-b border-warm-tan/30 shadow-lg px-8 py-8 flex flex-col gap-6 z-30 overflow-hidden"
          >
            <nav className="flex flex-col gap-4 text-left">
              {[...navLinksLeft, ...navLinksRight].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-sans font-bold text-sm tracking-wider uppercase py-2.5 border-b border-warm-tan/10",
                      isActive
                        ? "text-[#CBAD7F] font-black"
                        : "text-[#F4ECD8]/85 hover:text-[#CBAD7F]"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
