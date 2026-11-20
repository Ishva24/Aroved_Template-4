"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

interface BaseProps {
  color: string;
  accent: string;
}

const fabric = { roughness: 0.92, sheen: 1, sheenRoughness: 0.7, sheenColor: "#ffffff" } as const;

/* ───────────────────────── bouffant cap ───────────────────────── */

export function CapModel({ color, accent }: BaseProps) {
  const geometry = useMemo(() => {
    const r = 1.3;
    const g = new THREE.SphereGeometry(r, 72, 44, 0, Math.PI * 2, 0, Math.PI / 2);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // gathered, ruffled edge near the rim
      const w = THREE.MathUtils.clamp(1 - y / 0.4, 0, 1);
      const k = 1 + w * 0.075 * Math.sin(Math.atan2(z, x) * 28);
      pos.setXYZ(i, x * k, y, z * k);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group rotation={[0.55, -0.4, 0]} position={[0, -0.2, 0]} scale={1.15}>
      <mesh geometry={geometry} scale={[1, 0.74, 1]}>
        <meshPhysicalMaterial color={color} side={THREE.DoubleSide} {...fabric} />
      </mesh>
      {/* elastic band */}
      <mesh position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.07, 14, 96]} />
        <meshPhysicalMaterial color={accent} roughness={0.7} />
      </mesh>
    </group>
  );
}

/* ───────────────────────── shoe cover ───────────────────────── */

export function ShoeCoverModel({ color, accent }: BaseProps) {
  const mat = { color, roughness: 0.5, clearcoat: 0.25, sheen: 0.8, sheenColor: "#ffffff" } as const;
  return (
    <group rotation={[0.12, -0.75, 0]} position={[0, -0.5, 0]}>
      {/* foot */}
      <mesh position={[0, -0.35, 0.35]} scale={[1, 0.62, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.62, 1.7, 14, 28]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* slip-resistant sole */}
      <mesh position={[0, -0.6, 0.35]} scale={[0.92, 0.28, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.62, 1.72, 10, 24]} />
        <meshPhysicalMaterial color="#7fa9cc" roughness={0.8} />
      </mesh>
      {/* ankle */}
      <mesh position={[0, 0.45, -0.55]}>
        <cylinderGeometry args={[0.55, 0.64, 1.5, 40, 1, true]} />
        <meshPhysicalMaterial {...mat} side={THREE.DoubleSide} />
      </mesh>
      {/* elastic top */}
      <mesh position={[0, 1.2, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.56, 0.07, 14, 56]} />
        <meshPhysicalMaterial color={accent} roughness={0.6} />
      </mesh>
    </group>
  );
}

/* ───────────────────────── 3-ply face mask ───────────────────────── */

export function FaceMaskModel({ color, accent }: BaseProps) {
  const { geometry, loops } = useMemo(() => {
    const W = 2.4;
    const H = 1.5;
    const g = new THREE.PlaneGeometry(W, H, 48, 30);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const nx = x / (W / 2);
      const ny = y / (H / 2);
      // face curvature + three crisp horizontal pleats
      const tri = Math.abs((((y + H / 2) / 0.5) % 1) - 0.5) * 2;
      const z = 0.4 * (1 - nx * nx) + 0.08 * (1 - ny * ny) + 0.05 * tri * (1 - Math.pow(Math.abs(nx), 4) * 0.7);
      pos.setZ(i, z);
    }
    g.computeVertexNormals();

    const make = (s: number) =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(1.2 * s, 0.68, 0.02),
          new THREE.Vector3(1.32 * s, 0.78, -0.45),
          new THREE.Vector3(1.5 * s, 0.1, -1.0),
          new THREE.Vector3(1.32 * s, -0.78, -0.45),
          new THREE.Vector3(1.2 * s, -0.68, 0.02),
        ]),
        60,
        0.016,
        8,
        false,
      );
    return { geometry: g, loops: [make(1), make(-1)] };
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      loops.forEach((l) => l.dispose());
    },
    [geometry, loops],
  );

  return (
    <group rotation={[-0.12, 0.5, 0.04]} position={[0, 0, 0]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial color={color} side={THREE.FrontSide} {...fabric} />
      </mesh>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial color={accent} side={THREE.BackSide} {...fabric} />
      </mesh>
      {loops.map((l, i) => (
        <mesh key={i} geometry={l}>
          <meshStandardMaterial color="#f4f7fa" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

