"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  animate?: boolean;
  delay?: number;
}

export default function Section({
  children,
  className,
  animate = true,
  delay = 0,
  ...props
}: SectionProps) {
  const styles = cn("py-16 md:py-24 relative", className);

  if (animate) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const }}
        className={styles}
        {...(props as any)}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <section className={styles} {...props}>
      {children}
    </section>
  );
}
