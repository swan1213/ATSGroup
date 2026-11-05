"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Animated cursor: a gold dot that tracks the pointer exactly and a glowing
 * ring that trails it with GSAP easing.
 *  - over links / buttons / cards the ring grows and fills with soft gold
 *  - pressing squeezes it
 *  - over text fields (and when the pointer leaves the page, e.g. into the
 *    Calendly iframe) it hides so the native cursor takes over
 * Only on fine pointers with motion allowed; otherwise nothing renders.
 */

const INTERACTIVE = "a, button, [role='button'], label, summary, .tilt, .photo-card";
const TEXT_FIELD = "input, textarea, select, [contenteditable='true']";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    gsap.set([d, r], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dotX = gsap.quickTo(d, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(d, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    const show = (on: boolean) => {
      if (on === visible) return;
      visible = on;
      gsap.to([d, r], { autoAlpha: on ? 1 : 0, duration: 0.25, overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      const target = e.target as Element | null;
      show(!target?.closest(TEXT_FIELD));
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const hovering = !!target?.closest(INTERACTIVE);
      r.classList.toggle("is-hover", hovering);
      d.classList.toggle("is-hover", hovering);
    };

    const onDown = () => gsap.to(r, { scale: 0.75, duration: 0.15, ease: "power2.out" });
    const onUp = () => gsap.to(r, { scale: 1, duration: 0.35, ease: "back.out(3)" });
    // relatedTarget is null when the pointer leaves the page or enters an iframe
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) show(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      gsap.killTweensOf([d, r]);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
