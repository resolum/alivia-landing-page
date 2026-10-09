import type { Lang } from "../../i18n/ui";
import type { LegalDoc } from "./types";
import { privacyDocEs } from "./privacy.es";
import { privacyDocEn } from "./privacy.en";
import { termsDocEs } from "./terms.es";
import { termsDocEn } from "./terms.en";

export function getLegalDoc(docType: "privacy" | "terms", lang: Lang): LegalDoc {
  if (docType === "privacy") {
    return lang === "es" ? privacyDocEs : privacyDocEn;
  }
  return lang === "es" ? termsDocEs : termsDocEn;
}
