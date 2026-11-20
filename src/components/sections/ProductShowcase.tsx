"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { categories, products, type CategoryId } from "@/lib/products";
import { LazyProductViewer } from "@/components/three/lazy";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURED: Record<CategoryId, string> = {
  gloves: "nitrile-examination-gloves",
  hygiene: "wet-wipes",
  drapes: "sterile-surgeon-gowns",
  cssd: "sterilization-reels",
};

/** Cinematic scroll-driven product reveal: a sticky 3D stage swaps models as category panels pass. */
export function ProductShowcase() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const cat = categories[active];
  const featured = products.find((p) => p.slug === FEATURED[cat.id])!;

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
        gsap.fromTo(
          panel.querySelectorAll("[data-panel-item]"),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: panel, start: "top 75%" } },
        );
      });
      gsap.fromTo("[data-progress]", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: "[data-panels]", start: "top 55%", end: "bottom 55%", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="products" className="relative scroll-mt-24 bg-white py-28 lg:py-36" aria-labelledby="products-title">
      <div className="container-x">
        <SectionHeading
          id="products-title"
          eyebrow="The AROSAFE range"
          title={<>Four categories. <span className="text-gradient">One trusted brand.</span></>}
          intro="Products essential for pre-operative and post-operative patient care, from outpatient departments to critical care environments."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Sticky 3D stage */}
          <div className="sticky top-20 z-10 h-[46vh] lg:top-24 lg:col-span-7 lg:h-[calc(100vh-8rem)]">
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#f3f8fe] to-[#dfeaf8] shadow-[inset_0_1px_0_white,0_30px_60px_-30px_rgba(15,44,143,0.35)]">
              <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
              <LazyProductViewer spec={featured.model} modelKey={featured.slug} label={featured.name} wheelZoom={false} className="h-full w-full" compact />
              <div className="pointer-events-none absolute top-5 left-5 z-10 sm:top-6 sm:left-6">
                <AnimatePresence mode="wait">
                  <motion.div key={featured.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                    <p className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: cat.accent }}>{cat.name}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-ink sm:text-xl">{featured.name}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute top-5 right-5 z-10 flex gap-1.5 sm:top-6 sm:right-6" aria-hidden>
                {categories.map((c, i) => (
                  <span key={c.id} className={clsx("h-1.5 rounded-full transition-all duration-500", i === active ? "w-6 bg-brand" : "w-1.5 bg-ink/20")} />
                ))}
              </div>
            </div>
          </div>

          {/* Category panels */}
          <div data-panels className="relative lg:col-span-5">
            <span aria-hidden className="absolute top-0 bottom-0 left-0 hidden w-px bg-line lg:block" />
            <span aria-hidden data-progress className="absolute top-0 bottom-0 left-0 hidden w-px origin-top bg-gradient-to-b from-cyan to-brand lg:block" />
            {categories.map((c, i) => {
              const list = products.filter((p) => p.category === c.id);
              return (
                <article key={c.id} data-panel className="flex min-h-[70vh] flex-col justify-center py-12 lg:pl-12" aria-labelledby={`cat-${c.id}`}>
                  <p data-panel-item className="font-display text-sm font-semibold text-ink-soft/50">0{i + 1} / 0{categories.length}</p>
                  <h3 data-panel-item id={`cat-${c.id}`} className={clsx("mt-3 font-display text-3xl font-semibold transition-colors duration-500 sm:text-4xl", active === i ? "text-ink" : "text-ink/40")}>
                    {c.name}
                  </h3>
                  <p data-panel-item className="mt-4 text-ink-soft">{c.summary}</p>
                  <ul className="mt-8 grid gap-2">
                    {list.map((p) => (
                      <li key={p.slug} data-panel-item>
                        <Link href={`/products/${p.slug}`} className="group flex items-center justify-between rounded-2xl border border-line bg-mist/60 px-5 py-4 transition hover:border-brand/30 hover:bg-white hover:shadow-[0_12px_30px_-18px_rgba(26,68,201,0.5)]">
                          <span>
                            <span className="block text-sm font-semibold text-ink">{p.name}</span>
                            <span className="block text-xs text-ink-soft">{p.tagline}</span>
                          </span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="text-brand transition group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
