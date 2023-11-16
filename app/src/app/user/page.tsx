import { auth } from "src/auth";

import Link from "next/link";

export default async function Page() {
  const session = await auth();

  if (session) {
    return (
      <>
        <p>
          <Link href="/api/auth/signout">Sign out</Link>
        </p>
        <strong>User ID: {session.sub}</strong>
        <code>{JSON.stringify(session, null, 2)}</code>
      </>
    );
  }

  return <Link href="/api/auth/signin">Sign in</Link>;
}
