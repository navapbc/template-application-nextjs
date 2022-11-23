# Deployments

## Next.js app

The Next.js app can be deployed as a static HTML export or as a Node.js server, depending on your needs. The [Next.js deployment documentation](https://nextjs.org/docs/deployment) provides more information on how to deploy your application.

## Storybook

Storybook can be deployed as a static HTML export. The [Storybook deployment documentation](https://storybook.js.org/docs/react/sharing/publish-storybook) provides more information on deployment options.

### GitHub Pages

[GitHub Pages](https://pages.github.com/) may be a good option for hosting Storybook if you only need one environment to represent the latest state of your main branch.

**Steps to setup GitHub Pages**

1. Add a workflow to automatically deploy Storybook: `.github/workflows/deploy-storybook.yml` (see example below)
1. Enable the "GitHub Actions" source in your rep settings (`Settings > Pages > Source`)
1. Trigger the workflow from the Actions tab or by pushing a commit to your main branch

---

<details>
  <summary>View GitHub workflow</summary>

```yaml
name: Deploy Storybook

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow access to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Cancel any older in-progress runs of this workflow
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "16"
          cache: npm
          cache-dependency-path: ./app/package-lock.json
      - name: Setup Pages
        uses: actions/configure-pages@v2
        id: pages_config
      - name: Install dependencies
        run: npm ci
        working-directory: ./app
      - name: Build
        run: BASE_PATH=${{ steps.pages_config.outputs.base_path }} npm run storybook-build
        working-directory: ./app
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./app/storybook-static

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.hosting.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: hosting
        uses: actions/deploy-pages@v1
```

</details>

---

If your GitHub repo is public and you're using the default domain, Storybook will be hosted at a subdirectory: `https://<repo-owner-username>.github.io/<repo-name>/`. A `BASE_PATH` environment variable is available to your code so that any relative paths can be properly prefixed with the subdirectory where your Storybook is hosted. The Storybook configuration is already setup to use this environment variable.
