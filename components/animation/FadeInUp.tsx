"use client";
import React from "react";
import FadeIn from "./FadeIn";
import { cn } from "@/lib/utils";

const FadeInUp = ({
  children,
  delay,
  className,
  animateToClassname,
  animateFromClassname,
}: {
  children: JSX.Element | JSX.Element[] | string;
  delay?: number;
  className?: string;
  animateFromClassname?: string;
  animateToClassname?: string;
}) => {
  return (
    <FadeIn
      className={className}
      animateFromClassname={cn("translate-y-10", animateFromClassname)}
      animateToClassname={cn("translate-y-0", animateToClassname)}
      delay={delay}
    >
      {children}
    </FadeIn>
  );
};

export default FadeInUp;
