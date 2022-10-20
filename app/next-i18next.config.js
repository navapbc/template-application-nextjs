module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
  // Locale resources are loaded once when the server is started, which
  // is good for production but not ideal for local development. Show
  // updates to locale files without having to restart the server:
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
