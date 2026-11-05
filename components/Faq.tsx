"use client";

import { useState } from "react";
import { useLang, useT } from "./LanguageProvider";
import { faqItems } from "@/lib/faq";

export function Faq() {
  const t = useT();
  const { locale } = useLang();
  const items = faqItems[locale];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section faq" id="faq">
      <div className="wrap faq-layout">
        <header className="section-head faq-head reveal">
          <p className="section-kicker">{t.faqHead.kicker}</p>
          <h2>{t.faqHead.title}</h2>
          <p className="section-sub">{t.faqHead.sub}</p>
          <a className="btn btn-ghost" href="#contact">
            {t.nav.contact}
          </a>
        </header>

        <div className="faq-list reveal">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={i}>
                <h3 className="faq-q">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <svg className="faq-icon" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                      <path d="M9 4v10M4 9h10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="faq-a"
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
