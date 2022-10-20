// Configure i18next for storybook addon storybook-react-i18next
// See https://storybook.js.org/addons/storybook-react-i18next
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import i18nConfig from "../next-i18next.config";

const { i18n: i18nOptions, ...i18nextOptions } = i18nConfig;
const ns = ["common"];

const resources = ns.reduce((acc, n) => {
  i18nOptions.locales.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {};
    acc[lng] = {
      ...acc[lng],
      [n]: require(`../public/locales/${lng}/${n}.json`),
    };
  });
  return acc;
}, {});

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ns,
    resources,
    ...i18nextOptions,
  });

export default i18n;
