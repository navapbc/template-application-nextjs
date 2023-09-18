/**
 * @file Setup internationalization for tests so snapshots and queries reference the correct translations
 */
import i18nConfig from "../src/types/next-i18next.config";
import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

const locales = i18nConfig.i18n.locales;

/**
 * Load all of the locales into a single object. A server isn't running for our tests,
 * so we can't load these static assets using HTTP requests like in Storybook.
 * https://www.i18next.com/how-to/add-or-load-translations
 */
export const getResources = () => {
  const resources: InitOptions["resources"] = {};

  locales.forEach((locale: string) => {
    resources[locale] = {};

    const namespaces = i18nConfig.ns;

    if (!Array.isArray(namespaces))
      throw new Error(
        "Expected ns property in next-i18n.config.js to be an array."
      );

    namespaces.forEach((namespace: string) => {
      const namespacePath = `../public/locales/${locale}/${namespace}`;
      // eslint-disable-next-line
      resources[locale][namespace] = require(namespacePath);
    });

    return resources;
  });

  return resources;
};

i18n
  .use(initReactI18next)
  .init({
    ...i18nConfig,
    resources: getResources(),
  })
  .catch((err) => {
    throw err;
  });

// Export i18n so tests can manually set the language with:
// i18n.changeLanguage('es')
export default i18n;
