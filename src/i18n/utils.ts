import { ui, defaultLang, type Lang, type UIKey } from "./ui";
import { getRelativeLocaleUrl } from "astro:i18n";

/**
 * Extracts the current language from a given URL object.
 * Returns defaultLang ('en') if no supported locale prefix is found.
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

/**
 * Returns a translation function `t(key)` for the specified language.
 * Falls back to English if a translation is missing for the given key.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang]?.[key] || ui[defaultLang][key] || (key as string);
  };
}

/**
 * Returns a function to format relative paths for the given language.
 */
export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: Lang = lang): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return getRelativeLocaleUrl(l, normalizedPath);
  };
}

/**
 * Route equivalencies map between languages.
 */
export const routesMap: Record<string, Record<Lang, string>> = {
  "/privacy-policy": {
    en: "/privacy-policy",
    es: "/es/politica-de-privacidad",
  },
  "/es/politica-de-privacidad": {
    en: "/privacy-policy",
    es: "/es/politica-de-privacidad",
  },
  "/terms-and-conditions": {
    en: "/terms-and-conditions",
    es: "/es/terminos-y-condiciones",
  },
  "/es/terminos-y-condiciones": {
    en: "/terms-and-conditions",
    es: "/es/terminos-y-condiciones",
  },
};

/**
 * Returns the equivalent route in targetLang for the current pathname.
 */
export function getEquivalentRoute(pathname: string, targetLang: Lang): string {
  let cleanPath = pathname;
  if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }

  if (routesMap[cleanPath]) {
    return routesMap[cleanPath][targetLang];
  }

  return getRelativeLocaleUrl(targetLang, "");
}

