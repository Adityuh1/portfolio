"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";
import { portfolio } from "@/lib/data";
import { play } from "@/lib/sound";

export default function Footer() {
  const scrollToTop = () => {
    play("click");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto border-t border-rule bg-paper">
      {/* Hatch banner with primary callout */}
      <div className="hatch rule-b bg-paper-sunk">
        <div className="frame-wide flex flex-col items-start justify-between gap-6 px-5 py-10 sm:px-8 sm:py-14 lg:flex-row lg:items-center">
          <div>
            <p className="t-meta mb-2 text-ink-3">Interested in collaborating?</p>
            <a
              href={`mailto:${portfolio.links.email}`}
              onClick={() => play("click")}
              className="t-name text-2xl sm:text-3xl text-ink font-bold hover:underline"
            >
              {portfolio.links.email}
            </a>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2">
            <p className="t-meta text-xs text-ink-3 italic">
              &quot;{portfolio.identity.signOff}&quot;
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="t-meta inline-flex items-center gap-1.5 rounded-chip border border-rule bg-paper px-3 py-1.5 text-xs text-ink-2 hover:border-ink hover:text-ink transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="size-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="frame-wide flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <p className="t-meta text-xs text-ink-3">
            © {new Date().getFullYear()} {portfolio.identity.name}.
          </p>
          <span className="hidden sm:inline text-ink-3">·</span>
          <span className="t-meta text-[11px] text-ink-3">
            Vadodara, Gujarat, India
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="t-meta text-[11px] text-ink-3 hidden md:inline">
            💡 <span className="opacity-75">hint: type &apos;aditya&apos; anywhere</span>
          </span>

          <div className="flex items-center gap-2.5">
            <a
              href={portfolio.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              onClick={() => play("click")}
              className="text-ink-3 hover:text-ink transition-colors"
            >
              <GithubIcon className="size-3.5" />
            </a>
            <a
              href={portfolio.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              onClick={() => play("click")}
              className="text-ink-3 hover:text-ink transition-colors"
            >
              <LinkedinIcon className="size-3.5" />
            </a>
            <a
              href={portfolio.links.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              onClick={() => play("click")}
              className="text-ink-3 hover:text-ink transition-colors"
            >
              <TwitterIcon className="size-3.5" />
            </a>
            <a
              href={`mailto:${portfolio.links.email}`}
              aria-label="Email"
              onClick={() => play("click")}
              className="text-ink-3 hover:text-ink transition-colors"
            >
              <Mail className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
