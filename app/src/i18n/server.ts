import { getRequestConfig } from "next-intl/server";

import { formats } from "./config";
import { getMessagesWithFallbacks } from "./getMessagesWithFallbacks";

/**
 * I18n config for server components.
 * This method is used behind the scenes by `next-intl/plugin`, which is setup in next.config.js.
 * @see https://next-intl-docs.vercel.app/docs/usage/configuration#nextconfigjs
 */
export default getRequestConfig(async ({ locale }) => {
  return {
    formats,
    messages: await getMessagesWithFallbacks(locale),
  };
});
