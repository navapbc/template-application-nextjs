// @ts-check
// Apply global styling to our stories
import "../src/styles/styles.scss";

// Import i18next config.
import i18n from "./i18next.js";

const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // Configure i18next and locale/dropdown options.
  i18n,
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Welcome",
        "Core",
        // Storybook infers the title when not explicitly set, but is case-sensitive
        // so we need to explicitly set both casings here for this to properly sort.
        "Components",
        "components",
        "Templates",
        "Pages",
        "pages",
      ],
    },
  },
};

/**
 * @type {import("@storybook/react").Preview}
 */
const preview = {
  parameters,
  globals: {
    locale: "en-US",
    locales: {
      "en-US": "English",
      "es-US": "Español",
    },
  },
};

export default preview;
