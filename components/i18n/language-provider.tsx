"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  isLocale,
  type Locale,
  SUPPORTED_LANGUAGES,
  translateText,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "cria-frames-language";
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const TRANSLATABLE_ATTRIBUTES = ["aria-label", "placeholder", "title"] as const;

function shouldIgnore(node: Node) {
  const parent = node.parentElement;
  return Boolean(
    parent?.closest("[data-no-translate], script, style, noscript, svg")
  );
}

function translateTextNode(node: Text, locale: Locale) {
  if (shouldIgnore(node)) return;
  const source = originalText.get(node) ?? node.data;
  if (!originalText.has(node)) originalText.set(node, source);
  const next = translateText(source, locale);
  if (node.data !== next) node.data = next;
}

function translateElementAttributes(element: Element, locale: Locale) {
  if (element.closest("[data-no-translate]")) return;

  let saved = originalAttributes.get(element);
  if (!saved) {
    saved = new Map<string, string>();
    originalAttributes.set(element, saved);
  }

  for (const attribute of TRANSLATABLE_ATTRIBUTES) {
    const current = element.getAttribute(attribute);
    if (current === null) continue;
    if (!saved.has(attribute)) saved.set(attribute, current);
    const source = saved.get(attribute) ?? current;
    const next = translateText(source, locale);
    if (current !== next) element.setAttribute(attribute, next);
  }
}

function translateSubtree(root: Node, locale: Locale) {
  if (root instanceof Element) translateElementAttributes(root, locale);
  if (root instanceof Text) {
    translateTextNode(root, locale);
    return;
  }

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
  );
  let current = walker.nextNode();
  while (current) {
    if (current instanceof Text) translateTextNode(current, locale);
    else if (current instanceof Element) translateElementAttributes(current, locale);
    current = walker.nextNode();
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt-BR");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!isLocale(saved)) return;
    const frame = window.requestAnimationFrame(() => setLocaleState(saved));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang =
      SUPPORTED_LANGUAGES.find((language) => language.locale === locale)?.lang ??
      "pt-BR";

    const root = document.body;
    let observer: MutationObserver | null = null;

    const applyTranslation = (target: Node = root) => {
      observer?.disconnect();
      translateSubtree(target, locale);
      observer?.observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    };

    observer = new MutationObserver((mutations) => {
      observer?.disconnect();
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          const node = mutation.target as Text;
          const knownSource = originalText.get(node);
          if (knownSource && node.data !== translateText(knownSource, locale)) {
            originalText.set(node, node.data);
          }
          translateTextNode(node, locale);
        } else {
          mutation.addedNodes.forEach((node) => translateSubtree(node, locale));
        }
      }
      observer?.observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    });

    applyTranslation();
    return () => observer?.disconnect();
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    setLocaleState(nextLocale);
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
