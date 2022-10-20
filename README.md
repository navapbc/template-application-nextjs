# Template repository for a Next.js application

This is a template repository for a Next.js-based application. While this template should be opinionated in some ways in order to reduce setup overhead where possible, it should be application-agnostic, meaning that any type of Next.js application should be able to be created from this template.

A template repository for common project infrastructure can be found [here](https://github.com/navapbc/template-infra).

## Contents

This template includes setup for:

- `.github`: common GitHub configuration such as an empty PR template and a directory for GitHub workflows
- `app`: setup for the Next.js application should go here
- `docs`: a directory for project documentation

## How to Run

### Without Docker

You can run the Next.js app without docker as follows:

1. `npm install`
2. `npm run dev`
3. Navigate to `localhost:3000` in your browser to view the application

You can run storybook without docker by running:

1. `npm run storybook`
2. Navigate to `localhost:6006` in your browser to view storybook

### With Docker

The Next.js application is dockerized. Take a look at `./app/Dockerfile` to see how it works.

A `docker-compose.yml` has been included to support local development and deployment. Take a look at `./docker-compose.yml` for more information.

1. In your terminal, `cd` to this repo.
2. Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed & running.
3. Run `docker-compose up -d --build` to build the image and start the container.
4. Navigate to `localhost:3000` in your browser to view the application. Note that it takes a few minutes for the initial sass compiling to complete and load.
5. Run `docker-compose exec nextjs npm run storybook` to build and run storybook. Note that the initial sass compiling for storybook also takes a few minutes to complete and load
6. Navigate to `localhost:6006` in your browser to view storybook.
7. Run `docker-compose down` when you are done to delete the container.

To support local development, the `docker-compose.yml` runs the `nextjs` container in development mode (i.e. `npm run dev`) instead of production mode (i.e. `npm run start`). This allows Next.js to do things like hot reload.

The docker-compose file bind mounts `app` on the host machine to `/srv` in the guest machine. However, to ensure that the container uses the correct packages in `node_modules`, we use a named docker volume for the `node_modules` dir. The named volume will take precedence over the bind mount, so that the `node_modules` dir in the guest machine will not be overwritten with the host machine's `node_modules` dir. This also means that if you run `npm install <package>` on the host machine in development (which will update `package-lock.lock`), you'll also need to run `docker-compose exec nextjs npm ci` to update `node_modules` in the guest machine.

## Getting started

### Create a new repository from this template

The template repository can be used to create a project repository using two different methods.

1. From [Github](https://github.com/): Click [New](https://github.com/new) and select the desired template.
2. From the template repo itself: Click "Use this template".

### These steps are the same for both methods

- Select the repository owner
- Type in the desired repository name
- Type a description for this project
- Select whether this new repository will be Public or Private.
- Leave "Include all branches" unchecked
- Click "Create repository from template"

<img src="./docs/imgs/create_from_template.svg" width="50%"/>

### Setup branch protections

Once the repository has been created, the CI stored in this template (`.github/workflows`) will run. Ensure initial CI completes successfully before proceeding.

<img src="./docs/imgs/verify_ci.svg" width="50%"/>

- In Settings > Branches:
  - Click "Add branch protection rule"
  - Enter "main" for the Branch name pattern
  - Check the following:
    - Require a pull request before merging
    - Require approvals
      - Minimum of 1
    - Dismiss stale pull request approvals when new commits are pushed
  - Require status checks to pass before merging
  - Require branches to be up to date before merging
  - In the search box add the following:
    - pass/fail checks
    - Analyze (javascript)

<img src="./docs/imgs/add_branch_protection_rule.svg" width="50%"/>

<img src="./docs/imgs/the_rules.svg" width="50%"/>

### Setup other Github settings

- In Settings > General:
  - Under "Features":
    - Enable/disable features that you want for your project. For example, turn off the Wiki if your project won't be using it
  - Under "Pull Requests":
    - Enable only the merge options your project should support
    - Check "Always suggest updating pull request branches" to encourage pull requests to be updated when they deviate from `main`
    - Check "Automatically delete head branches" to keep set Github to automatically delete branches once they are merged into `main` in a PR

<img src="./docs/imgs/pull_request_settings.svg" width="50%"/>

- In Settings > Collaborators:

  - Add all collaborators that should have access to the git repo

- In Settings > Code security and analysis:
  - Click "Enable" for "Dependabot alerts"
  - Click "Enable" for "Dependabot security updates"
  - For additional information about dependency management, see the section below about dependency management
  - The other security features should already be enabled:
    - "Code scanning" is controlled by `.github/codeql-analysis.yml`
    - "Secret scanning" is enabled by default

<img src="./docs/imgs/code_sec_analysis.svg" width="50%"/>

### Clone the repo to your local development environment

Once you have set your repo up, you can clone it to your local development environment using `git clone [repo address]` or a UI/IDE tool, if preferred.

### Dependency Management with Renovate

Out of the box this repo uses [Renovate](https://docs.renovatebot.com/) for dependency management. More information on the decision to try renovate can be found [here](https://github.com/navapbc/template-application-nextjs/blob/main/docs/decisions/0002-use-renovate-for-dependency-updates.md). Renovate is free and open-source and allows us to bundle dependency updates together and customize their scheduling.

**Getting started with renovate**:
1. Install Renovate's GitHub App for your repo ([Docs](https://docs.renovatebot.com/getting-started/installing-onboarding/#hosted-githubcom-app)). For most projects, you most likely only want to do this for your select repository.
2. After installation, Renovate should open a "Configure Renovate" pull request in your repository. Once you merge this PR, you will be all set. For more detail on this onboarding PR (what it contains, what to look for, what you can customize etc), check out [renovate's onboarding tutorial README for useful examples](https://github.com/renovatebot/tutorial). Note that this codebase comes with a `renovate.json` file out of the box with configuration options you can keep dependending on your preferences.
3. Note that Renovate can read GitHub's Vulnerability Alerts to customize pull requests. For this to work, you must enable Dependency graph and Dependabot alerts (This is covered in the 'other Github settings' section above, but mentioning here explicitly). For more detail on vulnerability management with renovate, [see here](https://github.com/renovatebot/renovate/blob/main/docs/usage/configuration-options.md#vulnerabilityalerts).

**Beyond the basics**:

After following the above steps your repository should be good to go with Renovate in terms of the basics. Future optimizations you may wish to look into include the [Renovate Dashboard](https://docs.renovatebot.com/key-concepts/dashboard/) and adding the renovate-config-validator program to validate any future renovate config changes prior to merge ([documentation here](https://docs.renovatebot.com/getting-started/installing-onboarding/#reconfigure-via-pr)).

**Opting out of renovate**:

If you decide you don't want to use renovate, you can delete the `renovate.json` file from the template code. If you plan to rely on dependabot, you'll likely want to add a `.github/dependabot.yml` file ([example here](https://github.com/navapbc/template-application-nextjs/blob/7ddb06b23524536db2e24bd43ec3ff7ec19d52bf/.github/dependabot.yml))