"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { company, navigation } from "@/lib/company";
import { categories } from "@/lib/products";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), setProductsOpen(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={clsx("transition-all duration-500", scrolled ? "py-2" : "py-3 sm:py-4")}>
        <nav
          aria-label="Primary"
          className={clsx(
            "flex items-center justify-between rounded-full transition-all duration-500",
            scrolled
              ? "mx-auto max-w-[min(1240px,calc(100%-1.5rem))] !px-4 py-2 md:!px-6 bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.10)]"
              : "mx-auto max-w-[min(1280px,calc(100%-2rem))] !px-5 py-2.5 md:!px-7 bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_28px_rgba(15,23,42,0.06)]"
          )}
        >
          {/* Authentic Aroved Brand Logo — Always preserved in original brand colors */}
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) =>
              item.label === "Products" ? (
                <li key={item.href} className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition",
                      isActive(item.href)
                        ? "bg-brand/10 text-brand font-semibold"
                        : "text-ink hover:bg-slate-100 hover:text-brand"
                    )}
                    aria-haspopup="true"
                    aria-expanded={productsOpen}
                    onFocus={() => setProductsOpen(true)}
                  >
                    Products
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden className={clsx("transition", productsOpen && "rotate-180")}><path d="m6 9 6 6 6-6" /></svg>
                  </Link>
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 w-[440px] -translate-x-1/2 pt-3"
                      >
                        <div
                          className="grid gap-1 rounded-3xl p-3 shadow-2xl backdrop-blur-2xl transition glass bg-white/95 border border-slate-200 text-ink shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
                          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setProductsOpen(false)}
                        >
                          {categories.map((c) => (
                            <Link
                              key={c.id}
                              href={`/products#${c.id}`}
                              className="rounded-2xl p-3 transition hover:bg-slate-100"
                            >
                              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                <span className="h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: c.accent, color: c.accent }} />
                                {c.name}
                              </span>
                              <span className="mt-1 block pl-4 text-xs text-ink-soft">{c.summary}</span>
                            </Link>
                          ))}
                          <div className="mt-1 border-t pt-2 border-slate-100">
                            <Link
                              href="/products#catalogue-reference-chart"
                              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition text-sky-600 hover:bg-sky-50"
                            >
                              <span className="flex items-center gap-2">
                                <span className="rounded bg-sky-500/20 px-1.5 py-0.5 font-mono text-[10px] text-sky-400">17 SKUs</span>
                                Product Reference &amp; Pricing Matrix
                              </span>
                              <span>&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={clsx(
                      "rounded-full px-4 py-2 text-sm font-medium transition",
                      isActive(item.href)
                        ? "bg-brand/10 text-brand font-semibold"
                        : "text-ink hover:bg-slate-100 hover:text-brand"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2.5">
            <a href={`tel:+91${company.phones[0]}`} className="hidden text-sm font-medium transition hover:text-cyan-soft xl:block text-ink-soft">
              +91 {company.phones[0]}
            </a>
            <Link
              href="/contact#enquiry"
              className="hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95 sm:inline-flex bg-ink text-white shadow-md hover:bg-brand"
            >
              Enquire
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full lg:hidden transition glass"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-5">
                <span className={clsx("absolute left-0 h-0.5 w-5 rounded transition-all bg-ink", open ? "top-1.5 rotate-45" : "top-0")} />
                <span className={clsx("absolute left-0 h-0.5 w-5 rounded transition-all bg-ink", open ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 -z-10 bg-mist/95 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              className="container-x flex h-full flex-col justify-center gap-2 pt-20"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {navigation.map((item) => (
                <motion.li key={item.href} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="block py-2 font-display text-4xl font-semibold text-ink">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-8 text-sm text-ink-soft">
                <a href={`mailto:${company.email}`} className="block">{company.email}</a>
                <a href={`tel:+91${company.phones[0]}`} className="mt-1 block">+91 {company.phones[0]}</a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
