# Template Next.js React application

This is a template repository for a React web application using the Next.js framework.

See [`navapbc/platform`](https://github.com/navapbc/platform) for other template repos.

## Features

- Framework for server-side rendered, static, or hybrid React applications
- TypeScript and React testing tools
- U.S. Web Design System for themeable styling and a set of common components
- Type checking, linting, and code formatting tools
- Storybook for a frontend workshop environment

[**See `app/README.md` for additional details** ↗️](./app#readme)

## Repo structure

```text
├── .github             # GitHub workflows and repo templates
├── app                 # Web application
├── docs                # Project docs and decision records
```

## Installation

To get started using the template application on your project, run the following command to execute the [install script](https://github.com/navapbc/template-application-nextjs/tree/main/template-only-bin/install-template.sh), which clones the template repository, copies the template files to your repository, and then cleans up the template repository:

```bash
curl https://raw.githubusercontent.com/navapbc/template-application-nextjs/main/template-only-bin/download-and-install-template.sh | bash -s
```

Now you're ready to set up the various pieces of your infrastructure.

## Setup

1. [Dependency management](./template-only-docs/set-up-dependency-management.md)
1. [Deployment](./template-only-docs/set-up-cd.md)

## Getting started

Now that you're all set up, you're now ready to [get started](./app/README.md).
