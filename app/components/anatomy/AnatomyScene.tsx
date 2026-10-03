"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

type Geo = "capsule" | "sphere" | "box" | "torus";

type PartDef = {
  id: string;
  finalPos: [number, number, number];
  fromPos: [number, number, number];
  rotation?: [number, number, number];
  geometry: Geo;
  args: number[];
};

const BONE_COLOR = "#EFE8D8";

// Diagram-style labels shown once assembly is complete
type LabelDef = {
  id: string;
  text: string;
  position: [number, number, number];
  side: "left" | "right";
};

const LABELS: LabelDef[] = [
  { id: "l-skull", text: "Skull", position: [0.3, 3.15, 0], side: "right" },
  { id: "l-ribs", text: "Ribs", position: [-0.3, 2.15, 0], side: "left" },
  { id: "l-spine", text: "Vertebral Column", position: [0.15, 1.5, 0], side: "right" },
  { id: "l-pelvis", text: "Pelvis", position: [-0.32, 0.65, 0], side: "left" },
  { id: "l-humerus", text: "Humerus", position: [0.78, 2.1, 0], side: "right" },
  { id: "l-forearm", text: "Radius / Ulna", position: [1.0, 1.2, 0], side: "right" },
  { id: "l-femur", text: "Femur", position: [-0.32, -0.4, 0], side: "left" },
  { id: "l-tibia", text: "Tibia", position: [0.32, -1.4, 0], side: "right" },
];

// Scroll progress (0-1) ranges for each assembly stage
const STAGES = {
  bones: [0.05, 0.42] as [number, number],
  joints: [0.42, 0.55] as [number, number],
  muscles: [0.55, 0.68] as [number, number],
  tendons: [0.68, 0.8] as [number, number],
  final: [0.88, 1] as [number, number],
};

// ---- BONES: skull, continuous spine, ribs, pelvis, arms, legs ----
const BONES: PartDef[] = [
  { id: "skull", finalPos: [0, 3.15, 0], fromPos: [0, 10, 0], geometry: "sphere", args: [0.32, 28, 28] },

  // Continuous spine - 3 overlapping smooth segments (cervical, thoracic, lumbar)
  { id: "spineTop", finalPos: [0, 2.55, 0], fromPos: [0, 10, 0], geometry: "capsule", args: [0.11, 0.55, 6, 16] },
  { id: "spineMid", finalPos: [0, 1.85, 0], fromPos: [0, 10, 0], geometry: "capsule", args: [0.12, 0.5, 6, 16] },
  { id: "spineLow", finalPos: [0, 1.2, 0], fromPos: [0, 10, 0], geometry: "capsule", args: [0.11, 0.45, 6, 16] },

  // Simple rib arcs (hint of ribcage, not full volume)
  { id: "ribL1", finalPos: [-0.28, 2.3, 0.05], fromPos: [-0.28, 8, 0.05], rotation: [Math.PI / 2, 0, -0.5], geometry: "torus", args: [0.32, 0.02, 8, 16, Math.PI * 0.85] },
  { id: "ribR1", finalPos: [0.28, 2.3, 0.05], fromPos: [0.28, 8, 0.05], rotation: [Math.PI / 2, 0, Math.PI - 0.5], geometry: "torus", args: [0.32, 0.02, 8, 16, Math.PI * 0.85] },
  { id: "ribL2", finalPos: [-0.28, 2.0, 0.05], fromPos: [-0.28, 8, 0.05], rotation: [Math.PI / 2, 0, -0.5], geometry: "torus", args: [0.34, 0.02, 8, 16, Math.PI * 0.85] },
  { id: "ribR2", finalPos: [0.28, 2.0, 0.05], fromPos: [0.28, 8, 0.05], rotation: [Math.PI / 2, 0, Math.PI - 0.5], geometry: "torus", args: [0.34, 0.02, 8, 16, Math.PI * 0.85] },

  { id: "pelvis", finalPos: [0, 0.65, 0], fromPos: [0, -7, 0], rotation: [0, 0, Math.PI / 2], geometry: "capsule", args: [0.19, 0.45, 6, 16] },

  { id: "upperArmL", finalPos: [-0.78, 2.25, 0], fromPos: [-9, 2.25, 0], rotation: [0, 0, 0.25], geometry: "capsule", args: [0.09, 0.85, 6, 16] },
  { id: "upperArmR", finalPos: [0.78, 2.25, 0], fromPos: [9, 2.25, 0], rotation: [0, 0, -0.25], geometry: "capsule", args: [0.09, 0.85, 6, 16] },
  { id: "forearmL", finalPos: [-0.98, 1.42, 0], fromPos: [-9, 1.42, 0], rotation: [0, 0, 0.15], geometry: "capsule", args: [0.075, 0.75, 6, 16] },
  { id: "forearmR", finalPos: [0.98, 1.42, 0], fromPos: [9, 1.42, 0], rotation: [0, 0, -0.15], geometry: "capsule", args: [0.075, 0.75, 6, 16] },
  { id: "handL", finalPos: [-1.05, 0.95, 0], fromPos: [-9, 0.95, 0], geometry: "capsule", args: [0.055, 0.16, 4, 10] },
  { id: "handR", finalPos: [1.05, 0.95, 0], fromPos: [9, 0.95, 0], geometry: "capsule", args: [0.055, 0.16, 4, 10] },

  { id: "thighL", finalPos: [-0.32, -0.1, 0], fromPos: [-0.32, -8, 0], geometry: "capsule", args: [0.13, 1.05, 6, 16] },
  { id: "thighR", finalPos: [0.32, -0.1, 0], fromPos: [0.32, -8, 0], geometry: "capsule", args: [0.13, 1.05, 6, 16] },
  { id: "shinL", finalPos: [-0.32, -1.2, 0], fromPos: [-0.32, -9, 0], geometry: "capsule", args: [0.1, 1.05, 6, 16] },
  { id: "shinR", finalPos: [0.32, -1.2, 0], fromPos: [0.32, -9, 0], geometry: "capsule", args: [0.1, 1.05, 6, 16] },
  { id: "footL", finalPos: [-0.32, -1.8, 0.12], fromPos: [-0.32, -9.5, 0.12], geometry: "capsule", args: [0.07, 0.22, 4, 10] },
  { id: "footR", finalPos: [0.32, -1.8, 0.12], fromPos: [0.32, -9.5, 0.12], geometry: "capsule", args: [0.07, 0.22, 4, 10] },
];

// ---- JOINTS: subtle, bone-colored (not red) so they blend as smooth bulges ----
const JOINTS: PartDef[] = [
  { id: "shoulderL", finalPos: [-0.62, 2.68, 0], fromPos: [-0.62, 2.68, 0], geometry: "sphere", args: [0.115, 20, 20] },
  { id: "shoulderR", finalPos: [0.62, 2.68, 0], fromPos: [0.62, 2.68, 0], geometry: "sphere", args: [0.115, 20, 20] },
  { id: "elbowL", finalPos: [-0.88, 1.82, 0], fromPos: [-0.88, 1.82, 0], geometry: "sphere", args: [0.085, 20, 20] },
  { id: "elbowR", finalPos: [0.88, 1.82, 0], fromPos: [0.88, 1.82, 0], geometry: "sphere", args: [0.085, 20, 20] },
  { id: "hipL", finalPos: [-0.32, 0.45, 0], fromPos: [-0.32, 0.45, 0], geometry: "sphere", args: [0.12, 20, 20] },
  { id: "hipR", finalPos: [0.32, 0.45, 0], fromPos: [0.32, 0.45, 0], geometry: "sphere", args: [0.12, 20, 20] },
  { id: "kneeL", finalPos: [-0.32, -0.65, 0], fromPos: [-0.32, -0.65, 0], geometry: "sphere", args: [0.095, 20, 20] },
  { id: "kneeR", finalPos: [0.32, -0.65, 0], fromPos: [0.32, -0.65, 0], geometry: "sphere", args: [0.095, 20, 20] },
];

// ---- MUSCLES (subtle, semi-transparent red) ----
const MUSCLES: PartDef[] = [
  { id: "torsoMuscle", finalPos: [0, 1.85, 0], fromPos: [0, 1.85, 0], geometry: "capsule", args: [0.38, 1.75, 6, 16] },
  { id: "bicepL", finalPos: [-0.78, 2.25, 0], fromPos: [-0.78, 2.25, 0], rotation: [0, 0, 0.25], geometry: "capsule", args: [0.13, 0.65, 6, 12] },
  { id: "bicepR", finalPos: [0.78, 2.25, 0], fromPos: [0.78, 2.25, 0], rotation: [0, 0, -0.25], geometry: "capsule", args: [0.13, 0.65, 6, 12] },
  { id: "thighMuscleL", finalPos: [-0.32, -0.1, 0], fromPos: [-0.32, -0.1, 0], geometry: "capsule", args: [0.19, 0.85, 6, 12] },
  { id: "thighMuscleR", finalPos: [0.32, -0.1, 0], fromPos: [0.32, -0.1, 0], geometry: "capsule", args: [0.19, 0.85, 6, 12] },
];

// ---- TENDONS (thin, subtle connectors) ----
const TENDONS: PartDef[] = [
  { id: "tendonShoulderL", finalPos: [-0.7, 2.47, 0], fromPos: [-0.7, 2.47, 0], rotation: [0, 0, 0.35], geometry: "capsule", args: [0.03, 0.25, 4, 8] },
  { id: "tendonShoulderR", finalPos: [0.7, 2.47, 0], fromPos: [0.7, 2.47, 0], rotation: [0, 0, -0.35], geometry: "capsule", args: [0.03, 0.25, 4, 8] },
  { id: "tendonHipL", finalPos: [-0.32, 0.2, 0], fromPos: [-0.32, 0.2, 0], geometry: "capsule", args: [0.03, 0.25, 4, 8] },
  { id: "tendonHipR", finalPos: [0.32, 0.2, 0], fromPos: [0.32, 0.2, 0], geometry: "capsule", args: [0.03, 0.25, 4, 8] },
];

function stageProgress(p: number, [start, end]: [number, number]) {
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function PartGeometry({ geometry, args }: { geometry: Geo; args: number[] }) {
  if (geometry === "sphere") return <sphereGeometry args={args as [number, number, number]} />;
  if (geometry === "box") return <boxGeometry args={args as [number, number, number]} />;
  if (geometry === "torus")
    return (
      <torusGeometry
        args={args as [number, number, number, number, number]}
      />
    );
  return <capsuleGeometry args={args as [number, number, number, number]} />;
}

function AnatomyGroup({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const boneRefs = useRef<(THREE.Mesh | null)[]>([]);
  const jointRefs = useRef<(THREE.Mesh | null)[]>([]);
  const muscleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const tendonRefs = useRef<(THREE.Mesh | null)[]>([]);
  const [labelsVisible, setLabelsVisible] = useState(false);
  const labelsVisibleRef = useRef(false);

  useFrame((state) => {
    const p = progressRef.current;

    const boneT = easeOutCubic(stageProgress(p, STAGES.bones));
    BONES.forEach((b, i) => {
      const mesh = boneRefs.current[i];
      if (!mesh) return;
      mesh.position.lerpVectors(
        new THREE.Vector3(...b.fromPos),
        new THREE.Vector3(...b.finalPos),
        boneT
      );
      (mesh.material as THREE.MeshStandardMaterial).opacity = boneT;
    });

    const jointT = easeOutCubic(stageProgress(p, STAGES.joints));
    jointRefs.current.forEach((mesh) => {
      if (!mesh) return;
      mesh.scale.setScalar(jointT);
      (mesh.material as THREE.MeshStandardMaterial).opacity = jointT;
    });

    const muscleT = easeOutCubic(stageProgress(p, STAGES.muscles));
    muscleRefs.current.forEach((mesh) => {
      if (!mesh) return;
      (mesh.material as THREE.MeshStandardMaterial).opacity = muscleT * 0.22;
      mesh.scale.setScalar(0.95 + muscleT * 0.05);
    });

    const tendonT = easeOutCubic(stageProgress(p, STAGES.tendons));
    tendonRefs.current.forEach((mesh) => {
      if (!mesh) return;
      (mesh.material as THREE.MeshStandardMaterial).opacity = tendonT;
    });

    const finalT = stageProgress(p, STAGES.final);
    if (groupRef.current) {
      groupRef.current.rotation.y = finalT * state.clock.elapsedTime * 0.15;
    }

    const shouldShowLabels = p > 0.9;
    if (shouldShowLabels !== labelsVisibleRef.current) {
      labelsVisibleRef.current = shouldShowLabels;
      setLabelsVisible(shouldShowLabels);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {BONES.map((b, i) => (
        <mesh
          key={b.id}
          ref={(el) => {
            boneRefs.current[i] = el;
          }}
          position={b.fromPos}
          rotation={b.rotation || [0, 0, 0]}
        >
          <PartGeometry geometry={b.geometry} args={b.args} />
          <meshStandardMaterial color={BONE_COLOR} transparent opacity={0} roughness={0.4} />
        </mesh>
      ))}

      {JOINTS.map((j, i) => (
        <mesh
          key={j.id}
          ref={(el) => {
            jointRefs.current[i] = el;
          }}
          position={j.finalPos}
          scale={0}
        >
          <PartGeometry geometry={j.geometry} args={j.args} />
          <meshStandardMaterial color={BONE_COLOR} transparent opacity={0} roughness={0.35} />
        </mesh>
      ))}

      {MUSCLES.map((m, i) => (
        <mesh
          key={m.id}
          ref={(el) => {
            muscleRefs.current[i] = el;
          }}
          position={m.finalPos}
          rotation={m.rotation || [0, 0, 0]}
        >
          <PartGeometry geometry={m.geometry} args={m.args} />
          <meshStandardMaterial color="#C8102E" transparent opacity={0} roughness={0.5} />
        </mesh>
      ))}

      {TENDONS.map((t, i) => (
        <mesh
          key={t.id}
          ref={(el) => {
            tendonRefs.current[i] = el;
          }}
          position={t.finalPos}
          rotation={t.rotation || [0, 0, 0]}
        >
          <PartGeometry geometry={t.geometry} args={t.args} />
          <meshStandardMaterial color="#E5E0D5" transparent opacity={0} roughness={0.6} />
        </mesh>
      ))}
      {labelsVisible &&
        LABELS.map((l) => (
          <Html key={l.id} position={l.position} center={false} style={{ pointerEvents: "none" }}>
            {l.side === "right" ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <span className="w-6 h-px bg-brand-red inline-block" />
                <span className="text-[11px] font-medium text-brand-ink whitespace-nowrap bg-white/85 px-1.5 py-0.5 rounded">
                  {l.text}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 animate-fade-in -translate-x-full">
                <span className="text-[11px] font-medium text-brand-ink whitespace-nowrap bg-white/85 px-1.5 py-0.5 rounded">
                  {l.text}
                </span>
                <span className="w-6 h-px bg-brand-red inline-block" />
              </div>
            )}
          </Html>
        ))}
    </group>
  );
}

export default function AnatomyScene({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas camera={{ position: [0, 0.5, 13.5], fov: 42 }} className="!absolute inset-0">
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.1} />
      <directionalLight position={[-5, -3, -5]} intensity={0.35} />
      <AnatomyGroup progressRef={progressRef} />
      <ContactShadows position={[0, -2.1, 0]} opacity={0.32} scale={8} blur={2.5} far={4} />
    </Canvas>
  );
}