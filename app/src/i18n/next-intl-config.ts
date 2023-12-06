import { formats, getLocaleMessages } from "src/i18n";

import { getRequestConfig } from "next-intl/server";

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
