"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  href?: string;
}

export default function Button({
  variant = "primary",
  children,
  className,
  href,
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3.5 font-sans text-[11px] font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-warm-tan disabled:opacity-50 disabled:cursor-not-allowed border rounded-none";

  const variants = {
    primary:
      "bg-primary-blue text-paper border-primary-blue hover:bg-transparent hover:text-primary-blue shadow-sm hover:shadow-md",
    secondary:
      "bg-light-beige text-primary-blue border-warm-tan/40 hover:bg-warm-tan/20 hover:border-warm-tan hover:text-ink shadow-sm",
    outline:
      "bg-transparent text-primary-blue border-primary-blue/30 hover:border-primary-blue hover:bg-primary-blue/[0.03]",
  };

  const Component = href ? motion.a : motion.button;
  
  // Create props specifically filtered for motion element
  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
    className: cn(baseStyles, variants[variant], className),
  };

  if (href) {
    return (
      <Component href={href} {...motionProps}>
        {children}
      </Component>
    );
  }

  return (
    <Component type={type} {...motionProps} {...(props as any)}>
      {children}
    </Component>
  );
}
