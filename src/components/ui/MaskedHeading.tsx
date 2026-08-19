import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export interface MaskedHeadingProps {
  /** Main heading lines or single string/node with line breaks */
  heading: React.ReactNode | React.ReactNode[];
  /** Secondary highlighted accent text */
  accentText?: React.ReactNode;
  /** Subheading or descriptive text */
  subhead?: string;
  /** HTML heading tag to render (default 'h1') */
  as?: "h1" | "h2" | "h3" | "h4" | "div" | "span";
  /** Delay before animation begins (in seconds) */
  delay?: number;
  /** Stagger time between lines/words */
  stagger?: number;
  /** Duration of the unmask animation */
  duration?: number;
  /** Enable mouse parallax mask drift */
  interactive?: boolean;
  /** Force animation state instead of inView */
  forceAnimate?: boolean;
  /** Enable dynamic gradient light sweep across masked text */
  gradientSweep?: boolean;
  /** Mask color style */
  variant?: "amber-gradient" | "white-gold" | "monochrome";
  /** Custom heading class names */
  className?: string;
  /** Custom subhead class names */
  subheadClassName?: string;
  /** Accent text class names */
  accentClassName?: string;
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  heading,
  accentText,
  subhead,
  as: Component = "h1",
  delay = 0.1,
  stagger = 0.14,
  duration = 0.85,
  interactive = true,
  forceAnimate,
  gradientSweep = true,
  variant = "white-gold",
  className = "",
  subheadClassName = "",
  accentClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const shouldAnimate = forceAnimate !== undefined ? forceAnimate : isInView;

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 15, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const lines = Array.isArray(heading)
    ? heading
    : typeof heading === "string"
    ? heading.split("\n").filter((l) => l.trim().length > 0)
    : [heading];

  const variantClasses = {
    "white-gold": "bg-gradient-to-r from-[#FFFFFF] via-[#FFF5E6] via-[#F9931F] to-[#E8E6E1] bg-[length:200%_auto] bg-clip-text text-transparent",
    "amber-gradient": "bg-gradient-to-r from-[#FBBF24] via-[#F9931F] via-[#EA580C] to-[#F59E0B] bg-[length:200%_auto] bg-clip-text text-transparent",
    "monochrome": "text-[#E8E6E1]",
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative text-left select-none w-full"
    >
      <Component className={`relative z-10 flex flex-col ${className}`}>
        {lines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className="overflow-hidden py-1 -my-1 inline-flex items-center"
          >
            <motion.span
              initial={{ y: "125%", opacity: 0, rotateX: 30, filter: "blur(8px)" }}
              animate={
                shouldAnimate
                  ? {
                      y: "0%",
                      opacity: 1,
                      rotateX: 0,
                      filter: "blur(0px)",
                      x: mouseOffset.x * ((lineIndex + 1) * 0.4),
                    }
                  : { y: "125%", opacity: 0, rotateX: 30, filter: "blur(8px)" }
              }
              transition={{
                duration,
                delay: delay + lineIndex * stagger,
                ease: [0.16, 1, 0.3, 1],
                x: { duration: 0.3, ease: "easeOut" },
              }}
              className={`inline-block transform-gpu will-change-transform leading-[1.05] ${
                gradientSweep ? variantClasses[variant] : "text-[#E8E6E1]"
              }`}
            >
              {line}
            </motion.span>
          </div>
        ))}

        {accentText && (
          <div className="overflow-hidden py-1 -my-1 inline-flex items-center">
            <motion.span
              initial={{ y: "125%", opacity: 0, rotateX: 30, filter: "blur(8px)" }}
              animate={
                shouldAnimate
                  ? {
                      y: "0%",
                      opacity: 1,
                      rotateX: 0,
                      filter: "blur(0px)",
                      x: mouseOffset.x * 0.8,
                    }
                  : { y: "125%", opacity: 0, rotateX: 30, filter: "blur(8px)" }
              }
              transition={{
                duration,
                delay: delay + lines.length * stagger,
                ease: [0.16, 1, 0.3, 1],
                x: { duration: 0.3, ease: "easeOut" },
              }}
              className={`inline-block transform-gpu will-change-transform leading-[1.05] ${accentClassName}`}
            >
              {accentText}
            </motion.span>
          </div>
        )}
      </Component>

      {subhead && (
        <div className="overflow-hidden pt-4">
          <motion.p
            initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
            animate={
              shouldAnimate
                ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                : { y: "100%", opacity: 0, filter: "blur(4px)" }
            }
            transition={{
              duration: 0.7,
              delay: delay + (lines.length + (accentText ? 1 : 0)) * stagger + 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`font-sans leading-relaxed ${subheadClassName}`}
          >
            {subhead}
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default MaskedHeading;
