"use client";

import { federateSignOut } from "src/auth";

import { useEffect } from "react";

export default function Page() {
  /**
   * Not super sure why this needs to be called on the client-side, but at the
   * moment the Auth.js signOut method has a dependency on `window`, at a minimum.
   */
  useEffect(() => {
    federateSignOut().catch(console.error);
  }, []);

  return <div>Signing out...</div>;
}
