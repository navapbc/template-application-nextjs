/**
 * @file next-auth setup for use on the server only
 */
import NextAuth, { NextAuthConfig } from "next-auth";
import Cognito from "next-auth/providers/cognito";

const AUTH_PROVIDER = Cognito({
  clientId: process.env.COGNITO_CLIENT_ID,
  clientSecret: process.env.COGNITO_CLIENT_SECRET,
  issuer: process.env.COGNITO_ISSUER,
});

type NextAuthCallbacks = NonNullable<NextAuthConfig["callbacks"]>;

/**
 * The session callback is called whenever a session is checked.
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
    session: handleSession,
  },
  events: {
    // TODO: Try setting up federated logout with Cognito
  },
});
