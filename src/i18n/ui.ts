import { en } from "./locales/en/en";
import { es } from "./locales/es/es";

export const languages = {
  en: "English",
  es: "Español",
} as const;

export const languageAbbr = {
  en: "EN",
  es: "ES",
} as const;

export const defaultLang = "en" as const;
export type Lang = keyof typeof languages;
export const ui = {
  en,
  es,
} as const;

/** Union of all valid translation keys*/
export type UIKey = keyof (typeof ui)[typeof defaultLang];
