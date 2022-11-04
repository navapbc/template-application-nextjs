## Overview

- This is a [Next.js](https://nextjs.org/) React web application, written in [TypeScript](https://www.typescriptlang.org/).
- [U.S. Web Design System](https://designsystem.digital.gov) provides themeable styling and a set of common components.
- [Storybook](https://storybook.js.org/) is included as a frontend workshop.

### Directory structure

```
├── .storybook        # Storybook configuration
├── public            # Static assets
│   └── locales       # Internationalized content
├── src               # JS source code
│   ├── components    # Reusable UI components
│   └── pages         # Page routes and data fetching
│       ├── api       # API routes (optional)
│       └── _app.tsx  # Global entry point
├── stories           # Storybook pages
├── styles            # Sass & design system settings
└── tests
```

## 💻 Development

[Next.js](https://nextjs.org/docs) provides the React framework for building the web application. Pages are defined in the `pages/` directory. Pages are automatically routed based on the file name. For example, `pages/index.tsx` is the home page.

Files in the `pages/api` are treated as [API routes](https://nextjs.org/docs/api-routes/introduction). An example can be accessed at [localhost:3000/api/hello](http://localhost:3000/api/hello) when running locally.

[**Learn more about developing Next.js applications** ↗️](https://nextjs.org/docs)

### Getting started

From the `app/` directory:

1. Install dependencies
   ```bash
   npm install
   ```
1. Optionally, disable [telemetry data collection](https://nextjs.org/telemetry)
   ```bash
   npx next telemetry disable
   ```
1. Run the local development server
   ```bash
   npm run dev
   ```
1. Navigate to [localhost:3000](http://localhost:3000) to view the application

Alternatively, you can run the application in a Docker container:

1. From the root directory run `docker-compose up -d --build`

Other scripts:

- `npm run build` - Builds the production bundle
- `npm start` - Runs the app in production mode

## 🖼️ Storybook

Storybook is a [frontend workshop](https://bradfrost.com/blog/post/a-frontend-workshop-environment/) for developing and documenting pages and components in isolation. It allows you to render the same React components and files in the `src/` directory in a browser, without the need for a server or database. This allows you to develop and manually test components without having to run the entire Next.js application.

From the `app/` directory:

1. `npm run storybook`
2. Navigate to [localhost:6006](http://localhost:6006) to view

Alternatively, you can run Storybook in a Docker container:

1. From the root directory run `docker-compose exec nextjs npm run storybook`

Other scripts:

- `npm run storybook-build` - Exports a static site to `storybook-static/`

## 🐛 Testing

[Jest](https://jestjs.io/docs/getting-started) is used as the test runner and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) provides React testing utilities.

Tests are manged as `.test.ts` (or `.tsx`) files in the the `tests/` directory.

To run tests:

- `npm test` - Runs all tests and outputs test coverage report
- `npm run test-update` - Updates test snapshots
- `npm run test-watch` - Runs tests in [watch](https://jestjs.io/docs/cli#--watch) mode. Tests will re-run when files are changed, and an interactive prompt will allow you to run specific tests or update snapshots.

A subset of tests can be ran by passing a pattern to the script. For example, to only run tests in `tests/pages/`:

```sh
npm run test-watch -- pages
```

## 🤖 Type checking, linting, and formatting

- [TypeScript](https://www.typescriptlang.org/) is used for type checking.
  - `npm run ts:check` - Type checks all files
- [ESLint](https://eslint.org/) is used for linting. This helps catch common mistakes and encourage best practices.
  - `npm run lint` - Lints all files and reports any errors
  - `npm run lint-fix` - Lints all files and fixes any auto-fixable errors
- [Prettier](https://prettier.io/) is used for code formatting. This reduces the need for manual formatting or nitpicking and enforces a consistent style.
  - `npm run format`: Formats all files
  - `npm run format-check`: Check files for formatting violations without fixing them.

It's recommended that developers configure their code editor to auto run these tools on file save. Most code editors have plugins for these tools or provide native support.

<details>
  <summary>VSCode instructions</summary>

1. Install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions.
2. Add the following to a `.vscode/settings.json` file:

   ```json
   {
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "eslint.workingDirectories": ["./app"],
     "typescript.validate.enable": true
   }
   ```

   </details>

## Other topics

- [Internationalization](../docs/internationalization.md)
- Refer to the [architecture decision records](../docs/decisions) for more context on technical decisions.
