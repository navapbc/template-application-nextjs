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

  const langs: LanguageDefinition[] = [
    {
      attr: "en-US",
      label: "English",
      on_click: () => selectLocale("es-US"),
    },
    {
      attr: "es-US",
      label: "Español",
      label_local: "Spanish",
      on_click: () => selectLocale("en-US"),
    },
  ];


  return <LanguageSelector displayLang={locale} langs={langs} />;
}
