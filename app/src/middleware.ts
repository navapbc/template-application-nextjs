import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { defaultLocale, locales } from "./i18n";

// Don't run middleware on API routes or Next.js build output
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

const i18nMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  // Don't prefix the URLs when the locale is the default locale
  localePrefix: "as-needed",
});

export default function middleware(req: NextRequest) {
  const response = i18nMiddleware(req);
  return response;
}
