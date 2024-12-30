/**
 * Middleware allows you to run code before a request is completed. Then, based on the
 * incoming request, you can modify the response by rewriting, redirecting, modifying
 * the request or response headers, or responding directly.
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { defaultLocale, locales } from "./i18n/config";

// Don't run middleware on API routes or Next.js build output
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

/**
 * Detect the user's preferred language and redirect to a localized route
 * if the preferred language isn't the current locale.
 */
const i18nMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  // Don't prefix the URL with the locale when the locale is the default locale (i.e. "en-US")
  localePrefix: "as-needed",
});

export default function middleware(req: NextRequest) {
  const response = i18nMiddleware(req);
  return response;
}
