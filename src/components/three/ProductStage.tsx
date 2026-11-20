"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { ModelSpec } from "@/lib/products";
import { ProductModel } from "./ProductModel";
import { Studio } from "./Studio";

export interface StageHandle {
  zoom: (factor: number) => void;
  reset: () => void;
  rotate: (radians: number) => void;
}

interface Props {
  spec: ModelSpec;
  modelKey: string;
  autoRotate: boolean;
  allowZoom?: boolean;
}

const HOME = new THREE.Vector3(0, 0.35, 5.4);

/** 3D product stage used by the gallery and product detail pages. */
export const ProductStage = forwardRef<StageHandle, Props>(function ProductStage({ spec, modelKey, autoRotate, allowZoom = true }, ref) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const desired = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    zoom: (factor) => {
      const c = controls.current;
      if (!c) return;
      const dist = camera.position.distanceTo(c.target);
      desired.current = THREE.MathUtils.clamp(dist * factor, c.minDistance, c.maxDistance);
    },
    reset: () => {
      desired.current = null;
      camera.position.copy(HOME);
      controls.current?.target.set(0, 0, 0);
      controls.current?.update();
    },
    rotate: (radians) => {
      const c = controls.current;
      if (!c) return;
      const offset = camera.position.clone().sub(c.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), radians);
      camera.position.copy(c.target).add(offset);
      c.update();
    },
  }));

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c || desired.current === null) return;
    const dir = camera.position.clone().sub(c.target);
    const len = THREE.MathUtils.damp(dir.length(), desired.current, 6, dt);
    camera.position.copy(c.target).add(dir.setLength(len));
    if (Math.abs(len - desired.current) < 0.01) desired.current = null;
  });

  return (
    <>
      <Studio shadowY={-1.42} />
      <ProductModel key={modelKey} spec={spec} />
      <Sparkles count={28} scale={[6, 4, 4]} size={2} speed={0.25} opacity={0.5} color="#18b8e0" />
      <OrbitControls
        ref={controls}
        makeDefault
        enablePan={false}
        enableZoom={allowZoom}
        autoRotate={autoRotate}
        autoRotateSpeed={1.4}
        enableDamping
        dampingFactor={0.07}
        minDistance={2.6}
        maxDistance={8}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.58}
      />
    </>
  );
});

export const STAGE_CAMERA = { position: HOME.toArray() as [number, number, number], fov: 38 };
