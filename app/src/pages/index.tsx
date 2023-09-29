import type { GetServerSideProps, NextPage } from "next";

import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Home: NextPage = () => {
  const { t } = useTranslation("home");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>

      <h1>{t("title")}</h1>

      {/* Demonstration of more complex translated strings, with safe-listed links HTML elements */}
      <p className="usa-intro">
        <Trans
          t={t}
          i18nKey="intro"
          components={{
            LinkToNextJs: <a href="https://nextjs.org/docs" />,
          }}
        />
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
          <Trans
            t={t}
            ns="home"
            i18nKey="formatting"
            values={{
              date: "2021-01-01",
              amount: 1234,
            }}
          />
        </p>
      </div>
    </>
  );
};

// Change this to getStaticProps if you're not using server-side rendering
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? "en-US");
  return { props: { ...translations } };
};

export default Home;
