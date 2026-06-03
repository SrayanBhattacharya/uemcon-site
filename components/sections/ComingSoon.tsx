"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Compass, Sparkles, CheckCircle } from "lucide-react";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import AmbientBackground from "@/components/ui/AmbientBackground";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-hidden world-map-bg">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/95 via-paper/90 to-paper/95 z-0" />

      {/* Premium Ambient Background */}
      <AmbientBackground color="#cbad7f" />

      <div className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-warm-tan/30 bg-light-beige/30 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-warm-tan animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-tan">
            Diplomacy in the Making
          </span>
        </motion.div>

        {/* Brand/Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <Heading level={1} className="tracking-[0.15em] sm:text-6xl md:text-7xl font-light">
            UEMCON
          </Heading>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm font-semibold tracking-widest text-warm-tan uppercase mb-12 font-sans"
        >
          University of Engineering & Management Model United Nations
        </motion.p>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <Card className="text-center relative backdrop-blur-lg bg-light-beige/40 border border-warm-tan/20 p-8 sm:p-12">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-warm-tan/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-warm-tan/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-warm-tan/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-warm-tan/40" />

            <Compass className="w-10 h-10 text-warm-tan mx-auto mb-6 animate-[spin_20s_linear_infinite]" />

            <Heading level={3} className="text-xl sm:text-2xl font-light mb-4">
              The Grand Arena is Being Prepared
            </Heading>

            <p className="text-sm text-ink/75 leading-relaxed max-w-md mx-auto mb-8 font-sans">
              We are crafting a premier diplomatic experience where history and modern global governance meet.
              Subscribe below to receive an exclusive invitation and event schedules the moment we go live.
            </p>

            {/* Email subscription form */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <div className="relative flex-grow">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your diplomatic dispatch (email)..."
                      required
                      className="w-full bg-paper/60 border border-warm-tan/20 focus:border-warm-tan px-11 py-3 text-sm text-ink focus:outline-none placeholder:text-ink/30 transition-all font-sans"
                    />
                  </div>
                  <Button type="submit" variant="primary" className="whitespace-nowrap">
                    Request Dispatch
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center gap-3 py-2 text-warm-tan"
                >
                  <CheckCircle className="w-8 h-8 text-warm-tan" />
                  <span className="text-xs uppercase tracking-widest font-semibold font-sans">
                    You have been enlisted.
                  </span>
                  <p className="text-xs text-ink/65 font-sans">
                    A diplomatic dispatch will be sent to your inbox when gates open.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Footer info / contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center text-[10px] tracking-widest text-ink/40 uppercase font-sans font-medium"
        >
          © {new Date().getFullYear()} UEMCON. All Rights Reserved.
        </motion.div>
      </div>
    </div>
  );
}
