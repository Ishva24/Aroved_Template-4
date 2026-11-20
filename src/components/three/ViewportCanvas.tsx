"use client";

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor, Preload } from "@react-three/drei";
import * as THREE from "three";

// Silence benign upstream deprecation warning between Three.js r187 and @react-three/fiber
if (typeof window !== "undefined") {
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock: This module has been deprecated")) {
      return;
    }
    origWarn.apply(console, args);
  };
}

/**
 * Canvas wrapper that
 *  - only mounts WebGL once the container nears the viewport (lazy),
 *  - pauses rendering while scrolled out of view,
 *  - lowers pixel ratio automatically on slower GPUs.
 */
export function ViewportCanvas({ children, className, ...props }: CanvasProps & { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setMounted(true);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {mounted && (
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          dpr={dpr}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
          {...props}
        >
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(Math.min(2, window.devicePixelRatio))} />
          <AdaptiveDpr pixelated={false} />
          <Suspense fallback={null}>
            {children}
            <Preload all />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
