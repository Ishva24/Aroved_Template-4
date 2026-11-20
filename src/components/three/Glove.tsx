"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Decal, useGLTF } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { gripNormalMap, printTexture } from "./textures";
import { applyHologram, type HoloUniforms } from "./hologram";

export const GLOVE_URL = "/models/arosafe-glove.glb";

export type GloveFinish = "blue-nitrile" | "black-nitrile" | "white-latex" | "surgical" | "eva";

const FINISHES: Record<GloveFinish, { material: THREE.MeshPhysicalMaterialParameters; print: string; label: string[] }> = {
  "blue-nitrile": {
    material: { color: "#0c27a8", roughness: 0.42, sheen: 0.15, sheenColor: new THREE.Color("#3f63ff"), sheenRoughness: 0.45, clearcoat: 0.3, clearcoatRoughness: 0.45 },
    print: "#f4f7ff",
    label: ["AROSAFE", "BLUE NITRILE", "EXAMINATION GLOVE", "POWDER FREE"],
  },
  "black-nitrile": {
    material: { color: "#14161b", roughness: 0.62, sheen: 0.45, sheenColor: new THREE.Color("#4a5468"), sheenRoughness: 0.6, clearcoat: 0.1, clearcoatRoughness: 0.7 },
    print: "#e9eef7",
    label: ["AROSAFE", "BLACK NITRILE", "LATEX FREE | POWDER FREE"],
  },
  "white-latex": {
    material: { color: "#f3ead8", roughness: 0.48, sheen: 0.4, sheenColor: new THREE.Color("#fff6e0"), clearcoat: 0.2, clearcoatRoughness: 0.4 },
    print: "#1a44c9",
    label: ["AROSAFE", "LATEX", "EXAMINATION GLOVE"],
  },
  surgical: {
    material: { color: "#efe3c8", roughness: 0.36, sheen: 0.35, sheenColor: new THREE.Color("#fff2d6"), clearcoat: 0.35, clearcoatRoughness: 0.3 },
    print: "#1a44c9",
    label: ["AROSAFE", "STERILE", "SURGICAL GLOVE"],
  },
  eva: {
    // Transparent EVA: alpha blending (works on any canvas background) rather than a transmission pass.
    material: { color: "#d4ecff", roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.06, transparent: true, opacity: 0.42, depthWrite: false, envMapIntensity: 1.6, iridescence: 0.25 },
    print: "#1a44c9",
    label: ["AROSAFE", "STERILE EVA GLOVE", "AMBIDEXTROUS"],
  },
};

/** Planar UVs from the XY bounding box (generated models ship without UVs to stay small). */
function withPlanarUV(src: THREE.BufferGeometry) {
  const geo = src.clone();
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  const w = bb.max.x - bb.min.x, h = bb.max.y - bb.min.y;
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - bb.min.x) / w;
    uv[i * 2 + 1] = (pos.getY(i) - bb.min.y) / h;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return geo;
}

export function useGeneratedGeometry(url: string, name: string) {
  const { nodes } = useGLTF(url) as unknown as { nodes: Record<string, THREE.Mesh> };
  return useMemo(() => withPlanarUV(nodes[name].geometry), [nodes, name]);
}

type Props = ThreeElements["group"] & { finish?: GloveFinish; showPrint?: boolean; hologram?: boolean };

export function Glove({ finish = "blue-nitrile", showPrint = true, hologram = false, ...props }: Props) {
  const geometry = useGeneratedGeometry(GLOVE_URL, "Glove");
  const f = FINISHES[finish];

  const holo = useRef<HoloUniforms | null>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const material = useMemo(() => {
    const normal = gripNormalMap();
    const m = new THREE.MeshPhysicalMaterial({
      ...f.material,
      normalMap: normal,
      normalScale: new THREE.Vector2(0.07, 0.07),
      side: THREE.DoubleSide,
      envMapIntensity: 0.85,
    });
    holo.current = hologram ? applyHologram(m) : null;
    return m;
  }, [f, hologram]);

  // Diagnostic scan sweeps up the glove in world space every few seconds.
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, dt) => {
    const u = holo.current;
    if (!u || !mesh.current) return;
    u.uTime.value += dt;
    mesh.current.getWorldPosition(tmp);
    const s = mesh.current.getWorldScale(new THREE.Vector3()).y;
    const phase = (state.clock.elapsedTime % 4.5) / 4.5;
    u.uScan.value = tmp.y + (-1.7 + phase * 4.2) * s;
  });

  const print = useMemo(() => printTexture({ lines: f.label, color: f.print }), [f]);

  return (
    <group {...props}>
      <mesh ref={mesh} geometry={geometry} material={material} castShadow receiveShadow>
        {showPrint && (
          <Decal position={[0.06, -0.3, 0.12]} rotation={[0, 0, 0]} scale={[0.62, 0.31, 0.25]}>
            <meshPhysicalMaterial
              map={print}
              transparent
              polygonOffset
              polygonOffsetFactor={-4}
              roughness={0.5}
              depthWrite={false}
              toneMapped={false}
            />
          </Decal>
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload(GLOVE_URL);
