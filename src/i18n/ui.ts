import { nav as navEn } from "./locales/en/nav";
import { hero as heroEn } from "./locales/en/hero";
import { twoLives as twoLivesEn } from "./locales/en/twoLives";
import { devices as devicesEn } from "./locales/en/devices";
import { media as mediaEn } from "./locales/en/media";
import { testimonials as testimonialsEn } from "./locales/en/testimonials";
import { team as teamEn } from "./locales/en/team";
import { plans as plansEn } from "./locales/en/plans";
import { download as downloadEn } from "./locales/en/download";
import { faq as faqEn } from "./locales/en/faq";
import { footer as footerEn } from "./locales/en/footer";
import { legal as legalEn } from "./locales/en/legal";
import { nav as navEs } from "./locales/es/nav";
import { hero as heroEs } from "./locales/es/hero";
import { twoLives as twoLivesEs } from "./locales/es/twoLives";
import { devices as devicesEs } from "./locales/es/devices";
import { media as mediaEs } from "./locales/es/media";
import { testimonials as testimonialsEs } from "./locales/es/testimonials";
import { team as teamEs } from "./locales/es/team";
import { plans as plansEs } from "./locales/es/plans";
import { download as downloadEs } from "./locales/es/download";
import { faq as faqEs } from "./locales/es/faq";
import { footer as footerEs } from "./locales/es/footer";
import { legal as legalEs } from "./locales/es/legal";

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
  en: {
    ...navEn,
    ...heroEn,
    ...twoLivesEn,
    ...devicesEn,
    ...mediaEn,
    ...testimonialsEn,
    ...teamEn,
    ...plansEn,
    ...downloadEn,
    ...faqEn,
    ...footerEn,
    ...legalEn,
  },
  es: {
    ...navEs,
    ...heroEs,
    ...twoLivesEs,
    ...devicesEs,
    ...mediaEs,
    ...testimonialsEs,
    ...teamEs,
    ...plansEs,
    ...downloadEs,
    ...faqEs,
    ...footerEs,
    ...legalEs,
  },
} as const;

/** Union of all valid translation keys*/
export type UIKey = keyof (typeof ui)[typeof defaultLang];
