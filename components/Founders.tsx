"use client";

import { useT } from "./LanguageProvider";

export function Founders() {
  const t = useT();
  const f = t.founders;

  return (
    <section className="section" id="team">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{f.kicker}</p>
          <h2>{f.title}</h2>
          <p className="section-sub">{f.sub}</p>
        </header>

        <div className="founders-grid">
          {f.people.map((p) => (
            <article className="founder-card tilt reveal" key={p.initials}>
              <div className="founder-portrait" aria-hidden="true">
                <span className="founder-initials">{p.initials}</span>
              </div>
              <div className="founder-body">
                <h3>{p.name}</h3>
                <p className="founder-role">{p.role}</p>
                <p className="founder-bio">{p.bio}</p>
                <ul className="founder-exp">
                  {p.experience.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="founders-cta reveal">
          <a className="btn btn-primary" href="#contact">
            {t.nav.contact}
          </a>
        </div>
      </div>
    </section>
  );
}
