"use client";

import { federateSignOut } from "src/auth";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    federateSignOut().catch(console.error);
  }, []);

  return <div>Signing out...</div>;
}
