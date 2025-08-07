# Use Next.js for application framework

* Status: draft
* Deciders: Loren Yu, Sawyer Hollenshead, Sammy Steiner, Ali Glenesk
* Date: 2023-07-14

Technical Story: Add an ADR about why Next.js was selected: [ticket #166](https://github.com/navapbc/template-application-nextjs/issues/166)

## Context and Problem Statement

There are many React frameworks for full-stack and front-end TypeScript/JavaScript applications. This ADR reviews several options and the pros and cons of each for the template repo.

## Decision Drivers

### Must Haves
- Active Maintenance: The web framework is actively maintained with patches and minor releases delivered on a regular basis
- Community of Users: The web framework has an active community of open-source users and the framework is commonly used for front-end development
- Usability: The framework is relatively easy to learn for developers without prior experience in the particular framework, and there are plenty of resources and training materials available
- Static Site Generation: The framework can generate static pages (HTML/CSS + JavaScript) at build time that can be cached in a CDN for faster loading
- Server-Side Rendering: The framework can render some pages server-side with every request to get up-to-date information when the page loads
- Client-side Rendering: The framework also supports rendering or modifying content client-side based on user interaction with the page (e.g. filtering, searching, etc.)

### Nice to Have
- AuthN/AuthZ: The framework supports Authentication & Authorization routing natively or there are established extensions that provide this functionality
- Internationalization (i18n): The framework supports localized routing for different languages natively or there are established extensions that provide this functionality
- Middleware: The framework supports other types of middleware (i.e. functions or scripts that execute before a routing request is complete)

## Options Considered

- Create React App
- Next.js
- Vue.js or Nuxt.js
- Svelte or Sveltekit

## Decision Outcome

Chosen option: Next.js, because this option meets all our technical requirements, has a large community of support, is easy to learn with good documentation, and is well understood by Nava engineers.

### Positive Consequences

- Aligning on Next.js for our template repo will help teams collaborate and share work

### Negative Consequences

- We'll need to modularize our code so that if Next.js ever loses support, we can swap it out
- While each project will determine if Next.js is a good choice, we may end up using it for projects that aren't a good fit

## Pros and Cons of the Options

### Create React App

Create React App is a lightweight, client-side, single-page application framework for React, maintained by Facebook. While it is one of the most widely adopted React frameworks, it seems like Facebook has either stopped or will stop supporting it in the near future, as it has been [removed as a suggested framework from the React website](https://github.com/reactjs/react.dev/pull/5487).

- **Pros**
  - One of the earliest react frameworks
  - Widely used and understood
- **Cons**
  - [Received only 3 commits in the past year](https://github.com/facebook/create-react-app/commits/main), raising concerns over continued support
  - [No longer recommended by React](https://github.com/reactjs/react.dev/pull/5487)

### Next.js

Next.js is a popular full-stack framework for static and server‑rendered applications built with React and can [prerender pages it determines are static automagically](https://nextjs.org/docs/pages/building-your-application/rendering/automatic-static-optimization) alongside server-rendered routes to improve performance. It includes styling and routing solutions out of the box, is optimized for performance and SEO, and provides great developer documentation and support.

Next.js is maintained by Vercel, a PaaS for front-end hosting company.

- **Pros**
  - Popular framework with dedicated support
  - Supports static site generation, server-side rendering, and client-side rendering
  - Easy to learn and use with good documentation
  - [Strong Storybook support](https://storybook.js.org/recipes/next)
  - Often one of the first to adopt new React features (e.g. Server Components, Suspense) due to their close collaboration with the React team.
  - Supports [internationalized routing](https://nextjs.org/docs/pages/building-your-application/routing/internationalization), [middleware](https://nextjs.org/docs/app/api-reference/file-conventions/middleware), and there are [community-maintained auth libraries](https://next-auth.js.org/).
- **Cons**
  - Very opinionated with routing which can significantly increase code complexity for non-standard routes

### Vue.js or Nuxt.js

Vue.js is an open-source, JavaScript framework for building progressive user interfaces that also supports server-side rendering. It was created by Evan You in 2014 and has grown in popularity, thanks to its reactive data binding and component-based architecture. Nuxt.js provides a set of conventions and tools for building Vue.js applications, including automatic code splitting, prefetching, and caching.

- **Pros**
  - Static site generation is easy out of the box
  - Code splitting helps reduce package sizes and makes caching easier
- **Cons**
  - Small community of support
  - Scalability

### Svelte or Sveltekit

Svelte is a JavaScript, front-end compiler that turns declarative and easy-to-understand JavaScript code into highly efficient JavaScript code optimized for the browser. In contrast to the React framework, SvelteKit, uses a "compiler-first" approach to add server-side rendering capabilities to Svelte, eliminating the need for a virtual DOM, improving performance, and reducing bundle size.

- **Pros**
  - Fast, performant, and very scalable
  - Not opinionated and very flexible
- **Cons**
  - Relatively new framework, with fewer resources and plugins than React
  - Steeper learning curve, since many JavaScript developers are familiar with React
  - Small community
  - Limited documentation

## Links

- [React removing create react app from its recommendations](https://github.com/reactjs/react.dev/pull/5487)
