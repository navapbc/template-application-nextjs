import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// Configure i18next for storybook addon storybook-react-i18next
// See https://storybook.js.org/addons/storybook-react-i18next
import i18n from "i18next";
import i18nConfig from "../i18n.config";
import { initReactI18next } from "react-i18next";

const ns = ["common"];
const locales = i18nConfig.i18n.locales;
const resources = ns.reduce((acc, n) => {
  locales.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {};
    acc[lng] = {
      ...acc[lng],
      [n]: require(`../public/locales/${lng}/${n}.json`),
    };
  });
  return acc;
}, {});

i18n.use(initReactI18next).use(LanguageDetector).use(Backend).init({
  lng: i18nConfig.i18n.defaultLocale,
  fallbackLng: i18nConfig.fallbackLng,
  defaultNS: i18nConfig.defaultNS,
  ns,
  supportedLngs: locales,
  resources,
});

export default i18n;
