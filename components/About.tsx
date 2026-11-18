"use client";

import { siteConfig } from "@/lib/site";
import { useT } from "./LanguageProvider";

/**
 * Credibility section: who ATS Group actually is, the A-T-S story, and a
 * plain list of what we build — so a prospective partner knows exactly
 * what they would be putting their name behind.
 */
export function About() {
  const t = useT();
  const a = t.about;

  return (
    <section className="section section-alt about" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-copy">
            <header className="section-head reveal">
              <p className="section-kicker">{a.kicker}</p>
              <h2>{a.title}</h2>
            </header>
            {a.paras.map((p, i) => (
              <p className="about-para reveal" key={i}>
                {p}
              </p>
            ))}

            <div className="about-builds reveal">
              <h3>{a.buildTitle}</h3>
              <ul>
                {a.builds.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          <figure className="about-figure reveal" data-reveal="zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.images.board}
              alt={a.imgAlt}
              loading="lazy"
              decoding="async"
              width={730}
              height={560}
            />
          </figure>
        </div>

        <div className="triad">
          {a.triad.map((item) => (
            <article className="triad-card tilt reveal" data-reveal="flip" key={item.letter}>
              <span className="triad-letter" aria-hidden="true">
                {item.letter}
              </span>
              <h3>{item.word}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
