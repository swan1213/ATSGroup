"use client";

import { useLang } from "./LanguageProvider";
import { locales, localeNames } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLang();
  return (
    <div
      className={`lang-switch${compact ? " lang-switch--compact" : ""}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          className={`lang-btn${locale === l ? " active" : ""}`}
          aria-pressed={locale === l}
          onClick={() => setLocale(l)}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  );
}
