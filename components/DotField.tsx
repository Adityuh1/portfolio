"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    triggerWave?: (x: number, y: number) => void;
  }
}

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;
    const gap = 24;

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }
    const ripples: Ripple[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.triggerWave = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.8,
        alpha: 0.6,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const baseAlpha = isDark ? 0.08 : 0.07;
      const dotColor = isDark ? "240, 237, 230" : "23, 23, 23";

      // Draw dots
      for (let x = gap; x < width; x += gap) {
        for (let y = gap; y < height; y += gap) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let extraAlpha = 0;
          let offsetR = 0;

          // Mouse proximity reaction
          if (dist < 120) {
            const factor = 1 - dist / 120;
            extraAlpha += factor * 0.28;
            offsetR += factor * 0.6;
          }

          // Ripples reaction
          for (let i = 0; i < ripples.length; i++) {
            const r = ripples[i];
            const rDist = Math.abs(Math.sqrt((x - r.x) ** 2 + (y - r.y) ** 2) - r.radius);
            if (rDist < 40) {
              const rFactor = (1 - rDist / 40) * r.alpha;
              extraAlpha += rFactor * 0.4;
              offsetR += rFactor * 0.8;
            }
          }

          ctx.fillStyle = `rgba(${dotColor}, ${Math.min(1, baseAlpha + extraAlpha)})`;
          ctx.beginPath();
          ctx.arc(x, y, 1 + offsetR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 8;
        r.alpha *= 0.96;
        if (r.radius > r.maxRadius || r.alpha < 0.01) {
          ripples.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      delete window.triggerWave;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
