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
    "bg-light-beige/45 border border-warm-tan/20 overflow-hidden relative rounded-none shadow-md",
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
