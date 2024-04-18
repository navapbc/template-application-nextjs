# Security

Next.js blurs the line between server and client-side code, which can lead to security vulnerabilities if not properly managed. Read the [Next.js Security tips](https://nextjs.org/docs/app/building-your-application/deploying/production-checklist#security) for tips.

## Server-only code

The app makes available the `server-only` package, which can be imported into a file to ensure that it is only executed on the server.

Developers receive a build-time error if they ever accidentally import one of these modules into a Client Component. This can be useful for files where you want to ensure that the code is only executed on the server, such as when interacting with a database. For example:

```ts
import "server-only";

await db.query("SELECT * FROM users");
```

[More detail here](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment).
