"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  padded?: boolean;
}

export default function Card({
  children,
  className,
  interactive = true,
  padded = true,
  ...props
}: CardProps) {
  const cardStyles = cn(
    "bg-[#FAF7EE] border border-warm-tan/30 overflow-hidden relative rounded-[2px]",
    padded && "p-6 md:p-8 lg:p-10",
    className
  );

  if (interactive) {
    return (
      <motion.div
        whileHover={{
          y: -4,
          borderColor: "rgba(2, 79, 134, 0.4)",
          boxShadow: "0 12px 24px -10px rgba(2, 79, 134, 0.08)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        className={cardStyles}
        {...(props as any)}
      >
        {/* Subtle decorative inner corner brackets */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-warm-tan/30" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-warm-tan/30" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-warm-tan/30" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-warm-tan/30" />
        
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardStyles} {...props}>
      {children}
    </div>
  );
}
