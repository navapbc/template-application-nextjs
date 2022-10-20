This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This README has been modified from the auto-generated one.

## Getting Started

First, install dependencies from the app directory:

```bash
npm install
```

Second, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

A starter [API route](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Local Linter and Typechecker Setup

### Setting up up linting and typechecking for local development

For linting, this application is leveraging `eslint`, `prettier` and Nava's [eslint-config-nava](https://github.com/navapbc/eslint-config-nava). Although, these will be run on CI and prior to commit, it is still recommended that we tell our code editor to auto-fix eslint and prettier errors on save.

In VSCode, do so by creating a `.vscode/settings.json` file with:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.workingDirectories": ["./app"]
}
```

For typechecking, this application is leveraging Next.js' [incremental typechecking](https://nextjs.org/docs/basic-features/typescript#incremental-type-checking). NextJS will run type checking as a part of `next build`-- Although it is still recommended that we set up type checking using our code editor for development. In VSCode, do so by adding the following to your `.vscode/settings.json` file

```
"typescript.validate.enable": true
```

Note: make sure TypeScript and Javascript Language Features are enabled in VS Code Extensions.

### Tsconfig additions to auto-generated file

- `target: es6` -- nextJS set this valule to `es5` by default.
- `allowJS: true` -- allows ts checks on javascript files.
- `checkJS: true` -- works in tandem with `allowJS`. Alternative to adding `// @ts-check` at top of Js files-- instructs ts to check all js files.
- `jsx: react-jsx` -- [Documentation on this option](https://www.typescriptlang.org/docs/handbook/jsx.html). This value updates the JSX mode that TS whips with. Updating this from "preserve" helped get jest tests into a passing state. TODO: figure out why.
- `incremental: true` -- enables incremental typechecking. Incremental typechecking creates a series of `.tsbuildinfo` files to dave information from last compilation. This expedites type checking during build.
- `baseUrl: "."` & `paths: { @pages/*: [pages/*] }` -- These two, in tandem, setup module path aliases for cleaner imports. To utilize this, import files like: `import Home from "@pages/index";`

## Package.json

### Scripts

These can be run with `npm run [name of script]`. For more about npm scripts, see [here](https://docs.npmjs.com/cli/v8/using-npm/scripts).

- `build`: Builds the app.
- `dev`: Runs the app in development mode.
- `format`: Instructs prettier to rewrite files with fixes for formatting violations.
- `format-check`: Instructs prettier to only check files for violations without fixing them.
- `lint`: Runs ESLint and reports warnings and errors.
- `postinstall`: Copies the USWDS static assets into the project. `postinstall` runs automatically after `install`.
- `start`: Runs the app in production mode.
- `storybook`: Starts storybook.
- `storybook-build`: Builds the static content for storybook.
- `test`: Runs `jest --ci --coverage`. [--ci option](https://jestjs.io/docs/cli#--ci) is provided to prevent automatic creation of snapshots. This requires Jest to be run with `--updateSnapshot`. [--coverage option](https://jestjs.io/docs/cli#--coverageboolean) is provided to instruct jest to collect and report test coverage in output.
- `ts:check`: Runs `tsc --noEmit`. [--noEmit option](https://www.typescriptlang.org/tsconfig#noEmit) is provided to prevent type checker compiler from outputting files.

### Dependencies

- `@uswds/uswds`: This [module](https://www.npmjs.com/package/@uswds/uswds) is a library of UI components and a visual style guide for websites for the US federal government.
- `i18next`: This [module](https://www.npmjs.com/package/i18next) provides an internationalization framework for JavaScript environments.
- `next`: This [module](https://www.npmjs.com/package/next) provides the Next.js React framework.
- `next-i18next`: This [module](https://www.npmjs.com/package/next-i18next) provides translation tooling for Next.js apps.
- `react`: This [module](https://www.npmjs.com/package/react) provides the React library for creating JavaScript user interfaces.
- `react-dom`: This [module](https://www.npmjs.com/package/react-dom) provides an entry point to the DOM and server renderers for React.
- `react-i18next`: This [module](https://react.i18next.com/) provides an internationalization framework for React based on i18next.

### Dev Dependencies

- `@babel/core`: This [module](https://babeljs.io/docs/en/babel-core) has the core functionality of babel used for transpiling.
- `@babel/preset-typescript`: This [module](https://babeljs.io/docs/en/babel-preset-typescript) allows us to use babel to transpile TypeScript into Javascript, specifically for [jest testing](https://jestjs.io/docs/getting-started#using-typescript) in our case. Implemented in .babelrc > presets.
- `@storybook/addon-essentials`: This [module](https://github.com/storybookjs/storybook/tree/main/addons/essentials) is a collection of addons for Storybook.
- `@storybook/builder-webpack5`: This [module](https://www.npmjs.com/package/@storybook/builder-webpack5) is a builder for `webpack5` to build the preview iframe.
- `@storybook/manager-webpack5`: This [module](https://www.npmjs.com/package/@storybook/manager-webpack5) is a builder for `webpack5` to build the manager UI.
- `@storybook/react`: This [module](https://www.npmjs.com/package/@storybook/react), Storybook for React, provides a development environment for React components.
- `@testing-library/dom`: This [module](https://github.com/testing-library/dom-testing-library) provides a way to query the DOM for nodes.
- `@testing-library/jest-dom`: This [module](https://testing-library.com/docs/ecosystem-jest-dom/) is a companion for testing-library/dom-- it provides DOM element matchers for jest.
- `@testing-library/react`: This [module](https://testing-library.com/docs/react-testing-library/intro/) works in tandem with testing-library/dom to add APIs for testing React components.
- `@trivago/prettier-plugin-sort-imports`: This [module](https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports) provides a plugin to specify how prettier should sort imports.
- `@types/jest-axe`: This package contains type definitions for [jest-axe](https://www.npmjs.com/package/jest-axe).
- `@types/node`: This [module](https://www.npmjs.com/package/@types/node) contains type defintions for Node.js.
- `@types/react`: This [module](https://www.npmjs.com/package/@types/react) contains type defintions for React.
- `@types/react-dom`: This [module](https://www.npmjs.com/package/@types/react-dom) contains type defintions for react-dom.
- `@typescript-eslint/eslint-plugin`: This [module](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) provides lint rules for TypeScript.
- `@typescript-eslint/parser`: Implemented in .eslint.json via `"parser": "@typescript-eslint/parser"`. This [plugin](https://www.npmjs.com/package/@typescript-eslint/parser) works in tandem with other plugins to help facilitate the usage of ESlint with TypeScript.
- `eslint`: This [module](https://www.npmjs.com/package/eslint) provides linting. Configuration implemented in .eslintrc.
- `eslint-config-nava`: This [module](https://github.com/navapbc/eslint-config-nava) contains nava's preferred configurations for eslint. It is implemented in .eslintrc > extensions > nava.
- `eslint-config-next`: This [module](https://nextjs.org/docs/basic-features/eslint) is automatically installed by nextJS, it includes out of the eslint configuration. Implemented in .eslintrc.json > extends > next.
- `eslint-config-prettier`: This [module](https://github.com/prettier/eslint-config-prettier) turns off eslint rules that may conflict with prettier. Implemented in .eslintrc > extends > prettier. This module requires that we list `prettier` as the last element of the `extends` object in `eslintrc.json`.
- `eslint-plugin-jest`: This [module](https://www.npmjs.com/package/eslint-plugin-jest) is an ESLint plugin for Jest.
- `eslint-plugin-storybook`: This [module](https://www.npmjs.com/package/eslint-plugin-storybook) is an ESLint for Storybook.
- `i18next-browser-languagedetector`: This [module](https://www.npmjs.com/package/i18next-browser-languagedetector) provides language detection in the browser.
- `i18next-http-backend`: This [module](https://www.npmjs.com/package/i18next-http-backend) is a i18next backend to be used in Node.js.
- `jest`: This [module](https://www.npmjs.com/package/jest) provides a framework for JavaScript testing.
- `jest-axe`: This [module](https://www.npmjs.com/package/jest-axe) aids in testing accessibility through Jest.
- `jest-cli`: This [module](https://www.npmjs.com/package/jest-cli) provides cli tools for Jest.
- `jest-environment-jsdom`: This [module](https://www.npmjs.com/package/jest-environment-jsdom) simulates the DOM for testing. Implemented in jest.config.js > testEnvironment.
- `postcss`: This [module](https://www.npmjs.com/package/postcss) provides JavaScript plugins that help manage and maintain style elements.
- `postcss-loader`: This [module](https://www.npmjs.com/package/postcss-loader) provides a loader to process CSS.
- `postcss-preset-env`: This [module](https://www.npmjs.com/package/postcss-preset-env) helps with compatibility of CSS across different browsers and runtime environments.
- `prettier`: This [module](https://prettier.io/) is used for code formatting. Implemented in .prettierrc.json.
- `sass`: This [module](https://www.npmjs.com/package/sass) provides a JavaScript implemntation of Sass, a CSS extension language.
- `sass-loader`: This [module](https://www.npmjs.com/package/sass-loader) compiles Sass/SCSS files into CSS.
- `storybook-react-i18next`: This [module](https://www.npmjs.com/package/storybook-react-i18next) provides react-i18next Storybook integration.
- `style-loader`: This [module](https://www.npmjs.com/package/style-loader) can inject CSS into the DOM.
- `typescript`: This [module](https://www.npmjs.com/package/typescript) contains TypeScript, a language for typed JavaScript.

## Design System

We are using the [USWDS 3.0](https://designsystem.digital.gov) design system.

We did not follow their [install directions](https://designsystem.digital.gov/documentation/getting-started/developers), which require using gulp as a task runner. Instead, we configured `next.config.js` such that we could leverage Next.js's built-in sass compiling and we configured `.storybook/main.js` such that we could leverage Storybook's built-in sass compiling and re-use the same Next.js configuration.

Compiling the USWDS sass is slow, so the initial build step and subsequent sass re-compiles are slow, but after the design system is set up, we shouldn't need to be regularly re-compiling sass.

Copying the USWDS static assets into the project is handled by a [`postinstall`](https://docs.npmjs.com/cli/v8/using-npm/scripts) script in `package.json`.

## Internationalization (i18n)

Configuration is located in [`next-i18next.config.js`](./next-i18next.config.js).

- Next.js's [internationalized routing](https://nextjs.org/docs/advanced-features/i18n-routing) feature is enabled.
- [`next-i18next`](https://github.com/i18next/next-i18next) provides a method for loading translations and a hook for rendering localized strings using [`react-i18next`](https://github.com/i18next/react-i18next).

### Adding a language

1. Edit `next-i18next.config.js` and add the language to `locales`
1. Add a language folder: `mkdir -p public/locales/<lang>`
1. Add a language file: `touch public/locales/<lang>/common.json` and add the translated content
1. Optionally, add a label for the language to the `locales` object in [`.storybook/preview.js`](./.storybook/preview.js)

The JSON structure should be the same across languages. However, non-default languages can omit keys, in which case the translation content for the default language will be used.

### Storybook i18n

[storybook-react-i18next](https://storybook.js.org/addons/storybook-react-i18next) adds a globe icon to the addons bar for selecting the desired language.
