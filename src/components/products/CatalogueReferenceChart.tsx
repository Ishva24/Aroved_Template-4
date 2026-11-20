"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export interface CatalogueRow {
  id: string;
  category: "baby" | "adult-tape" | "adult-pant" | "wipes";
  categoryLabel: string;
  brand: "AROSAFE" | "AROCARE" | "AROFIT" | "AROWIPES";
  brandColor: string;
  packType: "Singles" | "Mini Pack" | "Jumbo Pack" | "Mini Premium" | "Hospital Pack";
  size: string;
  style: "Pant Type" | "Tape Type" | "Wet Towels";
  units: number;
  unitsLabel: string;
  mrp: number;
  slug: string;
  highlights: string;
}

export const CATALOGUE_DATA: CatalogueRow[] = [
  // Baby Diapers
  {
    id: "baby-single-s",
    category: "baby",
    categoryLabel: "Baby Care",
    brand: "AROSAFE",
    brandColor: "#16a34a",
    packType: "Singles",
    size: "Small (S)",
    style: "Pant Type",
    units: 1,
    unitsLabel: "1 Pc",
    mrp: 10,
    slug: "baby-diaper-pants",
    highlights: "Trial / emergency single piece, bubble waistband, cottony soft",
  },
  {
    id: "baby-single-m",
    category: "baby",
    categoryLabel: "Baby Care",
    brand: "AROSAFE",
    brandColor: "#16a34a",
    packType: "Singles",
    size: "Medium (M)",
    style: "Pant Type",
    units: 1,
    unitsLabel: "1 Pc",
    mrp: 12,
    slug: "baby-diaper-pants",
    highlights: "Trial single piece, quick absorbent gel core, side leak guards",
  },
  {
    id: "baby-mini-s",
    category: "baby",
    categoryLabel: "Baby Care",
    brand: "AROSAFE",
    brandColor: "#16a34a",
    packType: "Mini Pack",
    size: "Small (S)",
    style: "Pant Type",
    units: 10,
    unitsLabel: "10 Pcs",
    mrp: 99,
    slug: "baby-diaper-pants",
    highlights: "Convenient travel & weekly pack (₹9.90 / pc), 360° elastic fit",
  },
  {
    id: "baby-mini-m",
    category: "baby",
    categoryLabel: "Baby Care",
    brand: "AROSAFE",
    brandColor: "#16a34a",
    packType: "Mini Pack",
    size: "Medium (M)",
    style: "Pant Type",
    units: 9,
    unitsLabel: "9 Pcs",
    mrp: 99,
    slug: "baby-diaper-pants",
    highlights: "Weekly travel pack (₹11.00 / pc), anti-rash breathable outer layer",
  },
  {
    id: "baby-mini-l",
    category: "baby",
    categoryLabel: "Baby Care",
    brand: "AROSAFE",
    brandColor: "#16a34a",
    packType: "Mini Pack",
    size: "Large (L)",
    style: "Pant Type",
    units: 8,
    unitsLabel: "8 Pcs",
    mrp: 99,
    slug: "baby-diaper-pants",
    highlights: "Weekly travel pack (₹12.38 / pc), active movement side leg barriers",
  },
  {
    id: "baby-tape-nb-10",
    category: "baby",
    categoryLabel: "Baby Care",
    brand: "AROSAFE",
    brandColor: "#16a34a",
    packType: "Mini Pack",
    size: "New Born (NB)",
    style: "Tape Type",
    units: 10,
    unitsLabel: "10 Pcs",
    mrp: 99,
    slug: "baby-tape-diapers",
    highlights: "U-shaped umbilical navel notch, ultra-gentle refastenable tape",
  },
  {
    id: "baby-tape-nb-12",
    category: "baby",
    categoryLabel: "Baby Care",
    brand: "AROSAFE",
    brandColor: "#16a34a",
    packType: "Mini Pack",
    size: "New Born (NB)",
    style: "Tape Type",
    units: 12,
    unitsLabel: "12 Pcs",
    mrp: 199,
    slug: "baby-tape-diapers",
    highlights: "Newborn hospital starter kit (12's pack), ultra-soft feather touch",
  },
  {
    id: "baby-jumbo-s",
    category: "baby",
    categoryLabel: "Baby Care",
    brand: "AROSAFE",
    brandColor: "#16a34a",
    packType: "Jumbo Pack",
    size: "Small (S)",
    style: "Pant Type",
    units: 38,
    unitsLabel: "38 Pcs",
    mrp: 399,
    slug: "baby-diaper-pants",
    highlights: "Monthly economy jumbo pack (₹10.50 / pc), 12-hr overnight dryness",
  },
  {
    id: "baby-jumbo-m",
    category: "baby",
    categoryLabel: "Baby Care",
    brand: "AROSAFE",
    brandColor: "#16a34a",
    packType: "Jumbo Pack",
    size: "Medium (M)",
    style: "Pant Type",
    units: 35,
    unitsLabel: "35 Pcs",
    mrp: 399,
    slug: "baby-diaper-pants",
    highlights: "Monthly economy jumbo pack (₹11.40 / pc), wetness indicator lines",
  },
  {
    id: "baby-jumbo-l",
    category: "baby",
    categoryLabel: "Baby Care",
    brand: "AROSAFE",
    brandColor: "#16a34a",
    packType: "Jumbo Pack",
    size: "Large (L)",
    style: "Pant Type",
    units: 32,
    unitsLabel: "32 Pcs",
    mrp: 399,
    slug: "baby-diaper-pants",
    highlights: "Monthly economy jumbo pack (₹12.47 / pc), high-capacity gel core",
  },

  // Adult Incontinence: AROFIT Pants
  {
    id: "adult-arofit-m",
    category: "adult-pant",
    categoryLabel: "Adult Care",
    brand: "AROFIT",
    brandColor: "#0284c7",
    packType: "Mini Premium",
    size: "Medium (M)",
    style: "Pant Type",
    units: 10,
    unitsLabel: "10 Diapers",
    mrp: 499,
    slug: "adult-diaper-pants",
    highlights: "360° pull-up elastic waistband, tear-away side seams, odour lock",
  },
  {
    id: "adult-arofit-l",
    category: "adult-pant",
    categoryLabel: "Adult Care",
    brand: "AROFIT",
    brandColor: "#0284c7",
    packType: "Mini Premium",
    size: "Large (L)",
    style: "Pant Type",
    units: 10,
    unitsLabel: "10 Diapers",
    mrp: 549,
    slug: "adult-diaper-pants",
    highlights: "Discreet pull-up underwear fit for mobile adults, 12-hr absorption",
  },
  {
    id: "adult-arofit-xl",
    category: "adult-pant",
    categoryLabel: "Adult Care",
    brand: "AROFIT",
    brandColor: "#0284c7",
    packType: "Mini Premium",
    size: "Extra Large (XL)",
    style: "Pant Type",
    units: 10,
    unitsLabel: "10 Diapers",
    mrp: 599,
    slug: "adult-diaper-pants",
    highlights: "Full contoured comfort, multi-strand leak guards, breathable fabric",
  },

  // Adult Incontinence: AROCARE Tape
  {
    id: "adult-arocare-m",
    category: "adult-tape",
    categoryLabel: "Adult Care",
    brand: "AROCARE",
    brandColor: "#2563eb",
    packType: "Mini Premium",
    size: "Medium (M)",
    style: "Tape Type",
    units: 10,
    unitsLabel: "10 Diapers",
    mrp: 499,
    slug: "adult-diapers",
    highlights: "Double refastenable adhesive tabs, colour-fade wetness indicator",
  },
  {
    id: "adult-arocare-l",
    category: "adult-tape",
    categoryLabel: "Adult Care",
    brand: "AROCARE",
    brandColor: "#2563eb",
    packType: "Mini Premium",
    size: "Large (L)",
    style: "Tape Type",
    units: 10,
    unitsLabel: "10 Diapers",
    mrp: 549,
    slug: "adult-diapers",
    highlights: "High dependency bedridden patient care, anti-bedsore soft top sheet",
  },
  {
    id: "adult-arocare-xl",
    category: "adult-tape",
    categoryLabel: "Adult Care",
    brand: "AROCARE",
    brandColor: "#2563eb",
    packType: "Mini Premium",
    size: "Extra Large (XL)",
    style: "Tape Type",
    units: 10,
    unitsLabel: "10 Diapers",
    mrp: 599,
    slug: "adult-diapers",
    highlights: "Extra wide landing zone, overnight heavy absorbency, dual standing cuffs",
  },

  // Hospital Antiseptic Wipes: AROWIPES
  {
    id: "wipes-arowipes-10",
    category: "wipes",
    categoryLabel: "Hospital Hygiene",
    brand: "AROWIPES",
    brandColor: "#0d9488",
    packType: "Hospital Pack",
    size: "32 cm × 32 cm",
    style: "Wet Towels",
    units: 10,
    unitsLabel: "10 Towels",
    mrp: 450,
    slug: "wet-wipes",
    highlights: "2% Chlorhexidine Gluconate antiseptic bed bath towels, microwaveable",
  },
];

type FilterKey = "all" | "baby" | "adult-tape" | "adult-pant" | "wipes";

export function CatalogueReferenceChart() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [selectedSpread, setSelectedSpread] = useState<"cover" | "inside" | null>(null);

  const searchId = useId();

  const filteredItems = useMemo(() => {
    return CATALOGUE_DATA.filter((item) => {
      const matchesFilter = filter === "all" || item.category === filter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.brand.toLowerCase().includes(q) ||
        item.size.toLowerCase().includes(q) ||
        item.packType.toLowerCase().includes(q) ||
        item.style.toLowerCase().includes(q) ||
        item.highlights.toLowerCase().includes(q) ||
        String(item.mrp).includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <section id="catalogue-reference-chart" className="relative scroll-mt-24 pt-24 pb-28 text-white">
      {/* Background glow and subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(14,165,233,0.12),transparent_70%)]"
      />

      <div className="container-x relative">
        {/* Master Lineup Showcase Banner */}
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c234a]/80 via-[#071329]/95 to-[#030a16] p-6 shadow-2xl backdrop-blur-md sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wider text-emerald-300 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CorelDRAW V4 Master Print Catalogue Proof
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Aroved Range of Products
              </h3>
              <p className="mt-4 text-base text-white/70 sm:text-lg">
                Complete official product reference chart for retail, pharmacy distribution, and institutional hospital procurement. Verified against the master trifold catalogue from our Bangalore manufacturing facility.
              </p>

              {/* Badges */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#16a34a]" /> AROSAFE (Baby Care)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#2563eb]" /> AROCARE (Adult Tape)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#0284c7]" /> AROFIT (Adult Pants)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#0d9488]" /> AROWIPES (Bed Bath)
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedSpread("inside")}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#0284c7] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-500 hover:shadow-sky-500/40"
                >
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Interactive Catalogue Preview
                </button>

                <Link
                  href="/contact?intent=catalogue-inquiry"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/10 hover:border-white/30"
                >
                  Request Institutional Rates & Samples
                  <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Lineup Photo */}
            <div className="lg:col-span-5">
              <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-3 shadow-xl transition hover:border-sky-500/40">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white/10">
                  <Image
                    src="/images/products/aroved_hygiene_family_range.webp"
                    alt="Aroved complete product range lineup: AROSAFE baby, AROCARE adult tape, AROFIT adult pants, and AROWIPES"
                    fill
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    className="object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-2 text-[11px] text-white/60">
                  <span>Official Aroved Family Range</span>
                  <span className="font-mono text-emerald-400">Bangalore, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-sky-400 uppercase">17-Item Master Matrix</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Product Chart for Reference
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/60">
              Quick reference for pack styles, size gradations, piece counts, and official Maximum Retail Prices (MRP).
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full sm:w-72">
            <label htmlFor={searchId} className="sr-only">Search reference table</label>
            <div className="relative">
              <input
                id={searchId}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search size, brand, pack..."
                className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 pl-10 text-xs text-white placeholder-white/40 backdrop-blur-md outline-none transition focus:border-sky-400 focus:bg-white/10"
              />
              <svg
                className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(
            [
              { key: "all", label: `All SKUs (${CATALOGUE_DATA.length})` },
              { key: "baby", label: "AROSAFE Baby Diapers (10)" },
              { key: "adult-pant", label: "AROFIT Adult Pants (3)" },
              { key: "adult-tape", label: "AROCARE Adult Tape (3)" },
              { key: "wipes", label: "AROWIPES Towels (1)" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={clsx(
                "rounded-full px-4 py-1.5 text-xs font-medium transition",
                filter === tab.key
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                  : "border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table View for Tablets & Desktop */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-white/10 bg-[#040f24]/80 shadow-2xl backdrop-blur-md md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/5 font-mono text-[11px] tracking-wider text-white/60 uppercase">
                <tr>
                  <th scope="col" className="py-4 pr-3 pl-6">#</th>
                  <th scope="col" className="px-3 py-4">Brand</th>
                  <th scope="col" className="px-3 py-4">Pack Type</th>
                  <th scope="col" className="px-3 py-4">Size</th>
                  <th scope="col" className="px-3 py-4">Style</th>
                  <th scope="col" className="px-3 py-4 text-center">Units / Pack</th>
                  <th scope="col" className="px-3 py-4 text-right">MRP (₹)</th>
                  <th scope="col" className="px-3 py-4 text-right">Approx. Per Unit</th>
                  <th scope="col" className="py-4 pr-6 pl-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {filteredItems.map((item, idx) => {
                  const perUnit = (item.mrp / item.units).toFixed(2);
                  return (
                    <tr
                      key={item.id}
                      className="transition duration-150 hover:bg-sky-500/[0.08]"
                    >
                      <td className="py-3.5 pr-3 pl-6 font-mono text-white/40">
                        {String(idx + 1).padStart(2, "0")}
                      </td>
                      <td className="px-3 py-3.5 font-semibold text-white">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider"
                          style={{
                            backgroundColor: `${item.brandColor}22`,
                            color: item.brandColor,
                            border: `1px solid ${item.brandColor}44`,
                          }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.brandColor }} />
                          {item.brand}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <span
                          className={clsx(
                            "rounded-md px-2 py-0.5 text-[11px] font-medium",
                            item.packType === "Jumbo Pack"
                              ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                              : item.packType === "Singles"
                              ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                              : "bg-white/5 text-white/70"
                          )}
                        >
                          {item.packType}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 font-medium text-white">{item.size}</td>
                      <td className="px-3 py-3.5 text-white/70">
                        <span className="inline-flex items-center gap-1">
                          {item.style}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-center font-mono font-medium text-emerald-400">
                        {item.unitsLabel}
                      </td>
                      <td className="px-3 py-3.5 text-right font-mono text-sm font-bold text-white">
                        ₹{item.mrp}
                      </td>
                      <td className="px-3 py-3.5 text-right font-mono text-[11px] text-white/50">
                        ₹{perUnit}
                      </td>
                      <td className="py-3.5 pr-6 pl-3 text-right">
                        <Link
                          href={`/products/${item.slug}`}
                          className="inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-300 transition hover:bg-sky-500 hover:text-white"
                        >
                          View SKU
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-sm text-white/50">
              No product SKUs match your search query &ldquo;{search}&rdquo;.
            </div>
          )}
        </div>

        {/* Mobile Card List View */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:hidden">
          {filteredItems.map((item) => {
            const perUnit = (item.mrp / item.units).toFixed(2);
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#040f24]/90 p-4 shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider"
                    style={{
                      backgroundColor: `${item.brandColor}22`,
                      color: item.brandColor,
                      border: `1px solid ${item.brandColor}44`,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.brandColor }} />
                    {item.brand}
                  </span>
                  <span className="font-mono text-base font-bold text-white">₹{item.mrp}</span>
                </div>

                <div className="mt-3">
                  <h4 className="font-medium text-white">{item.size} — {item.style}</h4>
                  <div className="mt-1 flex items-center gap-2 text-xs text-white/60">
                    <span className="rounded bg-white/5 px-2 py-0.5">{item.packType}</span>
                    <span>•</span>
                    <span className="font-mono text-emerald-400 font-medium">{item.unitsLabel}</span>
                    <span>•</span>
                    <span className="font-mono text-white/40">~₹{perUnit}/u</span>
                  </div>
                  <p className="mt-2 text-xs text-white/50">{item.highlights}</p>
                </div>

                <div className="mt-4 border-t border-white/5 pt-3">
                  <Link
                    href={`/products/${item.slug}`}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-sky-400/30 bg-sky-500/10 py-2 text-xs font-semibold text-sky-300 transition hover:bg-sky-500 hover:text-white"
                  >
                    View Product Specs & Quote
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial Footnote & Hospital Inquiries */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:flex sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h4 className="text-sm font-semibold text-white">Bulk Hospital Supply & Master Carton Distribution</h4>
            <p className="mt-1 text-xs text-white/60">
              Aroved Healthcare supplies leading hospital chains, government tenders, nursing homes, and pharmacy chains across Karnataka and South India with customized packaging and institutional rates.
            </p>
            <p className="mt-2 text-[11px] text-white/40">
              Registered Office: No. 90/51, 1st Floor, 2nd Main Road, Rajajinagar Industrial Town, Bangalore - 560044 | Customer Care: +91 63669 39345 / 39346
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:shrink-0">
            <Link
              href="/contact?intent=catalogue-inquiry"
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/20 px-5 py-2.5 text-xs font-semibold text-sky-300 transition hover:bg-sky-500 hover:text-white"
            >
              Request Institutional Quotation
            </Link>
          </div>
        </div>

        {/* Modal for Trifold Catalogue Spreads */}
        <AnimatePresence>
          {selectedSpread && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSpread(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-[#071329] p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedSpread("inside")}
                      className={clsx(
                        "rounded-full px-4 py-1.5 text-xs font-medium transition",
                        selectedSpread === "inside"
                          ? "bg-sky-500 text-white"
                          : "border border-white/10 bg-white/5 text-white/70 hover:text-white"
                      )}
                    >
                      Inside Panels (Products & Specs)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSpread("cover")}
                      className={clsx(
                        "rounded-full px-4 py-1.5 text-xs font-medium transition",
                        selectedSpread === "cover"
                          ? "bg-sky-500 text-white"
                          : "border border-white/10 bg-white/5 text-white/70 hover:text-white"
                      )}
                    >
                      Outer Cover Spread & Chart
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSpread(null)}
                    className="rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white"
                    aria-label="Close modal"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/50">
                  <Image
                    src={
                      selectedSpread === "inside"
                        ? "/images/catalogue/catalogue_inside_panels.webp"
                        : "/images/catalogue/catalogue_cover_spread.webp"
                    }
                    alt={
                      selectedSpread === "inside"
                        ? "Aroved Trifold Catalogue Inside Panels"
                        : "Aroved Trifold Catalogue Outer Cover Spread"
                    }
                    fill
                    sizes="(min-width: 1024px) 80vw, 95vw"
                    className="object-contain"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                  <span>Official CorelDRAW Print Proof — Aroved Healthcare Pvt Ltd</span>
                  <Link
                    href="/contact?intent=catalogue-inquiry"
                    className="inline-flex items-center gap-1.5 font-medium text-sky-400 hover:text-sky-300"
                  >
                    Enquire for Hospital & Bulk Supply
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
