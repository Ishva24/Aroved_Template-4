"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cinematic intro: a percentage counter and the AROSAFE wordmark assemble,
 * then the curtain splits open. Shown once per session; skipped for reduced motion.
 */
export function Preloader() {
  const [show, setShow] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("arosafe-intro") === "1"; } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const D = 1700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / D, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => {
        setShow(false);
        document.documentElement.style.overflow = "";
        try { sessionStorage.setItem("arosafe-intro", "1"); } catch {}
      }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.documentElement.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[300]" aria-hidden exit={{ transition: { duration: 1 } }}>
          {/* Split curtain */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-x-0 bg-[#040a18]"
              style={{ top: i ? "50%" : 0, height: "50%" }}
              exit={{ y: i ? "100%" : "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
            />
          ))}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-white"
            exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)", transition: { duration: 0.5 } }}
          >
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl tracking-tight sm:text-7xl"
              >
                <span className="font-extrabold">ARO</span>
                <span className="font-light">SAFE</span>
              </motion.p>
            </div>
            <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
              <div className="h-full bg-gradient-to-r from-brand to-cyan" style={{ width: `${n}%` }} />
            </div>
            <p className="mt-4 font-display text-xs tracking-[0.4em] text-white/50 tabular-nums">{String(n).padStart(3, "0")}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
