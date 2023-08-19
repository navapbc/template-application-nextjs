/**
 * @jest-environment node
 */
import fs from "fs";
import tsEnglishResources from "src/types/generated-i18n-bundle";

/**
 * Add a custom matcher so we can provide a more helpful test failure message
 */
function toHaveI18nNamespaces(received: string[], expected: string[]) {
  const missingNamespaces = expected.filter(
    (namespace) => !received.includes(namespace)
  );

  if (missingNamespaces.length > 0) {
    return {
      message: () => {
        const missingNamespacesString = missingNamespaces.join(", ");
        let message = `The src/types/generated-i18n-bundle.ts file is missing imports for these English namespaces: ${missingNamespacesString}`;
        message += `\n\nYou can fix this by re-running "npm run i18n-types" to regenerate the file.`;
        message += `\n\nYou likely added a new namespace to the English locale files but the i18n-types script hasn't ran yet.`;
        message += `\n\nIt's important for the generated-i18n-bundle.ts file to be up to date so that you don't get inaccurate TypeScript errors.`;

        return message;
      },
      pass: false,
    };
  } else {
    return {
      message: () =>
        `expected ${JSON.stringify(received)} to not include ${JSON.stringify(
          expected
        )}`,
      pass: true,
    };
  }
}

expect.extend({ toHaveI18nNamespaces });

describe("types/generated-i18n-bundle.ts", () => {
  it("includes all English namespaces", () => {
    const jsonEnglishFilenames = fs
      .readdirSync("public/locales/en")
      .map((filename) => filename.replace(".json", ""));

    // Not adding a type declaration for this matcher since it is only used in this test
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(Object.keys(tsEnglishResources)).toHaveI18nNamespaces(
      jsonEnglishFilenames
    );
  });
});
