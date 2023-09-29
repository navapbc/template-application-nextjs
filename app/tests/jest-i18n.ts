/**
 * @file Setup internationalization for tests so snapshots and queries reference the correct translations
 */
import i18nConfig from "../next-i18next.config";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import resources from "../src/types/generated-i18n-bundle";

i18n
  .use(initReactI18next)
  .init({
    ...i18nConfig,
    resources: { en: resources },
  })
  .catch((err) => {
    throw err;
  });

// Export i18n so tests can manually set the language with:
// i18n.changeLanguage('es')
export default i18n;
