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
├── .github             # GitHub workflows and repo templates
├── app                 # Web application
├── docs                # Project docs and decision records
```

## Installation

To get started using the template application on your project:

1. Run the download and [install script](https://github.com/navapbc/template-application-nextjs/tree/main/template-only-bin/install-template.sh) in your project's root directory.

    This script will:

    1. Clone the template repository
    1. Copy the template files into your project directory
    1. Remove any files specific to the template repository, like this README.

    ```bash
    curl https://raw.githubusercontent.com/navapbc/template-application-nextjs/main/template-only-bin/download-and-install-template.sh | bash -s
    ```
1. [Follow the steps in `app/README.md`](./app/README.md) to set up the application locally.
1. [Follow the steps in the `template-infra` README](https://github.com/navapbc/template-infra#installation) to set up the various pieces of your infrastructure.
1. If your app is part of a larger monorepo of systems, you may want to eventually rename the `app` directory and references to it. It's up to your team to determine the most appropriate name. Try getting the app running locally first, and deployed to your cloud provider, before renaming the directory. Otherwise it may be difficult to troubleshoot whether a deployment issue is due to the rename or something else.

## Getting started

Now that you're all set up, you're now ready to [get started](./app/README.md).

## Learn more

- [Dependency management](./template-only-docs/set-up-dependency-management.md)
- [Deployment](./template-only-docs/set-up-cd.md)