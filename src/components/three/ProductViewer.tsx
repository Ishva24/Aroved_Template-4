"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";
import clsx from "clsx";
import type { ModelSpec } from "@/lib/products";
import { ViewportCanvas } from "./ViewportCanvas";
import { SceneLoader } from "./SceneLoader";
import { ProductStage, STAGE_CAMERA, type StageHandle } from "./ProductStage";

interface Props {
  spec: ModelSpec;
  modelKey: string;
  label: string;
  className?: string;
  /** Wheel zoom captures page scroll; enable it only on dedicated viewers. */
  wheelZoom?: boolean;
  compact?: boolean;
}

const btn =
  "grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-white hover:text-brand focus-visible:bg-white";

/** Interactive 360° product viewer: drag to rotate, pinch / buttons to zoom, keyboard accessible. */
export default function ProductViewer({ spec, modelKey, label, className, wheelZoom = true, compact = false }: Props) {
  const stage = useRef<StageHandle>(null);
  const reduced = useReducedMotion();
  const [spin, setSpin] = useState(!reduced);

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, () => void> = {
      ArrowLeft: () => stage.current?.rotate(-0.3),
      ArrowRight: () => stage.current?.rotate(0.3),
      "+": () => stage.current?.zoom(0.8),
      "=": () => stage.current?.zoom(0.8),
      "-": () => stage.current?.zoom(1.25),
      "0": () => stage.current?.reset(),
    };
    if (map[e.key]) {
      e.preventDefault();
      map[e.key]();
    }
  };

  return (
    <div
      className={clsx("group relative overflow-hidden", className)}
      role="region"
      aria-roledescription="3D viewer"
      aria-label={`${label} — interactive 3D view. Drag to rotate. Use arrow keys to rotate, plus and minus to zoom, 0 to reset.`}
      tabIndex={0}
      onKeyDown={onKey}
    >
      <ViewportCanvas className="absolute inset-0 cursor-grab active:cursor-grabbing" camera={STAGE_CAMERA}>
        <ProductStage ref={stage} spec={spec} modelKey={modelKey} autoRotate={spin} allowZoom={wheelZoom} />
      </ViewportCanvas>
      <SceneLoader />

      <div className={clsx("glass absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full p-1", compact ? "bottom-3" : "bottom-5")}>
        <button type="button" className={btn} onClick={() => stage.current?.zoom(0.8)} aria-label="Zoom in">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="7" /><path d="M11 8v6M8 11h6M20 20l-3.5-3.5" /></svg>
        </button>
        <button type="button" className={btn} onClick={() => stage.current?.zoom(1.25)} aria-label="Zoom out">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="7" /><path d="M8 11h6M20 20l-3.5-3.5" /></svg>
        </button>
        <button type="button" className={clsx(btn, spin && "bg-white text-brand")} onClick={() => setSpin((s) => !s)} aria-pressed={spin} aria-label="Toggle 360° auto-rotate">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></svg>
        </button>
        <button type="button" className={btn} onClick={() => stage.current?.reset()} aria-label="Reset view">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 12h4M17 12h4M12 3v4M12 17v4" /><circle cx="12" cy="12" r="3" /></svg>
        </button>
      </div>
      {!compact && (
        <p className="pointer-events-none absolute top-5 left-1/2 z-10 -translate-x-1/2 text-[11px] font-medium tracking-[0.2em] text-ink-soft/70 uppercase opacity-0 transition group-hover:opacity-100">
          Drag to rotate · Scroll to zoom
        </p>
      )}
    </div>
  );
}
