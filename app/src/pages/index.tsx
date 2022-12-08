import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <h1>
      {t("Index.title")}
      <a href="https://github.com/navapbc/template-application-nextjs">
        {t("Index.titleLink")}
      </a>
    </h1>
  );
};

// Change this to getStaticProps if you're not using server-side rendering
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? "en");
  return { props: { ...translations } };
};

export default Home;
