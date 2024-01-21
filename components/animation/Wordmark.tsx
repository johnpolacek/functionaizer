import React from 'react';
import FadeIn from './FadeIn';

const Wordmark = () => (
  <h1 aria-label="Functionaizer" className="text-3xl sm:text-6xl text-center mb-2 font-light font-mono">
    <FadeIn as="span" className="duration-1000" delay={1500} aria-hidden="true">F</FadeIn>
    <FadeIn as="span" className="duration-700" delay={2300} aria-hidden="true">u</FadeIn>
    <FadeIn as="span" className="duration-1000" delay={1600} aria-hidden="true">n</FadeIn>
    <FadeIn as="span" className="duration-700" delay={2400} aria-hidden="true">c</FadeIn>
    <FadeIn as="span" className="duration-700" delay={2200} aria-hidden="true">t</FadeIn>
    <FadeIn as="span" className="duration-700" delay={2100} aria-hidden="true">i</FadeIn>
    <FadeIn as="span" className="duration-700" delay={2000} aria-hidden="true">o</FadeIn>
    <FadeIn as="span" className="duration-700" delay={1800} aria-hidden="true">n</FadeIn>
    <FadeIn animateFromClassname="text-fuchsia-400 font-extrathin" animateToClassname="text-fuchsia-700 font-normal opacity-70" as="span" className="duration-1000 pl-1" delay={2500} aria-hidden="true">a</FadeIn>
    <FadeIn animateFromClassname="text-fuchsia-400 font-extrathin" animateToClassname="text-fuchsia-700 font-normal opacity-70" as="span" className="duration-1000" delay={2800} aria-hidden="true">i</FadeIn>
    <FadeIn as="span" className="duration-1000" delay={2300} aria-hidden="true">z</FadeIn>
    <FadeIn as="span" className="duration-1000" delay={2500} aria-hidden="true">e</FadeIn>
    <FadeIn as="span" className="duration-700" delay={2000} aria-hidden="true">r</FadeIn>
  </h1>
);

export default Wordmark;
