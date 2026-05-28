"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Landmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Container from "./Container";
import Button from "../ui/Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        isScrolled
          ? "bg-[#FAF7EE]/95 border-b border-warm-tan/20 py-4 shadow-sm backdrop-blur-md"
          : "bg-transparent py-6"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-serif text-base md:text-lg tracking-widest text-primary-blue uppercase font-medium focus-visible:outline focus-visible:outline-warm-tan"
        >
          <Landmark className="h-5 w-5 text-warm-tan" />
          <span>UEMCON</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-[11px] tracking-widest uppercase transition-colors duration-300 relative py-1 focus-visible:outline focus-visible:outline-warm-tan",
                  isActive
                    ? "text-primary-blue font-bold"
                    : "text-ink/75 hover:text-primary-blue hover-underline-animation"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-primary-blue"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Register */}
        <div className="hidden md:block">
          <Button variant="primary" href="/contact">
            Register
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="md:hidden text-ink p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-warm-tan"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-[71px] bg-[#FAF7EE] border-b border-warm-tan/30 shadow-lg px-8 py-8 flex flex-col gap-6 z-30 overflow-hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-sans text-xs tracking-widest uppercase py-2.5 border-b border-warm-tan/10",
                      isActive
                        ? "text-primary-blue font-bold"
                        : "text-ink/80 hover:text-primary-blue"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <Button
              variant="primary"
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center"
            >
              Register Portal
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
