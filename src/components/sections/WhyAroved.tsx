"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stats } from "@/lib/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

const STRENGTHS = [
  { title: "Leading manufacturer partnerships", body: "We collaborate with top manufacturers of healthcare products who utilise state-of-the-art technology." },
  { title: "Timely delivery", body: "Dedicated to the timely delivery of quality products, enhancing service quality for hospitals, customers and patients." },
  { title: "Customised drape kits", body: "Major and minor drape kits along with various customised surgical drape kits in various sizes." },
  { title: "Committed to quality", body: "Adopting the highest quality standards in our products and services, with continuous improvement." },
  { title: "Customer first", body: "Exceptional customer satisfaction, fostering long-term relationships and repeat business." },
  { title: "Nationwide focus", body: "Offering a wide range of healthcare solutions nationwide — our Black Nitrile Gloves are now available across India." },
];

/** Abstract hub-and-spoke network illustrating Aroved's hospital & distributor reach (not a geographic map). */
function NetworkGraphic() {
  const root = useRef<SVGSVGElement>(null);
  const nodes = Array.from({ length: 22 }, (_, i) => {
    const ring = i < 8 ? 120 : 205;
    const n = i < 8 ? 8 : 14;
    const a = ((i < 8 ? i : i - 8) / n) * Math.PI * 2 + (i < 8 ? 0.3 : 0);
    return { x: 260 + Math.cos(a) * ring, y: 260 + Math.sin(a) * ring * 0.82, r: i < 8 ? 7 : 4.5 };
  });

  useGSAP(
    () => {
      gsap.fromTo("[data-link]", { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 2, stagger: 0.03, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });
      gsap.fromTo("[data-node]", { scale: 0, transformOrigin: "center" }, { scale: 1, duration: 0.8, stagger: 0.03, ease: "back.out(2)", scrollTrigger: { trigger: root.current, start: "top 75%" } });
      gsap.to("[data-pulse]", { scale: 2.6, opacity: 0, duration: 2.4, repeat: -1, ease: "sine.out", transformOrigin: "center", stagger: 0.8 });
    },
    { scope: root },
  );

  return (
    <svg ref={root} viewBox="0 0 520 520" className="h-auto w-full" role="img" aria-label="Illustration of Aroved's network linking hospitals and distributors to its Bangalore office">
      <defs>
        <radialGradient id="hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#024089" />
        </radialGradient>
        <linearGradient id="link" x1="0" x2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {[120, 205].map((r) => (
        <ellipse key={r} cx="260" cy="260" rx={r} ry={r * 0.82} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 6" />
      ))}
      {nodes.map((n, i) => {
        const from = i < 8 ? { x: 260, y: 260 } : nodes[(i - 8) % 8];
        return <line key={`l${i}`} data-link x1={from.x} y1={from.y} x2={n.x} y2={n.y} stroke="url(#link)" strokeWidth="1.2" strokeDasharray="300" />;
      })}
      {nodes.map((n, i) => (
        <circle key={`n${i}`} data-node cx={n.x} cy={n.y} r={n.r} fill={i < 8 ? "#ffffff" : "#86efac"} opacity={i < 8 ? 0.95 : 0.75} />
      ))}
      <circle data-pulse cx="260" cy="260" r="26" fill="none" stroke="#4ade80" strokeWidth="1.5" />
      <circle data-pulse cx="260" cy="260" r="26" fill="none" stroke="#0284c7" strokeWidth="1.5" />
      <circle cx="260" cy="260" r="26" fill="url(#hub)" />
      <text x="260" y="304" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="600" letterSpacing="3">BANGALORE</text>
    </svg>
  );
}

export function WhyAroved() {
  return (
    <section id="why-aroved" className="relative scroll-mt-24 overflow-hidden bg-[#030e24] py-28 text-white lg:py-36" aria-labelledby="why-title" data-theme="dark">
      <div aria-hidden className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-[#024089]/40 blur-[140px]" />
      <div aria-hidden className="absolute bottom-0 -left-40 h-[420px] w-[420px] rounded-full bg-[#49a409]/15 blur-[130px]" />
      <div className="relative container-x">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="[&_.eyebrow]:!text-[#86efac] [&_h2]:!text-white [&_p]:!text-white/65">
              <SectionHeading
                id="why-title"
                eyebrow="Why Aroved"
                title={<>The most preferred partner for <span className="bg-gradient-to-r from-[#86efac] via-[#38bdf8] to-white bg-clip-text text-transparent">hygiene supplies.</span></>}
                intro={"Our mission is to attain the status of the “Most Preferred Brand” with all our clients and become the go-to choice for hygiene-related products and supplies."}
              />
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="glass-dark flex flex-col rounded-3xl p-5 border border-white/10">
                  <dt className="order-2 mt-1 text-xs text-white/60 sm:text-sm">{s.label}</dt>
                  <dd className="order-1 font-display text-3xl font-bold text-white sm:text-4xl"><CountUp value={s.value} suffix={s.suffix} /></dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal>
            <div className="glass-dark mx-auto max-w-[520px] rounded-[2.5rem] p-4 border border-white/10 shadow-2xl">
              <NetworkGraphic />
              <p className="px-4 pb-3 text-center text-xs tracking-wide text-white/50">250+ hospitals · 500+ distributors · Head office in Bangalore</p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {STRENGTHS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 0.08} className="bg-[#030e24] p-8 transition-colors duration-500 hover:bg-[#06183d]">
              <span className="font-display text-sm font-semibold text-[#86efac]">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{s.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
