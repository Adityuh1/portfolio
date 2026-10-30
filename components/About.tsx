"use client";

import React from "react";
import { GraduationCap, Award } from "lucide-react";
import { portfolio } from "@/lib/data";
import { play } from "@/lib/sound";

export default function About() {
  const letters = "about".split("");

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="rule-t relative bg-paper-sunk py-12 sm:py-16"
    >
      <div className="frame-wide px-5 sm:px-8">
        {/* Section Heading with staggered letter hover */}
        <div className="mb-8 flex items-baseline gap-3">
          <h2 id="about-title" className="t-display text-lg text-ink font-semibold">
            {letters.map((char, i) => (
              <span
                key={i}
                className="stagger-ch inline-block cursor-default"
                onMouseEnter={() => play("tick")}
              >
                {char}&nbsp;
              </span>
            ))}
          </h2>
          <span className="t-meta text-xs text-ink-3">/ bio & education</span>
        </div>

        {/* Narrative columns */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main Bio Paragraphs */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            {portfolio.about.bio.map((paragraph, index) => (
              <p
                key={index}
                className="t-prose text-sm sm:text-base text-ink-2 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Education & Certifications Cards */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Education Box */}
            <div className="rounded-lg border border-rule bg-paper p-5 transition-colors hover:border-ink-3">
              <div className="flex items-center gap-2 mb-3 text-ink">
                <GraduationCap className="size-4 text-ink" />
                <h3 className="t-meta font-bold uppercase text-xs tracking-wider">
                  Education
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {portfolio.education.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-rule pl-3">
                    <p className="t-prose font-semibold text-xs text-ink">
                      {edu.degree}
                    </p>
                    <p className="t-meta text-[11px] text-ink-2">
                      {edu.institution}
                    </p>
                    <p className="t-meta text-[11px] text-ink-3">
                      {edu.period} · {edu.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Box */}
            <div className="rounded-lg border border-rule bg-paper p-5 transition-colors hover:border-ink-3">
              <div className="flex items-center gap-2 mb-3 text-ink">
                <Award className="size-4 text-ink" />
                <h3 className="t-meta font-bold uppercase text-xs tracking-wider">
                  Certifications
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {portfolio.certifications.map((cert, idx) => (
                  <div key={idx} className="flex flex-col">
                    <p className="t-prose text-xs font-medium text-ink">
                      {cert.title}
                    </p>
                    <p className="t-meta text-[11px] text-ink-3">
                      {cert.issuer} ({cert.year})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
