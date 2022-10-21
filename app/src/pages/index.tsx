import type { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Trans, useTranslation } from "react-i18next";

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <h1>
      {t("Index.title")}
      <a href="https://github.com/navapbc/template-application-nextjs">
        <Trans i18nKey="Index.titleLink" />
      </a>
    </h1>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? "en");
  return { props: { ...translations } };
};

export default Home;
