"use client";

import { useT } from "./LanguageProvider";

/** Tech stack as marquee rows that drift in alternating directions. */
export function Stack() {
  const t = useT();
  return (
    <section className="section stack" id="stack">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{t.stack.kicker}</p>
          <h2>{t.stack.title}</h2>
          <p className="section-sub">{t.stack.sub}</p>
        </header>
      </div>

      <div className="stack-rows reveal">
        {t.stack.columns.map((col, r) => (
          <div className={`stack-row${r % 2 ? " stack-row--rev" : ""}`} key={r}>
            <span className="stack-row-label">{col.title}</span>
            <div className="marquee">
              {[0, 1].map((copy) => (
                <ul className="marquee-track" key={copy} aria-hidden={copy === 1 || undefined}>
                  {[...col.items, ...col.items].map((item, i) => (
                    <li className="tech-pill" key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
