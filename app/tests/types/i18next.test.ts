/**
 * Test to help ensure the generated i18n TypeScript file remains up to date
 * with the English locale files that are present. Since the generation script
 * is potentially a confusing aspect of the i18n approach, this test is intended
 * to help bring visibility to its existence and help clarify why an engineering
 * might be receiving type errors in their i18n code.
 * @jest-environment node
 */
import generatedEnglishResources from "src/types/generated-i18n-bundle";

import i18nConfig from "../../next-i18next.config";

/**
 * Add a custom matcher so we can provide a more helpful test failure message
 */
function toHaveI18nNamespaces(received: string[], expected: string[]) {
  const missingNamespaces = expected.filter(
    (namespace) => !received.includes(namespace)
  );

  return {
    pass: missingNamespaces.length === 0,
    message: () => {
      const missingNamespacesString = missingNamespaces.join(", ");
      let message = `The src/types/generated-i18n-bundle.ts file is missing imports for these English namespaces: ${missingNamespacesString}`;
      message += `\n\nYou can fix this by re-running "npm run i18n-types" to regenerate the file.`;
      message += `\n\nYou likely added a new namespace to the English locale files but the i18n-types script hasn't ran yet.`;
      message += `\n\nIt's important for the generated-i18n-bundle.ts file to be up to date so that you don't get inaccurate TypeScript errors.`;

      return message;
    },
  };
}

expect.extend({ toHaveI18nNamespaces });

describe("types/generated-i18n-bundle.ts", () => {
  it("includes all English namespaces", () => {
    // Not adding a type declaration for this matcher since it is only used in this test
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(Object.keys(generatedEnglishResources)).toHaveI18nNamespaces(
      i18nConfig.ns
    );
  });
});
