import type { Metadata } from "next";
import Image from "next/image";
import { company, mission, quality, stats, team, teamQuote, vision } from "@/lib/company";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description: `${company.legalName} — ${company.tagline}. Our vision, mission, quality policy and managing team.`,
  alternates: { canonical: "/about" },
};

const PILLARS = [
  { tag: "Our Vision", ...vision },
  { tag: "Our Mission", ...mission },
  { tag: "Quality Policy", title: quality.title, caption: "", points: quality.points },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={company.tagline} title={<>About <span className="text-gradient">Aroved Healthcare</span></>} intro={company.about}>
        <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="glass flex flex-col rounded-3xl p-5">
              <dt className="order-2 mt-1 text-xs font-semibold text-ink sm:text-sm">{s.label}</dt>
              <dd className="order-1 font-display text-3xl font-semibold text-brand-deep sm:text-4xl"><CountUp value={s.value} suffix={s.suffix} /></dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="py-16" aria-label="Our care focus">
        <div className="container-x">
          <Reveal>
            <p className="max-w-4xl font-display text-2xl leading-snug font-medium text-ink sm:text-3xl">{company.aboutCare}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20" aria-labelledby="values-title">
        <div className="container-x">
          <SectionHeading id="values-title" eyebrow="Vision, mission & values" title="What guides us." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.tag} delay={i * 0.1} className="h-full">
                <article className="glass flex h-full flex-col rounded-[2rem] p-8">
                  <p className="eyebrow">{p.tag}</p>
                  <h3 className="mt-5 font-display text-2xl font-semibold">&ldquo;{p.title}&rdquo;</h3>
                  {p.caption && <p className="text-sm text-ink-soft">&mdash; {p.caption}</p>}
                  {p.tag === "Quality Policy" && <p className="mt-4 text-sm text-ink-soft">{quality.intro}</p>}
                  <ul className="mt-6 space-y-3 border-t border-line pt-6">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed text-ink">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className="scroll-mt-24 bg-white py-24" aria-labelledby="team-title">
        <div className="container-x">
          <SectionHeading id="team-title" eyebrow="Managing team" title="Leadership" intro={<>&ldquo;{teamQuote}&rdquo;</>} />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 0.1}>
                <article className="group overflow-hidden rounded-[2rem] border border-line bg-mist">
                  <div className="relative aspect-[4/4] overflow-hidden">
                    <Image src={m.image} alt={`${m.name}, ${m.role}`} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-5 text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">{m.role}</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold">{m.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x flex flex-col items-start justify-between gap-6 rounded-[2.5rem] bg-gradient-to-br from-brand-deep via-brand to-cyan p-10 text-white sm:flex-row sm:items-center sm:p-14">
          <h2 className="max-w-xl font-display text-3xl font-semibold">Explore the complete AROSAFE range.</h2>
          <ButtonLink href="/products" variant="light">View products</ButtonLink>
        </div>
      </section>
    </>
  );
}
