import { merge } from "lodash";

import { getRequestConfig } from "next-intl/server";

import { formats } from "./formats";

type RequestConfig = Awaited<
  ReturnType<Parameters<typeof getRequestConfig>[0]>
>;

/**
 * List of languages supported by the application. Other tools (Storybook, tests) reference this.
 * These must be BCP47 language tags: https://en.wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags
 */
export const locales = ["en-US", "es-US"] as const;
export type SupportedLocale = (typeof locales)[number];
export const defaultLocale: SupportedLocale = "en-US";

/**
 * Get the entire locale messages object for the given locale. If any
 * translations are missing from the current locale, the missing key will
 * fallback to the default locale
 */
async function getLocaleMessages(locale: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let { messages } = await import(`./messages/${locale}`);

  if (locale !== defaultLocale) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { messages: fallbackMessages } = await import(
      `./messages/${defaultLocale}`
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    messages = merge({}, fallbackMessages, messages);
  }

  return messages as RequestConfig["messages"];
}

/**
 * The next-intl config. This method is used behind the scenes by `next-intl/plugin`
 * when its called in next.config.js.
 */
export default getRequestConfig(async ({ locale }) => {
  return {
    formats,
    messages: await getLocaleMessages(locale),
  };
});
