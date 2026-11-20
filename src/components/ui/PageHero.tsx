import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,#ffffff_0%,#e6f1fd_50%,transparent_100%)]" />
      <div aria-hidden className="grid-bg absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-cyan/20 blur-[100px]" />
      <div className="relative container-x">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
