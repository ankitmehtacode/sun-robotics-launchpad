import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function InteractiveArmScene() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

          <div className="flex flex-col md:flex-row h-full">
            {/* Left content */}
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                Interactive 3D
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-normal tracking-[-0.03em] mt-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Meet the arm, up close
              </h2>
              <p className="mt-4 text-neutral-300 max-w-lg tracking-[-0.01em]">
                Drag to rotate our modular robotic arm and see every joint and
                end-effector up close — the same platform reaching your factory floor.
              </p>
            </div>

            {/* Right content */}
            <div className="flex-1 relative min-h-[280px] md:min-h-0">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
