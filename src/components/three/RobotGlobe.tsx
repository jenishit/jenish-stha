"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls, Stars, Html, Line } from "@react-three/drei";
import * as THREE from "three";

const projectPins = [
  { lat: 27.7, lon: 85.3, label: "Kathmandu HQ", color: "#C0392B" },
  { lat: 28.2, lon: 83.9, label: "Pokhara Field Test", color: "#8B7355" },
  { lat: 26.9, lon: 80.9, label: "Lucknow Expo", color: "#C0392B" },
];

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const globeTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Deep ocean base
    ctx.fillStyle = "#0D0A09";
    ctx.fillRect(0, 0, 1024, 512);

    // Grid lines
    ctx.strokeStyle = "rgba(192,57,43,0.15)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 18; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (i / 18) * 512);
      ctx.lineTo(1024, (i / 18) * 512);
      ctx.stroke();
    }
    for (let i = 0; i <= 36; i++) {
      ctx.beginPath();
      ctx.moveTo((i / 36) * 1024, 0);
      ctx.lineTo((i / 36) * 1024, 512);
      ctx.stroke();
    }

    // Land masses (simplified)
    ctx.fillStyle = "rgba(139,115,85,0.4)";
    // Asia/Nepal region
    ctx.fillRect(580, 120, 200, 120);
    // Europe
    ctx.fillRect(470, 80, 100, 80);
    // Africa
    ctx.fillRect(470, 160, 80, 140);
    // Americas
    ctx.fillRect(200, 80, 120, 200);
    // Highlight Nepal
    ctx.fillStyle = "rgba(192,57,43,0.6)";
    ctx.fillRect(650, 155, 20, 15);

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.1;
    if (glowRef.current) glowRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group>
      {/* Core globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={globeTexture}
          metalness={0.1}
          roughness={0.8}
          emissive={new THREE.Color("#C0392B")}
          emissiveIntensity={0.02}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={glowRef} scale={1.05}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#C0392B"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer atmosphere */}
      <mesh scale={1.12}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#8B7355"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Project pins */}
      {projectPins.map((pin) => {
        const pos = latLonToVec3(pin.lat, pin.lon, 2.05);
        return (
          <group key={pin.label} position={pos}>
            <mesh>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color={pin.color} />
            </mesh>
            <Html distanceFactor={6} style={{ pointerEvents: "none" }}>
              <div className="bg-surface/90 border border-accent-red px-2 py-1 rounded text-[9px] font-mono text-accent-red whitespace-nowrap">
                {pin.label}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function LowPolyRobot() {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time.current * 0.8) * 0.1;
      groupRef.current.rotation.y = Math.sin(time.current * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[3.2, -0.5, 0]} scale={0.5}>
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.8, 1, 0.5]} />
        <meshStandardMaterial color="#1A1412" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.5]} />
        <meshStandardMaterial color="#221C1A" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.15, 1.65, 0.26]}>
        <boxGeometry args={[0.12, 0.08, 0.02]} />
        <meshBasicMaterial color="#C0392B" />
      </mesh>
      <mesh position={[0.15, 1.65, 0.26]}>
        <boxGeometry args={[0.12, 0.08, 0.02]} />
        <meshBasicMaterial color="#C0392B" />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.6, 0.8, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <meshStandardMaterial color="#2A2320" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Right arm - waving */}
      <mesh position={[0.6, 1.0, 0]} rotation={[0, 0, -0.8]}>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <meshStandardMaterial color="#2A2320" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.22, 0.1, 0]}>
        <boxGeometry args={[0.25, 0.7, 0.25]} />
        <meshStandardMaterial color="#1A1412" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.22, 0.1, 0]}>
        <boxGeometry args={[0.25, 0.7, 0.25]} />
        <meshStandardMaterial color="#1A1412" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Chest detail */}
      <mesh position={[0, 0.85, 0.26]}>
        <boxGeometry args={[0.4, 0.3, 0.02]} />
        <meshBasicMaterial color="#C0392B" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function RobotGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#F0EDE8" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#C0392B" />
      <spotLight position={[5, 5, 5]} intensity={0.8} color="#8B7355" />

      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />

      <Globe />
      <LowPolyRobot />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.8}
        minPolarAngle={Math.PI * 0.2}
      />
    </Canvas>
  );
}
