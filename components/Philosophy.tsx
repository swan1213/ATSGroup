"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

/** Split into words, or into characters for scripts without spaces (JA/ZH). */
function tokens(text: string) {
  return /\s/.test(text) ? text.split(/(\s+)/) : Array.from(text);
}

export function Philosophy() {
  const t = useT();
  const p = t.philosophy;
  const quote = useRef<HTMLQuoteElement>(null);

  // Words light up one by one as the quote scrolls through the viewport.
  useEffect(() => {
    const el = quote.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelectorAll(".w"),
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: true },
        }
      );
    });
    return () => mm.revert();
  }, [p.quote]);

  return (
    <section className="section philosophy" id="philosophy">
      <div className="wrap">
        <p className="section-kicker philosophy-kicker reveal">{p.kicker}</p>
        <blockquote className="philosophy-quote" ref={quote}>
          {tokens(p.quote).map((w, i) =>
            /^\s+$/.test(w) ? w : <span className="w" key={i}>{w}</span>
          )}
        </blockquote>
        <div className="philosophy-grid">
          {p.paras.map((para, i) => (
            <p className="philosophy-para reveal" key={i}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
