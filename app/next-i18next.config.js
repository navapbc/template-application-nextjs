// @ts-check
const fs = require("fs");
const path = require("path");

const defaultLocale = "en";

/**
 * Next.js i18n routing options
 * https://nextjs.org/docs/advanced-features/i18n-routing
 * @type {import('next').NextConfig['i18n']}
 */
const i18n = {
  defaultLocale,
  // Source of truth for the list of languages supported by the application. Other tools (i18next, Storybook, tests) reference this.
  // These must be BCP47 language tags: https://en.wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags
  locales: ["en", "es"],
};

function getNamespaces() {
  if (typeof fs === "undefined" || typeof fs.readdirSync === "undefined") {
    console.log(
      "No fs module available, which means next-i18next.config is being referenced from a client-side bundle. Returning an empty list of namespaces, which should be fine since this list is only necessary for preloading locales on the server."
    );
    return [];
  }

  const namespaces = fs
    .readdirSync(path.resolve(__dirname, `public/locales/${defaultLocale}`))
    .map((file) => file.replace(/\.json$/, ""));
  return namespaces;
}

/**
 * i18next and react-i18next options
 * https://www.i18next.com/overview/configuration-options
 * https://react.i18next.com/latest/i18next-instance
 * @type {import("i18next").InitOptions}
 */
const i18next = {
  ns: getNamespaces(), // Namespaces to preload on the server
  defaultNS: "common",
  fallbackLng: i18n.defaultLocale,
  interpolation: {
    escapeValue: false, // React already does escaping
  },
};

/**
 * next-i18next options
 * https://github.com/i18next/next-i18next#options
 * @type {Partial<import("next-i18next").UserConfig>}
 */
const nextI18next = {
  // Locale resources are loaded once when the server is started, which
  // is good for production but not ideal for local development. Show
  // updates to locale files without having to restart the server:
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

/**
 * @type {import("next-i18next").UserConfig}
 */
module.exports = {
  i18n,
  ...i18next,
  ...nextI18next,
};
