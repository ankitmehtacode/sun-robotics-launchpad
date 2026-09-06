import { useState } from "react";
import { Rotate3d } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function InteractiveArmScene() {
  // The Spline runtime (renderer + physics + pathfinding + font/audio
  // support) is ~1.4MB gzipped on its own — by far the heaviest asset on
  // the site. Auto-fetching it whenever this section scrolled near view
  // meant every visitor paid that download just by scrolling past the
  // hero. Instead, show a lightweight static poster of the real scene and
  // only fetch/mount the interactive model on an explicit tap.
  const [activated, setActivated] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

          <div className="flex flex-col md:flex-row h-full">
            {/* Left content */}
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                Humanoid
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-normal tracking-[-0.03em] mt-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Experience the Humanoid
              </h2>
              <p className="mt-4 text-neutral-300 max-w-lg tracking-[-0.01em]">
                Drag to rotate and inspect every joint and actuator up close —
                the full-body platform behind our next generation of general-purpose machines.
              </p>
            </div>

            {/* Right content */}
            <div className="flex-1 relative min-h-[280px] md:min-h-0">
              {activated ? (
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setActivated(true)}
                  className="group absolute inset-0 w-full h-full cursor-pointer"
                  aria-label="Load the interactive 3D humanoid model"
                >
                  <img
                    src="/humanoid-poster.webp"
                    alt="Sun Robotics humanoid model, standing"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/0 group-hover:bg-black/20 transition-colors">
                    <span className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:scale-110 transition-all">
                      <Rotate3d className="w-6 h-6 text-white group-hover:text-primary transition-colors" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                      Tap to load interactive 3D
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
