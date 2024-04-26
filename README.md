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

1. Run the [download and install script](./template-only-bin/download-and-install-template.sh) in your project's root directory.

    ```bash
    curl https://raw.githubusercontent.com/navapbc/template-application-nextjs/main/template-only-bin/download-and-install-template.sh | bash -s
    ```

    This script will:

    1. Clone the template repository
    2. Copy the template files into your project directory
    3. Remove any files specific to the template repository, like this README.
2. [Follow the steps in `app/README.md`](./app/README.md) to set up the application locally.
3. Optional, if using the Platform infra template: [Follow the steps in the `template-infra` README](https://github.com/navapbc/template-infra#installation) to set up the various pieces of your infrastructure.

## Getting started

Now that you're all set up, you're now ready to [get started](./app/README.md).

## Updates

There are multiple ways to receive template updates on your project. For most updates, you can simply run the [update-template.sh](./template-only-bin/update-template.sh) script

```sh
curl https://raw.githubusercontent.com/navapbc/template-application-nextjs/main/template-only-bin/update-template.sh | bash -s
```

If the update fails the simplest option may be to re-run the installation script above and manually review the changes.

**Remember**: Make sure to read the release notes in case there are breaking changes you need to address.

## Learn more

- [Dependency management](./template-only-docs/set-up-dependency-management.md)
- [Deployment](./template-only-docs/set-up-cd.md)