import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface ScrollExpandProps {
  children: React.ReactNode;
  /** Starting scale before scroll expansion (default 0.88) */
  initialScale?: number;
  /** Starting border radius in px (default 40) */
  initialRadius?: number;
  /** Final border radius in px (default 24) */
  finalRadius?: number;
  /** Starting width percentage (default '84%') */
  initialWidth?: string;
  /** Container wrapper class */
  className?: string;
  /** Inner content card class */
  cardClassName?: string;
}

export const ScrollExpand: React.FC<ScrollExpandProps> = ({
  children,
  initialScale = 0.88,
  initialRadius = 40,
  finalRadius = 24,
  initialWidth = "84%",
  className = "",
  cardClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 1], [initialScale, 1]);
  const width = useTransform(smoothProgress, [0, 1], [initialWidth, "100%"]);
  const borderRadius = useTransform(
    smoothProgress,
    [0, 1],
    [`${initialRadius}px`, `${finalRadius}px`]
  );
  const opacity = useTransform(smoothProgress, [0, 0.4, 1], [0.4, 0.85, 1]);
  const glowOpacity = useTransform(smoothProgress, [0, 1], [0.15, 0.8]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center overflow-hidden py-6 ${className}`}
    >
      <motion.div
        style={{
          scale,
          width,
          borderRadius,
          opacity,
        }}
        className={`relative overflow-hidden mx-auto transition-shadow duration-500 will-change-transform ${cardClassName}`}
      >
        {/* Dynamic scroll-driven ambient back-glow */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/30 to-amber-600/20 rounded-[inherit] blur-2xl pointer-events-none -z-10"
        />

        {children}
      </motion.div>
    </div>
  );
};

export default ScrollExpand;
