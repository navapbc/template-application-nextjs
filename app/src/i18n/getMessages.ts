import { merge } from "lodash";
import { defaultLocale, Locale } from "src/i18n/config";

import { messages as enUs } from "./messages/en-US";
import { messages as esUs } from "./messages/es-US";

const localeToMessages = {
  "en-US": enUs,
  "es-US": esUs,
};

/**
 * Get all messages for the given locale. If any translations are missing
 * from the current locale, the missing key will fallback to the default locale
 */
export function getMessages(requestedLocale: string = defaultLocale) {
  if (requestedLocale in localeToMessages === false) {
    console.error(
      "Unsupported locale was requested. Falling back to the default locale.",
      { locale: requestedLocale, defaultLocale }
    );
    requestedLocale = defaultLocale;
  }

  const targetLocale = requestedLocale as Locale;
  let messages = localeToMessages[targetLocale];

  if (targetLocale !== defaultLocale) {
    const fallbackMessages = localeToMessages[defaultLocale];
    messages = merge({}, fallbackMessages, messages);
  }

  return messages as Messages;
}
