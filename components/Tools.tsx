"use client";

import React from "react";
import { portfolio } from "@/lib/data";
import { play } from "@/lib/sound";

export default function Tools() {
  const titleLetters = "tools I use".split("");

  return (
    <section
      id="tools"
      aria-labelledby="tools-title"
      className="rule-t relative py-12 sm:py-16"
    >
      <div className="frame-wide px-5 sm:px-8">
        {/* Section Heading */}
        <div className="mb-10 flex items-baseline gap-3">
          <h2 id="tools-title" className="t-display text-lg text-ink font-semibold">
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
          <span className="t-meta text-xs text-ink-3">/ stack & technical depth</span>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {portfolio.stack.map((cat) => (
            <div
              key={cat.label}
              className="rounded-lg border border-rule bg-paper p-6 transition-colors hover:border-ink-2"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="t-meta font-bold text-xs uppercase tracking-wider text-ink">
                  {cat.label}
                </h3>
                <span className="t-meta text-[11px] text-ink-3 tnum">
                  {cat.items.length} technologies
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    onMouseEnter={() => play("tick")}
                    className="t-meta cursor-default rounded-chip border border-rule bg-paper-sunk px-3 py-1 text-xs text-ink-2 transition-all duration-150 hover:border-ink hover:text-ink hover:scale-105"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
