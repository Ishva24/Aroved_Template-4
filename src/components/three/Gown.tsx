"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Decal, useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useGeneratedGeometry } from "./Glove";
import { fabricNormalMap, printTexture } from "./textures";

export const GOWN_URL = "/models/arosafe-gown.glb";

export function Gown(props: ThreeElements["group"]) {
  const body = useGeneratedGeometry(GOWN_URL, "Gown");
  const cuffs = useGeneratedGeometry(GOWN_URL, "Cuffs");

  const [fabric, knit] = useMemo(() => {
    const normal = fabricNormalMap();
    return [
      new THREE.MeshPhysicalMaterial({
        color: "#3f86c8",
        roughness: 0.9,
        sheen: 0.5,
        sheenColor: new THREE.Color("#bfe0ff"),
        sheenRoughness: 0.7,
        normalMap: normal,
        normalScale: new THREE.Vector2(0.35, 0.35),
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhysicalMaterial({
        color: "#f3f5f7",
        roughness: 1,
        sheen: 1,
        sheenColor: new THREE.Color("#ffffff"),
        normalMap: normal,
        normalScale: new THREE.Vector2(0.8, 0.8),
      }),
    ];
  }, []);

  const label = useMemo(
    () => printTexture({ lines: ["AROSAFE", "STERILE SURGEON", "GOWN"], color: "#1a44c9", background: "#f7f9fc", width: 512, height: 256 }),
    [],
  );

  return (
    <group {...props}>
      <mesh geometry={body} material={fabric} castShadow receiveShadow>
        {/* Sleeve label, like the reference product photo */}
        <Decal position={[0.78, 0.45, 0.12]} rotation={[0, 0.9, -0.15]} scale={[0.26, 0.13, 0.3]}>
          <meshStandardMaterial map={label} polygonOffset polygonOffsetFactor={-4} roughness={0.8} />
        </Decal>
      </mesh>
      <mesh geometry={cuffs} material={knit} castShadow />
    </group>
  );
}

useGLTF.preload(GOWN_URL);
