"use client";

import { siteConfig } from "@/lib/site";
import { useT } from "./LanguageProvider";

/**
 * The three-part offer: we bring / you bring / we share.
 * Each card is fronted by one of the character crops — tiger, eagle, handshake.
 */
const ART = [siteConfig.images.tiger, siteConfig.images.eagle, siteConfig.images.shake] as const;

export function Deal() {
  const t = useT();
  const d = t.deal;

  return (
    <section className="section deal" id="offer">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{d.kicker}</p>
          <h2>{d.title}</h2>
          <p className="section-sub">{d.sub}</p>
        </header>

        <div className="deal-grid">
          {d.items.map((item, i) => (
            <article className="deal-card tilt reveal" data-reveal="flip" key={item.title}>
              <div className="deal-art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ART[i]} alt={item.alt} loading="lazy" decoding="async" width={480} height={480} />
                <span className="deal-step" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <div className="deal-body">
                <p className="deal-role">{item.role}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
