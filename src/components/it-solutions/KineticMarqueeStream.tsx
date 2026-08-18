import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface KineticMarqueeStreamProps {
  velocity?: number;
}

const STREAM_ROW_1 = [
  "CUSTOM WEB PLATFORMS",
  "MOBILE APP DEVELOPMENT",
  "SMART AI DASHBOARDS",
  "CONNECTED IOT HARDWARE",
  "24/7 SECURE CLOUD HOSTING",
  "ENTERPRISE IT ARCHITECTURE",
];

const STREAM_ROW_2 = [
  "BUILT FOR SCALE",
  "SUB-SECOND PERFORMANCE",
  "BANK-GRADE SECURITY",
  "SEAMLESS USER EXPERIENCE",
  "DISTRIBUTED CLOUD EDGE",
  "DETERMINISTIC SYSTEMS",
];

export const KineticMarqueeStream = ({ velocity = 0 }: KineticMarqueeStreamProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Very subtle, buttery scroll parallax boost (calm & non-jerky)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollOffset1 = useTransform(smoothProgress, [0, 1], ["0%", "-8%"]);
  const scrollOffset2 = useTransform(smoothProgress, [0, 1], ["-8%", "0%"]);

  return (
    <div
      ref={containerRef}
      className="py-8 sm:py-12 relative overflow-hidden bg-[#07080b] border-y border-white/10 select-none group"
    >
      {/* Soft gradient edge fade masks */}
      <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-[#07080b] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-[#07080b] to-transparent z-10 pointer-events-none" />

      {/* Background subtle neon laser line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 pointer-events-none" />

      {/* Row 1 (Smooth continuous crawl at calm 42s loop) */}
      <motion.div style={{ x: scrollOffset1 }} className="flex overflow-hidden whitespace-nowrap mb-3 sm:mb-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 42,
            repeat: Infinity,
          }}
          className="flex items-center gap-6 sm:gap-10 text-lg sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-white/80 shrink-0"
        >
          {Array.from({ length: 4 }).map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex items-center gap-6 sm:gap-10 shrink-0">
              {STREAM_ROW_1.map((item, idx) => (
                <div key={`${repeatIndex}-${idx}`} className="flex items-center gap-4 sm:gap-8">
                  <span className="hover:text-primary transition-colors cursor-default">
                    {item}
                  </span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/60 shadow-[0_0_8px_hsl(32,95%,55%)]" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Row 2 (Reverse direction + Outline styling at calm 48s loop) */}
      <motion.div style={{ x: scrollOffset2 }} className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 48,
            repeat: Infinity,
          }}
          className="flex items-center gap-6 sm:gap-10 text-lg sm:text-2xl md:text-3xl font-display font-bold tracking-tight shrink-0"
        >
          {Array.from({ length: 4 }).map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex items-center gap-6 sm:gap-10 shrink-0">
              {STREAM_ROW_2.map((item, idx) => (
                <div key={`${repeatIndex}-${idx}`} className="flex items-center gap-4 sm:gap-8">
                  <span
                    className="text-transparent hover:text-primary transition-colors cursor-default"
                    style={{
                      WebkitTextStroke: "1px rgba(255, 255, 255, 0.35)",
                    }}
                  >
                    {item}
                  </span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-none rotate-45 bg-amber-500/60 shadow-[0_0_8px_hsl(32,95%,55%)]" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KineticMarqueeStream;
