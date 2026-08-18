import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface KineticMarqueeStreamProps {
  velocity?: number;
}

const STREAM_ROW_1 = [
  "CUSTOM WEB PLATFORMS",
  "MOBILE APP DEVELOPMENT",
  "SMART AI DASHBOARDS",
  "CONNECTED IOT HARDWARE",
  "24/7 SECURE CLOUD HOSTING",
  "ENTERPRISE IT CONSULTING",
];

const STREAM_ROW_2 = [
  "BUILT FOR SCALE",
  "HIGH-SPEED PERFORMANCE",
  "BANK-GRADE SECURITY",
  "SEAMLESS USER EXPERIENCE",
  "INDORE CENTRAL DEV HUB",
  "PROACTIVE TECH SUPPORT",
];

export const KineticMarqueeStream = ({ velocity = 0 }: KineticMarqueeStreamProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate dynamic horizontal translation based on scroll progress + scroll velocity
  const xRow1 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const xRow2 = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  return (
    <div
      ref={containerRef}
      className="py-12 relative overflow-hidden bg-[#07080b] border-y border-white/10 select-none"
    >
      {/* Background neon laser line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent -translate-y-1/2 pointer-events-none" />

      {/* Row 1 */}
      <div className="flex overflow-hidden whitespace-nowrap mb-4">
        <motion.div
          style={{ x: xRow1 }}
          className="flex items-center gap-8 text-xl md:text-3xl font-display font-bold tracking-tight text-white/80"
        >
          {Array.from({ length: 4 }).map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex items-center gap-8 shrink-0">
              {STREAM_ROW_1.map((item, idx) => (
                <div key={`${repeatIndex}-${idx}`} className="flex items-center gap-6">
                  <span className="hover:text-primary transition-colors cursor-default">
                    {item}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-primary/60 shadow-[0_0_8px_hsl(32,95%,55%)]" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 (Reverse direction + Outline style) */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          style={{ x: xRow2 }}
          className="flex items-center gap-8 text-xl md:text-3xl font-display font-bold tracking-tight"
        >
          {Array.from({ length: 4 }).map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex items-center gap-8 shrink-0">
              {STREAM_ROW_2.map((item, idx) => (
                <div key={`${repeatIndex}-${idx}`} className="flex items-center gap-6">
                  <span
                    className="text-transparent hover:text-primary transition-colors cursor-default"
                    style={{
                      WebkitTextStroke: "1px rgba(255, 255, 255, 0.35)",
                    }}
                  >
                    {item}
                  </span>
                  <span className="w-2 h-2 rounded-none rotate-45 bg-amber-500/60 shadow-[0_0_8px_hsl(32,95%,55%)]" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
