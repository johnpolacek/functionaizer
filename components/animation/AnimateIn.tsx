"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const AnimateIn = ({
  children,
  delay,
  className = "",
  animateFromClassname,
  animateToClassname,
  style,
  as = 'div',
}: {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  animateFromClassname?: string;
  animateToClassname?: string;
  style?: React.CSSProperties;
  as?: keyof React.ReactHTML;
}) => {
  const [animate, setAnimate] = useState(animateFromClassname);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(animateToClassname);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, animateToClassname]);

  return React.createElement(
    as,
    {
      className: cn("transition-all ease-in-out duration-500", className, animate),
      style: style,
    },
    children
  );
};

export default AnimateIn;
