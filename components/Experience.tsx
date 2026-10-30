"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolio } from "@/lib/data";
import { play } from "@/lib/sound";

export default function Experience() {
  const titleLetters = "experiences".split("");

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="rule-t relative bg-paper-sunk py-12 sm:py-16"
    >
      <div className="frame-wide px-5 sm:px-8">
        {/* Section Heading */}
        <div className="mb-10 flex items-baseline gap-3">
          <h2
            id="experience-title"
            className="t-display text-lg text-ink font-semibold"
          >
            {titleLetters.map((char, i) => (
              <span
                key={i}
                className="stagger-ch inline-block cursor-default"
                onMouseEnter={() => play("tick")}
              >
                {char}&nbsp;
              </span>
            ))}
          </h2>
          <span className="t-meta text-xs text-ink-3">/ roles & history</span>
        </div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-6">
          {portfolio.experience.map((exp, index) => {
            const indexStr = String(index + 1).padStart(2, "0");
            return (
              <div
                key={exp.slug}
                className="group relative flex flex-col justify-between rounded-lg border border-rule bg-paper p-6 sm:p-8 transition-all duration-200 hover:border-ink hover:bg-paper-raised"
              >
                <div>
                  {/* Top metadata row */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 t-meta text-xs text-ink-3 tnum">
                      <span className="font-semibold text-ink-2">[{indexStr}]</span>
                      <span>·</span>
                      <span className="font-medium text-ink">{exp.org}</span>
                    </div>
                    <span className="t-meta text-xs text-ink-3 tnum">
                      {exp.start} — {exp.end ?? "Present"}
                    </span>
                  </div>

                  {/* Role Title */}
                  <h3 className="t-name text-lg sm:text-xl text-ink font-bold">
                    <Link
                      href={exp.href}
                      onClick={() => play("click")}
                      className="inline-flex items-center gap-2 hover:underline"
                    >
                      <span>{exp.role}</span>
                    </Link>
                  </h3>
                  <p className="t-meta mt-1 text-xs text-ink-3">{exp.tagline}</p>

                  {/* Summary */}
                  <p className="t-prose mt-4 text-sm text-ink-2 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Bullets preview */}
                  <ul className="mt-4 flex flex-col gap-2 border-l border-rule pl-4">
                    {exp.bullets.slice(0, 3).map((bullet, idx) => (
                      <li
                        key={idx}
                        className="t-prose text-xs text-ink-2 leading-relaxed"
                      >
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer stack and link */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule-solid pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((item) => (
                      <span
                        key={item}
                        className="t-meta rounded px-2 py-0.5 text-[11px] text-ink-3 bg-paper-sunk border border-rule"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={exp.href}
                    onClick={() => play("click")}
                    className="t-meta inline-flex items-center gap-1 text-xs text-ink font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    <span>Full role details</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
