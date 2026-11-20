import clsx from "clsx";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, intro, align = "left", className, id }: { eyebrow: string; title: ReactNode; intro?: ReactNode; align?: "left" | "center"; className?: string; id?: string }) {
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <span className={clsx("eyebrow", align === "center" && "justify-center")}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 id={id} className="mt-5 font-display text-3xl leading-[1.08] font-semibold tracking-tight text-balance text-ink sm:text-4xl lg:text-[3.25rem]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
