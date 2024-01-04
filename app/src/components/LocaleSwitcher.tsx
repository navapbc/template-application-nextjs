"use client";

import { usePathname, useRouter } from "src/i18n/navigation";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { LanguageDefinition, LanguageSelector } from "@trussworks/react-uswds";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const pathname = usePathname();

  const selectLocale = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  // This should be modified to fit the project's language requirements
  // If you have more than two languages, it will render as a dropdown
  // The react-uswds component will just display the `label` for the current language;
  // USWDS guidance is to display "Language" in the current language as the label, which isn't currently possible
  // See https://designsystem.digital.gov/components/language-selector/
  // We're using two languages by default here, but implementing such that it displays the language to which it will switch rather than the current language
  const langs: LanguageDefinition[] = [
    {
      attr: "en-US",
      label: "Español",
      label_local: "Spanish",
      on_click: () => selectLocale("es-US"),
    },
    {
      attr: "es-US",
      label: "English",
      on_click: () => selectLocale("en-US"),
    },
  ];

  return <LanguageSelector displayLang={locale} langs={langs} />;
}
