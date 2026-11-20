"use client";

import type { ModelSpec } from "@/lib/products";
import { LazyProductViewer } from "@/components/three/lazy";

export function ProductViewerPanel({ spec, slug, name }: { spec: ModelSpec; slug: string; name: string }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#f5f9fe] to-[#dce8f8] shadow-[inset_0_1px_0_white,0_40px_80px_-40px_rgba(15,44,143,0.4)] sm:aspect-[5/4] lg:sticky lg:top-24">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
      <LazyProductViewer spec={spec} modelKey={slug} label={name} wheelZoom={false} className="h-full w-full" />
    </div>
  );
}
