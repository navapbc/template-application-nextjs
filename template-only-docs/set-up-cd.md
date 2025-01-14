# Deployments

## Next.js app

The Next.js app can be deployed as a static HTML export or as a Node.js server, depending on your needs. By default, the Next.js and Infra templates are configured to deploy the app as a Node.js server in a Docker container. Reference the server rendering ADR for additional context (`/template/docs/decisions/{{app_name}}/0005-server-rendering.md`).

The [Next.js deployment documentation](https://nextjs.org/docs/deployment) provides more information on the various ways to deploy a Next.js application.

## Storybook

Storybook can be deployed as a static HTML export. This template includes a GitHub workflow that will build and deploy Storybook to [GitHub Pages](https://pages.github.com/). To set up this workflow:


1. You can enable continuous deployment of Storybook to GitHub Pages by running:
    ```shell
    nava-platform app update --data app_enable_storybook_cd=true . <APP_NAME>
    ```
1. Select "GitHub Actions" from the **Source** dropdown field on the "Pages" tab in your repo settings (`Settings > Pages`).
1. Trigger the workflow from the repo's Actions tab or by pushing a commit to your main branch

If your GitHub repo is public and you're using the default domain, Storybook will be hosted at a subdirectory: `https://<repo-owner-username>.github.io/<repo-name>/`. A `NEXT_PUBLIC_BASE_PATH` environment variable is available to your code so that any relative paths can be properly prefixed with the subdirectory where your Storybook is hosted. The Storybook configuration is already setup to use this environment variable, as long as the `basePath` in your `next.config.js` uses `process.env.NEXT_PUBLIC_BASE_PATH` as the value.

### Alternatives

One constraint of GitHub Pages is you only have one environment. The [Storybook deployment documentation](https://storybook.js.org/docs/react/sharing/publish-storybook) provides more information on other deployment options.
