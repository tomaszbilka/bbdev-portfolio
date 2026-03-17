/* eslint-disable import/no-named-as-default-member */
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { LOCALE } from "./constants";
import en from "./locales/en";
import pl from "./locales/pl";

export const defaultNS = "common";

export const resources = {
  en,
  pl,
} as const;

i18n.use(LanguageDetector).use(initReactI18next).init({
  compatibilityJSON: "v3",
  defaultNS,
  fallbackLng: LOCALE.en,
  interpolation: { escapeValue: false },
  resources,
  supportedLngs: [LOCALE.en, LOCALE.pl],
});

export default i18n;
