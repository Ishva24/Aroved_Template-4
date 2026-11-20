"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { company } from "@/lib/company";
import { products } from "@/lib/products";
import { Button } from "./Button";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

const field =
  "peer w-full rounded-2xl border border-line bg-white/80 px-4 pt-6 pb-2.5 text-sm text-ink outline-none transition placeholder:text-transparent focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 aria-[invalid=true]:border-red-400";
const floatLabel =
  "pointer-events-none absolute top-2 left-4 text-[11px] font-semibold tracking-wide text-ink-soft transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-brand";

function Field({ name, label, type = "text", required, autoComplete, error }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string; error?: string }) {
  return (
    <div className="relative">
      <input id={name} name={name} type={type} required={required} autoComplete={autoComplete} placeholder={label} className={field} aria-invalid={!!error} aria-describedby={error ? `${name}-err` : undefined} />
      <label htmlFor={name} className={floatLabel}>{label}{required && " *"}</label>
      {error && <p id={`${name}-err`} className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

/** Enquiry form. Posts to /api/enquiry; if email delivery isn't configured, falls back to the visitor's mail client. */
export function EnquiryForm({ defaultProduct, className }: { defaultProduct?: string; className?: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) errs.email = "Please enter a valid email.";
    if (!data.message?.trim()) errs.message = "Please tell us what you need.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (data.company_website) return; // honeypot

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        form.reset();
        setStatus({ state: "sent", message: "Thank you — our team will get back to you shortly." });
        return;
      }
      if (res.status === 503) {
        // Email delivery not configured on this deployment: hand over to the mail client.
        const subject = encodeURIComponent(`Enquiry: ${data.product || "AROSAFE products"}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nOrganisation: ${data.organisation || "-"}\nPhone: ${data.phone || "-"}\nEmail: ${data.email}\nProduct: ${data.product || "-"}\n\n${data.message}`,
        );
        window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
        setStatus({ state: "sent", message: `Your email app has been opened with the enquiry addressed to ${company.email}.` });
        return;
      }
      throw new Error((await res.json().catch(() => null))?.error ?? "Something went wrong.");
    } catch (err) {
      setStatus({ state: "error", message: `${(err as Error).message} You can also email us at ${company.email}.` });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className={clsx("grid gap-4", className)} aria-label="Product enquiry">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" required autoComplete="name" error={errors.name} />
        <Field name="organisation" label="Hospital / organisation" autoComplete="organization" />
        <Field name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
      </div>
      <div className="relative">
        <select id="product" name="product" defaultValue={defaultProduct ?? ""} className={clsx(field, "appearance-none pr-10")}>
          <option value="">General enquiry</option>
          {products.map((p) => (
            <option key={p.slug} value={p.name}>{p.name}</option>
          ))}
        </select>
        <label htmlFor="product" className="pointer-events-none absolute top-2 left-4 text-[11px] font-semibold tracking-wide text-ink-soft">Product of interest</label>
        <svg className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-soft" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
      </div>
      <div className="relative">
        <textarea id="message" name="message" rows={5} required placeholder="Message" className={clsx(field, "resize-none")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
        <label htmlFor="message" className={floatLabel}>Requirement — quantities, sizes, delivery location *</label>
        {errors.message && <p id="message-err" className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" arrow disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-xs text-ink-soft">Or call <a className="font-semibold text-brand" href={`tel:+91${company.phones[0]}`}>{company.phones[0]}</a></p>
      </div>
      <AnimatePresence>
        {status.message && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className={clsx("rounded-2xl px-4 py-3 text-sm", status.state === "error" ? "bg-red-50 text-red-700" : "bg-cyan/10 text-brand-deep")}
          >
            {status.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
