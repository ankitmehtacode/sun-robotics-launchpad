import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export interface DecryptedTextProps {
  /** Text to decrypt / display */
  text: string;
  /** Speed of character cycling in ms (default 50) */
  speed?: number;
  /** Number of scrambles per character before resolving (default 15) */
  maxIterations?: number;
  /** Whether characters resolve sequentially from left to right (default true) */
  sequential?: boolean;
  /** Reveal order when sequential (default 'start') */
  revealDirection?: "start" | "end" | "center";
  /** If true, only shuffles characters present in the target string */
  useOriginalCharsOnly?: boolean;
  /** Custom character pool for scrambling */
  characters?: string;
  /** Trigger animation on viewport entry, hover, or both (default 'view') */
  animateOn?: "view" | "hover" | "both";
  /** Class name for the resolved text */
  className?: string;
  /** Class name for the wrapper element */
  parentClassName?: string;
  /** Class name for characters while they are actively scrambling */
  encryptedClassName?: string;
}

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 45,
  maxIterations = 16,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARS,
  animateOn = "view",
  className = "",
  parentClassName = "",
  encryptedClassName = "text-primary opacity-80",
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const [displayText, setDisplayText] = useState<string>(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
    : characters.split("");

  const getRandomChar = () => {
    return availableChars[Math.floor(Math.random() * availableChars.length)] || " ";
  };

  const getOrderedIndices = (length: number, direction: "start" | "end" | "center") => {
    const indices = Array.from({ length }, (_, i) => i);
    if (direction === "end") return indices.reverse();
    if (direction === "center") {
      const mid = Math.floor(length / 2);
      const result: number[] = [mid];
      let left = mid - 1;
      let right = mid + 1;
      while (left >= 0 || right < length) {
        if (left >= 0) result.push(left--);
        if (right < length) result.push(right++);
      }
      return result;
    }
    return indices;
  };

  const triggerAnimation = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    const length = text.length;
    const order = getOrderedIndices(length, revealDirection);
    let iteration = 0;
    const resolved = new Set<number>();

    const interval = setInterval(() => {
      iteration++;

      if (sequential) {
        // Calculate how many characters are resolved
        const charsToResolve = Math.floor((iteration / maxIterations) * length);
        for (let i = 0; i < charsToResolve && i < length; i++) {
          resolved.add(order[i]);
        }
      } else {
        if (iteration >= maxIterations) {
          for (let i = 0; i < length; i++) resolved.add(i);
        }
      }

      setRevealedIndices(new Set(resolved));

      setDisplayText(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (resolved.has(idx)) return char;
            return getRandomChar();
          })
          .join("")
      );

      if (resolved.size >= length || iteration >= maxIterations + length) {
        clearInterval(interval);
        setDisplayText(text);
        setRevealedIndices(new Set(Array.from({ length }, (_, i) => i)));
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (isInView && (animateOn === "view" || animateOn === "both")) {
      triggerAnimation();
    }
  }, [isInView]);

  const handleMouseEnter = () => {
    if (animateOn === "hover" || animateOn === "both") {
      triggerAnimation();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block ${parentClassName}`}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={className}>
        {displayText.split("").map((char, index) => {
          const isResolved = revealedIndices.has(index);
          return (
            <span
              key={index}
              className={`inline-block transition-colors duration-100 ${
                isResolved ? "" : encryptedClassName
              }`}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default DecryptedText;
