/**
 * @file Type-safe internationalization. See the internationalization.md
 * doc file for more information.
 */
import "i18next";

import i18nConfig from "next-i18next.config";

import resources from "./generated-i18n-bundle";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof resources;
    defaultNS: i18nConfig.defaultNS;
  }
}
