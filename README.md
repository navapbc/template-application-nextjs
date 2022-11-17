# Template repository for a Next.js application

This is a template repository for a Next.js-based application. While this template should be opinionated in some ways in order to reduce setup overhead where possible, it should be application-agnostic, meaning that any type of Next.js application should be able to be created from this template.

## Contents

This template includes setup for:

- `.github`: common GitHub configuration such as an empty PR template and a directory for GitHub workflows
- `app`: setup for the Next.js application should go here
- `docs`: a directory for project documentation
- `infra`: a directory for common infrastructure

## Installation

To get started using the template application on your project, run the following command to execute the [install script](https://github.com/navapbc/template-application-nextjs/tree/main/template-only-bin/install-template.sh), which clones the template repository, copies the template files to your repository, and then cleans up the template repository:

```bash
curl https://raw.githubusercontent.com/navapbc/template-application-nextjs/main/template-only-bin/install-template.sh | bash -s
```

Now you're ready to [get started](./docs/app/getting-started.md).
