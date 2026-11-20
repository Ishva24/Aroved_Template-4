'use client';

import { RoundedBox } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { ClothSheet, ribbonGeometry } from './Cloth';
import {
  useDrapeTextures,
  useGownTextures,
  useIndicatorStripTexture,
  useLabelSheetTexture,
  useLabelTexture,
  useReelSideTexture,
  useRollFaceTexture,
  useTapeTexture,
} from '../textures';

interface BaseProps {
  color: string;
  accent: string;
  label?: string;
  labelSub?: string;
}

const glossy = { roughness: 0.34, clearcoat: 0.6, clearcoatRoughness: 0.25 } as const;

/* ───────────────────────── wet wipes pouch ───────────────────────── */

export function WipesModel({ accent, label = 'WET WIPES', labelSub = 'ANTISEPTIC' }: BaseProps) {
  const tex = useLabelTexture({ title: label, subtitle: labelSub, accent, width: 1024, height: 1400 });

  return (
    <group position={[0, -0.3, 0]} rotation={[0, -0.35, 0]}>
      <RoundedBox args={[1.8, 2.5, 0.46]} radius={0.12} smoothness={5}>
        <meshPhysicalMaterial color="#ffffff" {...glossy} />
      </RoundedBox>
      {/* printed faces */}
      <mesh position={[0, 0, 0.235]}>
        <planeGeometry args={[1.64, 2.3]} />
        <meshPhysicalMaterial map={tex} {...glossy} />
      </mesh>
      <mesh position={[0, 0, -0.235]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.64, 2.3]} />
        <meshPhysicalMaterial map={tex} {...glossy} />
      </mesh>
      {/* heat-sealed crimps */}
      {[1.32, -1.32].map((y) => (
        <RoundedBox key={y} args={[1.8, 0.16, 0.16]} radius={0.05} smoothness={3} position={[0, y, 0]}>
          <meshPhysicalMaterial color={accent} {...glossy} />
        </RoundedBox>
      ))}
      {/* towel peeking out */}
      <ClothSheet
        width={1.25}
        height={0.95}
        amplitude={0.07}
        frequency={3.2}
        color="#ffffff"
        position={[0, 1.75, 0.04]}
        rotation={[-0.2, 0, 0.05]}
        animate
        speed={0.5}
      />
    </group>
  );
}

/* ───────────────────────── under pads ───────────────────────── */

export function UnderPadModel({ color, accent, label = 'UNDER PAD', labelSub = '60 × 90 cm' }: BaseProps) {
  const tex = useLabelTexture({ title: label, subtitle: labelSub, accent, width: 1024, height: 512 });

  return (
    <group rotation={[0.6, -0.55, 0]} position={[0, -0.2, 0]}>
      {[0, 1, 2].map((i) => (
        <RoundedBox
          key={i}
          args={[2.7, 0.1, 1.95]}
          radius={0.04}
          smoothness={3}
          position={[0, i * 0.115, 0]}
          rotation={[0, i * 0.07 - 0.07, 0]}
        >
          <meshPhysicalMaterial color={i === 2 ? color : '#cfe6fb'} roughness={0.85} sheen={1} sheenColor="#ffffff" />
        </RoundedBox>
      ))}
      {/* absorbent core hint */}
      <mesh position={[0, 0.286, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.3, 1.55]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.28} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.291, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.75]} />
        <meshPhysicalMaterial map={tex} {...glossy} />
      </mesh>
    </group>
  );
}

/* ───────────────────────── surgical drape kit ───────────────────────── */

export function DrapeKitModel({
  color,
  accent,
  label = 'SURGICAL DRAPE',
  labelSub = 'STERILE',
  variant = 'single',
}: BaseProps & { variant?: string }) {
  const tex = useLabelTexture({ title: label, subtitle: labelSub, accent: color, width: 1024, height: 704 });
  const drape = useDrapeTextures(color);
  const major = variant === 'major';
  const minor = variant === 'minor';

  return (
    <group position={[0, -0.7, 0]} rotation={[0, -0.3, 0]}>
      {/* sterile pack(s) */}
      <RoundedBox args={[2.1, 0.42, 1.45]} radius={0.08} smoothness={4} position={[0, -0.2, 0.55]}>
        <meshPhysicalMaterial color="#f4f8fb" {...glossy} />
      </RoundedBox>
      <mesh position={[0, 0.012, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.95, 1.3]} />
        <meshPhysicalMaterial map={tex} {...glossy} />
      </mesh>
      {major && (
        <RoundedBox args={[1.85, 0.34, 1.25]} radius={0.07} smoothness={4} position={[0.1, 0.17, 0.55]} rotation={[0, 0.16, 0]}>
          <meshPhysicalMaterial color="#e9f2f8" {...glossy} />
        </RoundedBox>
      )}

      {/* unfolded drape(s) with fenestration */}
      <ClothSheet
        width={2.55}
        height={1.75}
        amplitude={0.07}
        frequency={2.2}
        map={drape.map}
        alphaMap={drape.alphaMap}
        position={[0, 1.35, -0.45]}
        rotation={[-0.1, 0, 0]}
        scale={minor ? 0.85 : 1}
        animate
      />
      {major && (
        <ClothSheet
          width={2.55}
          height={1.75}
          amplitude={0.06}
          frequency={2}
          color={color}
          position={[0.45, 1.25, -1.05]}
          rotation={[-0.1, -0.35, 0]}
          animate
          speed={0.45}
        />
      )}
    </group>
  );
}

/* ───────────────────────── surgeon gown ───────────────────────── */

export function GownModel({ color, accent }: BaseProps) {
  const gown = useGownTextures(color, accent);
  return (
    <group position={[0, 0, 0]} rotation={[0, -0.25, 0]}>
      <ClothSheet
        width={3.1}
        height={3.1}
        segments={48}
        amplitude={0.07}
        frequency={1.9}
        map={gown.map}
        alphaMap={gown.alphaMap}
        animate
        speed={0.4}
      />
    </group>
  );
}

/* ───────────────────────── sterilization reel ───────────────────────── */

export function ReelModel({ color, accent }: BaseProps) {
  const face = useRollFaceTexture(color, '#a9cde6');
  const side = useReelSideTexture('#cfe9fb', '#ffffff', accent);

  const tail = useMemo(
    () =>
      ribbonGeometry(
        [
          new THREE.Vector3(0.1, -1.25, 0),
          new THREE.Vector3(1.0, -1.3, 0),
          new THREE.Vector3(1.9, -1.2, 0),
          new THREE.Vector3(2.6, -0.95, 0),
          new THREE.Vector3(3.1, -0.55, 0),
        ],
        0.98,
      ),
    [],
  );
  useEffect(() => () => tail.dispose(), [tail]);

  return (
    <group position={[-0.8, 0.1, 0]} rotation={[0.12, -0.55, 0]}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        {/* paper layers: side + both faces */}
        <mesh>
          <cylinderGeometry args={[1.25, 1.25, 1, 72, 1]} />
          <meshPhysicalMaterial attach="material-0" map={side} roughness={0.55} clearcoat={0.3} />
          <meshStandardMaterial attach="material-1" map={face} roughness={0.8} />
          <meshStandardMaterial attach="material-2" map={face} roughness={0.8} />
        </mesh>
        {/* cardboard core */}
        <mesh>
          <cylinderGeometry args={[0.36, 0.36, 1.18, 40]} />
          <meshStandardMaterial color="#c9a66b" roughness={0.9} />
        </mesh>
        {/* hole */}
        {[0.6, -0.6].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[y > 0 ? -Math.PI / 2 : Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.22, 32]} />
            <meshBasicMaterial color="#1c2329" />
          </mesh>
        ))}
        {/* edge rims (rings, so the paper-layer faces stay visible) */}
        {[0.5, -0.5].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.26, 0.045, 12, 72]} />
            <meshPhysicalMaterial color="#f3f9ff" roughness={0.3} clearcoat={0.6} />
          </mesh>
        ))}
      </group>
      {/* unrolled film tail */}
      <mesh geometry={tail}>
        <meshPhysicalMaterial
          color="#dff1ff"
          roughness={0.25}
          clearcoat={0.8}
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ───────────────────────── wrapping sheets ───────────────────────── */

export function WrapModel({ color }: BaseProps) {
  return (
    <group rotation={[0.5, -0.5, 0]} position={[0, -0.3, 0]}>
      {[0, 1, 2, 3].map((i) => (
        <RoundedBox
          key={i}
          args={[2.4, 0.13, 2]}
          radius={0.05}
          smoothness={3}
          position={[0, i * 0.14, 0]}
          rotation={[0, (i % 2 ? 1 : -1) * 0.05, 0]}
        >
          <meshPhysicalMaterial color={i % 2 ? color : '#7bbcf6'} roughness={0.88} sheen={1} sheenColor="#ffffff" />
        </RoundedBox>
      ))}
      <ClothSheet
        width={2.4}
        height={2}
        amplitude={0.1}
        frequency={2.6}
        color={color}
        position={[0.25, 0.8, 0.15]}
        rotation={[-Math.PI / 2 + 0.25, 0, 0.12]}
        animate
        speed={0.5}
      />
    </group>
  );
}

/* ───────────────────────── indicators & autoclave tape ───────────────────────── */

export function IndicatorModel({ color }: BaseProps) {
  const tape = useTapeTexture(color, '#8f9aa6');
  const strip = useIndicatorStripTexture();
  const profile = useMemo(
    () => [
      new THREE.Vector2(0.3, -0.26),
      new THREE.Vector2(0.95, -0.26),
      new THREE.Vector2(0.95, 0.26),
      new THREE.Vector2(0.3, 0.26),
      new THREE.Vector2(0.3, -0.26),
    ],
    [],
  );

  return (
    <group position={[0, -0.1, 0]} rotation={[0, -0.2, 0]}>
      {/* tape roll */}
      <group position={[-0.95, -0.35, 0.2]} rotation={[0.95, 0, 0.25]}>
        <mesh>
          <latheGeometry args={[profile, 72]} />
          <meshPhysicalMaterial map={tape} roughness={0.5} clearcoat={0.25} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.28, 0.28, 0.52, 40, 1, true]} />
          <meshStandardMaterial color="#bfa070" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* indicator strips */}
      {[
        { x: 1.0, r: -0.28, y: 0.15 },
        { x: 1.55, r: -0.08, y: 0.05 },
        { x: 2.1, r: 0.14, y: -0.05 },
      ].map((s, i) => (
        <mesh key={i} position={[s.x, s.y, 0.1 * i]} rotation={[0, -0.3, s.r]}>
          <boxGeometry args={[0.42, 2.0, 0.03]} />
          <meshPhysicalMaterial map={strip} roughness={0.55} clearcoat={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* ───────────────────────── CSSD labels ───────────────────────── */

export function LabelsModel({ accent }: BaseProps) {
  const sheet = useLabelSheetTexture(accent);
  return (
    <group rotation={[-0.15, -0.5, 0]}>
      <mesh position={[0.35, 0.1, -0.35]} rotation={[0, 0.15, 0.06]}>
        <boxGeometry args={[2.1, 2.7, 0.03]} />
        <meshPhysicalMaterial map={sheet} roughness={0.5} clearcoat={0.3} />
      </mesh>
      <mesh position={[-0.3, -0.1, 0.2]} rotation={[0, -0.1, -0.05]}>
        <boxGeometry args={[2.1, 2.7, 0.03]} />
        <meshPhysicalMaterial map={sheet} roughness={0.5} clearcoat={0.3} />
      </mesh>
    </group>
  );
}
