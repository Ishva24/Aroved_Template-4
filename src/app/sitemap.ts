import type { MetadataRoute } from "next";
import { company } from "@/lib/company";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.url;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/products`, lastModified: now, priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, priority: 0.85 },
    { url: `${base}/about`, lastModified: now, priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, priority: 0.7 },
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
