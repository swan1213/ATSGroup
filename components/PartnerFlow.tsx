"use client";

import { useT } from "./LanguageProvider";

/** How we partner: Align → Trust → Share, as three connected 3D steps. */
export function PartnerFlow() {
  const t = useT();
  const p = t.partner;

  return (
    <section className="section section-alt partner" id="partner">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{p.kicker}</p>
          <h2>{p.title}</h2>
          <p className="section-sub">{p.sub}</p>
        </header>

        <div className="partner-flow">
          <div className="partner-line" aria-hidden="true" />
          {p.steps.map((s, i) => (
            <article className="partner-step tilt reveal" data-reveal="zoom" key={s.word}>
              <div className="partner-orb" aria-hidden="true">
                <span className="partner-letter">{s.letter}</span>
              </div>
              <span className="partner-no">0{i + 1}</span>
              <h3>{s.word}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>

        <p className="partner-motto reveal">
          <span className="text-gold">{p.motto}</span>
        </p>
      </div>
    </section>
  );
}
