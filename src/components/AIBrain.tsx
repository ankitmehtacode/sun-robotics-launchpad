import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { LucideIcon, Radar, Cpu, Network, Zap } from "lucide-react";

interface PipelineStage {
  key: string;
  icon: LucideIcon;
  label: string;
  metricLabel: string;
  base: number;
  jitter: number;
  unit: string;
  decimals: number;
}

const pipeline: PipelineStage[] = [
  { key: "sensor", icon: Radar, label: "Sensor Array", metricLabel: "channels", base: 42, jitter: 0, unit: "", decimals: 0 },
  { key: "edge", icon: Cpu, label: "Edge Inference", metricLabel: "latency", base: 3.8, jitter: 0.6, unit: "ms", decimals: 1 },
  { key: "model", icon: Network, label: "Predictive Model", metricLabel: "confidence", base: 98.4, jitter: 0.4, unit: "%", decimals: 1 },
  { key: "actuation", icon: Zap, label: "Actuation", metricLabel: "response", base: 8, jitter: 1.5, unit: "ms", decimals: 1 },
];

function useLiveMetric(base: number, jitter: number) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    if (jitter === 0) return;
    const id = setInterval(
      () => setValue(base + (Math.random() - 0.5) * jitter * 2),
      1200 + Math.random() * 800
    );
    return () => clearInterval(id);
  }, [base, jitter]);
  return value;
}

function PipelineNode({ stage, index, isInView }: { stage: PipelineStage; index: number; isInView: boolean }) {
  const value = useLiveMetric(stage.base, stage.jitter);
  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative glass-card p-5 rounded-xl group hover:border-primary/40 transition-colors"
    >
      <span className="absolute top-4 right-4 font-mono text-[10px] text-muted-foreground/60">
        0{index + 1}
      </span>
      <Icon className="w-5 h-5 text-primary mb-4" strokeWidth={1.5} />
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
        {stage.label}
      </div>
      <div className="font-mono text-2xl font-medium text-foreground tabular-nums">
        {value.toFixed(stage.decimals)}
        <span className="text-sm text-primary">{stage.unit}</span>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 mt-1">
        {stage.metricLabel}
      </div>
    </motion.div>
  );
}

export const AIBrain = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai-brain" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              System Architecture
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              From Signal to <span className="gradient-text">Action</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Every SunBot runs a closed inference loop on-device — sensor data becomes a
              prediction, a prediction becomes a decision, in single-digit milliseconds.
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Connector track */}
          <div className="hidden md:block absolute top-[4.5rem] left-0 right-0 h-px bg-border overflow-hidden">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 1 }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
            {pipeline.map((stage, index) => (
              <PipelineNode key={stage.key} stage={stage} index={index} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
