"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Product } from "@/lib/products";
import { getCategory, products } from "@/lib/products";

/** Spotlight card: pointer-tracked glow, 3D-tilting product shot, oversized index numeral. */
export function ProductCard({ product }: { product: Product }) {
  const cat = getCategory(product.category);
  const index = products.findIndex((p) => p.slug === product.slug) + 1;
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 180, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    mx.set(x); my.set(y);
    ref.current!.style.setProperty("--mx", `${x * 100}%`);
    ref.current!.style.setProperty("--my", `${y * 100}%`);
  };

  return (
    <Link
      ref={ref}
      href={`/products/${product.slug}`}
      onPointerMove={onMove}
      onPointerLeave={() => (mx.set(0.5), my.set(0.5))}
      data-cursor="View"
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#030e24] text-white ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:ring-[#0284c7]/40 shadow-lg"
    >
      {/* Spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${cat.accent}55, transparent 60%)` }}
      />
      <span aria-hidden className="pointer-events-none absolute -top-6 -right-2 font-display text-[7.5rem] leading-none font-bold text-outline opacity-40 transition group-hover:opacity-80">
        {String(index).padStart(2, "0")}
      </span>

      <div className="relative aspect-[4/3] [perspective:900px]">
        <div aria-hidden className="absolute inset-x-10 bottom-6 h-10 rounded-[50%] blur-2xl" style={{ background: cat.accent, opacity: 0.45 }} />
        {product.image && (
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="absolute inset-6 overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-[1.03]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
              priority={index <= 8}
              loading={index <= 8 ? "eager" : "lazy"}
              decoding="async"
              className="object-contain p-4"
            />
          </motion.div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-6 pt-2">
        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-[#86efac] uppercase">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.accent, boxShadow: `0 0 8px ${cat.accent}` }} />
          {cat.short}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm text-white/55">{product.tagline}</p>
        <span className="mt-auto flex items-center justify-between pt-6">
          <span className="text-sm font-semibold">View in 3D</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition duration-500 group-hover:rotate-[-45deg] group-hover:bg-[#4ade80] group-hover:text-[#024089]">→</span>
        </span>
      </div>
    </Link>
  );
}
