import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Building2, CheckCircle, Lightbulb } from "lucide-react";
import { portfolio, ExperienceItem } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DotField from "@/components/DotField";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return portfolio.experience.map((e) => ({
    slug: e.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const exp = portfolio.experience.find((e) => e.slug === params.slug);
  if (!exp) return { title: "Experience Not Found" };
  return {
    title: `${exp.role} at ${exp.org} | ${portfolio.identity.name}`,
    description: exp.summary,
  };
}

export default function ExperiencePage({ params }: Props) {
  const expIndex = portfolio.experience.findIndex((e) => e.slug === params.slug);
  if (expIndex === -1) {
    notFound();
  }

  const exp: ExperienceItem = portfolio.experience[expIndex];
  const nextExp = portfolio.experience[(expIndex + 1) % portfolio.experience.length];
  const indexStr = String(expIndex + 1).padStart(2, "0");

  return (
    <div className="relative min-h-screen flex flex-col bg-paper text-ink">
      <DotField />
      <Header />

      <main className="relative z-10 flex-1">
        {/* Experience Header */}
        <header className="rule-b relative bg-paper-sunk px-5 py-10 sm:px-8 sm:py-14">
          <div className="frame-wide">
            {/* Top Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="t-meta text-xs text-ink-3 tnum">[{indexStr}]</span>
                <Link
                  href="/#experience"
                  className="t-meta inline-flex items-center gap-1.5 text-xs text-ink-2 hover:text-ink transition-colors group"
                >
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Experiences</span>
                </Link>
              </div>

              <span className="t-meta text-xs text-ink-3 tnum">
                {exp.start} — {exp.end ?? "Present"}
              </span>
            </div>

            {/* Role & Org */}
            <h1 className="t-name text-3xl sm:text-5xl font-bold text-ink mb-2">
              {exp.org}
            </h1>
            <p className="t-display text-lg text-ink font-medium">
              {exp.role}
            </p>
            <p className="t-meta text-xs text-ink-3 mt-1.5">{exp.tagline}</p>

            <p className="t-prose text-base sm:text-lg text-ink-2 max-w-[70ch] mt-4 leading-relaxed">
              {exp.summary}
            </p>

            {/* Stack Tags */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-rule-solid">
              <div className="flex flex-wrap gap-1.5">
                {exp.stack.map((item) => (
                  <span
                    key={item}
                    className="t-meta rounded px-2.5 py-1 text-xs text-ink-2 bg-paper border border-rule"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {exp.orgUrl && (
                <a
                  href={exp.orgUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="t-meta inline-flex items-center gap-1.5 rounded-chip border border-rule px-3.5 py-1.5 text-xs text-ink hover:border-ink hover:bg-paper transition-colors font-medium"
                >
                  <Building2 className="size-3.5" />
                  <span>Company Website</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Narrative & Bullets */}
        <section className="py-12 sm:py-16 px-5 sm:px-8">
          <div className="frame-wide grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Details */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div>
                <h2 className="t-name text-xl font-bold text-ink mb-4">
                  Scope of Responsibility
                </h2>
                <p className="t-prose text-base text-ink-2 leading-relaxed">
                  {exp.details}
                </p>
              </div>

              {/* Key Deliverables & Achievements */}
              <div>
                <h3 className="t-name text-lg font-bold text-ink mb-4">
                  Key Accomplishments &amp; Initiatives
                </h3>
                <ul className="flex flex-col gap-3.5 border-l-2 border-rule pl-4">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="size-4 text-live shrink-0 mt-1" />
                      <span className="t-prose text-sm sm:text-base text-ink-2 leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Note / Key Takeaway */}
              <div className="rounded-lg border border-rule bg-paper-sunk p-6 transition-colors hover:border-ink-3">
                <div className="flex items-center gap-2 mb-2 text-ink">
                  <Lightbulb className="size-4 text-amber-500" />
                  <h3 className="t-meta text-xs uppercase font-bold tracking-wider">
                    Key Takeaway
                  </h3>
                </div>
                <p className="t-prose text-sm text-ink-2 leading-relaxed italic">
                  &quot;{exp.note}&quot;
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="rounded-lg border border-rule bg-paper p-5">
                <h3 className="t-meta text-xs uppercase font-bold tracking-wider text-ink mb-4">
                  Role Overview
                </h3>
                <div className="flex flex-col gap-3.5 t-meta text-xs">
                  <div>
                    <span className="text-ink-3 block text-[11px]">Organization</span>
                    <span className="font-semibold text-ink">{exp.org}</span>
                  </div>
                  <div>
                    <span className="text-ink-3 block text-[11px]">Tenure</span>
                    <span className="font-semibold text-ink">
                      {exp.start} — {exp.end ?? "Present"}
                    </span>
                  </div>
                  <div>
                    <span className="text-ink-3 block text-[11px]">Domain</span>
                    <span className="font-semibold text-ink uppercase">
                      {exp.domain}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Experience */}
              <div className="rounded-lg border border-rule bg-paper p-5 transition-colors hover:border-ink">
                <span className="t-meta text-[11px] text-ink-3 block mb-1">
                  Other Experience →
                </span>
                <Link
                  href={nextExp.href}
                  className="t-name font-bold text-base text-ink hover:underline block"
                >
                  {nextExp.role}
                </Link>
                <p className="t-meta text-xs text-ink-3 mt-0.5">
                  {nextExp.org} ({nextExp.start} — {nextExp.end ?? "Present"})
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
