// @ts-check
// Apply global styling to our stories
import "../src/styles/styles.scss";

const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
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
