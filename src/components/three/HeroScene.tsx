"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, useTexture } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Studio } from "./Studio";
import { heroState } from "./heroState";
import { CapModel, FaceMaskModel } from "./models/Apparel";
import { DrapeKitModel, ReelModel, WipesModel } from "./models/Packaging";

export { heroState };

/* ───────────────────────── central hero gloves (foreground) ───────────────────────── */
function HeroGloves() {
  const [blueTexture, blackTexture] = useTexture([
    "/generated/glove_blue_front_cutout.webp",
    "/generated/glove_black_hero.webp",
  ]);

  return (
    <group scale={0.92} position={[0, 0, 0]}>
      {/* Blue Nitrile Glove (Left, Palm Faced Front) */}
      <Float speed={1.3} rotationIntensity={0.05} floatIntensity={0.25}>
        <mesh position={[-1.05, 0.08, 0.2]} rotation={[0.04, 0.12, 0.05]}>
          <planeGeometry args={[3.8, 3.8]} />
          <meshBasicMaterial
            map={blueTexture}
            transparent
            alphaTest={0.08}
            depthWrite={true}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>

      {/* Black Nitrile Glove (Right, Palm Faced Front) */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
        <mesh position={[1.05, -0.12, -0.2]} rotation={[0.04, -0.12, -0.05]}>
          <planeGeometry args={[3.8, 3.8]} />
          <meshBasicMaterial
            map={blackTexture}
            transparent
            alphaTest={0.08}
            depthWrite={true}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Preload textures
useTexture.preload([
  "/generated/glove_blue_front_cutout.webp",
  "/generated/glove_black_hero.webp",
]);

/* ───────────────────────── orbiting product universe items ───────────────────────── */
const ORBIT_ITEMS = [
  // 1. Antiseptic Wet Wipes
  {
    node: <WipesModel color="#ffffff" accent="#18b8e0" label="WET WIPES" labelSub="ANTISEPTIC" />,
    s: 0.32,
  },
  // 2. Bouffant Cap
  {
    node: <CapModel color="#4baee0" accent="#18b8e0" />,
    s: 0.36,
  },
  // 3. Sterilization Reel
  {
    node: <ReelModel color="#d8eefc" accent="#18b8e0" />,
    s: 0.28,
  },
  // 4. Sterile Surgical Drape Kit
  {
    node: <DrapeKitModel color="#1a44c9" accent="#18b8e0" label="SURGICAL DRAPE" labelSub="STERILE" />,
    s: 0.30,
  },
  // 5. 3-Ply Face Mask
  {
    node: <FaceMaskModel color="#5fdcff" accent="#ffffff" />,
    s: 0.36,
  },
];

function FloatingProducts() {
  const root = useRef<THREE.Group>(null);
  const hero = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const { size, pointer } = useThree();

  const width = size.width;
  const wide = width >= 1024;
  const mid = width >= 768 && !wide;
  const mobile = width < 768;

  // Perfectly balanced layout: positioned cleanly in the right half of the hero
  // wide: center at x: 2.65, so orbit radius 2.65 spans [0.0, 5.3] (clears headline text at <= -0.8)
  const layout = {
    x: wide ? 2.65 : mid ? 1.4 : 0,
    y: wide ? 0.12 : mobile ? 1.05 : 0.55,
    scale: wide ? 0.96 : mobile ? 0.58 : 0.76,
  };

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const p = heroState.scroll;
    const r = root.current;
    const h = hero.current;
    const o = orbit.current;
    if (!r || !h || !o) return;

    const px = heroState.reducedMotion ? 0 : pointer.x;
    const py = heroState.reducedMotion ? 0 : pointer.y;

    // gentle parallax rotation driven by cursor and scroll
    r.rotation.y = THREE.MathUtils.damp(r.rotation.y, px * 0.16 + p * 0.25, 3, dt);
    r.rotation.x = THREE.MathUtils.damp(r.rotation.x, -py * 0.08, 3, dt);
    r.position.x = THREE.MathUtils.damp(r.position.x, layout.x - p * (wide ? 0.4 : 0), 3, dt);
    r.position.y = THREE.MathUtils.damp(r.position.y, layout.y - p * 0.45, 3, dt);
    r.position.z = THREE.MathUtils.damp(r.position.z, -p * 1.5, 3, dt);
    r.scale.setScalar(THREE.MathUtils.damp(r.scale.x, layout.scale * heroState.zoom * (1 - p * 0.15), 3, dt));

    // subtle organic breathing sway for the central gloves
    h.rotation.y = heroState.reducedMotion ? 0 : Math.sin(t * 0.4) * 0.08;
    h.rotation.x = heroState.reducedMotion ? 0 : Math.cos(t * 0.3) * 0.03;

    // continuous revolving orbit around the gloves
    o.rotation.y = heroState.reducedMotion ? 0.4 : t * 0.14;
  });

  const activeItems = mobile ? ORBIT_ITEMS.slice(0, 3) : ORBIT_ITEMS;

  return (
    <group ref={root} position={[layout.x, layout.y, 0]} scale={layout.scale}>
      {/* Foreground Hero Gloves (crystal clear & unobstructed) */}
      <group ref={hero}>
        <HeroGloves />
      </group>

      {/* Orbiting products revolving smoothly around the gloves */}
      <group ref={orbit}>
        {activeItems.map((item, i) => {
          const a = (i / activeItems.length) * Math.PI * 2;
          return (
            <Float
              key={i}
              speed={1 + i * 0.2}
              rotationIntensity={0.35}
              floatIntensity={0.55}
            >
              <group
                position={[
                  Math.cos(a) * 2.65,
                  Math.sin(a * 2) * 0.7 + 0.1,
                  Math.sin(a) * 2.2 - 0.3,
                ]}
                scale={item.s}
              >
                {item.node}
              </group>
            </Float>
          );
        })}
      </group>
    </group>
  );
}

function CameraRig() {
  useFrame((state, dt) => {
    const target = (9.8 - heroState.scroll * 2) * heroState.zoom;
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, target, 4, dt);
  });
  return null;
}

export default function HeroScene({ effects = true }: { effects?: boolean }) {
  return (
    <>
      {/* Sapphire Clinical Studio Rig with realistic soft contact shadows */}
      <Studio night={false} shadowOpacity={0.35} shadowY={-1.5} accent="#034ea2" />

      {/* High-Key Clinical Lighting tuned to the #034ea2 Sapphire backdrop */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} color="#ffffff" />
      {/* Radiant Cyan rim highlight (#38bdf8) */}
      <pointLight position={[3.5, 3, 3]} intensity={5.0} color="#38bdf8" distance={14} />
      {/* Fresh Bio-Green rim accent echoing 'ARO' (#4ade80) */}
      <pointLight position={[-3.5, 2, 2.5]} intensity={4.0} color="#4ade80" distance={12} />
      {/* Royal Sapphire base depth fill (#034ea2) */}
      <pointLight position={[0, -2, 4]} intensity={3.5} color="#034ea2" distance={10} />
      {/* Warm Orange subtle bounce echoing the swoosh tip (#e96d0a) */}
      <pointLight position={[2, -2.5, 2]} intensity={3.0} color="#e96d0a" distance={10} />

      {/* Foreground Gloves + 360° Orbiting Products */}
      <FloatingProducts />

      {/* Ambient floating sapphire & bio-green sparkles */}
      <Float speed={1.0} floatIntensity={0.5}>
        <Sparkles count={30} scale={[12, 7, 5]} size={2.2} speed={0.14} opacity={0.5} color="#38bdf8" />
      </Float>
      <Sparkles count={20} scale={[10, 5, 4]} size={1.9} speed={0.12} opacity={0.4} color="#4ade80" />
      <Sparkles count={12} scale={[8, 4, 3]} size={1.6} speed={0.08} opacity={0.3} color="#ffffff" />
      <CameraRig />
    </>
  );
}
