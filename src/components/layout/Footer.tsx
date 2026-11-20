import Link from "next/link";
import { company, navigation } from "@/lib/company";
import { categories, products } from "@/lib/products";
import { Logo, Arosafe } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-[#024089]/35 blur-[120px]" />

      <div className="container-x relative pt-20 pb-10">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-14 md:flex-row md:items-end">
          <div>
            <p className="eyebrow !text-[#86efac]">{company.tagline}</p>
            <p className="mt-4 max-w-xl font-display text-3xl leading-tight font-semibold md:text-4xl">
              Infection control products under our brand <Arosafe className="text-[#86efac]" />.
            </p>
          </div>
          <Link href="/contact#enquiry" className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#024089] transition hover:bg-[#86efac] hover:text-[#024089] shadow-md">
            Send an enquiry
          </Link>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center rounded-2xl bg-white px-3.5 py-1.5 shadow-sm border border-slate-100">
              <Logo />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {company.legalName}, partners with leading Manufacturers and Importers to provide a comprehensive range of Infection Control Products under our Brand &ldquo;AROSAFE&rdquo;.
            </p>
          </div>

          <nav aria-label="Footer — site" className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">Company</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((n) => (
                <li key={n.href}><Link href={n.href} className="text-white/75 transition hover:text-[#86efac]">{n.label}</Link></li>
              ))}
              <li><Link href="/about#leadership" className="text-white/75 transition hover:text-[#86efac]">Managing Team</Link></li>
              <li>
                <Link
                  href="/products#catalogue-reference-chart"
                  className="inline-flex items-center gap-1.5 text-sky-400 transition hover:text-sky-300 font-medium"
                >
                  Product Reference Matrix
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer — products" className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">Products</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/products#${c.id}`} className="text-white/75 transition hover:text-[#86efac]">{c.name}</Link>
                  <span className="ml-2 text-xs text-white/35">{products.filter((p) => p.category === c.id).length}</span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">Contact</h3>
            <address className="mt-5 space-y-3 text-sm not-italic text-white/75">
              <p>
                {company.address.line1}<br />
                {company.address.line2}<br />
                {company.address.city} &ndash; {company.address.postalCode}
              </p>
              <p>
                {company.phones.map((p, i) => (
                  <span key={p}>
                    <a href={`tel:+91${p}`} className="transition hover:text-[#86efac]">{p}</a>
                    {i < company.phones.length - 1 && " / "}
                  </span>
                ))}
              </p>
              <p><a href={`mailto:${company.email}`} className="transition hover:text-[#86efac]">{company.email}</a></p>
              <p className="text-white/50">{company.hours}</p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>&copy; {year} {company.legalName}. All rights reserved.</p>
          <p>AROSAFE is a brand of {company.legalName}.</p>
        </div>
      </div>
    </footer>
  );
}
