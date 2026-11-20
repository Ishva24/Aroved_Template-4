"use client";

/**
 * Lightweight procedural product models for the AROSAFE range where no
 * manufacturer 3D assets exist. Each fits roughly inside a 2.4-unit box
 * centred on the origin so viewers can frame them consistently.
 */
import { useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { fabricNormalMap, pleatNormalMap, printTexture, quiltNormalMap } from "./textures";

type G = ThreeElements["group"];

const fabric = (color: string, extra: THREE.MeshPhysicalMaterialParameters = {}) =>
  new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.88,
    sheen: 1,
    sheenColor: new THREE.Color("#ffffff"),
    sheenRoughness: 0.6,
    normalMap: fabricNormalMap(),
    normalScale: new THREE.Vector2(0.4, 0.4),
    side: THREE.DoubleSide,
    ...extra,
  });

function Label({ lines, position, rotation, size = [1, 0.5], color = "#1a44c9", background = "#ffffff" }: {
  lines: string[]; position: [number, number, number]; rotation?: [number, number, number]; size?: [number, number]; color?: string; background?: string;
}) {
  const map = useMemo(() => printTexture({ lines, color, background, width: 1024, height: 512 }), [lines, color, background]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial map={map} roughness={0.6} />
    </mesh>
  );
}

/** Wavy elastic band (caps, shoe covers). */
function useRuffleGeometry(rx: number, rz: number, waves = 42, amp = 0.035, tube = 0.035) {
  return useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 240; i++) {
      const t = (i / 240) * Math.PI * 2;
      const w = Math.sin(t * waves);
      pts.push(new THREE.Vector3(Math.cos(t) * (rx + w * amp * 0.5), w * amp, Math.sin(t) * (rz + w * amp * 0.5)));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 480, tube, 10, true);
  }, [rx, rz, waves, amp, tube]);
}

/* -------------------------------------------------------------- */

export function DrapeKit({ tone = "blue", ...props }: G & { tone?: "blue" | "green" }) {
  const mats = useMemo(() => {
    const main = tone === "blue" ? "#3c7fd1" : "#3d9c8a";
    return [fabric(main), fabric("#e9f1fb"), fabric(tone === "blue" ? "#2a63b4" : "#2f7f70")];
  }, [tone]);
  const pouch = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.15, transmission: 0.95, thickness: 0.05, ior: 1.3, clearcoat: 1, transparent: true, opacity: 0.6 }),
    [],
  );
  return (
    <group {...props}>
      {[0, 1, 2, 3].map((i) => (
        <RoundedBox key={i} args={[1.9, 0.2, 1.35]} radius={0.09} smoothness={5} position={[0, -0.35 + i * 0.21, 0]} rotation={[0, (i % 2 ? 1 : -1) * 0.03, 0]} material={mats[i % 3]} castShadow receiveShadow />
      ))}
      <RoundedBox args={[2.08, 0.98, 1.52]} radius={0.16} smoothness={6} position={[0, -0.04, 0]} material={pouch} />
      <Label lines={["AROSAFE", "STERILE SURGICAL", "DRAPE KIT"]} position={[0, 0.465, 0.2]} rotation={[-Math.PI / 2, 0, 0]} size={[1.1, 0.55]} />
    </group>
  );
}

export function WipesPack(props: G) {
  const body = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#f7f9fc", roughness: 0.35, clearcoat: 0.6, clearcoatRoughness: 0.25, sheen: 0.4 }), []);
  const lid = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#1a44c9", roughness: 0.3, clearcoat: 0.8 }), []);
  return (
    <group {...props}>
      <RoundedBox args={[2, 0.55, 1.2]} radius={0.26} smoothness={8} material={body} castShadow receiveShadow />
      <RoundedBox args={[0.9, 0.08, 0.5]} radius={0.04} smoothness={4} position={[0, 0.3, -0.1]} material={lid} castShadow />
      <Label lines={["AROSAFE", "ANTISEPTIC WET WIPES", "10 WET TOWELS · 32 × 32"]} position={[0, 0, 0.605]} size={[1.5, 0.5]} background="#f7f9fc" />
    </group>
  );
}

export function UnderPad(props: G) {
  const quilt = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#5aa2e6", roughness: 0.8, sheen: 1, sheenColor: new THREE.Color("#d8ecff"), normalMap: quiltNormalMap(), normalScale: new THREE.Vector2(0.8, 0.8) }),
    [],
  );
  const base = useMemo(() => fabric("#edf3fa"), []);
  return (
    <group {...props}>
      {[0, 1, 2].map((i) => (
        <RoundedBox key={i} args={[1.7, 0.16, 1.15]} radius={0.07} smoothness={4} position={[0, -0.35 + i * 0.17, 0]} rotation={[0, i * 0.04 - 0.04, 0]} material={i === 2 ? quilt : base} castShadow receiveShadow />
      ))}
      {/* Unfolded pad fanning out */}
      <mesh position={[0.1, -0.44, 0.35]} rotation={[-Math.PI / 2, 0, 0.25]} receiveShadow material={quilt}>
        <planeGeometry args={[2.1, 1.4, 1, 1]} />
      </mesh>
    </group>
  );
}

export function BouffantCap(props: G) {
  const mat = useMemo(() => fabric("#7fb6ea"), []);
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 96, 48, 0, Math.PI * 2, 0, Math.PI * 0.56);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const a = Math.atan2(z, x);
      const puff = 1 + 0.035 * Math.sin(a * 9 + y * 6) + 0.02 * Math.sin(a * 23 - y * 11);
      p.setXYZ(i, x * puff, y * 0.72 * puff, z * puff);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const band = useRuffleGeometry(1.0, 1.0, 46, 0.04, 0.04);
  return (
    <group {...props}>
      <mesh geometry={geo} material={mat} castShadow receiveShadow position={[0, -0.25, 0]} />
      <mesh geometry={band} material={mat} position={[0, -0.33, 0]} castShadow />
    </group>
  );
}

export function ShoeCover(props: G) {
  const mat = useMemo(() => fabric("#4f95dd"), []);
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 96, 48, 0, Math.PI * 2, Math.PI * 0.3, Math.PI * 0.7);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const wr = 1 + 0.03 * Math.sin(Math.atan2(z, x) * 14 + y * 9);
      // Sole flattened, toe elongated
      p.setXYZ(i, x * 0.62 * wr, Math.max(y, -0.78) * 0.6, z * 1.18 * wr + (y < 0 ? z * 0.1 : 0));
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const band = useRuffleGeometry(0.5, 0.95, 40, 0.03, 0.03);
  return (
    <group {...props}>
      <mesh geometry={geo} material={mat} castShadow receiveShadow />
      <mesh geometry={band} material={mat} position={[0, 0.35, 0]} castShadow />
    </group>
  );
}

export function FaceMask(props: G) {
  const mat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#7cc6ec", roughness: 0.9, sheen: 1, sheenColor: new THREE.Color("#ffffff"), normalMap: pleatNormalMap(), normalScale: new THREE.Vector2(0.6, 0.6), side: THREE.DoubleSide }),
    [],
  );
  const loopMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f5f7fa", roughness: 0.9 }), []);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(1.9, 1.05, 80, 40);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      const nx = x / 0.95, ny = y / 0.525;
      const z = 0.42 * (1 - nx * nx) + 0.12 * (1 - ny * ny) * (1 - nx * nx * 0.6);
      const pleat = 0.012 * Math.sin(y * Math.PI * 6);
      p.setXYZ(i, x, y * (1 - 0.12 * nx * nx), z + pleat);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const loops = useMemo(
    () =>
      [-1, 1].map((s) => {
        const pts = [];
        for (let i = 0; i <= 40; i++) {
          const t = (i / 40) * Math.PI;
          pts.push(new THREE.Vector3(s * (0.95 + Math.sin(t) * 0.42), Math.cos(t) * 0.42, -Math.sin(t) * 0.35));
        }
        return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.016, 8);
      }),
    [],
  );
  return (
    <group {...props}>
      <mesh geometry={geo} material={mat} castShadow receiveShadow />
      {loops.map((l, i) => (
        <mesh key={i} geometry={l} material={loopMat} castShadow />
      ))}
      <mesh position={[0, 0.48, 0.16]}>
        <boxGeometry args={[0.6, 0.025, 0.02]} />
        <meshStandardMaterial color="#e8eef5" metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}

export function SterilizationReel(props: G) {
  const paper = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#f4f1ea", roughness: 0.85, sheen: 0.5, normalMap: fabricNormalMap(), normalScale: new THREE.Vector2(0.15, 0.15) }), []);
  const film = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#9fd4ff", roughness: 0.1, transmission: 0.8, thickness: 0.05, clearcoat: 1, transparent: true, opacity: 0.85 }), []);
  const core = useMemo(() => new THREE.MeshStandardMaterial({ color: "#8b6c48", roughness: 0.9 }), []);
  const strip = useMemo(
    () => printTexture({ lines: ["AROSAFE", "STERILIZATION REEL"], color: "#1a44c9", background: "#d6ecff", stripes: "rgba(26,68,201,0.12)", width: 1024, height: 256 }),
    [],
  );
  return (
    <group {...props}>
      <group rotation={[0, 0, Math.PI / 2]}>
        <mesh material={paper} castShadow receiveShadow>
          <cylinderGeometry args={[0.62, 0.62, 1.4, 96, 1, true]} />
        </mesh>
        <mesh material={film}>
          <cylinderGeometry args={[0.625, 0.625, 1.36, 96, 1, true]} />
        </mesh>
        {[-0.7, 0.7].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[y > 0 ? -Math.PI / 2 : Math.PI / 2, 0, 0]} material={paper}>
            <ringGeometry args={[0.2, 0.62, 96]} />
          </mesh>
        ))}
        <mesh material={core}>
          <cylinderGeometry args={[0.2, 0.2, 1.42, 48, 1, true]} />
        </mesh>
      </group>
      {/* Unrolled length */}
      <mesh position={[0, -0.6, 0.95]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.36, 1.0]} />
        <meshPhysicalMaterial map={strip} roughness={0.35} clearcoat={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function WrapSheets(props: G) {
  const mat = useMemo(() => fabric("#3f86d8"), []);
  const light = useMemo(() => fabric("#8cc0f0"), []);
  return (
    <group {...props}>
      {[0, 1, 2, 3, 4].map((i) => (
        <RoundedBox key={i} args={[1.8, 0.09, 1.8]} radius={0.04} smoothness={3} position={[0, -0.3 + i * 0.1, 0]} rotation={[0, i * 0.12, 0]} material={i % 2 ? light : mat} castShadow receiveShadow />
      ))}
      {/* Folded corner, envelope-style wrap */}
      <mesh position={[0, 0.22, 0.35]} rotation={[-Math.PI / 2 + 0.25, 0, Math.PI / 4]} material={mat} castShadow>
        <circleGeometry args={[0.9, 3]} />
      </mesh>
    </group>
  );
}

export function IndicatorTape(props: G) {
  const stripes = useMemo(() => {
    const t = printTexture({ lines: ["AROSAFE"], color: "#0f2c8f", background: "#f2ecd9", stripes: "rgba(20,30,60,0.55)", width: 1024, height: 256 }).clone();
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(3, 1);
    t.needsUpdate = true;
    return t;
  }, []);
  const side = useMemo(() => new THREE.MeshStandardMaterial({ color: "#efe7cf", roughness: 0.7 }), []);
  const core = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f8f8f8", roughness: 0.5 }), []);
  return (
    <group {...props}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.5, 96, 1, true]} />
          <meshStandardMaterial map={stripes} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
        {[-0.25, 0.25].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[y > 0 ? -Math.PI / 2 : Math.PI / 2, 0, 0]} material={side}>
            <ringGeometry args={[0.5, 0.8, 96]} />
          </mesh>
        ))}
        <mesh material={core}>
          <cylinderGeometry args={[0.5, 0.5, 0.52, 64, 1, true]} />
        </mesh>
      </group>
      {/* Indicator strips — before / after colour change */}
      {[["#d7d0b8", -0.55], ["#2b2f3a", 0.55]].map(([c, x]) => (
        <RoundedBox key={String(x)} args={[0.9, 0.02, 0.28]} radius={0.01} position={[x as number, -0.85, 0.9]} rotation={[0, 0.15, 0]} castShadow>
          <meshStandardMaterial color={c as string} roughness={0.6} />
        </RoundedBox>
      ))}
    </group>
  );
}

export function LabelRoll(props: G) {
  const card = useMemo(() => printTexture({ lines: ["AROSAFE", "CSSD LABEL", "DATE · LOT · DEPT"], color: "#0f2c8f", background: "#ffffff" }), []);
  return (
    <group {...props}>
      <IndicatorTape scale={0.75} position={[-0.55, 0.1, -0.2]} />
      <mesh position={[0.55, -0.15, 0.4]} rotation={[-0.35, -0.35, 0.05]} castShadow>
        <boxGeometry args={[1.2, 0.6, 0.01]} />
        <meshStandardMaterial map={card} roughness={0.5} />
      </mesh>
    </group>
  );
}

export function DiaperModel({ variant = "tape", ...props }: G & { variant?: "tape" | "pants" | "baby" }) {
  const whiteFabric = useMemo(() => fabric("#fbfdff"), []);
  const coreQuilt = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: variant === "baby" ? "#ebf5fc" : "#dcebf7",
        roughness: 0.85,
        sheen: 0.8,
        sheenColor: new THREE.Color("#ffffff"),
        normalMap: quiltNormalMap(),
        normalScale: new THREE.Vector2(0.6, 0.6),
      }),
    [variant]
  );
  const blueTape = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0284c7", roughness: 0.4 }), []);
  const cyanStripe = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0ea5e9", roughness: 0.5 }), []);
  const waistbandRuffle = useRuffleGeometry(0.85, 0.72, 36, 0.025, 0.04);

  return (
    <group {...props}>
      {/* Main contoured brief core */}
      <group position={[0, -0.1, 0]}>
        {/* Outer backing */}
        <RoundedBox args={[1.5, 0.95, 1.25]} radius={0.35} smoothness={8} material={whiteFabric} castShadow receiveShadow />
        {/* Inner quilted absorbent pad */}
        <RoundedBox args={[1.25, 0.75, 1.05]} radius={0.25} smoothness={6} position={[0, 0.05, 0.02]} material={coreQuilt} receiveShadow />

        {/* Wetness indicator lines (dual cyan / yellow lines) */}
        {[-0.08, 0.08].map((x) => (
          <mesh key={x} position={[x, -0.48, 0.42]} rotation={[0.3, 0, 0]}>
            <planeGeometry args={[0.025, 0.7]} />
            <primitive object={cyanStripe} attach="material" />
          </mesh>
        ))}

        {/* Style-specific details: Tape Diaper vs Pull-Up Pants */}
        {variant === "tape" ? (
          <>
            {/* Double refastenable side tapes (Left & Right) */}
            {[-0.78, 0.78].map((x) => (
              <group key={x} position={[x, 0.15, -0.15]} rotation={[0, x > 0 ? 0.35 : -0.35, 0]}>
                {[-0.15, 0.15].map((y) => (
                  <mesh key={y} position={[x > 0 ? 0.14 : -0.14, y, 0]} castShadow>
                    <boxGeometry args={[0.26, 0.11, 0.02]} />
                    <primitive object={blueTape} attach="material" />
                  </mesh>
                ))}
              </group>
            ))}
          </>
        ) : (
          <>
            {/* 360 Elastic waistband ring on top */}
            <mesh position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]} geometry={waistbandRuffle}>
              <meshStandardMaterial color="#f0f5fa" roughness={0.7} />
            </mesh>
          </>
        )}

        {/* Anatomical Leg gathers (elastic leg barriers) */}
        {[-0.65, 0.65].map((x) => (
          <mesh key={x} position={[x, -0.22, 0]} rotation={[0, 0, x > 0 ? 0.4 : -0.4]}>
            <torusGeometry args={[0.35, 0.035, 12, 32, Math.PI]} />
            <meshStandardMaterial color="#dbeafe" roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
