import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Trophy, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { portfolio, Project } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DotField from "@/components/DotField";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return portfolio.work.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = portfolio.work.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | ${portfolio.identity.name}`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: Props) {
  const projectIndex = portfolio.work.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project: Project = portfolio.work[projectIndex];
  const nextProject = portfolio.work[(projectIndex + 1) % portfolio.work.length];
  const indexStr = String(projectIndex + 1).padStart(2, "0");

  return (
    <div className="relative min-h-screen flex flex-col bg-paper text-ink">
      <DotField />
      <Header />

      <main className="relative z-10 flex-1">
        {/* Project Header Banner */}
        <header className="rule-b relative bg-paper-sunk px-5 py-10 sm:px-8 sm:py-14">
          <div className="frame-wide">
            {/* Top breadcrumb navigation */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="t-meta text-xs text-ink-3 tnum">[{indexStr}]</span>
                <Link
                  href="/#work"
                  className="t-meta inline-flex items-center gap-1.5 text-xs text-ink-2 hover:text-ink transition-colors group"
                >
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Things I&apos;ve built</span>
                </Link>
              </div>

              <div className="flex items-center gap-2 t-meta text-xs text-ink-3">
                <span>{project.year}</span>
                <span>·</span>
                <span className="uppercase text-[10px] tracking-wider border border-rule px-1.5 py-0.5 rounded">
                  {project.domain}
                </span>
              </div>
            </div>

            {/* Project Title & Accolades */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="t-name text-3xl sm:text-5xl font-bold text-ink">
                {project.title}
              </h1>
              {project.accolade && (
                <span className="inline-flex items-center gap-1.5 rounded-chip bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Trophy className="size-3.5" />
                  <span>{project.accolade}</span>
                </span>
              )}
            </div>

            <p className="t-prose text-base sm:text-lg text-ink-2 max-w-[70ch] mt-3 leading-relaxed">
              {project.summary}
            </p>

            {/* Action Links & Tech Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-rule-solid">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="t-meta rounded px-2.5 py-1 text-xs text-ink-2 bg-paper border border-rule"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.links?.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="t-meta inline-flex items-center gap-1.5 rounded-chip border border-rule px-3.5 py-1.5 text-xs text-ink hover:border-ink hover:bg-paper transition-colors font-medium"
                  >
                    {link.label === "Source" ? (
                      <GithubIcon className="size-3.5" />
                    ) : (
                      <ArrowUpRight className="size-3.5" />
                    )}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Project Content Body */}
        <section className="py-12 sm:py-16 px-5 sm:px-8">
          <div className="frame-wide">
            {/* Screenshot or Cover Image if available */}
            {project.cover && (
              <div className="mb-12 overflow-hidden rounded-lg border border-rule bg-paper-sunk shadow-sm">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            )}

            {/* Deep-dive narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 flex flex-col gap-6">
                <h2 className="t-name text-xl font-bold text-ink">
                  Architecture &amp; System Overview
                </h2>
                {project.body.map((p, i) => (
                  <p
                    key={i}
                    className="t-prose text-base text-ink-2 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}

                {/* PointAt architectural insight */}
                <div className="mt-6 rounded-lg border border-rule bg-paper-sunk p-6 transition-colors hover:border-ink-3">
                  <div className="flex items-center gap-2 mb-2 text-ink">
                    <Cpu className="size-4 text-ink" />
                    <h3 className="t-meta text-xs uppercase font-bold tracking-wider">
                      Key Engineering Insight
                    </h3>
                  </div>
                  <p className="t-prose text-sm text-ink-2 leading-relaxed italic">
                    &quot;{project.pointAt}&quot;
                  </p>
                </div>
              </div>

              {/* Sidebar specifications */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="rounded-lg border border-rule bg-paper p-5">
                  <h3 className="t-meta text-xs uppercase font-bold tracking-wider text-ink mb-4">
                    Project Specifications
                  </h3>
                  <div className="flex flex-col gap-3.5 t-meta text-xs">
                    <div>
                      <span className="text-ink-3 block text-[11px]">Domain</span>
                      <span className="font-semibold text-ink uppercase">
                        {project.domain}
                      </span>
                    </div>
                    <div>
                      <span className="text-ink-3 block text-[11px]">Year</span>
                      <span className="font-semibold text-ink">{project.year}</span>
                    </div>
                    <div>
                      <span className="text-ink-3 block text-[11px]">Core Tech</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.stack.map((t) => (
                          <span
                            key={t}
                            className="bg-paper-sunk border border-rule-solid px-1.5 py-0.5 rounded text-[10px] text-ink-2"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Project card */}
                <div className="rounded-lg border border-rule bg-paper p-5 transition-colors hover:border-ink">
                  <span className="t-meta text-[11px] text-ink-3 block mb-1">
                    Next Project →
                  </span>
                  <Link
                    href={`/work/${nextProject.slug}`}
                    className="t-name font-bold text-base text-ink hover:underline block"
                  >
                    {nextProject.title}
                  </Link>
                  <p className="t-prose text-xs text-ink-2 mt-1 line-clamp-2">
                    {nextProject.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
