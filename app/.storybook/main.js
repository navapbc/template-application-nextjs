/**
 * @file Storybook's main configuration file that controls the generation of Storybook.
 * Handles things like config for location of story files and managing presets (which configure webpack and babel).
 * @see https://storybook.js.org/docs/configurations/default-config/
 */
// @ts-check
const nextConfig = require("../next.config");

const BASE_PATH = process.env.BASE_PATH ?? "";

/**
 * @type {import("@storybook/core-common").StorybookConfig}
 */
const config = {
  stories: ["../stories/**/*.stories.@(mdx|js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "storybook-react-i18next"],
  framework: "@storybook/react",
  core: {
    builder: {
      name: "webpack5",
      options: {
        // Cache build output between runs, to speed up subsequent startup times
        fsCache: true,
        // Applies in development mode. Storybook will start up faster, at the cost
        // of slightly slower browsing time when you navigate to another story.
        lazyCompilation: true,
      },
    },
    disableTelemetry: true,
  },
  // Tell storybook where to find USWDS static assets
  staticDirs: ["../public"],
  // Support deploying Storybook to a subdirectory (like GitHub Pages).
  // This makes `process.env.BASE_PATH` available to our source code.
  // @ts-expect-error - https://github.com/storybookjs/storybook/issues/19294
  env: (config) => ({
    ...config,
    BASE_PATH,
  }),
  // Configure Storybook's final Webpack configuration in order to re-use the Next.js config/dependencies.
  webpackFinal: (config) => {
    config.module?.rules?.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        { loader: "css-loader", options: { url: false } }, // this mirrors next.js behavior
        {
          loader: "string-replace-loader",
          options: {
            // Support deploying Storybook to a subdirectory (like GitHub Pages).
            // This adds the BASE_PATH to the beginning of all relative URLs in the CSS.
            // It handles relative urls, whether they are quoted or not.
            search: /url\(("?)\//g,
            replace(match, p1, offset, string) {
              return `url(${p1}${BASE_PATH}/`;
            },
          },
        },
        {
          /**
           * Next.js sets this automatically for us, but we need to manually set it here for Storybook.
           * The main thing this enables is autoprefixer, so any experimental CSS properties work.
           */
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: ["postcss-preset-env"],
            },
          },
        },
        {
          loader: "sass-loader",
          options: {
            sassOptions: nextConfig.sassOptions,
          },
        },
      ],
      exclude: /node_modules/,
    });

    // Required for i18next.
    config.resolve = config.resolve ?? {};
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };

    // Support deploying Storybook to a subdirectory (like GitHub Pages).
    // This makes the Storybook JS bundles load correctly.
    if (BASE_PATH) {
      config.output = config.output ?? {};
      config.output.publicPath = `${BASE_PATH}/`;
    }

    return config;
  },
};

module.exports = config;
