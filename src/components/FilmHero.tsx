import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import {
  FrameSource,
  formatTimecode,
  frameHeight,
  frameWidth,
  loadFrameSequence,
  nearestLoadedIndex,
} from "@/lib/filmReel";

const FPS = 12;
const MOBILE_BREAKPOINT = 820;
const HEADLINE_LINES = ["One arm.", "Every machine."];
const SUBHEAD = "A modular robotic arm. Revealing soon.";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useNoiseDataUrl(size = 128) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    const imageData = ctx.createImageData(size, size);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255;
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
  }, [size]);
}

type NotifyState = "idle" | "submitting" | "done" | "error";

function NotifyForm({ variant }: { variant: "overlay" | "static" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<NotifyState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_NOTIFY_ENDPOINT as string | undefined;
    if (!endpoint) {
      console.warn("VITE_NOTIFY_ENDPOINT is not configured — notify signups have nowhere to go.");
      setState("error");
      return;
    }
    setState("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <p className="font-mono text-sm tracking-wide text-[#F9931F]">
        YOU'RE ON THE LIST — REEL 02 INCOMING
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-sm">
      <label htmlFor={`notify-email-${variant}`} className="sr-only">
        Email address
      </label>
      <input
        id={`notify-email-${variant}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-transparent border-0 border-b border-[#23262D] font-mono text-sm text-[#E8E6E1] placeholder:text-[#878D99] py-2 focus:outline-none focus:border-[#F9931F] transition-colors"
      />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="font-mono text-xs tracking-widest uppercase text-[#F9931F] hover:text-[#E8E6E1] transition-colors whitespace-nowrap disabled:opacity-50"
      >
        {state === "submitting" ? "SENDING…" : "NOTIFY ME"}
      </button>
      {state === "error" && (
        <span className="sr-only" role="alert">
          Something went wrong. Please try again.
        </span>
      )}
    </form>
  );
}

export const FilmHero = () => {
  const reducedMotion = useReducedMotion();
  return reducedMotion ? <StaticReveal /> : <ScrubReveal />;
};

// prefers-reduced-motion: skip the pin/scrub entirely, show the final beat.
function StaticReveal() {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/frames/frames.json")
      .then((res) => res.json())
      .then((filenames: string[]) => {
        if (!cancelled && filenames.length > 0) {
          setPosterUrl(`/frames/${filenames[filenames.length - 1]}`);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0B0C0E] flex items-center">
      {posterUrl && (
        <img src={posterUrl} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-70" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/40 to-[#0B0C0E]/70" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl text-left">
          <MaskedHeading
            as="h1"
            heading={HEADLINE_LINES}
            subhead={SUBHEAD}
            className="font-display font-medium tracking-[-0.02em] text-[clamp(2.6rem,7vw,6.4rem)] leading-[1.02]"
            subheadClassName="font-mono text-sm text-[#878D99] mt-4 mb-10 text-left mx-0"
            variant="white-gold"
            gradientSweep={true}
          />
          <NotifyForm variant="static" />
        </div>
      </div>
    </section>
  );
}

function ScrubReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<FrameSource[]>([]);
  const frameCountRef = useRef(0);
  const progressRef = useRef(0);
  const currentDrawnIndexRef = useRef(-1);
  const rafScheduledRef = useRef(false);
  const lastFrameIndexRef = useRef(-1);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT);
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [scrubStarted, setScrubStarted] = useState(false);
  const [showTitleCard, setShowTitleCard] = useState(false);

  const noiseDataUrl = useNoiseDataUrl();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;
    const idx = nearestLoadedIndex(frames, Math.max(0, Math.min(index, frames.length - 1)));
    const src = frames[idx];
    if (!src || currentDrawnIndexRef.current === idx) return;
    currentDrawnIndexRef.current = idx;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const sw = frameWidth(src);
    const sh = frameHeight(src);
    const coverScale = Math.max(cw / sw, ch / sh);
    const widthScale = cw / sw;
    // On tall/narrow viewports (phones), a full "cover" fit is dominated by
    // height and crops away most of the wide cinematic frame — e.g. a 390x844
    // phone against a 720x344 frame would only show the center ~22% of the
    // width. Fall back to fitting the width and letterboxing top/bottom
    // (the section bg shows through the transparent canvas) instead of
    // losing the sides of the shot.
    const scale = coverScale / widthScale > 1.5 ? widthScale : coverScale;
    const dw = sw * scale;
    const dh = sh * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(src, dx, dy, dw, dh);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    // Draw calls use CSS-pixel units (canvas.width/dpr), so the context's
    // transform must scale them back up to the physical pixel buffer —
    // otherwise only the top-left 1/dpr fraction of the canvas gets painted.
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    currentDrawnIndexRef.current = -1;
    drawFrame(Math.round(progressRef.current * Math.max(0, frameCountRef.current - 1)));
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load the frame sequence — desktop or mobile set depending on viewport.
  useEffect(() => {
    const controller = new AbortController();
    const basePath = isMobile ? "/frames/m" : "/frames";
    setReady(false);
    setLoadProgress(0);

    (async () => {
      try {
        const res = await fetch("/frames/frames.json", { signal: controller.signal });
        const filenames: string[] = await res.json();
        frameCountRef.current = filenames.length;
        setTotalFrames(filenames.length);
        const target: FrameSource[] = new Array(filenames.length);
        framesRef.current = target;

        await loadFrameSequence({
          basePath,
          filenames,
          target,
          signal: controller.signal,
          onFrameLoaded: (_i, loadedCount, total) => {
            setLoadProgress(loadedCount / total);
          },
          onSparseReady: () => {
            setReady(true);
            resizeCanvas();
          },
        });
      } catch {
        // Aborted (component unmounted / viewport switched) — nothing to do.
      }
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;

    const started = v > 0.01;
    setScrubStarted((prev) => (prev === started ? prev : started));
    setShowTitleCard((prev) => {
      const next = v > 0.94;
      return prev === next ? prev : next;
    });

    const idx = Math.round(v * Math.max(0, frameCountRef.current - 1));
    if (idx !== lastFrameIndexRef.current) {
      lastFrameIndexRef.current = idx;
      setFrameIndex(idx);
    }

    if (!rafScheduledRef.current) {
      rafScheduledRef.current = true;
      requestAnimationFrame(() => {
        rafScheduledRef.current = false;
        drawFrame(idx);
      });
    }
  });

  const pinDistance = isMobile ? "260vh" : "340vh";

  return (
    <section ref={sectionRef} className="relative" style={{ height: pinDistance }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0B0C0E]">
        {/* Luxury 3D Glassmorphic Loader Module */}
        <AnimatePresence>
          {!ready && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.06, filter: "blur(16px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#07080A] px-4 pointer-events-none overflow-hidden"
            >
              {/* Deep Cinematic Ambient Glows */}
              <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#F9931F]/15 via-blue-500/5 to-transparent blur-[140px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07080A_85%)] pointer-events-none" />

              {/* Centerpiece: Luxury 3D Glassmorphic Emblem Pod */}
              <div className="relative flex flex-col items-center">
                
                {/* Floating 3D Optical Glass Tile */}
                <motion.div
                  initial={{ scale: 0.92, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center"
                >
                  {/* Outer Ambient Caustics Aura */}
                  <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-[#F9931F]/30 via-transparent to-blue-500/20 blur-2xl pointer-events-none" />

                  {/* Refractive Glassmorphic Chassis */}
                  <div className="relative w-full h-full rounded-[28px] p-5 sm:p-6 bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-black/40 border border-white/25 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.4),0_0_35px_rgba(249,147,31,0.25)] overflow-hidden flex items-center justify-center">
                    
                    {/* Inner Warm Amber Radial Core Glow */}
                    <div className="absolute inset-4 rounded-full bg-[#F9931F]/20 blur-xl pointer-events-none" />

                    {/* Prismatic Corner Reflections */}
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#F9931F]/30 rounded-full blur-xl pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

                    {/* Official Sun Robotics Logo */}
                    <img
                      src="/logo.png"
                      alt="Sun Robotics & AI Logo"
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(249,147,31,0.5)]"
                    />

                    {/* Dynamic Specular Shimmer Glint */}
                    <motion.div
                      animate={{ x: ["-150%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 0.8 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                    />

                    {/* Edge Glass Bevel Glint */}
                    <div className="absolute inset-0 rounded-[28px] border border-white/20 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Minimalist Hardware Telemetry & Progress Track */}
                <div className="mt-8 flex flex-col items-center text-center">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tracking-[0.35em] text-[#E8E6E1] uppercase font-bold">
                      SUN ROBOTICS & AI
                    </span>
                  </div>

                  {/* High-Precision Progress Bar */}
                  <div className="mt-4 w-36 h-[2px] bg-white/[0.08] relative overflow-hidden rounded-full">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${Math.round(Math.max(loadProgress * 100, 15))}%` }}
                      transition={{ ease: "easeOut", duration: 0.2 }}
                      className="h-full bg-gradient-to-r from-[#F9931F] to-[#ffd188] shadow-[0_0_12px_#F9931F]"
                    />
                  </div>

                  <div className="mt-2.5 font-mono text-[10px] tracking-[0.25em] text-[#878D99] uppercase">
                    INITIALIZING // {Math.round(Math.max(loadProgress * 100, 15))}%
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Frame canvas */}
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full" />

        {/* Film grain */}
        <div
          className="film-grain absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
          style={{ backgroundImage: noiseDataUrl ? `url(${noiseDataUrl})` : undefined, backgroundSize: "128px 128px" }}
          aria-hidden
        />

        {/* Letterbox bars */}
        <div
          className="absolute top-0 left-0 right-0 bg-[#0B0C0E] transition-[height] duration-700 ease-out pointer-events-none"
          style={{ height: scrubStarted ? "6vh" : "0vh" }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 right-0 bg-[#0B0C0E] transition-[height] duration-700 ease-out pointer-events-none"
          style={{ height: scrubStarted ? "6vh" : "0vh" }}
          aria-hidden
        />

        {/* HUD overlay */}
        <div
          className="absolute inset-0 pointer-events-none font-mono text-[#878D99] transition-opacity duration-500"
          style={{ opacity: ready && !showTitleCard ? 1 : 0 }}
          aria-hidden
        >
          <span className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] tracking-[0.3em]">
            REEL 01
          </span>
          <span className="absolute left-6 bottom-8 text-[10px] tracking-[0.15em]">
            TC {formatTimecode(frameIndex, FPS)}
          </span>
          <span className="absolute right-6 bottom-8 text-[10px] tracking-[0.15em]">
            FRAME {String(frameIndex + 1).padStart(3, "0")} / {String(totalFrames).padStart(3, "0")}
          </span>
        </div>

        {/* Cold-open scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.3em] text-[#878D99] transition-opacity duration-500 pointer-events-none"
          style={{ opacity: ready && !scrubStarted ? 1 : 0 }}
          aria-hidden
        >
          SCROLL
        </div>

        {/* Title card */}
        <div
          className="absolute inset-0 flex items-center transition-opacity duration-700"
          style={{ opacity: showTitleCard ? 1 : 0, pointerEvents: showTitleCard ? "auto" : "none" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/50 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-2xl text-left">
              <MaskedHeading
                as="h1"
                heading={HEADLINE_LINES}
                subhead={SUBHEAD}
                forceAnimate={showTitleCard}
                className="font-display font-medium tracking-[-0.02em] text-[clamp(2.6rem,7vw,6.4rem)] leading-[1.02]"
                subheadClassName="font-mono text-sm text-[#878D99] mt-4 mb-10 text-left mx-0"
                variant="white-gold"
                gradientSweep={true}
              />
              <NotifyForm variant="overlay" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
