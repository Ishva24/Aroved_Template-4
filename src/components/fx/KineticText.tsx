"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

/**
 * Variable-font proximity effect: each letter's weight (and a subtle lift)
 * responds to the pointer distance, using Sora's variable `wght` axis.
 * Renders plain text for screen readers.
 */
export function KineticText({ text, className, min = 300, max = 800, radius = 260 }: { text: string; className?: string; min?: number; max?: number; radius?: number }) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-l]"));
    let px = -9999, py = -9999, raf = 0, active = false;
    const current = letters.map(() => min + (max - min) * 0.45);
    const onMove = (e: PointerEvent) => { px = e.clientX; py = e.clientY; if (!active) { active = true; raf = requestAnimationFrame(loop); } };
    const loop = () => {
      let moving = false;
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / radius);
        const target = min + (max - min) * (0.45 + 0.55 * t * t);
        current[i] += (target - current[i]) * 0.16;
        if (Math.abs(target - current[i]) > 0.5) moving = true;
        l.style.fontVariationSettings = `"wght" ${current[i].toFixed(0)}`;
        l.style.transform = `translateY(${(-t * t * 6).toFixed(2)}px)`;
      });
      if (moving) raf = requestAnimationFrame(loop);
      else active = false;
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => { removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, [min, max, radius]);

  return (
    <span ref={root} className={clsx("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((word, wi, arr) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split("").map((ch, ci) => (
              <span key={ci} data-l className="inline-block will-change-transform" style={{ fontVariationSettings: `"wght" ${min + (max - min) * 0.45}` }}>
                {ch}
              </span>
            ))}
            {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </span>
  );
}
