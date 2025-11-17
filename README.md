<p>
  <img src="template/docs/assets/Nava-Strata-Logo-V02.svg" alt="Nava Strata" width="400">
</p>
<p><i>Open source tools for every layer of government service delivery.</i></p>
<p><b>Strata is a gold-standard target architecture and suite of open-source tools that gives government agencies everything they need to run a modern service.</b></p>

<h4 align="center">
  <a href="https://github.com/navapbc/template-application-nextjs/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-apache_2.0-red" alt="Nava Strata is released under the Apache 2.0 license" >
  </a>
  <a href="https://github.com/navapbc/template-application-nextjs/blob/main/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs welcome!" />
  </a>
  <a href="https://github.com/navapbc/template-application-nextjs/issues">
    <img src="https://img.shields.io/github/commit-activity/m/navapbc/template-application-nextjs" alt="git commit activity" />
  </a>
  <a href="https://github.com/navapbc/template-application-nextjs/repos/">
    <img alt="GitHub Downloads (all assets, all releases)" src="https://img.shields.io/github/downloads/navapbc/template-application-nextjs/total">
  </a>
</h4>

# Template Next.js React application

This is a template repository for a React web application using the Next.js framework.

See [`navapbc/strata`](https://github.com/navapbc/strata) for other template repos.

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

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.

## Community

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing Guidelines](CONTRIBUTING.MD)
- [Security Policy](SECURITY.md)
