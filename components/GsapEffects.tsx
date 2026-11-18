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
 *
 * Buttons have no magnetic hover: in this theme a button's hover IS its
 * transform (it presses down into its own hard shadow), and a GSAP tween
 * writing x/y would fight that CSS transition for the same property.
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

export function GsapEffects() {
  const { locale } = useLang();

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
