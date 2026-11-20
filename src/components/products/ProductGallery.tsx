"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductGalleryItem } from "@/lib/products";

interface ProductGalleryProps {
  productName: string;
  primaryImage?: string;
  gallery?: ProductGalleryItem[];
}

export function ProductGallery({ productName, primaryImage, gallery }: ProductGalleryProps) {
  const items: ProductGalleryItem[] =
    gallery && gallery.length > 0
      ? gallery
      : primaryImage
        ? [{ src: primaryImage, alt: `${productName} — product photograph`, label: "Primary View" }]
        : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] || items[0];

  if (!items.length || !activeItem) return null;

  return (
    <div className="mt-16 rounded-[2.5rem] border border-line bg-gradient-to-b from-white to-[#f4f8fd] p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(15,44,143,0.08)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-6">
        <div>
          <p className="eyebrow">Visual Documentation</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
            Product &amp; Packaging Photography
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            High-fidelity photographs of authentic AROSAFE medical supplies, dispenser packaging, and clinical setups.
          </p>
        </div>
        {items.length > 1 && (
          <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-ice px-3 py-1 text-xs font-mono font-medium text-brand-deep">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="opacity-40">/</span>
            <span>{String(items.length).padStart(2, "0")} Views</span>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Main Stage View */}
        <div className="lg:col-span-8">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-3xl bg-white border border-line/60 shadow-[inset_0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center p-6">
            <div aria-hidden className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 95vw"
                  priority={activeIndex === 0}
                  decoding="async"
                  className="object-contain drop-shadow-[0_15px_30px_rgba(15,44,143,0.15)]"
                />
              </motion.div>
            </AnimatePresence>

            {/* View Badge */}
            <div className="absolute bottom-4 left-4 rounded-xl bg-ink/75 px-3 py-1.5 backdrop-blur-md text-xs font-medium text-white shadow-sm">
              {activeItem.label}
            </div>
          </div>
        </div>

        {/* Thumbnails / Selector */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-3">
          <p className="text-xs font-mono font-semibold tracking-wider text-ink-soft uppercase">
            Select View / Angle
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            {items.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative flex items-center gap-3.5 rounded-2xl p-2.5 text-left transition duration-300 ${
                    isSelected
                      ? "bg-white ring-2 ring-brand shadow-[0_10px_25px_-5px_rgba(26,68,201,0.2)]"
                      : "bg-white/70 hover:bg-white border border-line/80 hover:border-brand/40"
                  }`}
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-mist p-1">
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-contain p-0.5 transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="block text-xs font-semibold text-ink truncate group-hover:text-brand transition-colors">
                      {item.label}
                    </span>
                    <span className="block text-[11px] text-ink-soft/80 truncate">
                      {isSelected ? "Active View" : "Click to view"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-2xl bg-ice/60 p-4 border border-cyan/20">
            <p className="text-xs leading-relaxed text-brand-deep">
              <strong className="font-semibold">Note:</strong> While 3D models provide interactive 360° form inspection, these photographic records represent verified physical AROSAFE production batches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

