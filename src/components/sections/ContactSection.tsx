import Image from "next/image";
import { company } from "@/lib/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/ui/EnquiryForm";

const Icon = ({ d }: { d: string }) => (
  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-cyan text-white shadow-sm">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  </span>
);

export function ContactSection({ defaultProduct, headingLevel = "h2" }: { defaultProduct?: string; headingLevel?: "h1" | "h2" }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`;

  return (
    <section id="enquiry" className="relative scroll-mt-24 py-28 lg:py-36" aria-labelledby="contact-title">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-50" />
      <div className="relative container-x">
        {headingLevel === "h1" ? (
          <div className="max-w-3xl">
            <span className="eyebrow">Contact</span>
            <h1 id="contact-title" className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
              Let&rsquo;s talk about your <span className="text-gradient">requirements.</span>
            </h1>
          </div>
        ) : (
          <SectionHeading id="contact-title" eyebrow="Contact" title={<>Let&rsquo;s talk about your <span className="text-gradient">requirements.</span></>} />
        )}

        {/* Row 1: Left Form + Right Full-Height Mascot Showcase */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column (7 cols): Enquiry Form */}
          <Reveal className="lg:col-span-7 flex flex-col">
            <div className="glass rounded-[2.5rem] p-6 sm:p-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink">Send an enquiry</h3>
                <p className="mt-1 text-sm text-ink-soft">Share your requirement and the AROSAFE team will respond during business hours.</p>
                <EnquiryForm defaultProduct={defaultProduct} className="mt-8" />
              </div>
            </div>
          </Reveal>

          {/* Right Column (5 cols): Entire space dedicated to the Mascot */}
          <Reveal delay={0.1} className="lg:col-span-5 flex flex-col">
            <div className="glass relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-ice to-[#e1effe] p-7 sm:p-9 flex-1 flex flex-col justify-between shadow-[0_20px_50px_rgba(24,184,224,0.12)] ring-1 ring-white/70">
              {/* Card Header */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-brand uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                    Healthcare Advisory Team
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                  Ready to assist your hospital &amp; clinical staff
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  From custom surgical drape kits and sample requests to bulk hospital supply, our specialists are dedicated to timely, quality care.
                </p>
              </div>

              {/* Mascot Center Showcase (Large, full-standing, high-resolution) */}
              <div className="relative my-6 min-h-[320px] sm:min-h-[380px] w-full flex-1 flex items-center justify-center">
                <div aria-hidden className="absolute inset-0 rounded-full bg-radial from-cyan/20 via-brand/5 to-transparent blur-2xl" />
                <Image
                  src="/images/mascot/aroved_doctors_mascot_transparent.webp"
                  alt="Aroved Healthcare Specialists Advisory Team"
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-contain drop-shadow-[0_24px_40px_rgba(15,44,143,0.22)] transition duration-500 hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* Card Footer: Trust Metrics & Quick Contact */}
              <div className="border-t border-brand/15 pt-5 space-y-3.5">
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-ink">
                  <span className="rounded-full bg-white/90 px-3 py-1 shadow-xs ring-1 ring-brand/10">✓ 24hr Quotation Turnaround</span>
                  <span className="rounded-full bg-white/90 px-3 py-1 shadow-xs ring-1 ring-brand/10">✓ Custom Drape Assemblies</span>
                  <span className="rounded-full bg-white/90 px-3 py-1 shadow-xs ring-1 ring-brand/10">✓ Pan-India Supply</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-xs text-ink-soft">
                  <span>Prefer to speak with an executive?</span>
                  <a href="tel:+916366939345" className="font-semibold text-brand hover:underline inline-flex items-center gap-1">
                    Call +91 6366939345 →
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Row 2: Neatly placed existing contact details (Office, Phone, Email, Hours) */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Office */}
          <Reveal delay={0.15}>
            <div className="glass flex h-full flex-col justify-between rounded-[2rem] p-6 shadow-sm">
              <div className="flex items-center gap-3.5">
                <Icon d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <div>
                  <p className="text-[11px] font-mono font-bold tracking-wider text-ink-soft uppercase">Office</p>
                  <p className="font-semibold text-ink text-sm">Headquarters</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-line/60">
                <p className="text-xs leading-relaxed text-ink">
                  <span className="font-semibold">{company.legalName}</span><br />
                  {company.address.line1}<br />
                  {company.address.line2}<br />
                  {company.address.city} &ndash; {company.address.postalCode}
                </p>
              </div>
            </div>
          </Reveal>

          {/* 2. Phone */}
          <Reveal delay={0.2}>
            <div className="glass flex h-full flex-col justify-between rounded-[2rem] p-6 shadow-sm">
              <div className="flex items-center gap-3.5">
                <Icon d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                <div>
                  <p className="text-[11px] font-mono font-bold tracking-wider text-ink-soft uppercase">Direct Lines</p>
                  <p className="font-semibold text-ink text-sm">Enquiry &amp; Support</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-line/60">
                <div className="flex flex-col gap-1 text-sm font-semibold text-brand">
                  <a href="tel:+916366939345" className="hover:underline inline-flex items-center gap-1.5">
                    +91 6366939345
                  </a>
                  <a href="tel:+916366939346" className="hover:underline inline-flex items-center gap-1.5">
                    +91 6366939346
                  </a>
                </div>
                <p className="mt-1 text-[11px] text-ink-soft">Direct line to procurement</p>
              </div>
            </div>
          </Reveal>

          {/* 3. Email */}
          <Reveal delay={0.25}>
            <div className="glass flex h-full flex-col justify-between rounded-[2rem] p-6 shadow-sm">
              <div className="flex items-center gap-3.5">
                <Icon d="M4 6h16v12H4zM4 7l8 6 8-6" />
                <div>
                  <p className="text-[11px] font-mono font-bold tracking-wider text-ink-soft uppercase">Email</p>
                  <p className="font-semibold text-ink text-sm">Sales &amp; Quotations</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-line/60">
                <a href={`mailto:${company.email}`} className="text-sm font-semibold text-brand hover:underline break-all block">
                  {company.email}
                </a>
                <p className="mt-1 text-[11px] text-ink-soft">Official quotation &amp; enquiry inbox</p>
              </div>
            </div>
          </Reveal>

          {/* 4. Opening Hours */}
          <Reveal delay={0.3}>
            <div className="glass flex h-full flex-col justify-between rounded-[2rem] p-6 shadow-sm">
              <div className="flex items-center gap-3.5">
                <Icon d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <div>
                  <p className="text-[11px] font-mono font-bold tracking-wider text-ink-soft uppercase">Hours</p>
                  <p className="font-semibold text-ink text-sm">Business Schedule</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-line/60">
                <p className="text-xs font-semibold text-ink">{company.hours}</p>
                <p className="mt-1 text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Regular hospital dispatch active
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Row 3: Interactive Location Map */}
        <Reveal delay={0.35}>
          <div className="mt-6 glass overflow-hidden rounded-[2.5rem] p-2.5 shadow-sm">
            <iframe
              title="Map showing Aroved Healthcare office, Rajajinagar Industrial Town, Bangalore"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 sm:h-80 w-full rounded-[2rem] grayscale-[0.25] contrast-[1.05]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
