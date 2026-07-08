"use client";

import { skillCategories } from "@/data/skills";
import { OrbitControls, Sparkles, Html, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CatmullRomCurve3, Vector3 } from "three";
import type { Group } from "three";

type MarkerTone = "cyan" | "green" | "white";

interface TechMarkerData {
  label: string;
  lat: number;
  lon: number;
  altitude: number;
  tone: MarkerTone;
}

const markerTone: Record<MarkerTone, { color: string; className: string }> = {
  cyan: {
    color: "#67e8f9",
    className: "border-cyan-300/50 text-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.18)]",
  },
  green: {
    color: "#39d353",
    className: "border-success/50 text-success shadow-[0_0_18px_rgba(57,211,83,0.18)]",
  },
  white: {
    color: "#f8f8f8",
    className: "border-white/45 text-white shadow-[0_0_18px_rgba(248,248,248,0.1)]",
  },
};

const techMarkers: TechMarkerData[] = [
  { label: "Next.js", lat: 30, lon: -36, altitude: 1.34, tone: "white" },
  { label: "React.js", lat: -5, lon: 36, altitude: 1.38, tone: "cyan" },
  { label: "TypeScript", lat: 22, lon: 112, altitude: 1.42, tone: "cyan" },
  { label: "Node", lat: 50, lon: -140, altitude: 1.36, tone: "green" },
  { label: "MongoDB", lat: -18, lon: -118, altitude: 1.35, tone: "green" },
  { label: "MySQL", lat: -48, lon: 56, altitude: 1.32, tone: "cyan" },
  { label: "PostgreSQL", lat: 42, lon: 34, altitude: 1.4, tone: "green" },
  { label: "Stripe", lat: -32, lon: -20, altitude: 1.46, tone: "white" },
  { label: "OpenAI", lat: 8, lon: 150, altitude: 1.42, tone: "green" },
  { label: "GitHub", lat: -34, lon: -62, altitude: 1.36, tone: "white" },
  { label: "Docker", lat: 58, lon: 62, altitude: 1.36, tone: "cyan" },
];

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;

  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function TechMarker({ marker, index }: { marker: TechMarkerData; index: number }) {
  const tone = markerTone[marker.tone];
  const surface = useMemo(() => latLonToVector3(marker.lat, marker.lon, 1.03), [marker.lat, marker.lon]);
  const labelPosition = useMemo(
    () => latLonToVector3(marker.lat, marker.lon, marker.altitude),
    [marker.altitude, marker.lat, marker.lon]
  );
  const arcPoints = useMemo(() => {
    const mid = surface.clone().lerp(labelPosition, 0.5).normalize().multiplyScalar(marker.altitude + 0.16);
    return new CatmullRomCurve3([surface, mid, labelPosition]).getPoints(20);
  }, [labelPosition, marker.altitude, surface]);

  return (
    <group>
      <Line points={arcPoints} color={tone.color} transparent opacity={0.42} lineWidth={1} />
      <Line
        points={[surface.clone().multiplyScalar(0.96), surface.clone().multiplyScalar(1.09)]}
        color={tone.color}
        transparent
        opacity={0.64}
        lineWidth={1.35}
      />
      <mesh position={surface}>
        <sphereGeometry args={[0.026, 18, 18]} />
        <meshBasicMaterial color={tone.color} />
      </mesh>
      <mesh position={surface} scale={1 + (index % 3) * 0.12}>
        <sphereGeometry args={[0.055, 18, 18]} />
        <meshBasicMaterial color={tone.color} transparent opacity={0.12} />
      </mesh>
      <mesh position={labelPosition}>
        <sphereGeometry args={[0.017, 14, 14]} />
        <meshBasicMaterial color={tone.color} />
      </mesh>
      <Html center position={labelPosition.toArray()}>
        <div
          className={`group relative cursor-pointer whitespace-nowrap rounded-full border bg-background/85 px-3 py-1.5 font-mono text-[11px] font-bold backdrop-blur transition-all duration-300 hover:scale-125 hover:bg-black ${tone.className}`}
        >
          <span className="mr-1 text-[9px] opacity-50">LOC.{String(index + 1).padStart(2, "0")}</span>
          {marker.label}
          <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-terminal-dim bg-black px-2 py-1 text-[9px] text-on-surface opacity-0 transition-opacity group-hover:opacity-100">
            Launch node locked
          </div>
        </div>
      </Html>
    </group>
  );
}

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
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.03} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.12} />
      </mesh>
      {latitudes.map((lat) => {
        const radius = Math.cos((lat * Math.PI) / 180);
        const y = Math.sin((lat * Math.PI) / 180);
        return (
          <mesh key={lat} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.0025, 8, 180]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.32} />
          </mesh>
        );
      })}
      {longitudes.map((angle) => (
        <mesh key={angle} rotation={[0, (angle * Math.PI) / 180, 0]}>
          <torusGeometry args={[1, 0.0025, 8, 180]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.24} />
        </mesh>
      ))}
      <mesh rotation={[1.1, 0.25, 0.7]}>
        <torusGeometry args={[1.18, 0.005, 8, 220]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0.45, -0.75, -0.45]}>
        <torusGeometry args={[1.28, 0.004, 8, 220]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.3} />
      </mesh>
      {techMarkers.map((marker, index) => (
        <TechMarker key={marker.label} marker={marker} index={index} />
      ))}
    </group>
  );
}

function KnowledgeCoreFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-80 w-80 rounded-full border border-cyan-400/30 bg-cyan-400/5 shadow-[0_0_80px_rgba(6,182,212,0.16)]" />
    </div>
  );
}

export function KnowledgeGlobe() {
  const isTest = process.env.NODE_ENV === "test";

  return (
    <div className="relative h-[640px] w-full overflow-visible">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08),transparent_50%)]" />

      {isTest ? (
        <KnowledgeCoreFallback />
      ) : (
        <Canvas className="!absolute !inset-0 !h-full !w-full" camera={{ position: [0, 0, 5.5], fov: 40 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 2, 4]} intensity={2.2} color="#06b6d4" />
          <pointLight position={[-3, -2, -2]} intensity={1.4} color="#06b6d4" />
          <Sparkles count={130} speed={0.28} scale={6.3} size={1.15} color="#67e8f9" />
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

