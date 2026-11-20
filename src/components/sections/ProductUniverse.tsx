"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { gsap } from "@/lib/gsap";
import { categories, getCategory, products } from "@/lib/products";
import { Magnetic } from "@/components/fx/Magnetic";
import { universeState } from "@/components/three/universeState";

const UniverseCanvas = dynamic(() => import("@/components/three/UniverseCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,#0c2160_0%,#040a18_70%)]" />,
});

const N = products.length;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * AROSAFE Universe — the whole range on a 3D carousel ring.
 * - Vertical scroll: scrolls the page naturally up/down without hijacking.
 * - Horizontal scroll (trackpad swipe left/right, shift+wheel): rotates through products.
 * - Click & drag / touch swipe: drags carousel left/right with inertial snapping.
 */
export function ProductUniverse() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [viewMode, setViewMode] = useState<"photo" | "3d">("photo");
  const [hudTab, setHudTab] = useState<"overview" | "specs">("overview");
  const product = products[active];
  const category = getCategory(product.category);

  const activeRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartProgress = useRef(0);

  const goTo = useCallback((i: number) => {
    const idx = Math.max(0, Math.min(N - 1, i));
    activeRef.current = idx;
    setActive(idx);
    gsap.to(universeState, {
      progress: idx,
      duration: 0.65,
      ease: "power2.out",
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, select")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(activeRef.current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(activeRef.current - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  // Horizontal scroll listener (trackpad horizontal scroll, shift + wheel, tilt wheel)
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    let snapTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      // Detect horizontal scroll intention (deltaX > deltaY, or holding Shift key)
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (isHorizontal) {
        const dx = e.shiftKey ? e.deltaY : e.deltaX;
        if (Math.abs(dx) > 1) {
          e.preventDefault();
          // Sensitivity factor
          const deltaProgress = dx * 0.0035;
          const nextProgress = Math.max(0, Math.min(N - 1, universeState.progress + deltaProgress));
          universeState.progress = nextProgress;
          const nextActive = Math.round(nextProgress);
          if (nextActive !== activeRef.current) {
            activeRef.current = nextActive;
            setActive(nextActive);
          }

          clearTimeout(snapTimer);
          snapTimer = setTimeout(() => {
            const snapIdx = Math.round(universeState.progress);
            goTo(snapIdx);
          }, 140);
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      clearTimeout(snapTimer);
    };
  }, [goTo]);

  // Pointer drag handling (mouse drag & touch swipe)
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, textarea, select, [role='tab']")) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartProgress.current = universeState.progress;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Parallax tracking
    universeState.pointerX = (e.clientX / innerWidth) * 2 - 1;
    universeState.pointerY = -((e.clientY / innerHeight) * 2 - 1);

    if (!isDragging.current) return;
    const dx = dragStartX.current - e.clientX;
    // ~240px drag per product step
    const deltaProgress = dx / 240;
    const nextProgress = Math.max(0, Math.min(N - 1, dragStartProgress.current + deltaProgress));
    universeState.progress = nextProgress;
    const nextActive = Math.round(nextProgress);
    if (nextActive !== activeRef.current) {
      activeRef.current = nextActive;
      setActive(nextActive);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
    const snapIdx = Math.round(universeState.progress);
    goTo(snapIdx);
  };

  return (
    <section
      ref={root}
      id="universe"
      className="grain relative h-[100svh] overflow-hidden bg-[var(--night)] text-white cursor-grab active:cursor-grabbing select-none [touch-action:pan-y]"
      aria-labelledby="universe-title"
      aria-roledescription="carousel"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      data-theme="dark"
    >
      <div className="absolute inset-0">
        <UniverseCanvas viewMode={viewMode} />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,transparent_40%,#040a18_85%)]" />

      {/* Header + category tabs + view mode selector */}
      <div className="relative z-10 container-x pt-16 sm:pt-20 lg:pt-18">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-[11px] tracking-[0.3em] text-[#86efac] uppercase">
                <span className="text-[#4ade80] font-bold">{pad(active + 1)}</span> / {pad(N)} · The full range
              </p>
              {/* View Mode Toggle Pill */}
              <div className="liquid-glass inline-flex items-center gap-1 rounded-full p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("photo")}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition",
                    viewMode === "photo" ? "bg-white text-ink shadow-sm" : "text-white/60 hover:text-white"
                  )}
                  title="Display genuine AROSAFE product packaging and physical supply photos"
                >
                  <span>📷</span> Product Photography
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("3d")}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition",
                    viewMode === "3d" ? "bg-white text-ink shadow-sm" : "text-white/60 hover:text-white"
                  )}
                  title="Display procedural 3D geometric models"
                >
                  <span>📐</span> 3D Models
                </button>
              </div>
            </div>
            <h2 id="universe-title" className="mt-2.5 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.05] font-semibold tracking-tight">
              The AROSAFE <span className="bg-gradient-to-r from-[#4ade80] via-[#38bdf8] to-[#60a5fa] bg-clip-text text-transparent">Universe</span>
            </h2>
          </div>

          {/* Category Filter Chips with Live Item Counts */}
          <div role="tablist" aria-label="Jump to category" className="liquid-glass flex w-max max-w-full gap-1 overflow-x-auto rounded-full p-1.5 scrollbar-none">
            {categories.map((c) => {
              const first = products.findIndex((p) => p.category === c.id);
              const count = products.filter((p) => p.category === c.id).length;
              const on = product.category === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => goTo(first)}
                  className={clsx(
                    "relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition sm:text-sm",
                    on ? "text-ink" : "text-white/75 hover:text-white"
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="uni-tab"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className="relative h-2 w-2 rounded-full transition-transform"
                    style={{
                      background: c.accent,
                      boxShadow: on ? `0 0 8px ${c.accent}` : "none",
                    }}
                  />
                  <span className="relative font-medium">{c.short}</span>
                  <span
                    className={clsx(
                      "relative rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold transition",
                      on ? "bg-slate-100 text-[#024089]" : "bg-white/10 text-white/60"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active product panel: Upgraded with Interactive Quick Specs HUD */}
      <div className="absolute inset-x-0 bottom-0 z-10 container-x pb-6 sm:pb-8">
        <div className="flex items-end justify-between gap-6">
          <div className="liquid-glass w-full max-w-xl rounded-[2rem] p-5 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/15" aria-live="polite">
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Product Header Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: category.accent, boxShadow: `0 0 10px ${category.accent}` }}
                    />
                    <p className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: category.accent }}>
                      {category.name}
                    </p>
                  </div>
                  <h3 className="mt-1.5 font-display text-2xl leading-tight font-bold sm:text-3xl text-white">{product.name}</h3>
                  <p className="mt-1 text-sm text-[#86efac] font-medium">{product.tagline}</p>
                </div>
                {product.image && (
                  <div className="relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-2xl bg-white/95 p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/30">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="96px"
                      priority
                      className="object-contain p-1"
                    />
                  </div>
                )}
              </div>

              {/* HUD Tab Selector (Overview vs Technical Specs) */}
              <div className="mt-4 flex items-center gap-1.5 border-t border-white/10 pt-3">
                <button
                  type="button"
                  onClick={() => setHudTab("overview")}
                  className={clsx(
                    "rounded-full px-3 py-1 text-[11px] font-semibold transition",
                    hudTab === "overview" ? "bg-white/20 text-white shadow-xs" : "text-white/50 hover:text-white/80"
                  )}
                >
                  Overview &amp; Features
                </button>
                <button
                  type="button"
                  onClick={() => setHudTab("specs")}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition",
                    hudTab === "specs" ? "bg-[#4ade80]/20 text-[#86efac] ring-1 ring-[#4ade80]/40 shadow-xs" : "text-white/50 hover:text-white/80"
                  )}
                >
                  <span>📋</span> Clinical Specs ({product.specs.length})
                </button>
              </div>

              {/* Tab Content 1: Overview */}
              {hudTab === "overview" && (
                <div className="mt-3">
                  <p className="text-xs leading-relaxed text-white/75 sm:text-sm line-clamp-3">
                    {product.description}
                  </p>
                  {product.applications && product.applications.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono text-white/40 uppercase">Target:</span>
                      {product.applications.map((app) => (
                        <span key={app} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80">
                          {app}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content 2: Technical Specs HUD */}
              {hudTab === "specs" && (
                <div className="mt-3 space-y-2.5">
                  {product.specs.length > 0 ? (
                    <div className="grid gap-2 rounded-xl bg-black/25 p-3 text-xs sm:grid-cols-2">
                      {product.specs.map((s) => (
                        <div key={s.label} className="flex flex-col">
                          <span className="font-mono text-[10px] font-bold text-white/40 uppercase">{s.label}</span>
                          <span className="mt-0.5 text-white/90 font-medium">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl bg-black/25 p-3 text-xs text-white/70">
                      Tailored hospital specifications, customized pack sizes, and drape kit configurations available upon request.
                    </div>
                  )}
                  {/* Clinical compliance trust badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono text-emerald-400">
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5">✓ ISO 13485:2016 Compliant</span>
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5">✓ Hospital AQL 1.5</span>
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5">✓ Medical Grade Supply</span>
                  </div>
                </div>
              )}

              {/* Action CTAs */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/10">
                <Magnetic strength={0.25}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#024089] shadow-sm transition hover:bg-[#86efac] hover:text-[#024089]"
                  >
                    Explore in 3D <span aria-hidden>→</span>
                  </Link>
                </Magnetic>
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}#enquiry`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#024089] to-[#0284c7] px-4 py-2.5 text-xs font-bold text-white shadow-sm ring-1 ring-white/20 transition hover:from-[#0353a4] hover:to-[#49a409]"
                >
                  <span>⚡</span> Request Sample &amp; Quote
                </Link>
                <span className="ml-auto hidden text-[10px] font-mono text-white/50 sm:inline-block">
                  ✓ Dispatch within 24h
                </span>
              </div>
            </motion.div>
          </div>

          {/* Prev / next + progress with brand gradient */}
          <div className="hidden flex-col items-end gap-3 md:flex">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label="Previous product"
                className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-base transition hover:scale-105 disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                disabled={active === N - 1}
                aria-label="Next product"
                className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-base transition hover:scale-105 disabled:opacity-30"
              >
                →
              </button>
            </div>
            {/* Logo Gradient Progress Bar: Navy to Cyan to Orange */}
            <div className="h-1.5 w-56 rounded-full overflow-hidden bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#024089] via-[#0284c7] to-[#e96d0a] transition-[width] duration-500 rounded-full"
                style={{ width: `${((active + 1) / N) * 100}%` }}
              />
            </div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
              Swipe · Drag · ← → keys
            </p>
          </div>
        </div>
      </div>

      {/* Index rail: sleek indicator on ultra-wide screens with hover tooltips */}
      <nav aria-label="All products" className="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 2xl:block pointer-events-auto">
        <ol className="space-y-2">
          {products.map((p, i) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? "true" : undefined}
                className="group flex items-center justify-end gap-3 text-right text-[11px] transition"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[var(--night)]/90 backdrop-blur px-2.5 py-1 rounded text-white border border-white/10 shadow-lg pointer-events-none">
                  {p.name}
                </span>
                <span className={clsx("h-1 rounded-full transition-all", i === active ? "w-6 bg-cyan shadow-[0_0_8px_#18b8e0]" : "w-2 bg-white/25 group-hover:w-3 group-hover:bg-white/60")} />
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
