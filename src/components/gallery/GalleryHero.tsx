"use client";

import { useId } from "react";
import Link from "next/link";
import clsx from "clsx";
import { GALLERY_CATEGORIES } from "@/lib/gallery-data";
import type { GalleryCategory } from "@/lib/gallery-data";

interface GalleryHeroProps {
  search: string;
  onSearchChange: (value: string) => void;
  totalCount: number;
  selectedCategory: GalleryCategory;
  onCategoryChange: (category: GalleryCategory) => void;
}

export function GalleryHero({
  search,
  onSearchChange,
  totalCount,
  selectedCategory,
  onCategoryChange,
}: GalleryHeroProps) {
  const searchInputId = useId();

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-28 pb-8 sm:pt-36 sm:pb-12 text-slate-900">
      {/* Subtle Clinical Dot-Grid Texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60"
      />

      {/* Soft Ambient Brand Gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-sky-200/40 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-12 left-10 h-72 w-72 rounded-full bg-emerald-100/60 blur-[90px]"
      />

      <div className="container-x relative">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-slate-300">/</li>
            <li aria-current="page" className="font-semibold text-[#00479f]">
              Visual Gallery
            </li>
          </ol>
        </nav>

        {/* Hero Header Presentation */}
        <div className="mt-6 max-w-3xl">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-[#49a409] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AROSAFE™ AUTHENTIC VISUAL ARCHIVE</span>
            <span className="text-emerald-300">•</span>
            <span className="font-mono text-[10px] text-emerald-700">LAB &amp; COREL VERIFIED</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.12]">
            Clinical Precision,{" "}
            <span className="bg-gradient-to-r from-[#00479f] via-sky-600 to-[#49a409] bg-clip-text text-transparent">
              Captured in High Resolution.
            </span>
          </h1>

          {/* Subtitle Body */}
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-relaxed">
            Explore authentic studio packaging photography, micro-textured barrier surfaces, and official technical specifications across Aroved&apos;s hospital infection control, CSSD sterilization, and consumer hygiene range.
          </p>
        </div>

        {/* Quick Search & Trust Stats Row */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Interactive Search Bar */}
          <div className="relative w-full max-w-md">
            <label htmlFor={searchInputId} className="sr-only">
              Search gallery assets
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <input
              id={searchInputId}
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by product, standard (ASTM, ISO), or SKU..."
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 sm:text-sm"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00479f]" />
              <strong className="text-slate-900">{totalCount}</strong> Verified Assets
            </span>
            <span className="hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200 md:inline-flex">
              <strong className="text-[#49a409]">100%</strong> Pre-Optimized WebP
            </span>
          </div>
        </div>

        {/* Category Filter Pills (Apple Style) */}
        <div className="mt-8 border-t border-slate-200/70 pt-6">
          <div className="flex flex-wrap items-center gap-2">
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onCategoryChange(cat.id)}
                  className={clsx(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200",
                    isActive
                      ? "bg-[#00479f] text-white shadow-md shadow-blue-900/20 ring-2 ring-blue-700/20"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                  )}
                >
                  <span>{cat.name}</span>
                  <span
                    className={clsx(
                      "rounded-full px-1.5 py-0.5 font-mono text-[10px]",
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
