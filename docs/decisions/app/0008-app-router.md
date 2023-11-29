# Use the Next.js App Router instead of Pages Router

- Status: Accepted
- Deciders: Sawyer Hollenshead, Ali Glenesk, Rocket Lee, Loren Yu
- Date: 2023-11-28

## Context and Problem Statement

Beginning in [Next.js version 13](https://nextjs.org/blog/next-13), Next.js now has two different routers:

1. App Router: a newer router that allows you to use React's latest features, such as [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components), [Server-only Forms](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations), and [Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming).
2. Pages Router: the original Next.js router, which continues to be supported for older Next.js applications.

The codebase originally used the older Pages Router since that was all that existed at the time.

The App Router is a paradigm shift for React and comes with a number of notable differences in how data is fetched and mutated, and how code is organized. Although the Pages Router is still supported, all new React features, like server components and server-only forms, are so far only supported when using the App Router.

## Considered Options

- Stick with the Pages Router
- Switch to the App Router

## Decision Outcome

Use the App Router moving forward. As a result, the codebase will also switch from `i18next` to `next-intl` to support locale detection and internationalized routing.

### Positive Consequences

- Projects will be able to take advantage of the latest React features, such as server components and server-only forms.
- As a result, projects will default to server-only rendering, which reduces client-side bundle sizes (improves performance) and can reduce network waterfalls.

### Negative Consequences

- Unlike the Pages Router, the App Router doesn't provide built-in support for locale detection or internationalized routing. The codebase will switch from `i18next` to `next-intl` to support locale detection and internationalized routing, in addition to internationalized content.
- The App Router has a more [complex caching strategy](https://nextjs.org/docs/app/building-your-application/caching) that has a learning curve. The codebase will provide documentation to help mitigate this.

## Links

- [🔒 Nava tech spec detailing a migration from Pages Router to App Router](https://docs.google.com/document/d/1elHojRhDdUUotsEAVCpX0y3igr22rRdZCwNBeUtO9c0/edit)
- [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/)
- [How to Think About Security in Next.js](https://nextjs.org/blog/security-nextjs-server-components-actions)
