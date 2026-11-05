"use client";

import { useT } from "./LanguageProvider";

export function Meaning() {
  const t = useT();
  const m = t.meaning;

  return (
    <section className="section meaning" id="meaning">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{m.kicker}</p>
          <h2>{m.title}</h2>
          <p className="section-sub">{m.sub}</p>
        </header>

        <div className="meaning-scene">
          {m.items.map((it, i) => (
            <article
              className="meaning-card tilt reveal"
              data-reveal="flip"
              key={it.word}
              style={{ ["--i" as string]: i }}
            >
              <div className="meaning-card-inner">
                <span className="meaning-ghost" aria-hidden="true">{it.num}</span>
                <span className="meaning-badge">{it.num}</span>
                <h3>{it.word}</h3>
                <p>{it.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="meaning-triads reveal">
          <p className="meaning-triads-label">{m.triadsLabel}</p>
          <div className="triad-rows">
            {m.triads.map((tr) => (
              <div className="triad-row" key={tr.theme}>
                <span className="triad-theme">{tr.theme}</span>
                <span className="triad-words">
                  {tr.words.map((w, i) => (
                    <span className="triad-word" key={w}>
                      <b>{w.charAt(0)}</b>
                      {w.slice(1)}
                      {i < tr.words.length - 1 && <span className="triad-dot">·</span>}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
