import { merge } from "lodash";

import { getRequestConfig } from "next-intl/server";

import { messages as enUs } from "./messages/en-US";
import { messages as esUs } from "./messages/es-US";

type RequestConfig = Awaited<
  ReturnType<Parameters<typeof getRequestConfig>[0]>
>;
export type Messages = RequestConfig["messages"];

/**
 * All messages for the application for each locale.
 * Don't export this object!! Use `getLocaleMessages` instead,
 * which handles fallbacks to the default locale when a locale
 * is missing a translation.
 */
const _messages: { [locale: string]: Messages } = {
  "en-US": enUs,
  "es-US": esUs,
};

/**
 * List of languages supported by the application. Other tools (Storybook, tests) reference this.
 * These must be BCP47 language tags: https://en.wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags
 */
export const locales = ["en-US", "es-US"];
export type SupportedLocale = (typeof locales)[number];
export const defaultLocale: SupportedLocale = "en-US";

/**
 * Define the default formatting for date, time, and numbers.
 * @see https://next-intl-docs.vercel.app/docs/usage/configuration#formats
 */
export const formats: RequestConfig["formats"] = {
  number: {
    currency: {
      currency: "USD",
    },
  },
};

/**
 * Get the entire locale messages object for the given locale. If any
 * translations are missing from the current locale, the missing key will
 * fallback to the default locale
 */
export function getLocaleMessages(locale: string = defaultLocale): Messages {
  let messages = _messages[locale];

  if (locale !== defaultLocale) {
    const fallbackMessages = _messages[defaultLocale];
    messages = merge({}, fallbackMessages, messages);
  }

  return messages;
}

/**
 * The next-intl config. This method is used behind the scenes by `next-intl/plugin`
 * when its called in next.config.js.
 */
export default getRequestConfig(({ locale }) => {
  return {
    formats,
    messages: getLocaleMessages(locale),
  };
});
