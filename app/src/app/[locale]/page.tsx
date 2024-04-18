import { Metadata } from "next";
import { isFeatureEnabled } from "src/services/feature-flags";

import { getTranslations } from "next-intl/server";

import { View } from "./view";

interface RouteParams {
  locale: string;
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const t = await getTranslations({ locale: params.locale });
  const meta: Metadata = {
    title: t("home.title"),
  };

  return meta;
}

export default async function Controller() {
  const isFooEnabled = await isFeatureEnabled("foo", "anonymous");

  return <View isFooEnabled={isFooEnabled} />;
}
