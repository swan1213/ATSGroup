"use client";

import { useEffect } from "react";

/**
 * Pointer-driven 3D tilt for every `.tilt` element. One delegated listener
 * sets --rx/--ry (rotation) and --mx/--my (spotlight position); the visuals
 * live in globals.css. Disabled on touch devices and under reduced motion.
 */
const MAX_DEG = 7;

export function Tilt3D() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let active: HTMLElement | null = null;

    const reset = (el: HTMLElement) => {
      el.classList.remove("tilting");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(".tilt") ?? null;
      if (active && active !== el) reset(active);
      active = el;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.classList.add("tilting");
      el.style.setProperty("--ry", `${(px - 0.5) * MAX_DEG * 2}deg`);
      el.style.setProperty("--rx", `${(0.5 - py) * MAX_DEG * 2}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    };

    const onLeave = () => {
      if (active) reset(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
