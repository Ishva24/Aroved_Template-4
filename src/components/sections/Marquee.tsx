import { products } from "@/lib/products";

/** Infinite product-name ticker between hero and content. */
export function Marquee() {
  const names = products.map((p) => p.name);
  return (
    <div className="relative overflow-hidden border-y border-line bg-white py-5" aria-hidden>
      <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-10 whitespace-nowrap">
        {[...names, ...names].map((n, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-sm font-medium tracking-wide text-ink-soft">
            {n}
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
        ))}
      </div>
    </div>
  );
}
