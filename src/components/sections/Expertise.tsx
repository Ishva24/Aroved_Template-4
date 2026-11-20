"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const AREAS: { title: string; body: string; items: string[]; href: string; icon: ReactNode }[] = [
  {
    title: "Infection Control",
    body: "Barrier protection for clinical teams — examination, sterile surgical and EVA gloves, plus sterile surgeon gowns and drape kits.",
    items: ["Nitrile, latex & black nitrile gloves", "Sterile surgical & EVA gloves", "Surgeon gowns & drape kits"],
    href: "/products#gloves",
    icon: (
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4" />
    ),
  },
  {
    title: "Medical Hygiene",
    body: "Everyday hygiene consumables for wards, theatres and care homes, from antiseptic wet wipes to single-use apparel.",
    items: ["Antiseptic wet wipes", "Under pads", "Caps, shoe covers & 3-ply masks"],
    href: "/products#hygiene",
    icon: (
      <path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11Zm-2.5 11.5a2.5 2.5 0 0 0 2.5 2.5" />
    ),
  },
  {
    title: "CSSD & Sterile Supply",
    body: "Consumables that support the sterilisation workflow in CSSD departments — packaging, wrapping and process monitoring.",
    items: ["Sterilization reels, 5–50 cm", "Wrapping sheets, 50–150 cm", "Indicators, tapes & labels"],
    href: "/products#cssd",
    icon: (
      <path d="M4 7h16v10H4zM8 7V5h8v2M4 12h16M9 15h.01M12 15h.01M15 15h.01" />
    ),
  },
];

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5), y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(x, (v) => `${v * 100}%`);
  const glowY = useTransform(y, (v) => `${v * 100}%`);
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => (x.set(0.5), y.set(0.5))}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative h-full"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: useTransform([glowX, glowY], ([gx, gy]) => `radial-gradient(400px circle at ${gx} ${gy}, rgba(2,64,137,0.14), transparent 60%)`) }}
      />
      {children}
    </motion.div>
  );
}

export function Expertise() {
  return (
    <section id="expertise" className="relative scroll-mt-24 overflow-hidden py-28 lg:py-36" aria-labelledby="expertise-title">
      <div aria-hidden className="absolute top-0 left-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#024089]/06 blur-[130px]" />
      <div aria-hidden className="absolute top-1/4 right-0 h-[450px] w-[450px] rounded-full bg-[#49a409]/06 blur-[120px]" />
      <div className="relative container-x">
        <SectionHeading
          id="expertise-title"
          align="center"
          eyebrow="Our expertise"
          title={<>Focused on <span className="text-gradient">infection control</span> across the care pathway.</>}
          intro="We partner with leading manufacturers and importers to bring hospitals and healthcare providers a single, dependable source for infection control and surgical consumables."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {AREAS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1} className="h-full">
              <TiltCard>
                <div className="glass relative flex h-full flex-col rounded-[2rem] p-8 transition-shadow duration-300 hover:shadow-lg">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#024089] to-[#0284c7] text-white shadow-[0_14px_30px_-12px_rgba(2,64,137,0.5)]">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{a.icon}</svg>
                  </span>
                  <h3 className="mt-8 font-display text-2xl font-semibold text-ink">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{a.body}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-sm text-ink">
                    {a.items.map((it) => (
                      <li key={it} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#49a409]" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Link href={a.href} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#024089] transition hover:text-[#49a409]">
                    View products <span aria-hidden>→</span>
                    <span className="absolute inset-0" aria-hidden />
                  </Link>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
