import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { company } from "@/lib/company";
import { getCategory, getProduct, products, productsIn } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductViewerPanel } from "@/components/products/ProductViewerPanel";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ContactSection } from "@/components/sections/ContactSection";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `AROSAFE ${product.name}`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: product.image ? { images: [{ url: product.image, alt: product.name }] } : undefined,
  };
}

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = productsIn(product.category).filter((p) => p.slug !== product.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `AROSAFE ${product.name}`,
    description: product.description,
    brand: { "@type": "Brand", name: company.brand },
    category: category.name,
    image: product.image ? `${company.url}${product.image}` : undefined,
  };

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-32">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#ffffff_0%,#e6f1fd_55%,transparent_100%)]" />
        <div className="relative container-x">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-brand">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/products" className="hover:text-brand">Products</Link></li>
              <li aria-hidden>/</li>
              <li><Link href={`/products#${category.id}`} className="hover:text-brand">{category.short}</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-medium text-ink">{product.name}</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ProductViewerPanel spec={product.model} slug={product.slug} name={product.name} />
            </div>

            <div className="lg:col-span-5 lg:pt-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: category.accent }}>{category.name}</p>
              <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
              <p className="mt-2 text-lg text-brand">{product.tagline}</p>
              <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>

              {product.features && (
                <ul className="mt-6 grid gap-2.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-ink">
                      <svg className="mt-0.5 shrink-0 text-cyan" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><path d="m5 12 5 5 9-10" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="glass mt-8 rounded-3xl p-6">
                <h2 className="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">Specifications</h2>
                {product.specs.length ? (
                  <dl className="mt-4 divide-y divide-line">
                    {product.specs.map((s) => (
                      <div key={s.label} className="grid grid-cols-3 gap-4 py-3 text-sm">
                        <dt className="text-ink-soft">{s.label}</dt>
                        <dd className="col-span-2 font-medium text-ink">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-ink">
                    Sizes, configurations and kit contents are available on request &mdash; including customised kits. Send us your requirement and our team will share full details.
                  </p>
                )}
                {product.applications && (
                  <div className="mt-5 border-t border-line pt-5">
                    <h3 className="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">Applications</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {product.applications.map((a) => (
                        <li key={a} className="rounded-full bg-ice px-3 py-1 text-xs font-medium text-brand-deep">{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#enquiry">Enquire about this product</ButtonLink>
                <a href={`tel:+91${company.phones[0]}`} className="glass inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold text-ink transition hover:text-brand">
                  Call {company.phones[0]}
                </a>
                {product.category === "hygiene" && (
                  <Link
                    href="/products#catalogue-reference-chart"
                    className="inline-flex items-center gap-2 rounded-full border border-sky-600/30 bg-sky-50 px-5 py-3.5 text-sm font-semibold text-sky-800 transition hover:bg-sky-100"
                  >
                    View All Sizes &amp; MRP
                  </Link>
                )}
              </div>
            </div>
          </div>

          {(product.gallery || product.image) && (
            <Reveal>
              <ProductGallery
                productName={product.name}
                primaryImage={product.image}
                gallery={product.gallery}
              />
            </Reveal>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16" aria-labelledby="related-title">
          <div className="container-x">
            <h2 id="related-title" className="font-display text-2xl font-semibold">More from {category.name}</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}><ProductCard product={p} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactSection defaultProduct={product.name} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
