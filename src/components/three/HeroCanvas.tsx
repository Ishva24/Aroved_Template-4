"use client";

import Image from "next/image";
import { ViewportCanvas } from "./ViewportCanvas";
import HeroScene from "./HeroScene";
import { SceneLoader } from "./SceneLoader";

function HeroFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#02336e] via-[#034ea2] to-[#01224d]">
      <div className="relative flex items-center justify-center gap-6 opacity-90">
        <Image
          src="/generated/glove_blue_front_cutout.webp"
          alt="AROSAFE Blue Nitrile Glove"
          width={320}
          height={320}
          className="h-64 sm:h-80 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          priority
        />
        <Image
          src="/generated/glove_black_hero.webp"
          alt="AROSAFE Black Nitrile Glove"
          width={320}
          height={320}
          className="h-64 sm:h-80 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          priority
        />
      </div>
    </div>
  );
}

export default function HeroCanvas() {
  return (
    <>
      <ViewportCanvas
        className="h-full w-full"
        camera={{ position: [0, 0, 9.5], fov: 35 }}
      >
        <HeroScene />
      </ViewportCanvas>
      <SceneLoader label="Loading AROSAFE" />
    </>
  );
}
