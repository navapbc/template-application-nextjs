import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// @ts-expect-error - Config file has to be .js
import i18nConfig from "../next-i18next.config";
import enCommon from "../public/locales/en/common.json";
import esCommon from "../public/locales/es/common.json";

// Setup internationalization for tests so snapshots and queries reference the correct translations
i18n.use(initReactI18next).init({
  fallbackLng: i18nConfig.i18n.defaultLocale,
  ns: ["common"],
  defaultNS: i18nConfig.defaultNS,
  resources: {
    en: {
      common: enCommon,
    },
    es: { common: esCommon },
  },
});

// Export i18n so tests can manually set the language with:
// i18n.changeLanguage('es')
export default i18n;
