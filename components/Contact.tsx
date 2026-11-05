"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { Calendly } from "./Calendly";
import { useT } from "./LanguageProvider";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const t = useT();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — bots fill this hidden field; humans never see it.
    if (data.company_website) return;

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || c.errorGeneric);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : c.errorGeneric);
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{c.kicker}</p>
          <h2>{c.title}</h2>
          <p className="section-sub">{c.sub}</p>
        </header>

        <div className="contact-layout">
          {/* ---- Left: message form ---- */}
          <div className="contact-card reveal">
            <h3 className="contact-card-title">{c.formTitle}</h3>
            <p className="contact-card-sub">{c.formSub}</p>

            {status === "success" ? (
              <div className="form-success" role="status">
                <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
                  <circle cx="22" cy="22" r="21" fill="none" stroke="#f5b942" strokeWidth="2" />
                  <path d="M14 22.5l5.5 5.5L31 16" fill="none" stroke="#f5b942" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h4>{c.successTitle}</h4>
                <p>{c.successBody}</p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setStatus("idle")}
                >
                  {c.sendAnother}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="name">{c.name}</label>
                    <input id="name" name="name" type="text" required autoComplete="name" placeholder={c.namePh} />
                  </div>
                  <div className="field">
                    <label htmlFor="email">{c.email}</label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder={c.emailPh} />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="companyName">{c.company}</label>
                    <input id="companyName" name="companyName" type="text" autoComplete="organization" placeholder={c.companyPh} />
                  </div>
                  <div className="field">
                    <label htmlFor="service">{c.help}</label>
                    <select id="service" name="service" defaultValue="">
                      <option value="" disabled>{c.helpPh}</option>
                      {c.services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="message">{c.message}</label>
                  <textarea id="message" name="message" rows={5} required placeholder={c.messagePh} />
                </div>

                {/* Honeypot (hidden from humans) */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hp-field"
                />

                {status === "error" && (
                  <p className="form-error" role="alert">{error}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? c.submitting : c.submit}
                  {status !== "submitting" && (
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8h9M8 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                <p className="form-fineprint">{c.fineprint}</p>
              </form>
            )}

            <ul className="contact-points">
              {c.points.map((p) => (
                <li key={p.label}>
                  <span className="cp-label">{p.label}</span>
                  <span className="cp-value">{p.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Right: booking ---- */}
          <div className="contact-card contact-card--booking reveal">
            <h3 className="contact-card-title">{c.bookingTitle}</h3>
            <p className="contact-card-sub">{c.bookingSub}</p>
            <div className="contact-panel">
              <Calendly />
            </div>
            <p className="contact-fallback">
              {c.fallback}
              <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer">
                {c.fallbackLink}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
