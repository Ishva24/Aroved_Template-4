"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryItem } from "@/lib/gallery-data";
import imageDimensions from "@/lib/image-dimensions.json";

interface VisualMasonryWallProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}

export function VisualMasonryWall({ items, onItemClick }: VisualMasonryWallProps) {
  if (items.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-slate-900">No photos match your filter</h3>
          <p className="mt-2 text-sm text-slate-500">
            Try clearing your search term or switching to another category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="container-x py-8 sm:py-12">
      {/* Pure Visual Multi-Column Masonry Wall */}
      <div className="columns-1 gap-4 sm:columns-2 sm:gap-6 lg:columns-3 xl:columns-4">
        {items.map((item, idx) => {
          const dims = (imageDimensions as Record<string, { w: number; h: number; aspect: number }>)[item.id] || {
            w: 1200,
            h: 900,
            aspect: 1.333,
          };

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.3) }}
              onClick={() => onItemClick(item)}
              className="group relative mb-4 sm:mb-6 cursor-pointer break-inside-avoid overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-100 shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/70"
            >
              {/* Pure High-Definition Photo — Natural Aspect Ratio */}
              <div className="relative w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={dims.w}
                  height={dims.h}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={idx < 12}
                  loading={idx < 12 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-auto block object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Minimalist Floating Tag Pill (Always visible, clean glass) */}
              <div className="absolute top-3 left-3 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                <span className="rounded-full bg-black/45 backdrop-blur-md px-2.5 py-1 font-mono text-[9px] font-semibold text-white/90 shadow-sm uppercase tracking-wider">
                  {item.brand}
                </span>
              </div>

              {/* Elegant Hover Overlay (Apple Photos / Behance style) */}
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/85 via-black/35 to-black/20 p-4 sm:p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {/* Top Overlay Bar */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/95 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-800 shadow-sm uppercase tracking-wider backdrop-blur-md">
                    {item.tag}
                  </span>

                  {/* Zoom Action Icon */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-200 group-hover:scale-110 shadow-sm">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Overlay Details */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs font-bold tracking-wider"
                      style={{ color: item.brandColor === "#16a34a" ? "#86efac" : item.brandColor === "#2563eb" ? "#93c5fd" : "#7dd3fc" }}
                    >
                      {item.brand}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-[11px] text-white/70">
                      {item.categoryLabel}
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-bold leading-snug text-white sm:text-base line-clamp-2">
                    {item.title}
                  </h3>

                  {item.specsSummary.length > 0 && (
                    <div className="pt-1">
                      <span className="inline-flex items-center rounded-md bg-white/15 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-white/90">
                        <span className="mr-1.5 h-1 w-1 rounded-full bg-emerald-400" />
                        {item.specsSummary[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
