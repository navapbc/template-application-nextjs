import { DefaultSession, Profile } from "next-auth/types";

/**
 * Extend the Session type to include any custom properties that are
 * added as part of the session callback in auth.ts.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    sub: Profile["sub"];
  }
}
