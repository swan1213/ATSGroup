"use client";

import { useEffect, useState } from "react";

/**
 * Floating "back to top" button — a staple of Japanese corporate sites
 * (ページトップへ). Appears once the visitor scrolls down.
 */
export function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-top${show ? " show" : ""}`}
      aria-label="Back to top"
      onClick={toTop}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 15V5M5 10l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="scroll-top-label">TOP</span>
    </button>
  );
}
