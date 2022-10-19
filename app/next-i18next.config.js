module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    react: {
      // Add support for <em>.
      // See https://react.i18next.com/latest/trans-component#using-for-less-than-br-greater-than-and-other-simple-html-elements-in-translations-v-10-4-0
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p", "em"],
    },
  },
  // Locale resources are loaded once when the server is started, which
  // is good for production but not ideal for local development. Show
  // updates to locale files without having to restart the server:
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
