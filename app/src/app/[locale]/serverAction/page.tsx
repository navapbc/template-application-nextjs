// Server Action example
// For more context: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

import { pick } from "lodash";
import { Metadata } from "next";

import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { getTranslations } from "next-intl/server";

import ClientForm from "./clientForm";

interface RouteParams {
  locale: string;
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const t = await getTranslations({ locale: params.locale });
  const meta: Metadata = {
    title: t("serverAction.title"),
  };

  return meta;
}

type Props = {
  locale?: string;
};

export function SimpleForm({ locale }: Props) {
  const messages = useMessages();
  const t = useTranslations("serverAction");

  return (
    <>
      <NextIntlClientProvider
        locale={locale}
        messages={pick(messages, "serverAction")}
      >
        <h1>{t("title")}</h1>
        <ClientForm />
      </NextIntlClientProvider>
    </>
  );
}
