"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NUM_RE = /^(\D*)(\d+(?:\.\d+)?)(.*)$/;

/**
 * Counts the leading number of a label up from 0 when it scrolls into view,
 * keeping any prefix/suffix: "$13K+" → $0K+ … $13K+, "10+ yrs" → 0+ yrs … 10+ yrs.
 * Labels without a number (e.g. "Full-stack") render as-is.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(NUM_RE);
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const state = { n: 0 };

    const ctx = gsap.context(() => {
      gsap.to(state, {
        n: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onStart: () => setText(`${prefix}0${suffix}`),
        onUpdate: () => setText(`${prefix}${state.n.toFixed(decimals)}${suffix}`),
      });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
