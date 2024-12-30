import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { View } from "./view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const meta: Metadata = {
    title: t("home.title"),
  };

  return meta;
}

export default function Controller() {
  return <View />;
}
