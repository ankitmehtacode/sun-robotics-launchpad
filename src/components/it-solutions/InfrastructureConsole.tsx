import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EngineeringService {
  serial: string;
  title: string;
  category: string;
  description: string;
  specs: string[];
}

const engineeringServices: EngineeringService[] = [
  {
    serial: "SRV-01",
    title: "Cloud Hosting & Management",
    category: "CLOUD · HOSTING",
    description:
      "Complete server setup, round-the-clock monitoring, automated backups, and instant scaling to keep your business running smoothly.",
    specs: ["24/7 Uptime Monitoring", "Automated Daily Backups", "Zero Setup Hassle"],
  },
  {
    serial: "SRV-02",
    title: "Database Design & Storage",
    category: "DATA · STORAGE",
    description:
      "Fast, organized, and secure data storage built to handle customer records, transactions, and live business analytics.",
    specs: ["Fast Search Queries", "Bank-Level Security", "Automated Archiving"],
  },
  {
    serial: "SRV-03",
    title: "Security & Data Protection",
    category: "SECURITY · PRIVACY",
    description:
      "Complete data encryption, vulnerability assessments, and strict access controls to keep your customer data 100% safe.",
    specs: ["End-to-End Encryption", "Access Control Rules", "Security Audited"],
  },
  {
    serial: "SRV-04",
    title: "Connected Devices & IoT",
    category: "DEVICES · HARDWARE",
    description:
      "Connect physical machines, smart devices, and sensors directly to clean mobile apps and management dashboards.",
    specs: ["Real-Time Sync", "Remote Device Controls", "Live Notifications"],
  },
];

// Bespoke live-telemetry visuals per service, standing in for the generic
// "icon in a colored circle" treatment. Each riffs on the console/HUD
// language already established elsewhere on this page.

const PulseBars = () => {
  const bars = Array.from({ length: 28 });
  return (
    <div className="flex items-end gap-[3px] h-24 w-full">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-gradient-to-t from-primary/70 to-primary/10 rounded-sm"
          animate={{ height: [`${20 + (i % 3) * 8}%`, `${35 + Math.abs(Math.sin(i)) * 60}%`, `${20 + (i % 3) * 8}%`] }}
          transition={{ duration: 1.8 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
        />
      ))}
    </div>
  );
};

const ScanDisks = () => (
  <div className="relative h-24 w-full flex flex-col justify-center gap-3 overflow-hidden">
    {[0, 1, 2].map((i) => (
      <div key={i} className="h-6 rounded-md bg-white/[0.04] border border-white/10 relative overflow-hidden shrink-0">
        <div className="absolute inset-y-0 left-0 bg-primary/20" style={{ width: `${30 + i * 20}%` }} />
      </div>
    ))}
    <motion.div
      className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none"
      animate={{ top: ["-20%", "110%"] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const SecurityRings = () => (
  <div className="relative h-24 w-full flex items-center justify-center">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-primary/40"
        style={{ width: 36 + i * 26, height: 36 + i * 26 }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.15, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
      />
    ))}
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-4 h-4 border-2 border-primary/90 border-b-0 rounded-t-full" />
      <div className="w-6 h-5 rounded-sm bg-primary/90 -mt-px" />
    </div>
  </div>
);

const NodeGraph = () => {
  const nodes = [
    { x: 50, y: 8 },
    { x: 90, y: 38 },
    { x: 74, y: 88 },
    { x: 26, y: 88 },
    { x: 10, y: 38 },
  ];
  return (
    <div className="relative h-24 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="hsl(32 95% 55% / 0.25)"
            strokeWidth="0.6"
          />
        ))}
        <circle cx="50" cy="50" r="4" fill="hsl(32 95% 55%)" />
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="3"
            fill="hsl(32 95% 55%)"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </svg>
    </div>
  );
};

const SERVICE_VISUALS = [PulseBars, ScanDisks, SecurityRings, NodeGraph];

export const InfrastructureConsole = () => {
  const [active, setActive] = useState(0);
  const service = engineeringServices[active];
  const ActiveVisual = SERVICE_VISUALS[active];

  return (
    <section id="node-services" className="py-28 relative overflow-hidden bg-[#06070a]">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-primary text-[10px] font-mono uppercase tracking-widest mb-4">
            <span>[ 06 ] INFRASTRUCTURE & SUPPORT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-3">
            Complete IT Services
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
            End-to-end technical support to keep your software fast, secure, and always operational.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-2 md:gap-10 rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-6 md:p-8">
          {/* Selector rail */}
          <div className="md:col-span-4 flex md:flex-col gap-1 overflow-x-auto no-scrollbar -mx-1 px-1 md:mx-0 md:px-0">
            {engineeringServices.map((s, i) => (
              <button
                key={s.serial}
                onClick={() => setActive(i)}
                className={`relative shrink-0 text-left px-4 py-4 rounded-xl transition-colors cursor-pointer ${
                  active === i ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="srv-active-indicator"
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <div
                  className={`text-[10px] font-mono mb-1 transition-colors ${
                    active === i ? "text-primary" : "text-white/40"
                  }`}
                >
                  {s.serial}
                </div>
                <div
                  className={`font-display font-semibold text-sm sm:text-base whitespace-nowrap md:whitespace-normal transition-colors ${
                    active === i ? "text-white" : "text-white/50"
                  }`}
                >
                  {s.title}
                </div>
              </button>
            ))}
          </div>

          {/* Detail stage */}
          <div className="md:col-span-8 relative min-h-[380px] sm:min-h-[320px] mt-4 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={service.serial}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col h-full"
              >
                <div className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase mb-2">
                  {service.category}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-white/65 leading-relaxed mb-6 max-w-lg">
                  {service.description}
                </p>

                <div className="mt-auto pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-6 items-center">
                  <div className="order-2 sm:order-1 space-y-2 text-xs font-mono text-white/70">
                    {service.specs.map((sp) => (
                      <div key={sp} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-1 sm:order-2">
                    <ActiveVisual />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureConsole;
