"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, RefreshCw, Home } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full min-h-[70vh] items-center justify-center bg-paper relative py-12">
      {/* Subtle world map background */}
      <div className="absolute inset-0 world-map-bg bg-cover bg-center opacity-[0.03] pointer-events-none" />

      <Container className="max-w-xl text-center relative z-10">
        {/* Archival Warning Header */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-12 h-12 border border-warm-tan/40 bg-light-beige/10 flex items-center justify-center text-warm-tan mb-2">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-warm-tan font-bold">
            Security Clearance Warning
          </span>
        </div>

        {/* Major Header */}
        <Heading level={1} className="text-5xl font-light text-primary-blue mb-4 font-serif">
          404
        </Heading>
        
        {/* Stamp element */}
        <div className="inline-block border-2 border-dashed border-red-800/60 text-red-800/70 font-sans text-[10px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 mb-8 rotate-[-2deg] select-none rounded-[1px]">
          Declassified / Archive Missing
        </div>

        <Divider accent centered className="mb-8" />

        {/* Narrative Description */}
        <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed mb-12">
          The diplomatic dispatch or declassified document you are requesting has either been decommissioned, relocated under a different registry, or never existed in the official archives of this summit. Please verify the URL protocol or contact the secretariat desk.
        </p>

        {/* Fallback actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button variant="primary" href="/">
            <div className="flex items-center gap-2">
              <Home className="h-3.5 w-3.5" />
              <span>Return to Assembly</span>
            </div>
          </Button>
          <Button variant="outline" href="/contact">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Inquire Secretariat</span>
            </div>
          </Button>
        </div>
      </Container>
    </div>
  );
}
