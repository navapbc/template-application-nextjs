## Context and Problem Statement

Next.js provides multiple ways of rendering a website, which have different commands: `next start` vs `next export`. For the platform, we need to determine which should be the default.

## Considered options

1.  Server rendering (`next start`): Generates the full HTML markup for a page on the server in response to navigation. Minimal client-side JS is possible, even for personalized sites.
2.  Prerendering (`next export`): At compile time, a separate HTML file is generated for each URL. Only the initial state of the page is generated as static HTML. To display personalized data, client-side JS is required and the page's DOM is updated.

## Decision drivers

1.  The selected option should represent what we consider the preferred approach for the types of websites we're typically building with Next.js: authenticated, personalized web applications (claimant portals, compare tools, case management systems, etc).
2.  Reduce the need for third party dependencies or custom code, when a native option works just as well.
3.  A (reasonable) increase in cloud costs is acceptable if it results in a system that is more maintainable for software teams and the government in the long term.
4.  Developer experience should not come at the expense of end user experience.

## Decision Outcome

Server rendering is the best option when the web application requires "live" data, such as the personalized sites we often build at Nava, like claimant portals or case management systems. Server rendering requires more upfront effort on the infra side, but it enables teams to achieve a clearer separation of concerns, and write less application code in the long run. This can translate to web applications that work well for a large spectrum of device and network conditions.

If a project team is building a site that renders the same content for every user, they can change their application to utilize [Next.js's static HTML export functionality](https://www.google.com/url?q=https://nextjs.org/docs/advanced-features/static-html-export&sa=D&source=editors&ust=1675374865786553&usg=AOvVaw32_xAPAKmZPGT-kOkfFvAM) (prerendering). This flexibility to do either server rendering or prerendering within the same React framework is one benefit to using Next.js.

## Pros and Cons of the Options

### Server rendering

Pros

- Data fetching occurs on the server. The browser natively handles the page's loading state. This means less overall code to write, test, and maintain. An uncaught error on the server will be louder (in a good way) than an uncaught error on the client (which could result in a never ending spinner).
- Makes it easier to implement a clearer separation of concerns:
  - [Middleware](https://www.google.com/url?q=https://nextjs.org/docs/advanced-features/middleware&sa=D&source=editors&ust=1675374865787476&usg=AOvVaw3zDFoDM50pSoew_4SsZpjm) provide a place for enforcing auth, reading/setting secure cookies, setting HTTP headers, and redirects.
  - [Loaders](https://www.google.com/url?q=https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props&sa=D&source=editors&ust=1675374865787877&usg=AOvVaw0zAh7tsjHKl2P8pDGVhf-0) provide a place for fetching all data required for rendering the page.
- Running page logic and rendering on the server makes it possible to send lighter payloads to the client. This approach can work well for a large spectrum of device and network conditions. [You can make your server fast, but you can't control the user's device or network](https://www.google.com/url?q=https://remix.run/docs/en/v1/pages/philosophy%23serverclient-model&sa=D&source=editors&ust=1675374865788271&usg=AOvVaw3bPMcx9gLfFygQu_qL2R-9).
- Low effort to implement pretty [dynamic routes](https://www.google.com/url?q=https://nextjs.org/docs/routing/dynamic-routes&sa=D&source=editors&ust=1675374865788677&usg=AOvVaw070KKTAMkbV2YkqYVRpep-) (e.g `/claim/:claim_id`)
- [API routes](https://www.google.com/url?q=https://nextjs.org/docs/api-routes/introduction&sa=D&source=editors&ust=1675374865789035&usg=AOvVaw2rEo-fURI8voWOvef7egqX) can be created to handle other types of HTTP requests (POST, PUT, etc).
- Nice side benefit: Server rendering is the only option for Remix, so it would be easier to migrate to Remix if the Next.js apps we're building were server rendered.

Cons

- Requires infra resources to run the containerized application, and all the things that come along with a server (rate limiting, auto scaling), such as [AWS App Runner](https://www.google.com/url?q=https://aws.amazon.com/apprunner/&sa=D&source=editors&ust=1675374865789570&usg=AOvVaw1FvRUrkJQO7Y4QqQcwvjGx). This can have higher costs than a prerendered site, and requires more effort to receive security approvals due to a larger attack surface.

### Prerendering

Pros

- Great for non-authenticated sites since the markup can be generated ahead of time.
- Minimal infrastructure is required. The prerendered HTML files can be served from a CDN, such as AWS CloudFront connected to an S3 bucket. Assuming other best practices are followed, like optimizing images and not loading MB's of client-side JS, this can translate to fast page loads and low costs.

Cons

- For sites with live/personalized data, pages would require client-side JS for data fetching. This has a few downsides:
  - Client-side JS is required for rendering the loading, success, and error states (e.g. `fetch`, `isLoading`, `useEffect`, `catch`). Teams need to define their own code patterns to manage this (e.g hooks, higher-order components) or install third-party dependencies (e.g. [React Query](https://www.google.com/url?q=https://react-query-v3.tanstack.com/&sa=D&source=editors&ust=1675374865790567&usg=AOvVaw03uu55wcJCrpi65NhtalUS)). This increases the amount of code to be written and maintained, and can increase code complexity.
  - The prerendered HTML file is only a skeleton page in a pending state. Although the site might have a fast [First Paint](https://www.google.com/url?q=https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/&sa=D&source=editors&ust=1675374865790905&usg=AOvVaw2yIAF6IG8sh4n02JjmOhNr), its [Time To Interactive](https://www.google.com/url?q=https://developer.chrome.com/en/docs/lighthouse/performance/interactive/&sa=D&source=editors&ust=1675374865791184&usg=AOvVaw12jmKrMa_mhj9In8y_lJSG) may still be slow.
- [Lacks support for Middleware, Internationalized Routing, API Routes, etc](https://www.google.com/url?q=https://nextjs.org/docs/advanced-features/static-html-export%23unsupported-features&sa=D&source=editors&ust=1675374865791574&usg=AOvVaw3lpgW-9LCEIWi9OTHPAn0V).
