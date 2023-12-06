/**
 * @file Setup the toolbar, styling, and global context for each Storybook story.
 * @see https://storybook.js.org/docs/configure#configure-story-rendering
 */
import { Preview } from "@storybook/react";

import "../src/styles/styles.scss";

import { defaultLocale, locales } from "../src/i18n";
import I18nStoryWrapper from "./I18nStoryWrapper";

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

const preview: Preview = {
  decorators: [I18nStoryWrapper],
  parameters,
  globalTypes: {
    locale: {
      description: "Active language",
      defaultValue: defaultLocale,
      toolbar: {
        icon: "globe",
        items: locales,
      },
    },
  },
};

export default preview;
