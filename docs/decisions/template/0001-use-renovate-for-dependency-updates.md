# Use Renovate over Dependabot for Dependency Updates

* Deciders: @aligg, @sawyerh, @lorenyu
* Date: 2022-10


## Context and Problem Statement
Initially this template repo used dependabot for dependency management. We moved to renovate to try and reduce noise and increase our ability to customize how we do upgrades while continuing to update our dependencies in a timely manner. We specifically thought it would be useful to try out renovate in this template directory to see if it's something that could add value across other projects at Nava.

Some Renovate benefits: 
* Renovate is free and open source, and usage is increasing.
* Batching dependency update PRs. For example, you can batch all minor updates together on a monthly basis. You can also batch particular dependencies - like all jest or all react together in one PRs. 
* Granular scheduling. For example, you can opt to only receive upgrade PRs once a month for minor updates, and security related upgrades right away. 
* Granular automerging. For example, you can set all minor upgrades that pass tests to automerge, and any major updates go for human review. 
* Auto-assign reviewers to specific people or code owner groups to increase ownership.
* Renovate also comes with some dashboard functionality, mostly unexplored for now: https://docs.renovatebot.com/key-concepts/dashboard/

Some Renovate drawbacks: 
* Supports (I think) fewer languages than dependabot. Renovate currently supports Java, JavaScript, Python, Ruby, PHP, GoLang and a few addl languages [See language support section](https://docs.renovatebot.com/)

## Considered Options
We mostly considered the merits of renovate and dependabot when making this decision. Other players in this space include snyk, which as I understand covers more than our specific use-case. 

## Decision Outcome
Since it is low risk to try out (straight-forward to implement, easy to reverse) renovate we decided to go for it.

## Links - Resources
* [Renovate Docs](https://docs.renovatebot.com/)
* [Renovate Tutorial](https://github.com/renovatebot/tutorial)

## Links - Some Renovate Config File Examples
* [Storybook](https://github.com/storybookjs/storybook/blob/next/.github/renovate.json5)
* [freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp/blob/22bb60196ab63160a5e4242da6eca31536d380e1/renovate.json)
* [Prisma](https://github.com/prisma/prisma/blob/6ec631c27446baed0a65d8ddc01cb26fab776572/.github/renovate.json)

## Some common renovate config flags explained
- Only target npm packages: `"enabledManagers":["npm"]`
- Renovate favors pinning dependencies [reference](https://docs.renovatebot.com/dependency-pinning/). We can disable pinning with `"rangeStrategy":"replace"`
- We can pull in upgrades only after they've been in the wild for a few days using: `"npm": {"stabilityDays": 2}`
- Renovate offers quite a few presets (we're pulling in their base config to start). You can read through presets [here](https://docs.renovatebot.com/presets-config/)

## Renovate <> Dependabot Configuration 
Note that for renovate to read vulnerability alerts, it needs access to dependency graph and dependabot alerts. More details [here](https://docs.renovatebot.com/configuration-options/#vulnerabilityalerts). 