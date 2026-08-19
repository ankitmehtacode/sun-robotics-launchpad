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
  /** Enable dynamic gradient light sweep across masked text */
  gradientSweep?: boolean;
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
  stagger = 0.12,
  duration = 0.85,
  interactive = true,
  gradientSweep = true,
  className = "",
  subheadClassName = "",
  accentClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

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

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative text-center select-none"
    >
      <Component className={`relative z-10 flex flex-col items-center justify-center ${className}`}>
        {lines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className="overflow-hidden py-1 px-2 -my-1 inline-flex items-center justify-center flex-wrap"
          >
            <motion.span
              initial={{ y: "120%", opacity: 0, rotateX: 25, filter: "blur(6px)" }}
              animate={
                isInView
                  ? {
                      y: "0%",
                      opacity: 1,
                      rotateX: 0,
                      filter: "blur(0px)",
                      x: mouseOffset.x * ((lineIndex + 1) * 0.4),
                    }
                  : {}
              }
              transition={{
                duration,
                delay: delay + lineIndex * stagger,
                ease: [0.16, 1, 0.3, 1],
                x: { duration: 0.3, ease: "easeOut" },
              }}
              className={`inline-block transform-gpu will-change-transform leading-[1.08] ${
                gradientSweep
                  ? "bg-gradient-to-r from-white via-[#fcd34d] via-primary to-white bg-[length:200%_auto] animate-text-gradient bg-clip-text text-transparent"
                  : ""
              }`}
            >
              {line}
            </motion.span>
          </div>
        ))}

        {accentText && (
          <div className="overflow-hidden py-1 px-2 -my-1 inline-flex items-center justify-center">
            <motion.span
              initial={{ y: "120%", opacity: 0, rotateX: 25, filter: "blur(6px)" }}
              animate={
                isInView
                  ? {
                      y: "0%",
                      opacity: 1,
                      rotateX: 0,
                      filter: "blur(0px)",
                      x: mouseOffset.x * 0.8,
                    }
                  : {}
              }
              transition={{
                duration,
                delay: delay + lines.length * stagger,
                ease: [0.16, 1, 0.3, 1],
                x: { duration: 0.3, ease: "easeOut" },
              }}
              className={`inline-block transform-gpu will-change-transform leading-[1.08] ${accentClassName}`}
            >
              {accentText}
            </motion.span>
          </div>
        )}
      </Component>

      {subhead && (
        <div className="overflow-hidden pt-4 max-w-2xl mx-auto">
          <motion.p
            initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
            animate={isInView ? { y: "0%", opacity: 1, filter: "blur(0px)" } : {}}
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
