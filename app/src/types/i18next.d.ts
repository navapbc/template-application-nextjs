/**
 * @file Type-safe internationalization. See the internationalization.md
 * doc file for more information.
 */
import "i18next";

import common from "public/locales/en/common.json";

import i18nConfig from "next-i18next.config";

declare module "i18next" {
  interface CustomTypeOptions {
    /**
     * Include each English namespace file below, in order for
     * i18next to know that its keys are available for use in the app.
     *
     * This could be generated if you want to include an additional
     * dependency: https://github.com/i18next/i18next-resources-for-ts
     */
    resources: {
      common: typeof common;
    };
    defaultNS: i18nConfig.defaultNS;
  }
}
