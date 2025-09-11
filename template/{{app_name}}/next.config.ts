import createNextIntlPlugin from 'next-intl/plugin';
import sassOptions from "./scripts/sassOptions";
import type { NextConfig } from 'next'

/**
 * Configure the base path for the app. Useful if you're deploying to a subdirectory (like GitHub Pages).
 * If this is defined, you'll need to set the base path anywhere you use relative paths, like in
 * `<a>`, `<img>`, or `<Image>` tags. Next.js handles this for you automatically in `<Link>` tags.
 * @see https://nextjs.org/docs/api-reference/next.config.js/basepath
 * @example "/test" results in "localhost:<your_port_setting>/test" as the index page for the app
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const appSassOptions = sassOptions(basePath);

const nextConfig: NextConfig = {
  basePath,
  reactStrictMode: true,
  // Output only the necessary files for a deployment, excluding irrelevant node_modules
  // https://nextjs.org/docs/app/api-reference/next-config-js/output
  output: "standalone",
  sassOptions: appSassOptions,
  // Continue to support older browsers (ES5)
  transpilePackages: [
    // https://github.com/trussworks/react-uswds/issues/2605
    "@trussworks/react-uswds",
  ],
};

const withNextIntl = createNextIntlPlugin("./src/i18n/server.ts");
export default withNextIntl(nextConfig);
