"use client";

import { useRef } from "react";
import {
  motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll,
  useSpring, useTransform, useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Oversized marquee whose speed and skew react to scroll velocity. */
function Row({ children, base = 3, className }: { children: React.ReactNode; base?: number; className?: string }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(v, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(v, [-2000, 2000], [8, -8]);
  const dir = useRef(1);
  const reduced = useReducedMotion();
  const tx = useTransform(x, (val) => `${wrap(-50, 0, val)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = dir.current * base * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -Math.sign(base) || -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    x.set(x.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className={className} style={{ x: tx, skewX: skew }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function VelocityMarquee({ lines }: { lines: string[] }) {
  return (
    <section aria-hidden data-theme="dark" className="relative overflow-hidden bg-[#040a18] py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#040a18] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#040a18] to-transparent" />
      <Row base={-2.2} className="flex font-display text-[13vw] leading-[0.95] font-bold tracking-tight sm:text-[8.5vw]">
        {lines.map((l, i) => (
          <span key={i} className="flex items-center pr-[4vw]">
            <span className={i % 2 ? "text-outline" : "bg-gradient-to-r from-white via-cyan-soft to-[#7f9bff] bg-clip-text text-transparent"}>{l}</span>
            <span className="ml-[4vw] inline-block h-[2vw] w-[2vw] rounded-full bg-cyan shadow-[0_0_30px_#18b8e0]" />
          </span>
        ))}
      </Row>
    </section>
  );
}
