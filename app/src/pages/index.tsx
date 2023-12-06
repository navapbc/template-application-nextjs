import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { getLocaleMessages } from "src/i18n";

import { useTranslations } from "next-intl";
import Head from "next/head";
import { FeatureFlagManager } from "src/services/FeatureFlagManager";

interface PageProps {
  isFooEnabled: boolean;
}

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props: PageProps) => {
  const t = useTranslations("home");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>

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
          <p>{t("featureflagging")}</p>
        {props.isFooEnabled ? (<p>^..^{t("flagon")}</p>) : <p>{t("flagoff")}</p>}
      </div>
    </>
  );
};

// Change this to getStaticProps if you're not using server-side rendering
export const getServerSideProps: GetServerSideProps<PageProps> = async ({ locale }) => {
  const featureFlags = new FeatureFlagManager("anonymous");
  const isFooEnabled = await featureFlags.isFeatureEnabled("foo");

  return Promise.resolve({
    props: {
      messages: getLocaleMessages(locale),
      isFooEnabled,
    },
  });
};

export default Home;