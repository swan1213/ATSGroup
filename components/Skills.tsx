"use client";

import { useT } from "./LanguageProvider";

// Real photography (Unsplash CDN), picked for the dark theme.
// Locale-independent, parallel to skills.items.
const IMAGES = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c", // full-stack: code editor on a laptop, dark
  "https://images.unsplash.com/photo-1677442136019-21780ecad995", // AI automation: 3D "AI" over a network
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d", // CMS: evening desk, website on screen
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3", // CRM: analytics dashboard on a laptop
];

const img = (url: string, w: number) => `${url}?auto=format&fit=crop&w=${w}&q=80`;

/** Services as a bento grid: one feature tile plus three supporting tiles. */
export function Skills() {
  const t = useT();

  return (
    <section className="section" id="skills">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="section-kicker">{t.skills.kicker}</p>
          <h2>{t.skills.title}</h2>
          <p className="section-sub">{t.skills.sub}</p>
        </header>

        <div className="bento">
          {t.skills.items.map((s, i) => (
            <article className={`bento-card tilt reveal${i === 0 ? " bento-card--feature" : ""}`} data-reveal="flip" key={s.num}>
              <div className="bento-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(IMAGES[i], i === 0 ? 1400 : 900)} alt={s.alt} loading="lazy" decoding="async" />
              </div>
              <div className="bento-body">
                <span className="bento-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="card-tags">
                  {s.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
