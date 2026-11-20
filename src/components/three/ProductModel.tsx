"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { ModelSpec } from "@/lib/products";
import { Glove } from "./Glove";
import { Gown } from "./Gown";
import {
  BouffantCap, DiaperModel, DrapeKit, FaceMask, IndicatorTape, LabelRoll, ShoeCover,
  SterilizationReel, UnderPad, WipesPack, WrapSheets,
} from "./ProceduralModels";

/** Per-model framing so every product sits at a similar visual size. */
const FRAMING: Record<ModelSpec["kind"], { scale: number; y: number; rx?: number; ry?: number }> = {
  glove: { scale: 0.95, y: 0.05 },
  gown: { scale: 0.9, y: 0.12 },
  "drape-kit": { scale: 1.05, y: -0.15, rx: 0.35 },
  wipes: { scale: 1.1, y: 0, rx: 0.3 },
  underpad: { scale: 1.1, y: 0, rx: 0.35 },
  cap: { scale: 1.15, y: 0, rx: 0.2 },
  "shoe-cover": { scale: 1.2, y: 0, rx: 0.15 },
  mask: { scale: 1.2, y: 0, rx: 0 },
  reel: { scale: 0.95, y: 0.15, rx: 0.3, ry: 0.75 },
  "wrap-sheet": { scale: 1.1, y: -0.1, rx: 0.4 },
  indicator: { scale: 1.1, y: 0.1, rx: 0.45, ry: -0.65 },
  label: { scale: 1.1, y: 0, rx: 0.3, ry: -0.4 },
  diaper: { scale: 1.05, y: 0, rx: 0.25 },
};

function Model({ spec }: { spec: ModelSpec }) {
  switch (spec.kind) {
    case "glove": return <Glove finish={spec.finish} />;
    case "gown": return <Gown />;
    case "drape-kit": return <DrapeKit tone={spec.tone} />;
    case "wipes": return <WipesPack />;
    case "underpad": return <UnderPad />;
    case "cap": return <BouffantCap />;
    case "shoe-cover": return <ShoeCover />;
    case "mask": return <FaceMask />;
    case "reel": return <SterilizationReel />;
    case "wrap-sheet": return <WrapSheets />;
    case "indicator": return <IndicatorTape />;
    case "label": return <LabelRoll />;
    case "diaper": return <DiaperModel variant={spec.variant} />;
  }
}

/** Renders a product model with a springy scale-and-spin entrance whenever it changes. */
export function ProductModel({ spec, size = 1 }: { spec: ModelSpec; size?: number }) {
  const ref = useRef<THREE.Group>(null);
  const born = useRef<number | null>(null);
  const f = FRAMING[spec.kind];

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    if (born.current === null) born.current = state.clock.elapsedTime;
    const t = Math.min((state.clock.elapsedTime - born.current) / 1.1, 1);
    const ease = 1 - Math.pow(1 - t, 4);
    const overshoot = 1 + Math.sin(ease * Math.PI) * 0.04;
    g.scale.setScalar(f.scale * size * (0.6 + 0.4 * ease) * overshoot);
    g.rotation.y = (1 - ease) * -1.4;
  });

  return (
    <group ref={ref} position={[0, f.y, 0]} scale={0.001}>
      <group rotation={[f.rx ?? 0, f.ry ?? 0, 0]}>
        <Model spec={spec} />
      </group>
    </group>
  );
}
