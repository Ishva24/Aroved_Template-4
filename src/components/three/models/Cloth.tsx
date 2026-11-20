"use client";

import { useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

type GroupProps = ThreeElements["group"];

export interface ClothSheetProps extends Omit<GroupProps, "children"> {
  width?: number;
  height?: number;
  segments?: number;
  amplitude?: number;
  frequency?: number;
  color?: string;
  map?: THREE.Texture;
  alphaMap?: THREE.Texture;
  /** Gently ripple the fabric */
  animate?: boolean;
  speed?: number;
}

/** A subtly wavy fabric sheet (drapes, wraps, gowns). Optional colour + alpha maps cut out shapes. */
export function ClothSheet({
  width = 2.4,
  height = 1.6,
  segments = 32,
  amplitude = 0.08,
  frequency = 2.4,
  color = "#2f7de1",
  map,
  alphaMap,
  animate = false,
  speed = 0.6,
  ...group
}: ClothSheetProps) {
  const reduced = useReducedMotion();

  const geometry = useMemo(() => new THREE.PlaneGeometry(width, height, segments, segments), [width, height, segments]);

  const displace = useMemo(
    () => (t: number) => {
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, amplitude * Math.sin(frequency * x + t) * Math.cos(frequency * 0.8 * y - t * 0.7));
      }
      pos.needsUpdate = true;
      geometry.computeVertexNormals();
    },
    [geometry, amplitude, frequency],
  );

  useMemo(() => displace(0), [displace]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    if (animate && !reduced) displace(clock.elapsedTime * speed);
  });

  return (
    <group {...group}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color={map ? "#ffffff" : color}
          map={map}
          alphaMap={alphaMap}
          alphaTest={alphaMap ? 0.5 : 0}
          side={THREE.DoubleSide}
          roughness={0.82}
          sheen={1}
          sheenRoughness={0.6}
          sheenColor="#ffffff"
        />
      </mesh>
    </group>
  );
}

/** Flat ribbon extruded along a curve (used for the unrolled film of a sterilization reel). */
export function ribbonGeometry(points: THREE.Vector3[], width: number, segments = 48) {
  const curve = new THREE.CatmullRomCurve3(points);
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = curve.getPoint(t);
    positions.push(p.x, p.y, p.z - width / 2, p.x, p.y, p.z + width / 2);
    uvs.push(t, 0, t, 1);
  }
  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

