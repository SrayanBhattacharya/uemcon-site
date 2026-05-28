import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  serif?: boolean;
}

export default function Heading({
  level = 2,
  children,
  className,
  serif = true,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const;
  
  const styles = {
    1: "text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight uppercase leading-tight",
    2: "text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide uppercase leading-snug",
    3: "text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide leading-snug",
    4: "text-xl sm:text-2xl lg:text-3xl font-medium tracking-wide leading-snug",
    5: "text-lg sm:text-xl font-medium tracking-wider uppercase leading-snug",
    6: "text-xs sm:text-sm font-semibold tracking-widest uppercase leading-snug text-warm-tan",
  };

  return (
    <Tag
      className={cn(
        serif ? "font-serif text-primary-blue" : "font-sans text-ink",
        styles[level],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
