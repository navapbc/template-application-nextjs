/**
 * @file Shared i18n configuration for use across the server and client
 */
import type { getRequestConfig } from "next-intl/server";

type RequestConfig = Awaited<
  ReturnType<Parameters<typeof getRequestConfig>[0]>
>;

/**
 * List of languages supported by the application. Other tools (Storybook, tests) reference this.
 * These must be BCP47 language tags: https://en.wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags
 */
export const locales = ["en-US", "es-US"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en-US";

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
