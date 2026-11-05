"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroScroll } from "@/lib/heroScroll";
import { useT } from "./LanguageProvider";
import { CountUp } from "./CountUp";

gsap.registerPlugin(ScrollTrigger);

// three.js is client-only and heavy, so load it after hydration.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export function Hero() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const markReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el.querySelectorAll(".hero-anim"), { autoAlpha: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ---- Intro timeline ------------------------------------------------
      const q = gsap.utils.selector(el);
      // Make containers visible *before* building the .from() tweens, which
      // record the element's current state as their end state.
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
        .from(q(".hero-title .line-inner"), { yPercent: 115, rotation: 3, duration: 1.2, stagger: 0.12 }, "-=0.5")
        .from(q(".lede"), { y: 24, autoAlpha: 0, duration: 0.9 }, "-=0.8")
        .from(q(".hero-actions .btn"), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1, ...noCssTransition }, "-=0.7")
        .from(q(".hero-stats > div"), { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, "-=0.6")
        .from(q(".hero-visual"), { scale: 0.86, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, 0.2)
        .from(q(".hero-chip-wrap"), { scale: 0, autoAlpha: 0, duration: 0.9, ease: "back.out(2.2)", stagger: 0.15 }, 0.9);

      // ---- Scroll: copy parallax + drive the 3D scene --------------------
      gsap.to(q(".hero-copy"), {
        yPercent: -18,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      // labels drift up and away with the rising globe
      gsap.to(q(".hero-chips"), {
        yPercent: -35,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "60% top", scrub: true },
      });
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          heroScroll.progress = self.progress;
        },
      });
    });

    return () => {
      mm.revert();
      heroScroll.progress = 0;
    };
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
            <span className="line"><span className="line-inner">{t.hero.l1}</span></span>
            <span className="line"><span className="line-inner">{t.hero.l2}</span></span>
            <span className="line">
              <span className="line-inner">
                {t.hero.l3a}
                <em>{t.hero.em}</em>
                {t.hero.l3b}
              </span>
            </span>
          </h1>
          <p className="lede hero-anim">{t.hero.lede}</p>
          <div className="hero-actions hero-anim">
            <a className="btn btn-primary" href="#contact">
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
            <a className="btn btn-ghost" href="#skills">
              {t.hero.secondary}
            </a>
          </div>
          <dl className="hero-stats hero-anim">
            {t.hero.stats.map((s, i) => (
              <div key={i}>
                <dt><CountUp value={s.dt} /></dt>
                <dd>{s.dd}</dd>
              </div>
            ))}
          </dl>
        </div>

        <a className="scroll-cue hero-anim" href="#skills" aria-label={t.hero.secondary}>
          <span className="scroll-cue-mouse" aria-hidden="true" />
        </a>

        <div className="hero-visual hero-anim" aria-hidden="true">
          {!sceneReady && <div className="hero-fallback" />}
          <HeroScene onReady={markReady} />
          <div className="hero-chips">
            {t.meaning.items.map((it) => (
              <span className={`hero-chip-wrap hero-chip--${it.num.toLowerCase()}`} key={it.num}>
                <span className="hero-chip">
                  <b>{it.num}</b>
                  {it.word}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
