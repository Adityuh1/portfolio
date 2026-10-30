"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Trophy } from "lucide-react";
import { portfolio } from "@/lib/data";
import { play } from "@/lib/sound";

export default function Work() {
  const titleLetters = "things I've built".split("");

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="rule-t relative py-12 sm:py-16"
    >
      <div className="frame-wide px-5 sm:px-8">
        {/* Main Section Header */}
        <div className="mb-10 flex items-baseline gap-3">
          <h2 id="work-title" className="t-display text-lg text-ink font-semibold">
            {titleLetters.map((char, i) => (
              <span
                key={i}
                className="stagger-ch inline-block cursor-default"
                onMouseEnter={() => play("tick")}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <span className="t-meta text-xs text-ink-3">/ selected projects</span>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {portfolio.work.map((project, index) => {
            const indexStr = String(index + 1).padStart(2, "0");
            return (
              <div
                key={project.slug}
                className="group relative flex flex-col justify-between rounded-lg border border-rule bg-paper p-6 sm:p-7 transition-all duration-200 hover:border-ink hover:bg-paper-sunk"
              >
                <div>
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 t-meta text-xs text-ink-3 tnum">
                      <span className="font-semibold text-ink-2">[{indexStr}]</span>
                      <span>·</span>
                      <span>{project.year}</span>
                      <span>·</span>
                      <span className="uppercase text-[10px] tracking-wider text-ink-3 border border-rule px-1.5 py-0.5 rounded">
                        {project.domain}
                      </span>
                    </div>

                    {project.accolade && (
                      <span className="inline-flex items-center gap-1 rounded-chip bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Trophy className="size-3" />
                        <span>Winner</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="t-name text-xl sm:text-2xl text-ink font-bold group-hover:text-ink">
                    <Link
                      href={`/work/${project.slug}`}
                      onClick={() => play("click")}
                      className="inline-flex items-center gap-1.5 focus:outline-none"
                    >
                      <span>{project.title}</span>
                    </Link>
                  </h3>

                  {/* Summary */}
                  <p className="t-prose mt-3 text-sm text-ink-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Bottom stack & link */}
                <div className="mt-6 pt-4 border-t border-rule-solid flex flex-col gap-4">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="t-meta rounded px-2 py-0.5 text-[11px] text-ink-3 bg-paper-sunk border border-rule"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="t-meta rounded px-1.5 py-0.5 text-[10px] text-ink-3 bg-paper-sunk border border-rule">
                        +{project.stack.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Action link */}
                  <div className="flex items-center justify-between pt-1">
                    <Link
                      href={`/work/${project.slug}`}
                      onClick={() => play("click")}
                      className="t-meta inline-flex items-center gap-1 text-xs text-ink font-semibold group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read case study</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => play("click")}
                        className="t-meta inline-flex items-center gap-1 text-xs text-ink-3 hover:text-ink transition-colors"
                      >
                        <span>Live demo</span>
                        <ArrowUpRight className="size-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Smaller Things / Experiments */}
        <div className="mt-16 pt-10 border-t border-rule">
          <div className="mb-6 flex items-baseline gap-2">
            <h3 className="t-display text-base text-ink font-medium">
              {"smaller things".split("").map((c, i) => (
                <span
                  key={i}
                  className="stagger-ch inline-block cursor-default"
                  onMouseEnter={() => play("tick")}
                >
                  {c === " " ? "\u00A0" : c}
                </span>
              ))}
            </h3>
            <span className="t-meta text-xs text-ink-3">/ experiments & open-source</span>
          </div>

          <div className="divide-y divide-rule border-y border-rule">
            {portfolio.experiments.map((exp) => (
              <div
                key={exp.slug}
                className="group flex flex-col justify-between py-4 sm:flex-row sm:items-baseline sm:gap-6 transition-colors hover:bg-paper-sunk/60 px-2"
              >
                <div className="flex items-baseline gap-3 sm:w-1/3">
                  <a
                    href={exp.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => play("click")}
                    className="t-meta inline-flex items-center gap-1 font-semibold text-sm text-ink group-hover:underline"
                  >
                    <span>{exp.title}</span>
                    <ArrowUpRight className="size-3 text-ink-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                  <span className="t-meta text-xs text-ink-3 tnum">{exp.year}</span>
                </div>

                <div className="mt-1 text-xs text-ink-2 t-prose sm:mt-0 sm:flex-1">
                  {exp.lines.join(" ")}
                </div>

                <div className="mt-2 flex flex-wrap gap-1 sm:mt-0 sm:w-1/4 sm:justify-end">
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      className="t-meta text-[11px] text-ink-3 bg-paper px-1.5 py-0.5 rounded border border-rule-solid"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
