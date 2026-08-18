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
    visual: "cloud",
    accentColor: "#d97706",
    gradient: "from-amber-600 to-yellow-500",
    badge: "BANK-GRADE ENCRYPTION",
  },
];

// ==========================================
// 200-IQ Dynamic Visualizers with Live Motion
// ==========================================

const ArchitecturalVisual = ({ type }: { type: SolutionItem["visual"] }) => {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((p) => (p + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  if (type === "mesh") {
    return (
      <div className="relative w-full h-full min-h-[300px] lg:min-h-[340px] rounded-xl bg-[#06080d] border border-white/10 p-5 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        {/* Background Grid & Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between text-[11px] font-mono text-white/60 border-b border-white/10 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="tracking-wider">HYBRID EDGE TOPOLOGY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold tracking-tight">12ms • LIVE</span>
          </div>
        </div>

        {/* Animated Interactive Flow Diagram */}
        <div className="relative my-auto py-2 h-44 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 460 160">
            <defs>
              <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fb923c" stopOpacity="1" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Wireframe Paths */}
            <path
              d="M 60,80 C 130,25 180,25 230,80 C 280,135 330,135 400,80"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 60,80 C 130,135 180,135 230,80 C 280,25 330,25 400,80"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Glowing Active Flow Path */}
            <path
              d="M 60,80 C 130,25 180,25 230,80 C 280,135 330,135 400,80"
              fill="none"
              stroke="url(#flowGrad1)"
              strokeWidth="2.5"
              filter="url(#glowFilter)"
            />

            {/* Kinetic Pulse Stream Particles */}
            <motion.circle
              r="4"
              fill="#fff"
              filter="url(#glowFilter)"
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                offsetPath: `path("M 60,80 C 130,25 180,25 230,80 C 280,135 330,135 400,80")`,
              }}
            />
            <motion.circle
              r="3.5"
              fill="#f59e0b"
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: 2.8,
                delay: 0.9,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                offsetPath: `path("M 60,80 C 130,135 180,135 230,80 C 280,25 330,25 400,80")`,
              }}
            />

            {/* Node 1: Client Devices */}
            <g transform="translate(60, 80)">
              <circle r="22" fill="#0d111a" stroke="#f59e0b" strokeWidth="2" />
              <circle r="14" fill="rgba(245,158,11,0.15)" />
              <Smartphone className="w-5 h-5 text-white -translate-x-2.5 -translate-y-2.5" />
              <text y="36" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                CLIENT APPS
              </text>
              <text y="48" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">
                iOS · ANDROID · WEB
              </text>
            </g>

            {/* Node 2: Core Cloud Gateway */}
            <g transform="translate(230, 80)">
              <circle r="30" fill="#0d111a" stroke="#fb923c" strokeWidth="2.5" filter="url(#glowFilter)" />
              <circle r="20" fill="rgba(251,146,60,0.2)" />
              <Zap className="w-6 h-6 text-primary -translate-x-3 -translate-y-3" />
              <text y="44" fill="#fff" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                API GATEWAY
              </text>
              <text y="56" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">
                NEXT.JS & NODE.JS
              </text>
            </g>

            {/* Node 3: Distributed Database */}
            <g transform="translate(400, 80)">
              <circle r="22" fill="#0d111a" stroke="#ea580c" strokeWidth="2" />
              <circle r="14" fill="rgba(234,88,12,0.15)" />
              <Database className="w-5 h-5 text-white -translate-x-2.5 -translate-y-2.5" />
              <text y="36" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                DATABASE
              </text>
              <text y="48" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">
                POSTGRES · REDIS
              </text>
            </g>
          </svg>
        </div>

        {/* Bottom Status Bar */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center relative z-10">
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
            <span className="block text-[8px] font-mono text-white/40">THROUGHPUT</span>
            <span className="text-[11px] font-mono font-bold text-white">45,000 req/s</span>
          </div>
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
            <span className="block text-[8px] font-mono text-white/40">SSL CIPHER</span>
            <span className="text-[11px] font-mono font-bold text-primary">TLS 1.3 AES</span>
          </div>
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
            <span className="block text-[8px] font-mono text-white/40">GLOBAL CDNs</span>
            <span className="text-[11px] font-mono font-bold text-emerald-400">300+ EDGES</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "neural") {
    return (
      <div className="relative w-full h-full min-h-[300px] lg:min-h-[340px] rounded-xl bg-[#06080d] border border-white/10 p-5 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(249,115,22,0.12),transparent_70%)] pointer-events-none" />

        <div className="flex items-center justify-between text-[11px] font-mono text-white/60 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span className="tracking-wider">NEURAL TELEMETRY STREAM</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold">
            CONFIDENCE: 99.8%
          </span>
        </div>

        {/* Oscillating Multi-Waveform */}
        <div className="relative my-auto py-2 h-44 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 460 160">
            <defs>
              <linearGradient id="waveFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Threshold limits */}
            <line x1="20" y1="35" x2="440" y2="35" stroke="rgba(244,63,94,0.35)" strokeDasharray="3 3" strokeWidth="1.5" />
            <line x1="20" y1="125" x2="440" y2="125" stroke="rgba(244,63,94,0.35)" strokeDasharray="3 3" strokeWidth="1.5" />
            <text x="440" y="30" fill="rgba(244,63,94,0.75)" fontSize="8" fontFamily="monospace" textAnchor="end">
              UPPER CRITICAL THRESHOLD
            </text>

            {/* Waveform underfill */}
            <path
              d="M 20,80 Q 60,30 100,80 T 180,80 T 260,40 T 340,110 T 420,80 L 420,150 L 20,150 Z"
              fill="url(#waveFill)"
            />

            {/* Primary Live Sine Wave */}
            <motion.path
              d="M 20,80 C 60,20 80,140 120,80 C 160,20 180,140 220,80 C 260,10 280,150 320,80 C 360,30 380,130 440,80"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              animate={{
                d: [
                  "M 20,80 C 60,20 80,140 120,80 C 160,20 180,140 220,80 C 260,10 280,150 320,80 C 360,30 380,130 440,80",
                  "M 20,80 C 60,130 80,30 120,80 C 160,140 180,20 220,80 C 260,150 280,20 320,80 C 360,140 380,30 440,80",
                  "M 20,80 C 60,20 80,140 120,80 C 160,20 180,140 220,80 C 260,10 280,150 320,80 C 360,30 380,130 440,80",
                ],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Live Scan Radar Line */}
            <motion.line
              x1="20"
              y1="10"
              x2="20"
              y2="150"
              stroke="#fb923c"
              strokeWidth="2"
              opacity="0.8"
              animate={{
                x1: [20, 440, 20],
                x2: [20, 440, 20],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Pulsing Hotspot */}
            <circle cx="320" cy="80" r="7" fill="#ea580c" opacity="0.4" className="animate-ping" />
            <circle cx="320" cy="80" r="4" fill="#fff" />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
            <span className="block text-[8px] font-mono text-white/40">SAMPLING RATE</span>
            <span className="text-[11px] font-mono font-bold text-white">100,000 pts/s</span>
          </div>
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
            <span className="block text-[8px] font-mono text-white/40">ANOMALIES DETECTED</span>
            <span className="text-[11px] font-mono font-bold text-emerald-400">0 CRITICAL</span>
          </div>
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
            <span className="block text-[8px] font-mono text-white/40">AI PREDICTION</span>
            <span className="text-[11px] font-mono font-bold text-primary">OPTIMAL</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "edge") {
    return (
      <div className="relative w-full h-full min-h-[300px] lg:min-h-[340px] rounded-xl bg-[#06080d] border border-white/10 p-5 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(234,88,12,0.12),transparent_70%)] pointer-events-none" />

        <div className="flex items-center justify-between text-[11px] font-mono text-white/60 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="tracking-wider">HARDWARE IOT // FLEET MESH</span>
          </div>
          <span className="text-emerald-400 font-bold font-mono text-[10px]">ALL 256 NODES ACTIVE</span>
        </div>

        {/* Distributed Mesh Map */}
        <div className="relative my-auto py-2 h-44 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 460 160">
            {/* Concentric Radar Rings */}
            <circle cx="230" cy="80" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <circle cx="230" cy="80" r="35" fill="none" stroke="rgba(245,158,11,0.2)" />
            
            {/* Center Cloud Hub */}
            <circle cx="230" cy="80" r="18" fill="#0f121d" stroke="#f59e0b" strokeWidth="2.5" />
            <Cpu className="w-5 h-5 text-primary translate-x-[220px] translate-y-[70px]" />
            <text x="230" y="112" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              CENTRAL EDGE HUB
            </text>

            {/* Satellites */}
            {[
              { x: 90, y: 40, label: "ROBOTIC ARM", icon: "ARM" },
              { x: 370, y: 40, label: "VISION CAMERA", icon: "CAM" },
              { x: 100, y: 120, label: "PLC CONTROLLER", icon: "PLC" },
              { x: 360, y: 120, label: "SENSOR FLEET", icon: "SEN" },
            ].map((node, i) => (
              <g key={node.label}>
                <line
                  x1="230"
                  y1="80"
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(245,158,11,0.3)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle cx={node.x} cy={node.y} r="14" fill="#0d111a" stroke="#fb923c" strokeWidth="1.5" />
                <circle cx={node.x} cy={node.y} r="6" fill="#f59e0b" className="animate-pulse" />
                <text x={node.x} y={node.y + 22} fill="rgba(255,255,255,0.8)" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
            <span className="block text-[8px] font-mono text-white/40">PROTOCOL</span>
            <span className="text-[11px] font-mono font-bold text-white">MQTT over TLS</span>
          </div>
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
            <span className="block text-[8px] font-mono text-white/40">CONTROL JITTER</span>
            <span className="text-[11px] font-mono font-bold text-emerald-400">&lt; 1.8ms</span>
          </div>
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
            <span className="block text-[8px] font-mono text-white/40">OTA UPDATE</span>
            <span className="text-[11px] font-mono font-bold text-primary">ENCRYPTED</span>
          </div>
        </div>
      </div>
    );
  }

  // Cloud & Security
  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-[340px] rounded-xl bg-[#06080d] border border-white/10 p-5 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.12),transparent_70%)] pointer-events-none" />

      <div className="flex items-center justify-between text-[11px] font-mono text-white/60 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="tracking-wider">SECURITY FORTRESS // ZERO TRUST</span>
        </div>
        <span className="text-emerald-400 font-bold font-mono text-[10px]">99.99% UPTIME</span>
      </div>

      {/* 3D Cloud Cluster */}
      <div className="grid grid-cols-3 gap-3 my-auto py-2">
        {[
          { name: "Primary Region", sub: "Multi-Zone Cloud", status: "ONLINE", color: "#10b981" },
          { name: "Failover Mirror", sub: "Hot Standby Sync", status: "SYNCED", color: "#f59e0b" },
          { name: "Security Perimeter", sub: "DDoS & WAF Shield", status: "GUARDING", color: "#38bdf8" },
        ].map((item, idx) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.03 }}
            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/50 transition-all text-center relative group"
          >
            <div
              className="w-2.5 h-2.5 rounded-full mx-auto mb-2 shadow-[0_0_12px_currentColor]"
              style={{ backgroundColor: item.color, color: item.color }}
            />
            <div className="text-xs font-sans font-bold text-white mb-0.5">{item.name}</div>
            <div className="text-[9px] font-sans text-white/50 mb-2">{item.sub}</div>
            <span
              className="px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider font-bold"
              style={{
                backgroundColor: `${item.color}15`,
                color: item.color,
                border: `1px solid ${item.color}30`,
              }}
            >
              {item.status}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
        <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
          <span className="block text-[8px] font-mono text-white/40">SNAPSHOTS</span>
          <span className="text-[11px] font-mono font-bold text-white">Daily Hourly</span>
        </div>
        <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
          <span className="block text-[8px] font-mono text-white/40">RECOVERY TIME</span>
          <span className="text-[11px] font-mono font-bold text-emerald-400">&lt; 30 SEC</span>
        </div>
        <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
          <span className="block text-[8px] font-mono text-white/40">COMPLIANCE</span>
          <span className="text-[11px] font-mono font-bold text-primary">ISO / SOC-2 READY</span>
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

  const total = solutionPillars.length;
  const segments = total - 1; // 3 transition segments for 4 cards

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(total - 1, Math.floor(latest * total));
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
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 py-4">
        {/* Deep ambient backdrop */}
        <div className="absolute inset-0 bg-[#050608]" />
        <div className="absolute inset-0 hero-gradient pointer-events-none opacity-40" />
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

        {/* Floating Telemetry & Navigation Deck Controller (Clean Top Placement) */}
        <div className="relative z-40 mb-3 flex items-center gap-1.5 p-1.5 rounded-full bg-[#0b0d14]/90 backdrop-blur-xl border border-white/10 shadow-2xl">
          {solutionPillars.map((pillar, idx) => (
            <button
              key={pillar.id}
              onClick={() => jumpToSlide(idx)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCardIndex === idx
                  ? "bg-primary text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{pillar.number}</span>
              <span className="hidden sm:inline">{pillar.category.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* 3D Perspective Card Stage */}
        <div className="relative w-full max-w-6xl h-[80vh] max-h-[660px] perspective-1200">
          {solutionPillars.map((item, index) => (
            <DeckCard
              key={item.id}
              item={item}
              index={index}
              total={total}
              segments={segments}
              scrollYProgress={scrollYProgress}
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
  // Exactly 3 segments: [0 -> 1/3], [1/3 -> 2/3], [2/3 -> 1.0]
  const segStart = index === 0 ? 0 : (index - 1) / segments;
  const segEnd = index === 0 ? 0 : index / segments;
  const nextSegEnd = index === total - 1 ? 1.0 : (index + 1) / segments;

  // 1. Y Translation
  // For index 0: stays at 0, recedes up slightly when next cards enter
  // For other cards: enters from 110% to 0% during its segment, then recedes on subsequent cards
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segEnd, nextSegEnd],
    index === 0
      ? ["0%", "-16px"]
      : ["110%", "0%", index === total - 1 ? "0%" : `-${(total - index) * 16}px`]
  );

  // 2. Scale: Enters at 0.90 -> 1.0, recedes on exit
  const scale = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segEnd, nextSegEnd],
    index === 0
      ? [1, 0.95]
      : [0.90, 1, index === total - 1 ? 1 : 0.95]
  );

  // 3. 3D Perspective Rotation (X-axis pitch):
  // Enters at 18° tilt, straightens to 0° (90° upright view), and for the LAST card stays firmly at 0°!
  const rotateX = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segEnd, nextSegEnd],
    index === 0
      ? [0, -5]
      : [18, 0, index === total - 1 ? 0 : -5]
  );

  // 4. Opacity
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1 / segments]
      : [segStart, segStart + 0.05, segEnd, nextSegEnd],
    index === 0
      ? [1, 0.4]
      : [0, 1, 1, index === total - 1 ? 1 : 0.4]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        rotateX,
        opacity,
        zIndex: index + 10,
        top: `${index * 10}px`,
        transformPerspective: 1200,
      }}
      className="absolute inset-0 w-full h-full will-change-transform preserve-3d"
    >
      <BorderGlow
        className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
        borderRadius={20}
        glowColor="32 95 55"
        colors={["#f59e0b", "#ea580c", "#d97706"]}
        glowIntensity={isActive ? 0.95 : 0.4}
        fillOpacity={0.5}
      >
        <div className="w-full h-full p-6 md:p-8 bg-[#080a0f]/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto no-scrollbar relative">
          {/* Subtle Top Accent Laser Light Beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

          {/* Header Row */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-primary font-bold tracking-widest uppercase mb-1">
                <span>// {item.category}</span>
                <span className="text-white/20">|</span>
                <span className="text-white/50">SOLUTION {item.number}</span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] text-primary">
                  <Sparkles className="w-2.5 h-2.5" />
                  {item.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-white leading-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-primary/90 font-sans mt-1">
                {item.headline}
              </p>
            </div>

            <span className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white/5 select-none font-mono">
              {item.number}
            </span>
          </div>

          {/* Body: High-Density Specs & Live Visualizer */}
          <div className="grid lg:grid-cols-12 gap-6 my-4 items-center flex-1">
            {/* Left Column: Description, Specs & Tags */}
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {item.description}
              </p>

              {/* Live Spec Indicators */}
              <div className="grid grid-cols-2 gap-2.5">
                {item.specs.map((sp) => (
                  <div
                    key={sp.label}
                    className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <div className="text-[9px] font-mono text-primary font-semibold uppercase tracking-wider">
                      {sp.label}
                    </div>
                    <div className="text-xs font-sans font-bold text-white mt-0.5">
                      {sp.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-white/75 hover:border-primary/40 hover:text-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Next-Level Dynamic Visualizer */}
            <div className="lg:col-span-6 h-full flex items-center">
              <ArchitecturalVisual type={item.visual} />
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2 text-[11px] font-mono text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>PRODUCTION GRADE // READY FOR DEPLOYMENT</span>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono font-bold text-xs hover:bg-primary hover:text-black transition-all group"
            >
              <span>BUILD WITH US</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
};

export default StackedSolutionsDeck;
