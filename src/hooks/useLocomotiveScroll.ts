import { useEffect, useState, useRef } from "react";
import { useLenis } from "lenis/react";

export interface LocomotiveScrollState {
  velocity: number;
  speed: number;
  direction: "down" | "up" | "idle";
  progress: number; // 0 to 1
  scroll: number;
  skew: number; // in degrees, e.g. -6 to +6
  activeNode: string;
  nodeIndex: number;
  totalNodes: number;
}

export const SECTION_NODES = [
  { id: "node-hero", label: "01 · OVERVIEW", short: "01 OVERVIEW" },
  { id: "node-pillars", label: "02 · SOLUTIONS", short: "02 SOLUTIONS" },
  { id: "node-showcase", label: "03 · PORTFOLIO", short: "03 PORTFOLIO" },
  { id: "node-benchmarks", label: "04 · ARCHITECTURE", short: "04 ARCH" },
  { id: "node-tech", label: "05 · TECHNOLOGIES", short: "05 TECH" },
  { id: "node-services", label: "06 · SERVICES", short: "06 SERVICES" },
];

export const useLocomotiveScroll = () => {
  const [scrollState, setScrollState] = useState<LocomotiveScrollState>({
    velocity: 0,
    speed: 0,
    direction: "idle",
    progress: 0,
    scroll: 0,
    skew: 0,
    activeNode: SECTION_NODES[0].label,
    nodeIndex: 0,
    totalNodes: SECTION_NODES.length,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const smoothedVelocity = useRef(0);

  // Hook into Lenis if present, updating physics on every frame
  const lenis = useLenis((lenisInstance) => {
    const scroll = lenisInstance.scroll;
    const limit = lenisInstance.limit || (document.documentElement.scrollHeight - window.innerHeight);
    const progress = limit > 0 ? Math.min(Math.max(scroll / limit, 0), 1) : 0;
    const rawVelocity = lenisInstance.velocity || 0;

    // Smooth velocity with lerp
    smoothedVelocity.current += (rawVelocity - smoothedVelocity.current) * 0.15;
    const speed = Math.abs(smoothedVelocity.current);
    
    // Clamp skew between -6deg and 6deg
    const rawSkew = Math.max(Math.min(smoothedVelocity.current * 0.08, 6), -6);

    // Determine current active section node
    let currentActive = SECTION_NODES[0].label;
    let currentNodeIndex = 0;
    const scrollOffset = window.innerHeight * 0.35;

    for (let i = 0; i < SECTION_NODES.length; i++) {
      const el = document.getElementById(SECTION_NODES[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= scrollOffset && rect.bottom >= scrollOffset) {
          currentActive = SECTION_NODES[i].label;
          currentNodeIndex = i;
          break;
        } else if (rect.top <= scrollOffset) {
          currentActive = SECTION_NODES[i].label;
          currentNodeIndex = i;
        }
      }
    }

    setScrollState({
      velocity: smoothedVelocity.current,
      speed,
      direction: rawVelocity > 0.1 ? "down" : rawVelocity < -0.1 ? "up" : "idle",
      progress,
      scroll,
      skew: parseFloat(rawSkew.toFixed(2)),
      activeNode: currentActive,
      nodeIndex: currentNodeIndex,
      totalNodes: SECTION_NODES.length,
    });
  });

  // Fallback if Lenis is not wrapped
  useEffect(() => {
    if (lenis) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const currentTime = Date.now();
      const dt = Math.max(currentTime - lastTime.current, 16);
      const dy = currentScroll - lastScrollY.current;
      const rawVelocity = (dy / dt) * 16.6;

      lastScrollY.current = currentScroll;
      lastTime.current = currentTime;

      smoothedVelocity.current += (rawVelocity - smoothedVelocity.current) * 0.2;
      const limit = document.documentElement.scrollHeight - window.innerHeight;
      const progress = limit > 0 ? currentScroll / limit : 0;
      const rawSkew = Math.max(Math.min(smoothedVelocity.current * 0.08, 6), -6);

      let currentActive = SECTION_NODES[0].label;
      let currentNodeIndex = 0;
      const scrollOffset = window.innerHeight * 0.35;

      for (let i = 0; i < SECTION_NODES.length; i++) {
        const el = document.getElementById(SECTION_NODES[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= scrollOffset && rect.bottom >= scrollOffset) {
            currentActive = SECTION_NODES[i].label;
            currentNodeIndex = i;
            break;
          } else if (rect.top <= scrollOffset) {
            currentActive = SECTION_NODES[i].label;
            currentNodeIndex = i;
          }
        }
      }

      setScrollState({
        velocity: smoothedVelocity.current,
        speed: Math.abs(smoothedVelocity.current),
        direction: dy > 0.5 ? "down" : dy < -0.5 ? "up" : "idle",
        progress: Math.min(Math.max(progress, 0), 1),
        scroll: currentScroll,
        skew: parseFloat(rawSkew.toFixed(2)),
        activeNode: currentActive,
        nodeIndex: currentNodeIndex,
        totalNodes: SECTION_NODES.length,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lenis]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -60, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    ...scrollState,
    scrollToSection,
  };
};
