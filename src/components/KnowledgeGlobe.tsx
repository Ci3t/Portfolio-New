"use client";

import { skillCategories } from "@/data/skills";
import { OrbitControls, Sparkles, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

const badgePositions = [
  { label: "Next.js", position: [1.3, 0.5, 1.3], className: "border-white/45 text-white" },
  { label: "React.js", position: [-1.5, -0.6, 0.9], className: "border-cyan-400/45 text-cyan-300" },
  { label: "TypeScript", position: [-1.3, 0.8, -1.1], className: "border-blue-400/45 text-blue-300" },
  { label: "Node", position: [0.9, 1.4, -0.9], className: "border-emerald-400/45 text-emerald-300" },
  { label: "MongoDB", position: [1.6, -0.5, -0.9], className: "border-green-400/35 text-green-300" },
  { label: "MySQL", position: [-0.9, -1.5, -0.9], className: "border-yellow-400/40 text-yellow-300" },
  { label: "Stripe", position: [0, -1.3, 1.5], className: "border-violet-400/45 text-violet-300" },
  { label: "OpenAI", position: [-1.6, 0.2, -1.1], className: "border-primary/50 text-primary" },
  { label: "GitHub", position: [1.1, -1.1, 1.1], className: "border-white/40 text-white" },
  { label: "Docker", position: [-0.6, 1.6, 0.6], className: "border-sky-400/45 text-sky-300" },
];

function WireGlobe() {
  const groupRef = useRef<Group>(null);
  const latitudes = useMemo(() => [-60, -40, -20, 0, 20, 40, 60], []);
  const longitudes = useMemo(() => Array.from({ length: 12 }, (_, index) => index * 15), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <group ref={groupRef} scale={1.7}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#00cce0" transparent opacity={0.03} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshBasicMaterial color="#00cce0" wireframe transparent opacity={0.12} />
      </mesh>
      {latitudes.map((lat) => {
        const radius = Math.cos((lat * Math.PI) / 180);
        const y = Math.sin((lat * Math.PI) / 180);
        return (
          <mesh key={lat} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.0025, 8, 180]} />
            <meshBasicMaterial color="#00cce0" transparent opacity={0.32} />
          </mesh>
        );
      })}
      {longitudes.map((angle) => (
        <mesh key={angle} rotation={[0, (angle * Math.PI) / 180, 0]}>
          <torusGeometry args={[1, 0.0025, 8, 180]} />
          <meshBasicMaterial color="#00cce0" transparent opacity={0.24} />
        </mesh>
      ))}
      <mesh rotation={[1.1, 0.25, 0.7]}>
        <torusGeometry args={[1.18, 0.005, 8, 220]} />
        <meshBasicMaterial color="#00cce0" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0.45, -0.75, -0.45]}>
        <torusGeometry args={[1.28, 0.004, 8, 220]} />
        <meshBasicMaterial color="#00cce0" transparent opacity={0.3} />
      </mesh>
      {badgePositions.map((badge, idx) => (
        <group key={idx} position={badge.position as [number, number, number]}>
          <Html center>
            <div
              className={`whitespace-nowrap rounded-full border bg-background/80 px-3 py-1.5 font-mono text-[11px] font-bold shadow-[0_0_22px_rgba(0,204,220,0.1)] backdrop-blur ${badge.className}`}
            >
              {badge.label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

function KnowledgeCoreFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-80 w-80 rounded-full border border-cyan-400/30 bg-cyan-400/5 shadow-[0_0_80px_rgba(0,204,220,0.16)]" />
    </div>
  );
}

export function KnowledgeGlobe() {
  const isTest = process.env.NODE_ENV === "test";

  return (
    <div className="relative h-[640px] w-full overflow-visible">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,204,220,0.08),transparent_50%)]" />

      {isTest ? (
        <KnowledgeCoreFallback />
      ) : (
        <Canvas className="!absolute !inset-0 !h-full !w-full" camera={{ position: [0, 0, 5.5], fov: 40 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 2, 4]} intensity={2.2} color="#00cce0" />
          <pointLight position={[-3, -2, -2]} intensity={1.4} color="#fbbc00" />
          <Sparkles count={130} speed={0.28} scale={6.3} size={1.15} color="#00cce0" />
          <WireGlobe />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      )}

      <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 font-mono text-[11px] text-on-surface-variant/50">
        Drag to rotate
      </div>

      <ul className="sr-only">
        {skillCategories.map((category) => (
          <li key={category.id}>{category.title}</li>
        ))}
      </ul>
    </div>
  );
}
