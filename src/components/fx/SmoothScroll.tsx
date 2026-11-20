"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Inertial smooth scrolling (Lenis) synchronized with GSAP's ticker.
 * Fully integrated with Next.js App Router for instant page transitions.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 0.55,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.2,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(500, 33);

    // Initial ScrollTrigger refresh once DOM & images settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    // Handle in-page smooth anchor clicks without conflicting with Next.js router
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href*='#']") as HTMLAnchorElement | null;
      if (!a) return;
      // If external or navigating to another page/origin, let Next.js / browser handle normally
      if (a.origin !== location.origin || a.pathname !== location.pathname) return;

      const hash = a.hash;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 0.45 });
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick, { capture: false });

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Handle route changes: reset scroll or scroll to hash anchor, then refresh ScrollTrigger
  useEffect(() => {
    const lenis = lenisRef.current || (window as unknown as { __lenis?: Lenis }).__lenis;

    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80, immediate: true });
          else el.scrollIntoView({ behavior: "smooth" });
        }
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Clean page transition: reset scroll to top immediately
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}

/** Programmatic scroll that respects Lenis when active. */
export function scrollToY(y: number, immediate = false) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(y, { immediate, duration: immediate ? 0 : 0.45 });
  else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}
