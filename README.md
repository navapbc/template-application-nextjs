# Template Next.js React application

This is a template repository for a React web application using the Next.js framework.

See [`navapbc/platform`](https://github.com/navapbc/platform) for other template repos.

## Features

- Framework for server-side rendered, static, or hybrid React applications
- TypeScript and React testing tools
- U.S. Web Design System for themeable styling and a set of common components
- Type checking, linting, and code formatting tools
- Storybook for a frontend workshop environment

## Repo structure

```text
.
├── template           # The template (the things that get installed/updated)
│   ├── .github        # GitHub workflows
│   ├── docs           # Project docs and decision records
│   └── {{app_name}}   # Application code
├── template-only-bin  # Template repo scripts
└── template-only-docs # Template repo docs
```

## Installation

To get started using the template application on your project:

1. [Install the nava-platform tool](https://github.com/navapbc/platform-cli).
2. Install template by running in your project's root:
    ```sh
    nava-platform app install --template-uri https://github.com/navapbc/template-application-nextjs . <APP_NAME>
    ```
3. Follow the steps in `/<APP_NAME>/README.md` to set up the application locally.
4. Optional, if using the Platform infra template: [Follow the steps in the `template-infra` README](https://github.com/navapbc/template-infra#installation) to set up the various pieces of your infrastructure.

## Learn more

- [Dependency management](./template-only-docs/set-up-dependency-management.md)
- [Deployment](./template-only-docs/set-up-cd.md)
