"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

/**
 * The four-step process as a vertical timeline. The connecting rail draws
 * itself as the section scrolls; each step rises in behind it.
 */
export function How() {
  const t = useT();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rail = el.querySelector(".how-rail");
      if (!rail) return;
      gsap.fromTo(
        rail,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "50% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: el.querySelector(".how-steps"),
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="section how" id="how" ref={root}>
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{t.how.kicker}</p>
          <h2>{t.how.title}</h2>
          <p className="section-sub">{t.how.sub}</p>
        </header>

        <ol className="how-steps">
          <div className="how-rail" aria-hidden="true" />
          {t.how.steps.map((step) => (
            <li className="how-step reveal" key={step.no}>
              <div className="how-marker" aria-hidden="true">
                <span>{step.no}</span>
              </div>
              <div className="how-card tilt">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
