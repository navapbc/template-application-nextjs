# Internationalization (i18n)

- [I18next](https://www.i18next.com/) is used for internationalization.
- Next.js's [internationalized routing](https://nextjs.org/docs/advanced-features/i18n-routing) feature is enabled. Toggling between languages is done by changing the URL's path prefix (e.g. `/about` ➡️ `/es/about`).
- Configuration for the i18n routing and i18next libraries are located in [`next-i18next.config.js`](../app/next-i18next.config.js). For the most part, you shouldn't need to edit this file unless adding a new language.
- [storybook-react-i18next](https://storybook.js.org/addons/storybook-react-i18next) adds a globe icon to Storybook's toolbar for toggling languages.

## Managing translations

- Translations are managed as JSON files in the `public/locales` directory, where each language has its own directory (e.g. `en` and `es`). Each file is also referred to as a "namespace".
- [**Namespaces**](https://www.i18next.com/principles/namespaces) can be used to organize translations into smaller files. For large sites, it's common to create a namespace for each controller, page, or feature (whatever level makes most sense). See "Type-safe translations" below for additional considerations when adding new namespaces.
- There are a number of built-in formatters based on [JS's `Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) that can be used in locale strings, and custom formatters can be added as well. [See the i18next formatting docs for details](https://www.i18next.com/translation-function/formatting#built-in-formats).
- If a string's translation is missing in another language, the default language (usually English) will be used as a fallback.

### Type-safe translations

I18next is configured to report errors if you attempt to reference an i18n key path that doesn't exist in a locale file. Type-safe internationalization requires a bit of extra work to maintain, but it can be an extremely helpful tool for catching translation errors early.

#### How it works

1. An NPM script (`i18n-types`) transforms the JSON locale files into a generated TypeScript file: [`generated-i18n-bundle.ts`](../app/src/types/generated-i18n-bundle.ts)
1. [`types/i18next.d.ts`](../app/src/types/i18next.d.ts) configures i18next to use the generated TypeScript file as the source of truth for the available keys. If a key isn't in the generated file, TypeScript will report an error for the key.

[Learn more about using TypeScript with i18next](https://www.i18next.com/overview/typescript).

## Load translations

1. `serverSideTranslations` must be called in [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) or [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) to load translations for a page.

   ```tsx
   import type { GetServerSideProps } from "next";
   import { serverSideTranslations } from "next-i18next/serverSideTranslations";

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     // serverSideTranslations takes an optional second argument to limit
     // which namespaces are sent to the client
     const translations = await serverSideTranslations(locale ?? "en");
     return { props: { ...translations } };
   };
   ```

   Note that `serverSideTranslations` needs imported in the same file as the `getServerSideProps` / `getStaticProps` function, so that Next.js properly excludes it from the client-side bundle, where Node.js APIs (e.g. `fs`) aren't available.

1. Then use the `useTranslation` hook's `t()` method, or the `Trans` component to render localized strings.

   ```tsx
   import { Trans, useTranslation } from "next-i18next";

   const Page = () => {
     const { t } = useTranslation();

     return (
       <>
         <h1>{t("About.title")}</h1>
         <Trans i18nKey="About.summary" />
       </>
     );
   };
   ```

   By default, `useTranslation` and `Trans` load translations from the `common` namespace. To load translations from a different namespace, you can pass the `ns` prop to `Trans`, or the `ns` option to `useTranslation`.

   ```tsx
   const { t } = useTranslation("someOtherNamespace");
   ```

   ```tsx
   <Trans ns="someOtherNamespace" i18nKey="someKey" />
   ```

Refer to the [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/) documentation for more usage docs.

## Add a new language

1. Edit `next-i18next.config.js` and add the language to `locales`, using the [BCP 47 language tag](https://www.w3.org/International/articles/language-tags/) (e.g. `en` or `en-US`).
1. Add a language folder, using the same BCP47 language tag: `mkdir -p public/locales/<lang>`
1. Add a language file: `touch public/locales/<lang>/common.json` and add the translated content. The JSON structure should be the same across languages. However, non-default languages can omit keys, in which case the default language will be used as a fallback.
1. Add a label for the language to the `locales` object in [`.storybook/preview.js`](../app/.storybook/preview.js)
