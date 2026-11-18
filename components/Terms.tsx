"use client";

import { siteConfig } from "@/lib/site";
import { useT } from "./LanguageProvider";

/**
 * The trust section: the four questions a partner offer has to answer
 * before it deserves to be taken seriously, answered up front — plus an
 * explicit note that nothing here involves paying us or moving money.
 */
export function Terms() {
  const t = useT();
  const tm = t.terms;

  return (
    <section className="section terms" id="terms">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{tm.kicker}</p>
          <h2>{tm.title}</h2>
          <p className="section-sub">{tm.sub}</p>
        </header>

        <figure className="terms-banner reveal" data-reveal="zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.images.duo}
            alt={tm.imgAlt}
            loading="lazy"
            decoding="async"
            width={1150}
            height={425}
          />
        </figure>

        <div className="terms-grid">
          {tm.rows.map((row) => (
            <article className="terms-card tilt reveal" key={row.title}>
              <span className="terms-shield" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path
                    d="M12 2.6l7.2 2.9v6.1c0 4.4-3 8.2-7.2 9.8-4.2-1.6-7.2-5.4-7.2-9.8V5.5z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.4 12.2l2.6 2.6 4.6-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3>{row.title}</h3>
              <p>{row.body}</p>
            </article>
          ))}
        </div>

        <aside className="terms-note reveal" role="note">
          <span className="terms-note-mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 7.4v5.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16.4" r="1.15" fill="currentColor" />
            </svg>
          </span>
          <p>{tm.note}</p>
        </aside>
      </div>
    </section>
  );
}
