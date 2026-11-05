"use client";

import { useT } from "./LanguageProvider";

/** Company facts as a grid of glass tiles. */
export function Company() {
  const t = useT();
  const co = t.company;

  return (
    <section className="section company" id="company">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{co.kicker}</p>
          <h2>{co.title}</h2>
        </header>

        <dl className="fact-grid">
          {co.rows.map((row, i) => (
            <div className="fact tilt reveal" data-reveal="zoom" key={i}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
