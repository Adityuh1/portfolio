"use client";

import { useEffect } from "react";
import { play } from "@/lib/sound";

interface TypeCodeProps {
  word?: string;
}

export default function TypeCode({ word = "aditya" }: TypeCodeProps) {
  useEffect(() => {
    let typed = "";
    const targetWord = word.toLowerCase();

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key.length !== 1) return;

      typed = (typed + e.key.toLowerCase()).slice(-targetWord.length);
      if (typed !== targetWord) return;

      typed = "";
      const heroNameEl = document.getElementById("hero-name");
      if (!heroNameEl) return;

      const originalText = heroNameEl.textContent ?? "";
      heroNameEl.textContent = "";

      originalText.split("").forEach((char, index) => {
        window.setTimeout(() => {
          heroNameEl.textContent = originalText.slice(0, index + 1);
          play("tick");
        }, 55 * index);
      });

      window.setTimeout(() => {
        const rect = heroNameEl.getBoundingClientRect();
        play("swish");
        if (typeof window.triggerWave === "function") {
          window.triggerWave(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      }, 55 * originalText.length + 120);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [word]);

  return null;
}
