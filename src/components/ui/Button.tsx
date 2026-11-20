import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand-deep via-brand to-[#2a6be6] text-white shadow-[0_14px_30px_-12px_rgba(26,68,201,0.65)] hover:shadow-[0_18px_40px_-12px_rgba(24,184,224,0.7)]",
  ghost: "glass text-ink hover:text-brand",
  light: "bg-white text-brand-deep hover:bg-ice",
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60";

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function ButtonLink({ href, variant = "primary", children, arrow = true, className }: { href: string; variant?: Variant; children: ReactNode; arrow?: boolean; className?: string }) {
  return (
    <Link href={href} className={clsx(base, styles[variant], className)}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({ variant = "primary", children, arrow = false, className, ...props }: ComponentProps<"button"> & { variant?: Variant; arrow?: boolean }) {
  return (
    <button className={clsx(base, styles[variant], className)} {...props}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
