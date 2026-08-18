import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

interface SolutionItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  image: string;
  caption: string;
}

const solutionPillars: SolutionItem[] = [
  {
    id: "custom-apis",
    number: "01",
    category: "WEB & MOBILE PLATFORMS",
    title: "Custom Websites, Web Apps & APIs",
    description:
      "Ultra-fast web platforms, native iOS/Android applications, and high-throughput APIs engineered for effortless scale.",
    highlights: [
      "Sub-12ms edge response with serverless SSR",
      "Native iOS, Android & multi-device web apps",
      "Distributed PostgreSQL & encrypted caching",
    ],
    tags: ["React 19", "Next.js", "Node.js", "PostgreSQL"],
    image: "/solutions/web-platform.jpg",
    caption: "Custom Web & Mobile Architecture",
  },
  {
    id: "ai-dashboards",
    number: "02",
    category: "SMART ANALYTICS",
    title: "AI Analytics & Live Dashboards",
    description:
      "Transform complex data streams into clean, actionable real-time visualizations with predictive AI alerts.",
    highlights: [
      "Real-time telemetry & executive dashboards",
      "Automated anomaly detection & forecasting",
      "Instant data export & scheduled reporting",
    ],
    tags: ["Live Telemetry", "Neural Models", "Predictive Alerts"],
    image: "/solutions/ai-analytics.jpg",
    caption: "Real-Time Telemetry & AI Stream",
  },
  {
    id: "cloud-iot",
    number: "03",
    category: "HARDWARE & IOT",
    title: "Connected Devices & Hardware IoT",
    description:
      "Deterministic remote control and telemetry connecting physical hardware to digital control planes with zero jitter.",
    highlights: [
      "Sub-5ms low-latency control via MQTT",
      "TLS 1.3 cryptographic hardware identity",
      "Encrypted over-the-air firmware updates",
    ],
    tags: ["Edge Gateways", "MQTT", "OTA Firmware"],
    image: "/solutions/hardware-iot.jpg",
    caption: "Industrial IoT Edge Gateway",
  },
  {
    id: "cloud-infrastructure",
    number: "04",
    category: "CLOUD & SECURITY",
    title: "Cloud Hosting & Data Security",
    description:
      "Enterprise hosting engineered for 99.99% uptime with automated snapshots and multi-region failover protection.",
    highlights: [
      "99.99% uptime SLA with instant failover",
      "AES-256 bank-grade data encryption",
      "24/7 automated monitoring & DDoS shield",
    ],
    tags: ["AWS / GCP", "Auto-Scaling", "DDoS Shield"],
    image: "/solutions/cloud-security.jpg",
    caption: "Enterprise Cloud Infrastructure",
  },
];

// ==========================================
// Minimalist Silicon Valley Showcase Stage
// ==========================================

const RealWorldShowcase = ({ item }: { item: SolutionItem }) => {
  return (
    <div className="relative w-full h-full min-h-[160px] sm:min-h-[220px] lg:min-h-[280px] rounded-xl sm:rounded-2xl bg-[#06080d] border border-white/10 overflow-hidden shadow-2xl group flex items-end">
      {/* Real-World Image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
        loading="lazy"
      />
      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Clean Bottom Caption */}
      <div className="relative z-10 p-3 sm:p-4 w-full flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-mono font-medium text-white/90 drop-shadow-md">
          {item.caption}
        </span>
      </div>
    </div>
  );
};

// ==========================================
// Main Deck Component with 3D Card Stacking
// ==========================================

export const StackedSolutionsDeck = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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

        {/* Floating Category Navigation Pill Tabs */}
        <div className="relative z-40 mb-2 sm:mb-4 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#0b0d14]/90 backdrop-blur-xl border border-white/10 shadow-2xl max-w-full overflow-x-auto no-scrollbar">
          {solutionPillars.map((pillar, idx) => (
            <button
              key={pillar.id}
              onClick={() => jumpToSlide(idx)}
              className={`px-3 sm:px-3.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shrink-0 ${
                activeCardIndex === idx
                  ? "bg-primary text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{pillar.number}</span>
              <span>{pillar.category.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Card Stage */}
        <div className="relative w-full max-w-6xl h-[calc(100dvh-100px)] sm:h-[78vh] max-h-[620px] sm:max-h-[640px] perspective-1200">
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
// Cinematic Card
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

  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segEnd, nextSegEnd],
    index === 0
      ? ["0%", "-12px"]
      : ["108%", "0%", index === total - 1 ? "0%" : `-${(total - index) * 12}px`]
  );

  const scale = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segEnd, nextSegEnd],
    index === 0
      ? [1, 0.96]
      : [0.92, 1, index === total - 1 ? 1 : 0.96]
  );

  const rotateX = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segEnd, nextSegEnd],
    index === 0
      ? [0, -4]
      : [10, 0, index === total - 1 ? 0 : -4]
  );

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
        <div className="w-full h-full p-4 sm:p-6 md:p-8 bg-[#080a0f]/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden relative">
          {/* Subtle Top Laser Beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 sm:gap-3 border-b border-white/10 pb-2 sm:pb-4 shrink-0">
            <div className="min-w-0">
              <div className="text-[9px] sm:text-xs font-mono text-primary font-bold tracking-widest uppercase mb-1">
                // {item.category}
              </div>
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-display font-bold tracking-tight text-white leading-tight truncate">
                {item.title}
              </h3>
            </div>

            <span className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white/10 select-none font-mono shrink-0">
              {item.number}
            </span>
          </div>

          {/* Body: High-Impact Minimalist Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 my-2 sm:my-3 items-center flex-1 min-h-0">
            {/* Left Column: Description, Highlights & Tech Stack */}
            <div className="lg:col-span-6 space-y-2.5 sm:space-y-4 flex flex-col justify-center">
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {item.description}
              </p>

              {/* 3 Clean Highlights */}
              <ul className="space-y-1.5 sm:space-y-2">
                {item.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-[11px] sm:text-xs text-white/85 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[9px] sm:text-[10px] font-mono text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Clean Gallery-Grade Showcase */}
            <div className="lg:col-span-6 h-40 sm:h-52 lg:h-full flex items-center justify-center min-h-0">
              <RealWorldShowcase item={item} />
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between gap-2 pt-2 sm:pt-3 border-t border-white/10 text-xs shrink-0">
            <span className="text-[10px] sm:text-xs font-mono text-white/40">
              PRODUCTION-READY ARCHITECTURE
            </span>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono font-bold text-[10px] sm:text-xs hover:bg-primary hover:text-black transition-all group shrink-0"
            >
              <span>GET A QUOTE</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
};

export default StackedSolutionsDeck;
