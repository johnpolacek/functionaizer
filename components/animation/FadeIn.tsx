"use client";
import React from "react";
import AnimateIn from "./AnimateIn";
import { cn } from "@/lib/utils";

const FadeIn = ({
  children,
  delay,
  className,
  animateToClassname,
  animateFromClassname,
  style,
  as,
}: {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  animateFromClassname?: string;
  animateToClassname?: string;
  style?: React.CSSProperties;
  as?: keyof React.ReactHTML;
}) => {
  return (
    <AnimateIn
      className={className}
      animateFromClassname={cn("opacity-0", animateFromClassname)}
      animateToClassname={cn("opacity-100", animateToClassname)}
      delay={delay}
      style={style}
      as={as}
    >
      {children}
    </AnimateIn>
  );
};

export default FadeIn;
