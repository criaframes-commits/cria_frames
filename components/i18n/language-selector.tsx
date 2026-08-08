"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import { SUPPORTED_LANGUAGES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageSelectorProps = {
  mobile?: boolean;
};

export function LanguageSelector({ mobile = false }: LanguageSelectorProps) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = SUPPORTED_LANGUAGES.find((language) => language.locale === locale)!;
  const copy = {
    "pt-BR": { current: "Idioma atual", choose: "Escolher idioma" },
    en: { current: "Current language", choose: "Choose language" },
    es: { current: "Idioma actual", choose: "Elegir idioma" },
    fr: { current: "Langue actuelle", choose: "Choisir la langue" },
  }[locale];

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const selectedIndex = SUPPORTED_LANGUAGES.findIndex(
      (language) => language.locale === locale
    );
    const frame = window.requestAnimationFrame(() => {
      optionRefs.current[selectedIndex]?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [locale, open]);

  const chooseLanguage = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const moveOptionFocus = (index: number, event: React.KeyboardEvent) => {
    const lastIndex = SUPPORTED_LANGUAGES.length - 1;
    let nextIndex = index;
    if (event.key === "ArrowDown") nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === "ArrowUp") nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;
    else return;

    event.preventDefault();
    optionRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      ref={rootRef}
      data-no-translate
      className={cn("relative", mobile && "w-full")}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={`${copy.current}: ${active.label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "group inline-flex min-h-10 items-center justify-center gap-2 rounded-pill border border-border bg-secondary/70 px-3 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-blue-500/55 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          mobile && "w-full min-h-11 justify-between px-4"
        )}
      >
        <span className="inline-flex items-center gap-2">
          <Languages
            aria-hidden="true"
            className="h-4 w-4 text-blue-300 transition-transform duration-300 group-hover:rotate-6"
          />
          <span>{active.short}</span>
          {mobile && (
            <span className="font-normal text-muted-foreground">{active.label}</span>
          )}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        role="listbox"
        aria-label={copy.choose}
        className={cn(
          "absolute right-0 z-[80] mt-2 w-52 origin-top-right overflow-hidden rounded-lg border border-border bg-black-900/96 p-1.5 text-white shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 ease-premium",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-[0.98] opacity-0",
          mobile && "left-0 right-auto w-full"
        )}
      >
        {SUPPORTED_LANGUAGES.map((language) => {
          const selected = language.locale === locale;
          return (
            <button
              ref={(element) => {
                optionRefs.current[
                  SUPPORTED_LANGUAGES.findIndex(
                    (item) => item.locale === language.locale
                  )
                ] = element;
              }}
              key={language.locale}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => chooseLanguage(language.locale)}
              onKeyDown={(event) =>
                moveOptionFocus(
                  SUPPORTED_LANGUAGES.findIndex(
                    (item) => item.locale === language.locale
                  ),
                  event
                )
              }
              className="group/option flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left transition-colors duration-200 hover:bg-white/[0.07] focus-visible:bg-white/[0.07] focus-visible:outline-none"
            >
              <span className="flex items-center gap-3">
                <span className="w-6 text-[10px] font-bold tracking-[0.12em] text-blue-300">
                  {language.short}
                </span>
                <span className="text-sm text-white/82 group-hover/option:text-white">
                  {language.label}
                </span>
              </span>
              <Check
                aria-hidden="true"
                className={cn(
                  "h-4 w-4 text-blue-300 transition-[opacity,transform] duration-200",
                  selected ? "scale-100 opacity-100" : "scale-75 opacity-0"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
