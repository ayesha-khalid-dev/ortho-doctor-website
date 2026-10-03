"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---- Generate a soft round sprite texture for particles ----
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.5)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);
}

// ---- Point cloud generators ----
function cylinderPoints(count: number, radius: number, height: number, centerY: number) {
  const pts: number[] = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const y = centerY + (Math.random() - 0.5) * height;
    const r = radius * (0.85 + Math.random() * 0.15);
    pts.push(Math.cos(theta) * r, y, Math.sin(theta) * r * 0.7);
  }
  return pts;
}

function spherePoints(count: number, radius: number, center: [number, number, number]) {
  const pts: number[] = [];
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * (0.9 + Math.random() * 0.1);
    pts.push(
      center[0] + r * Math.sin(phi) * Math.cos(theta),
      center[1] + r * Math.sin(phi) * Math.sin(theta) * 0.8,
      center[2] + r * Math.cos(phi) * 0.8
    );
  }
  return pts;
}

function wrapShellPoints(count: number, radius: number, height: number, centerY: number) {
  const pts: number[] = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const y = centerY + (Math.random() - 0.5) * height;
    const r = radius * (1.15 + Math.random() * 0.25);
    pts.push(Math.cos(theta) * r, y, Math.sin(theta) * r * 0.8);
  }
  return pts;
}

function scatteredPoints(count: number, spread: number) {
  const pts: number[] = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = spread * (0.6 + Math.random() * 0.6);
    pts.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
  }
  return pts;
}

type Progress = {
  reconstruct: number; // 0 -> scan/scatter, 1 -> fully assembled + held
  dissolve: number; // 0 -> intact, 1 -> fully dissolved outward
};

function ParticleSystem({
  progressRef,
}: {
  progressRef: React.MutableRefObject<Progress>;
}) {
  const dotTexture = useDotTexture();
  const { camera } = useThree();

  // ---- Bone target positions (femur, tibia, patella) ----
  const boneTarget = useMemo(() => {
    const femur = cylinderPoints(320, 0.16, 1.3, 0.95);
    const tibia = cylinderPoints(320, 0.14, 1.3, -0.95);
    const patella = spherePoints(260, 0.22, [0, 0.05, 0.32]);
    return new Float32Array([...femur, ...tibia, ...patella]);
  }, []);

  const boneScatter = useMemo(
    () => new Float32Array(scatteredPoints(900, 4.2)),
    []
  );

  // ---- Muscle/fiber target positions (wrap shell around joint) ----
  const muscleTarget = useMemo(() => {
    const upperWrap = wrapShellPoints(220, 0.26, 1.0, 0.75);
    const lowerWrap = wrapShellPoints(220, 0.24, 1.0, -0.75);
    const jointWrap = wrapShellPoints(160, 0.34, 0.5, 0.1);
    return new Float32Array([...upperWrap, ...lowerWrap, ...jointWrap]);
  }, []);

  const muscleScatter = useMemo(
    () => new Float32Array(scatteredPoints(600, 5.2)),
    []
  );

  const bonePositions = useRef<Float32Array>(new Float32Array(boneTarget.length));
  const musclePositions = useRef<Float32Array>(new Float32Array(muscleTarget.length));

  const boneGeoRef = useRef<THREE.BufferGeometry>(null);
  const muscleGeoRef = useRef<THREE.BufferGeometry>(null);
  const boneMatRef = useRef<THREE.PointsMaterial>(null);
  const muscleMatRef = useRef<THREE.PointsMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  function ease(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  useFrame((state) => {
    const { reconstruct, dissolve } = progressRef.current;

    // Bone: stage 0 -> 0.6 of "reconstruct" range assembles bones
    const boneT = ease(Math.min(1, reconstruct / 0.6));
    // Muscle: stage 0.5 -> 1.0 of "reconstruct" range assembles muscle
    const muscleT = ease(Math.min(1, Math.max(0, (reconstruct - 0.5) / 0.5)));

    const bArr = bonePositions.current;
    for (let i = 0; i < boneTarget.length; i++) {
      const from = boneScatter[i];
      const to = boneTarget[i];
      let val = from + (to - from) * boneT;
      if (dissolve > 0) {
        val += (to - from) * -1 * dissolve * 1.4 * (i % 3 === 1 ? 0.4 : 1);
      }
      bArr[i] = val;
    }
    if (boneGeoRef.current) {
      (boneGeoRef.current.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    const mArr = musclePositions.current;
    for (let i = 0; i < muscleTarget.length; i++) {
      const from = muscleScatter[i];
      const to = muscleTarget[i];
      let val = from + (to - from) * muscleT;
      if (dissolve > 0) {
        val += (to - from) * -1 * dissolve * 1.6 * (i % 3 === 1 ? 0.4 : 1);
      }
      mArr[i] = val;
    }
    if (muscleGeoRef.current) {
      (muscleGeoRef.current.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    if (boneMatRef.current) {
      boneMatRef.current.opacity = boneT * (1 - dissolve * 0.9);
      boneMatRef.current.size = 0.045 + dissolve * 0.05;
    }
    if (muscleMatRef.current) {
      muscleMatRef.current.opacity = muscleT * 0.55 * (1 - dissolve * 0.9);
      muscleMatRef.current.size = 0.05 + dissolve * 0.06;
    }

    // Gentle continuous rotation for a "living" cinematic feel
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }

    // Camera push-in during hold stage
    const push = Math.min(1, Math.max(0, (reconstruct - 0.85) / 0.15));
    camera.position.z = 4.2 - push * 0.7;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={boneGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            count={bonePositions.current.length / 3}
            array={bonePositions.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={boneMatRef}
          color="#F5F0E4"
          size={0.045}
          map={dotTexture}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points>
        <bufferGeometry ref={muscleGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            count={musclePositions.current.length / 3}
            array={musclePositions.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={muscleMatRef}
          color="#E63946"
          size={0.05}
          map={dotTexture}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ---- NEW: colourful sparkles orbiting the joint ----
function Sparkles({
  progressRef,
}: {
  progressRef: React.MutableRefObject<Progress>;
}) {
  const dotTexture = useDotTexture();
  const count = 260;

  const { positions, colors } = useMemo(() => {
    const palette = ["#E8538F", "#0FA3B1", "#F5B83D", "#7B5EA7", "#FFFFFF"].map(
      (c) => new THREE.Color(c)
    );
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 1.1;
      const y = (Math.random() - 0.5) * 2.4;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius * 0.8;
      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const matRef = useRef<THREE.PointsMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const { reconstruct, dissolve } = progressRef.current;
    const appear = Math.min(1, Math.max(0, (reconstruct - 0.2) / 0.5));

    if (matRef.current) {
      matRef.current.opacity = appear * 0.9 * (1 - dissolve);
      matRef.current.size =
        0.05 + Math.sin(state.clock.elapsedTime * 3) * 0.01 + dissolve * 0.05;
    }
    if (groupRef.current) {
      // Opposite direction to the bones, so it feels alive
      groupRef.current.rotation.y = -state.clock.elapsedTime * 0.25;
      const s = 1 + dissolve * 0.8;
      groupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={matRef}
          size={0.05}
          map={dotTexture}
          vertexColors
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function KneeParticles({
  progressRef,
}: {
  progressRef: React.MutableRefObject<Progress>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 4]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={0.3} color="#C8102E" />
      <ParticleSystem progressRef={progressRef} />
      <Sparkles progressRef={progressRef} />
    </Canvas>
  );
}