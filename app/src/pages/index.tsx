import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { AWSFeatureFlagManager } from "src/services/FeatureFlagManager";

import { useTranslations } from "next-intl";
import Head from "next/head";

interface PageProps {
  featureNameEnabled: boolean;
}

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props: PageProps
) => {
  const { t } = useTranslation("home");

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
        <Trans
          t={t}
          i18nKey="body"
          components={{
            ul: <ul className="usa-list" />,
            li: <li />,
          }}
        />
        <p>
          {/* Demonstration of formatters */}
          {t("formatting", {
            amount: 1234,
            isoDate: new Date("2023-11-29T23:30:00.000Z"),
          })}
        </p>
        {/* Demonstration of feature flagging */}
        <p>{t("featureflagging")}</p>
        {props.featureNameEnabled && <p>^..^</p>}
      </div>
    </>
  );
};

// Change this to getStaticProps if you're not using server-side rendering
export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  locale,
}) => {
  const translations = await serverSideTranslations(locale ?? "en-US");

  const featureFlags = new AWSFeatureFlagManager("anonymous");
  const flagResult = await featureFlags.getFeatureFlag("foo");

  return { props: { ...translations, featureNameEnabled: flagResult } };
};

export default Home;
