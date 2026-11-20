"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GALLERY_ITEMS } from "@/lib/gallery-data";
import type { GalleryCategory, GalleryItem } from "@/lib/gallery-data";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { VisualMasonryWall } from "@/components/gallery/VisualMasonryWall";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

export function GalleryClient() {
  const [category, setCategory] = useState<GalleryCategory>("all");
  const [search, setSearch] = useState("");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q) ||
        (item.skuCode && item.skuCode.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        item.specsSummary.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
      {/* Pristine Light Clinical Hero with Search & Category Pills */}
      <GalleryHero
        search={search}
        onSearchChange={setSearch}
        totalCount={GALLERY_ITEMS.length}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      {/* Pure Visual Masonry Wall (Edge-to-Edge Photography) */}
      <VisualMasonryWall
        items={filteredItems}
        onItemClick={setLightboxItem}
      />

      {/* Ultra-HD Lightbox Inspection Modal */}
      <GalleryLightbox
        item={lightboxItem}
        items={filteredItems}
        onClose={() => setLightboxItem(null)}
        onNavigate={setLightboxItem}
      />

      {/* Institutional Procurement & Hospital Supply Finale */}
      <section className="relative border-t border-slate-200/80 bg-white py-16 sm:py-24 text-slate-900">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50/50 p-8 sm:p-12 shadow-sm">
            {/* Background Accent Gradients */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-sky-200/40 blur-[80px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-10 h-64 w-64 rounded-full bg-emerald-100/50 blur-[70px]"
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-mono text-[11px] font-semibold text-[#00479f] uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00479f]" />
                  Hospital Procurement &amp; Institutional Supply
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Require official high-resolution packaging sheets or evaluation kits?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Aroved Healthcare provides certified sample cartons, laboratory test certificates (AQL 0.65 / EN 455), and custom hospital supply contract proposals for purchase committees and medical distributors.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/contact#enquiry"
                  className="rounded-full bg-[#00479f] px-6 py-3.5 text-xs font-semibold text-white shadow-md shadow-blue-900/15 transition-all duration-200 hover:bg-[#023b82] hover:shadow-lg sm:text-sm"
                >
                  Request Evaluation Kit
                </Link>
                <Link
                  href="/products#catalogue-reference-chart"
                  className="rounded-full border border-slate-300 bg-white px-6 py-3.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 sm:text-sm"
                >
                  View Product Matrix
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
