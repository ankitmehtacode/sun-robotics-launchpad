import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Activity,
  Cpu,
  Database,
  Layers,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
  CheckCircle2,
  Terminal,
  Smartphone,
  Globe,
} from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

interface SolutionItem {
  id: string;
  number: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  specs: { label: string; value: string }[];
  tags: string[];
  image: string;
  statusTag: string;
  metricLabels: [string, string, string];
  metricValues: [string, string, string];
  visual: "mesh" | "neural" | "edge" | "cloud";
  accentColor: string;
  gradient: string;
  badge: string;
}

const solutionPillars: SolutionItem[] = [
  {
    id: "custom-apis",
    number: "01",
    category: "WEB & MOBILE PLATFORMS",
    title: "Custom Websites, Web Apps & APIs",
    headline: "Ultra-fast, responsive platforms engineered for scale",
    description:
      "We design custom web platforms, native iOS/Android applications, and high-throughput APIs that load instantly, work seamlessly across all devices, and scale smoothly as your user base multiplies.",
    specs: [
      { label: "PLATFORMS", value: "iOS · Android · Web" },
      { label: "LATENCY", value: "< 12ms Edge Response" },
      { label: "DATABASE", value: "Distributed & Encrypted" },
      { label: "INTEGRATION", value: "REST · GraphQL · gRPC" },
    ],
    tags: ["React", "Next.js", "Node.js", "Mobile Apps", "Custom APIs", "PostgreSQL"],
    image: "/solutions/web-platform.jpg",
    statusTag: "NEXT.JS 15 // EDGE CLUSTER",
    metricLabels: ["LATENCY", "PERFORMANCE", "ARCHITECTURE"],
    metricValues: ["< 12ms", "100 / 100", "Serverless Edge"],
    visual: "mesh",
    accentColor: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
    badge: "SUB-SECOND RENDER",
  },
  {
    id: "ai-dashboards",
    number: "02",
    category: "SMART ANALYTICS",
    title: "AI Analytics & Live Business Dashboards",
    headline: "Intelligent telemetry & predictive intelligence at your fingertips",
    description:
      "Transform complex data streams into clean, actionable real-time visualizations. Spot behavioral anomalies, track operational metrics, and receive predictive AI alerts before bottlenecks emerge.",
    specs: [
      { label: "TELEMETRY", value: "Real-Time Metric Engine" },
      { label: "ANOMALY DETECTION", value: "99.8% Accuracy Model" },
      { label: "AI INFERENCE", value: "Predictive Forecasting" },
      { label: "EXPORTS", value: "Automated Executive Reports" },
    ],
    tags: ["Live Telemetry", "Neural Models", "Predictive Alerts", "Custom Dashboards"],
    image: "/solutions/ai-analytics.jpg",
    statusTag: "NEURAL TELEMETRY // REAL-TIME INFERENCE",
    metricLabels: ["EVENT STREAM", "ANOMALY CATCH", "ACCURACY"],
    metricValues: ["2.4M / sec", "< 4ms Loop", "99.8% Model"],
    visual: "neural",
    accentColor: "#fb923c",
    gradient: "from-orange-500 to-amber-500",
    badge: "99.8% INFERENCE ACCURACY",
  },
  {
    id: "cloud-iot",
    number: "03",
    category: "HARDWARE & IOT",
    title: "Connected Devices & Hardware IoT",
    headline: "Deterministic remote control and live telemetry from anywhere",
    description:
      "Bridge physical hardware and digital control planes with zero jitter. Stream live video feeds, command actuators, track sensor fleets, and push over-the-air firmware updates with cryptographic safety.",
    specs: [
      { label: "CONNECTIVITY", value: "Low-Latency MQTT & WebSockets" },
      { label: "EDGE CONTROL", value: "Sub-5ms Control Loops" },
      { label: "SECURITY", value: "TLS 1.3 Hardware Identity" },
      { label: "OFFLINE SYNC", value: "Zero-Data-Loss Queues" },
    ],
    tags: ["IoT Fleets", "Edge Gateways", "Live Telemetry", "OTA Firmware"],
    image: "/solutions/hardware-iot.jpg",
    statusTag: "EDGE GATEWAY // TLS 1.3 CRYPTO",
    metricLabels: ["RESPONSE", "PROTOCOL", "FIRMWARE"],
    metricValues: ["Sub-5ms", "MQTT / WS", "Encrypted OTA"],
    visual: "edge",
    accentColor: "#ea580c",
    gradient: "from-orange-600 to-red-600",
    badge: "REAL-TIME SYNC",
  },
  {
    id: "cloud-infrastructure",
    number: "04",
    category: "CLOUD & SECURITY",
    title: "Reliable Cloud Hosting & Data Security",
    headline: "Resilient zero-downtime architecture with 24/7 fortress protection",
    description:
      "Enterprise hosting engineered for 99.99% uptime. Automated multi-region daily snapshots, bank-level AES-256 encryption at rest and in transit, DDoS mitigation, and continuous vulnerability scanning.",
    specs: [
      { label: "UPTIME SLA", value: "99.99% Guaranteed" },
      { label: "RECOVERY", value: "Instant Multi-AZ Failover" },
      { label: "ENCRYPTION", value: "AES-256 · TLS 1.3" },
      { label: "OBSERVABILITY", value: "24/7 Automated Guard" },
    ],
    tags: ["AWS / GCP Cloud", "Auto-Scaling", "DDoS Shield", "Automated Backups"],
    image: "/solutions/cloud-security.jpg",
    statusTag: "ENTERPRISE FORTRESS // MULTI-AZ HA",
    metricLabels: ["UPTIME SLA", "FAILOVER", "SECURITY"],
    metricValues: ["99.99%", "< 30 Sec", "AES-256 / SOC2"],
    visual: "cloud",
    accentColor: "#d97706",
    gradient: "from-amber-600 to-yellow-500",
    badge: "BANK-GRADE ENCRYPTION",
  },
];

// ==========================================
// ==========================================
// Silicon Valley Grade Real-World Showcase Stage
// ==========================================

const RealWorldShowcase = ({ item }: { item: SolutionItem }) => {
  return (
    <div className="relative w-full h-full min-h-[140px] sm:min-h-[220px] lg:min-h-[280px] rounded-xl bg-[#06080d] border border-white/15 overflow-hidden shadow-2xl group flex flex-col justify-between">
      {/* Real-World Image with Parallax Hover and Ambient Scrim */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/40 to-[#06080d]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#06080d_95%)] pointer-events-none" />
      </div>

      {/* Top Glass Telemetry Bar */}
      <div className="relative z-10 p-2 sm:p-3 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-black/60">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[11px] font-mono text-white/90">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/80 inline-block" />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="hidden xs:inline text-white/30">|</span>
          <span className="font-semibold tracking-wider text-primary truncate max-w-[140px] sm:max-w-none">{item.statusTag}</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[7px] sm:text-[9px] font-mono text-emerald-400 font-bold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Center Subtle Interactive Badge */}
      <div className="relative z-10 my-auto px-2.5 sm:px-3 py-1 flex justify-end">
        <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-black/70 backdrop-blur-xl border border-white/15 shadow-xl inline-flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
          <span className="text-[8px] sm:text-[10px] font-mono font-bold text-white tracking-wide">
            {item.badge}
          </span>
        </div>
      </div>

      {/* Bottom Floating Glass HUD Metrics Strip */}
      <div className="relative z-10 p-1.5 sm:p-3 border-t border-white/10 backdrop-blur-xl bg-[#06080d]/90">
        <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
          <div className="p-1 sm:p-1.5 rounded bg-white/[0.04] border border-white/5">
            <span className="block text-[6.5px] sm:text-[8px] font-mono text-white/40 uppercase truncate">
              {item.metricLabels[0]}
            </span>
            <span className="text-[8px] sm:text-[11px] font-mono font-bold text-white truncate block">
              {item.metricValues[0]}
            </span>
          </div>
          <div className="p-1 sm:p-1.5 rounded bg-white/[0.04] border border-white/5">
            <span className="block text-[6.5px] sm:text-[8px] font-mono text-white/40 uppercase truncate">
              {item.metricLabels[1]}
            </span>
            <span className="text-[8px] sm:text-[11px] font-mono font-bold text-emerald-400 truncate block">
              {item.metricValues[1]}
            </span>
          </div>
          <div className="p-1 sm:p-1.5 rounded bg-white/[0.04] border border-white/5">
            <span className="block text-[6.5px] sm:text-[8px] font-mono text-white/40 uppercase truncate">
              {item.metricLabels[2]}
            </span>
            <span className="text-[8px] sm:text-[11px] font-mono font-bold text-primary truncate block">
              {item.metricValues[2]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Main Deck Component with 200-IQ 3D Card Stacking
// ==========================================

export const StackedSolutionsDeck = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Buttery-smooth spring physics for mobile and desktop scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  const total = solutionPillars.length;
  const segments = total - 1;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(latest * total)));
    setActiveCardIndex(idx);
  });

  const jumpToSlide = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const targetProgress = idx === 0 ? 0 : idx / segments;
    const targetScroll = scrollTop + rect.top + targetProgress * (rect.height - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      id="node-pillars"
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${segments * 100 + 100}vh` }}
    >
      {/* Sticky pinned viewport */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden px-3 sm:px-6 md:px-8 py-2 sm:py-4">
        {/* Deep ambient backdrop */}
        <div className="absolute inset-0 bg-[#050608]" />
        <div className="absolute inset-0 hero-gradient pointer-events-none opacity-40" />
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

        {/* Floating Telemetry & Navigation Deck Controller (Pill tabs) */}
        <div className="relative z-40 mb-2 sm:mb-3 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#0b0d14]/90 backdrop-blur-xl border border-white/10 shadow-2xl max-w-full overflow-x-auto no-scrollbar">
          {solutionPillars.map((pillar, idx) => (
            <button
              key={pillar.id}
              onClick={() => jumpToSlide(idx)}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shrink-0 ${
                activeCardIndex === idx
                  ? "bg-primary text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{pillar.number}</span>
              <span className="inline">{pillar.category.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* 3D Perspective Card Stage */}
        <div className="relative w-full max-w-6xl h-[calc(100dvh-100px)] sm:h-[80vh] max-h-[640px] sm:max-h-[660px] perspective-1200">
          {solutionPillars.map((item, index) => (
            <DeckCard
              key={item.id}
              item={item}
              index={index}
              total={total}
              segments={segments}
              scrollYProgress={smoothProgress}
              isActive={activeCardIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3D Cinematic Card with Clean 90° Upright Settle
// ==========================================

interface DeckCardProps {
  item: SolutionItem;
  index: number;
  total: number;
  segments: number;
  scrollYProgress: any;
  isActive: boolean;
}

const DeckCard = ({
  item,
  index,
  total,
  segments,
  scrollYProgress,
  isActive,
}: DeckCardProps) => {
  const segStart = index === 0 ? 0 : (index - 1) / segments;
  const segEnd = index === 0 ? 0 : index / segments;
  const nextSegEnd = index === total - 1 ? 1.0 : (index + 1) / segments;

  // 1. Y Translation
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segEnd, nextSegEnd],
    index === 0
      ? ["0%", "-12px"]
      : ["108%", "0%", index === total - 1 ? "0%" : `-${(total - index) * 12}px`]
  );

  // 2. Scale
  const scale = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segEnd, nextSegEnd],
    index === 0
      ? [1, 0.96]
      : [0.92, 1, index === total - 1 ? 1 : 0.96]
  );

  // 3. 3D Perspective Rotation (Subtle on mobile for smooth GPU performance)
  const rotateX = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segEnd, nextSegEnd],
    index === 0
      ? [0, -4]
      : [10, 0, index === total - 1 ? 0 : -4]
  );

  // 4. Opacity
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segStart + 0.05, segEnd, nextSegEnd],
    index === 0
      ? [1, 0.35]
      : [0, 1, 1, index === total - 1 ? 1 : 0.35]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        rotateX,
        opacity,
        zIndex: index + 10,
        top: `${index * 6}px`,
        transformPerspective: 1200,
      }}
      className="absolute inset-0 w-full h-full will-change-transform preserve-3d"
    >
      <BorderGlow
        className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
        borderRadius={16}
        glowColor="32 95 55"
        colors={["#f59e0b", "#ea580c", "#d97706"]}
        glowIntensity={isActive ? 0.95 : 0.4}
        fillOpacity={0.5}
      >
        <div className="w-full h-full p-3.5 sm:p-6 md:p-8 bg-[#080a0f]/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden relative">
          {/* Subtle Top Accent Laser Light Beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 sm:gap-3 border-b border-white/10 pb-2 sm:pb-4 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center flex-wrap gap-1.5 sm:gap-3 text-[8px] sm:text-[11px] font-mono text-primary font-bold tracking-wider uppercase mb-0.5 sm:mb-1">
                <span>// {item.category}</span>
                <span className="text-white/20">|</span>
                <span className="text-white/50">SOLUTION {item.number}</span>
                <span className="hidden xs:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[7.5px] sm:text-[9px] text-primary">
                  <Sparkles className="w-2 h-2" />
                  {item.badge}
                </span>
              </div>
              <h3 className="text-base sm:text-2xl lg:text-3xl font-display font-bold tracking-tight text-white leading-tight truncate">
                {item.title}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-primary/90 font-sans mt-0.5 truncate sm:line-clamp-none">
                {item.headline}
              </p>
            </div>

            <span className="text-2xl sm:text-5xl md:text-6xl font-display font-black text-white/10 select-none font-mono shrink-0">
              {item.number}
            </span>
          </div>

          {/* Body: Responsive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-5 my-1.5 sm:my-3 items-center flex-1 min-h-0 overflow-hidden">
            {/* Left Column: Description, Specs & Tags */}
            <div className="lg:col-span-6 space-y-1.5 sm:space-y-3.5 flex flex-col justify-center">
              <p className="hidden sm:block text-xs sm:text-sm text-white/70 leading-relaxed font-sans line-clamp-2 lg:line-clamp-3">
                {item.description}
              </p>

              {/* Live Spec Indicators (2x2 Grid) */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                {item.specs.map((sp) => (
                  <div
                    key={sp.label}
                    className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <div className="text-[7.5px] sm:text-[9px] font-mono text-primary font-semibold uppercase tracking-wider truncate">
                      {sp.label}
                    </div>
                    <div className="text-[10px] sm:text-xs font-sans font-bold text-white mt-0.5 truncate">
                      {sp.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technology Tags */}
              <div className="hidden sm:flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[8.5px] sm:text-[9.5px] font-mono text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Silicon Valley Grade Real-World Showcase */}
            <div className="lg:col-span-6 h-36 sm:h-48 lg:h-full flex items-center justify-center min-h-0">
              <RealWorldShowcase item={item} />
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between gap-2 pt-1.5 sm:pt-3 border-t border-white/10 text-xs shrink-0">
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px] font-mono text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="truncate">READY FOR DEPLOYMENT</span>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono font-bold text-[10px] sm:text-xs hover:bg-primary hover:text-black transition-all group shrink-0"
            >
              <span>BUILD WITH US</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
};

export default StackedSolutionsDeck;
