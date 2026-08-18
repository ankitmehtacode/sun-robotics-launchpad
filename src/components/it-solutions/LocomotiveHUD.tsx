import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTION_NODES } from "@/hooks/useLocomotiveScroll";

interface LocomotiveHUDProps {
  velocity: number;
  speed: number;
  progress: number;
  skew: number;
  activeNode: string;
  nodeIndex: number;
  direction: "down" | "up" | "idle";
  onJumpToNode: (id: string) => void;
}

export const LocomotiveHUD = ({
  speed,
  progress,
  nodeIndex,
  onJumpToNode,
}: LocomotiveHUDProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      aria-label="Navigation Telemetry"
      className="fixed bottom-6 right-6 z-50 select-none font-mono text-[11px] hidden lg:block"
    >
      <div className="relative flex items-center">
        {/* Main Minimalist Pill */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0a0c10]/80 border border-white/10 text-white/70 hover:text-white hover:border-primary/40 backdrop-blur-md transition-all shadow-lg cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Subtle Indicator */}
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />

          {/* Section Indicator */}
          <span className="text-white/90 font-medium">
            {String(nodeIndex + 1).padStart(2, "0")} / {String(SECTION_NODES.length).padStart(2, "0")}
          </span>

          <span className="text-white/20">·</span>

          {/* Progress */}
          <span className="text-white/50">
            {Math.round(progress * 100)}%
          </span>

          {/* Progress Circular Arc */}
          <svg className="w-3.5 h-3.5 -rotate-90 ml-1" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="9"
              className="text-white/10 stroke-current"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              className="text-primary stroke-current"
              strokeWidth="2"
              strokeDasharray={56.5}
              strokeDashoffset={56.5 - 56.5 * progress}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.button>

        {/* Section Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-11 right-0 w-56 p-2 rounded-xl bg-[#090b0f]/95 border border-white/15 backdrop-blur-xl shadow-2xl space-y-0.5"
            >
              <div className="px-2.5 py-1 text-[9px] text-white/40 uppercase font-mono tracking-wider border-b border-white/10 mb-1">
                SECTIONS
              </div>
              {SECTION_NODES.map((node, i) => {
                const isActive = i === nodeIndex;
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      onJumpToNode(node.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-[10px] flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-primary text-black font-semibold"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{node.label}</span>
                    <span className={isActive ? "text-black" : "text-white/30"}>
                      0{i + 1}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};
