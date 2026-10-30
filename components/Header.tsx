"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { portfolio } from "@/lib/data";
import { play, initSound, setSoundState, unlockSound } from "@/lib/sound";

export default function Header() {
  const [timeStr, setTimeStr] = useState<string>("--:--:--");
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    // Initialize sound state
    setSoundOn(initSound());

    // Initialize theme state
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    // Live clock for Vadodara (Asia/Kolkata)
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString("en-US", {
          timeZone: portfolio.identity.timezone,
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setTimeStr(formatted);
      } catch {
        setTimeStr("--:--:--");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Scroll progress bar
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Unlock audio on first click or touch
    const handleUnlock = () => {
      unlockSound();
      window.removeEventListener("pointerdown", handleUnlock);
    };
    window.addEventListener("pointerdown", handleUnlock);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerdown", handleUnlock);
    };
  }, []);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundState(nextState);
  };

  const toggleTheme = () => {
    play("click");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="rule-b sticky top-0 z-40 h-14 bg-paper/85 backdrop-blur-md sm:h-16">
      <span
        aria-hidden="true"
        className="read-bar"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="frame-wide relative flex h-full items-center justify-between px-5 sm:px-8">
        {/* Left: Brand mark */}
        <div className="flex shrink-0 items-center gap-2.5">
          <Link
            href="/"
            onClick={() => play("click")}
            className="t-meta whitespace-nowrap text-ink transition-colors duration-150 hover:text-ink font-semibold flex items-center gap-1.5"
          >
            <span>{portfolio.identity.firstName}</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav aria-label="Sections" className="min-w-0">
          <ul className="flex items-center gap-1 sm:gap-4">
            {[
              { label: "about", href: "/#about" },
              { label: "work", href: "/#work" },
              { label: "experience", href: "/#experience" },
              { label: "contact", href: "/#contact" },
            ].map((item) => (
              <li key={item.label} className="shrink-0">
                <a
                  href={item.href}
                  onClick={() => play("click")}
                  className="t-meta px-2 py-1 text-ink-2 hover:text-ink transition-colors duration-150 inline-block"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Clock, Availability, Sound & Theme toggles */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
          {/* Live Clock */}
          <div
            className="hidden md:flex items-center gap-1.5 t-meta tnum text-ink-3 cursor-default"
            title="Vadodara, India (IST)"
          >
            <span>{timeStr}</span>
            <span className="text-[10px] text-ink-3">IST</span>
          </div>

          {/* Availability Pill */}
          <div
            className="hidden sm:inline-flex items-center gap-1.5 rounded-chip px-2.5 py-1 text-xs text-ink-2 bg-paper-sunk border border-rule"
            title="Actively seeking new opportunities"
          >
            <span aria-hidden="true" className="dot-live" />
            <span className="t-meta text-[11px] whitespace-nowrap">
              {portfolio.identity.availability.label}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? "Mute audio effects" : "Enable audio effects"}
            className="grid size-8 place-items-center rounded-chip text-ink-2 hover:text-ink hover:bg-paper-sunk transition-colors border border-transparent hover:border-rule"
            title={soundOn ? "Sound: ON" : "Sound: OFF"}
          >
            {soundOn ? (
              <Volume2 className="size-4" />
            ) : (
              <VolumeX className="size-4 opacity-60" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="grid size-8 place-items-center rounded-chip text-ink-2 hover:text-ink hover:bg-paper-sunk transition-colors border border-transparent hover:border-rule"
            title={isDark ? "Dark mode" : "Light mode"}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
