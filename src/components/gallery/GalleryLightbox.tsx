"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import type { GalleryItem } from "@/lib/gallery-data";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}

export function GalleryLightbox({ item, items, onClose, onNavigate }: GalleryLightboxProps) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx !== -1 && idx < items.length - 1) onNavigate(items[idx + 1]);
        else if (idx === items.length - 1) onNavigate(items[0]);
      }
      if (e.key === "ArrowLeft") {
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx > 0) onNavigate(items[idx - 1]);
        else if (idx === 0) onNavigate(items[items.length - 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, items, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const totalItems = items.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#030917] shadow-[0_25px_70px_rgba(0,0,0,0.85)] lg:flex-row"
        >
          {/* Top Controls Bar (Mobile & Tablet) */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3 lg:hidden">
            <span className="font-mono text-xs text-white/60">
              {currentIndex + 1} of {totalItems}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/10 p-1.5 text-white/70 hover:bg-white/20 hover:text-white"
              aria-label="Close lightbox"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Visual Stage */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/40 p-4 sm:p-8">
            <div
              className={clsx(
                "relative h-full w-full transition-all duration-300",
                zoomed ? "cursor-zoom-out scale-125" : "cursor-zoom-in scale-100"
              )}
              onClick={() => setZoomed(!zoomed)}
              title={zoomed ? "Click to reset zoom" : "Click to zoom in"}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 70vw, 95vw"
                className="object-contain"
                priority
                decoding="async"
              />
            </div>

            {/* Left Nav Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const prevIdx = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
                onNavigate(items[prevIdx]);
              }}
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-3 text-white/80 shadow-lg backdrop-blur-md transition hover:bg-sky-500 hover:text-white sm:left-6"
              aria-label="Previous image"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Nav Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const nextIdx = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
                onNavigate(items[nextIdx]);
              }}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-3 text-white/80 shadow-lg backdrop-blur-md transition hover:bg-sky-500 hover:text-white sm:right-6"
              aria-label="Next image"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Zoom Indicator Pill */}
            <div className="pointer-events-none absolute bottom-4 left-4 hidden items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[11px] text-white/60 backdrop-blur-md sm:flex">
              <svg className="h-3.5 w-3.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {zoomed ? "Click to reset" : "Click image to zoom"}
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="flex w-full flex-col justify-between border-t border-white/10 bg-[#061025] p-6 lg:w-96 lg:border-t-0 lg:border-l lg:p-8">
            <div className="overflow-y-auto">
              {/* Header Info & Desktop Close */}
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider"
                  style={{
                    backgroundColor: `${item.brandColor}22`,
                    color: item.brandColor,
                    border: `1px solid ${item.brandColor}55`,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.brandColor }} />
                  {item.brand}
                </span>

                <div className="hidden items-center gap-3 lg:flex">
                  <span className="font-mono text-xs text-white/40">
                    {currentIndex + 1} / {totalItems}
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full bg-white/10 p-1.5 text-white/70 transition hover:bg-white/20 hover:text-white"
                    aria-label="Close lightbox"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Title & Category */}
              <div className="mt-4">
                <span className="font-mono text-[11px] tracking-wider text-sky-400 uppercase">
                  {item.categoryLabel}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                  {item.title}
                </h3>
              </div>

              {/* SKU & Tag */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {item.skuCode && (
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/70">
                    SKU: {item.skuCode}
                  </span>
                )}
                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70">
                  {item.tag}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs leading-relaxed text-white/70 sm:text-sm">
                {item.description}
              </p>

              {/* Specs Bullet Points */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <h4 className="font-mono text-[11px] font-semibold tracking-wider text-white/50 uppercase">
                  Key Specifications
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-white/80">
                  {item.specsSummary.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 border-t border-white/10 pt-5 space-y-2.5">
              {item.productSlug && (
                <Link
                  href={`/products/${item.productSlug}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-xs font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
                >
                  View Complete Product Page
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}

              <Link
                href={`/contact?intent=sample-request&product=${encodeURIComponent(item.title)}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Request Sample &amp; Hospital Quotation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
