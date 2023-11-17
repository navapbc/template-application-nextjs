/**
 * @file Middleware allows you to run code before a request is completed. Then,
 * based on the incoming request, you can modify the response by rewriting,
 * redirecting, modifying the request or response headers, or responding
 * directly. Middleware runs before cached content and routes are matched.
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
import { NextResponse } from "next/server";

import { auth } from "./auth";

export const config = {
  matcher: [
    /*
     * Run middleware on all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

/**
 * Patterns for which routes authentication is enforced on.
 */
const authenticatedPaths: Array<string | RegExp> = ["/user"];

export default auth((req) => {
  const session = req.auth;
  const path = req.nextUrl.pathname;
  const requiresAuth = authenticatedPaths.some((matcher) =>
    path.match(matcher)
  );

  if (requiresAuth && !session) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
});
