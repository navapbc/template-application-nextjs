/**
 * @file Storybook's main configuration file that controls the generation of Storybook.
 * Handles things like config for location of story files and managing presets (which configure webpack and babel).
 * @see https://storybook.js.org/docs/configurations/default-config/
 */
// @ts-check
// Support deploying to a subdirectory, such as GitHub Pages.
const NEXT_PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * @type {import("@storybook/nextjs").StorybookConfig}
 */
const config = {
  stories: ["../stories/**/*.stories.@(mdx|js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "storybook-react-i18next"],
  framework: {
    name: "@storybook/nextjs",
    options: {
      builder: {
        // Cache build output between runs, to speed up subsequent startup times
        fsCache: true,
        // Applies in development mode. Storybook will start up faster, at the cost
        // of slightly slower browsing time when you navigate to another story.
        lazyCompilation: true,
      },
    },
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ["../public"],
  // Support deploying Storybook to a subdirectory (like GitHub Pages).
  // This makes `process.env.NEXT_PUBLIC_BASE_PATH` available to our source code.
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_BASE_PATH,
  }),
};

export default config;
