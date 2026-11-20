"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Grid, Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { categories, products } from "@/lib/products";
import { ProductModel } from "./ProductModel";
import { ProductPhotoStation } from "./ProductPhotoStation";
import { Studio } from "./Studio";

import { universeState } from "./universeState";

const N = products.length;
const STEP = (Math.PI * 2) / N;
const R = 6.4;
const accentOf = (id: string) => new THREE.Color(categories.find((c) => c.id === id)!.accent).lerp(new THREE.Color("#5fdcff"), 0.35);

const beamVert = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const beamFrag = /* glsl */ `
  uniform vec3 uColor; uniform float uStrength; uniform float uTime; varying vec2 vUv;
  void main(){
    float fade = pow(1.0 - vUv.y, 2.2);
    float shimmer = 0.75 + 0.25 * sin(vUv.y * 40.0 - uTime * 3.0);
    gl_FragColor = vec4(uColor, fade * shimmer * 0.38 * uStrength);
  }`;

/** One product station: pedestal, glowing rim, light beam and either realistic photography showcase or 3D schematic. */
function Station({ index, viewMode = "photo" }: { index: number; viewMode?: "photo" | "3d" }) {
  const p = products[index];
  const group = useRef<THREE.Group>(null);
  const model = useRef<THREE.Group>(null);
  const rim = useRef<THREE.MeshBasicMaterial>(null);
  const color = useMemo(() => accentOf(p.category), [p.category]);
  const beamUniforms = useMemo(() => ({ uColor: { value: color }, uStrength: { value: 0 }, uTime: { value: 0 } }), [color]);
  const angle = index * STEP;

  useFrame((state, dt) => {
    // Shortest signed distance on the ring between this station and the focus.
    let d = index - universeState.progress;
    d = ((d % N) + N + N / 2) % N - N / 2;
    const isVisible = Math.abs(d) <= 3.8;
    const g = group.current, m = model.current;
    if (!g || !m) return;
    g.visible = isVisible;
    if (!isVisible) return; // Skip off-camera stations completely

    const focus = Math.max(0, 1 - Math.abs(d));
    const s = THREE.MathUtils.damp(g.scale.x, 0.58 + focus * 0.42, 6, dt);
    g.scale.setScalar(s);
    g.position.y = THREE.MathUtils.damp(g.position.y, focus * 0.25, 6, dt);

    if (viewMode === "3d") {
      m.rotation.y += dt * (0.25 + focus * 0.5);
      m.position.y = Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.05 * (0.4 + focus);
    }
    if (rim.current) rim.current.opacity = 0.25 + focus * 0.75;
    beamUniforms.uStrength.value = 0.2 + focus * 0.8;
    beamUniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group position={[Math.sin(angle) * R, 0, Math.cos(angle) * R]} rotation={[0, angle, 0]}>
      <group ref={group}>
        <group ref={model} position={[0, 0.2, 0]}>
          {viewMode === "photo" ? (
            <ProductPhotoStation product={p} color={color} focus={1} />
          ) : (
            <ProductModel spec={p.model} size={0.78} />
          )}
        </group>
        {/* Pedestal */}
        <mesh position={[0, -1.02, 0]}>
          <cylinderGeometry args={[0.78, 0.88, 0.12, 64]} />
          <meshStandardMaterial color="#0b1430" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.945, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.78, 64]} />
          <meshBasicMaterial ref={rim} color={color} transparent toneMapped={false} />
        </mesh>
        {/* Light beam */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.66, 0.74, 2.4, 48, 1, true]} />
          <shaderMaterial vertexShader={beamVert} fragmentShader={beamFrag} uniforms={beamUniforms} transparent depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

/** Category arcs on the floor — each category owns a coloured segment of the ring. */
function CategoryArcs() {
  const arcs = useMemo(() => {
    let start = 0;
    return categories.map((c) => {
      const count = products.filter((p) => p.category === c.id).length;
      const arc = { color: accentOf(c.id), start: start * STEP - STEP / 2 + 0.04, length: count * STEP - 0.08 };
      start += count;
      return arc;
    });
  }, []);
  return (
    <group position={[0, -1.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {arcs.map((a, i) => (
        // After the -90° X rotation, local angle t maps to ring angle θ = t + π/2.
        <mesh key={i}>
          <ringGeometry args={[R + 1.25, R + 1.32, 96, 1, a.start - Math.PI / 2, a.length]} />
          <meshBasicMaterial color={a.color} toneMapped={false} transparent opacity={0.9} />
        </mesh>
      ))}
      <mesh>
        <ringGeometry args={[R - 1.3, R - 1.27, 160]} />
        <meshBasicMaterial color="#5fdcff" transparent opacity={0.25} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Ring({ viewMode = "photo" }: { viewMode?: "photo" | "3d" }) {
  const ring = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!ring.current) return;
    const target = -universeState.progress * STEP;
    ring.current.rotation.y = THREE.MathUtils.damp(ring.current.rotation.y, target, 5, dt);
    // Gentle pointer parallax on the camera
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, universeState.pointerX * 0.5, 3, dt);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, 1.05 + universeState.pointerY * 0.25, 3, dt);
    cam.lookAt(0, -0.65, R);
  });
  return (
    <group ref={ring} position={[0, -0.55, 0]}>
      {products.map((p, i) => (
        <Station key={p.slug} index={i} viewMode={viewMode} />
      ))}
      <CategoryArcs />
    </group>
  );
}

export default function UniverseScene({ effects = false, viewMode = "photo" }: { effects?: boolean; viewMode?: "photo" | "3d" }) {
  return (
    <>
      <color attach="background" args={["#040a18"]} />
      <fog attach="fog" args={["#040a18", 9, 19]} />
      <Studio night shadowOpacity={0} />
      <Ring viewMode={viewMode} />
      <Grid
        position={[0, -1.65, 0]}
        args={[40, 40]}
        cellSize={0.6}
        cellThickness={0.6}
        cellColor="#12306e"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#1a6fb0"
        fadeDistance={22}
        fadeStrength={1.4}
        infiniteGrid
      />
      <Sparkles count={120} scale={[20, 6, 20]} position={[0, 0.9, 0]} size={2.2} speed={0.25} opacity={0.7} color="#5fdcff" />
      {effects && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom mipmapBlur intensity={1.1} luminanceThreshold={0.5} luminanceSmoothing={0.2} radius={0.75} />
          <Vignette eskil={false} offset={0.2} darkness={0.7} />
        </EffectComposer>
      )}
    </>
  );
}

export const UNIVERSE_CAMERA = { position: [0, 1.05, R + 7.8] as [number, number, number], fov: 34 };
