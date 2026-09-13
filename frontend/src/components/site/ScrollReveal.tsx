"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  yOffset = 10,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0.85, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.85, y: yOffset }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 32,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

