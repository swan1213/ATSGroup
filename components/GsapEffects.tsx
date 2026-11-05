"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide GSAP + ScrollTrigger effects. Rendered once inside the
 * LanguageProvider. Components only add classes / data attributes; this
 * file owns the motion.
 *
 *  .reveal                    3D rise-in when scrolled into view
 *  .reveal[data-reveal=flip]  card flips in around the Y axis
 *  .reveal[data-reveal=zoom]  pushes forward out of depth
 *  .partner-line              connector draws with scroll (scrub)
 *  .results-chart             dots pop + area fades in
 *  .btn-primary, .nav-cta     magnetic hover (fine pointers only)
 *
 * Everything is skipped under prefers-reduced-motion (content just shows).
 */

const REVEAL = ".reveal:not([data-gs])";

/** Per-variant starting pose for a revealed element. */
function fromPose(el: Element) {
  switch ((el as HTMLElement).dataset.reveal) {
    case "flip":
      return { rotationY: -75, rotationX: 8, y: 30, z: -120, transformOrigin: "50% 50% -60px" };
    case "zoom":
      return { scale: 0.82, z: -200, y: 40, rotationX: 10, transformOrigin: "50% 50%" };
    default:
      return { y: 56, rotationX: -14, transformOrigin: "50% 100%" };
  }
}

function setupReveals() {
  const els = gsap.utils.toArray<HTMLElement>(REVEAL);
  if (!els.length) return;

  ScrollTrigger.batch(els, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => {
      // A fast jump (nav link, scrollbar drag) fires every skipped element at
      // once: show the ones already scrolled past instantly and only animate
      // what is actually on screen, with a capped stagger.
      let i = 0;
      batch.forEach((el) => {
        // mark only once revealed, so a re-run (language switch) still picks
        // up anything that never scrolled into view
        (el as HTMLElement).dataset.gs = "1";
        if (el.getBoundingClientRect().bottom < 0) {
          gsap.set(el, { autoAlpha: 1 });
          return;
        }
        const delay = Math.min(i++, 4) * 0.1;
        gsap.fromTo(
          el,
          { autoAlpha: 0, transformPerspective: 1000, ...fromPose(el) },
          {
            autoAlpha: 1, x: 0, y: 0, z: 0, scale: 1, rotationX: 0, rotationY: 0,
            duration: (el as HTMLElement).dataset.reveal === "flip" ? 1.3 : 1.05,
            ease: "power3.out",
            delay,
            // CSS transitions on transform would smear GSAP's per-frame updates
            onStart: () => el.classList.add("gsap-animating"),
            onComplete: () => el.classList.remove("gsap-animating"),
            // hand `transform` back to CSS (the .tilt hover effect owns it)
            clearProps: "transform,transformPerspective",
          }
        );
      });
    },
  });
}

function setupPartnerLine() {
  const line = document.querySelector<HTMLElement>(".partner-line");
  const flow = document.querySelector<HTMLElement>(".partner-flow");
  if (!line || !flow) return;
  const vertical = window.matchMedia("(max-width: 920px)").matches;
  gsap.fromTo(
    line,
    vertical ? { scaleY: 0, scaleX: 1 } : { scaleX: 0, scaleY: 1 },
    {
      scaleX: 1, scaleY: 1,
      transformOrigin: vertical ? "50% 0%" : "0% 50%",
      ease: "none",
      scrollTrigger: { trigger: flow, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
    }
  );
}

function setupChart() {
  const chart = document.querySelector(".results-chart");
  if (!chart) return;
  const dots = chart.querySelectorAll("circle");
  const area = chart.querySelector(".chart-area");
  const tl = gsap.timeline({ scrollTrigger: { trigger: chart, start: "top 78%", once: true } });
  if (area) tl.from(area, { autoAlpha: 0, duration: 1, ease: "power2.out" });
  tl.from(dots, { scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(3)", stagger: 0.08 }, 0.2);
}

function setupMagnetic() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const cleanups: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>(".btn-primary, .nav-cta").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    });
  });
  return () => cleanups.forEach((c) => c());
}

export function GsapEffects() {
  const { locale } = useLang();

  // One-time effects (elements whose identity never changes).
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      setupPartnerLine();
      setupChart();
      return setupMagnetic();
    });
    return () => mm.revert();
  }, []);

  // Reveals run on mount and again after a language switch, because cards
  // keyed by their (translated) text remount as fresh, still-hidden nodes.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(REVEAL, { autoAlpha: 1 });
      return;
    }
    const ctx = gsap.context(setupReveals);
    // layout height changes with the language; re-measure triggers
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(id);
      ctx.kill(); // stop pending triggers without un-revealing shown content
    };
  }, [locale]);

  return null;
}
