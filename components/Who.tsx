"use client";

import { siteConfig } from "@/lib/site";
import { useT } from "./LanguageProvider";

/**
 * Who the programme is for — and, just as importantly, who it is not for.
 * The negative list is deliberate: it is the cheapest credibility signal
 * available and it filters out the wrong applicants before they write in.
 */
export function Who() {
  const t = useT();
  const w = t.who;

  return (
    <section className="section section-alt who" id="who">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{w.kicker}</p>
          <h2>{w.title}</h2>
          <p className="section-sub">{w.sub}</p>
        </header>

        <div className="who-grid">
          <figure className="who-figure reveal" data-reveal="zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.images.crowd}
              alt={w.imgAlt}
              loading="lazy"
              decoding="async"
              width={700}
              height={545}
            />
          </figure>

          <div className="who-lists">
            <div className="who-list who-list--yes reveal">
              <h3>
                <span className="who-mark who-mark--yes" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path
                      d="M2 7.5l3.5 3.5L12 3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {w.forTitle}
              </h3>
              <ul>
                {w.forItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="who-list who-list--no reveal">
              <h3>
                <span className="who-mark who-mark--no" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path
                      d="M3.5 3.5l7 7M10.5 3.5l-7 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {w.notTitle}
              </h3>
              <ul>
                {w.notItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
