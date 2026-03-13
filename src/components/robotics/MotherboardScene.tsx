'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Cylinder } from '@react-three/drei';
import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import ScrollCamera from './ScrollCamera';

interface NodeProps {
  position: [number, number, number];
  projectId?: number;
  projectTitle?: string;
  onNodeHover?: (id: number | null) => void;
}

function Node({ position, projectId = 0, projectTitle, onNodeHover }: NodeProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.scale.setScalar(hovered ? 1.5 : 1 + Math.sin(clock.elapsedTime * 2) * 0.1);
    mesh.current.position.z = position[2] + Math.sin(clock.elapsedTime * 1.5) * 0.3;
  });

  const handleHover = (isHovered: boolean) => {
    setHovered(isHovered);
    if (onNodeHover) {
      onNodeHover(isHovered ? projectId : null);
    }
  };

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => handleHover(true)}
      onPointerOut={() => handleHover(false)}
    >
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? '#7C3AED' : '#00FFD5'}
        emissive={hovered ? '#7C3AED' : '#00FFD5'}
        emissiveIntensity={hovered ? 3 : 2}
        wireframe={false}
      />
    </mesh>
  );
}

function CircuitLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];

  return (
    <>
      {/* @ts-ignore */}
      <line>
        {/* @ts-ignore */}
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7C3AED" linewidth={3} transparent opacity={0.8} />
      </line>
    </>
  );
}

function ElectricityFlow({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const cylinderRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!cylinderRef.current) return;
    const material = cylinderRef.current.material as THREE.MeshStandardMaterial;
    if (material) {
      material.opacity = Math.sin(clock.elapsedTime * 3) * 0.5 + 0.3;
    }
  });

  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2) + Math.pow(end[2] - start[2], 2)
  );

  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  const direction = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]).normalize();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  return (
    <mesh ref={cylinderRef} position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.08, 0.08, length, 8]} />
      <meshStandardMaterial color="#00FFD5" emissive="#00FFD5" emissiveIntensity={1} transparent opacity={0.5} />
    </mesh>
  );
}

function Motherboard({ onNodeHover }: { onNodeHover: (id: number | null) => void }) {
  const group = useRef<THREE.Group>(null!);

  // Position nodes in a circuit-like pattern based on 5 projects
  const nodes: [number, number, number][] = [
    [-5, 2, 0],      // Fire Fighting Robot
    [-2.5, -1, 0],   // Gesture Controlled Car
    [0, 3, 0],       // Line Following Robot
    [2.5, -2, 0],    // Environmental Monitor
    [5, 1, 0],       // Health Monitor
  ];

  const connections = [
    [nodes[0], nodes[1]],
    [nodes[1], nodes[2]],
    [nodes[2], nodes[3]],
    [nodes[3], nodes[4]],
    [nodes[0], nodes[2]],
    [nodes[2], nodes[4]],
  ];

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.0003;
    }
  });

  return (
    <group ref={group}>
      {/* Circuit lines */}
      {connections.map((conn, i) => (
        <CircuitLine key={`line-${i}`} start={conn[0]} end={conn[1]} />
      ))}

      {/* Electricity flows */}
      {connections.map((conn, i) => (
        <ElectricityFlow key={`flow-${i}`} start={conn[0]} end={conn[1]} />
      ))}

      {/* Project nodes */}
      <Node position={nodes[0]} projectId={0} projectTitle="Fire Fighting Robot" onNodeHover={onNodeHover} />
      <Node position={nodes[1]} projectId={1} projectTitle="Gesture Controlled Car" onNodeHover={onNodeHover} />
      <Node position={nodes[2]} projectId={2} projectTitle="Line Following Robot" onNodeHover={onNodeHover} />
      <Node position={nodes[3]} projectId={3} projectTitle="Environmental Monitor" onNodeHover={onNodeHover} />
      <Node position={nodes[4]} projectId={4} projectTitle="Health Monitor" onNodeHover={onNodeHover} />
    </group>
  );
}

function SceneContent({ onNodeHover }: { onNodeHover: (id: number | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, 10]} intensity={0.4} color="#7C3AED" />

      <Motherboard onNodeHover={onNodeHover} />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <ScrollCamera />
    </>
  );
}

export default function MotherboardScene() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <section id="3d-projects" className="relative w-full h-screen bg-[#0B0F1A] overflow-hidden">
      <Suspense fallback={<div className="w-full h-full bg-[#0B0F1A]" />}>
        <Canvas camera={{ position: [0, 2, 10], fov: 60 }} style={{ width: '100%', height: '100%' }}>
          <SceneContent onNodeHover={setHoveredNode} />
        </Canvas>
      </Suspense>

      {/* Overlay information */}
      <div className="absolute top-0 left-0 right-0 p-8 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#00FFD5] mb-2">
            <span className="text-[#00FFD5]">{'[ '}</span>
            Projects Motherboard
            <span className="text-[#00FFD5]">{' ]'}</span>
          </h2>
          <p className="text-[#B0B4C8] font-mono text-sm">
            <span className="text-[#00FFD5]"># </span>
            Hover over nodes to explore projects • Scroll to navigate
          </p>
        </div>
      </div>

      {/* Hovered project info */}
      {hoveredNode !== null && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/80 to-transparent p-8 pointer-events-none">
          <div className="max-w-2xl mx-auto">
            <div className="text-[#00FFD5] font-mono text-sm mb-2">
              {'> Project Node Active'}
            </div>
            <p className="text-[#E5E7EB] text-lg">
              {['Fire Fighting Robot', 'Gesture Controlled Car', 'Line Following Robot', 'Environmental Monitor', 'Health Monitor'][hoveredNode]}
            </p>
          </div>
        </div>
      )}

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
        <p className="text-[#B0B4C8] text-sm font-mono">
          <span className="text-[#00FFD5]">→</span> Scroll down to explore more
        </p>
        <div className="animate-bounce mt-2">
          <svg className="w-5 h-5 text-[#00FFD5] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
