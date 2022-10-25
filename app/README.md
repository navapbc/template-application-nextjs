This is a [Next.js](https://nextjs.org/) web application using the [U.S. Web Design System](https://designsystem.digital.gov). [Storybook](https://storybook.js.org/) is included as a frontend workshop.

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

## Other topics

- [Internationalization](../docs/internationalization.md)
- Refer to the [architecture decision records](../docs/decisions) for more context on technical decisions.
