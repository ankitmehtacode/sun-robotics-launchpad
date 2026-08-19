import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Center,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import * as THREE from "three";

const HEADLINE_LINES = ["One arm.", "Every machine."];
const SUBHEAD = "A modular robotic arm. Revealing soon.";

type NotifyState = "idle" | "submitting" | "done" | "error";

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<NotifyState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_NOTIFY_ENDPOINT as string | undefined;
    if (!endpoint) {
      setState("done");
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
      <p className="font-mono text-sm tracking-widest text-[#F9931F] uppercase">
        YOU'RE ON THE LIST — REVEAL INCOMING
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-sm w-full">
      <label htmlFor="hero-notify-email" className="sr-only">
        Email address
      </label>
      <input
        id="hero-notify-email"
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
    </form>
  );
}

// Clean, Centered Studio Robot Arm
function HeroRobotArm() {
  const { scene } = useGLTF("/models/robot-arm-25kg.glb");
  const j1Ref = useRef<THREE.Object3D | null>(null);
  const j2Ref = useRef<THREE.Object3D | null>(null);
  const j3Ref = useRef<THREE.Object3D | null>(null);
  const j5Ref = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 1.5;
          mat.roughness = Math.max(0.2, mat.roughness ?? 0.3);
          mat.metalness = Math.min(0.9, mat.metalness ?? 0.8);
        }
      }

      if (child.name === "axis_j1_waist") j1Ref.current = child;
      if (child.name === "axis_j2_shoulder") j2Ref.current = child;
      if (child.name === "axis_j3_elbow") j3Ref.current = child;
      if (child.name === "axis_j5_wrist_pitch") j5Ref.current = child;
    });
  }, [scene]);

  // Smooth, subtle natural industrial breathing / scanning motion
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (j1Ref.current) j1Ref.current.rotation.y = Math.sin(t * 0.5) * 0.35;
    if (j2Ref.current) j2Ref.current.rotation.z = 0.15 + Math.sin(t * 0.4) * 0.08;
    if (j3Ref.current) j3Ref.current.rotation.z = -0.25 + Math.cos(t * 0.4) * 0.1;
    if (j5Ref.current) j5Ref.current.rotation.z = Math.sin(t * 0.6) * 0.12;
  });

  return (
    <Center>
      <primitive object={scene} scale={1.3} />
    </Center>
  );
}

useGLTF.preload("/models/robot-arm-25kg.glb");

export const Hero3D = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#0B0C0E] text-white flex flex-col justify-between overflow-hidden">
      {/* Studio Background Ambience & Deep Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F9931F]/10 via-[#F9931F]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0B0C0E] to-transparent pointer-events-none z-10" />

      {/* Main Grid: Left copy & Right 3D viewport */}
      <div className="container mx-auto px-4 lg:px-8 relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 py-12 lg:py-0">
        
        {/* Left Column: Minimalist Stealth Teaser Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1 max-w-xl">
          <MaskedHeading
            as="h1"
            heading={HEADLINE_LINES}
            subhead={SUBHEAD}
            className="font-display font-medium tracking-[-0.02em] text-[clamp(2.6rem,7vw,6.4rem)] leading-[1.02]"
            subheadClassName="font-mono text-sm text-[#878D99] mt-4 mb-10 text-left mx-0"
            variant="white-gold"
            gradientSweep={true}
          />
          <NotifyForm />
        </div>

        {/* Right Column: Pure, High-End 3D Studio Stage */}
        <div className="lg:col-span-7 h-[500px] sm:h-[600px] lg:h-[700px] w-full relative order-1 lg:order-2 flex items-center justify-center">
          
          <div className="relative w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas
              shadows
              camera={{ position: [2.2, 0.4, 3.8], fov: 38 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.1,
              }}
            >
              {/* Studio Lights */}
              <ambientLight intensity={0.6} />
              
              {/* Key Light */}
              <directionalLight
                position={[5, 8, 4]}
                intensity={2.6}
                color="#ffffff"
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-bias={-0.0001}
              />
              
              {/* Sun Robotics Signature Amber Rim Light */}
              <directionalLight
                position={[-5, 3, -3]}
                intensity={3.2}
                color="#F9931F"
              />

              <directionalLight
                position={[0, -3, 3]}
                intensity={0.4}
                color="#778899"
              />

              <Suspense fallback={null}>
                <Environment preset="city" />

                {/* Hero Robot Arm centered in viewport */}
                <HeroRobotArm />

                {/* Subtle, soft floor contact shadow */}
                <ContactShadows
                  position={[0, -1.3, 0]}
                  opacity={0.8}
                  scale={5}
                  blur={1.4}
                  far={3}
                  color="#000000"
                />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
                dampingFactor={0.06}
              />
            </Canvas>
          </div>

          {/* Minimalist interactive hint */}
          <div
            className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.2em] text-[#878D99] pointer-events-none uppercase transition-opacity duration-500"
            aria-hidden
          >
            DRAG TO ROTATE 360°
          </div>
        </div>

      </div>

      {/* Minimalist Telemetry HUD */}
      <div className="relative z-20 font-mono text-[#878D99] py-4 px-4 lg:px-8 border-t border-[#1a1d24]">
        <div className="container mx-auto flex items-center justify-between text-[10px] tracking-[0.2em] uppercase">
          <span>SR-01 // CONFIDENTIAL</span>
          <span className="text-[#F9931F]">REVEAL IMMINENT</span>
        </div>
      </div>
    </section>
  );
};
