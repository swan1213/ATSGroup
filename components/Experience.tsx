"use client";

import { useT } from "./LanguageProvider";

export function Experience() {
  const t = useT();
  const e = t.experience;

  return (
    <section className="section experience" id="experience">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{e.kicker}</p>
          <h2>{e.title}</h2>
          <p className="section-sub">{e.sub}</p>
        </header>

        <div className="exp-grid">
          {e.items.map((item) => (
            <div className="exp-card tilt reveal"
              data-reveal="zoom" key={item.name}>
              <div className="exp-name">{item.name}</div>
              <div className="exp-note">{item.note}</div>
            </div>
          ))}
        </div>

        <p className="exp-handle reveal">{e.handleAll}</p>
      </div>
    </section>
  );
}
