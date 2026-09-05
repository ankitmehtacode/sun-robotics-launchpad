import { useRef } from "react";
import { useInView } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function InteractiveArmScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  // The Spline runtime (renderer + physics + pathfinding + font/audio
  // support) is ~2MB on its own. This section sits below the fold, so
  // don't let it compete with the initial page load — only start
  // fetching it once the viewer is about to scroll it into view.
  const isNearView = useInView(sceneRef, { once: true, margin: "200px" });

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
            <div ref={sceneRef} className="flex-1 relative min-h-[280px] md:min-h-0">
              {isNearView && (
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
