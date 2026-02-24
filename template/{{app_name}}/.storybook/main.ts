/**
 * @file Storybook's main configuration file that controls the generation of Storybook.
 * Handles things like config for location of story files and managing presets (which configure webpack and babel).
 * @see https://storybook.js.org/docs/configurations/default-config/
 */
import { dirname } from "node:path";
import * as sass from "sass-embedded";
import type { StorybookConfig } from "@storybook/nextjs-vite";

import { fileURLToPath } from "node:url"
import type { InlineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Support deploying to a subdirectory, such as GitHub Pages.
const NEXT_PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
    "../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
  ],
  addons: ["@storybook/addon-docs"],
  framework: {
    // https://storybook.js.org/docs/get-started/nextjs
    name: "@storybook/nextjs-vite",
    options: {
      // Storybook uses esbuild to resolve TypeScript files targeting the CJS
      // module system, so use `__dirname` instead of `import.meta.dirname`.
      //
      // https://github.com/storybookjs/storybook/blob/50c5b26b67bea71442b59e03cbba718c99acaf8e/code/core/src/common/utils/interpret-require.ts#L13
      nextConfigPath: "../next.config.ts",
    },
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ["../public"],
  // Support deploying Storybook to a subdirectory (like GitHub Pages).
  // This makes `process.env.NEXT_PUBLIC_BASE_PATH` available to our source code.
  env: (config = {}) => ({
    ...config,
    NEXT_PUBLIC_BASE_PATH,
  }),
  viteFinal: (config: InlineConfig) => {
    config.css = {
      ...config.css,
      preprocessorOptions: {
        ...config.css?.preprocessorOptions,
        scss: {
          ...config.css?.preprocessorOptions?.scss,
          loadPaths: [
            "./node_modules/@uswds",
            "./node_modules/@uswds/uswds/packages"
          ],
          functions: {
            "add-base-path($path)": () => new sass.SassString(NEXT_PUBLIC_BASE_PATH)
          }
        }
      }
    }
    return config
  }
};

export default config;
