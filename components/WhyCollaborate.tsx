"use client";

import { useT } from "./LanguageProvider";

export function WhyCollaborate() {
  const t = useT();
  const w = t.why;

  return (
    <section className="section" id="why">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{w.kicker}</p>
          <h2>{w.title}</h2>
          <p className="section-sub">{w.sub}</p>
        </header>

        <div className="why-grid">
          {w.blocks.map((b, i) => (
            <article className={`why-card tilt reveal${i === 0 ? " why-card--lead" : ""}`} key={b.q}>
              <h3>{b.q}</h3>
              <p>{b.a}</p>
              <ul className="why-points">
                {b.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
