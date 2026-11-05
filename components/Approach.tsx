"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

/**
 * Approach steps on a pinned horizontal track: on desktop the section pins
 * and scrolling slides the cards sideways, each swinging in 3D as it crosses
 * the centre. Tablets/phones and reduced motion get a plain vertical stack.
 */
export function Approach() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const section = root.current;
    const rail = track.current;
    if (!section || !rail) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 921px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(rail.children);
      const distance = () => rail.scrollWidth - rail.clientWidth + 80;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      tl.to(rail, { x: () => -distance(), ease: "none" }, 0);
      // each card swings from angled → flat → angled as it passes
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { rotationY: -28, z: -160, opacity: 0.45 },
          { rotationY: 0, z: 0, opacity: 1, ease: "power2.out", duration: 0.35 },
          i * 0.22
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="section approach" id="approach" ref={root}>
      <div className="wrap approach-inner">
        <header className="section-head approach-head">
          <p className="section-kicker">{t.approach.kicker}</p>
          <h2>{t.approach.title}</h2>
          <p className="section-sub">
            {t.approach.sub_a}
            <em>{t.approach.sub_em}</em>
            {t.approach.sub_b}
          </p>
        </header>

        <ol className="approach-track" ref={track}>
          {t.approach.steps.map((step, i) => (
            <li className="approach-card" key={i}>
              <span className="approach-no">{step.no}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <span className="approach-index" aria-hidden="true">
                0{i + 1} / 0{t.approach.steps.length}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
