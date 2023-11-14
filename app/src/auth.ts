/**
 * @file next-auth configuration for use on the server only
 */
import NextAuth from "next-auth";
import Cognito from "next-auth/providers/cognito";

// TODO: Figure out how to get the user ID to be included in the session returned by auth()
// TODO: Determine anything the template should do for refreshing tokens
// TODO: Determine anything the template should do for logging out: https://github.com/nextauthjs/next-auth/discussions/3938

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  // TODO: Comment this out
  debug: true,
  callbacks: {},
  providers: [
    Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
});
