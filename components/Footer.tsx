"use client";

import { siteConfig } from "@/lib/site";
import { Logo } from "./Logo";
import { useT } from "./LanguageProvider";

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  const links = [
    { href: "#news", label: t.nav.news },
    { href: "#skills", label: t.nav.skills },
    { href: "#why", label: t.nav.why },
    { href: "#collaboration", label: t.nav.collaboration },
    { href: "#team", label: t.nav.team },
    { href: "#company", label: t.nav.company },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cta reveal" data-reveal="zoom">
          <p className="section-kicker">{t.contact.kicker}</p>
          <h2 className="footer-cta-title">{t.contact.title}</h2>
          <a className="btn btn-primary" href="#contact">
            {t.nav.contact}
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9M8 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <Logo size={30} />
            <span className="brand-text">ATS&nbsp;Group</span>
          </a>
          <p>{t.footer.blurb}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {links.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer-meta">
          <p>{t.footer.location}</p>
          <p>
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.schedule}
            </a>
          </p>
        </div>
      </div>

      <div className="wrap footer-base">
        <p>
          © {year} {siteConfig.name}. {t.footer.rights}
        </p>
        <p className="footer-jp">{t.footer.tagline}</p>
      </div>
    </footer>
  );
}
