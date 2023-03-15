// @ts-check
const { i18n } = require("./next-i18next.config");
const sassOptions = require("./scripts/sassOptions");

/**
 * Configure the base path for the app. Useful if you're deploying to a subdirectory (like GitHub Pages).
 * If this isn't an empty string, you'll need to set the base path anywhere you use relative paths,
 * like in `<a>`, `<img>`, or `<Image>` tags. Next.js handles this for you automatically in `<Link>` tags.
 * @see https://nextjs.org/docs/api-reference/next.config.js/basepath
 */
const basePath = "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  i18n,
  reactStrictMode: true,
  sassOptions: sassOptions(basePath),
};

module.exports = nextConfig;
