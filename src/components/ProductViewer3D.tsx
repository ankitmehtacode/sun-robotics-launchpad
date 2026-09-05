import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Center, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { RotateCw } from "lucide-react";

interface ProductModelProps {
  modelPath: string;
  scale?: number;
}

function ProductModel({ modelPath, scale = 1.3 }: ProductModelProps) {
  const { scene } = useGLTF(modelPath);

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
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  );
}

function ViewerLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

interface ProductViewer3DProps {
  modelPath: string;
  scale?: number;
  className?: string;
}

export function ProductViewer3D({ modelPath, scale, className = "" }: ProductViewer3DProps) {
  const [isDragging, setIsDragging] = useState(false);
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
  }, []);

  return (
    <div className={`relative w-full h-full cursor-grab active:cursor-grabbing ${className}`}>
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
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 4]}
          intensity={2.6}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-5, 3, -3]} intensity={3.2} color="#F9931F" />
        <directionalLight position={[0, -3, 3]} intensity={0.4} color="#778899" />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <ProductModel modelPath={modelPath} scale={scale} />
          <ContactShadows position={[0, -1.3, 0]} opacity={0.8} scale={5} blur={1.4} far={3} color="#000000" />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          minDistance={2.4}
          maxDistance={6}
          enablePan={false}
          autoRotate={!isDragging}
          autoRotateSpeed={1.8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          dampingFactor={0.06}
          onStart={() => {
            if (idleTimeout.current) clearTimeout(idleTimeout.current);
            setIsDragging(true);
          }}
          onEnd={() => {
            idleTimeout.current = setTimeout(() => setIsDragging(false), 2500);
          }}
        />
      </Canvas>

      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-white/50 pointer-events-none uppercase">
        <RotateCw className="w-3 h-3" />
        <span>Drag to rotate</span>
      </div>
    </div>
  );
}

export function preloadProductModel(modelPath: string) {
  useGLTF.preload(modelPath);
}
