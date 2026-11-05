"use client";

import { useT } from "./LanguageProvider";

/** Industries as an endless marquee (the list is rendered twice for a seamless loop). */
export function TrustStrip() {
  const t = useT();
  return (
    <section className="strip" aria-label={t.trust.label}>
      <div className="wrap strip-inner">
        <span className="strip-label">{t.trust.label}</span>
        <div className="marquee">
          {[0, 1].map((copy) => (
            <ul className="marquee-track" key={copy} aria-hidden={copy === 1 || undefined}>
              {t.trust.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
