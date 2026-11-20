import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={clsx(
        "group inline-flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
      aria-label="Aroved Healthcare — home"
    >
      <div className="relative h-7 sm:h-8 w-28 sm:w-32 shrink-0">
        <Image
          src="/images/logo.webp"
          alt="Aroved Healthcare"
          fill
          priority
          sizes="130px"
          className="object-contain object-left transition duration-300"
        />
      </div>
      <span
        className={clsx(
          "hidden border-l pl-2 font-mono text-[9px] font-bold tracking-[0.24em] uppercase sm:inline-block transition-colors",
          inverted ? "border-white/25 text-[#49a409]" : "border-slate-300 text-[#49a409]"
        )}
      >
        HEALTHCARE
      </span>
    </Link>
  );
}

/** The AROSAFE wordmark: bold ARO, light SAFE — as printed on the product. */
export function Arosafe({ className }: { className?: string }) {
  return (
    <span className={clsx("font-display tracking-tight", className)}>
      <span className="font-extrabold text-[#49a409]">ARO</span>
      <span className="font-light">SAFE</span>
      <sup className="ml-0.5 text-[0.4em] font-normal">®</sup>
    </span>
  );
}
