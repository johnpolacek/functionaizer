"use client";
import React, { useState, useEffect } from 'react';
import FadeIn from "./FadeIn";

const FadeScaleIn = ({
  children,
  delay = 0,
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

  const [scale, setScale] = useState(0.5); // Starts from 50% scale

  useEffect(() => {
    const timeout1 = setTimeout(() => setScale(1.05), delay); // Scale to 15%
    const timeout2 = setTimeout(() => setScale(1), delay + 300); // Then scale back to 100%

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [delay]);

  return (
    <FadeIn
      className={className}
      animateFromClassname={animateFromClassname}
      animateToClassname={animateToClassname}
      delay={delay}
      style={{ transform: `scale(${scale})`, transition: 'transform 300ms ease-in-out' }}
    >
      {children}
    </FadeIn>
  );
};

export default FadeScaleIn;
