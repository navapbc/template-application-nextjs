import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { View } from "./view";

interface RouteParams {
  locale: string;
}

export async function generateMetadata({ params }: { params: RouteParams }) {
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
