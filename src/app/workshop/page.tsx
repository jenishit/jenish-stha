"use client";
/**
 * Iron Man Mark L — Workshop Page
 * Place your model at:  public/models/ironman.glb
 *
 * HOW THE ASSEMBLY ANIMATION WORKS (important to understand):
 *
 * We use an ADDITIVE OFFSET approach:
 *   mesh.position = origPos + flyOffset * (1 - ease(lp))
 *
 * At lp=0 → flyOffset * 1 → mesh is far away (spawn position)
 * At lp=1 → flyOffset * 0 → mesh is EXACTLY at origPos (assembled)
 *
 * This is mathematically guaranteed to reach the final position.
 * No overshoot. No lerp-between-two-points. No floating in the air.
 *
 * We do NOT rotate individual meshes — only translate them.
 * Rotation during flight looks chaotic and causes orientation bugs.
 */

import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { motion, useScroll } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stars, Environment } from "@react-three/drei";
import * as THREE from "three";
import SectionHeading from "@/components/ui/SectionHeading";

// ─── Pure math, no overshoot ──────────────────────────────────────────────────
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// easeOutQuart: fast start, gentle landing, NEVER goes above 1.0
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 4);
}

// Simple linear lerp for camera and idle
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// ─── Audio Engine ─────────────────────────────────────────────────────────────
class SuitAudio {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;

  init() {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.55;
    this.master.connect(this.ctx.destination);
  }

  snap() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    // Metallic clank
    const len = Math.floor(this.ctx.sampleRate * 0.22);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const ch  = buf.getChannelData(0);
    for (let i = 0; i < len; i++)
      ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.3);
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const bpf = this.ctx.createBiquadFilter();
    bpf.type = "bandpass"; bpf.frequency.value = 1600 + Math.random() * 700; bpf.Q.value = 1.2;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.9, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    src.connect(bpf); bpf.connect(g); g.connect(this.master!);
    src.start(now); src.stop(now + 0.24);
    // Low thud
    const osc = this.ctx.createOscillator();
    osc.frequency.setValueAtTime(110, now); osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
    const og = this.ctx.createGain();
    og.gain.setValueAtTime(0.6, now); og.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(og); og.connect(this.master!); osc.start(now); osc.stop(now + 0.14);
  }

  whoosh() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    const len = Math.floor(this.ctx.sampleRate * 0.45);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const ch  = buf.getChannelData(0);
    for (let i = 0; i < len; i++)
      ch[i] = (Math.random() * 2 - 1) * Math.sin((i / len) * Math.PI) * 0.55;
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const lpf = this.ctx.createBiquadFilter(); lpf.type = "lowpass";
    lpf.frequency.setValueAtTime(5000, now); lpf.frequency.exponentialRampToValueAtTime(250, now + 0.45);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.28, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    src.connect(lpf); lpf.connect(g); g.connect(this.master!); src.start(now); src.stop(now + 0.48);
  }

  powerOn() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator(); osc.type = "sawtooth";
    osc.frequency.setValueAtTime(50, now); osc.frequency.exponentialRampToValueAtTime(580, now + 1.5);
    const flt = this.ctx.createBiquadFilter(); flt.type = "lowpass";
    flt.frequency.setValueAtTime(150, now); flt.frequency.exponentialRampToValueAtTime(3500, now + 1.5);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(0.5, now + 0.25);
    g.gain.setValueAtTime(0.5, now + 1.1); g.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
    osc.connect(flt); flt.connect(g); g.connect(this.master!); osc.start(now); osc.stop(now + 2.3);
    // Arc reactor hum
    const hum = this.ctx.createOscillator(); hum.frequency.value = 120;
    const hg  = this.ctx.createGain();
    hg.gain.setValueAtTime(0, now + 1.0); hg.gain.linearRampToValueAtTime(0.2, now + 1.6);
    hg.gain.setValueAtTime(0.2, now + 3.0); hg.gain.linearRampToValueAtTime(0, now + 4.2);
    hum.connect(hg); hg.connect(this.master!); hum.start(now + 1.0); hum.stop(now + 4.3);
  }

  destroy() { this.ctx?.close(); this.ctx = null; this.master = null; }
}
const suitAudio = new SuitAudio();

// ─── Welding sparks ───────────────────────────────────────────────────────────
function Sparks({ active, pos }: { active: boolean; pos: THREE.Vector3 }) {
  const ref  = useRef<THREE.Points>(null);
  const N    = 160;
  const vel  = useRef(new Float32Array(N * 3));
  const ages = useRef(new Float32Array(N));
  const arr  = useRef(new Float32Array(N * 3));

  useEffect(() => {
    for (let i = 0; i < N; i++) {
      arr.current[i*3]   = pos.x;
      arr.current[i*3+1] = pos.y;
      arr.current[i*3+2] = pos.z;
      vel.current[i*3]   = (Math.random() - 0.5) * 0.32;
      vel.current[i*3+1] = Math.random() * 0.44 + 0.06;
      vel.current[i*3+2] = (Math.random() - 0.5) * 0.32;
      ages.current[i]    = Math.random();
    }
  }, [pos.x, pos.y, pos.z]);

  useFrame((_, dt) => {
    if (!active || !ref.current) return;
    const p = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      ages.current[i] += dt * 2.8;
      if (ages.current[i] > 1) {
        p[i*3]=pos.x; p[i*3+1]=pos.y; p[i*3+2]=pos.z;
        vel.current[i*3]   = (Math.random()-0.5)*0.32;
        vel.current[i*3+1] = Math.random()*0.44+0.06;
        vel.current[i*3+2] = (Math.random()-0.5)*0.32;
        ages.current[i] = 0;
      }
      p[i*3]   += vel.current[i*3]   * dt * 18;
      p[i*3+1] += vel.current[i*3+1] * dt * 18 - 0.022;
      p[i*3+2] += vel.current[i*3+2] * dt * 18;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!active) return null;
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[arr.current, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FFD740" size={0.06} transparent opacity={0.95} sizeAttenuation />
    </points>
  );
}

// ─── Assembly slice definitions ───────────────────────────────────────────────
//
// normYMin / normYMax : band of normalised Y (0=feet, 1=head) this slice owns
// flyDir             : world-space direction the parts fly IN FROM
//                      (large values = starts far away, more dramatic)
// scrollStart/End    : when in the 0→1 scroll range this slice animates
//
const SLICES = [
  { id:"boots",     label:"Boot Thrusters",    desc:"Repulsor jets · Mag-lock sole",       yLo:0.00, yHi:0.13, flyDir:new THREE.Vector3(  0,-30,  0), ss:0.00, se:0.10 },
  { id:"shins",     label:"Lower Legs",         desc:"Carbon fibre · Shock absorber",       yLo:0.13, yHi:0.28, flyDir:new THREE.Vector3(-20,-16,  5), ss:0.09, se:0.19 },
  { id:"knees",     label:"Knee Assemblies",    desc:"Hydraulic joint · Servo motor",       yLo:0.28, yHi:0.38, flyDir:new THREE.Vector3( 20, -8,  5), ss:0.17, se:0.27 },
  { id:"thighs",    label:"Upper Legs",         desc:"Servo-hydraulic · Titanium alloy",    yLo:0.38, yHi:0.50, flyDir:new THREE.Vector3(-22,  0, -5), ss:0.25, se:0.35 },
  { id:"pelvis",    label:"Pelvic Core",        desc:"Structural load-bearing frame",       yLo:0.50, yHi:0.58, flyDir:new THREE.Vector3(  0,-20, -8), ss:0.33, se:0.43 },
  { id:"abdomen",   label:"Abdomen Plate",      desc:"Nano-fiber composite armour",         yLo:0.58, yHi:0.66, flyDir:new THREE.Vector3( 22,  4, -5), ss:0.40, se:0.50 },
  { id:"chest",     label:"Chest Plate",        desc:"Arc reactor housing · Nano-fiber",    yLo:0.66, yHi:0.76, flyDir:new THREE.Vector3(  0, 30,  0), ss:0.48, se:0.58 },
  { id:"arms",      label:"Arm Assemblies",     desc:"Bicep + forearm · Elbow hinge",       yLo:0.55, yHi:0.72, flyDir:new THREE.Vector3(-24,  8,-10), ss:0.55, se:0.65 },
  { id:"shoulders", label:"Shoulder Pauldrons", desc:"270° rotary actuators",               yLo:0.72, yHi:0.82, flyDir:new THREE.Vector3( 24, 14,  0), ss:0.62, se:0.72 },
  { id:"hands",     label:"Gauntlets",          desc:"Palm repulsor · 5-digit servo",       yLo:0.30, yHi:0.48, flyDir:new THREE.Vector3(-24, -4, 12), ss:0.68, se:0.78 },
  { id:"neck",      label:"Neck Collar",        desc:"360° gyro-stabilised ring",           yLo:0.82, yHi:0.88, flyDir:new THREE.Vector3(  0, 24,  8), ss:0.76, se:0.86 },
  { id:"helmet",    label:"Helmet",             desc:"HUD · AI core · Vision array",        yLo:0.88, yHi:1.00, flyDir:new THREE.Vector3(  0, 40,  0), ss:0.84, se:0.96 },
] as const;

// ─── The Iron Man model component ─────────────────────────────────────────────
function IronManModel({
  progress,
  onSnap,
  onComplete,
}: {
  progress:   number;
  onSnap:     (id: string) => void;
  onComplete: () => void;
}) {
  const { scene } = useGLTF("/models/ironman.glb") as any;

  // ── Data per mesh ──────────────────────────────────────────────────────────
  type MeshData = {
    mesh:     THREE.Mesh;
    origPos:  THREE.Vector3;  // local position in assembled state
    flyVec:   THREE.Vector3;  // WORLD-SPACE direction it flies in from (local coords)
    sliceIdx: number;
  };

  const meshData      = useRef<MeshData[]>([]);
  const rootRef       = useRef<THREE.Group>(null);
  const idleT         = useRef(0);
  const isSetup       = useRef(false);
  const snappedSlices = useRef(new Set<string>());
  const completeFired = useRef(false);

  // ── One-time setup: scale model, compute origPos and flyVec per mesh ───────
  useEffect(() => {
    if (!scene || isSetup.current) return;
    isSetup.current = true;

    // ── 1. Scale model so its tallest dimension = 5 world units ──────────────
    const box0   = new THREE.Box3().setFromObject(scene);
    const size0  = box0.getSize(new THREE.Vector3());
    const maxDim = Math.max(size0.x, size0.y, size0.z);
    const scale  = 5.0 / (maxDim || 1);
    scene.scale.setScalar(scale);

    // ── 2. Recompute bounding box after scaling and centre the model ──────────
    // Feet on y=0, centred on x and z
    const box1   = new THREE.Box3().setFromObject(scene);
    const cen1   = box1.getCenter(new THREE.Vector3());
    scene.position.set(-cen1.x, -box1.min.y, -cen1.z);
    scene.updateMatrixWorld(true);

    // ── 3. Get total Y extent (world space) for normalising ────────────────
    const box2     = new THREE.Box3().setFromObject(scene);
    const totalMinY = box2.min.y;
    const totalH    = (box2.max.y - box2.min.y) || 1;

    // ── 4. Walk every Mesh, assign to a slice, record origPos and flyVec ─────
    const newData: MeshData[] = [];

    scene.traverse((obj: THREE.Object3D) => {
      if (!(obj instanceof THREE.Mesh)) return;

      // World-space bounding centre of this mesh
      const mb = new THREE.Box3().setFromObject(obj);
      if (mb.isEmpty()) return;
      const mc   = mb.getCenter(new THREE.Vector3());
      const ms   = mb.getSize(new THREE.Vector3());

      // Normalised Y position of this mesh (0=feet 1=head)
      const normY = (mc.y - totalMinY) / totalH;

      // Arms and hands are wide at mid-height — detect them by x-extent
      const wideAtMid = ms.x > totalH * 0.11;
      const isArm     = wideAtMid && normY > 0.52 && normY < 0.74;
      const isHand    = wideAtMid && normY > 0.30 && normY < 0.52;

      // Find which slice owns this mesh
      let sliceIdx = SLICES.length - 1; // default to helmet (last)
      if (isArm) {
        sliceIdx = SLICES.findIndex(s => s.id === "arms");
      } else if (isHand) {
        sliceIdx = SLICES.findIndex(s => s.id === "hands");
      } else {
        for (let i = 0; i < SLICES.length; i++) {
          if (normY >= SLICES[i].yLo && normY < SLICES[i].yHi) {
            sliceIdx = i;
            break;
          }
        }
      }

      // origPos = mesh's LOCAL position in its assembled state
      const origPos = obj.position.clone();

      // Convert the world-space flyDir to LOCAL space of this mesh's parent
      // so the offset is consistent regardless of nested transforms.
      // We divide by scale (the root scale factor).
      const invScale = 1 / scale;
      const flyVec   = SLICES[sliceIdx].flyDir.clone().multiplyScalar(invScale);

      newData.push({ mesh: obj as THREE.Mesh, origPos, flyVec, sliceIdx });
    });

    meshData.current = newData;

    // ── 5. Initially hide all meshes at their spawn positions ─────────────────
    for (const d of newData) {
      // Place mesh at spawn = origPos + full flyVec
      d.mesh.position.copy(d.origPos).add(d.flyVec);
      d.mesh.visible = false;
    }

  }, [scene]);

  // ── Per-frame: apply additive offset based on scroll progress ─────────────
  useFrame((_, dt) => {
    if (!scene || meshData.current.length === 0) return;
    idleT.current += dt;

    const allDone = progress >= 1.0;

    // Root group: idle float when complete, static during assembly
    if (rootRef.current) {
      if (allDone) {
        rootRef.current.position.y = lerp(
          rootRef.current.position.y,
          Math.sin(idleT.current * 0.55) * 0.1,
          0.03
        );
        rootRef.current.rotation.y = Math.sin(idleT.current * 0.35) * 0.12;
      } else {
        rootRef.current.position.y = lerp(rootRef.current.position.y, 0, 0.06);
        rootRef.current.rotation.y = lerp(rootRef.current.rotation.y, 0, 0.06);
      }
    }

    // Animate each mesh
    for (const d of meshData.current) {
      const sl = SLICES[d.sliceIdx];

      // Local progress for this slice: 0 = not started, 1 = fully arrived
      const lp = clamp(
        (progress - sl.ss) / (sl.se - sl.ss),
        0,
        1
      );

      // ── Not yet activated: keep at spawn, hidden ──────────────────────────
      if (lp <= 0) {
        d.mesh.visible = false;
        d.mesh.position.copy(d.origPos).add(d.flyVec); // keep at spawn
        continue;
      }

      // ── Active: show, apply diminishing offset ────────────────────────────
      d.mesh.visible = true;

      // THE KEY FORMULA:
      //   position = origPos + flyVec * (1 - ease(lp))
      //
      // lp=0 → position = origPos + flyVec   (at spawn, far away)
      // lp=1 → position = origPos + 0         (exactly assembled)
      //
      // easeOutQuart NEVER exceeds 1.0, so (1 - ease) is always >= 0
      // and the mesh ALWAYS ends up exactly at origPos when lp=1.
      const factor = 1 - easeOutQuart(lp);  // 1 → 0 as lp goes 0 → 1
      d.mesh.position
        .copy(d.origPos)
        .addScaledVector(d.flyVec, factor);

      // Keep original rotation throughout (no individual mesh spinning)
      // This ensures the part arrives in the correct orientation
    }

    // ── Fire snap sound once per slice when it arrives ────────────────────
    for (const sl of SLICES) {
      const lp = clamp((progress - sl.ss) / (sl.se - sl.ss), 0, 1);
      if (lp >= 0.90 && !snappedSlices.current.has(sl.id)) {
        snappedSlices.current.add(sl.id);
        onSnap(sl.id);
      }
    }

    // ── Fire completion once ──────────────────────────────────────────────
    if (allDone && !completeFired.current) {
      completeFired.current = true;
      onComplete();
    }
  });

  if (!scene) return null;

  return (
    <group ref={rootRef}>
      <primitive object={scene} dispose={null} />

      {/* Sparks burst at each slice's snap point */}
      {SLICES.map(sl => {
        const lp     = clamp((progress - sl.ss) / (sl.se - sl.ss), 0, 1);
        const active = lp > 0.72 && lp < 0.99;
        const sparkY = ((sl.yLo + sl.yHi) / 2) * 5 - 0.4;
        return (
          <Sparks
            key={sl.id}
            active={active}
            pos={new THREE.Vector3(0, sparkY, 0.5)}
          />
        );
      })}
    </group>
  );
}

// ─── Snap flash light ─────────────────────────────────────────────────────────
function SnapFlash({ trigger }: { trigger: number }) {
  const ref  = useRef<THREE.PointLight>(null);
  const prev = useRef(0);
  useFrame(() => {
    if (!ref.current) return;
    if (trigger !== prev.current) { prev.current = trigger; ref.current.intensity = 14; }
    if (ref.current.intensity > 0) ref.current.intensity = Math.max(0, ref.current.intensity - 0.9);
  });
  return <pointLight ref={ref} color="#FFD740" intensity={0} distance={7} />;
}

// ─── Animated floor rings ─────────────────────────────────────────────────────
function FloorRings({ done }: { done: boolean }) {
  const gRef = useRef<THREE.Group>(null);
  const t    = useRef(0);
  useFrame((_, dt) => {
    t.current += dt;
    if (gRef.current) gRef.current.rotation.z = t.current * 0.28;
  });
  return (
    <group position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <group ref={gRef}>
        {[1.2, 2.0, 3.0, 4.2].map((r, i) => (
          <mesh key={i}>
            <ringGeometry args={[r, r + 0.022, 96]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#C0392B" : "#D4A017"}
              transparent
              opacity={done ? 0.52 - i * 0.07 : 0.18 - i * 0.03}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ─── Camera drifts in as assembly completes ───────────────────────────────────
function CameraRig({ progress }: { progress: number }) {
  useFrame(({ camera }) => {
    const tz = lerp(17, 9, easeOutQuart(progress));
    const ty = lerp(4,  2, easeOutQuart(progress));
    camera.position.z = lerp(camera.position.z, tz, 0.022);
    camera.position.y = lerp(camera.position.y, ty, 0.022);
    camera.lookAt(0, 2, 0);
  });
  return null;
}

// ─── Hologram while GLB loads ─────────────────────────────────────────────────
function Hologram() {
  const ref = useRef<THREE.Group>(null);
  const t   = useRef(0);
  useFrame((_, dt) => {
    t.current += dt;
    if (ref.current) ref.current.rotation.y = t.current * 0.5;
  });
  return (
    <group ref={ref} position={[0, 2, 0]}>
      {[1.3, 0].map((r, i) => (
        <mesh key={i} rotation={i === 1 ? [Math.PI/2, 0, 0] : [0, 0, 0]}>
          <torusGeometry args={[1.3, 0.025, 8, 80]} />
          <meshBasicMaterial
            color={i === 0 ? "#40C4FF" : "#C0392B"}
            transparent opacity={0.5 - i * 0.05}
          />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.75, 14, 14]} />
        <meshBasicMaterial color="#0A0808" transparent opacity={0.3} wireframe />
      </mesh>
      <pointLight color="#40C4FF" intensity={2.5} distance={5} />
    </group>
  );
}

// ─── Full 3D scene ────────────────────────────────────────────────────────────
function WorkshopScene({
  progress,
  onSnap,
  onComplete,
}: {
  progress:   number;
  onSnap:     (id: string) => void;
  onComplete: () => void;
}) {
  const [snapTrig, setSnapTrig] = useState(0);
  const done = progress >= 1;

  const handleSnap = useCallback((id: string) => {
    setSnapTrig(n => n + 1);
    onSnap(id);
  }, [onSnap]);

  return (
    <Canvas
      camera={{ position: [0, 4, 17], fov: 48 }}
      style={{ width: "100%", height: "100%" }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
      }}
      shadows
    >
      {/* ── Cinematic 5-point lighting ── */}
      <ambientLight intensity={0.08} />
      <spotLight
        position={[3, 16, 10]} intensity={done ? 8 : 4}
        color="#FFF5E0" angle={0.28} penumbra={0.75} castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-10, 5, 5]}  intensity={1.6} color="#1A5FC8" />
      <pointLight position={[ 10, 4, -6]} intensity={1.4} color="#C9960C" />
      <pointLight position={[  0,-10, 5]} intensity={done ? 7 : 1.5} color="#B71C1C" distance={24} />
      <pointLight position={[  0, 8,-12]} intensity={0.9} color="#B0BEC5" />
      <SnapFlash trigger={snapTrig} />

      {/* HDRI: realistic metal reflections */}
      <Environment preset="warehouse" />

      <Stars radius={100} depth={60} count={4000} factor={4} fade speed={0.2} />

      {/* Floor */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[8, 72]} />
        <meshStandardMaterial color="#080606" metalness={0.5} roughness={0.7} />
      </mesh>
      <FloorRings done={done} />

      <CameraRig progress={progress} />

      <Suspense fallback={<Hologram />}>
        <IronManModel
          progress={progress}
          onSnap={handleSnap}
          onComplete={onComplete}
        />
      </Suspense>

      {/* OrbitControls: NO autoRotate (that was causing unwanted spinning) */}
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={4}
        maxDistance={24}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.8}
        minPolarAngle={Math.PI * 0.04}
        target={[0, 2.2, 0]}
      />
    </Canvas>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WorkshopPage() {
  const containerRef            = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [audioReady, setAudioReady] = useState(false);
  const [isDone, setIsDone]     = useState(false);
  const { scrollYProgress }     = useScroll({ target: containerRef });

  // Map scroll 0→0.88 to progress 0→1
  // (leaving 12% at the bottom so user can read the completed suit before scrolling away)
  useEffect(() =>
    scrollYProgress.on("change", v => setProgress(clamp(v / 0.88, 0, 1))),
    [scrollYProgress]
  );

  const initAudio = useCallback(() => {
    if (!audioReady) { suitAudio.init(); setAudioReady(true); }
  }, [audioReady]);

  const handleSnap = useCallback((id: string) => {
    if (!audioReady) return;
    suitAudio.snap();
    if (Math.random() > 0.45) suitAudio.whoosh();
  }, [audioReady]);

  const handleComplete = useCallback(() => {
    setIsDone(true);
    if (audioReady) suitAudio.powerOn();
  }, [audioReady]);

  useEffect(() => () => suitAudio.destroy(), []);

  const pct = Math.round(progress * 100);

  // Which slice is currently flying in? (the most recently started one)
  const activeSlice = [...SLICES]
    .reverse()
    .find(sl => progress >= sl.ss) ?? SLICES[0];

  return (
    <div ref={containerRef} className="bg-background" onClick={initAudio}>

      {/* ── Sticky 3D viewport ─────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden z-10">
        <div className="h-full flex flex-col pt-20">

          {/* Header */}
          <div className="px-6 pt-3 pb-0 flex items-start justify-between shrink-0">
            <div>
              <p className="section-tag">{'// workshop.3d — MARK L SUIT-UP'}</p>
              <h1 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-none mt-1">
                BUILD LAB
              </h1>
            </div>
            <div className="glass border border-border p-3 font-mono text-xs text-right min-w-[215px]">
              <p className="text-[9px] text-text-muted tracking-widest mb-0.5">J.A.R.V.I.S.</p>
              <p className={isDone ? "text-green-400" : "text-accent-red"}>
                {isDone
                  ? "● MARK L ONLINE"
                  : progress === 0
                  ? "● AWAITING DEPLOYMENT"
                  : `● DEPLOYING ${pct}%`}
              </p>
              {!isDone && progress > 0 && (
                <p className="text-[9px] text-text-muted mt-0.5">{activeSlice.label}</p>
              )}
              {!audioReady && (
                <p className="text-[9px] text-yellow-400 mt-1 animate-pulse">
                  ↑ Click anywhere for sound
                </p>
              )}
            </div>
          </div>

          {/* Canvas area */}
          <div className="flex-1 relative min-h-0">
            <WorkshopScene
              progress={progress}
              onSnap={handleSnap}
              onComplete={handleComplete}
            />

            {/* Assembly checklist — left */}
            <div className="absolute left-3 top-2 flex flex-col gap-[3px]">
              {SLICES.map(sl => {
                const lp = clamp((progress - sl.ss) / (sl.se - sl.ss), 0, 1);
                const done   = lp >= 0.99;
                const active = lp > 0.05 && !done;
                return (
                  <motion.div
                    key={sl.id}
                    animate={{ opacity: done?1:active?0.88:0.2, x: active?4:0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5 font-mono text-[9px]"
                  >
                    <span className={done?"text-accent-red":active?"text-yellow-400":"text-text-muted"}>
                      {done ? "✓" : active ? "▶" : "○"}
                    </span>
                    <span className={done?"text-text-primary":active?"text-yellow-100":"text-text-muted"}>
                      {sl.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Active part info — right */}
            {!isDone && progress > 0.01 && (
              <motion.div
                key={activeSlice.id}
                initial={{ opacity:0, x:20 }}
                animate={{ opacity:1, x:0 }}
                className="absolute right-3 top-2 glass border border-accent-red/30 p-3 w-52 font-mono"
              >
                <p className="text-[9px] text-accent-red tracking-widest mb-1">DEPLOYING MODULE</p>
                <p className="text-xs text-text-primary font-bold">{activeSlice.label}</p>
                <p className="text-[9px] text-text-muted mt-1 leading-snug">{activeSlice.desc}</p>
                <div className="mt-2 h-0.5 bg-surface-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-red to-yellow-400"
                    animate={{
                      width: `${Math.round(
                        clamp((progress - activeSlice.ss) / (activeSlice.se - activeSlice.ss), 0, 1) * 100
                      )}%`,
                    }}
                    transition={{ duration: 0.08 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Progress bar — bottom */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-between font-mono text-[10px] text-text-muted mb-1.5">
                <span className="tracking-widest uppercase">Suit Assembly</span>
                <span className="text-accent-red font-bold">{pct}%</span>
              </div>
              <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background:
                      "linear-gradient(90deg, #B71C1C 0%, #C9960C 55%, #FFD740 100%)",
                  }}
                  transition={{ duration: 0.08 }}
                />
              </div>
            </div>

            {/* MARK L ACTIVATED overlay */}
            {isDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.5 }}
                  className="glass-strong border border-accent-red p-10 text-center"
                  style={{
                    boxShadow:
                      "0 0 120px rgba(192,57,43,0.65), 0 0 250px rgba(212,160,23,0.22), inset 0 0 60px rgba(192,57,43,0.07)",
                  }}
                >
                  <p className="font-mono text-[9px] text-accent-red tracking-[0.6em] mb-3">
                    J.A.R.V.I.S. ONLINE
                  </p>
                  <p className="font-display text-6xl text-text-primary tracking-wider mb-1">
                    MARK L
                  </p>
                  <p
                    className="font-display text-3xl tracking-[0.4em] mb-4"
                    style={{ color: "#FFD740", textShadow: "0 0 30px rgba(255,215,64,0.6)" }}
                  >
                    ACTIVATED
                  </p>
                  <div className="h-px w-48 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-4" />
                  <p className="font-mono text-xs text-text-muted">
                    All systems nominal · Drag to inspect
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Scroll hint when at top */}
            {progress < 0.02 && (
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center pointer-events-none"
              >
                <p className="font-mono text-xs text-text-muted tracking-[0.3em] uppercase">
                  ↓ Scroll to deploy Mark L
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll driver: 560vh = total scrollable space for the animation */}
      <div className="h-[560vh]" />

      {/* Post-workshop section */}
      <div className="relative z-20 bg-background pt-20 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading tag="// real_builds" title="THE ACTUAL ROBOTS" align="center" />
          <p className="font-mono text-sm text-text-muted mb-8 max-w-lg mx-auto">
            That was the 3D workshop. Below are the real machines Jenish built —
            sensors, motors, and real firmware.
          </p>
          <a
            href="/projects"
            data-hover
            className="inline-block px-8 py-3 border border-accent-red text-accent-red font-mono text-xs tracking-widest uppercase hover:bg-accent-red hover:text-white transition-all duration-300"
            style={{ boxShadow: "0 0 20px rgba(192,57,43,0.2)" }}
          >
            See All Projects →
          </a>
        </div>
      </div>
    </div>
  );
}