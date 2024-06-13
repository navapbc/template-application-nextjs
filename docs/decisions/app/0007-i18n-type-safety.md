# Enable i18next type checks

- Status: accepted
- Deciders: Sawyer Hollenshead, Loren Yu
- Date: 2023-08-28

## Context and Problem Statement

The codebase utilizes I18next as its internationalization library. [I18next provides the option to enable type checking](https://www.i18next.com/overview/typescript), to help catch references to invalid i18n key paths. This is a feature that projects at Nava have desired before, but the path to implement the feature isn't always the clearest to teams.

## Considered Options

- Enable type checking of I18next
- Do not enable type checking of I18next

## Decision Outcome

Chosen option: Enable type checking of I18next.

### Positive Consequences

- Type checking will help catch references to invalid i18n key paths, which will help prevent teams from shipping experiences with missing content. Migration efforts that affect locale files will be less risky as a result.
- Developer tooling will be able to provide better autocomplete suggestions for i18n key paths.

### Negative Consequences

- A TypeScript file representing the i18n namespaces must be maintained alongside the JSON locale files. This file will need to be updated whenever a new locale file is added or removed. If the file isn't updated, a developer will receive type errors when they reference a valid i18n key path. This could be a source of confusion for developers who aren't familiar with the i18next type-checking feature.
  - This file [can be generated](https://github.com/i18next/i18next-resources-for-ts).
  - Tests can be added to catch missing namespaces in the file.
- TypeScript errors, particularly those related to i18n, can be difficult to understand. This could slow down developers.
- Compilation time may be impacted depending on a project's size
- Type checking only works when the locale files are collocated with the code. If you have your files stored outside of the repo (e.g. in a translation service), then you can either (a) disable type checking by removing the type checking feature, or (b) [follow the instructions in this post](https://dev.to/adrai/supercharge-your-typescript-app-mastering-i18next-for-type-safe-translations-2idp) about generating the TypeScript file.
