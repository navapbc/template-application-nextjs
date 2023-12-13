import { Metadata } from "next";
import { isFeatureEnabled } from "src/services/feature-flags";

import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

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

export default async function Page() {
  const t = useTranslations("home");
  const isFooEnabled = await isFeatureEnabled("foo", "anonymous");

  return (
    <>
      <h1>{t("title")}</h1>

      {/* Demonstration of more complex translated strings, with safe-listed links HTML elements */}
      <p className="usa-intro">
        {t.rich("intro", {
          LinkToNextJs: (content) => (
            <a href="https://nextjs.org/docs">{content}</a>
          ),
        })}
      </p>
      <div className="measure-6">
        {t.rich("body", {
          ul: (content) => <ul className="usa-list">{content}</ul>,
          li: (content) => <li>{content}</li>,
        })}

        <p>
          {/* Demonstration of formatters */}
          {t("formatting", {
            amount: 1234,
            isoDate: new Date("2023-11-29T23:30:00.000Z"),
          })}
        </p>

        {/* Demonstration of feature flagging */}
        <p>{t("feature_flagging")}</p>
        <p>{isFooEnabled ? t("flag_on") : t("flag_off")}</p>
      </div>
    </>
  );
}
