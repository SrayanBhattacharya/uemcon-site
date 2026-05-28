import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean;
}

export default function Container({ children, className, clean = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-6 md:px-12 lg:px-16",
        !clean && "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
