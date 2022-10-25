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

```
├── .github             # GitHub workflows and repo templates
├── app                 # Web application
├── docs                # Project docs and decision records
```

## Using this template

### Create a new repository from this template

1. [Follow the "Getting started" instructions in the Platform repo's README](https://github.com/navapbc/platform#getting-started).
1. Read the dependency management instructions below.
1. Delete or update this `README.md` and `LICENSE.md` to make sense for your project.

### Dependency Management with Renovate

Out of the box this repo uses [Renovate](https://docs.renovatebot.com/) for dependency management. More information on the decision to try renovate can be found [here](https://github.com/navapbc/template-application-nextjs/blob/main/docs/decisions/0002-use-renovate-for-dependency-updates.md). Renovate is free and open-source and allows us to bundle dependency updates together and customize their scheduling.

**Opting out of renovate**:

If you decide you don't want to use renovate, you can delete the `renovate.json` file from the template code. If you plan to rely on [Dependabot](https://docs.github.com/en/code-security/dependabot), you'll likely want to add a `.github/dependabot.yml` file ([example here](https://github.com/navapbc/template-application-nextjs/blob/7ddb06b23524536db2e24bd43ec3ff7ec19d52bf/.github/dependabot.yml))

**Getting started with renovate**:

1. Install Renovate's GitHub App for your repo ([Docs](https://docs.renovatebot.com/getting-started/installing-onboarding/#hosted-githubcom-app)). For most projects, you most likely only want to do this for your select repository. Note that if you prefer not to use the GitHub App, renovate does offer some alternatives including self-hosting.
2. After installation, Renovate should open a "Configure Renovate" pull request in your repository. Once you merge this PR, you will be all set. For more detail on this onboarding PR (what it contains, what to look for, what you can customize etc), check out [renovate's onboarding tutorial README for useful examples](https://github.com/renovatebot/tutorial). Note that this codebase comes with a `renovate.json` file out of the box with configuration options you can keep dependending on your preferences.
3. Note that Renovate can read GitHub's Vulnerability Alerts to customize pull requests. For this to work, you must enable Dependency graph and Dependabot alerts (This is covered in the 'other Github settings' section above, but mentioning here explicitly). For more detail on vulnerability management with renovate, [see here](https://github.com/renovatebot/renovate/blob/main/docs/usage/configuration-options.md#vulnerabilityalerts).

**Beyond the basics**:

After following the above steps your repository should be good to go with Renovate in terms of the basics. Future optimizations you may wish to look into include the [Renovate Dashboard](https://docs.renovatebot.com/key-concepts/dashboard/) and adding the renovate-config-validator program to validate any future renovate config changes prior to merge ([documentation here](https://docs.renovatebot.com/getting-started/installing-onboarding/#reconfigure-via-pr)).
