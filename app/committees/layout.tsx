"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Menu, X, ChevronRight, Compass } from "lucide-react";
import committeesData from "@/lib/committees.json";
import Container from "@/components/layout/Container";

interface Committee {
  id: string;
  name: string;
  fullName: string;
  agenda: string;
  focus: string;
  icon: string | null;
  color: string;
  type: string;
  content: string[];
}

export default function CommitteesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentId = pathname.split("/").pop() || "imo";
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const committees = committeesData as Committee[];

  return (
    <div className="min-h-[calc(100vh-71px)] md:min-h-[calc(100vh-81px)] flex flex-col md:flex-row relative">
      {/* Mobile Sidebar Header / Toggle Bar */}
      <div className="md:hidden w-full bg-[#022B4B] border-b border-warm-tan/20 px-6 py-4 flex items-center justify-between sticky top-[71px] z-30">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-warm-tan" />
          <span className="font-serif text-sm uppercase tracking-wider text-[#F4ECD8]">
            Navigate Committees
          </span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="text-[#F4ECD8] bg-[#011E33] border border-warm-tan/30 p-2 hover:bg-[#011E33]/85 transition-colors"
          aria-label="Toggle committee menu"
        >
          {isMobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden fixed inset-0 bg-[#011E33]/90 backdrop-blur-sm z-30 top-[128px]"
            />
            {/* Drawer Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="md:hidden fixed left-0 w-[280px] sm:w-[320px] bg-[#011E33] border-r border-warm-tan/20 h-[calc(100vh-128px)] overflow-y-auto z-40 top-[128px] p-6 flex flex-col gap-6"
            >
              <div>
                <span className="font-serif text-[10px] tracking-[0.25em] uppercase text-warm-tan font-bold block mb-1">
                  OFFICIAL SIMULATIONS
                </span>
                <h3 className="font-sans font-black text-xl text-[#F4ECD8] uppercase tracking-wider">
                  COMMITTEES
                </h3>
              </div>

              {/* Committee Items List */}
              <nav className="flex flex-col gap-3">
                {committees.map((committee) => {
                  const isActive = currentId === committee.id;
                  return (
                    <Link
                      key={committee.id}
                      href={`/committees/${committee.id}`}
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className={`flex items-start gap-3 p-3 transition-all duration-300 text-left border ${
                        isActive
                          ? "bg-[#BDEBFF] border-[#BDEBFF] text-[#011E33]"
                          : "bg-[#022B4B]/40 hover:bg-[#022B4B]/80 border-warm-tan/10 text-[#F4ECD8]"
                      }`}
                    >
                      <Star
                        className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${
                          isActive ? "text-[#011E33] fill-current" : "text-warm-tan"
                        }`}
                      />
                      <div>
                        <div className="font-sans font-black text-xs tracking-wider">
                          {committee.name}
                        </div>
                        <div
                          className={`font-serif text-[10px] leading-tight mt-0.5 line-clamp-1 ${
                            isActive ? "text-[#011E33]/70" : "text-[#F4ECD8]/60"
                          }`}
                        >
                          {committee.fullName}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Left-hand side) */}
      <aside className="hidden md:flex flex-col w-80 bg-[#022B4B]/30 border-r border-warm-tan/20 p-8 shrink-0 overflow-y-auto sticky top-[81px] h-[calc(100vh-81px)]">
        <div className="mb-6 pb-4 border-b border-warm-tan/10">
          <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-warm-tan font-bold block mb-1">
            CONCLAVE OF NATIONS
          </span>
          <h3 className="font-sans font-black text-xl text-[#F4ECD8] uppercase tracking-wider">
            COMMITTEES
          </h3>
        </div>

        {/* Committee Items List */}
        <nav className="flex flex-col gap-3.5">
          {committees.map((committee) => {
            const isActive = currentId === committee.id;
            return (
              <Link
                key={committee.id}
                href={`/committees/${committee.id}`}
                className={`flex items-start gap-4 p-4 transition-all duration-300 text-left border relative group select-none ${
                  isActive
                    ? "bg-[#BDEBFF] border-[#BDEBFF] text-[#011E33]"
                    : "bg-[#022B4B]/10 hover:bg-[#022B4B]/30 border-warm-tan/10 text-[#F4ECD8]"
                }`}
              >
                <Star
                  className={`h-4.5 w-4.5 shrink-0 mt-0.5 transition-colors duration-300 ${
                    isActive
                      ? "text-[#011E33] fill-current"
                      : "text-warm-tan/60 group-hover:text-warm-tan"
                  }`}
                />
                <div className="flex-grow">
                  <div className="font-sans font-black text-xs tracking-wider uppercase">
                    {committee.name}
                  </div>
                  <div
                    className={`font-serif text-[10px] leading-tight mt-1 line-clamp-1 ${
                      isActive ? "text-[#011E33]/70" : "text-[#F4ECD8]/50"
                    }`}
                  >
                    {committee.fullName}
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <ChevronRight className="h-4 w-4 text-[#011E33]" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content display on the right */}
      <main className="flex-grow w-full md:max-w-[calc(100vw-320px)] relative overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
