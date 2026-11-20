"use client";

import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";

/** DOM overlay shown while GLB models / textures stream in. */
export function SceneLoader({ label = "Preparing 3D view" }: { label?: string }) {
  const { active, progress } = useProgress();
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="pointer-events-none absolute inset-0 z-10 grid place-items-center"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-16 w-16">
              <span className="absolute inset-0 rounded-full border-2 border-brand/15" />
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan" />
              <span className="absolute inset-3 rounded-full bg-gradient-to-br from-brand to-cyan opacity-20 blur-md" />
            </div>
            <p className="text-xs font-medium tracking-[0.2em] text-ink-soft uppercase">
              {label} · {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
