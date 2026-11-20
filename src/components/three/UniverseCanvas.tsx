"use client";

import { ViewportCanvas } from "./ViewportCanvas";
import { SceneLoader } from "./SceneLoader";
import UniverseScene, { UNIVERSE_CAMERA } from "./UniverseScene";

export default function UniverseCanvas({ viewMode = "photo" }: { viewMode?: "photo" | "3d" }) {
  return (
    <>
      <ViewportCanvas className="h-full w-full" camera={UNIVERSE_CAMERA} shadows={false}>
        <UniverseScene viewMode={viewMode} />
      </ViewportCanvas>
      <SceneLoader label="Assembling the AROSAFE universe" />
    </>
  );
}
