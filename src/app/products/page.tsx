import type { Metadata } from "next";
import { categories, productsIn } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductUniverse } from "@/components/sections/ProductUniverse";
import { CatalogueReferenceChart } from "@/components/products/CatalogueReferenceChart";

export const metadata: Metadata = {
  title: "AROSAFE Products",
  description: "The complete AROSAFE range: gloves, hygiene care, surgical drapes & kits, and CSSD products from Aroved Healthcare.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <h1 className="sr-only">AROSAFE Products</h1>
      <ProductUniverse />

      <div className="grain relative overflow-hidden bg-[var(--night)] pb-36 text-white" data-theme="dark">
        <div aria-hidden className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand/25 blur-[140px]" />
        <div className="relative container-x pt-24">
          <p className="font-mono text-[11px] tracking-[0.3em] text-cyan-soft uppercase">Catalogue</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            Every product, <span className="text-outline">in detail.</span>
          </h2>
          <nav aria-label="Product categories" className="mt-10 flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <a key={c.id} href={`#${c.id}`} className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:text-cyan-soft">
                <span className="font-mono text-xs text-cyan">0{i + 1}</span> {c.name}
              </a>
            ))}
            <a
              href="#catalogue-reference-chart"
              className="liquid-glass flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/15 px-4 py-2 text-sm font-medium text-sky-300 transition hover:bg-sky-500/25 hover:text-white"
            >
              <span className="font-mono text-xs text-sky-400">17 SKUs</span> Official Reference Matrix
            </a>
          </nav>
        </div>

        {categories.map((c, ci) => (
          <section key={c.id} id={c.id} className="relative scroll-mt-24 pt-20" aria-labelledby={`h-${c.id}`}>
            <div className="container-x">
              <div className="grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="font-display text-6xl font-bold text-outline">0{ci + 1}</p>
                  <h2 id={`h-${c.id}`} className="mt-4 font-display text-3xl font-semibold">{c.name}</h2>
                  <p className="mt-3 max-w-sm text-white/55">{c.summary}</p>
                  <p className="mt-4 font-mono text-xs tracking-widest text-cyan-soft uppercase">{productsIn(c.id).length} products</p>
                </div>
                <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
                  {productsIn(c.id).map((p) => (
                    <li key={p.slug}>
                      <ProductCard product={p} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* Official 17-Item Product Reference & Pricing Matrix */}
        <CatalogueReferenceChart />
      </div>
    </>
  );
}
