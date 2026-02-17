"use client";

import { motion, type TargetAndTransition } from "motion/react";
import { type ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  delay?: number;
  duration?: number;
  margin?: string;
}

export function ScrollAnimation({
  children,
  className,
  initial = { opacity: 0, y: 30 },
  animate = { opacity: 1, y: 0 },
  delay = 0,
  duration = 0.8,
  margin = "-100px",
}: ScrollAnimationProps) {
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
