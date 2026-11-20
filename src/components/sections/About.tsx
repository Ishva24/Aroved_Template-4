import Image from "next/image";
import { company, stats } from "@/lib/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { ButtonLink } from "@/components/ui/Button";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28 lg:py-36" aria-labelledby="about-title">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="about-title"
            eyebrow="About Aroved"
            title={<>A healthcare enterprise built on <span className="text-gradient">timely, quality supply.</span></>}
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{company.about}</p>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-4 leading-relaxed text-ink-soft">{company.aboutCare}</p>
          </Reveal>
          <Reveal delay={0.36}>
            <div className="mt-9">
              <ButtonLink href="/about" variant="ghost">Our vision &amp; mission</ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-ice to-[#cfe2fb] sm:aspect-[5/5]">
              <Image
                src="/images/reference/glove-45.webp"
                alt="AROSAFE blue nitrile examination glove"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain p-10 drop-shadow-[0_40px_40px_rgba(15,44,143,0.25)]"
              />
              <div aria-hidden className="grid-bg absolute inset-0 opacity-50" />
            </div>
          </Reveal>
          <dl className="relative -mt-20 grid grid-cols-3 gap-3 px-3 sm:px-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i}>
                <div className="glass flex flex-col rounded-3xl p-4 sm:p-6">
                  <dt className="order-2 mt-2 text-xs font-semibold text-ink sm:text-sm">{s.label}</dt>
                  <dd className="order-1">
                    <span className="block font-display text-3xl font-semibold text-brand-deep sm:text-5xl">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
