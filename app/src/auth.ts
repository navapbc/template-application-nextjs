/**
 * @file Auth configuration and exports for accessing the session,
 * API route handlers, and a federated sign out method.
 */
import NextAuth, { NextAuthConfig } from "next-auth";
import Cognito from "next-auth/providers/cognito";
import { signOut } from "next-auth/react";

type NextAuthCallbacks = NonNullable<NextAuthConfig["callbacks"]>;

/**
 * The OAuth provider for authentication.
 * @see https://authjs.dev/reference/core/providers
 */
const AUTH_PROVIDER = Cognito({
  clientId: process.env.COGNITO_CLIENT_ID,
  clientSecret: process.env.COGNITO_CLIENT_SECRET,
  issuer: process.env.COGNITO_ISSUER,
});

/**
 * Not a real page path. It's caught by the redirect callback
 * in order to identify when to redirect the user through a
 * federated sign out flow.
 */
const FEDERATED_SIGN_OUT_CALLBACK_URL = "/federated-sign-out";

/**
 * By default, NextAuth only removes the session from the app,
 * but this doesn't log the user out from the identity provider.
 * Using this method will log the user out from both. See
 * the Auth redirect callback for how that works.
 */
export async function federateSignOut() {
  await signOut({
    callbackUrl: FEDERATED_SIGN_OUT_CALLBACK_URL,
  });
}

/**
 * Called anytime the user is redirected to a callback URL (e.g. on sign in or sign out).
 * The redirect callback may be invoked more than once in the same flow.
 * @see https://authjs.dev/guides/basics/callbacks#redirect-callback
 */
const handleRedirect: NextAuthCallbacks["redirect"] = ({ url, baseUrl }) => {
  if (url === FEDERATED_SIGN_OUT_CALLBACK_URL) {
    const urlParams = new URLSearchParams({
      client_id: process.env.COGNITO_CLIENT_ID as string,
      // Where Cognito will redirect the user after signing them out.
      // This URL needs safelisted in Cognito as an "Allowed sign-out URL".
      // https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html
      logout_uri: baseUrl,
    }).toString();

    return new URL(
      `/logout?${urlParams}`,
      process.env.COGNITO_DOMAIN as string
    ).toString();
  }

  // Allows relative callback URLs
  if (url.startsWith("/")) return `${baseUrl}${url}`;
  // Allows callback URLs on the same origin
  else if (new URL(url).origin === baseUrl) return url;
  return baseUrl;
};

/**
 * Called whenever a session is checked.
 *
 * By default, the "sub" (AKA "User ID") isn't included, but you
 * can expose it by extending the session here.
 *
 * By default, the session is persisted as a JWT cookie, so avoid
 * storing sensitive information if possible.
 */
const handleSession: NextAuthCallbacks["session"] = ({ token, session }) => {
  return {
    ...session,
    // Any custom properties added below should have a corresponding
    // type defined in types/next-auth.d.ts so consuming components
    // don't get a type error when referencing them.
    sub: token.sub,
  };
};

export const {
  /** API route handlers */
  handlers: { GET, POST },
  /** Method for accessing a session */
  auth,
} = NextAuth({
  debug: false,
  providers: [AUTH_PROVIDER],
  callbacks: {
    redirect: handleRedirect,
    session: handleSession,
  },
  pages: {
    signOut: "/auth/signout",
  },
});
