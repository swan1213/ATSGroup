"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { Logo } from "./Logo";
import { useT } from "./LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#skills", label: t.nav.skills },
    { href: "#why", label: t.nav.why },
    { href: "#collaboration", label: t.nav.collaboration },
    { href: "#company", label: t.nav.company },
    { href: "#faq", label: t.nav.faq },
  ];

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const ids = ["skills", "why", "collaboration", "company", "faq"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} id="top">
      <div className="wrap header-inner">
        <a className="brand" href="#top" aria-label={`${siteConfig.name} home`}>
          <Logo size={34} />
          <span className="brand-text">ATS&nbsp;Group</span>
        </a>

        <nav className="nav" aria-label="Primary">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={active === item.href ? "active" : undefined}
              aria-current={active === item.href ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher />
          <a className="nav-cta" href="#contact">
            {t.nav.contact}
          </a>
        </nav>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? " open" : ""}`}
        hidden={!open}
      >
        {links.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          {t.nav.contact}
        </a>
        <div className="mobile-lang">
          <LanguageSwitcher compact />
        </div>
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
