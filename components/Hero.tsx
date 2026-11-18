"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/site";
import { useT } from "./LanguageProvider";
import { CountUp } from "./CountUp";

gsap.registerPlugin(ScrollTrigger);

/**
 * Image-led hero: the tiger/eagle handshake carries the message, the copy
 * explains it. The artwork is a plain <img> (already cropped and converted
 * to WebP at build time) so there is no layout shift and no next/image config.
 */
export function Hero() {
  const t = useT();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el.querySelectorAll(".hero-anim"), { autoAlpha: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      gsap.set(q(".hero-anim"), { autoAlpha: 1 });

      // .btn has a CSS transform transition that would smear GSAP's frames
      const noCssTransition = {
        onStart() {
          q(".hero-actions .btn").forEach((b) => b.classList.add("gsap-animating"));
        },
        onComplete() {
          q(".hero-actions .btn").forEach((b) => b.classList.remove("gsap-animating"));
        },
      };

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(q(".eyebrow"), { y: 20, autoAlpha: 0, duration: 0.8 })
        .from(q(".hero-title .line-inner"), { yPercent: 115, rotation: 2, duration: 1.2, stagger: 0.12 }, "-=0.5")
        .from(q(".lede"), { y: 24, autoAlpha: 0, duration: 0.9 }, "-=0.8")
        .from(q(".hero-actions .btn"), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1, ...noCssTransition }, "-=0.7")
        .from(q(".hero-stats > div"), { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, "-=0.6")
        .from(q(".hero-figure"), { scale: 0.92, autoAlpha: 0, duration: 1.4, ease: "expo.out" }, 0.15);

      // gentle parallax as the hero scrolls away
      gsap.to(q(".hero-copy"), {
        yPercent: -14,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q(".hero-figure img"), {
        yPercent: 8,
        scale: 1.06,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-anim">
            <span className="tick" />
            {t.hero.eyebrow}
          </p>

          <h1 className="hero-title hero-anim">
            <span className="line">
              <span className="line-inner">{t.hero.l1}</span>
            </span>
            <span className="line">
              <span className="line-inner text-gold">{t.hero.l2}</span>
            </span>
          </h1>

          <p className="lede hero-anim">{t.hero.lede}</p>

          <div className="hero-actions hero-anim">
            <a className="btn btn-primary" href="#apply">
              {t.hero.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M3 8h9M8 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className="btn btn-ghost" href="#how">
              {t.hero.secondary}
            </a>
          </div>

          <dl className="hero-stats hero-anim">
            {t.hero.stats.map((s, i) => (
              <div key={i}>
                <dt>
                  <CountUp value={s.dt} />
                </dt>
                <dd>{s.dd}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="hero-figure hero-anim">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.images.hero}
            alt={t.hero.imgAlt}
            width={1048}
            height={485}
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </div>

      <a className="scroll-cue hero-anim" href="#offer" aria-label={t.hero.secondary}>
        <span className="scroll-cue-mouse" aria-hidden="true" />
      </a>
    </section>
  );
}
