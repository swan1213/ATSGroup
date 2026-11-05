"use client";

import { useEffect, useState } from "react";
import { useT } from "./LanguageProvider";

// Teams collaborating (Unsplash CDN). Parallel to collab.slides — keep the
// same count in every locale.
const IMAGES = [
  "https://images.unsplash.com/photo-1531482615713-2afd69097998", // two developers working through code together
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c", // team around a shared table
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf", // partners high-fiving at a meeting
  "https://images.unsplash.com/photo-1552664730-d307ca884978", // team planning at a whiteboard
];

const img = (url: string) => `${url}?auto=format&fit=crop&w=1200&q=80`;

/** Partnership: copy beside a fanned 3D stack of photos that cycles. */
export function Collaboration() {
  const t = useT();
  const c = t.collab;
  const n = c.slides.length;
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFront((f) => (f + 1) % n), 4200);
    return () => window.clearInterval(id);
  }, [paused, n]);

  return (
    <section className="section" id="collaboration">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{c.kicker}</p>
          <h2>{c.title}</h2>
          <p className="section-sub collab-lead">{c.lead}</p>
        </header>

        <div className="collab-grid">
          <div
            className="photo-stack reveal"
            data-reveal="zoom"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            role="group"
            aria-roledescription="carousel"
            aria-label={c.title}
          >
            <div className="photo-stack-scene">
              {c.slides.map((s, i) => {
                const depth = (i - front + n) % n; // 0 = front card
                return (
                  <figure
                    className="photo-card"
                    key={i}
                    style={{ ["--d" as string]: depth, zIndex: n - depth }}
                    aria-hidden={depth !== 0}
                    onClick={() => depth !== 0 && setFront(i)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(IMAGES[i % IMAGES.length])} alt={s.alt} loading="lazy" decoding="async" />
                    <figcaption>{s.caption}</figcaption>
                  </figure>
                );
              })}
            </div>
            <div className="photo-stack-nav">
              <button type="button" aria-label="Previous photo" onClick={() => setFront((f) => (f - 1 + n) % n)}>
                <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M12 4l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="photo-stack-count">
                {front + 1} / {n}
              </span>
              <button type="button" aria-label="Next photo" onClick={() => setFront((f) => (f + 1) % n)}>
                <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M8 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="collab-copy reveal">
            {c.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="collab-notech">{c.noTech}</p>
            <p className="collab-revenue">{c.revenue}</p>
            <p className="collab-meeting">{c.meetingNote}</p>
            <p className="collab-closing">{c.closing}</p>
            <a className="btn btn-primary" href="#contact">
              {c.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h9M8 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
