import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ShieldAlert, ArrowRight, Check, X } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

type ArchitectureMode = "sun-robotics" | "legacy";

export const InteractiveArchitectureConsole = () => {
  const [mode, setMode] = useState<ArchitectureMode>("sun-robotics");
  const [isSimulatingBurst, setIsSimulatingBurst] = useState(false);

  const handleSimulate = () => {
    setIsSimulatingBurst(true);
    setTimeout(() => setIsSimulatingBurst(false), 1600);
  };

  return (
    <section id="node-benchmarks" className="py-28 relative overflow-hidden bg-[#07080c]">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-primary text-[10px] font-mono tracking-widest uppercase mb-4">
            <span>[ 04 ] WHY MODERN ARCHITECTURE MATTERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white">
            How We Build <span className="gradient-text">Better Software</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-3">
            See how modern cloud architecture delivers faster speeds, better reliability, and stronger security than outdated systems.
          </p>

          {/* Mode Switcher */}
          <div className="flex items-center justify-center mt-8">
            <div className="p-1 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-1">
              <button
                onClick={() => setMode("sun-robotics")}
                className={`px-5 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                  mode === "sun-robotics"
                    ? "bg-primary text-black font-bold shadow-[0_0_16px_hsl(32,95%,55%,0.4)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                MODERN CLOUD SYSTEM
              </button>
              <button
                onClick={() => setMode("legacy")}
                className={`px-5 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                  mode === "legacy"
                    ? "bg-white/15 text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                OUTDATED SETUP
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Schematic Stage */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left: Interactive Diagram */}
          <div className="lg:col-span-7">
            <BorderGlow
              className="w-full h-full rounded-2xl overflow-hidden"
              borderRadius={20}
              glowColor={mode === "sun-robotics" ? "32 95 55" : "0 0 0"}
              colors={
                mode === "sun-robotics"
                  ? ["#e8930c", "#f59e0b", "#d97706"]
                  : ["#4b5563", "#374151", "#1f2937"]
              }
              glowIntensity={0.8}
            >
              <div className="p-8 h-full bg-[#090b10] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/50 border-b border-white/10 pb-3 mb-6">
                    <span>
                      SYSTEM FLOW // {mode === "sun-robotics" ? "DISTRIBUTED_CLOUD_NETWORK" : "SINGLE_SERVER"}
                    </span>
                    <button
                      onClick={handleSimulate}
                      disabled={isSimulatingBurst}
                      className="px-3 py-1 rounded bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 transition-all cursor-pointer font-bold"
                    >
                      {isSimulatingBurst ? "SENDING DATA..." : "TEST DATA FLOW"}
                    </button>
                  </div>

                  {/* SVG Topology Visualizer */}
                  <div className="relative h-64 w-full flex items-center justify-center bg-black/40 rounded-xl border border-white/5 p-4">
                    {mode === "sun-robotics" ? (
                      <svg className="w-full h-full" viewBox="0 0 500 200">
                        {/* Mesh Nodes & Paths */}
                        <g opacity={isSimulatingBurst ? "1" : "0.7"}>
                          <line x1="80" y1="100" x2="250" y2="40" stroke="hsl(32, 95%, 55%)" strokeWidth="2" strokeDasharray={isSimulatingBurst ? "4 2" : "none"} />
                          <line x1="80" y1="100" x2="250" y2="160" stroke="hsl(32, 95%, 55%)" strokeWidth="2" strokeDasharray={isSimulatingBurst ? "4 2" : "none"} />
                          <line x1="250" y1="40" x2="420" y2="100" stroke="hsl(32, 95%, 55%)" strokeWidth="2" />
                          <line x1="250" y1="160" x2="420" y2="100" stroke="hsl(32, 95%, 55%)" strokeWidth="2" />
                          <line x1="250" y1="40" x2="250" y2="160" stroke="hsl(32, 95%, 55%)" strokeWidth="1" opacity="0.4" />
                        </g>

                        {/* Node Labels */}
                        <circle cx="80" cy="100" r="18" fill="#0c0e14" stroke="hsl(32, 95%, 55%)" strokeWidth="2" />
                        <text x="80" y="104" fill="#fff" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Users</text>

                        <circle cx="250" cy="40" r="20" fill="#0c0e14" stroke="hsl(32, 95%, 55%)" strokeWidth="2" />
                        <text x="250" y="44" fill="#fff" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Server A</text>

                        <circle cx="250" cy="160" r="20" fill="#0c0e14" stroke="hsl(32, 95%, 55%)" strokeWidth="2" />
                        <text x="250" y="164" fill="#fff" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Server B</text>

                        <circle cx="420" cy="100" r="18" fill="#0c0e14" stroke="hsl(32, 95%, 55%)" strokeWidth="2" />
                        <text x="420" y="104" fill="#fff" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Database</text>

                        {/* Burst Animation Indicator */}
                        {isSimulatingBurst && (
                          <circle cx="250" cy="100" r="30" fill="none" stroke="hsl(32, 95%, 55%)" strokeWidth="1.5" className="animate-ping" />
                        )}
                      </svg>
                    ) : (
                      <svg className="w-full h-full" viewBox="0 0 500 200">
                        {/* Single Monolith Chokepoint */}
                        <line x1="80" y1="100" x2="250" y2="100" stroke="rgba(239,68,68,0.5)" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="250" y1="100" x2="420" y2="100" stroke="rgba(239,68,68,0.5)" strokeWidth="2" strokeDasharray="3 3" />

                        <circle cx="80" cy="100" r="18" fill="#0c0e14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                        <text x="80" y="104" fill="#aaa" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Users</text>

                        <rect x="210" y="70" width="80" height="60" rx="8" fill="#1f2937" stroke="rgba(239,68,68,0.8)" strokeWidth="2" />
                        <text x="250" y="98" fill="#fff" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Old Server</text>
                        <text x="250" y="112" fill="#ef4444" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Slow Queue</text>

                        <circle cx="420" cy="100" r="18" fill="#0c0e14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                        <text x="420" y="104" fill="#aaa" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Database</text>
                      </svg>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-white/50 pt-4 border-t border-white/10 mt-6">
                  <span>
                    {mode === "sun-robotics"
                      ? "ADVANTAGE: Automatic Load Balancing & Redundancy"
                      : "DISADVANTAGE: Single Point of Failure"}
                  </span>
                  <span className="text-primary">
                    {mode === "sun-robotics" ? "OPTIMAL" : "AT RISK"}
                  </span>
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Right: Plain-English Comparison */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-[#090b10] border border-white/10">
            <div>
              <div className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest mb-2">
                // SYSTEM COMPARISON
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                {mode === "sun-robotics"
                  ? "Modern Cloud Architecture"
                  : "Traditional Monolith Setup"}
              </h3>

              <div className="space-y-4 font-mono text-xs">
                {[
                  {
                    metric: "SPEED & PERFORMANCE",
                    modern: "Instant page loads and snappy app responses",
                    legacy: "Slow loading times and laggy screens",
                  },
                  {
                    metric: "SYSTEM RELIABILITY",
                    modern: "Self-healing cloud servers that stay online 24/7",
                    legacy: "Frequent unexpected crashes and downtime",
                  },
                  {
                    metric: "DATA PROTECTION",
                    modern: "Automated daily backups with bank-grade encryption",
                    legacy: "Vulnerable unpatched storage with data risks",
                  },
                  {
                    metric: "UPDATES & MAINTENANCE",
                    modern: "Seamless updates with zero website downtime",
                    legacy: "Lengthy maintenance windows and downtime",
                  },
                ].map((row) => (
                  <div key={row.metric} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 font-sans">
                    <div className="text-[10px] font-mono text-white/40 mb-1">{row.metric}</div>
                    <div className="flex items-center gap-2">
                      {mode === "sun-robotics" ? (
                        <>
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-white font-medium text-xs">{row.modern}</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="text-white/60 text-xs">{row.legacy}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-white/40">READY TO UPGRADE?</span>
              <a href="/contact" className="text-primary hover:text-amber-400 flex items-center gap-1 font-bold">
                TALK TO OUR TEAM <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
