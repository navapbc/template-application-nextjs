import { merge } from "lodash";

import { getRequestConfig } from "next-intl/server";

import { messages as enUs } from "./messages/en-US";
import { messages as esUs } from "./messages/es-US";

type RequestConfig = Awaited<
  ReturnType<Parameters<typeof getRequestConfig>[0]>
>;
export type Messages = RequestConfig["messages"];

/**
 * List of languages supported by the application. Other tools (Storybook, tests) reference this.
 * These must be BCP47 language tags: https://en.wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags
 */
export const locales = ["en-US", "es-US"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en-US";

/**
 * All messages for the application for each locale.
 * Don't export this object!! Use `getLocaleMessages` instead,
 * which handles fallbacks to the default locale when a locale
 * is missing a translation.
 */
const _messages: { [locale in Locale]: Messages } = {
  "en-US": enUs,
  "es-US": esUs,
};

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
export function getLocaleMessages(
  requestedLocale: string = defaultLocale
): Messages {
  if (requestedLocale in _messages === false) {
    console.error(
      "Unsupported locale was requested. Falling back to the default locale.",
      { locale: requestedLocale, defaultLocale }
    );
    requestedLocale = defaultLocale;
  }

  const targetLocale = requestedLocale as Locale;
  let messages = _messages[targetLocale];

  if (targetLocale !== defaultLocale) {
    const fallbackMessages = _messages[defaultLocale];
    messages = merge({}, fallbackMessages, messages);
  }

  return messages;
}
