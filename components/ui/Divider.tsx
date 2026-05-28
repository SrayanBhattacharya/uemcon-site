import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
  centered?: boolean;
}

export default function Divider({ accent = false, centered = true, className, ...props }: DividerProps) {
  return (
    <div
      className={cn(
        "flex items-center my-8 w-full",
        centered ? "justify-center" : "justify-start",
        className
      )}
      {...props}
    >
      <div className="h-[1px] bg-warm-tan/40 flex-grow max-w-[200px]" />
      {accent && (
        <span className="mx-4 text-warm-tan text-[8px] tracking-widest select-none">
          ✦
        </span>
      )}
      {accent && <div className="h-[1px] bg-warm-tan/40 flex-grow max-w-[200px]" />}
    </div>
  );
}
