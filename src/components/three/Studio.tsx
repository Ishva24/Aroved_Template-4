"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

/**
 * Clinical product-photography lighting rig. The environment is built from
 * Lightformers (no HDR download), giving soft softbox reflections on the
 * nitrile and fabric materials. Cyan rim lights add the brand accent.
 */
export function Studio({ shadowY = -1.45, shadowOpacity = 0.45, accent = "#18b8e0", night = false }: { shadowY?: number; shadowOpacity?: number; accent?: string; night?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
      <directionalLight position={[-4, 2, -3]} intensity={1.1} color={accent} />
      <pointLight position={[0, -1, 3]} intensity={3} color="#cfe6ff" distance={8} />

      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer form="rect" intensity={2.2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer form="rect" intensity={1.2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.6, 1]} />
          <Lightformer form="rect" intensity={1.2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.6, 1]} />
          <Lightformer form="rect" intensity={1} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} color={accent} />
          <Lightformer form="ring" intensity={1.8} position={[2, 3, 6]} scale={3} color="#ffffff" />
        </group>
      </Environment>

      {shadowOpacity > 0 && <ContactShadows position={[0, shadowY, 0]} opacity={shadowOpacity} scale={8} blur={2.6} far={3} resolution={512} color={night ? "#000000" : "#0f2c8f"} frames={Infinity} />}
    </>
  );
}
