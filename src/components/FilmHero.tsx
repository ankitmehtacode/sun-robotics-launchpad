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
const HEADLINE = "One arm. Every machine.";
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
            heading={HEADLINE}
            subhead={SUBHEAD}
            className="font-display font-medium tracking-[-0.02em] text-[clamp(2.6rem,7vw,6.4rem)] leading-[1.05] text-[#E8E6E1] items-start text-left"
            subheadClassName="font-mono text-sm text-[#878D99] mt-4 mb-10 text-left mx-0"
            gradientSweep={false}
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
        {/* Cinematic Aperture Brand Reveal */}
        <AnimatePresence>
          {!ready && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#07080a] px-4 pointer-events-none overflow-hidden"
            >
              {/* Ethereal Atmospheric Background Lights */}
              <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-500/10 via-primary/15 to-transparent blur-[120px] pointer-events-none animate-pulse-slow" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07080a_80%)] pointer-events-none" />

              {/* Centerpiece: Floating Glass Disc & Rotating Aperture Orbit */}
              <div className="relative flex flex-col items-center">
                {/* Orbital Rings */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
                  {/* Outer Dashed Orbit */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-amber-500/25"
                  />

                  {/* Secondary Counter-Rotating Ring with Accent Dot */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-white/10"
                  >
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#f59e0b]" />
                  </motion.div>

                  {/* Core Glassmorphic Lens Pod */}
                  <motion.div
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/[0.04] border border-white/20 backdrop-blur-2xl flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.25)] p-4"
                  >
                    {/* Inner Golden Radial Glow */}
                    <div className="absolute inset-2 rounded-full bg-primary/20 blur-md pointer-events-none" />

                    {/* Brand Logo */}
                    <img
                      src="/logo.png"
                      alt="Sun Robotics Logo"
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(249,147,31,0.6)]"
                    />
                  </motion.div>
                </div>

                {/* Minimalist Masked Brandmark */}
                <div className="mt-8 flex flex-col items-center text-center">
                  <MaskedHeading
                    as="span"
                    heading="SUN ROBOTICS & AI"
                    delay={0.15}
                    duration={0.8}
                    className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase font-bold"
                    gradientSweep={true}
                  />

                  {/* Hairline Luminous Shimmer Line */}
                  <div className="mt-4 w-28 h-[1.5px] bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      className="w-14 h-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_#f59e0b]"
                    />
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
                heading={HEADLINE}
                subhead={SUBHEAD}
                className="font-display font-medium tracking-[-0.02em] text-[clamp(2.6rem,7vw,6.4rem)] leading-[1.05] text-[#E8E6E1] items-start text-left"
                subheadClassName="font-mono text-sm text-[#878D99] mt-4 mb-10 text-left mx-0"
                gradientSweep={false}
              />
              <NotifyForm variant="overlay" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
