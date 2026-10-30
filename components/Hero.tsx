"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";
import { portfolio } from "@/lib/data";
import { play } from "@/lib/sound";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = portfolio.identity.rotatingWords;

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section
      aria-labelledby="hero-name"
      className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center px-5 py-14 sm:px-8 sm:py-20"
    >
      <div className="frame-wide">
        {/* Top avatar and name */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            onClick={() => {
              play("click");
              if (typeof window.triggerWave === "function") {
                window.triggerWave(100, 150);
              }
            }}
            className="group relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-chip border border-rule bg-paper-sunk transition-transform duration-200 hover:scale-105 active:scale-95 sm:size-20"
            title="Aditya"
          >
            <Image
              src="/aditya.jpg"
              alt={portfolio.identity.avatarAlt}
              width={80}
              height={80}
              className="h-full w-full object-cover grayscale contrast-125 transition-all duration-300 group-hover:grayscale-0"
              priority
            />
          </div>

          <div className="min-w-0">
            <p className="t-meta mb-1.5 text-ink-3">Hey,</p>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h1 id="hero-name" className="t-name text-ink text-2xl sm:text-4xl">
                {portfolio.identity.name}
              </h1>
              <p className="t-meta mb-1 whitespace-nowrap text-ink-3">this side!</p>
            </div>
          </div>
        </div>

        {/* Phonetic Pronunciation Card */}
        <div className="mt-4">
          <p className="t-meta flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-ink-3">
            <span className="text-[1.2em] leading-none text-ink font-deva font-medium">
              {portfolio.identity.nameBlock.script}
            </span>
            <span className="flex items-baseline gap-2">
              <span aria-hidden="true">·</span>
              <span className="text-ink-2">{portfolio.identity.nameBlock.syllables}</span>
            </span>
            <span className="flex items-baseline gap-2">
              <span aria-hidden="true">·</span>
              <span className="italic">{portfolio.identity.nameBlock.ipa}</span>
            </span>
            <span className="flex items-baseline gap-2">
              <span aria-hidden="true">·</span>
              <span>{portfolio.identity.nameBlock.meaning}</span>
            </span>
          </p>
        </div>

        {/* Rotating words tagline */}
        <p className="mt-5 text-lg sm:text-xl text-ink-2">
          I build{" "}
          <span className="relative inline-block min-w-[200px] font-semibold text-ink transition-all duration-300">
            <span
              key={wordIndex}
              className="inline-block animate-fadeIn"
            >
              {words[wordIndex]}
            </span>
          </span>
          .
        </p>

        {/* Intro paragraphs */}
        <div className="mt-6 flex max-w-[65ch] flex-col gap-3">
          <p className="hang leading-[1.65] text-sm sm:text-base text-ink-2">
            {portfolio.identity.intro[0]}
          </p>
          <p className="hang leading-[1.65] text-sm sm:text-base text-ink-3">
            {portfolio.identity.intro[1]}
          </p>
        </div>

        {/* Call to action & Socials */}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={() => play("click")}
              className="relative inline-flex shrink-0 select-none items-center justify-center gap-1.5 rounded-chip border border-ink bg-ink px-5 py-2.5 text-sm text-paper font-medium transition-all duration-150 hover:bg-ink-2 hover:border-ink-2 active:translate-y-px"
            >
              See the work
            </a>
            <a
              href={`mailto:${portfolio.links.email}`}
              onClick={() => play("click")}
              className="relative inline-flex shrink-0 select-none items-center justify-center gap-1.5 rounded-chip border border-rule px-5 py-2.5 text-sm text-ink font-medium transition-all duration-150 hover:border-ink hover:bg-paper-sunk active:translate-y-px"
            >
              Get in touch
            </a>
          </div>

          <span
            aria-hidden="true"
            className="hidden h-6 w-px bg-rule-solid sm:block"
          />

          {/* Social Links */}
          <ul className="flex items-center gap-1.5">
            <li>
              <a
                href={portfolio.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                onClick={() => play("click")}
                className="grid size-10 place-items-center rounded-chip text-ink-2 transition-colors hover:bg-paper-sunk hover:text-ink border border-transparent hover:border-rule"
                title="GitHub"
              >
                <GithubIcon className="size-4" />
              </a>
            </li>
            <li>
              <a
                href={portfolio.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                onClick={() => play("click")}
                className="grid size-10 place-items-center text-ink-2 transition-colors hover:bg-paper-sunk hover:text-ink rounded-chip border border-transparent hover:border-rule"
                title="LinkedIn"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </li>
            <li>
              <a
                href={portfolio.links.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                onClick={() => play("click")}
                className="grid size-10 place-items-center text-ink-2 transition-colors hover:bg-paper-sunk hover:text-ink rounded-chip border border-transparent hover:border-rule"
                title="Twitter"
              >
                <TwitterIcon className="size-4" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${portfolio.links.email}`}
                aria-label="Email"
                onClick={() => play("click")}
                className="grid size-10 place-items-center text-ink-2 transition-colors hover:bg-paper-sunk hover:text-ink rounded-chip border border-transparent hover:border-rule"
                title="Email"
              >
                <Mail className="size-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
