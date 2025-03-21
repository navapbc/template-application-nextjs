/**
 * @file Storybook's main configuration file that controls the generation of Storybook.
 * Handles things like config for location of story files and managing presets (which configure webpack and babel).
 * @see https://storybook.js.org/docs/configurations/default-config/
 */
// @ts-check

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Support deploying to a subdirectory, such as GitHub Pages.
const NEXT_PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * @type {import("@storybook/nextjs").StorybookConfig}
 */
const config = {
  stories: [
    "../stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
  ],
  docs: {
    autodocs: true,
  },
  addons: ["@storybook/addon-essentials"],
  framework: {
    // https://storybook.js.org/docs/get-started/nextjs
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.js"),
      builder: {
        // lazyCompilation breaks Storybook when running from within Docker
        // Google Translate this page for context: https://zenn.dev/yutaosawa/scraps/7764e5f17173d1
        lazyCompilation: false,
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
