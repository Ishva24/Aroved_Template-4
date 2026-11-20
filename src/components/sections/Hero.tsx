"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { company, stats } from "@/lib/company";
import { categories } from "@/lib/products";
import { Arosafe } from "@/components/ui/Logo";
import { Magnetic } from "@/components/fx/Magnetic";
import { KineticText } from "@/components/fx/KineticText";
import { heroState } from "@/components/three/heroState";
import HeroSapphireCanvas from "@/components/fx/HeroSapphireCanvas";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-[#02336e] via-[#034ea2] to-[#01224d]" />
  ),
});

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  heroState.reducedMotion = !!reduced;

  useEffect(() => {
    // Reset state & ensure copy is fully visible on mount or route transition
    heroState.scroll = 0;
    heroState.zoom = 1;
    gsap.set("[data-hero-copy]", { yPercent: 0, opacity: 1, clearProps: "transform,opacity" });
    ScrollTrigger.refresh();
  }, []);

  useGSAP(
    () => {
      if (reduced) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      tl.from("[data-hero-line] > span", { yPercent: 115, skewY: 6, duration: 1.5, stagger: 0.1 })
        .from("[data-hero-fade]", { y: 30, opacity: 0, duration: 1.1, stagger: 0.08 }, "-=1.1")
        .from("[data-frame]", { opacity: 0, scale: 1.08, duration: 1.4 }, 0);

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => (heroState.scroll = self.progress),
      });
      gsap.to("[data-hero-copy]", {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: root.current,
          start: "20% top",
          end: "80% top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  const zoom = (f: number) => (heroState.zoom = Math.min(1.5, Math.max(0.6, heroState.zoom * f)));

  return (
    <section
      ref={root}
      className="grain relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-[#02336e] via-[#034ea2] to-[#01224d] text-white"
      aria-labelledby="hero-title"
    >
      {/* ─── 1. Architectural Precision Cleanroom Grid (Layer 0) ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_45%,#000_30%,transparent_100%)] opacity-[0.07]"
      />

      {/* ─── 2. Realtime Interactive Fluid Wave & Bioluminescent Particle Engine (Layer 1) ─── */}
      <HeroSapphireCanvas reducedMotion={!!reduced} />

      {/* ─── 3. Atmospheric Brand Color Mesh Overlays (Centered on #034ea2) ─── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Top-left: Fresh Bio-Green aura echoing 'ARO' (#4ade80 / #49a409) */}
        <div className="absolute -top-32 -left-24 h-[580px] w-[580px] rounded-full bg-[#4ade80]/15 blur-[160px]" />

        {/* Center-right: Radiant Royal Sapphire & Sky Blue aura behind 3D products (#034ea2 / #38bdf8) */}
        <div className="absolute top-1/4 -right-20 h-[760px] w-[760px] rounded-full bg-gradient-to-bl from-[#38bdf8]/20 via-[#034ea2]/40 to-transparent blur-[160px]" />

        {/* Lower-right: Warm Orange sunlit accent echoing the swoosh tail (#e96d0a) */}
        <div className="absolute -bottom-20 right-16 h-[500px] w-[500px] rounded-full bg-[#e96d0a]/12 blur-[140px]" />

        {/* Ambient radial vignette centered on sapphire #034ea2 */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#034ea2]/20 to-[#011a3b]/60" />
      </div>

      {/* ─── 4. Dynamic Harmonic Wave Swoosh Accent (Mirroring Logo Underline) ─── */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-24 z-0 hidden opacity-75 lg:block">
        <svg viewBox="0 0 1920 100" fill="none" className="h-auto w-full filter drop-shadow-[0_4px_20px_rgba(56,189,248,0.3)]">
          {/* Main logo underline swoosh: Sapphire to Cyan to Bio-Green to Energetic Orange */}
          <path
            d="M 40,75 C 420,25 920,85 1420,65 C 1640,56 1790,30 1900,18"
            stroke="url(#heroLogoWaveSapphire)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Secondary subtle harmonic green wave */}
          <path
            d="M 120,85 C 480,38 960,95 1400,75 C 1620,66 1760,45 1860,32"
            stroke="url(#heroLogoHarmonicSapphire)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="heroLogoWaveSapphire" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#034ea2" stopOpacity="0" />
              <stop offset="20%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#4ade80" stopOpacity="0.9" />
              <stop offset="85%" stopColor="#e96d0a" stopOpacity="1" />
              <stop offset="100%" stopColor="#e96d0a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="heroLogoHarmonicSapphire" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0" />
              <stop offset="30%" stopColor="#4ade80" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#e96d0a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ─── 5. Interactive 3D Floating Products Canvas (Layer z-10) ─── */}
      <div className="absolute inset-0 z-10" data-cursor="Drag">
        <HeroCanvas />
      </div>

      {/* ─── 6. Precision Clinical OT Corner Alignment Brackets ─── */}
      <div data-frame aria-hidden className="pointer-events-none absolute inset-4 z-10 hidden md:block">
        {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
          <span key={c} className={`absolute h-8 w-8 border-sky-400/25 ${c}`} />
        ))}
        <span className="absolute top-1/2 left-0 h-px w-3 bg-[#4ade80]/40" />
        <span className="absolute top-1/2 right-0 h-px w-3 bg-[#38bdf8]/40" />
      </div>

      {/* ─── 7. Main Hero Typography & Call-To-Action (Layer z-20) ─── */}
      <div className="pointer-events-none relative z-20 container-x flex min-h-[100svh] flex-col justify-center pt-20 pb-16 lg:pt-24 lg:pb-16">
        <div data-hero-copy className="pointer-events-auto max-w-[44rem]">
          {/* Eyebrow badge */}
          <p
            data-hero-fade
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/35 bg-[#022857]/80 px-4 py-1.5 font-mono text-[11px] font-semibold tracking-[0.24em] text-emerald-300 uppercase shadow-lg shadow-[#011938]/50 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80]" />
            {company.tagline} · AROSAFE
          </p>

          {/* Majestic Hero Headline */}
          <h1
            id="hero-title"
            className="mt-4 font-display text-4xl leading-[1.02] font-bold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-[4.2rem] lg:leading-[1.0]"
          >
            <span data-hero-line className="block overflow-hidden pb-1">
              <span className="block text-white">
                <KineticText text="Infection control," />
              </span>
            </span>
            <span data-hero-line className="block overflow-hidden pb-1">
              <span className="block text-[#4ade80] [text-shadow:0_0_32px_rgba(74,222,128,0.4)]">
                <KineticText text="engineered" min={300} max={800} />
              </span>
            </span>
            <span data-hero-line className="block overflow-hidden pb-1">
              <span className="block text-white">
                <KineticText text="for care." />
              </span>
            </span>
          </h1>

          {/* Description Copy */}
          <p data-hero-fade className="mt-4 max-w-lg text-sm leading-relaxed text-blue-100/90 sm:text-base">
            {company.legalName} delivers a complete range of infection control products under our brand{" "}
            <Arosafe className="font-bold text-white" /> — enhancing service quality for hospitals, customers and patients.
          </p>

          {/* Dual Action Buttons (Double-Bezel Island Architecture) */}
          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link
                href="#universe"
                className="group relative inline-flex items-center gap-3.5 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#034ea2] shadow-[0_12px_36px_rgba(3,78,162,0.45)] transition-all duration-300 hover:bg-[#38bdf8] hover:text-[#011b3e] hover:shadow-[0_16px_44px_rgba(56,189,248,0.5)] active:scale-[0.98]"
              >
                <span className="relative">Enter the product universe</span>
                <span className="relative grid h-7 w-7 place-items-center rounded-full bg-[#034ea2]/10 text-[#034ea2] transition-transform duration-300 group-hover:rotate-45 group-hover:bg-[#011b3e]/20 group-hover:text-[#011b3e]">
                  ↗
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact#enquiry"
                className="inline-flex rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:text-white hover:shadow-[0_8px_28px_rgba(255,255,255,0.15)] active:scale-[0.98]"
              >
                Request a quote
              </Link>
            </Magnetic>
          </div>

          {/* Clinical Proven Metrics */}
          <dl data-hero-fade className="mt-9 hidden max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-5 sm:grid">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-[11px] font-mono font-medium tracking-wider text-blue-200/75 uppercase">
                  {s.label}
                </dt>
                <dd className="order-1 font-display text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] sm:text-3xl">
                  {s.value}
                  <span className="text-[#38bdf8]">{s.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ─── 8. Bottom Rail: Frosted Sapphire Glass Pills & Zoom Controls (Layer z-20) ─── */}
      <div className="absolute inset-x-0 bottom-6 z-20 container-x hidden items-end justify-between lg:flex">
        <ul className="flex gap-2 pl-24 xl:pl-0" aria-label="Product categories">
          {categories.map((c, i) => (
            <li key={c.id}>
              <a
                href={`/products#${c.id}`}
                className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-blue-100 uppercase shadow-sm backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/20 hover:text-white"
              >
                <span className="font-bold text-[#4ade80]">0{i + 1}</span> {c.short}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <p className="pointer-events-none hidden items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-blue-100 shadow-sm backdrop-blur-md xl:inline-flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" aria-hidden />
            Move your mouse, the products follow
          </p>
          <div className="flex rounded-full border border-white/15 bg-white/10 p-1 shadow-sm backdrop-blur-md">
            <button
              type="button"
              onClick={() => zoom(0.85)}
              aria-label="Zoom in"
              className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/20 hover:text-[#38bdf8]"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => zoom(1.18)}
              aria-label="Zoom out"
              className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/20 hover:text-[#38bdf8]"
            >
              −
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
