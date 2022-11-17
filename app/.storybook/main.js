// @ts-check

/**
 * @file Storybook's main configuration file that controls the generation of Storybook.
 * Handles things like config for location of story files and managing presets (which configure webpack and babel).
 * @see https://storybook.js.org/docs/configurations/default-config/
 */
const nextConfig = require("../next.config");

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

  // Configure Storybook's final Webpack configuration in order to re-use the Next.js config/dependencies.
  webpackFinal: (config) => {
    config.module?.rules?.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        { loader: "css-loader", options: { url: false } }, // this mirrors next.js behavior
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

    return config;
  },
};

module.exports = config;
